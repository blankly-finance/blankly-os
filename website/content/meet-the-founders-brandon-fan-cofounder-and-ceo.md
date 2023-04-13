---
readingTime: 7
title: 'Meet the Founders: Brandon Fan, Cofounder and CEO'
description: Discover more about our founder Brandon, and how he decided to work on
  Blankly and where he thinks it's heading
authorImage: "https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fauthors%2Fimg_3678.JPG?alt=media&token=240ddce6-0181-452b-b83e-c7b595678e58"
authorName: Brandon Fan
date: 2021-12-20T00:00:00.000-05:00
category: Founder's Story
categoryClass: bg-indigo-100
categoryText: text-indigo-800
image: "https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fimg_3821.jpg?alt=media&token=8f28d0c8-37d7-47d6-a779-4b53cfc909ff"

---
## The “Builder” In Me

I’ve always been fascinated by computers. Ever since I was in middle school, I would plug my ASUS laptop into the wall with the AC/DC chargers and try to pretend I was “hacking” by opening up the powershell and running `ls -a` and showing all my friends (What a nerd right). My mom is a software engineer. She tried to teach me Java as a middle schooler, I barely listened (plus Java is so “boring”). Object-oriented programming was a mystery to me.

It was not until 8th grade that I really fell in love with programming. I was tasked with building a video game in 3 days. Being the “inquisitive” one, I found a YouTube video of a block game made in Unity and followed a tutorial to built it. In 3 days and 2 nights, I built a video game. We submitted that game to a competition, and won second place in the nation. That’s when I realized that I loved building things.

Throughout high school I fell in love with building websites. Learning HTML CSS, Angular at the time (though I assure you I have now switched to being a React fan), and building out applications for my local church, for my music school, for a biotech company, my personal website, and eventually scaling to larger things like mobile apps, and much more.

My dad started to see the sparks in my desire to program and started throwing things like AI and the rise of deep learning my way. CNNs, RNNs, every type of Neural network was fascinating to me. I built AI models for healthcare, for NLP, product innovation, published two papers, and won over $10,000 in grant money for my research. All I wanted to was to build things.

## So how did I get into quant investing?

#### Woah....Investing....

I got into investing young. Like many, Rich Dad Poor Dad was one of the first books that I picked up (actually Millionaire Next Door was). I learned about passive income and the desire to “pay yourself first” and began fascinated by investing and finding interesting companies. I began studying day trading too, and that’s when quant trading, learning about different trading patterns like the Doji candle, a hammerhead candle, heads and shoulders pattern, and all the jargon really began to come to fruition. This all happened in middle school (bruh what a weird kid I was).

#### Humble Beginnings...

I started my little portfolio of $500 starting in high school under my dad’s Robinhood account. And I kept adding more and more money to it, until it grew to something much more substantial. I decided to learn much more about this space and began to dive into concepts in quant.

## The Intersection Between Programming + Making Money

As I mentioned before, I fell in love with the concept of AI. The ability to take any piece of information and data and find a “diamond” in the rough to ultimately help more people fascinated me. When COVID-19 hit, I began to think about how it could help me with investing. Being a trader myself, I knew about all the various signals to analyze and all the different indicators to use. So I decided to do something about it. I built my own ML algorithm to invest for me.

#### The Discoveries of Possibility...and Problems

My ML model utilized multiple factors including fundamental data along with share price momentum to create a portfolio of 20 stocks that would rebalance every quarter. The algorithm itself took about 2-3 weeks of developer, **but building everything itself took about it... well that took months**. This was the first time I realized how painful it was to build a trading algorithm.

My backtesting code required a custom configuration for just about everything. Integrating custom data and getting price data from `yfinance` was so frustrating. I also had no idea about anything cloud related. I manually downloaded data, fed it into my model, and ran it occasionally. It was frustrating.

Despite these struggles, I managed to use that investment algorithm into fruition, and it now manages one of my many algorithm-led portfolios. I had finally realized the beauty and possibility of building algorithms to make money.

## Joining a Trading Team and Escalating the Issue

Joining a trading team in college was a big step for me. The quant club on campus had built out a couple of algorithms but had struggled to really test them. Joining the team, I proposed a new way to build various algorithms. We were able to code them up (again the algorithm itself didn’t take too long), but the infrastructure to backtest took months to build. After a while, we had sufficiently “tested” our models in a couple of scenarios, trained it on enough data and wanted to deploy something. This was the first time I realized how big of a problem cloud infrastructure was. It was not as easy as just running one command line to deploy my model. I had to instantiate a whole compute engine, I had to set up all the packages, manage all the servers and IP connections. Infrastructure that I was frustrating, annoying, and everything not related to improving my model.

Finally, I decided to do something about it.

## The Blankly “Spark”

My cofounder, Emerson, reached out to me one day after one of our trading meetings, asking for a sentiment analysis dataset since he had known I did a lot of AI in the past. I asked him what he was doing, and he simply told me that he was unifying all of the crypto exchanges. Funny enough, this was right when BTC had skyrocketed up to over $36,000. My mind started racing: “Ok, wait I just had this issue with trying to buy and sell stocks on my trading team, what if we wanted to build algorithms for crypto”. I slowly realized how this problem was so much larger than it was.

<figure>
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fscreen-shot-2021-12-22-at-2-39-17-pm.png?alt=media&token=863827b3-27e5-4aff-8c46-c43c32a0f704" alt="Blankly Five Year Vision" width="800" loading="lazy">
  <figcaption align="center">Blankly Five Year Vision</figcaption>
</figure>

We immediately started setting up meetings and tried to think of a variety of problems that I had faced including creating backtests, deploying models, monitoring my strategies, connecting to various exchanges, and building reusable components. This was the birth of Blankly. From two builders struggling with their own problems, realizing that it wasn’t just our own, but something much larger.

<figure>
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fimg_3895.jpg?alt=media&token=49e8a2fe-3e8d-4577-9237-700266d70a1a" alt="Our Early Idea Board" width="800" loading="lazy">
  <figcaption align="center">Our Early Idea Board</figcaption>
</figure>

I remember pulling in different experiences, talking with other developers on the team, imagining and planning out the best way to integrate my existing models, and building something super powerful that I can eventually use for my own development. Building, building building.

<figure>
  <img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fimg_3821.jpg?alt=media&token=8f28d0c8-37d7-47d6-a779-4b53cfc909ff" alt="Working on Blankly!" width="800" loading="lazy">
  <figcaption align="center">Working on Blankly!<figcaption>
</figure>

## Where are we going?

Blankly is dear to me because it solves a critical problem in my life. Since the inception of the idea, we started as a team of 2 and have now grown to a team of 8. I had failed two startups coming before Blankly, but I kept building and solving problems that I had. To be able to build and deploy strategies in minutes instead of months, and completely automated my investment strategies using the power of AI and enabling the future of hedge funds and algorithms is so exciting to me. To where we go next will be up to you guys and what the rest of the world wants. We’re so excited to keep building and can’t wait to see where this goes.

Join us in our journey of building.

Thanks again for reading my story.

Brandon Fan

<img src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fscreen-shot-2021-12-22-at-2-43-12-pm.png?alt=media&token=f0cebc08-27ec-4a22-ac58-a35176e65d4e" alt="Brandon signature" width="200" align="left" loading="lazy">
