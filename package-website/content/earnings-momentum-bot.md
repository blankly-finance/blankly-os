---
readingTime: 20
title: 'The Earnings Call Momentum Strategy'
featured: true
description: Earnings reports are the most consistent news releases indicating company performance, and earnings releases are typically accompanied by large swings in price. While it's difficult to actually predict those swings without access to insider information, we can still take advantages of them by using momentum strategies that match the trend after the fact.
authorName: Aditya Akula
authorImage: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fauthors%2F1621733906923.jpeg?alt=media&token=52be6895-c36c-431f-99ad-271e736d461a'
date: 2022-04-25T14:30:00-05:00
category: Alternative Data
categoryClass: bg-green-100
categoryText: text-green-800
image: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2FScreen%20Shot%202022-04-25%20at%2012.54.37%20PM.png?alt=media&token=8865f8cd-a94e-41ce-8c48-e72aa164487d'
---

The stock market is often chaotic and behaves in counterintuitive ways, but one of the most clear factors in stock behavior is earnings performance. Earnings reports are the most consistent news releases indicating company performance, and earnings releases are typically accompanied by large swings in price. While it's difficult to actually predict those swings without access to insider information, we can still take advantages of them by using momentum strategies that match the trend after the fact. It's been documented that following the existing trend after earnings can produce market-beating [returns](http://centerforpbbefr.rutgers.edu/TaipeiPBFR&D/990515Papers/6-3.pdf). Today, we'll try to see if that still holds, even in a rough market environment.

## Today's Model

Today, we'll look at using the Blankly package to build a model that uses the market's reaction to earnings to determine whether to buy a stock. We'll first use the Financial Modeling Prep API to pull data on the earnings dates of the stocks we wish to observe -- for this model, the Dow 30. Then, we'll define a price event that steps through time, checks whether a week has passed since earnings for each of our stocks, and if so, check whether the price has increased since then. If it's been a week since earnings and price has increased, we'll buy the stock while simultaneously shorting the Dow as a whole, planning to hold the position for a week. The simultaneous short is an example of a pairs trade -- we're able to lower risk and ensure more consistent returns by hedging against market downturns. In the end, our model just needs to consistently beat the total of all Dow stocks to be successful, which means both that our backtest "controls" for greater market trends, giving us better insight into its effectiveness, and that our strategy has much lower directional risk and thus will likely achieve better risk-adjusted returns.

## Overview

First, we'll initialize all the elements of our environment -- the keys for the API we need, as well as the rest of our Blankly environment. Then, we'll pull earnings calendar data for each of the stocks we're trading so we can track when there is an earnings call, and we'll create data structures that we'll store in state that we'll use to improve efficiency as we step through time during our backtest. After that, we'll define our price event that checks for price increases a week after earnings and buys a stock if that is present (along with shorting the Dow). Finally, we'll add our event to our group of stocks and backtest.

## Initialization

We'll initialize the basics of our Blankly environment with the command *blankly init*. Once done, we get template .json files that we'll need for configuring backtests. Most importantly, we'll need to input our API keys into keys.json.

```bash
$ pip install -U blankly
$ blankly init alpaca
```

Here’s the link to how to get your [Alpaca Keys](https://www.youtube.com/watch?v=0TO-OF-70Ok&t=1s), we’ll plug these right into the CLI
 
Here are our imports. We just need the blankly package
  
```python
import blankly
```

And awesome! We’ve now initialized our directory with all of our files. To see more information about what’s going on here, you can see more [here](https://docs.blankly.finance/getting-started/your-first-algorithm#setting-up-your-environment-with-blankly) and [here for CLI](https://docs.blankly.finance/getting-started/tutorial)

Following the prompts, we should now be completely set up! 

### Initializing with the Blankly Platform

The Blankly Platform enables you to have a wider access of more metrics, visualizations, and features along with the storage of your previous backtests all over time. It also allows you to deploy your model live to production in literally seconds. Now all we have to do is alter our step above and do: 

```bash
$ pip install -U blankly
$ blankly login # (This will take you to the platform)
$ blankly init
```

Once you’re logged in, you can finish the set up and creation of your first model via `blankly init` and selecting “Yes I want to connect to the platform”. 
 
Here are our imports. We need the blankly package along with some libraries for API requests -- used for obtaining the earnings calendar -- and some general filesystem utilities.
  
```python
import blankly
import requests
import json
import datetime
from os.path import exists
```
## Earnings Calendar Initialization and Setup

Here, we'll pull some historical price data, but more importantly, we'll use the Financial Modeling Prep API to get the earnings calendars for each of our stocks. First, we'll define a helper function to parse through the dates given by the API.

```python
def time_utility(time):
	return datetime.datetime.strptime(time, '%Y-%m-%d')
```

Now, we'll get to actually writing our initialization function

```python
def init(symbols, state: blankly.StrategyState):
	# Download past price data for initialization.
	state.variables['history'] = {symbol:state.interface.history(symbol, to=50, return_as='list',\
	resolution=state.resolution)['close'] for symbol in symbols}

	'''
	Store earnings dates for each ticker in a dictionary of lists.
	Each ticker maps to a sequential list of earnings dates.
	'''
	state.earnings_dates = {}

	'''Use the Financial Modeling Prep API to pull earnings dates and store them in .json files.
	Store the files in a local folder
	If we have already downloaded said data, skip over the ticker.
	'''
	for symbol in symbols:
		if  not exists('CalendarJSONs/'+symbol + '.json'):
			result = requests.get('https://financialmodelingprep.com/api/v3/historical/earning_calendar/'\
			+ symbol +'?apikey=YOUR_API_KEY')
			data = result.json()
		with open('CalendarJSONs/'+symbol+'.json', 'w+') as f:
			json.dump(data, f)
		with open('CalendarJSONs/'+symbol+'.json', 'r') as f:
			rdata = json.load(f)	

			'''
			Initialize an empty list to store earnings dates.
			Store dates from least recent to most recent.
			'''
			lis = []
			for elem in rdata[::-1]:
				lis.append(time_utility(elem['date']))
			state.earnings_dates[symbol] = lis
```
We pull the data from the API and then parse that to create a list of earnings dates for each stock. To finish off our initialization, we'll define some helper data structures to store some state information for use from tick to tick  that'll improve our efficiency.

```python
# Helper data that we will store to encode where we are in the list of earnings dates
state.earnings_indices = {symbol:0  for symbol in symbols}

# Dictionary -- track which securities we own positions in
state.variables['owns_position'] = {symbol:False  for symbol in symbols

'''Have we initialized earnings indices yet?
We have to do this in the first iteration of our arbitrage event
because our starting point is dependent on the backtest length
'''

state.variables['init_indices'] = False
```

Now, it's time to define our price event for the actual strategy

## Price Event

At every timestep, we check whether one of the stocks we track has recorded a positive post-earnings week. We also track the stocks of the ones we already own positions in that we want to sell and, if necessary, short the Dow to hedge our directional exposure. 

```python
def earn_event(prices, symbols, state: blankly.StrategyState):
	'''
	We use the last element in symbols as the SPDR Dow ETF
	We do this so we can pairs trade on our strategy relative to the Dow
	This both gives us a measure of how effective our strategy is relative to the market
	and reduces our risk.
	'''
	# Append most recent price so we can check later on if stock price increased after earnings
	for symbol in symbols[:-1]:
		(state.variables['history'][symbol]).append(prices[symbol])
	
	'''
	If we haven't initialized indices already, do so.
	Do this by iterating through each stock's earnings calendar
	until the current date is within 7 days of the last earnings report.
	'''
	if  not state.variables['init_indices']:
		for symbol in symbols[:-1]:
			while (state.time - state.earnings_dates[symbol][state.earnings_indices[symbol]].timestamp()) > 7 * 86400:
				state.earnings_indices[symbol]+=1
				state.variables['init_indices'] = True
	# Initialize buy list to 0 -- this will hold the stocks we open/keep positions in.
	buy_list = []

	'''
	For each symbol except for the ETF, calculate the time between last earnings and now
	If it's 7 days (1 week) after earnings and price has increased, choose to open a position
	If it's after this, but before 2 weeks after earnings, choose to keep our current position open
	Otherwise, if we have an open position, it's ready to be closed, so we do so and increment the earnings index for that stock.
	'''
	for symbol in symbols[:-1]:
		diff = (state.time - state.earnings_dates[symbol][state.earnings_indices[symbol]].timestamp())
		if diff >= 7 * 86400  and diff <= 8 * 86400:
			if state.variables['history'][symbol][-1] > state.variables['history'][symbol][-6]:
				buy_list.append(symbol)
		elif state.variables['owns_position'][symbol] and diff >=8 * 86400  and diff <= 14 * 86400:
			buy_list.append(symbol)

		elif state.variables['owns_position'][symbol]:
			curr = blankly.trunc(state.interface.account[symbol].available, 2)
			if curr > 0:
				state.interface.market_order(symbol, side = 'sell', size = curr)
				state.variables['owns_position'][symbol] = False
				state.earnings_indices[symbol]+=1

	'''
	The buy list consists of tickers to hold positions (must be rebalanced)
	as well as tickers to open positions in. One way to rebalance is to sell all current holdings
	and then rebuy according to new allocations. This wouldn't be used in practice, as factors
	such as slippage make this worse than alternatives like simply selling and rebuying in a single transaction.

	However, for this slippage-free backtest, the two methods are equivalent, so we'll do this.
	'''
```

Now, we've figured out which stocks we want to open positions in. Next, we'll open the actual positions. We'll split our long exposure between all the stocks we want to buy, and we'll open a corresponding short position in $DIA, an ETF that tracks the Dow if we have long 

```python
for symbol in buy_list:
	if state.variables['owns_position'][symbol]:
	# Get the amount of available shares of stock
		curr = blankly.trunc(state.interface.account[symbol].available, 2)
		state.interface.market_order(symbol, side = 'sell', size = curr)
	# Sell and rebuy

	'''
	Here, we have the DIA logic for pairs trading.
	If we own a DIA position, close it out.
	If we're going to buy stocks, open a new DIA position.
	Set the buy size for stocks to equal allocation of our cash across all stocks.
	'''
	if blankly.trunc(state.interface.account['DIA'].available, 2) < 0:
		state.interface.market_order('DIA', side ='buy', size = -blankly.trunc(state.interface.account['DIA'].available,2))
	if len(buy_list) > 0 :
		buy = state.interface.cash/len(buy_list)
		state.interface.market_order('DIA', side ='sell', size = blankly.trunc((state.interface.cash - prices['DIA'] * state.interface.account['DIA'].available)/(prices['DIA']),2))
	else:
		buy = 0

	# Loop through tickers in buy list and buy + set flag to True.
	for symbol in buy_list:
		if blankly.trunc(buy/prices[symbol], 2) > 0:
		state.interface.market_order(symbol, side ='buy', size = blankly.trunc(buy/(prices[symbol]), 2))
		state.variables['owns_position'][symbol] = True
```

## Backtesting

To actually backtest, we’ll need to connect to an API. We'll use Alpaca, as we'll try this strategy on stocks but Blankly also currently supports Alpaca, Binance, Coinbase Pro, KuCoin, and OANDA. We then create a Blankly Strategy, add our event, stocks, and initialization, and run!

```python
if __name__ == "__main__":
	# Authenticate Alpaca Strategy
	exchange = blankly.Alpaca(portfolio_name="another cool portfolio")
	
	# Use our strategy helper on Alpaca
	strategy = blankly.Strategy(exchange)
	
	# Define our strategy on all 30 Dow stocks.
	dow_stocks = ['AXP', 'AMGN', 'AAPL', 'BA', 'CAT', 'CSCO', 'CVX', 'GS', 'HD', 'HON', 'IBM', 'INTC','JNJ',\
'KO', 'JPM', 'MCD', 'MMM', 'MRK', 'MSFT', 'NKE', 'PG', 'TRV', 'UNH', 'CRM', 'VZ', 'V', 'WBA', 'WMT', 'DIS', 'DOW', 'DIA']

	# Run the event every time we check for a new price - once a day
	# The arbitrage event framework allows us to define strategies on groups of stocks together
	strategy.add_arbitrage_event(earn_event, dow_stocks, resolution='1d', init=init)

	# Start the strategy. This will begin each of the price event ticks
	# strategy.start()
	# Or backtest using this
	results = strategy.backtest(start_date='04/23/2021', end_date = '4/23/2022',initial_values={'USD': 10000})
	print(results)
```

## Results:
Running our strategy gives us:
```
Calmar Ratio:                      2.92
Compound Annual Growth Rate (%):   11.0%
Conditional Value-at-Risk:         4.01
Cumulative Returns (%):            11.0%
Max Drawdown (%):                  4.0%
Resampled Time:                    86400.0
Risk Free Return Rate:             0.0
Sharpe Ratio:                      1.16
Sortino Ratio:                     2.16
Value-at-Risk:                     71.42
Variance (%):                      0.38%
Volatility:                        0.06
```

Our CAGR isn't bad, but it isn't amazing 11%, but this is also over a market-neutral time period, so we see that we beat the market. Also, we do well in terms of risk-adjusted-returns -- we achieve Sharpe, Sortino, and Calmar ratios all over 1 with generally low volatility. In a real situation, this model's low CAGR could be mitigated by providing it more leverage, as we have higher confidence that it won't blow up. 

<iframe src="https://app.blankly.finance/embed/backtest?id=RETIe0J8EPSQz7wizoJX0OAFb8y1&modelId=WyEGfaSW5F8nuEyVL62L&backtestId=2462e91a-e21e-4cb7-af4b-c3f18df8e5e7&option=3" width="100%" height="900"></iframe>

You can also find this model on Blankly Slate [here](https://blankly.finance/links/ZB7jWSX6e3tLHkLV9)

However, the first successful backtest is only the first step in deploying a profitable strategy. Before deploying, we need to test much more thoroughly: with different data (other groups of stocks, with different time periods), for different times (this backtest only captures one time period -- what about other periods in the bearish/bullish market cycle?), and for robustness with regard to randomness. The results from this test are good, but there's a lot more to consider before actually trading with this model. 

This is a strong start, though and Blankly's package makes it very easy to edit and test this model. If you're interested, a GitHub repository containing a full Python Notebook and code is [here](https://github.com/blankly-finance/EarningsMomentum).

## Deploying:
We can deploy our model to the cloud on the Blankly Slate platform, where we can view it trading live. To do so, simply change the line that says 'strategy.backtest()'
to 'strategy.start()'. Then, from a command line, run 

```bash
$ blankly deploy
```

You'll be prompted for a few fields -- model description, resource plan, and name, as well as a login. Once you input those, your model will be able to be deployed, and you can view live updates at a URL. The model from this article is [here](https://app.blankly.finance/RETIe0J8EPSQz7wizoJX0OAFb8y1/WyEGfaSW5F8nuEyVL62L/overview).

<hr>

If you're interested in learning more, **[talk to us here @ Blankly](https://calendly.com/blankly)** and check out our **[open source package](https://package.blankly.finance/)**. We'd love to chat! We're constantly in our **[Discord](https://discord.gg/xJAjGEAXNS)** too!