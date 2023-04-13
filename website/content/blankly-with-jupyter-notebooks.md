---
readingTime: 5
title: Using Blankly with Jupyter Notebooks — Golden Cross
description: By allowing users to easily pick and select which cells to run, users can modularize their code development and easily focus on the parts that need more attention. That's why Blankly easily supports jupyter notebooks out of the box.
authorName: Brandon Fan
authorImage: "https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fauthors%2Fimg_3678.JPG?alt=media&token=240ddce6-0181-452b-b83e-c7b595678e58"
date: 2022-01-06T15:45:00-05:00
category: Coding
categoryClass: bg-green-100
categoryText: text-green-800
image: "https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjupyter-notebook-post%2FScreen%20Shot%202022-01-06%20at%205.26.19%20PM.png?alt=media&token=2368796f-6ba7-43ea-ab64-5f3efda10f68"

---

[Jupyter](https://jupyter.org/) notebooks are great ways to easily display and progressively build out an algorithm or experiment. By allowing users to easily pick and select which cells to run, users can modularize their code development and easily focus on the parts that need more attention. Coming from an AI background, I knew how important jupyter notebooks were and being able to actually use them was a critical component in building a useful and powerful package. That's why Blankly easily supports jupyter notebooks out of the box.

## Run `blankly init` right within Jupyter Notebook

Jupyter notebook is great because it allows users to easily write code, write markdown, and even run terminal commands right from the notebook itself. This is a feature that we're going to use here. 

Blankly requires a few environment items to fully function including things like `keys.json`, `settings.json`, etc. Fortunately, there's a simple command that we can run to get our environment set up and prepared to do work: `blankly init`.

How do we do that in jupyter notebook? 
Get a new cell and simply run. 

```bash
!blankly init
``` 

<figure>
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjupyter-notebook-post%2FScreen%20Shot%202022-01-06%20at%205.26.19%20PM.png?alt=media&token=2368796f-6ba7-43ea-ab64-5f3efda10f68" width="100%">
  <figcaption align="center">Running blankly init in a jupyter notebook</figcaption>
</figure>

## Adding in imports and ensuring graph visibility

Now that we've set up our environment, we can move on to implementing our code and experimenting with data. All we have to do is simply import what we need. For example, if I was to build a [simple moving average](https://www.investopedia.com/terms/s/sma.asp) strategy, I would need to import an `sma` function and `Blankly.Strategy`. Learn more about Blankly Indicators [here](https://docs.blankly.finance/metrics/indicators). Let's do that below: 

```python
from blankly import Strategy, StrategyState, Alpaca
from blankly.indicators import sma
from bokeh.io import output_notebook 
# this is to ensure that any plots are displayed in jupyter notebook
output_notebook()
```
Note, we need to also import bokeh and ensure run output_notebook() to ensure that we can see the results of graphs.


<figure>
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjupyter-notebook-post%2FScreen%20Shot%202022-01-06%20at%205.28.15%20PM.png?alt=media&token=060ae18e-a28c-4f2f-b88c-4c05931805d6" width="100%">
  <figcaption align="center">Import everything you need</figcaption>
</figure>

## Initialize our exchange connections 

Awesome, well now that we have our code imports, we can now go ahead and initialize our exchanges. If you've set up your environment correctly, we're able to just initialize our exchange and grab some data that we need.


### Initialize an Exchange

```python
a = Alpaca()
```

### Grab Latest Bars of Historical Data
```python
a.interface.history('NVDA', 5, resolution='1d')
```

<figure>
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjupyter-notebook-post%2FScreen%20Shot%202022-01-06%20at%205.29.30%20PM.png?alt=media&token=e24d4889-e63b-4a7a-b787-296479946a13" width="100%">
  <figcaption align="center">Init Exchange and Grab Data</figcaption>
</figure>



## Running a Strategy 

To run a strategy, it's easy as plugging in all of the components that we need. It's even better with jupyter notebooks because we can test and verify each part before moving forward. 

### `init()` function

```python
def init(symbol, state: StrategyState):
    interface: Interface = state.interface
    resolution: float = state.resolution
    variables = state.variables
    # initialize the historical data as a deque to save memory and effiency
    variables['history'] = interface.history(symbol, 800, resolution, return_as='deque')['close']
    variables['has_bought'] = False
```

<figure>
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjupyter-notebook-post%2FScreen%20Shot%202022-01-06%20at%205.31.02%20PM.png?alt=media&token=c165211e-5fc8-4719-9f7d-eaa05f68e433" width="100%">
  <figcaption align="center">Strategy Framework and init()</figcaption>
</figure>

### Our Price Event

```python
def golden_cross(price, symbol, state: StrategyState):
    interface: Interface = state.interface
    variables = state.variables

    variables['history'].append(price)

    sma100 = sma(variables['history'], period=20)
    
    # match up dimensions so that we can use numpy for difference
    sma50 = sma(variables['history'], period=10)[-len(sma100):]
    diff = sma100 - sma50
    
    slope_sma50 = (sma50[-1] - sma50[-5]) / 5 # get the slope of the last 5 SMA50 Data Points
    prev_diff = diff[-2]
    curr_diff = diff[-1]
    
    is_cross_up = slope_sma50 > 0 and curr_diff >= 0 and prev_diff < 0
    is_cross_down = slope_sma50 < 0 and curr_diff <= 0 and prev_diff > 0
    
    # comparing prev diff with current diff will show a cross
    if is_cross_up and not variables['has_bought']:
        # determine how much we want to buy based on our cash allocation
        interface.market_order(symbol, 'buy', int(interface.cash / price))
        variables['has_bought'] = True
    elif is_cross_down and variables['has_bought']:
        # use strategy.base_asset if on CoinbasePro or Binance
        # truncate here to fix any floating point errors
        interface.market_order(symbol, 'sell', int(interface.account[symbol].available))
        variables['has_bought'] = False
```

<figure>
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjupyter-notebook-post%2FScreen%20Shot%202022-01-06%20at%205.31.06%20PM.png?alt=media&token=ee31d9fb-c3f5-4fd9-afb2-f7ce86e09b8c" width="100%">
  <figcaption align="center">Our Golden Cross Price Event</figcaption>
</figure>


### Final Strategy
```python
s = Strategy(a)
s.add_price_event(golden_cross, 'MSFT', resolution='1d', init=init)
```

And woila! We have a fully working strategy. 

## Backtesting and Iterating

Now that we've defined our strategy, we can begin iterating and improving on it. With the speed of our backtests, a 2y backtest on NVDA takes 3 seconds to finish running, allowing you to quickly change parameters, update price events and run experiments as needed to create the most optimal model. 

```python
results = s.backtest(initial_values={"USD": 10000}, to="2y")
results.metrics
```

<figure>
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fjupyter-notebook-post%2FScreen%20Shot%202022-01-06%20at%205.30.51%20PM.png?alt=media&token=c74ec942-9145-4b7d-95d1-6994841589ae" width="100%">
  <figcaption align="center">Backtest Results</figcaption>
</figure>

```
{
  'Compound Annual Growth Rate (%)': 35.0,
  'Cumulative Returns (%)': 81.0,
  'Max Drawdown (%)': 13.0,
  'Variance (%)': 1.37,
  'Sortino Ratio': 1.27,
  'Sharpe Ratio': 1.2,
  'Calmar Ratio': 1.65,
  'Volatility': 0.01,
  'Value-at-Risk': 223.96,
  'Conditional Value-at-Risk': 5.94,
  'Risk Free Return Rate': 0.0,
  'Resampled Time': 86400.0
}
```

## Next Steps

Now that's it! If you want the full jupyter notebook for this, take a look [here](https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/notebooks%2FGolden%20Cross%20with%20Blankly.ipynb?alt=media&token=de189da5-d493-4c65-975e-a1500fc30588). 

Take that base, build some more experiments, run more `price_events` and a suite of strategies that you can use to deploy on our [platform](https://blankly.finance).

<hr>

If you're interested in learning more, [talk to us here @ Blankly](https://calendly.com/blankly). We'd love to chat! We're constantly in our [Discord](https://discord.gg/xJAjGEAXNS) too!
