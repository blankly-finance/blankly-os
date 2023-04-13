---
readingTime: 6
title: Why You Shouldn’t Use a No-Code Trading Platform - 3 Reasons
description: There’s a huge buzz in the market nowadays that “anyone can make money”
  in the markets. True, it’s gotten so much easier, and with the advent of technologies
  of all alike, it sure has hell has made investing and opportunities in the market
  so much more formidable
authorName: Brandon Fan
authorImage: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fauthors%2Fimg_3678.JPG?alt=media&token=240ddce6-0181-452b-b83e-c7b595678e58'
date: 2022-01-20
category: Business
categoryClass: 'bg-green-100'
categoryText: 'text-green-800'
image: "https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fno-code.png?alt=media&token=b6d16c06-2cab-44b9-a8c3-b5f14631ccd1"

---
## Growing Trend of Algo-Trading

There’s a huge buzz in the market nowadays that “anyone can make money” in the markets. True, it’s gotten so much easier, and with the advent of technologies of all alike, it sure has hell has made investing and opportunities in the market so much more formidable. With the rise of Crypto and decentralized finance alone, new asset classes have been born including perpetual futures, liquidity pools, staking protocols, and yield farming strategies that go against traditional markets, offering new hedges and opportunities for those that can take advantage...and that’s the key, _for those who can take advantage_. When we look at investing, there are a multitude of things that we care about: risk management, asset control / custody, security, volatility, and ultimately returns. 

With all of this in mind, as we look at the world of quant and trading, we see really two stark paradigms. The first is the DIYBIY (do it yourself, build it yourself) people who build just about everything in-house from the underlying infrastructure, to the exchange connections, to the live monitoring and more (typically around $10M+ average spend from hedge funds). Finally, the other side of the paradigm is the no-code trading platforms, the “we build everything completely for you”, and “click a few buttons, and you’ll be able to build your own trading algorithm in no time”. Now this is a paradigm, and of course there are middle grounds, but here’s **3 reasons you do not want to be using a no-code trading platform.**

## Where is your competitive advantage?

Hedge funds exist because: well they simply are “better than the average investor”, or at least they advertise themselves like that. Okay, now assuming that they are “better”, in the sense that they do beat the market, what makes a hedge fund so special? After a lot of tweaking, analyzing papers, and more, it really boils down to a simple equation:

**Great Data + Great Algorithm + Great Market = Great Hedge Fund**

There you go, the secret formula to building a hedge fund. And every hedge fund out there has a competitive advantage in at least one of the three areas (the best bet is to have at least 2 out of the three). Now with this in mind: Great Data, Great Algorithm, and Great Market, can we truly create market beating returns using a no-code trading platform where data and systems are limited to tickers and candles from exchanges? Can we truly create market beating returns if we’re not leveraging asset derivatives like options to reduce risk? Can we truly create market beating returns by not using alternative data like news or analytics to make better risk decisions? Just with these three facts in mind, we have simply covered all of the items that make a great trading strategy, there is simply not enough customizability to build a market beating strategic return. With no-code trading platforms, you are simply restricted to using technical indicators, and stop-losses to hedge your bets and risks, let alone complex strategies like complex portfolio rebalancing, smart order routing, and more.

There is simply not enough customization within no-code based platforms to allow for any part of the hedge fund equation to be improved upon, making no-code platforms not suitable for building fully automated strategies or super useful signals.

## Abstraction and Control

If you’re an investor, this section might not be the best for you, but for developers and hedge funds, pay attention. Everything about investing is about control. Whether it’s market connections, server uptime, and API key management, ensuring that your strategies are up and running and secure are the utmost important. With no-code trading platforms, you are entrusting all of your code and technology to a web platform with limited customization and minimal exit strategies. Underlying functions and calls are done completely in-house and proprietary, with limited knowledge of implementation. What they gain in allowing for easy “setup”, they lose in customizability, control, and abstraction of your trading algorithm. What if the platform shuts down? What if the next day the servers are changed? These items are extreme considerations for anyone moving tens of thousands of dollars automatically via a platform.

