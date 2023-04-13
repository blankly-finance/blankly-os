---
readingTime: 3
title: 'Build Better Algorithms: Three Backtesting Pitfalls to Avoid'
description: In order to understand how well our algorithms will perform in the future, we need to look at how they would have performed in the past. This is backtesting. The process seems easy, but there are many ways it could go wrong.
authorName: Mohnish Aggarwal
authorImage: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fauthors%2FIMG_7346_Facetune_16-07-2020-21-17-31.jpg?alt=media&token=4308860f-7301-42a0-bc15-1a744bfffd89'
date: 2022-01-04T10:45:00-05:00
category: Backtesting
categoryClass: bg-blue-100
categoryText: text-blue-800
image: https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2FScreen%20Shot%202022-01-05%20at%202.27.27%20PM.png?alt=media&token=fe2af311-1e41-456c-8471-33a72d6a2af2
---

A bad backtest will produce a historical performance that is better than what would have been obtained if we actually deployed the algorithm at the time.

## Look-Ahead Bias

The first pitfall we will explore is [look-ahead bias](https://corporatefinanceinstitute.com/resources/knowledge/finance/look-ahead-bias/). This occurs when you trade on data that would have been made available ahead of time. For example, you short when the stock is at 95% of the day’s high. You wouldn’t know the day’s high until after the day is over. To avoid this, we should use lagged historical data. Lagging data means that you calculate your indicators up to the close of the previous trading day. For example, on December 12th your SMA is calculated using December 11th data.

Luckily, [Blankly](https://blankly.finance) reduces look-ahead bias by imposing an event driven architecture for model backtesting so that if you are training machine learning algorithms, or optimizing across backtests, look-ahead bias is mitigated.

## Data-Snoopping Bias

The second pitfall we will discuss is [data-snooping bias](https://www.hillsdaleinv.com/uploads/Data-Snooping_Biases_in_Financial_Analysis,_Andrew_W._Lo.pdf). This occurs when you over optimize the parameters of your model based on historical data and will lead to backtest results greater than what you will receive in the future. For example, from the data you have, you identify that the price always goes up after the RSI hits 33, the 30 day moving average crosses the 60 day moving average, the MAC-D indicates a buy, the price is at the bottom most bollinger band, the volume is at 90% of its high, and the moon is full. The best way to avoid this is to keep your model simple with few parameters.

## Survivorship Bias

The third pitfall we will discuss is [survivorship bias](https://www.investopedia.com/terms/s/survivorshipbias.asp). Many free databases only include stocks that are available today, and not stocks that were delisted. Therefore, your strategy is given a boost because it was not traded on securities that went to zero. This can be especially dangerous if your strategy tries to buy stocks that are “cheap”. These stocks are often cheap for a reason. For example, imminent bankruptcy, existing in a bad political climate, recent illegal activity, the list goes on... It is worth buying data sets that include securities that are not extinct.

Happy backtesting!

<hr>

## Want to learn more?

If you're interested in learning more about technology that can streamline your backtesting, [just request a demo of Blankly](https://calendly.com/blankly) here. We'd love to chat! We're constantly in our [Discord](https://discord.gg/xJAjGEAXNS) too!
