<template>
  <div>
    <WhiteNavBar name="Blankly Platform" tab="why-us" product="platform" />
    <main>
      <div class="pb-16">
        <div
          class="
            relative
            py-16
            bg-white
            overflow-x-auto
            sm:overflow-x-hidden
            px-3
            sm:px-0
          "
        >
          <div
            class="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full"
          >
            <div
              class="relative h-full text-lg max-w-prose mx-auto"
              aria-hidden="true"
            >
              <svg
                class="absolute top-12 left-full transform translate-x-32"
                width="404"
                height="384"
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      class="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width="404"
                  height="384"
                  fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
                />
              </svg>
              <svg
                class="
                  absolute
                  top-1/2
                  right-full
                  transform
                  -translate-y-1/2 -translate-x-32
                "
                width="404"
                height="384"
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      class="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width="404"
                  height="384"
                  fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
                />
              </svg>
              <svg
                class="absolute bottom-12 left-full transform translate-x-32"
                width="404"
                height="384"
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="d3eb07ae-5182-43e6-857d-35c643af9034"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      class="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width="404"
                  height="384"
                  fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
                />
              </svg>
            </div>
          </div>
          <div class="relative px-4 sm:px-6 lg:px-8">
            <div class="text-lg max-w-prose mx-auto">
              <h1>
                <span
                  class="
                    block
                    text-base text-center text-green-300
                    font-semibold
                    tracking-wide
                    uppercase
                  "
                  >Why Blankly?</span
                >
                <span
                  class="
                    mt-2
                    block
                    text-3xl text-center
                    leading-8
                    font-bold
                    tracking-tight
                    text-gray-900
                    sm:text-4xl
                  "
                  >So Why Choose the Blankly Platform?</span
                >
              </h1>
              <p class="mt-8 text-lg text-gray-500 leading-8">
                Hey there! If you’re fed up with dealing with the data and
                infrastructure hassles involved in algotrading, then you’re
                probably looking to compare Blankly with other options to figure
                out whether it might be right for you. To help make this as easy
                as possible, we’ve put together a detailed overview of how
                Blankly stacks up to the rest
              </p>
              <p class="mt-8 text-lg text-gray-500 leading-8">
                Below you’ll find a high level comparison of the main features,
                links to in-depth profiles of different products, and even a set
                of cases where Blankly is not the best choice, and
                recommendations for what might work better!
              </p>
            </div>
            <ComparisonTable />
            <div class="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
              <h3>I’m looking for no-code model development</h3>
              <p>
                The Blankly workflow is centered around streamlining the
                development process for algorithmic models, from writing the
                code itself to backtesting and finally to deployment. If coding
                isn’t up your alley, then Trality is easy to get started with,
                where you can build trading bots by dragging and dropping
                indicators and strategies.
              </p>
              <h3>
                I want access to other models and strategies I can deploy myself
              </h3>
              <p>
                As you get started with Blankly, we provide a library of base
                models to help you onboard. Once you get the hang of things, you
                can create a model and start generating alpha in just six lines
                of code. However, to protect user’s proprietary models, users do
                not have access to models built by others through the Blankly
                Platform. If you are looking to deploy someone else’s model
                rather than build your own, check out Quantconnect, where you
                can pay to license models in a marketplace.
              </p>
              <h3>I want to build models from the ground up</h3>
              <p>
                With the
                <a
                  target="_blank"
                  class="text-blue-500 cursor-pointer"
                  href="https://package.blankly.finance"
                  >Blankly Package</a
                >
                and the Blankly Platform, we’ve got your back. With easy
                onboarding, develop a model and start generating alpha in just
                six lines of code. Blankly’s infrastructure makes it easy to
                backtest, iterate on, and deploy your model, so you can go from
                ideation to profit without dealing with the hassles of
                traditional algorithm development.
              </p>
              <h3>I need a great backtesting experience</h3>
              <p>
                Blankly understands that the backtesting is a crucial part of
                the model development process, and we are here to make it as
                painless as possible. Using data from various brokerages, we let
                you test your model with historical data, store your backtest
                logs, and then compare with your previous backtests to validate
                progress. That’s why hundreds of developers choose Blankly to
                streamline their backtests.
              </p>
              <h3>I want a platform that unites my developer team</h3>
              <p>
                With a project that has as many loose ends as an algorithmic
                trading model, a shared repository just is not enough. Blankly
                allows teams to collaborate together on projects, from comparing
                backtests to model monitoring. We take care of all the hassle of
                team management, and let you all work on crafting your secret
                source.
              </p>
            </div>
          </div>
        </div>
        <div class="py-8 mb-8 max-w-6xl mx-auto">
          <hr />
        </div>
        <CTAPlatform />
      </div>
      <Footer />
    </main>
  </div>
</template>
<script>
import ComparisonTable from '@/components/platform/ComparisonTable'
import CTAPlatform from '@/components/platform/CTAPlatform'
import Footer from '@/components/Footer'
export default {
  components: {
    CTAPlatform,
    ComparisonTable,
    Footer,
  },
  head() {
    return {
      title: 'So Why Blankly? | Blankly Platform',
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: 'So Why Blankly? | Blankly Platform',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: 'So Why Blankly? | Blankly Platform',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: 'So Why Blankly? | Blankly Platform',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content:
            'See how our Blankly Platform compares to others on the market',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'See how our Blankly Platform compares to others on the market',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Backtest Cloud Deploy Quant Workflow Security Hedge Fund Enterprise',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'So Why Blankly? | Blankly Platform',
        },
        {
          hid: 'image',
          name: 'image',
          content: 'https://blankly.finance/preview.png',
        },
        {
          hid: 'og:image',
          name: 'og:image',
          property: 'og:image',
          content: 'https://blankly.finance/preview.png',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://blankly.finance/preview.png',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'See how our Blankly Platform compares to others on the market',
        },
      ],
    }
  },
}
</script>
