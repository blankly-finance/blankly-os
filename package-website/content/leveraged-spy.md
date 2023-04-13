---
readingTime: 12
featured: true
title: Risk On or Risk Off Leveraged S&P 500
description: Some people might think that highly profitable and consistent strategies are usually complicated and hard to implement, but that is not necessarily the case. Simple strategies can be often utilized to create a stable and profitable portfolio. The portfolio can be as simple as merely buying and holding the SPDRS &P 500 shares. This one trade instantly exposes you to the entire market and S&P 500 at a very low cost.
authorName: Jaewoo Kim
authorImage: "https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/headshots%2F1600027775189.jpeg?alt=media&token=dfb651e6-e0dd-48cc-9f7e-5c7f8ab20534"
date: 2022-04-24T15:45:00-05:00
category: Algorithm
categoryClass: bg-green-100
categoryText: text-green-800
image: "https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/screenshots%2FIMG_9333.jpg?alt=media&token=053b5042-6e0e-442c-a208-0e23b8442219"

---

Some people might think that highly profitable and consistent strategies are usually complicated and hard to implement, but that is not necessarily the case. Simple strategies can be often utilized to create a stable and profitable portfolio. The portfolio can be as simple as merely buying and holding the SPDRS &P 500 shares. This one trade instantly exposes you to the entire market and S&P 500 at a very low cost. This strategy can be great for long-term investors who want to just "set it and forget about it", but this has a large opportunity cost of time and money attached. In this article, we'll look at a strategy that is still simple but takes on a more risky position when we think the market is doing well.

## Today's Model
Today's model utilizes the Blankly package to build a simple model that invests in the leveraged S&P 500 (risker than SPY) when market conditions are favorable and invests in treasury bonds when market conditions are not. 

The model will be based on the following intuition:

 - When the economy is booming, consumers are making more purchases. This results in higher earnings for companies, and therefore investors feel more confident investing in these companies. In this case, the best way to beat inflation is to buy stocks instead of treasury bonds.

 - When the economy is in a slump, this results in lower earnings for companies. Therefore, investors feel less confident investing in these companies and prefer to buy treasury bonds that guarantee regular interest payments.

We will use the following ETFs (exchange-traded funds) to build our model:

- `BND`: Vanguard Total Bond Market Index Fund ETF.
    - Tracks the performance of a broad, market-weighted bond index.
- `BIL`: SPDR Bloomberg 1-3 Month T-Bill ETF
    - Tracks a market-weighted index of all publicly issued zero-coupon US Treasury bills
- `UPRO`: ProShares UltraPro S&P500
    - Provides 3x leveraged daily exposure to a market-cap-weighted index of large-cap and mid-cap US companies selected by the S&P Committee
- `IEF`: iShares 7-10 Year Treasury Bond ETF
    - Track the investment results of the ICE® U.S. Treasury 7-10 Year Bond Index

We will first compare the performance of BND and BIL. If BND is outperforming BIL, then we can expect that the market is doing well, and we will sell IEF shares and buy UPRO shares. Otherwise, we can expect that the market is shaky, and we will do the opposite.

## Overview
First, we'll initialize all the elements of our environment -- the keys for the API we need, as well as the rest of our Blankly environment. In this model, we will utilize the new blankly strategy function "add_arbitrage_event", which allows us to consider the prices of multiple stocks shares simultaneously. After the initialization, we'll process the input data of all four ETFs (BND, BIL, UPRO, IEF). After that, we'll define our price event, where we will compute the 60 days' cumulative return for BND and BIL, compare them, and decide what ETFs to buy and sell. Finally, we'll backtest this strategy and compare it against a baseline that simply buys and holds the S&P 500.​

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

## Data Processing
We will first retrieve the historical data of the four ETFs

```python
def init(symbols, state: StrategyState):
    # Download price data of the four tickers: 'BND', 'BIL', 'UPRO', 'IEF'
    for symbol in symbols:
        history_name = str(symbol) + '_history'
        state.variables[history_name] = state.interface.history(symbol, to=150, return_as='deque',
                                                         resolution=state.resolution)['close']
```

