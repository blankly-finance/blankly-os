---
readingTime: 5
title: How to Build a Crypto Price Monitoring Discord Bot
description: "This article is a continuation of a previous piece on using Blankly Connect to help create community trading bots. So, if you haven't had a chance to read that yet, I'd highly recommend doing so as it will help you in catching up to speed with what will be discussed in this article."
authorName: Avi Mehta
authorImage: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fauthors%2Favi-mehta-headshot.jpeg?alt=media&token=5129aa4a-b0c4-4a72-be2c-f0e8690934aa'
date: 2022-01-22
category: Technology
categoryClass: bg-red-100
categoryText: text-red-800
image: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fhow-to-build-a-crypto-price-monitoring-discord-bot%2Fdiscordcrypto.png?alt=media&token=463f4b3c-d4f6-4202-ba42-6b90829130be'

---
This article is a continuation of a previous piece on using Blankly Connect to help create community trading bots. So, if you haven't had a chance to read that yet, I'd highly recommend doing so as it will help you in catching up to speed with what will be discussed in this article. 

[How To Add A Community Trading Bot on Discord](https://blankly.finance/how-to-add-a-community-trading-bot-on-discord)

<hr>
 
An aspect which I've always envied of some Discord servers are the fact that they have bots which are always displaying some type of information. I, personally, think it's pretty cool as it allows for users to stay up to date with whatever the bot is displaying without having to actually check it themselves. Therefore, after adding the Blankly Connect Community Trading bot, I decided to go ahead and create 2 new bots which will always track the price of [BTC-USD](https://finance.yahoo.com/quote/BTC-USD/) and [ETH-USD](https://finance.yahoo.com/quote/ETH-USD/) as these are two of the most popular, in-demand cryptocurrencies.   
   
Having live bots at all times can definitely boost the overall user engagement in your server over time, thus this is also a great tool to ensure that your server doesn't die. The bots were developed using our robust [Blankly Connect API](https://blankly.finance/products/api/) package as a means to showcase the reliability and trustworthiness of this package. Go ahead and create a new application on the [Discord Developer Portal](https://discord.com/developers/docs/intro) from where you will be able to access the authorization token and set the permissions for your bot. Once the application is created, click on the section titled Bot and go ahead and fill the necessary details. Find the bot's authorization token and make sure to not share it with anyone. This token will be needed in the next few steps. Now that your bot is setup, you have to invite it to your server by selecting the OAuth2 tab and then the URL Generator to allow you to select certain permissions and abilities for the bot. When done, copy the URL shown at the bottom of the page and paste it into your web browser. Select the server to which the bot will be in and that's it. Your bot is alive within your server. 

Discord uses OAuth2 to authenticate the network flow from the Discord API and your applications. Within Discord there are multiple types of OAuth2 authentication and scopes, so make sure to research which one would best suit your purpose. Check out their documentation here: [Discord Developer Portal OAuth2](https://discord.com/developers/docs/topics/oauth2).

Create a file on your IDE which will contain your bot's token like the following snippet below and make sure to give it a `.json` file type before adding it to `.gitignore`, so that the token wont be visible when you push your repository onto Github. The second file you will need is the `package.json` so that it is easy for others to manage and install your package. Add the following fields:

```json
{  
    "token" = "[token goes here]"   
}
```

The last file you are going to need is where you will program the bot's functionality and behavior.

```json
{  
    "name": "[Name of your bot]",  
    "version": "[version id]",  
    "description": "Enter a description",  
    "main": "bot.js",  
    "author": "Your Name Goes Here",  
    "dependencies": { },  
    "scripts": { }  
}  
```

```javascript
let Discord = require("discord.js");  
let auth = require('./btcBotAuth.json');  
let connector = require('../src/blankly_client'); 

//Connecting using Blankly Connect   
connector.setExchange('coinbase_pro');  
connector.setKeys({'API_KEY': '***', 'API_SECRET': '***', 'API_PASS':'***'});  
connector.setSandbox(true);  

//Starting the bitcoin_bot  
let bitcoin_bot = new Discord.Client({   
    intents: \["GUILDS"\],  
    autorun: true  
});  
bitcoin_bot.login(auth.token);  

//Success message if connected properly  
bitcoin_bot.on('ready', function (evt) {  
    console.log('{Status: Bitcoin Bot is Connected}');  
});  

//Error message if not connected properly  
bitcoin_bot.on('error', function (error) {  
    console.log(error)  
});  

//Returns the price of the symbol requested  
async function getPrice(){  
    const data = (await connector.getPrice("BTC-USD")).data.result;   
    return data  
}  

//Executes getPrice on the bot  
async function main(){  
    bitcoin_bot.user.setActivity(\`BTC-USD at $${await getPrice()}\`, { type: "WATCHING" })   
}  
   
//Sets interval for price update  
setInterval(() => main(), 300000);
```

This is the code snippet to successfully add a Bitcoin price monitoring bot. You can certainly use this and build upon it for your own server's personal requirements. As you may have notices, this bot uses [Discord.js](https://discord.js.org/#/) rather than [Discord.io](https://www.npmjs.com/package/discord.io/v/1.0.1), and while both are fine I wanted to give Discord.js a shot as I've heard its more powerful, straightforward, and simple to use. A great resource that I used while developing this is the documentation notes for Discord.js The diagram below shows how the Blankly Connect API acts as a middleman between Discord and the major cryptocurrency coins allowing for real-time updates and an overall smooth experience for the user.  

<figure>
    <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fhow-to-build-a-crypto-price-monitoring-discord-bot%2Fdiscordcrypto.png?alt=media&token=463f4b3c-d4f6-4202-ba42-6b90829130be" alt="Blankly Connect in Discord" width="700">
    <figcaption align="center">Blankly Connect in Discord</figcaption>
</figure>

As you have now learned how to create a bot which continuously monitors assets for a Discord server, you can use your coding skills and imagination to think of certain assets which your bots could potentially monitor. There is an endless stream of possibilities for which assets could you monitor. **Do let us know if you end up doing something cool! We would love to hear about it in our [Discord](https://discord.gg/kS7Rk6knzU).** As we look to continuously improve the bots, our next few steps are to transform this project into being open source, similar to our other products, so that the community can have a more direct involvement with our cause and we can make improvements related to your feedback and to increase the number of cryptocurrencies that we will be monitoring—possibly Dogecoin 🚀.