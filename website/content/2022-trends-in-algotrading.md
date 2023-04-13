---
readingTime: 7
title: 4 Algotrading Trends in 2022
description: As the market for algotrading grows and developers gain experience, it will become more and more difficult to achieve the same level of returns. As institutional investors and big brokerage houses compete innovate in the space and maintain the same levels of alpha, here are a few notable trends to be aware of
authorName: Colin Wang
authorImage: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/headshots%2Fcolin.png?alt=media&token=416cb884-488e-483f-83e1-96160017f6d1'
date: 2022-03-28T13:30:00-05:00
category: Trends
categoryClass: bg-indigo-100
categoryText: text-indigo-800
image: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

---

If you are interested in quantitative finance, you have probably heard of algorithmic trading. Algorithmic trading is using pre-programmed trading instructions based on various factors such as time, price, and volume to automatically execute orders. As of 2021, algorithmic trading accounts for around 60-73% of the overall U.S. equity trading volume, but experts believe that number can climb to as high as 95%. With a variety of tailwinds like favorable government regulations, increasing demand for fast, reliable, and effective order execution, as well as decreasing transaction costs, the Algorithmic Trading Market is expected to grow at a compound annual growth rate of 10.5% over the forecast period from [2022-2027](https://www.mordorintelligence.com/industry-reports/algorithmic-trading-market%23:~:text%3DAlgorithmic%2520trading%2520accounts%2520for%2520around,(source%253A%2520Wall%2520Street)&sa=D&source=docs&ust=1648490727090970&usg=AOvVaw2bHsuo-SFz1UQIVzXmyo24). Inevitably, as this market grows and developers gain experience, it will become more and more difficult to achieve the same level of returns. As institutional investors and big brokerage houses compete innovate in the space and maintain the same levels of alpha, here are a few notable trends to be aware of:

## 1. Smart Algorithm Management and Deployment

On any given day, an algorithmic trader will only deploy a certain subset of his available algorithms. Within institutional investors, there is often an Order Management System (OMS) or Execution Management System (EMS) that limits access to specific trading algorithms. Here is a great [Medium article](https://medium.com/@ed.sav/the-oms-order-management-system-and-ems-execution-management-system-dichotomy-7d8ef58b7fbe&sa=D&source=docs&ust=1648490727083443&usg=AOvVaw1zK_pPzACKV0KQwiq_8YNl) to better understand the difference between an OMS and an EMS. Traders have to manually select the best trading algorithm based on the execution objectives, and then tune the parameters of the model to best fit prevailing market conditions. Obviously, there are flaws with this current system. While traders are able to understand when different macroeconomic circumstances call for various models, it is unrealistic for them to perfectly identify the model that will maximize returns in the given time period. This current methodology has been shown to be unscalable and impractical, resulting in many unfavorable results being blamed on the trader. 

<figure>
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2F2022-Trends%2F1_VA5kHNxb-fjmn8_pJLMlLQ.png?alt=media&token=9a933a3e-c435-433a-b794-1e7ccd3e1316" alt="OMS vs EMS" width="800" loading="lazy">
  <figcaption align="center">Difference between OMS & EMS (Credit: Edwin Savarimuthu)</figcaption>
</figure>

According to [Optimal Trading Algorithm Selection and Utilization](https://jot.pm-research.com/content/8/4/9&sa=D&source=docs&ust=1648490727092373&usg=AOvVaw2QH7ZDgtnrcv-VCG2IvJ8a): *Traders’ Consensus versus Reality*, published in The Trading Journal, with any given market condition and order requirement, selecting the right algorithm and tuning its parameters can significantly affect execution performance. As a result, research and development of a new set of tools that supports execution processes by suggesting which algorithms to use will drive alpha. There are already a plethora of tools used to [optimize Machine Learning (ML) and Artificial Intelligence (AI) models](https://neptune.ai/blog/best-tools-for-model-tuning-and-hyperparameter-optimization). The logical next step is to employ similar tools to optimize which algorithms to use and the specific parameters to implement depending on the given objective. These new trading systems will use benchmarking to provide intelligence on what algorithms to use and when, automating much of the work within the OMS/EMS. As this space is explored further, expect to see improved algorithm recommendations improving traders’ returns.

## The Increasing Importance of the Real-time Integration of Transaction Cost Analysis

Once you build a trading algorithm, the first thing you probably want to do is [backtest](https://package.blankly.finance) it and get some insights on how that model would have performed historically. While metrics like maximum drawdown, sharpe, sortino, payoff ratio, and more may reveal insights into the risk / reward, return formation, and general statistics about the current model, it does not provide a path to figure out how to improve the model. “Okay I know my Sharpe Ratio is bad, but I don’t know WHY my Sharpe Ratio is bad.” 

That’s where [Transaction Cost Analysis](https://guides.interactivebrokers.com/am/am/reports/understandingthetransactioncostanalysis.htm) (TCA) comes in. TCA is defined as the study of trade prices to determine whether the trades were arranged at favorable prices, AKA buying low and selling high. Essentially, each executed trade in the period of the analysis is marked to a series of performance benchmarks with the results displayed in multiple interactive tables. Using a variety of metrics including trade date, order side, exchange, trade price and underlying, to see how each trade performed when compared to the benchmark.

Through analysis of transactions in this manner, developers are able to see what trades performed well and which ones did not. However, at the end of the day, TCA is only the measurement of an outcome. It is simply a piece of data that does not provide any direct insight into how to resolve poor trading results. In the flood of data that even a single modern trading algorithm generates, it is nearly impossible for a trader to pinpoint what in the model influenced the trading outcome.

The next generation of TCA aims to address this problem, to offer tools that interpret and incorporate TCA results directly into the trading algorithm. Today, there are [trading platforms](https://blankly.finance/why-us) that aid in the visualization of trade execution and allow you to compare trades with one another as well as with other [key benchmarks](https://blankly.finance/list-of-performance-metrics). Utilizing these platforms can provide value by allowing you to iterate upon and improve your models. In the future, more intelligent models will immediately utilize TCA results from the previous trades to inform the next one. This real-time feedback loop will be crucial in transforming TCA from noise to signals on how developers can improve their models.

## Algorithms will become more intelligent and reactive to market conditions

When it comes to algorithmic trading, the best models are the ones that react to the markets. This is commonly seen with major market makers utilizing order book data, and complex methods of hedging, maintaining market neutrality, or simply following the momentum. However, maintaining these types of positions, and managing the ingestion of data at high levels with varying levels of visibility makes it extremely difficult for traders and even current trading algorithms to do this effectively.

As a result, there has been immense amounts of research poured into models and methods that are able to improve in response to market feedback. Pre-trade feedback is a technique that is being explored to give algorithms a sense of adaptiveness, utilizing results from prior trades to inform future ones. Trading algorithms that have this feedback loop of AI/ML-driven pre-trade recommendations are able to continuously adjust and customize to best suit the market conditions. By capitalizing on innovations in this space, the next generation algorithms will be adaptive and will deploy ML-driven technology to react to market conditions. This should lead to the development of algorithms that are increasingly exotic and unexplainable, but are nonetheless generating greater returns.

## Expansion Across Multiple-Asset Classes

While algorithmic trading has traditionally been for long equities, algorithmic trading models are rising in prominence for many other asset classes, whether they are forward/future contracts or derivatives like options. JPM records that in 2016, clients traded less than 35% of their eFX volume through algorithmic orders. That number increased to almost 60% in 2020, highlighting the clear diversification of assets that are traded algorithmically. 


<figure>
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-docs-images.appspot.com/o/overview%2Fpackage-overview.png?alt=media&token=917d757f-1c02-4d91-9b04-d8891291ed05" alt="Smart Order Routing" width="800" loading="lazy">
  <figcaption align="center">The Blankly Package</figcaption>
</figure>



Smart Order Routing (SOR) and cross-asset automation are key developments that are making the asset class expansion of algorithmic trading possible. By streamlining the execution of a chosen strategy beyond just the best price, Smart Order Routing can make a significant difference in the returns of an algorithm. Cross-asset automation, on the other hand, streamlines the process of asset conversions and strategies involving multiple asset classes. Both of these innovations can differentiate an investor’s returns, especially as the technology behind them becomes more and more advanced.

Beyond assets and derivatives based on the Web 2.0, the emergence of Web 3.0 and the blockchain has brought with it many novel ways to earn returns. Whether it is investing in cryptocurrencies, staking, or yield farming, innovative algorithms capitalizing on asset classes based on Web 3.0 can result in very impressive returns. However, much of the infrastructure for truly automated trading across Web 3.0 has not yet been fully developed, resulting in painfully tedious processes transferring from wallet to wallet or depositing funds into each different protocol. Nevertheless, early pioneers in this space, whether they are Web 3.0 focused hedge funds or the retail investor in the loop with Web 3.0 opportunities, have been able to capitalize on the various opportunities.

From cross-asset automation with more traditional assets to trading assets across Web 2.0 and Web 3.0, algorithmic trading will expand to cover a vast variety of asset classes. 

## Conclusion

There you have it: 4 trends in algorithmic trading to keep your eyes out for in 2022 and beyond. So what does that mean for you? Explore ways to capitalize on these trends, whether it is building your own algorithm deployment optimizer, utilizing a trading platform for transaction cost analysis, or exploring Web 3.0 asset classes. Algorithmic trading is an incredibly competitive industry, where innovation is occurring non-stop. The status quo is ever changing, but with countless brilliant minds working to improve how the industry operates, there are many exciting opportunities ahead. 

## Want to learn more?

If you're interested in learning more about technology that can streamline your backtesting, [just request a demo of Blankly](https://calendly.com/blankly) here. We'd love to chat! We're constantly in our [Discord](https://discord.gg/xJAjGEAXNS) too! 
