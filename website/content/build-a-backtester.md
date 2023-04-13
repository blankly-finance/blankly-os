---
readingTime: 7
title: Build a Backtester in Python in 10 Minutes
description: Let’s take a look at this first backtester, a vectorized one. First, what is a vectorized backtest? The best way is to prescribe an example. Let’s say I wanted to build a trading algorithm that looked at two moving averages and identified when they crossed (hmmm...sounds like the golden cross)...
authorName: Brandon Fan
authorImage: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fauthors%2Fimg_3678.JPG?alt=media&token=240ddce6-0181-452b-b83e-c7b595678e58'
date: 2022-03-30T15:30:00-05:00
category: Backtesting
categoryClass: bg-indigo-100
categoryText: text-indigo-800
image: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fbacktest.png?alt=media&token=3e50bd43-8fec-4d3d-bc31-24776280ea80'

---

## Welcome to the World of Algotrading

So you’ve made the leap of faith now to discover algotrading. It’s time to get up and running by building your first trading algorithm. You’ve joined the ranks with the many fintech companies and hedge funds that run millions of backtests behind the scene. Backtests are our way of understanding what our algorithms are doing: how they’re making decisions, determining how they invest, and ultimately how they make money. Yet the countless pitfalls in running a backtest like survivorship bias, look-ahead bias, and many other biases, lack of data, and more, can oftentimes lead to confusion. This tutorial will walk you through how to build two backtesters that mitigate these issues: one of which utilizes a vector-based approach, and the other an event-driven approach (don’t worry we’ll go into more detail). We’ll also show you where these backtesters fail, and why building a “fully-production ready” one might be a little harder than you think. 

## The Vectorized Backtester

### What is Vectorization?

Let’s take a look at this first backtester, a vectorized one. First, what is a vectorized backtest? The best way is to prescribe an example. Let’s say I wanted to build a trading algorithm that looked at two moving averages and identified when they crossed (hmmm...sounds like the golden cross). So I download some price data and proceed to calculate the moving averages. Luckily, since it’s a static dataset (since we’re resting), I’m actually able to “precompute” my moving averages. That means that I’m able to compute the 50-day SMA and the 200-day SMA almost immediately. And then figure out when they cross by simply doing a boolean comparison using `pandas`. From there, I can calculate all I need (my overall account value, PnL) and ultimately my backtest. All vectorized —  no for loops required, and we can use linear algebra and matrices to make the computation extremely fast. That’s the whole idea of vectorization. Rather than computing them step by step through time (like using a for loop), we precompute our trading algo (our signal in this case is the cross), and then calculate everything using linear algebra. Let’s code this up in practice. 

### Quick Backtester Spec

**What is Our** **Goal:** Our goal is to build a backtester that is able to take in a signal that can be run across price data and then calculate the total account value returns over time. 

**Process:** We will precompute the signal and then use the signal results to then calculate our Profit & Loss and our account values over time. 

**What Technologies:** We will use `pandas` and `numpy` to do everything and get data from `yfinance` 

### Step by Step Implementation

### Imports:

```python
import pandas as pd
import numpy as np
import yfinance as yf
```

