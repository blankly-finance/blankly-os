<template>
  <div class="mt-12">
    <div class="text-center max-w-7xl mx-auto">
      <div class="grid grid-cols-2 divide-x-2 h-24 mx-auto divide-indigo-600">
        <div class="text-white">1</div>
        <div class="text-white">2</div>
      </div>
      <div
        class="
          bg-indigo-600
          w-9
          h-9
          mb-4
          rounded
          flex
          items-center
          justify-center
          mx-auto
        "
      >
        <h1 class="text-white text-md font-bold">1</h1>
      </div>
      <h1 class="text-indigo-600 text-xl uppercase font-bold sm:text-2xl">
        Build
      </h1>
      <h1 class="py-8 text-4xl sm:text-5xl font-extrabold">
        Begin with the Code
      </h1>
      <iframe
        src="https://ghbtns.com/github-btn.html?user=Blankly-Finance&repo=Blankly&type=star&count=true"
        frameborder="0"
        scrolling="0"
        style="margin: 0 auto"
        width="100"
        height="20"
        title="GitHub"
      ></iframe>
      <div
        class="max-w-4xl p-5 md:p-0 mx-auto md:grid md:grid-cols-2 md:gap-x-4"
      >
        <p class="text-gray-600 py-4 text-md text-left md:col-start-1">
          It starts with the code. Our developers are loving our
          <a
            class="text-blue-700 underline cursor-pointer"
            href="https://package.blankly.finance"
            target="_blank"
            >Blankly Package</a
          >: the open source package to rapidly build trading algorithms across
          assets, brokerages, and exchanges. We've hit over 1000+ stars and over
          10K downloads/month. Check out the
          <a
            class="text-blue-700 underline cursor-pointer"
            href="https://docs.blankly.finance"
            target="_blank"
            >docs</a
          >
          too.
        </p>
        <p class="text-gray-600 py-4 text-md text-left md:col-start-2">
          The Blankly Platform empowers the process of developing better
          algorithms from idea to production monitoring and is the fastest way
          to go from idea to true alpha without the infrastructure headache.
          Better yet, blankly integrates with any custom framework.
        </p>
      </div>
    </div>

    <div class="relative mt-4 sm:mt-8 max-w-7xl mx-auto">
      <div
        class="
          lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center
          mx-auto
          max-w-5xl
          sm:max-w-7xl
          gap-x-0
        "
      >
        <div class="lg:col-start-2">
          <dl class="mt-10 sm:mt-0 space-y-10 p-5 md:p-0">
            <div class="relative">
              <dt>
                <p class="md:ml-16 text-2xl font-bold leading-6 text-gray-900">
                  Easy Code Integration
                </p>
              </dt>
              <dd class="mt-2 md:ml-16 text-base text-gray-500">
                We make it easy to integrate your existing models without
                changing any of your code. Let us handle connecting with
                exchanges, backtesting, and data integrations.
              </dd>
            </div>
            <div class="relative">
              <dt>
                <p class="md:ml-16 text-2xl font-bold leading-6 text-gray-900">
                  Powerful Backtesting Engine
                </p>
              </dt>
              <dd class="mt-2 md:ml-16 text-base text-gray-500">
                Our backtesting engine is extensible, fast, and powerful. We've
                worked with fintech developers to hone in on our backtesting
                design and improve user experience.
              </dd>
            </div>
            <div class="relative">
              <dt>
                <p class="md:ml-16 leading-6 text-2xl font-bold text-gray-900">
                  Production in One Line
                </p>
              </dt>
              <dd class="mt-2 md:ml-16 text-base text-gray-500">
                Switch from backtesting to production in one line. The research
                and production environment is the same.
              </dd>
            </div>
          </dl>
        </div>
        <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
          <div id="gist-bots"></div>
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto py-3 sm:py-12 lg:px-8">
      <div class="text-center py-4">
        <p class="uppercase mb-6 text-black text-md font-bold">
          Or Integrate With Any Framework
        </p>
      </div>
      <div class="mx-auto max-w-7xl">
        <div
          class="
            flex flex-col
            sm:flex-row
            mx-auto
            space-y-6
            sm:space-y-0
            items-center
            justify-center
            self-center
            sm:space-x-6
            mt-8
            lg:mt-0
          "
        >
          <div>
            <img
              class="h-6"
              src="~/assets/images/logos/coinbase.svg"
              alt="Coinbase"
            />
          </div>
          <div>
            <img
              class="h-7"
              src="~/assets/images/logos/binance.svg"
              alt="Binance"
            />
          </div>
          <div>
            <img
              class="h-8"
              src="~/assets/images/logos/alpaca.svg"
              alt="Alpaca"
            />
          </div>
          <div>
            <img
              class="h-6"
              src="~/assets/images/logos/oanda.svg"
              alt="OANDA"
            />
          </div>
          <div>
            <img class="h-7" src="~/assets/images/logos/ftx.svg" alt="ftx" />
          </div>
          <div>
            <img
              class="h-6"
              src="~/assets/images/logos/kucoin.svg"
              alt="kucoin"
            />
          </div>
        </div>
      </div>
      <!-- <div class="mx-auto mt-5 max-w-7xl">
        <div
          class="
            flex flex-col
            sm:flex-row
            mx-auto
            space-y-6
            sm:space-y-0
            items-center
            justify-center
            self-center
            sm:space-x-6
            mt-8
            lg:mt-0
          "
        >
          <div class="flex items-center">
            <img
              class="h-8"
              src="~/assets/images/blankly-black.svg"
              alt="Blankly"
            />
          </div>
          <div>
            <img
              class="h-10"
              src="~/assets/images/jesse-bot.svg"
              alt="Binance"
            />
          </div>
          <div>
            <img
              class="h-10"
              src="~/assets/images/freqtrade.svg"
              alt="Binance"
            />
          </div>
          <div>
            <div class="font-bold">backtrader</div>
          </div>
          <div>
            <img class="h-10" src="~/assets/images/bt.png" alt="" />
          </div>
          <div>
            <img class="h-8" src="~/assets/images/backtestingpy.png" alt="" />
          </div>
          <div>
            <img class="h-5" src="~/assets/images/ccxt.png" alt="" />
          </div>
        </div>
      </div> -->
    </div>
    <div
      class="
        py-20
        my-12
        border-2 border-gray-200
        max-w-7xl
        sm:mx-auto
        mx-4
        px-6
        sm:px-12
        text-center
        rounded-xl
        shadow-xl
      "
    >
      <div class="max-w-5xl mx-auto text-center sm:text-left">
        <h1 class="text-3xl sm:text-5xl text-gray-900 mt-3 font-bold sm:w-3/5">
          Easily deploy & monitor your algos with literally
          <span class="text-blue-500"> any codebase</span>
        </h1>
        <p class="mt-5 text-xl max-w-2xl">
          No matter the framework, codebase or if you're building it in house,
          easily integrate backtests exports & live reporting into your current
          code for the platform. Stop focusing on anything that's not your
          trading algorithms.
        </p>
        <p class="font-mono text-xl mt-10 font-medium text-gray-900 text-left">
          <span class="text-green-300">$</span> pip install blankly-slate
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$postscribe(
      '#gist-bots',
      // eslint-disable-next-line no-useless-escape
      '<script src="https://gist.github.com/EmersonDove/8136960666605c504267e5417fbf49c2.js"><\/script>'
    )
  },
}
</script>
