---
readingTime: 25
title: 'Build a Neural Network for Trading'
featured: false
description: Today, we'll look at using the Blankly package to build a basic machine learning model for trading. Machine learning has been one of the hottest trends in algotrading during the last few years, as we've only recently reached the level of computing power and amount of data needed to build and train successful models.
authorName: Aditya Akula
authorImage: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fauthors%2F1621733906923.jpeg?alt=media&token=52be6895-c36c-431f-99ad-271e736d461a'
date: 2022-3-21T17:00:00-05:00
category: Neural Networks
categoryClass: bg-green-100
categoryText: text-green-800
image: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fauthors%2FStructure-of-the-LSTM-cell-and-equations-that-describe-the-gates-of-an-LSTM-cell.png?alt=media&token=93cce19c-3742-4594-bc31-9b1f1709025b'
---

## Today's Model

Hey there everyone. My name's Aditya, a developer advocate here at Blankly.

Today, we'll look at using the Blankly package to build a basic machine learning model for trading. Machine learning has been one of the hottest trends in algotrading during the last few years, as we've only recently reached the level of computing power and amount of data needed to build and train successful models. This specific model we will be an [LSTM (Long Short Term Memory) Neural Network](https://machinelearningmastery.com/gentle-introduction-long-short-term-memory-networks-experts/), which is a type of neural network that stores a "memory", allowing it to incorporate past data passed into the model into future predictions. This structure makes LSTMs great for sequential data, like stock prices.

To build the model, we'll use PyTorch, a popular library for Machine Learning. Luckily, [PyTorch](https://pytorch.org) handles most of the hard work for us -- backpropagation, gradient descent, and layer structure, to name a few examples -- so we can focus on building the actual model.

## LSTMs

The first question you might have is what is an LSTM? As we said above, LSTMs incorporate a "memory" into their model structure, but that explanation is a bit vague. To be more precise, LSTMs compute multiple functions at every stage:

![Structure of the LSTM cell and equations that describe the gates of an... |  Download Scientific Diagram](https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fauthors%2FStructure-of-the-LSTM-cell-and-equations-that-describe-the-gates-of-an-LSTM-cell.png?alt=media&token=93cce19c-3742-4594-bc31-9b1f1709025b)

Without getting too technical, $h_t$ is the "hidden state" --- the "memory" of the model, $f_t$ is the "forget gate", $i_t$ is the "input gate", $o_t$ is the output gate, $\tilde{C}_t$ is the candidate cell state, and $C_t$ is the cell state. At every step, the input to the model gets passed into the input gate, influences the hidden state, and potentially changed the cell state. The decisions for how each input affects the rest of the model are decided by neural network layers, which are the weights we train using gradient descent.

For their ability to dynamically include data in the past in current models, LSTMs are one of the most popular models for stock [prediction](https://www.analyticsvidhya.com/blog/2021/05/stock-price-prediction-and-forecasting-using-stacked-lstm/). There are countless technical indicators for financial markets, and so using LSTMs allows us to dynamically choose which data from which time frame is most relevant to predicting future prices.

[Stock Market Predictions with LSTM in Python - DataCamp](https://www.datacamp.com/community/tutorials/lstm-python-stock-market)

[Machine Learning to Predict Stock Prices - Data Science](https://towardsdatascience.com/predicting-stock-prices-using-a-keras-lstm-model-4225457f0233)

[Using Keras LSTM Model to Predict Stock Prices - KDNuggets](https://www.kdnuggets.com/2018/11/keras-long-short-term-memory-lstm-model-predict-stock-prices.html)

### Things to Watch Out For

There are definitely pitfalls to assuming LSTMs automatically lead to success. For one, prediction accuracy is limited by the available training data, and our training set is fairly limited and basic. However, in general, short-term stock price data has an element of randomness, so the accuracy of LSTM predictions has is limited. For this reason, we'll use an average of three predictions -- in this way, we'll reduce inaccuracy due to randomness, and so improve overall results.

## Overview

First, we'll initialize all the elements of our environment -- the keys for the API we need, as well as the imported libraries we need. Then, we'll process the input data we have and convert into a format that is appropriate for model training. Then, we'll run through our training loop and find the optimal weights for our model. After that, we'll find a way to convert output signals from our model into decisions onto whether to buy and sell, along with how much, and use those to define a strategy. Finally, we'll backtest this strategy and analyze its performance to determine whether to use it for live crypto trading or to improve it further.

## Initialization

We'll initialize the basics of our Blankly environment with the command _blankly init_. Once done, we get template .json files that we'll need for configuring backtests. Most importantly, we'll need to input our API keys into keys.json.

```bash
$ blankly init
```

Here are our imports. We’ll import blankly (of course), NumPy for use with preparing our data, and some PyTorch utilities we’ll need for our model

```python
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.nn import LSTM
import torch.optim as optim
from torch.autograd import Variable
```

## Data Preparation

This method will help us split the data into “input/output”. We only actually have one sequence of data — all the prices from the past year. However, we can generate smaller “episodes” by

1.  Taking all consecutive periods of length seq_length
2.  Splitting off the last output_size values and putting those into one array
3.  Leaving the first seq_length - output_size values into another array.

In the end, we’re left with enough data to run training on. For this model, we’ll use seq_length = 8 and output_size = 3, but these are somewhat arbitrary. This gives us training sequences of 8 - 3 = 5 data points to predict the sequences of length 3 from. The idea is that we'll train the model on those sequences of 5 data points, end up with a model that can predict the price movements for the next 3 days to solid accuracy, and then average the price movements over a 3-day period to obtain a final prediction for the price movement on a day. Then, we'll use our prediction to decide whether to buy our sell -- if our model tells us the price is likely to increase tomorrow, we'll buy, and if the model tells us the price is likely to decrease, we'll sell.

```python
def  episode_gen(data, seq_length,output_size):
	x = []
	y = []
	#Loop through data, adding input data to x array and output data to y array
	for i in  range(len(data)-seq_length):
		_x = data[i:(i+seq_length - output_size)]
		_y = data[i+seq_length - output_size:i + seq_length]
		x.append(_x)
		y.append(_y)

	return np.array(x),np.array(y)
```

## Model Inputs and Feature Engineering

Here, we’ll do the majority of work on our model.

To start, we’ll pull the data we need. Blankly comes with built in indicators, so we can input our historical price data into those functions to get indicators out. For this example, we’ll use RSI and MACD. RSI stands for Relative Strength Index, and is a measure of momentum. Its formula is
![credit to Alpharithms](https://www.alpharithms.com/wp-content/uploads/1674/rsi-formulae-alpharithms.jpg)
where we look at the data over the past 14 days. Typical overbought/oversold levels for RSI are 70 and 30 (respectively)

MACD stands for Moving Average Convergence Divergence. The MACD is calculated by subtracting the 26-period exponential moving average (EMA) from the 12-period EMA. We then calculate the MACD signal line by taking the 9-period EMA of the MACD.

Implementing these functions by hand is a bit tricky, but fortunately, Blankly has indicators built in.

```python
def init_NN(symbol, state: blankly.StrategyState):

	interface = state.interface
	resolution = state.resolution
	variables = state.variables

# Get price data

	variables['history'] = interface.history(symbol, 300, resolution, return_as='list')['close']

'''We use Blankly's built-in indicator functions to calculate indicators we can use along with price data to predict future prices
'''
	rsi = blankly.indicators.rsi(state.variables['history'])
	macd = blankly.indicators.macd(state.variables['history'])

'''We'll break the historical Ethereum data into 8 day episodes

and attempt to predict the final three days using the first 5.

'''
	seq_length = 8
	output_size = 3
```

We also do a bit of feature engineering. The first step is to convert our price data into daily increases by dividing each day’s price data by the day before. This helps in training by “scaling” the data into the same range. We’ll also limit the range of data to the range in which we have data on all indicators — day 26 and on.

```python
'''Feature engineering -- here, we calculate the price change from the day before
as a ratio. This is useful because it means we have less issues with scaling with the model,
as the data will all already be in roughly the same range. We ignore the first 25 elements
because we want every observation to have corresponding RSI + MACD data, and MACD requires
26 periods.
'''

	x = [variables['history'][i] / variables['history'][i-1] for i in  range(25,len(variables['history']))]
	x, y = episode_gen(x, seq_length, output_size)
	y = Variable(torch.Tensor(np.array(y))).unsqueeze(0)

#RSI data gathering
	x_rsi = rsi[11:]
	x_rsi,_ = episode_gen(x_rsi,seq_length, output_size)

#MACD data gathering
	macd_vals,_ = episode_gen(macd[0], seq_length, output_size)
	macd_signals,_ = episode_gen(macd[1],seq_length, output_size)
```

In this loop, we’ll feed the data we’ve collected into an array of dimensions num_episodes $\times$ output_size - seq_length $\times$ 4

```python
'''In this section, we put all the features we just extracted into one NumPy array
which we then convert to a PyTorch tensor that we can run our model on.

'''

	x_agg = np.zeros((len(macd_signals),seq_length-output_size, 4))

	for i in  range(len(macd_signals)):
		for j in  range(seq_length - output_size):
			x_agg[i][j][0] = x[i][j]
			x_agg[i][j][1] = x_rsi[i][j]
			x_agg[i][j][2] = macd_vals[i][j]
			x_agg[i][j][3] = macd_signals[i][j]
	x_tot = Variable(torch.Tensor(x_agg))

```

## Training

Now, it’s time to train. We’ll use a mean-square-error loss function and an Adam optimizer for a model that’ll take the price data into an LSTM, output that to a linear layer with sigmoid activation, and add a constant 0.5. We do this because the sigmoid function returns 0.5 when the input is 0, so we effectively train our model layers to output positive values for an increase and negative values for a decrease.

In terms of hyperparameters, our only significant ones here are the 10,000 epochs and learning rate of 0.0003. These came through running through a couple of backtests with grid search. Lower learning rates generally result in more accurate models, with the caveat that this accuracy requires longer training times to achieve. The 10,000 epochs number was chosen as a balance between performance and speed. To get an idea for training times, we include a line that'll print out the loss every 500 epochs, ultimately allowing us to see when the loss stabilizes, indicating convergence. Together, our results show that training our model for 10000 epochs with 0.0003 learning rate results in a loss value that stabilizes just before we finish, along with a low value for our loss-function itself.

More sophisticated methods than manual search exist, and should be used in several cases; for example if we were to try to adapt a type of architecture to a set of tickers and couldn't afford to find the ideal hyperparameters by hand for training the model on each ticker's data. Methods like [Bayesian Hyperparameter Optimization](https://towardsdatascience.com/a-conceptual-explanation-of-bayesian-model-based-hyperparameter-optimization-for-machine-learning-b8172278050f) exist that automatically search for optimal hyperparameters, using results of past trials to guide future ones. However for this example, manual search is good enough and keeps the attention on the main model features and attributes.

```python
num_epochs = 10000
learning_rate = 0.0003

state.lstm = LSTM(4,20, batch_first = True)
state.lin = nn.Linear(20,3)

criterion = torch.nn.MSELoss() # mean-squared error for regression

#Optimizer: make sure to include parameters of both linear layer and LSTM

optimizer = torch.optim.Adam(
{'params': state.lstm.parameters()},
{'params': state.lin.parameters()}
], lr=learning_rate)

# Train the model
for epoch in  range(num_epochs):

	#run model
	outputs, (h_n, c_n) = state.lstm(x_tot)
	out = state.lin(h_n)
	out = 0.5 + F.sigmoid(out)
	optimizer.zero_grad()

	loss = criterion(out, y) #calculate loss function
	loss.backward() #backprop
	optimizer.step() #gradient descent



	#Output loss functions every 500 epochs so we can make sure the model is training

	if epoch % 500 == 0:
		print("Epoch: %d, loss: %1.5f" % (epoch, loss.item()))



'''We use this in the trading algorithm for more stability.

Essentially, instead of relying on a single output of the model

to tell us whether to buy or sell, we average the readings from three different calculations

(3 days before, 2 days before, day before)

'''
state.lastthree = [[0,0],[0,0],[0,0]]
```

## From Model to Strategy

Now that we’ve trained our model, we need to use its outputs in a price event to backtest. First, we extract data and indicators from the last 5 days and put them into a tensor of dimension 1 $\times$ seq_length - output_size $\times$ 4.

```python
def price_lstm(price,symbol,state: blankly.StrategyState):
	state.variables['history'].append(price) #Add latest price to current list of data

	'''Here, we pull the data from the last few days, prepare it,
	and run the necessary indicator functions to feed into our model

	'''
	into = [state.variables['history'][i]/state.variables['history'][i-1] for i in  range(-5,0)]
	rsi = blankly.indicators.rsi(state.variables['history'])
	rsi_in = np.array(rsi[-5:])
	macd = blankly.indicators.macd(state.variables['history'])
	macd_vals = np.array(macd[0][-5:])
	macd_signals = np.array(macd[1][-5:])

	'''We put the data into the torch Tensor that we'll run the model on

	'''
	pred_in = np.zeros((1,len(into),4))

	for i in  range(len(into)):
		pred_in[0][i][0] = into[i]
		pred_in[0][i][1] = rsi_in[i]
		pred_in[0][i][2] = macd_vals[i]
		pred_in[0][i][3] = macd_signals[i]
	pred_in = torch.Tensor(pred_in)
```

Then, we run our model on the tensor, giving us predictions for the next three days.

```python
'''Run the data through the trained model.
The field out stores the prediction values we want
'''

out,(h,c) = state.lstm(pred_in)
out = state.lin(h)
out = 0.5 + F.sigmoid(out)
```

We generate our prediction for a days move by looking at the predictions from 3,2, and 1 days before and averaging them.

```python
'''This definitely could be shortened with a loop,
but basically, we add the percentage increase to the other values in the
3-day-average array. We also increment a counter showing how many values have been
added before averaging. This handles the edge case of the first few values (where
we wouldn't divide by 3)
'''
state.lastthree[0][0]+=out[0][0][0]
state.lastthree[0][1]+=1
state.lastthree[1][0]+=out[0][0][1]
state.lastthree[1][1]+=1
state.lastthree[2][0]+=out[0][0][2]
state.lastthree[2][1]+=1
'''The avg price increase is calculated by dividing the sum of next day predictions
by the number of predictions for the next day.
'''

priceavg = state.lastthree[0][0]/state.lastthree[0][1]
```

Finally, we implement our buying and selling logic. If our prediction is 1 — that is, we think tomorrow’s price will be greater than today’s, we buy an amount proportional to how far above 1 the prediction is. If we think tomorrow’s price will be less, we sell an amount proportional to how far below 1 the prediction is. There are many different ways to choose buy/sell sizing amounts, some with more mathematical backing, but this works fine to just demonstrate an example and is fairly simple.

```python
curr_value = blankly.trunc(state.interface.account[state.base_asset].available, 2) #Amount of Ethereum available
if priceavg > 1:
	# If we think price will increase, we buy
	buy = blankly.trunc(state.interface.cash * 2 * (priceavg.item() - 1)/price, 2) #Buy an amount proportional to priceavg - 1
	if buy > 0:
		state.interface.market_order(symbol, side='buy', size=buy)
elif curr_value > 0:
	#If we think price will decrease, we sell
	cv = blankly.trunc(curr_value * 2 * (1 - priceavg.item()),2) #Sell an amount proportional to 1 - priceavg
	if cv > 0:
		state.interface.market_order(symbol, side='sell', size=cv)

state.lastthree = [state.lastthree[1], state.lastthree[2], [0,0]] #Shift the values in our 3-day-average array
```

## Backtest

To actually backtest, we’ll need to connect to an API. I used FTX, but Blankly also currently supports Alpaca, Binance, Coinbase Pro, KuCoin, and OANDA. We then create a Blankly Strategy, add our price event and initialization, and run!

```python
exchange = blankly.FTX() #Connect to FTX API
strategy = blankly.Strategy(exchange) #Initialize a Blankly strategy
strategy.add_price_event(price_lstm, symbol='ETH-USD', resolution='1d', init=init_NN) #Add our price event and initialization
results = strategy.backtest(to='1y', initial_values={'USD': 10000}) #Backtest one year starting with $10,000
print(results)
```

## Results:

```bash
Blankly Metrics:
Compound Annual Growth Rate (%): 98.0%
Cumulative Returns (%): 97.0%
Max Drawdown (%): 20.0%
Variance (%): 12.59%
Sortino Ratio: 2.17
Sharpe Ratio: 1.5
Calmar Ratio: 2.69
Volatility: 0.35
Value-at-Risk: 395.43
Conditional Value-at-Risk: 10.0
Risk Free Return Rate: 0.0
Resampled Time: 86400.0
```

We find a CAGR of 98% -- very good, along with a Sharpe Ratio of 1.5 and a Sortino Ratio of 2.17, both also considered strong. However, the first successful backtest is only the first step in deploying a profitable strategy. Before deploying, we need to test much more thoroughly: with different data (other coins, possibly stock tickers), for different times (this backtest only captures one time period -- what about other periods in the bearish/bullish market cycle?), and for robustness with regard to randomness. While good, the results we obtain are still in the range of "lucky", and so we need to test until we're highly confident that our model will profit.

<iframe src="https://app.blankly.finance/embed/backtest?id=RETIe0J8EPSQz7wizoJX0OAFb8y1&modelId=62iIMVRKV7zkcpJysYlP&backtestId=75a0c190-4d8a-44e2-9310-c47d4d72b070&option=3" width="100%" height="900"></iframe>

There are many ways we could improve this strategy -- deepen the machine learning model, pull more/better input data, or better choose amounts to buy/sell, but this is a very strong start, and Blankly's package makes it very easy to edit and test this model. If you're interested, a GitHub repository containing a full Python Notebook is [here](https://github.com/blankly-finance/lstm-trading-bot).

<hr>

If you're interested in learning more, [talk to us here @ Blankly](https://calendly.com/blankly) and check out our [open source package](https://package.blankly.finance). We'd love to chat! We're constantly in our [Discord](https://discord.gg/xJAjGEAXNS) too!