[Pandas](https://pandas.org) and [NumPy](https://numpy.org) are both useful Python libraries for manipulating data. YFinance is a library allowing us to access price data from Yahoo! Finance. YFinance outputs data in the form of Pandas DataFrames, but NumPy objects are often more convenient to work with, so we’ll use both.

### Getting Data:

```python
spy = yf.Ticker('SPY')
hist = spy.history(period = '2y')
pers = hist.loc[:,'Close'].apply(np.log).diff(1)
```

YFinance works through Ticker objects, which collect all the data for a single ticker. As you can guess, our first line does this for the S&P 500. Our second line sets the timeframe we’re looking over — 2 years. The third line helps us work with linear algebra. We take the log of prices so that we can add differentials from day to day and then exponentiate to get the overall return. Diff(1) takes the difference between each pair of elements, allowing us to consider the day-to-day returns, which can be easily combined to represent buying and selling at different times.

### Signal Calculation

```python
def sma(prices, period):
    return prices.loc[:,'Close'].rolling(window=period).mean()
```

We define a helper function here that returns a Pandas DataFrame that contains the specified moving average for each day.

```python
sma50 = sma(hist,50).fillna(0).shift(periods=1, fill_value=0)
sma50[:200] = 0
sma200 = sma(hist,200).fillna(0).shift(periods=1,fill_value=0)
signal = sma50 - sma200
sig = signal.apply(np.sign)
```

We define our signal — the golden cross. After calculating each moving average, we zero elements in the first 200 days, where the SMA200 isn’t defined. We then take the sign of each, so that our signal tells us to go long when SMA50 is over the SMA200 and go short when the SMA50 is under, staying out when the two are equal.

### Backtest

```python
returns = sig * pers
print(returns.cumsum().apply(np.exp))
```

We run the signal over the log-prices and exponentiate to get our final values of the backtest. Our final printed value is 1.188356, corresponding to a gain of nearly 19% .

## The Event-Driven Backtester

### What is Event-Driven?

Okay, so we saw the vectorized backtest. Unfortunately, as we know it, we can’t actually use vectorization in practice. Why? Well we don’t know all the prices beforehand, so we simply can’t precompute our entire signal and then execute on it through time. And that’s the main issue with vectorized backtest: *what we gain in speed, we sacrifice in realistic simulation. *****This is why we introduce an event-driven framework. The event-driven framework instead loops through time to ultimately simulate a trading algorithm directly trading it through each time step (i.e. a for loop). This reduces the potential for biases like look-ahead by only allowing specific data to be accessed at one time. Going back to our golden cross example, this means that we would be computing our moving averages as we go.

### Quick Backtester Spec

**What is Our** **Goal:** Our goal is to build a backtester that is able to take in a signal that can be run across price data and then calculate the total account value returns over time. 

**Process:** We will create an event-driven backtester that will loop through as series of price data and will compute the signal as we move forward in time. 

**What Technologies:** We will use `pandas` and `numpy`, some looping, and we’ll get data from `yfinance` 

### Step by Step Implementation

### Imports

We’ll use the exact same imports as last time.

### Getting Data

We’ll get data in the same way as before

### Data Preparation

```python
prices = hist.loc[:,'Close'].to_numpy()
running_sma50 = prices[150:200].mean()
running_sma200 = prices[:200].mean()
```

We convert our data to NumPy for easy slicing and calculate our running SMAs for a start to trading on day 200.

### Event-Driven Backtesting Loop

```python
event = 0
rets = [0]
for i in range(200, hist.shape[0]):
    rets.append(rets[-1] + (event * (pers.iloc[i])))
    running_sma50+=(prices[i] - prices[i-50])/50
    running_sma200+=(prices[i] - prices[i-200])/200
    event = np.sign(running_sma50 - running_sma200)
```

Like before, we track the operation to do on a given day — buy (1), short sell (-1), or stay neutral (0), and we store it in the variable *event*. Our array *rets* tracks log returns. Each day we have data for (from 200 til the end), we first take the action calculated by the signal on the previous day, execute it, and append to *rets*. Then, we update the running SMAs by adding the most recent price point, subtracting the one that should be dropped (from 50/200 days ago), and dividing that difference by the appropriate period. Finally, we calculate the appropriate operation by taking the sign of the difference between SMAs.

### Output

```python
print(np.exp(rets))
```

Once we exponentiate, we’re left with the cumulative returns. Like before, we get the 1.19 value, corresponding to an ~ 19% gain. While the vectorized backtesting may have been faster, we had sacrificed flexibility. Real trading algorithms often have to dynamically allocate capital, something that vectorized backtesting often doesn’t allow. Although an event-based backtester does address some of these concerns, it is far from perfect.

## Limitations of Both Approaches

Ok sweet—We were able to build out a backtester that was able to output the exact results that we wanted, a graph of our account values over time and our calculate Profit & Loss. If you’re even more stellar, you can also take a look at this article ←- link here that walks you through how to add in the top backtesting metrics that you would like to measure. 

As expected, the quick backtesters that we’ve made aren’t perfect. There are many nuances that our basic backtesters are not able to address, and we go over a few below.

### What if I wanted to build out a new trading algorithm?

We built out these backtesters to work specifically for **this** trading algorithm—a golden cross. Now imagine if we had to build the same set of code again for another type of trading algorithm. What if the new trading algorithm wanted to incorporate some additional data that wasn’t price? How about if it uawa future data, or orderbook data? We would have to rewrite all of this code again to support the new data formats, and handle the necessary connections needed for new types of algorithms. Oftentimes, developing a data pipeline can be huge timesavers when building your own backtesting infrastructure.

### What if I wanted to test multiple algorithms or tickers at once?

Most of the time, we’re not putting all of our eggs into one basket, we’re building multiple algorithms at one time and creating a portfolio of them. Better yet, we run the algorithm on multiple tickers and datasets. Now this becomes even more complicated, do you loop through all of once, do you loop through each separately? What if the algorithms had to communicate with each other? How do you manage things like state? What if one was on a crypto exchange and the other was using stocks? With the current design of our backtester, it would take a lot of work and modification to get it to the point where it’s flexible enough to model these types of algorithms. 

### Are these backtests really representative of the real world?

With the backtests that we’ve made, are we truly modeling everything out? How about things like commission fees in crypto. What about margin accounts and margin interest? What about slippage and accurately modeling order flow? These are concerns that our backtest simply do not handle and don’t provide an idealistic way of looking at all the data to ultimately and accurately represent reality. These are extremely important **especially** as you start trading more and more money. 

## Introducing a Production Ready Backtester

Because of these many concerns, though it’s good to build out your own, oftentimes it’s better to utilize a backtester that mitigates all of the limitations that we’ve seen above. There are a ton of different ones including `backtesting.py`, `backtrader` , `bt`, `vectorbt`, and more. But some things that you have to consider too is that when you’re done with backtesting, how are you going to deploy your trading algorithm live? Do you want to rewrite all of the code again (that’s what current systems and frameworks do and that’s also what you’ll have to do with the backtester above). That’s why we created `blankly`. Blankly is the only package on the market that allows you to go from a trading idea, backtesting it in a realistic environment, paper trading on any exchange, and deploying live on optimized infrastructure in minutes. All you have to do is create `.backtest()`, and switch it out when you’re ready to deploy and launch. Check out our example for the golden cross right here ←linked

```python
from blankly import Alpaca, Interface, Strategy, StrategyState
from blankly.indicators import sma

def init(symbol, state: StrategyState):
    interface: Interface = state.interface
    resolution: float = state.resolution
    variables = state.variables
    # initialize the historical data
    variables["history"] = interface.history(symbol, 800, resolution, return_as='deque')["close"]
    variables["has_bought"] = False

def price_event(price, symbol, state: StrategyState):
    interface: Interface = state.interface
    # allow the resolution to be any resolution: 15m, 30m, 1d, etc.
    resolution: float = state.resolution
    variables = state.variables

    variables["history"].append(price)

    sma200 = sma(variables["history"], period=20)
    sma50 = sma(variables["history"], period=10)[-len(sma200):]
    diff = sma200 - sma50
    slope_sma50 = (
        sma50[-1] - sma50[-5]
    ) / 5  # get the slope of the last 5 SMA50 Data Points
    prev_diff = diff[-2]
    curr_diff = diff[-1]
    is_cross_up = slope_sma50 > 0 and curr_diff >= 0 and prev_diff < 0
    is_cross_down = slope_sma50 < 0 and curr_diff <= 0 and prev_diff > 0
    # comparing prev diff with current diff will show a cross
    if is_cross_up and not variables["has_bought"]:
        interface.market_order(symbol, 'buy', int(interface.cash / price))
        variables["has_bought"] = True
    elif is_cross_down and variables["has_bought"]:
        interface.market_order(
            symbol, 'sell', int(interface.account[symbol].available)
        )
        variables["has_bought"] = False

if __name__ == "__main__":
    alpaca = Alpaca()
    s = Strategy(alpaca)
    s.add_price_event(price_event, "MSFT", resolution="1d", init=init)
    s.add_price_event(price_event, "AAPL", resolution="1d", init=init)
    s.backtest(initial_values={"USD": 10000}, to="2y")
```

What’s even more awesome is that this code can in one line be switched to production, without ever having to rewrite it. 

## Conclusion

Backtesting is a critical part of the algotrading journey and it’s absolutely critical to get it right. Though the backtesting results never imply future performance, it sure as heck can represent the future....if you build it right. In this article, we walked through how to build two types of backtesters and the limitations of each and walked through a couple of other examples.