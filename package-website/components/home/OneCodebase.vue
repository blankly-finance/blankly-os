<template>
  <section id="one-codebase">
    <div
      class="
        relative
        max-w-4xl
        mx-auto
        px-6
        mb-16
        sm:mb-16 sm:px-6
        lg:px-8 lg:max-w-7xl
        mt-5
        sm:pt-12 sm:mt-20
      "
    >
      <div class="max-w-8xl mx-auto py-3 pt-10 sm:pt-0 sm:mt-12 sm:py-12">
        <div class="max-w-5xl mx-auto">
          <h2
            class="
              max-w-2xl
              mx-auto
              sm:text-5xl
              text-3xl
              font-bold
              text-gray-900 text-center
              lg:max-w-3xl
            "
          >
            One package for all trading needs across
            <span class="text-blue-500">Web2</span> and
            <span class="text-indigo-500">Web3</span>
          </h2>
          <p class="mt-3 pt-4 text-lg text-gray-500 text-center">
            Every model needs to figure out how to buy and sell. We make it
            super easy for you so you can focus on building better trading
            algos. Your models can run on any platform, and on any supported
            exchange. We make that as easy as just changing one line of code.
          </p>
          <div class="grid sm:grid-cols-3 mt-12 gap-4">
            <div
              v-for="feature in features"
              :key="feature.name"
              class="
                border border-gray-200
                p-6
                rounded-md
                flex flex-col
                hover:bg-gray-50
                cursor-pointer
              "
            >
              <h1 class="font-bold text-lg">{{ feature.name }}</h1>
              <p class="mt-3 text-base flex-1">
                {{ feature.description }}
              </p>
              <a
                class="text-blue-500 mt-4 text-sm hover:text-blue-600 block"
                :href="feature.link"
                >See More Examples</a
              >
            </div>
          </div>
          <p class="text-sm text-center mt-10">
            And many many more: We're building out data connectors, futures
            support, vectorized backtests, portfolio analysis, and more.
          </p>
          <a
            class="block mt-3 text-center text-sm text-blue-500"
            href="https://blankly.notion.site/blankly/a07253df7aa540a881be77dc9934a7fb?v=a8f21c42ef43453bb5dbb471ec939912"
            target="_blank"
            >Check out our package roadmap
            <span aria-hidden="true">&rarr;</span></a
          >
        </div>
      </div>
    </div>
  </section>
</template>
<script>
const features = [
  {
    name: 'Backtest',
    description: 'Quickly & accurately simulate your models over time.',
    link: 'https://github.com/Blankly-Finance/Blankly/blob/main/examples/rsi.py',
  },
  {
    name: 'Paper Trade',
    description: 'Combine live price feeds with an accurate account engine',
    link: '',
  },
  {
    name: 'Cross Exchange',
    description: 'Optimize across exchanges, asset types & markets',
    link: '',
  },
  {
    name: 'Custom Data',
    description: 'Test on anything from tick data to fundamentals',
    link: '',
  },
  {
    name: 'Integrated Websockets',
    description: 'Connect to any supported websocket in two lines',
    link: '',
  },
  {
    name: 'Live deployment',
    description: 'Take your backtested strategy live in one line (for free)',
    link: '',
  },
]
export default {
  data() {
    return {
      features,
    }
  },
}
</script>
