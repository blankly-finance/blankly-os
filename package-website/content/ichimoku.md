---
readingTime: 14
title: 'The Ichimoku Cloud Strategy'
featured: false
description: The Ichimoku Cloud falls on the more complicated side. Developed by Goichi Hosoda in the 1960s, the indicator consists of 5 separate lines, 2 of which form the bounds for the cloud. More specifically, the formulas for each line are...
authorName: Aditya Akula
authorImage: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fauthors%2F1621733906923.jpeg?alt=media&token=52be6895-c36c-431f-99ad-271e736d461a'
date: 2022-04-25T12:53:00-05:00
category: Technical Analysis
categoryClass: bg-green-100
categoryText: text-green-800
image: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2FScreen%20Shot%202022-04-25%20at%2012.54.37%20PM.png?alt=media&token=8865f8cd-a94e-41ce-8c48-e72aa164487d'
---


As far as technical indicators go, there are tons, each typically claiming to correlate with stocks' typical movement patterns. Their complexity varies, from simple moving averages that average the last few prices to more complicated indicators like the Money Flow Index, which take into other factors such as volume to paint clearer pictures of factor's driving a stock up or down. The Ichimoku Cloud falls on the more complicated side. Developed by Goichi Hosoda in the 1960s, the indicator consists of 5 separate lines, 2 of which form the bounds for the cloud. More specifically, the formulas for each line are:

$$Conversion Line = \frac{9-PH + 9-PL}{2}$$
$$Base Line = \frac{26-PH + 26-PL}{2}$$
$$Leading Span A = \frac{CL + Base Line}{2}$$
$$Leading Span B = \frac{52-PH + 52-PL}{2}$$
$$Lagging Span = Close$$

Once we've calculated all these lines, we then plot them. To do so, we plot the leading spans 26 periods into the future, the lagging span 26 periods into the past, and we take the space between the leading spans as the cloud. When Leading Span A is above Leading Span B, the cloud is green, and when Leading Span B is above Leading Span A, the cloud is red. We continue this process over time to build our full indicator, with the buy signal being the price crossing up out of the cloud and the sell signal being the price crossing down out of the cloud. 

As you can see, the indicator is quite complicated, but it gives us support and resistance levels that adapt over time that can be used to predict future moves of stocks.

## Today's Model

Today, we'll look at using the Blankly package to build a model that uses the Ichimoku Cloud to determine when to buy a stock. As you can guess, we'll calculate the Ichimoku Cloud at every timestep. Then, we'll check whether the price has crossed out of the Ichimoku Cloud to determine if we should buy the stock.

## Overview

First, we'll initialize all the elements of our environment -- the keys for the API we need, as well as the rest of our Blankly environment. Then, we'll process the input data by setting up our data structures for each of the relevant spans  and lines. After that, we'll define our price event, where we'll buy if we break out of the Ichimoku Cloud and sell if our profit target or stop loss is reached. Finally, we'll backtest this strategy to see how effective the Ichimoku Cloud strategy can be in the real world.


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
  
```python
import blankly
```

## Ichimoku Initialization and Setup

Here, we'll analyze the historical data 

```python
def init(symbol, state: blankly.StrategyState):
	# Download price data for initialization
	state.variables['history'] = state.interface.history(symbol, to=300, return_as='list',
	resolution=state.resolution)['close']
	state.variables['owns_position'] = False
	state.variables['take_profit'] = 0
	state.variables['stop_loss'] = 0

	state.variables['leading_span_a'] = np.zeros(len(state.variables['history']), dtype=np.float64)
	state.variables['leading_span_b'] = np.zeros(len(state.variables['history']), dtype=np.float64)
```


First, we get the historical data from the last 500 time periods and initialize our spans, as well as our price event fields.


```python
# Compute span data for the initial data points
for i in range(26, len(state.variables['history'])):
	state.variables['leading_span_a'][i] = ((np.max(state.variables['history'][i-26:i]) + np.min(state.variables['history'][i-26:i]))/2 + \
	(np.max(state.variables['history'][i-9:i]) + np.min(state.variables['history'][i-9:i]))/2)/2
# Average of 52 period max + 52-period min
for i in range(52, len(state.variables['history'])):
	state.variables['leading_span_b'][i] = (np.max(state.variables['history'][i-52:i]) + np.min(state.variables['history'][i-52:i]))/2
```
Now, it's time to define our price event for the actual strategy

