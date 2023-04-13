# Blankly Finance - 4646 commits, 102,001 lines of code in 1.3 years

This codebase contains or references everything needed to self-host or deploy your own blankly finance stack - build, backtest, deploy, monitor and test your strategies at scale.

![Blankly Platform](https://camo.githubusercontent.com/6dd6db5eccec10b6bffddb040cacb84ded523f58e5df4eb0dbcc9acf48b9b291/68747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f626c616e6b6c792d36616461352e61707073706f742e636f6d2f6f2f67697468756225324653637265656e25323053686f74253230323032322d30342d31372532306174253230322e33372e3538253230504d2e706e673f616c743d6d6564696126746f6b656e3d64353733383631372d653139372d346461322d383530642d386662626664613035323735)
# Things you can do with this code
## Self hosted quant ops
If you're an institution, prop shop or individual, this does functional as a full, load balanced quant ops platform.

Skip to the `Setting It Up` section below.

As a plus, something that is implemented but was never used in production was the ability run thousands of backtests
in parallel on the cloud. This enables the ability to run tons of simultaneous experiments to optimize very quickly.

## Monetize it // make your own startup
The platform did have paying customers before we took it down. In theory if you were to launch this stack, you
can find paying users. You may need to make a contribution to the blankly-finance/blankly CLI so users can deploy
directly to your system, but I'm happy to merge it.

Ultimately we took it down because the revenue that we found was too low to justify the maintenance and upgrades, and we
couldn't see a good way to make it significantly more profitable. However, there are specific features that we found from
our users that could have made it significantly more interesting that we didn't implement. These are as follows:

### If you consider continuing the project, these are some features you should consider implementing:
#### No Code Drag & Drop
Composer trade sucks, everyone hates it. We had many Composer users come to blankly because they were tired of the Composer
interface. This does imply that blankly has a uniquely good position to allow no code development of strategies but then
a python compiler to turn it into a full strategy.

We also heard from people who didn't know python that they wanted to use it they just didn't know how. I believe adding
a block coding system would be a huge factor in making this stack successful. This would be the first thing I would add
if I were to start this project again.

#### Cloud hosted coding instances
People often had a hard time configuring their environment. If blankly instances were launched from the platform, this
would significantly reduce the overhead. We also got this feedback from customers.

#### Better data // better charts
Platform data was buggy at best, missing at worst. Something that we did was try to aggregate from stocks, crypto and forex.
This also created a bunch of weird issues, for example, how am I supposed to quote someone's DOGE-BTC trade in USD? I need 
tons of data & to make this happen.
The low quality of data is totally unacceptable and drove away users. Finding a better data source would be critical.

#### Better testing // technical reviews
We wrote this stack extremely quickly, mostly over 2021 Christmas break. The code volume was high but testing was low.
Better testing and fixing bugs would have helped a ton.

# Setting Up
This repo contains all the previously closed source code besides a few utility repos:

## Overview of the different folders
- `./platform` (1408 commits, 34926 lines of code)
The blankly platform codebase, contains the nextjs code to drive the platform
- `./deployment` (174 commits, 1822 lines of code)
Deployment API. This handles the model lifecycle on kubernetes.
- `./reporter` (78 commits, 676 lines of code)
Reporter code. This was imported by the package and can be used to drive
any processes you need during deployment or manage your backtesting.
- `./manager` (102 commits, 1447 lines of code)
A very cool nodejs manager that I wrote, the code is a mess though.
This ran inside of the blankly kubernetes pod and could manage the
install of dependencies and the process lifecycle, and forward
events on to the model events API
- `./metrics` (28 commits, 507 lines of code)
Very useful service to generate quantstats metrics for any set of 
portfolio data sent to it. Used on the platform
- `./website` (435 commits, 10864 lines of code)
Main website, landing page, thing at https://blankly.finance
- `./package-website` (43 commits, 4542 lines of code)
Website for https://package.blankly.finance
- `./cloud-functions` (105 commits, 1234 lines of code)
Cloud functions for actions done in firebase by the platform
- `./model-events-api` (97 commits, 830 lines of code)
This listens to events propagated by the client in `./manager` and puts
them in firebase
- `./terraform` (3 commits, 156 lines of code)
HCL/Terraform code for the blankly cloud. This wasn't totally finished
but it works fairly well for most of the services
- `./docker-base` (10 commits, 56 lines of code)
This repo contains the images that would be deployed on kubernetes

## Public Repos:
- `blankly-finance/blankly` [(1556 commits, 29134 lines of code)](https://github.com/blankly-finance/blankly)
Blankly package
- `blankly-finance/blankly-docs` [(229 commits, 0 lines of code)](https://github.com/blankly-finance/blankly-docs)
Documentation for blankly
- `blankly-finance/slate-python` [(47 commits, 3783 lines of code)](https://github.com/blankly-finance/slate-python)
Push to the platform without backtesting in blankly
- `blankly-finance/examples` [(17 commits, 4073 lines of code)](https://github.com/blankly-finance/examples)
Examples for the package
- `blankly-finance/slate-docs` [(35 commits, 0 lines of code)](https://github.com/blankly-finance/slate-docs)
Documentation for the platform

### Other small repos to finish the commit tally:
- `database-loading` (14 commits, 191 lines) (remaining closed)
- `blankly-discord` (26 commits, 3591 lines) (remaining closed)
- `platform-api` (15 commits, 0 lines) (remaining closed)
- `blankly-api-client` (13 commits, 248 lines)
- `KellyBot` (12 commits, 0 lines)
- `IchimokuBot` (4 commits, 0 lines)
- `rsi-crypto-trading-bot` (5 commits, 0 lines)
- `billing-service` (83 commits, 1333 lines) (remaining closed)
- `usage-metrics-api` (16 commits, 165 lines) (remaining closed)
- `data-aggregator` (48 commits, 999 lines) (remaining closed)
- `integration-engine` (43 commits 1424 lines) (remaining closed)

## Steps
A very quick rundown of how to get this running is still in progress, however quick steps are as follows if you've done this before:
- Create a firebase project
- Deploy the `./platform` repo on a nextjs service of your choosing (vercel is always good)
- Deploy the `./cloud-functions` repo on firebase functions
- Deploy these services to cloud run:
  - `./deployment`
  - `./metrics`
  - `./model-events-api`
- Fix all URLs to point to your new cloud run services
- Deploy a kubernetes cluster and point the deployment API to that
- Build the blankly docker base and put that on container registry
- Change the package deployment API route to point to your service
- Debug...
  - Deploy a model, when all URLs are correct, it will download and build the image on cloud build
  - The model should then broadcast events to the model events API
  - The model events API should then put those events in firebase
  - The platform should then listen to those events and update the UI
