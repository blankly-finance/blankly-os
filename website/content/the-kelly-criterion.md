---
readingTime: 4
title: Using the Kelly Criterion for Trading Algorithms
description:
  If you’ve ever played blackjack, you know that bet size is key. In blackjack, if you know both the current Running count and the True count, your odds for winning the hand are 52%. Theoretically...

authorName: Colin Wang
authorImage: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/headshots%2Fcolin.png?alt=media&token=416cb884-488e-483f-83e1-96160017f6d1'
date: 2022-04-04T00:16:45-05:00
category: Trading
categoryClass: bg-indigo-100
categoryText: text-indigo-800
image: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fkelly-criterion%2FBlackJack.png?alt=media&token=10dfc62c-c7f1-4c7c-b015-95a2f6490b08'
---

## So a little background...

If you’ve ever played blackjack, you know that bet size is key. In blackjack, if you know both the current Running count and the True count, your odds for winning the hand are 52%. Theoretically, this should always result in profit in the long run provided you make the optimal call to hit or stand. But in reality, the size of your bet, while oftentimes overlooked, plays a pivotal role in maximizing long-term wealth.

That’s where the Kelly Criterion comes in. Proposed in 1956 by John Kelly, the Kelly Criterion calculates the optimal proportion of one’s net worth to risk in any given wager or bet to maximize wealth growth over time. Mathematically, the Kelly bet fsize maximizes the expected value of the logarithm of wealth, or maximizing the expected geometric growth rate. The formula itself simple:

### Implications

But the implications are huge. With blackjack card counting, wagering 4% of your net worth each round results in the greatest long run profits, whereas wagering 8% performs markedly worse and wagering 25% results in losses. [This blog post](https://nickyoder.com/kelly-criterion/) by Nicholas Yoder, senior portfolio manager at Virgil Quantitative Research, provides a great visualization, and explains a simple rationale: winning and then losing the same percentage of your net worth, or vice versa, will always result in a net loss.

<figure>
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fkelly-criterion%2FBlackJack.png?alt=media&token=10dfc62c-c7f1-4c7c-b015-95a2f6490b08" alt="The Kelly Criterion" width="800" loading="lazy">
</figure>

### Algotrading & Kelly Criterion

So why should I care as an algorithmic trader? [Recent research](https://www.frontiersin.org/articles/10.3389/fams.2020.577050/full) has demonstrated that utilizing the Kelly criterion to optimize portfolio allocations yields the maximum expected growth rate and the median of the terminal wealth. With a normal distribution of returns, the Kelly criterion has the best performance in the long run, even when measured against identical portfolios optimized by Markowitz’s [Modern Portfolio Theory](https://ebrary.net/7079/business_finance/what_modern_portfolio_theory). Compared with these portfolios lying on the mean-variance efficient frontier as outlined by the [Modern Portfolio Theory](https://corporatefinanceinstitute.com/resources/knowledge/trading-investing/modern-portfolio-theory-mpt/), portfolios following the Kelly criterion had higher expected return, but as a result, higher variance. While the Modern Portfolio Theory still remains the [gold standard](http://epchan.blogspot.com/2014/08/kelly-vs-markowitz-portfolio.html) for many portfolio managers, the Kelly Criterion is still a very viable strategy for managing a portfolio.

<figure>
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fkelly-criterion%2FKelly%20Equation.png?alt=media&token=8d939c32-1b8c-407f-9e73-2dfc5ca1f521" alt="The Kelly Equation" width="800" loading="lazy">
</figure>

## Putting Kelly Criterion into Practice

How can you utilize the Kelly Criterion in your own trading algorithm or portfolio of algorithms? There are two main ways you can add this new concept to your toolkit for generating alpha.

### Option 1: Allocate Per Trade

Firstly, you can calculate the optimal portfolio allocation for each trade.

<figure>
<img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fkelly-criterion%2FKelly%20graph.png?alt=media&token=b8b991db-87a9-4c48-9231-a1fc2e9f34c2" alt="The Kelly Graph" width="800" loading="lazy">
</figure>

Regardless of the metric or strategy your model is based on, once your model identifies a trade, you can implement the Kelly Criterion to reach the optimal portfolio allocation. By calculating a win percentage and win/loss ratio, you can calculate the proportion of your portfolio to allocate to the trade.

If you choose to implement the Kelly Criterion into your model in this way, you should always keep in mind the risk-return tradeoff that the criterion assumes. As you approach the Kelly estimate optimal max bet, the additional return from additional risk diminishes significantly. The region of optimal risk/reward trade off is oftentimes half or less of the Kelly optimal allocation. As we mentioned before, the Kelly Criterion identifies the maximal expected geometric growth rate. Winning then losing the same proportion results in a net loss, and this loss grows quadratically in respect to the bet size. As a result, [allocating](https://www.lesswrong.com/posts/TNWnK9g2EeRnQA8Dg/never-go-full-kelly) 50% of the proposed optimal proportion yields 75% of the Kelly-optimal profit with only 1/4th of the variance. With that being said, it oftentimes is worth experimenting with what percentage of the Kelly-optimal proportion you allocate for each trade. In the end, it ultimately comes down to your personal tolerance of risk.

### Option 2: Calculate Total Cash Allocation

Secondly, you can calculate the amount of total capital allocation for each deployed trading algorithm, essentially treating each algorithm as a fund.

Many algorithmic traders deploy multiple algorithms at the same, grouped together in a project or portfolio of models. The second way algorithmic traders can utilize the Kelly Criterion uses backtesting to calculate actionable metrics that can then be plugged into the allocation formula.

By backtesting for Win %, or the # of positive returns over the # of total returns, as well as the Win Loss Ratio, or the average positive return over the average negative return, you have the necessary information to find the Kelly-optimal proportion of your capital to allocate to each algorithm.

QuantFiction outlines the basic formulas for calculating the trading metrics necessary for the Kelly Criterion. With this way of creating a portfolio of portfolios, there are many novel, creative ways in algorithmic trading to diversify and generate alpha. Here's our backtest result from creating this model.

<iframe src="https://app.blankly.finance/embed/backtest?id=RETIe0J8EPSQz7wizoJX0OAFb8y1&modelId=EZkgTZMLJVaZK6kNy0mv&backtestId=85761b0b-5c36-4f85-91a6-274cb17580c4&option=3" width="100%" height="900"></iframe>

Well, there you have it: 2 ways to add the Kelly Criterion into your own trading algorithm portfolios. Interested in building out a model with the Kelly Criterion in less than 100 lines of code?

<hr>

If you're interested in learning more, [talk to us here @ Blankly](https://calendly.com/blankly) and check out our [open source package](https://package.blankly.finance). We'd love to chat! We're constantly in our [Discord](https://discord.gg/xJAjGEAXNS) too!