We will also initialize the variables that we will use in our model, 60 days cumulative return of BND and BIL. 

```python
# Initialize the variables needed for the compare_price_event
state.variables['cum_return_BND_60'] = 0
state.variables['cum_return_BIL_60'] = 0
```

## Compare Price Event
At this stage, we'll define our compare_price_event, which will be called every time the strategy is run.

In this function, we retrieve the latest price to the current data and compute the 60 days cumulative return of BND and BIL.

```python
def compare_price_event(prices, symbols, state: StrategyState):
    # keep track of history (close price) of all four tickers: 'BND', 'BIL', 'UPRO', 'IEF'
    for symbol in symbols:
        history_name = str(symbol) + '_history'
        state.variables[history_name].append(prices[symbol])

    # If we don't have enough data to make any decisions, pass (only applies for backtesting)
    if len(state.variables['BND_history']) < 60:
        return

    # Calculate the 60d cumulative sum of BND and BIL
    state.variables['cum_return_BND_60'] = cum_returns(state.variables['BND_history'][-60], state.variables['BND_history'][-1])
    state.variables['cum_return_BIL_60'] = cum_returns(state.variables['BIL_history'][-60], state.variables['BIL_history'][-1])

```

Now, we've collected and analyzed the historical data of the four ETFs. We can now decide which ETFs to buy and sell.

If the 60 days cumulative return of BND is greater than BIL, the strategy assumes that the market is doing well and takes on more risk by holding leveraged S&P 500 shares. Otherwise, it takes on less risk by holding treasury bonds.

```python
# If 60d cumulative return of BND is greater than 60d cumulative return of BIL -> market is doing well
if state.variables['cum_return_BND_60'] > state.variables['cum_return_BIL_60']:
    # Sell all of the IEF shares that we have
    curr_value_IEF = trunc(state.interface.account['IEF'].available, 2)
    if curr_value_IEF > 0:
        state.interface.market_order(symbol='IEF', side='sell', size=curr_value_IEF)

    # Buy the UPRO shares if we have any cash left
    price = state.variables['UPRO_history'][-1]
    size = trunc(state.interface.cash/price, 2)
    if size > 0:
        state.interface.market_order(symbol='UPRO', side='buy', size=size)

else:
    # Sell all of the UPRO shares that we have
    curr_value_UPRO = trunc(state.interface.account['UPRO'].available, 2)
    if curr_value_UPRO > 0:
        state.interface.market_order(symbol='UPRO', side='sell', size=curr_value_UPRO)
    # Buy the IEF shares if we have any cash left (treasury bond)
    price = state.variables['IEF_history'][-1]
    size = trunc(state.interface.cash/price, 2)
    if size > 0:
        state.interface.market_order(symbol='IEF', side='buy', size=size)
```

## Benchmark
Of course, we also need something to compare our model against. For this case, we can compare our Risk On or Risk Off Leveraged S&P 500 bot to one that simply buys and holds SPY (SPDR S&P 500 ETF Trust). If you're using the Blankly Platform to visualize backtests, you can easily add benchmarks directly frm the platform. 

```python
def price_event(price, symbol, state: StrategyState):
    '''Buy and hold 'SPY' '''
    state.variables['history'].append(price)
    if state.variables['own_position'] == False:
        qty = int(state.interface.cash / price)
        state.interface.market_order(symbol, 'buy', qty)
        state.variables['own_position'] = True

def init(symbol, state: StrategyState):
    # Download price data of the 'SPY'
    state.variables['history'] =  state.interface.history(symbol, 150, resolution=state.resolution, return_as='deque')['close']
    state.variables['own_position'] = False
```

## Backtesting

To backtest, we’ll need to connect to an API. I used Alpaca, but Blankly also currently supports FTX, Binance, Coinbase Pro, KuCoin, and OANDA. We then create a Blankly Strategy, add our compare price event and initialization to keep track of all four ETFs simultaneously, and run! 