## Price Event

At every timestep, we'll be making decisions based on what the Ichimoku Cloud outputs. We'll need to check if we've triggered any stop losses or profit targets, update the cloud, and then take actions based on the new signal.

```python
def price_ichi(price,symbol,state: blankly.StrategyState):
	""" This will update with the most recent price at the resolution specified """
	state.variables['history'].append(price)
	# exit if we don't have enough populated information yet
	if  len(state.variables['history']) < 78:
		return
		
	# calculate the conversion line	
	conversion = (np.max(state.variables['history'][-9:]) + np.min(state.variables['history'][-9:]))/2
	# calculate the base line
	base = (np.max(state.variables['history'][-26:]) + np.min(state.variables['history'][-26:]))/2
	
	# calculate the new leading span a
	leading_span_a = (conversion + base)/2
	# calculate the new leading span b
	leading_span_b = (np.max(state.variables['history'][-52:]) + np.min(state.variables['history'][-52:]))/2
	
	# update spans in state
	state.variables['leading_span_a'] = np.append(state.variables['leading_span_a'], leading_span_a)
	state.variables['leading_span_b'] = np.append(state.variables['leading_span_b'], leading_span_b)

```

The first part of our price event is updating all our spans with the incoming price.

```python
# If we already own a position, look for take profit or stop loss
if state.variables['owns_position']:
	if state.variables['long_position'] and (price <= state.variables['stop_loss'] or price >= state.variables['take_profit']):
		# Sell all owned -- truncate to fit order resolution rules
		curr_value = blankly.trunc(state.interface.account[state.base_asset].available, 2)
		state.interface.market_order(symbol, side='sell', size=curr_value)
		print("\nExiting Long Position ...")
		state.variables['owns_position'] = False
		return
```

Next, we check if the price is above or below one of our limits -- stop loss limit and take profit limit. Those will be set when we buy the stock based on the Ichimoku Cloud.

```python
top_of_cloud_past = max(state.variables['leading_span_a'][-52], state.variables['leading_span_b'][-52])
bottom_of_cloud_past = min(state.variables['leading_span_a'][-52], state.variables['leading_span_b'][-52])
top_of_cloud_current = max(state.variables['leading_span_a'][-26], state.variables['leading_span_b'][-26])
bottom_of_cloud_current = min(state.variables['leading_span_a'][-26], state.variables['leading_span_b'][-26])
cloud_green_in_future = leading_span_a - leading_span_b # green if positive
```
Here, we get the values of all the relevant Ichimoku metrics as described earlier. With these, we have support and resistance levels, and can generate signals on whether to buy.

```python
# BUY SIGNAL
if (price > top_of_cloud_current) and (conversion > base) and \
(cloud_green_in_future > 0) and (price > top_of_cloud_past):
	if not state.variables['owns_position']:
		# Buy as much as possible
		buy = blankly.trunc(state.interface.cash/price, 2)
		state.interface.market_order(symbol, side='buy', size=buy)
		print("\nEntered Long Position ...")
		# Set appropriate flags
		state.variables['owns_position'] = True
		state.variables['long_position'] = True
		# Set stop loss -- bottom of Ichimoku Cloud
		state.variables['stop_loss'] = bottom_of_cloud_current
		# Set profit target -- price + 1.7 times the distance between price and bottom of Ichimoku Cloud
		state.variables['take_profit'] = price + (price - bottom_of_cloud_current) * 1.7
```

## Baseline

Of course, we also need something to test our model against. For this case, we can compare our Ichimoku bot to one that simply buys at the beginning and holds through.

```python
def  price_baseline(price,symbol,state: blankly.StrategyState):
	buy = blankly.trunc(state.interface.cash/price, 2)
	if buy > 0:
		state.interface.market_order(symbol, side='buy', size=buy)
```

## Backtesting

To actually backtest, we’ll need to connect to an API. We'll use Alpaca, as we'll try this strategy on stocks but Blankly also currently supports Alpaca, Binance, Coinbase Pro, KuCoin, and OANDA. We then create a Blankly Strategy, add our price event, stocks, and initialization, and run!

