---
readingTime: 3
title: Blankly is Now Integrated with OKX
description: We're excited to announce the availability of the OKX exchange integration with the Blankly Framework, making it easier for our users to use a wide range of exchanges in conjunction with our services.
authorName: Avi Mehta
authorImage: https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fauthors%2Favi-mehta-headshot.jpeg?alt=media&token=5129aa4a-b0c4-4a72-be2c-f0e8690934aa
date: 2022-04-24T14:30:00-05:00
category: Integration
categoryClass: bg-indigo-100
categoryText: text-indigo-800
image: https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fokx%2Fintegrate.png?alt=media&token=697b2bec-4c0a-4d83-97c4-0b9d8486bf53

---

<img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fokx%2Fintegrate.png?alt=media&token=697b2bec-4c0a-4d83-97c4-0b9d8486bf53" alt="img" style="zoom: 50%;" />

We're excited to announce the availability of the [OKX](https://www.okx.com/) exchange integration with the Blankly Framework, making it easier for our users to use a wide range of exchanges in conjunction with our services. OKX is a highly secure cryptocurrency enabling its users to buy, sell, and store a wide range of cryptocurrencies.

Furthermore, we are thrilled to see how our users will utilize this new integration with their existing portfolios as OKX offers a robust range of functionality. We are also working towards incorporating other exchanges in the coming days as we aim to become an inclusive platform for all exchanges where our users would need to use only one codebase to run models on all exchanges.

For customers who want a historical view of certain aspects of a coin will be able to leverage our candle endpoints. The data can also be extracted down to the exact second or in an aggregated manner through user-defined intervals (e.g. 1 hour, 24 hours, etc.).



## Awesome, Now How Do You Get Started?

In order for the exchange to work flawlessly, you're going to require two sets of keys: the Sandbox Keys and the Live Keys.

### OKX Live and Sandbox (Demo Trading) Keys

<img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fokx%2Fimagefin.jpg?alt=media&token=3082e87f-ecc5-4150-8b94-75ab357ee094" alt="okx installation">


1. Head over to the [OKX](https://www.okx.com/) website and sign up for an account. This allows you to access all of [Blankly's Paper Trade](https://docs.blankly.finance/examples/rsi) features (such as backtesting `Blankly.Strategy` in one line).
2. After your account has been set up, head over to the API section which can be found when you hover your user profile in the top right. Go ahead and fill out the necessary details to create your Live and Sandbox (Demo trading) keys. Note the information in a safe place, it will be used shortly.

## Integrating with Blankly

### Initializing Your Directory

If you already have a directory set up wtih Blankly (i.e. with a `keys.json`, a `settings.json` and a `blankly.json`) with your own trading bot, you can skip this step. If you haven't set up a directory yet, simply run:

```bash
$ blankly init okx
```

to initialize the directory and all of its files.

Note, if you're wondering what is going on, definitely take a look at our [Getting Started Video](https://youtu.be/pcm0h63rhUU).

Then, simply update the `keys.json` to include your keys (and feel free to update the key names as needed).

```python
"okx": {
        "OKX Sandbox portfolio": {
            "API_KEY": "************************************",
            "API_SECRET": "********************************",
            "API_PASS": "*********************",
            "sandbox": false
        },
        "OKX Live Keys": {
            "API_KEY": "************************************",
            "API_SECRET": "********************************",
            "API_PASS": "*********************",
            "sandbox": false
        }
    }
```

**To test in the sandbox mode, use your sandbox portfolio during initialization. If you want to test in live, use your live keys, while can be done like below:**

```python
from blankly import Okx

okx_sandbox = Okx(portfolio_name='OKX Sandbox portfolio') # matching up with portfolio names in JSON
okx_live = Okx(portfolio_name='OKX Live Keys')

# Proceed with the rest of your code
...
```

If you have any questions or feedback, please reach out to [support@blankly.finance](mailto:support@blankly.finance).