```python
exchange = Alpaca() # Connect to Alpaca API

# Use our strategy helper on Alpaca
strategy = Strategy(exchange)

# Run the compare price event function every time we check for a new price
strategy.add_arbitrage_event(compare_price_event, ['BND', 'BIL', 'UPRO', 'IEF'], resolution='1d', init=init)

# Backtest two years starting with $10,000
results = strategy.backtest(to='2y', initial_values={'USD': 10000})
print(results)
```

## Results
For simply buying and holding SPY:

```python
Blankly Metrics: 
Calmar Ratio:                      1.17
Compound Annual Growth Rate (%):   23.0%
Conditional Value-at-Risk:         3.66
Cumulative Returns (%):            50.0%
Max Drawdown (%):                  13.0%
Resampled Time:                    86400.0
Risk Free Return Rate:             0.0
Sharpe Ratio:                      1.08
Sortino Ratio:                     1.21
Value-at-Risk:                     152.24
Variance (%):                      1.92%
Volatility:                        0.14
```
We find the CAGR (Compound Annual Growth Rate) of 23% -- fair amount, along with a decent Sharpe Ratio of 1.08 and Sortino Ratio of 1.21.

Running our Risk On or Risk Off Leveraged S&P 500 strategy gives us:

```python
Blankly Metrics: 
Calmar Ratio:                      2.71
Compound Annual Growth Rate (%):   56.0%
Conditional Value-at-Risk:         8.55
Cumulative Returns (%):            142.0%
Max Drawdown (%):                  21.0%
Resampled Time:                    86400.0
Risk Free Return Rate:             0.0
Sharpe Ratio:                      1.3
Sortino Ratio:                     1.87
Value-at-Risk:                     305.11
Variance (%):                      6.89%
Volatility:                        0.26
```
We find the CAGR (Compound Annual Growth Rate) of 56% -- double of our benchmark strategy, along with a better Sharpe Ratio of 1.3 and Sortino Ratio of 1.87. This result is very surprising because even though this strategy is extremely simple compare to other strategies, it showed that this model is a considerably strong and stable strategy.

<iframe src="https://app.blankly.finance/embed/backtest?id=Ej51rYC2aFcif4RQLfo5KotkHCv2&modelId=KhNHPBt4uTLdAdifd9QQ&backtestId=7c397de4-9232-44b8-bc53-a9188b222d3e&option=3" width="100%" height="900"></iframe>

However, the first successful backtest is only the first step in deploying a profitable strategy. Before deploying, we need to test much more thoroughly: with different days, such as 40 or 90 days, when computing the cumulative returns, for different time periods and resolutions (this backtest only captures one time period -- what about other periods in the bearish/bullish market cycle?), and for robustness with regard to randomness. Moreover, the results we obtain are still in the range of "lucky", and so we need to test until we're highly confident that our model will profit.

You can find the model on the platform [here](https://blankly.finance/links/sehRtnBvtG5tniWr6). It's also one of our starter models so you can easily duplicate it and run it yourself!

## Deploying

We can deploy our model to the cloud on the Blankly Slate platform, where we can view it trading live. To do so, simply change the line that says `strategy.backtest()`
to `strategy.start()`. Then, from a command line, run 

```bash
$ blankly deploy
```
You'll be prompted for a few fields -- model description, resource plan, and name, as well as a login. Once you input those, your model will be able to be deployed, and you can view live updates at a URL.
​
Thank you for reading until the end! The next steps are to experiment with this concept -- try building other models that incorporate it, or modify it for your own strategies, or something else -- the possibilities are endless. If you're interested, a GitHub repository containing a full Python Notebook is [here](https://github.com/blankly-finance/Leveraged-SPY-Bot).

<hr>

If you're interested in learning more, [talk to us here @ Blankly](https://calendly.com/blankly) and check out our [open source package](https://package.blankly.finance). We'd love to chat! We're constantly in our [Discord](https://discord.gg/xJAjGEAXNS) too!