```python
exchange = blankly.Alpaca() # Connect to Alpaca API
strategy = blankly.Strategy(exchange) # Initialize a Blankly strategy
strategy.add_price_event(price_ichi, symbol='GME', resolution='1h', init=init)
results = strategy.backtest(to='3y', initial_values={'USD': 10000}) # Backtest one year starting with $10,000
print(results)
```
At the same time, we'll run our baseline, using the below code:

```python
exchange = blankly.Alpaca() # Connect to FTX API
strategy = blankly.Strategy(exchange) # Initialize a Blankly strategy
strategy.add_price_event(price_baseline, symbol='GME', resolution='1h', init=init)
results = strategy.backtest(to='3y', initial_values={'USD': 10000}) # Backtest one year starting with $10,000
print(results)
```
## Results

Running our Ichimoku strategy gives us:

```
Blankly Metrics: 
Calmar Ratio: 2.63
Compound Annual Growth Rate (%): 233.0% 
Conditional Value-at-Risk: 69.1
Cumulative Returns (%): 3559.0% 
Max Drawdown (%): 79.0% 
Resampled Time: 86400.0
Risk-Free Return Rate: 0.0
Sharpe Ratio: 0.95
Sortino Ratio: 2.59
Volatility: 2.18 
Value-at-Risk: 1044.72 
Variance (%): 474.64%
```

We find a CAGR of 233% -- pretty insane, along with solid Calmar Ratio of 2.63 and Sortino Ratio of 2.63. The Sharpe Ratio is below one, but considering that Sortino is larger than 1, we can infer that this is largely because of variance in positive returns -- not a bad thing.
Compare this to the strategy that fully buys and sells every time: 

```
Blankly Metrics: 
Calmar Ratio: 2.24
Compound Annual Growth Rate (%): 157.0% 
Conditional Value-at-Risk: 78.23
Cumulative Returns (%): 1577.0% 
Max Drawdown (%): 91.0% 
Resampled Time: 86400.0
Risk-Free Return Rate: 0.0
Sharpe Ratio: 0.91
Sortino Ratio: 2.4
Volatility: 2.24
Value-at-Risk: 1134.02 
Variance (%): 501.21%
```

This performance is pretty good, but falls short of the Ichimoku strategy. Returns are lower, and risk-adjusted returns also fall short. While we can presume that a large part of the success of the first strategy is because we ran it on a security with such a large uptrend throughout the backtest timeframe, the fact that we doubled the returns and achieved better risk-adjusted returns speaks to the strength of our strategy.

<iframe src="https://app.blankly.finance/embed/backtest?id=RETIe0J8EPSQz7wizoJX0OAFb8y1&modelId=wzmUrgnjaBwcsSrwSPKx&backtestId=e41328c8-6c32-409c-9c0c-77456c7826e6&option=3" width="100%" height="900"></iframe>

However, the first successful backtest is only the first step in deploying a profitable strategy. Before deploying, we need to test much more thoroughly: with different data (other stocks, with different resolutions, with different buckets), for different times (this backtest only captures one time period -- what about other periods in the bearish/bullish market cycle?), and for robustness with regard to randomness. The results from this test are extremely good, but there's a lot more to consider before actually trading with this model. 

This is a very strong start, though and Blankly's package makes it very easy to edit and test this model. If you're interested, a GitHub repository containing a full Python Notebook is  [here](https://github.com/blankly-finance/IchimokuBot).

## Deploying

We can deploy our model to the cloud on the Blankly Slate platform, where we can view it trading live. To do so, simply change the line that says 'strategy.backtest()'
to 'strategy.start()'. Then, from a command line, run 

```
blankly deploy
```

You'll be prompted for a few fields -- model description, resource plan, and name, as well as a login. Once you input those, your model will be able to be deployed, and you can view live updates at a URL. The model from this article is [here](https://blankly.finance/links/fhGHW2P7zwJYDjgv8).

Thank you for reading until the end!

<hr />

If you're interested in learning more, **[talk to us here @ Blankly](https://calendly.com/blankly)** and check out our **[open source package](https://package.blankly.finance/)**. We'd love to chat! We're constantly in our **[Discord](https://discord.gg/xJAjGEAXNS)** too!