## Extensibility and Iteration

No-code is great if you have a strategy that specifically uses technical indicators. It’s great for plugging in a [SMA](https://www.investopedia.com/terms/s/sma.asp) here, an [RSI](https://www.investopedia.com/terms/r/rsi.asp) there, and using those to make some sort of large conditional statement to make a decision. Cool, but what if we abstracted this to one more level, say that I wanted to first look at SMA and if it passes the “golden cross” test, then I want to look at RSI, but if it doesn’t, I want to look at support and resistance levels, just this conditional statement results in an inability to use a no-code trading platform. What if you built your own trading signal? You could not easily plug this into a no-code trading platform nor create the APIs and services to pass the results in.

How about actually conceiving this strategy? How do we backtest and test multiple configurations with varying levels of logic? With no-code trading platforms, you are restricted to specific parameters on specific indicators with limiting results (remember our equation, what about experimenting with other items like tickers or data sources). All of these make your strategies less effective and more risky compared to a thoroughly tested strategy.

## What’s No-Code Great For

If you’re an investor or a trader who looks purely at technical indicators, no-code platforms might be super great for you as you’ll be able to easily iterate and improve upon your algorithms without knowing how to program. If you’re looking at a single source of data via price, then no-code is right up your alleyway since many platforms like [Tuned](https://www.tuned.com/), [Mudrex](https://mudrex.com/), and [Trality](https://www.trality.com/) integrate well with many crypto integrations. [Composer](https://www.composer.trade/) takes an even more interesting approach to no-code strategies with its fun-to-use building-blocks like design. 

<figure>
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2FWhy%20You%20Shouldn%E2%80%99t%20Use%20a%20No-Code%20Trading%20Platform%2FScreen%20Shot%202022-01-20%20at%204.31.11%20PM.png?alt=media&token=15479a8f-9889-478d-9a5a-1e7fb1037a19" alt="Composer's new idea of no-code" width="800" loading="lazy">
  <figcaption align="center">Composer's new idea of no-code</figcaption>
</figure>

## What’s the alternative?

Now if you’re serious about building trading algorithms and generating algorithms just like the pros do, you’ll have to look elsewhere. As we mentioned, the other spectrum is the DIYBIY mentality and that’s what many hedge funds focus on doing (well at least the top 4%), with millions of dollars to spend on infrastructure, these hedge funds attempt to build everything out in-house. And yet this spectrum is also dangerous as you enter the side of being too bogged down on infrastructure and too little time to focus on building a strong algorithm. Fortunately, there is a middle. Trading frameworks out there enable users to build trading algorithms at record speed without infrastructure headache, in addition, the transition to actually implementing strategies are almost painless (and sometimes even easier than no-code). For example, take a look at this tutorial below where we used Blankly to build a bot in 25 lines of code (literally 6 minutes). Without the worry of handling infrastructure and the ease of transitioning to programming while also maintaining the ability to rapidly build, and expand your trading algorithms in data, algorithms, and markets, trading frameworks like Blankly are your best bet if you want to build meaningful trading algorithms that truly beat the market.

If you’re looking for the best ones, I definitely encourage you to take a look at [this comparison](https://blankly.finance/why-us).


<p align="center">
<iframe width="728" height="410" src="https://www.youtube.com/embed/pcm0h63rhUU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

## Conclusion (The TL;DR)

* Algo-trading is growing and it’s a new asset class that unlocks a whole flurry of potential to beat the new market
* Don’t get stuck on using no-code trading platforms that lack customizability, abstract control and risk, and aren’t extensible as you will be left in the dust by the many adopting more complex strategies based on the hedge fund equation
* Instead use an easy to use trading framework such as Blankly to rapidly build and deploy trading models at scale without sacrificing the ability to build complex strategies and data sources
* Keep building and keep trying 😄
