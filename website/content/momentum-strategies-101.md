---
readingTime: 8
title: Momentum Strategies 101 - 3 Strategies
description: Everyone has probably heard of the mantra “Buy low, sell high.” That is, of course, the entire goal of investing, but it is much easier said than done. But what if we could “Buy high, sell higher”? The idea that recent... 
authorName: Colin Wang
authorImage: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/headshots%2Fcolin.png?alt=media&token=416cb884-488e-483f-83e1-96160017f6d1'
date: 2022-04-27T13:00:00.000-05:00
category: Investing
categoryClass: bg-green-100
categoryText: text-green-800
image: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fmomentum%2FArtboard%201.png?alt=media&token=dc3d2acf-df39-412b-9073-a5766b5f6d4f'

---

## Buy Low, Sell Higher?

Everyone has probably heard of the mantra “Buy low, sell high.” That is, of course, the entire goal of investing, but it is much easier said than done. 

But what if we could “Buy high, sell higher”? The idea that recent performance can influence future performance is known as momentum investing. In physics, momentum can be explained as the tendency of a moving object to continue moving. In finance, momentum can be seen as a likelihood that the stock market’s recent winners will remain winners, and that the recent losers will remain losers.

[Momentum investment](https://www.google.com/url?q=https://anderson-review.ucla.edu/momentum/&sa=D&source=docs&ust=1651084465939781&usg=AOvVaw2ldDel7Pf0mxYi9aaOoUR9) strategies emerged after a pioneering 1993 study published in the Journal of Finance by Narasimhan Jegadeesh and Sheridan Titman, two researchers at the UCLA Anderson School of Management. Utilizing historical data from 1965 to 1989, they observed how momentum strategies of buying recent stock winners significantly outperformed the U.S. stock market overall. Jegadeesh and Titman were able to demonstrate that by investing in stocks that had strong performances in the past six months and then holding them for six months, they were able to generate an extra return of almost 1 percent per month. Since Jegadeesh and Titman’s study, there have been numerous similar studies confirming their findings. [A 2013](http://www.investmentpod.com/assets/uploads/whitepapers/SSRN-id2607730.pdf) study conducted by Christopher C. Geczy, a professor at The Wharton School, and Mikhail Samonov, a quantitative portfolio manager at Forefront Analytics, confirmed that momentum strategies have historically outperformed the general market not only with U.S. equities, but also with foreign markets, bonds, currencies, and commodities.

<figure>
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fmomentum%2F78f5ec82346db2ffe86fc7017480afc9.png?alt=media&token=135e4960-454e-4b4e-83ef-3e23a0dfbe93" alt="Maybe a more exponential curve would look more exciting, but steady growth nonetheless" width="800" loading="lazy">
  <figcaption align="center">Momentum has outperformed traditional growth and buy and hold strategies. Credit: Assymetry Observations</figcaption>
</figure>

## Beyond Academia...

Momentum strategies have not only been relevant in the [fields of academia](https://www.moneycontrol.com/news/business/algorithmic-trading-momentum-trading-strategies-a-quantitative-approach-4410611.html). Richard Driehaus, commonly known as the “Father of Momentum Investing,” founded Driehaus Capital management and reportedly delivered 30% compound returns in its first 12 years. The iShares Edge MSCI USA Momentum Factor exchange-traded fund ($MTUM) was launched in 2013, and since then, it has grown to over $10B by consistently and convincingly outperforming the market as a whole. 

Undoubtedly, momentum-based strategies have proven their legitimacy. How can you capitalize on momentum investing as an algorithmic trader? Fortunately, momentum strategies are fairly straightforward to implement, and can be done so in two common ways.


## Putting Momentum into Practice: Time Series

*Sidenote: if you want to put these into practice, check out Blankly's [indicator library](https://docs.blankly.finance/metrics/indicators)*

The first and more basic implementation is a time-series momentum strategy. The time-series momentum strategy trades on the belief that the past returns of securities are positively related to their future performances. Fundamentally, this can be because of a variety of reasons from slow diffusion, analysis, and reaction of information to simply overreacting or underreaction to news. In the end, you select for and trade stocks that have been performing well for a given period.

Beyond just looking at returns for the past given period, technical indicators that you can utilize to build out and customize your model include:

### 1. Moving Averages

In finance, the moving average is calculated as a mean of different subsets of price point data. Common moving averages include the 20-day, 50-day, and 200-day moving averages. Different crossings of moving averages of different lengths can serve as indicators of momentum shifts. One well known example is the Golden Cross; when the 50-day moving average crosses above the 200-day moving average, this is generally considered a bullish signal.

### 2. Relative Strength Index

The relative strength index (RSI) is a technical momentum indicator that measures the magnitude of recent price changes to evaluate overbought or oversold conditions in the price of an asset. The RSI ranges from 0 to 100, with measurements less than 30 generally indicating oversold or undervalued conditions and measurements more than 70 generally indicating overbought or overvalued conditions.

### 3. Stochastic Oscillator

The stochastic oscillator compares a particular closing price of a security to a range of its prices over a certain period of time. Similar to the RSI, the stochastic oscillator ranges from 0 to 100, with readings under 20 considered as oversold and readings over 80 considered as overbought.

An example MACD bot is found below:

<iframe src="https://app.blankly.finance/embed/backtest?id=RETIe0J8EPSQz7wizoJX0OAFb8y1&modelId=JbRyyOcNKaH8C7UlLPDn&backtestId=e92c3ba5-9a73-41e9-ac2c-230cfe4afd94&option=3" width="100%" height="900"></iframe>

You can check out the full article on it and the code [here](https://package.blankly.finance/crypto-macd)

## Using Alternative Data that Capture Momentum

Another slightly more niche example of this strategy is one that capitalizes on earnings reports. A common pattern to see is after a positive reaction to strong earnings, the stock continues to trade in a positive direction, and similarly, after a negative reaction to disappointing guidance, the stock continues to trade lower. This phenomenon is known as post-earnings announcement drift.


<iframe src="https://app.blankly.finance/embed/backtest?id=RETIe0J8EPSQz7wizoJX0OAFb8y1&modelId=WyEGfaSW5F8nuEyVL62L&backtestId=2462e91a-e21e-4cb7-af4b-c3f18df8e5e7&option=3" width="100%" height="900"></iframe>

The earnings momentum bot takes a look at the weeks after an earnings report is released and invests accordingly. The full article can be found [here](https://package.blankly.finance/earnings-momentum-bot)

## Correlated and Cross-Asset Momentum

Beyond basic momentum strategies, more complex momentum-based algorithms momentum across a set of correlated securities. With leveraged on/off momentum, traders use the recent returns of certain securities to inform a judgment about a sector or the market as a whole. THat judgment can then be used to decide how much we want to leverage into a position. Essentially, given two correlated assets A and B, if A has outperformed B in the past, say, two months, then this has implications for the state of the economy as a whole. Given that information on the state of the economy, we can decide whether we expect future market returns to be positive or negative and choose which asset to invest in based on that. There are a variety of similar creative applications that utilize cross-sectional momentum to generate alpha, including opportunities for pairs trading, correlations across sectors, and mean reversion.

In this case, we take a look at how the bond market does compared to the treasury bill and uses that as a momentum factor to invest into a leveraged SPY index `UPRO` or invest in tresaury bonds.

<iframe src="https://app.blankly.finance/embed/backtest?id=Ej51rYC2aFcif4RQLfo5KotkHCv2&modelId=KhNHPBt4uTLdAdifd9QQ&backtestId=7c397de4-9232-44b8-bc53-a9188b222d3e&option=3" width="100%" height="900"></iframe>

You can check out the full article by Jaewoo [here](https://package.blankly.finance/leveraged-spy)


Momentum strategies are now being put more and more into practice, take a stab at one yourself! Congratulations! You just learned 3 ways to add momentum strategies to your personal portfolio. We just scratched the surface of all of the innovative new strategies utilizing momentum, and we cannot wait to see the directions you take your models. Happy building!

<hr>

Want to learn more? Check out our website, [blankly.finance](https://blankly.finance), or reach out to us by email (hello@blankly.finance) or our [Discord](https://discord.gg/kS7Rk6knzU).
