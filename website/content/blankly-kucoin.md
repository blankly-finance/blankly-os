---
readingTime: 3
title: Blankly is Now Integrated with KuCoin
description: We're excited to announce the availability of the KuCoin exchange integration with the Blankly Framework, making it easier for our users to use a wide range of exchanges in conjunction with our services.
authorName: Brandon Fan
authorImage: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fauthors%2Fimg_3678.JPG?alt=media&token=240ddce6-0181-452b-b83e-c7b595678e58'
date: 2022-01-23T14:30:00-05:00
category: Integration
categoryClass: bg-indigo-100
categoryText: text-indigo-800
image: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fkucoin%2Fblankly-kucoin.png?alt=media&token=5f30d1ca-997d-47dc-9f0c-e271496e047a'

---

<img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fkucoin%2Fblankly-kucoin.png?alt=media&token=5f30d1ca-997d-47dc-9f0c-e271496e047a" alt="img" style="zoom: 50%;" />

We're excited to announce the availability of the [KuCoin](https://kucoin.com) exchange integration with the Blankly Framework, making it easier for our users to use a wide range of exchanges in conjunction with our services. KuCoin is a highly secure cryptocurrency enabling its users to buy, sell, and store a wide range of cryptocurrencies. It also offers promising altcoins that can't be found on other exchanges. 

Furthermore, we are thrilled to see how our users will utilize this new integration with their existing portfolios as KuCoin offers a robust range of functionality. We are also working towards incorporating other exchanges in the coming days as we aim to become an inclusive platform for all exchanges where our users would need to use only one codebase to run models on all exchanges.

For customers who want a historical view of certain aspects of a coin will be able to leverage our candle endpoints. The data can also be extracted down to the exact second or in an aggregated manner through user-defined intervals (e.g. 1 hour, 24 hours, etc.).

## Awesome, Now How Do You Get Started?

In order for the exchange to work flawlessly, you're going to require two sets of keys: the Sandbox Keys and the Live Keys. 

### KuCoin Sandbox

1. Head over to the [KuCoin Sandbox](https://sandbox.kucoin.com/) website and sign up for an account. This allows you to access all of [Blankly's Paper Trade](https://docs.blankly.finance/examples/rsi) features (such as backtesting `Blankly.Strategy` in one line).
2. After your account has been set up, head over to API Management which can be found when you over your user profile in the top right. Go ahead and fill out the necessary details to create your Sandbox keys. Note the information in a safe place, it will be used shortly. 

<img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fkucoin%2FGroup%20195.png?alt=media&token=c4e91f37-247e-41f7-af7e-35b64c9ce7a8" alt="Kucoin Live Keys API Management"/>

### KuCoin Live Keys

In order to have access to live data feeds and not messy and noisy sandbox data, it's best to utilize live keys specifically with data permissions to have access to real-time KuCoin exchange data. By using these two sets of keys, we ensure that your backtests are fully up-to-date while also allowing seamless transition to trade live using your live keys. 

1. Now, go to the [KuCoin](https://www.kucoin.com/) website and follow the same procedure mentioned earlier. After you have acquired both sets of keys (ensuring data permissions are also given).

## Integrating with Blankly

### Initializing Your Directory

If you already have a directory set up wtih Blankly (i.e. with a `keys.json`, a `settings.json` and a `blankly.json`) with your own trading bot, you can skip this step. If you haven't set up a directory yet, simply run: 

```bash
$ blankly init
```

to initialize the directory and all of its files.

Note, if you're wondering what is going on, definitely take a look at our [Getting Started Video](https://youtu.be/pcm0h63rhUU).

Then, simply update the `keys.json` to include your keys (and feel free to update the key names as needed).

```python
"kucoin": {
        "KC Sandbox portfolio": {
            "API_KEY": "************************",
            "API_SECRET": "************************************",
            "API_PASS": "*********************"
        },
        "KC Live Keys": {
            "API_KEY": "************************",
            "API_SECRET": "************************************",
            "API_PASS": "*********************"
        }
    }
```

**To test in the sandbox mode, use your sandbox portfolio during initialization. If you want to test in live, use your live keys, while can be done like below:**

```python
from blankly import Kucoin
kucoin_sandbox = Kucoin(portfolio_name='KC Sandbox portfolio') # matching up with portfolio names in JSON
kucoin_live = Kucoin(portfolio_name='KC Live Keys')

# Proceed with the rest of your code
...
```

If you have any questions or feedback, please reach out to [support@blankly.finance](mailto:support@blankly.finance).

## Ready to Learn More?

To learn more about the [Blankly Package](https://package.blankly.finance) and our services, refer to our [package documentation](https://docs.blankly.finance/).

If you want to help out with the development of our package and platform, we would love to set up a [call with you here](https://calendly.com/blankly). **If you sign up, we'll send you a sticker and you'll be a part of the few lucky people who will get to enjoy two free months of the [Blankly Platform](https://blankly.finance), coming out soon!**

Happy Trading,

The Blankly Team