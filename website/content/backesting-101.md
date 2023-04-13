---
readingTime: 5
title: "Build Better Algorithms: Backtesting 101"
description: For all quantitative traders, whether you are just starting out or have years of industry experience, backtesting can make or break your strategy’s profits. In this article, we will go over some of the key pitfalls of backtesting, as well as the metrics to keep an eye out for when you backtest your own models. 
authorName: Colin Wang
authorImage: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/headshots%2Fcolin.png?alt=media&token=416cb884-488e-483f-83e1-96160017f6d1'
date: 2022-01-02T08:45:00-05:00
category: Trading
categoryClass: bg-blue-100
categoryText: text-blue-800
image: https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fbacktest.png?alt=media&token=3e50bd43-8fec-4d3d-bc31-24776280ea80

---

For all quantitative traders, whether you are just starting out or have years of industry experience, backtesting can make or break your strategy’s profits. Backtesting a strategy is a complex process that involves obtaining past data, removing biases, and analyzing strategy performance, with the ultimate goal of providing evidence that the strategy will be profitable in the future. In this article, we will go over some of the key pitfalls of backtesting, as well as the metrics to keep an eye out for when you backtest your own models. 

## Backtesting Data - The Process

As you conduct a model backtest, its results should give you a sense of how a strategy would perform if deployed into action. Nevertheless, the backtesting results are far from a guarantee, whether because of changing market conditions or subtle biases in data. In the end, data quality is the key factor behind the quality of the backtest. When you obtain data, whether through data vendors or free data sets like [Yahoo finance](https://finance.yahoo.com/), you should always keep data accuracy, survivorship bias, and corporate actions in mind.

- **Data Accuracy** is the measure of the quality of the data, and whether or not the data contains price / time errors. Some errors can be easily identified and fixed, while others are more subtle and can throw off the quality of the backtest. When backtesting, it is recommended to have two or more data providers and compare the data between them. 
- [**Survivorship Bias**](https://www.investopedia.com/terms/s/survivorshipbias.asp) occurs because datasets sometimes do not contain assets that are no longer traded on exchanges, whether due to M&A activity or bankruptcy. Historically, delisted equities have typically performed worse than equities covered by the dataset. As a result, backtested strategies tend to perform better on datasets with survivorship bias, as the “survivor” assets, or assets still contained in the dataset, are preselected. Survivorship bias is more common in free or cheap datasets. 
- [**Corporate Actions**](https://www.investopedia.com/terms/c/corporateaction.asp) are any activities by the company that change the raw price of the asset, but should not be included in the calculation of returns for the strategy. The most common examples include dividend payouts and stock splits. Back adjustments are necessary to ensure the backtest runs on the correct data.

## Backtesting Metrics - The Analysis

Once you obtain and process your data, all of the numbers can be overwhelming. When you run your backtest, most of the time you care about just a few key metrics that measure the performance of your strategy over the time period. We list some of the most common ones below:

- [**Sharpe Ratio**](https://www.investopedia.com/terms/s/sharperatio.asp) is the excess returns divided by the standard deviation of those returns. Excess returns is calculated by comparing absolute return to a benchmark, typically the returns of an index or the treasury rate.
- [**Sortino Ratio**](https://www.investopedia.com/terms/s/sortinoratio.asp) is the excess returns divided by the negative standard deviation of those returns. 
- [**Maximum Drawdown**](https://www.investopedia.com/terms/m/maximum-drawdown-mdd.asp) is the largest observed loss from a peak to a trough of a portfolio. This serves as a good estimator for future drawdown performance of the model.
- [**Win-Loss Ratio**](https://www.investopedia.com/terms/w/win-loss-ratio.asp) is the average positive return divided by the average negative return. 

These are just some of the many key metrics used in quantitative finance. Once you identify the performance of your model on the backtesting data, you can make alterations to the model to improve its backtested performance. 

Backtesting can be a complicated, convoluted process, but in today’s quantitative industry, it is more important than ever. Developers must intelligently backtest their strategies, and fine tune their models with the backtest results. Once you iterate enough on your model and achieve consistently good backtest runs, you can be confident that your model is ready to generate alpha in the market!

<hr>

## Want to learn more?

If you're interested in learning more about technology that can streamline your backtesting, [just request a demo of Blankly](https://calendly.com/blankly) here. We'd love to chat! We're constantly in our [Discord](https://discord.gg/xJAjGEAXNS) too! 
