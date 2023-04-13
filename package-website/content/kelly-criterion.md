---
readingTime: 15
title: 'Building a Kelly Criterion Bot for Trading'
featured: false
description: The Kelly Criterion provides a way to optimize a portfolio of trading bots in the most opportune way by optimizing "bet" sizes on each strategy. Let's go over how to put this into practice with Blankly.
authorName: Aditya Akula
authorImage: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fauthors%2F1621733906923.jpeg?alt=media&token=52be6895-c36c-431f-99ad-271e736d461a'
date: 2022-04-12T17:00:00-05:00
category: Portfolio Optimization
categoryClass: bg-indigo-100
categoryText: text-indigo-800
image: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fkelly-criterion%2FBlackJack.png?alt=media&token=10dfc62c-c7f1-4c7c-b015-95a2f6490b08'
---

## The Kelly Criterion

Everyone wants to learn about ways to identify investment opportunities. Whether it's identifying the top growth stocks for the next few years or researching ways to make markets and arbitrage, much of the focus around investment goes towards choosing the opportunities that we want our money to go towards. However, another aspect of investing gets much less attention -- position sizing. While a successful investment strategy must have opportunities for alpha, if the wrong positions are given too much capital, we'll quickly lose money, and if we don't allocate the right ones enough, we won't profit. The Kelly Criterion is a mathematical approach to sizing your investments based on the probability of success along with the potential to gain or lose money. The details of its derivation and more are [here](https://blankly.finance/the-kelly-criterion), but for today's model, we'll be using it in the below form: $$K =W - \frac{1-W}{R}$$
where $K$ is the Kelly Fraction, $W$ is the fraction of time we win, and $R$ is the ratio of win size to win loss (if we win rarely but when we do it's big, it can still be worth investing). 
## Today's Model
Today, we'll look at using the Blankly package to build a model that uses the Kelly Criterion to allocate its funds. To determine when to buy and sell (along with how much), we'll use a simple RSI histogram based-strategy -- we'll consider ranges of RSI and count how often price increases  or decreases when the stock's current RSI is in each range (along with how much). Then, we'll plug that data into the Kelly Criterion Formula in order to determine how much we want to invest in each asset for each of those ranges. 

This model isn't going to be amazing, most likely. We're working off of a very limited set of factors and our algorithm is fairly simple. However, the main goal of today's model is to display the improvement we'll observe when we use the Kelly Criterion as opposed to a naive model. 
## Overview
First, we'll initialize all the elements of our environment -- the keys for the API we need, as well as the rest of our Blankly environment. Then, we'll process the input data by splitting it up into ranges based on RSI and analyzing the frequency and size of stock increases or decreases within each band. After that, we'll define our price event, where we'll buy the Kelly-optimal amount of the asset at each timestep. Finally, we'll backtest this strategy and compare it against a baseline that always buys with all our money to see if Kelly really helps.

## Initialization
We'll initialize the basics of our Blankly environment with the command *blankly init*. Once done, we get template .json files that we'll need for configuring backtests. Most importantly, we'll need to input our API keys into keys.json.
 
```bash
$ blankly init
```
  Here are our imports. We just need the blankly package
  
```python
import blankly
```
## RSI Range Analysis and Setup

Here, we'll analyze the historical data 

```python
def init_kelly(symbol, state: blankly.StrategyState):
	interface = state.interface
	resolution = state.resolution
	variables = state.variables

	#Get price data
	variables['history'] = interface.history(symbol, 500, resolution, return_as='list')['close']
	rsi = blankly.indicators.rsi(variables['history'])
```
First, we get the historical data from the last 500 time periods and calculate the RSIs.

```python
'''
Create RSI buckets, each of which corresponds to a size-10 range of RSI values. 
First value in array is increase days, second is total days, 
third is sum of losses, fourth is sum of gains.
'''
buckets = [[0,0,0,0] for i in  range(10)]

'''For each datapoint, count whether price increases/decreases, size of increase/decrease,
and put it in appropriate bucket'''

for i in  range(len(variables['history']) - 15):
	r = rsi[i]
	'''
	We offset 14 values because RSI is calculated over 14 time periods, 
	so the first 14 periods we have data for will not have corresponding RSI values
	'''
	p = variables['history'][i + 15]
	cp = variables['history'][i + 14]
	'''
	We calculate the bucket by doing floored division. 
	For RSI outside of the expected bounds, we put the observation in
	either the 0-10 or 90-100 bucket
	'''
	ind = int(r//10)
	if r < 0:
		ind = 0
	elif r > 90:
		ind = 9
	if cp < p:
		buckets[ind][0]+=1
		buckets[ind][1]+=1
		buckets[ind][3]+=((p - cp)/cp)
	elif cp > p:
		buckets[ind][0]+=0
		buckets[ind][1]+=1
		buckets[ind][2]+=((p - cp)/cp)
```
Then, we go through and run our algorithm. At every timestep, we consider whether the stock increased or decreased from the last time step, along with how much and store it. Now, we have to use that to determine the Kelly fraction to invest.

```python
ratios = []
'''Calculates win/loss ratios'''
for elem in buckets:
	if elem[0]==0:
		ratios.append(0) #If no wins, set W/L ratio to 0
	elif elem[1] - elem[0] == 0:
		ratios.append(1) #If all wins, set W/L ratio to 1 -- it won't matter
	else:
		ratios.append((-elem[3]/elem[0])/(elem[2]/(elem[1] - elem[0]))) ##(Sum of wins/number of wins)/(sum of losses/number of losses)
	
'''Calculates win/loss probabilities'''
probs = [(elem[0]/elem[1]) if elem[1]!=0  else  0  for elem in buckets]

'''Calculates Kelly sizing according to formula
W - (1-W)/R. If the Kelly formula returns negative, we put 0, although we could instead short
'''
variables['kelly_sizes'] = [max(0,probs[i] - (1-probs[i])/ratios[i]) if ratios[i]!=0  else  0  for i in  range(len(probs))]
print(variables['kelly_sizes'])
state.variables['owns_position'] = False
```
## Price Event
At this stage, we've collected and analyzed the historical data we'll use to make our decisions on when to buy and how much. Now, we have to define the event that tells our strategy this.

```python
def price_kelly(price, symbol, state: blankly.StrategyState):
	state.variables['history'].append(price) #Add latest price to current list of data

'''Here, we pull the data from the last few days, prepare it,
and run the necessary indicator functions to feed into our model
'''
	rsi = blankly.indicators.rsi(state.variables['history'])
'''Clear previous day's position'''
	curr_value = blankly.trunc(state.interface.account[state.base_asset].available, 2) #Amount of asset available
	if curr_value > 0:
		state.interface.market_order(symbol, side='sell', size=curr_value)
```

The first part of our price event is clearing the previous day's position. We're only looking at a single day when we make decisions, so it doesn't make sense for us to allow our positions to last for over a day. Thus, we clear our previous position on every trading day.

```python
'''Determine bucket based off RSI'''
	ind = int(rsi[-1]//10)
	ind = max(0,ind)
	ind = min(9, ind)
	buy = blankly.trunc(state.variables['kelly_sizes'][ind] * state.interface.cash/price, 2) #Buy appropriate amount
	if buy > 0:
		state.interface.market_order(symbol, side='buy', size=buy)
```

We use the same bucket-choosing strategy as in the initialization, and then buy the appropriate Kelly Fraction.
## Benchmark
Of course, we also need something to test our model against. For this case, we can compare our Kelly-investing bot to one that simply buys the full amount available every time the RSI goes into one of the bands that the Kelly bot would buy in.

```python
def price_baseline(price,symbol,state: blankly.StrategyState):
	state.variables['history'].append(price) #Add latest price to current list of data

'''Here, we pull the data from the last few days, prepare it,
and run the necessary indicator functions to feed into our model
'''
	rsi = blankly.indicators.rsi(state.variables['history'])
'''Clear previous day's position'''
	curr_value = blankly.trunc(int(state.variables['kelly_sizes'][ind]>0.1) * state.interface.account[state.base_asset].available, 2) #Amount of asset available
	if curr_value > 0:
		state.interface.market_order(symbol, side='sell', size=curr_value)
	'''Determine bucket based off RSI'''
	ind = int(rsi[-1]//10)
	ind = max(0,ind)
	ind = min(9, ind)
	buy = blankly.trunc(state.variables['kelly_sizes'][ind] * state.interface.cash/price, 2) #Buy appropriate amount
	if buy > 0:
		state.interface.market_order(symbol, side='buy', size=buy)
```
## Backtesting

To actually backtest, we’ll need to connect to an API. We'll use Alpaca, as we'll try this strategy on stocks but Blankly also currently supports Alpaca, Binance, Coinbase Pro, KuCoin, and OANDA. We then create a Blankly Strategy, add our price event, stocks, and initialization, and run!

```python
exchange = blankly.Alpaca() #Connect to Alpaca API
strategy = blankly.Strategy(exchange) #Initialize a Blankly strategy
strategy.add_price_event(price_kelly, symbol='CRM', resolution='1d', init=init_kelly) #Add our price event and initialization
strategy.add_price_event(price_kelly, symbol='SPY', resolution='1d', init=init_kelly)
strategy.add_price_event(price_kelly, symbol='AAPL', resolution='1d', init=init_kelly)
results = strategy.backtest(to='1y', initial_values={'USD': 10000}) #Backtest one year starting with $10,000
print(results)
```
At the same time, we'll run our baseline, using the below code:

```python
exchange = blankly.Alpaca() #Connect to FTX API
strategy = blankly.Strategy(exchange) #Initialize a Blankly strategy
strategy.add_price_event(price_baseline, symbol='CRM', resolution='1d', init=init_kelly) #Add our price event and initialization
strategy.add_price_event(price_baseline, symbol='SPY', resolution='1d', init=init_kelly)
strategy.add_price_event(price_baseline, symbol='AAPL', resolution='1d', init=init_kelly)
results = strategy.backtest(to='1y', initial_values={'USD': 10000}) #Backtest one year starting with $10,000
print(results)
```
## Results:
Running our Kelly strategy gives us:

```python
Blankly Metrics: 
Calmar Ratio: 3.42
Compound Annual Growth Rate (%): 22.0% 
Conditional Value-at-Risk: 1.02
Cumulative Returns (%): 22.0% 
Max Drawdown (%): 4.0% 
Resampled Time: 86400.0
Risk-Free Return Rate: 0.0
Sharpe Ratio: 1.95
Sortino Ratio: 3.58
Volatility: 0.07 
Value-at-Risk: 58.84 
Variance (%): 0.52%
```
We find a CAGR of 22% -- solid, along with extremely good Sharpe Ratio of 1.95 and a Sortino Ratio of 3.58. 
Compare this to the strategy that fully buys and sells every time: 
```
Blankly Metrics: 
Calmar Ratio: 1.35
Compound Annual Growth Rate (%): 32.0% 
Conditional Value-at-Risk: 4.94
Cumulative Returns (%): 32.0% 
Max Drawdown (%): 15.0% 
Resampled Time: 86400.0
Risk-Free Return Rate: 0.0
Sharpe Ratio: 1.29
Sortino Ratio: 1.7
Volatility: 0.16
Value-at-Risk: 214.84 
Variance (%): 2.59%
```
This performance is not as strong. While the strategy makes more money, it does so with much higher risk. In the real world, both risk and return are important, not just return, which is why we care about ratios like Sharpe -- we can scale strategies more if we're confident they won't lose us tons of money.

<iframe src="https://app.blankly.finance/embed/backtest?id=RETIe0J8EPSQz7wizoJX0OAFb8y1&modelId=EZkgTZMLJVaZK6kNy0mv&backtestId=2b2ff92c-ee41-42b3-9afb-387de9e4f894&option=3" width="100%" height="900"></iframe>

However, the first successful backtest is only the first step in deploying a profitable strategy. Before deploying, we need to test much more thoroughly: with different data (other stocks, with different resolutions, with different buckets), for different times (this backtest only captures one time period -- what about other periods in the bearish/bullish market cycle?), and for robustness with regard to randomness. The results from this test are extremely good, which (for such a simple model) makes us suspect that luck played a role in this performance. 

This is a very strong start, though and Blankly's package makes it very easy to edit and test this model. If you're interested, a GitHub repository containing a full Python Notebook is  [here](https://github.com/blankly-finance/KellyBot).

## Deploying:
We can deploy our model to the cloud on the Blankly Slate platform, where we can view it trading live. To do so, simply change the line that says `strategy.backtest()`
to `strategy.start()`. Then, from a command line, run 
```
blankly deploy
```
You'll be prompted for a few fields -- model description, resource plan, and name, as well as a login. Once you input those, your model will be able to be deployed, and you can view live updates at a URL. The model from this article is [here](https://app.blankly.finance/RETIe0J8EPSQz7wizoJX0OAFb8y1/EZkgTZMLJVaZK6kNy0mv/overview).

Thank you for reading until the end! The next steps are to experiment with this concept -- try building other models that incorporate it, or modify it for your own strategies, or something else -- the possibilities are endless.
