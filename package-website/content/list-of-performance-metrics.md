---
readingTime: 6
title: Trading Algos - 5 Key Backtesting Metrics and How to Implement Them
featured: false
description: Performance metrics are key to building better strategies and screeners. Whether it's analyzing a single strategy or a portfolio of strategies, fundamentally you are making trades, assuming costs and risks, and making a return on your investment. Let's see how some of these metrics and how to implement them in practice.
authorName: Brandon Fan
authorImage: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fauthors%2Fimg_3678.JPG?alt=media&token=240ddce6-0181-452b-b83e-c7b595678e58'
date: 2022-01-07T12:45:00-05:00
category: Education
categoryClass: bg-green-100
categoryText: text-green-800
image: https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fbacktestinggraph.png?alt=media&token=3b2489d4-ea25-43b6-844c-beb6b3e0f94d
---

Metrics surround us. Whether you're building the next big thing and need to measure customer churn, retention rates, etc. you will always need numbers to really back it up. This is the same when we are building trading strategies. We need easy and straightforward ways of analyzing whether or not our model is actually doing well. Now before we go into understanding various portfolio metrics, we have to first really understand the point of having good metrics. And for that, we have to understand what it means for a model to "do well".

<alert type="info">

For some of you readers out there, you probably already know what you want out of a strategy and what metrics you may want to do. For that, feel free to skip ahead to the various metrics and their implementations.

</alert>

## What is "Doing Well"

<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/7NysYN4cMeTt8ICxbb" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/XavierMBB-basketball-letsgox-xaviermbb-7NysYN4cMeTt8ICxbb">via GIPHY</a></p>

Now when you think of a good investment strategy, what do you think the most important thing is? First and foremost, at least for most people it is, "I want to make the most amount of money possible", i.e. your return on investment (which can come in many forms too as we will soon see). But then this begs the question of a multitude of things: "when do I get my returns?", "how do I get my returns?", "do I care about my returns every year", and, arguably one of the MOST important questions, "what are my chances of NOT getting my returns", i.e. my risk. Ahh, you see now the question gets much more nuanced as there are a lot more factors. So I propose a different statement of doing well. Doing well is not just about how much money you make, but also about when you make it and how much risk you are taking on.

<blockquote> A model does well when it successfully produces high returns year-over-year while reducing the amount of risk for those returns </blockquote>

That's awesome, now how do we actually measure that? How do we measure risk, returns, and all of these other factors? Well that's why we have metrics.

## Introducing Strategy Metrics

Now for many people new to quant or even pros probably don't know all of these metrics and each of these metrics might be used for a variety of use cases. Before we go into them, I think it's super important to keep in mind that not one metric tells an entire story, just like a person is not just governed by their name. No one metric can tell you whether or not a stock is a good buy or not, nor can one metric tell you if your model is good or bad.

So let's get into it. We're going to go through 5 useful metrics in this post. If you want to [see more metrics](https://docs.blankly.finance/metrics/metrics) or don't want to implement all of these yourself, you can take a look at the [Blankly package](https://blankly.finance) that is one of the fastest and easiest to set up trading packages out there. Also, [here](https://docs.blankly.finance/metrics/metrics) are some great explanations on some of the metrics that we go over today.

I've also implemented all of these in an easy to use and copy [gist](https://gist.github.com/bfan1256/114f8e5445009bd5d117351906508858).

## (0?). Compound Annual Growth Rate - Starting Easy 😉

Compound Annual Growth Rate (or CAGR for short) is one of the most important metrics and the most traditional metrics out there. What does the CAGR tell us? Well it takes our cumulative return (how much did we cumulatively make across X years of a backtest or a strategy), and finds the percentage that makes it such that your cumulative return was equal to your portfolio growing at Y% per year.

Okay, that's a little confusing, so let's use an example. Let's say that your strategy started out with $100 and after 5 years you turned your money into $500. Well what's your cumulative return? **(500 - 100) / 100 = 400%**

But what does that tell you about how much you made over the years—i.e. what is the "annual return" of your portfolio? With that, we can then easily compare this to things like the SPY [(which has a CAGR of 9.9%)](http://www.moneychimp.com/features/market_cagr.htm). To do this we annualize our return with the following formula:

<figure>
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fcagr.svg?alt=media&token=38d0be27-414c-427b-95c1-0289212e53ea" alt="cagr">
</figure>

Shoutout [Investopedia](https://www.investopedia.com/terms/c/cagr.asp) for a nice and beautiful formula :D

Now using this formula we can see that our strategy has an annualized return of **(500 / 100)^(1/5) - 1 = 37.97%.**

Nice! Now how do we implement this formula? As you can see it's pretty straightforward, if we have our start and end balance.

```python
account_values = [100, 200, 300, 400, 500]

def cagr(start_value: float, end_value: float, years: int):
	return (end_value / start_value) ** (1.0 / years) - 1

cagr(account_values[0], account_values[-1], 5)
# 0.3797...
```

Great! Super easy and straightforward.

### When would I use this?

Use [CAGR](https://docs.blankly.finance/metrics/metrics#cagrstart_value-end_value-years) as a way to easily compare your returns across strategies. It's much easier to analyze annualized returns because various strategies will have been run longer than others. When you're backtesting, you might run one strategy for 30 years whereas another one for 10. These will clearly have different cumulative returns so you will HAVE to use CAGR.

### What is a Good CAGR?

As mentioned before, we use CAGRs to compare with different benchmarks such as the SPY, BTC-USD, Russel 100, etc. thus we can now compare our CAGR with these benchmarks and figure out whether or not our model is beating a traditional buy and hold. You should also compare this to what you want to make (for example real estate returns on average 10-12%, current crypto defi rates such as at [Celsius](https://celsius.network/) provide upwards of 8.50% in CAGR).

<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/14SAx6S02Io1ThOlOY" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/mostexpensivest-viceland-most-expensivest-14SAx6S02Io1ThOlOY">via GIPHY</a></p>


## 1. Sharpe Ratio 

The [Sharpe ratio](https://www.investopedia.com/terms/s/sharperatio.asp) is one of the most renowned ratios out there because it captures two things: 1. The amount of reward you are getting, i.e. your returns, but also 2. how much risk you are taking on. It then takes this and makes it into a metric that can be verbalized as "for every unit of reward, how much risk am I taking on?" or put another way, "what is my reward to risk ratio", or another way, "Am I being rewarded for my risk?", now with that in mind, I think most of you guys can guess that it's going to include some sort of division. And indeed, it does! But the question we have to ask ourselves is...well how do we measure reward and risk? The ratios use something very different from CAGR. Instead of using account values (your total asset value at specific times), it uses returns or deltas (changes in your account value at some times), and uses these to ultimately calculate risk (the standard deviation in returns) and reward (the average in returns).

<figure>
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2FScreen%20Shot%202022-01-07%20at%205.30.58%20PM.png?alt=media&token=9fbb260c-2340-431a-a66c-1029b3c032f3">
</figure>

### So why do we use standard deviation of returns?

Standard deviation, if you remember from stats class is a measure of how spread out your data is. In the case of returns, how spread out your returns is, means how volatile your account value is. The more spread out your returns are, the more likely you are to run into losses, and therefore more emotion and therefore more volatility. I mean who wants to see their strategy go from up by 7% on one day, and then drop by 50% the next day 💀💀!

### What is Risk Free Rate?

Our Risk Free Rate is our benchmark for how much we would make if we chose a "risk free investment," as typically this is the treasury yield, or can also be the estimated percentage that you would make if you did a buy and hold, or whatever you define as "risk free".

### Now what the heck is that square root of n?

Now we have a list of returns, but have no concept of time, how do we know if the returns are on a per hour return or on a per day? As you can see, the various sharpe ratios are going to be different depending on the sample time and sample size (don't forget about your stats class and standard error, it's ok I kinda also forgot).

Don't believe me? Think about it, do stocks move more in a minute, or do they move more in a day? Every minute, a stock might move 0.01% but every day, stocks might move 1 to 2%. Well, clearly the sharpe ratios are going to be very very different. That's why we have to annualize them all so that they are consistent and easily comparable. This makes it possible for us to compare strategies that are running on minute data, and strategies that run every hour or every day (it really doesn't matter).

### Implementation (PAY ATTENTION)

Now to implement this one, we'll have to do some manipulation to our account values. Let's use the power of [numpy](https://numpy.org/) to help us out here (oh and it's also the same in [pandas](https://pandas.pydata.org/) too. We'll be using `np.diff` to take the returns of our account values and resampling them.

```python
import numpy as np
from math import sqrt

# our account values every month
account_values = np.array([100, 200, 400, 300, 250, 600, 575, 425, 325, 800, 900, 1020])

def sharpe(account_values: np.array, risk_free_rate, annualize_coefficient):
  diff = np.diff(account_values, 1) / account_values[1:] # this gets our pct_return in the array
  # we'll get the mean and calculate everything
  # we multply the mean of returns by the annualized coefficient and divide by annualized std
  annualized_std = diff.std() * sqrt(annualize_coefficient)
  return (diff.mean() * annualize_coefficient - risk_free_rate) / annualized_std

sharpe(account_values, 0.099, 12)
# 0.9292540351869186
```

### Now hold up...🤔

For the astute observer, you might have saw that the sharpe ratio formula doesn't have an annualize coefficient in the numerator but the actual formula does. And we also only annualize the denominator. Why is that? That's because the statistical formula assumes the returns are in the unit of $X and not as a ratio (i.e. $ / time). This is why in practice, we multiply in the numerator and only in the denominator as well. This will then give us our correct result 😃.

### What's a Good Sharpe Ratio?

As we mentioned, the sharpe ratio is a ratio of reward vs risk, so anything greater than one is phenomenal. This means that for every unit of risk, you are getting more reward. A sharpe ratio of 2 is phenomenal, a sharpe ratio of even higher...well you might be onto something amazing (or you might need to check your calculations).

Great! Now let's talk about a similar ratio. The Sortino Ratio.

## 2. Sortino Ratio

The [sortino ratio](https://www.investopedia.com/terms/s/sortinoratio.asp) is almost the exact same as the sharpe ratio, except one difference: instead of analyzing ALL the standard deviations of returns, we only care about the negative returns. Why do we do this? Well I don't care if my model necessarily makes 25% and then 2% the next, they're all wins in my book, what I care more about is that I don't want to be losing 25% one day and then 2% the next day, I'd much rather only lose 2% maximum.

### Implementation

The implementation is almost the exact same, but we'll use some more beautiful numpy magic here to help us out. We'll use boolean masking (it's actually amazing)

```python
import numpy as np
from math import sqrt

# our account values every month
account_values = np.array([100, 200, 400, 300, 250, 600, 575, 425, 325, 800, 900, 1020])

def sortino(account_values: np.array, risk_free_rate, annualize_coefficient):
  diff = np.diff(account_values, 1) / account_values[1:] # this gets our pct_return in the array
  # we'll get the mean and calculate everything
  # remember, we're only using the negative returns
  neg_returns = diff[diff < 0]
  annualized_std = neg_returns.std() * sqrt(annualize_coefficient)
  return (diff.mean() * annualize_coefficient - risk_free_rate) / annualized_std

sortino(account_values, 0.099, 12)
# 2.954078445173037
```

### When would I use Sharpe vs Sortino?

Again, going back to what I said early, no one ratio or metric tells the whole story. Sharpe and Sortino are great for varying things. Sharpe will tell you your overall standard deviation, and Sortino will tell you your reward relative to how volatile your downside risk is (which induces the most emotion). If you care about overall reduced volatility, use sharpe, if you care about making sure that your model reducing negative downside, then use sortino.

## 3. Maximum Drawdown

Okay, let's stop looking at ratios, and focus on another metric. Maximum Drawdown. The [maximum drawdown](https://www.investopedia.com/terms/m/maximum-drawdown-mdd.asp) is as it sounds: it's the largest drop between a peak and a trough. It shows the largest swing you're expected to have during a trade or strategy and is actually used to calculate the [calmar ratio](https://www.investopedia.com/terms/c/calmarratio.asp) (here's the [implementation](https://docs.blankly.finance/metrics/metrics#calmarreturns-n252-risk_free_ratenone)). This is important, well because we want to know how long our model is going to "lose money for", or just simply what the biggest loss our strategy incurred over a period of time. We can also compare this to our benchmarks and see if we're losing more money and introducing more volatility than our benchmarks.

### Implementation

For this implementation, let's use pandas because we can use some pandas magic and their functions to calculate the cumulative product of the returns and subsequently the associated peaks. How does pandas do this? It takes the cumulative product at various points and then finds the maximum peak as it goes (making that a series), it then takes that and finds the lowest values by using cumulative and finding the ultimate drawdown.

```python
account_values = pd.Series([100, 200, 400, 300, 250, 600, 575, 425, 325, 800, 900, 1020])

def max_drawdown(account_values):
  returns = account_values.diff(1) / account_values[1:]
  cumulative = (returns + 1).cumprod()
  peak = cumulative.expanding(min_periods=1).max()
  dd = (cumulative / peak) - 1
  return dd.min()

max_drawdown(account_values)
# -0.6381664371434193
```

### What is a good drawdown?

Drawdowns are always negative...so naturally we want less of that negative number (so the closer it is to 0, the better). Unfortunately, we can't ever hope to have a fully 0% drawdown, so the closer it is the better, typically seeing something that's less than 10% in drawdown is amazing.

## 4. Value-At-Risk

Now, [Value-at-Risk](https://en.wikipedia.org/wiki/Value_at_risk) is a complicated metric as it's not super super intuitive to visualize as [there isn't a direct formula](https://www.investopedia.com/terms/v/var.asp). Value-at-risk (VaR) is very straightforward: what is the maximum capital am I risking at any given point in time in the portfolio (i.e. the average value at risk at any given point in time). Think of it as like a sample of the means. Thus, we use a confidence interval to determine how confidently we can estimate the value at risk. To do this, we take your returns and create a normal distribution (wow the stats is all coming back 🤯) now that's great and all. But a faster way to do this is to sort all the returns (from negative to positive as they will naturally create a normal distribution), and take the associated confidence interval.

### Implementation

```python
import numpy as np
from math import sqrt

# our account values every month
account_values = np.array([100, 200, 400, 300, 250, 600, 575, 425, 325, 800, 900, 1020])

def value_at_risk(account_values, alpha: float):
  initial_value = account_values[0]
  returns = np.diff(account_values, 1) / account_values[1:]
  returns_sorted = np.sort(returns) # sort our returns (should be estimated normal)
  index = int(alpha * len(returns_sorted))
  return initial_value * abs(returns_sorted[index])

value_at_risk(account_values, 0.95)
# $59.375
```

### Interpreting the Results

What's beautiful about VaR and [Conditional VaR](https://docs.blankly.finance/metrics/metrics#cvarinitial_value-returns-alpha) is that they are outputted in the unit of the asset, so we can directly translate that into something we can directly visualize and see. The more value that is at risk, the more we should be worried about each trade that is made. Thus, we want to minimize this as much as possible. I mean...I want to sleep at night too.

## 5. Beta

The final metric we're going to look at is Beta. Now most of you guys have probably heard of alpha (1. it's before in the greek alphabet, and 2. it's the amount of returns you have made in excess to the market), but beta is something that looks again at something that we care about: volatility or systematic risk. Specifically, beta compares your strategy to a designated benchmark or asset (say SPY, BTC-USD) and compares your strategies returns relative to theirs. The higher the beta, the more volatile your strategy is "relative" to the base asset, or the more systematic risk you are taking on, check out [article by Investopedia](https://www.investopedia.com/terms/b/beta.asp). Thus, the closer the beta is to one, the more aligned it is with the base asset, and a beta less than one means that your strategy is less volatile (which can also mean you can sleep better by using your strategy INSTEAD of using buying the base asset, and everyone wants that).

### Implementation

Now implementing this in practice is actually slightly harder, because we actually have to get market data. There are a multitude of different ways to do this. Some work in "research" environments and non-static data, others work in "liver" data, but we're going to use one that uses both: Blankly. [Blankly](https://blankly.finance/) is a package that enables the rapid development of trading algorithms at scale, extremely quickly (I built an RSI screener bot in 25 lines of code), and allows for direct connections with live exchanges for free live trading out of the box! Now there is some set up that you have to do, but fortunately all you have to do is run a simple command:

```bash
$ blankly init
```

And your entire directory is setup. You can check out more info [here](https://docs.blankly.finance/getting-started/installation).

To actually implement this, we're going to make our function a lot more powerful by incorporating market data to directly calculate beta:

```python
from blankly import Alpaca, CoinbasePro # supports stocks, crypto, and forex
a = Alpaca() # initialize the Alpaca Exchange

account_values = np.array([100, 200, 400, 300, 250, 600, 575, 425, 325, 800, 900, 1020])

def beta(returns, baseline='SPY', return_resolution='1m'):
  # get the last X month bars of the baseline asset
  market_base_returns = a.interface.history(baseline, len(returns), resolution=return_resolution)
  m = np.matrix([returns, market_base_returns])
  return np.cov(m)[0][1] / np.std(market_base_returns)
```

Great, now we're hooked up with live data in real-time. And the beauty of it is that we can easily switch this to use crypto by changing our exchange and that's all we need to do! A full function that works across assets.

Don't want to use blankly for stocks? We can also use [`yfinance`](https://pypi.org/project/yfinance/), and the code would look like this (with some restrictions):

```python
import yfinance as yf

account_values = np.array([100, 200, 400, 300, 250, 600, 575, 425, 325, 800, 900, 1020])

def beta(returns, baseline='SPY', return_resolution='1m'):
  # we have to restrict this to get the past year
  ticker = yf.Ticker(baseline)
  market_base_returns = ticker.history(baseline, period='1y', interval='1m')
  m = np.matrix([returns, market_base_returns])
  return np.cov(m)[0][1] / np.std(market_base_returns)
```

### Why is Beta important?

Beta is super useful for us because we want to know if our model is gaining a higher reward while also beating the base asset or benchmark (i.e. less volatile and a reduction in systematic risk compared to the overall market). This is beautifully paired up with all of our metrics that we've seen earlier and allows us to get a complete and holistic view of our trading models.

## Let's Sum It Up

### The Importance of Testing

Okay wow... that was a lot. But I hope that this tutorial was super useful for you to easily see how we can use metrics to make better decisions about our strategies. **Again, make sure you are testing all of your models before deploying them live or putting real money in.** But also, don't ever forget that backtesting can only tell you only a certain amount: past performance never defines future success 😃.

<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/IedrijvVSFIASnhmuX" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/guardian-test-corona-testing-IedrijvVSFIASnhmuX">via GIPHY</a></p>

In this article we learned about 5 metrics:

- Sharpe Ratio - Reward / Risk Ratio across all returns
- Sortino Ratio - Reward / Risk Ratio across negative returns
- Maximum Drawdown - The largest loss during a backtest or strategy period
- Value-at-Risk - The value at risk that is made per trade
- Beta - The volatility of your strategy relative to some benchmark or base asset

### Always Use Metrics as Comparisons and Not in Isolation

Remember that we don't use metrics in isolation to validate our model. We have to compare it to a variety of other models, strategies, and benchmarks.

### How do I easily improve my strategies and these metrics?

It's hard to say how to best improve every strategy because each strategy is fundamentally different (for example strategies that trade on specific assets are going to be limited by the volatility of the underlying asset). But I have a couple of recommendations:

#### Use Stop Losses

Stop losses are great ways to make sure that you are not losing money. Investor's Business Daily has a great article on this that you can find [here](https://www.investors.com/how-to-invest/investors-corner/still-the-no-1-rule-for-stock-investors-always-cut-your-losses-short/) on cutting your losses short. This will greatly improve your sortino ratio and sharpe ratios if you're able to adequately exit out of losing trades. You are as good as your losses are 😃.

#### Make More Frequent Trades

This one might work both well or poorly, but the more trades you make the more "small wins" you will have which will naturally reduce your volatility. This might not change your sharpe ratios and sortino ratios, but depending on your interval, various trades will result in better results. This combined with stop losses will also really help.

#### Iterate, Iterate, Iterate

Nothing can beat iteration and rapid optimization. Try running things like grid experiments, batch optimizations, and parameter searches. Take a look at various packages like [`hyperopt`](http://hyperopt.github.io/hyperopt/) or [`optuna`](https://optuna.org/) as packages that might be able to help you here!

## Signing Off Here!

That's all I have! I hope you thoroughly enjoyed this post, and hopefully this helps you along your quant journey. You can get all the metrics in this [gist](https://gist.github.com/bfan1256/114f8e5445009bd5d117351906508858).

If you still have questions, feel free to reach out to me over twitter [@bfan1256](https://twitter.com/bfan1256) or [join this discord](https://discord.gg/xJAjGEAXNS) where we talk about building strategies as much as we breathe ;). 

If you’re excited about this space and quantitative finance, we love to hear more about why you’re interested and encourage you to get started by [building your own trading model](https://docs.blankly.finance/examples/rsi) using Blankly.

Cheers to all the quants out there! Keep building 😊 🚀
