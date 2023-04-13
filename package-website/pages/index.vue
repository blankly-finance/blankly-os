<template>
  <div class="min-h-screen">
    <div class="relative overflow-hidden">
      <div class="bg-black bg-gradient-to-t">
        <WhiteNavBar name="Blankly Package" tab="overview" product="package" />
      </div>
      <main>
        <div
          class="
            pt-1
            sm:pt-16
            lg:pt-8 lg:pb-20
            mb-20
            sm:mb-0
            lg:overflow-hidden
          "
        >
          <div class="mx-auto max-w-7xl text-center lg:px-8">
            <div>
              <div
                class="mx-auto w-full px-6 sm:max-w-6xl sm:px-6 sm:text-center"
              >
                <div class="lg:py-5">
                  <a
                    href="https://github.com/Blankly-Finance/Blankly/releases"
                    target="_blank"
                    class="
                      inline-flex
                      items-center
                      text-gray-900
                      bg-gray-100
                      rounded-full
                      p-1
                      mb-10
                      pr-2
                      sm:text-base
                      lg:text-sm
                      xl:text-base
                      border-gray-200 border
                      hover:text-gray-700
                    "
                  >
                    <span
                      class="
                        px-3
                        py-0.5
                        text-white text-xs
                        font-semibold
                        leading-5
                        uppercase
                        tracking-wide
                        bg-green-300
                        rounded-full
                      "
                      >v1.17.1b</span
                    >
                    <span class="ml-4 text-sm"
                      >Check out our release notes
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 inline-block mr-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        /></svg
                    ></span>
                  </a>
                  <!-- <div class="text-center mx-auto">
                    <a
                      href="https://www.producthunt.com/posts/blankly-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-blankly&#0045;2"
                      target="_blank"
                      ><img
                        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=337303&theme=light"
                        alt="Blankly&#0032;😶 - Build&#0032;trading&#0032;models&#0032;for&#0032;any&#0032;asset&#0044;&#0032;brokerage&#0044;&#0032;or&#0032;exchange | Product Hunt"
                        style="width: 250px; height: 54px"
                        class="mx-auto"
                        width="250"
                        height="54"
                    /></a>
                  </div> -->
                  <h1
                    class="
                      mt-4
                      text-6xl
                      md:text-7xl
                      tracking-tight
                      text-center
                      font-extrabold
                      text-gray-900
                      sm:mt-5 sm:text-6xl
                      lg:mt-6
                      xl:text-8xl
                    "
                  >
                    <span
                      >Build
                      <span class="text-green-300">trading algorithms</span> for
                      any asset</span
                    >
                  </h1>
                  <p
                    class="
                      pt-5
                      text-base text-gray-400
                      sm:mt-5 sm:text-xl sm:max-w-4xl
                      mx-auto
                      lg:text-lg
                      xl:text-xl
                    "
                  >
                    Blankly is the first framework to enable developers to
                    <span class="text-blue-500 font-semibold">backtest</span>,
                    <span class="text-blue-500 font-semibold">paper trade</span
                    >, and
                    <span class="text-blue-500 font-semibold">go live</span>
                    across exchanges without modifying a single line of trading
                    logic on stocks, crypto, and forex.
                  </p>
                  <div class="sm:flex justify-center mt-10 sm:mt-12">
                    <div class="mx-auto w-full md:hidden mb-5">
                      <iframe
                        src="https://ghbtns.com/github-btn.html?user=Blankly-Finance&repo=Blankly&type=star&count=true"
                        frameborder="0"
                        scrolling="0"
                        style="margin: 0 auto"
                        width="100"
                        height="20"
                        title="GitHub"
                      ></iframe>
                    </div>
                    <div
                      class="
                        bg-white
                        border-gray-200 border
                        rounded-md
                        shadow-lg
                        w-full
                        sm:w-auto
                        py-3
                        px-7
                        sm:px-9 sm:py-4 sm:mr-5
                      "
                    >
                      <pre class="text-gray-900 font-medium -ml-2 font-mono">
 <span class="text-green-300">$</span> pip install blankly</pre>
                    </div>
                    <a
                      href="https://docs.blankly.finance"
                      target="_blank"
                      class="
                        block
                        px-6
                        py-2
                        w-full
                        sm:w-auto sm:inline-flex sm:items-center
                        mt-3
                        text-center
                        sm:mt-0 sm:flex-shrink-0
                        border border-transparent
                        text-base
                        font-medium
                        sm:rounded-md
                        shadow-2xl
                        rounded
                        text-white
                        bg-gray-900
                        hover:bg-gray-700
                      "
                    >
                      View Documentation
                    </a>

                    <a
                      href="https://docs.blankly.finance"
                      target="_blank"
                      @click="logDiscordEvent"
                      class="
                        items-center
                        px-4
                        py-2
                        w-full
                        flex
                        justify-center
                        sm:w-auto sm:inline-flex sm:items-center
                        mt-3
                        text-center
                        sm:mt-0 sm:flex-shrink-0
                        border border-transparent
                        text-base
                        sm:font-medium sm:rounded-md
                        rounded
                        sm:hidden
                        text-white
                        font-semibold
                        bg-indigo-400
                        hover:bg-indigo-500
                      "
                    >
                      <img
                        class="h-4 mr-4"
                        src="~/assets/images/logos/discord.svg"
                        alt="Discord"
                      />
                      Join Our Discord
                    </a>
                  </div>
                  <!-- <div class="flex justify-center items-center mt-10">
                    <img
                      class="w-6 h-6"
                      src="~/assets/images/github.svg"
                      alt=""
                    />
                    <span class="ml-2 text-sm">550+ GitHub Stars</span>
                  </div> -->
                </div>
                <a
                  class="mt-6 block text-blue-500 text-sm"
                  href="https://youtu.be/pcm0h63rhUU"
                  target="_blank"
                  >Watch how we build an RSI bot with Blankly
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 inline-block mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    /></svg
                ></a>
                <div class="mx-auto max-w-7xl sm:py-12 mt-14">
                  <div
                    class="
                      grid grid-cols-2
                      gap-6
                      sm:flex sm:flex-row
                      mx-auto
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
                      <img
                        class="h-7"
                        src="~/assets/images/logos/ftx.svg"
                        alt="ftx"
                      />
                    </div>
                    <div>
                      <img
                        class="h-6"
                        src="~/assets/images/logos/kucoin.svg"
                        alt="kucoin"
                      />
                    </div>
                  </div>
                  <p class="text-sm mt-8 text-gray-500">
                    Need a custom brokerage or exchange integration?
                    <a
                      class="
                        text-blue-500
                        ml-3
                        hover:text-blue-600
                        cursor-pointer
                      "
                      >Contact Sales</a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="mx-auto shadow-2xl max-w-5xl border border-gray-200 rounded-md"
        >
          <script
            src="https://fast.wistia.com/embed/medias/iyn20b6gey.jsonp"
            async
          ></script>
          <script
            src="https://fast.wistia.com/assets/external/E-v1.js"
            async
          ></script>
          <div
            class="wistia_responsive_padding mx-auto"
            style="position: relative"
          >
            <div
              class="wistia_responsive_wrapper mx-auto"
              style="height: 100%; margin: 0 auto"
            >
              <div
                class="wistia_embed wistia_async_iyn20b6gey videoFoam=true"
                style="height: 100%; position: relative; width: 100%;"
              >
                <div
                  class="wistia_swatch"
                  style="
                    height: 100%;
                    left: 0;
                    opacity: 0;
                    overflow: hidden;
                    position: absolute;
                    top: 0;
                    transition: opacity 200ms;
                    width: 100%;
                  "
                >
                  <img
                    src="https://fast.wistia.com/embed/medias/iyn20b6gey/swatch"
                    style="
                      filter: blur(5px);
                      height: 100%;
                      object-fit: contain;
                      width: 100%;
                    "
                    alt=""
                    aria-hidden="true"
                    onload="this.parentNode.style.opacity=1;"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="
            py-20
            my-24
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
            <h1
              class="text-3xl sm:text-5xl text-gray-900 mt-3 font-bold sm:w-3/5"
            >
              Get started in
              <span class="text-blue-500"> literally seconds</span>
            </h1>
            <p class="mt-5 font-medium text-xl">
              We've made it as easy as possible to get up and running. Just run:
            </p>
            <p
              class="
                font-mono
                text-xl
                mt-10
                font-medium
                text-gray-900 text-left
              "
            >
              <span class="text-green-300">$</span> pip install blankly
            </p>
            <p
              class="font-mono text-xl mt-1 font-medium text-gray-900 text-left"
            >
              <span class="text-green-300">$</span> blankly init binance
              <span class="text-gray-400"># or ftx, alpaca, kucoin...</span>
            </p>
            <p class="mt-10 text-xl">
              Now check out our
              <a
                href="https://docs.blankly.finance"
                target="_blank"
                class="text-green-300 font-bold"
                >documentation</a
              >
              and join our
              <a
                href="https://discord.gg/xJAjGEAXNS"
                target="_blank"
                class="text-indigo-400 font-bold"
                >discord</a
              >
              for next steps.
            </p>
          </div>
        </div>

        <OneCodebase />
        <!-- <section id="easy-finance">
          <div
            class="
              relative
              max-w-xl
              mx-auto
              px-6
              sm:px-6
              lg:max-w-7xl
              sm:mt-16
              pb-16
              lg:mt-20
              sm:pb-24
            "
          >
            <div
              class="
                lg:grid
                lg:grid-flow-row-dense
                lg:grid-cols-2
                lg:gap-12
                lg:items-center
              "
            >
              <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
                <svg
                  class="
                    absolute
                    left-1/2
                    sm:visible
                    hidden
                    transform
                    -translate-x-1/2
                    translate-y-16
                    lg:hidden
                  "
                  width="784"
                  height="404"
                  fill="none"
                  viewBox="0 0 784 404"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
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
                    width="784"
                    height="404"
                    fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)"
                  />
                </svg>
                <div id="gist-easy-deploy"></div>
              </div>
              <div class="lg:col-start-2 mt-20 sm:px-0 sm:mt-0 sm:ml-5">
                <h3
                  class="
                    text-3xl
                    font-bold
                    text-gray-900
                    tracking-tight
                    sm:text-4xl
                  "
                >
                  The algo trading workflow should be
                  <span class="text-green-300">this easy</span>
                </h3>
                <p class="mt-3 text-lg text-gray-500">
                  Accelerate development by working in an open source framework.
                  With no online IDE and the freedom to develop securely on
                  software you love, Blankly is changing the game of
                  programmatic trading. Stop developing with companies that
                  claim your ideas & software - our open source license gives
                  you complete ownership of the code you write.
                </p>
              </div>
            </div>
          </div>
         
        </section> -->
        <div class="bg-white">
          <div class="pb-12 p-16 sm:pb-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-3xl font-bold text-gray-900 sm:text-5xl">
                  Trusted by developers from all around the world
                </h2>
                <p class="mt-3 text-xl text-gray-500 sm:mt-4">
                  Whether you're building the next big algo or just dipping your
                  toes in, we got you covered. Forever.
                </p>
              </div>
            </div>
            <div class="relative mt-10">
              <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-7xl mx-auto">
                  <dl class="rounded-lg sm:grid sm:grid-cols-3">
                    <div
                      class="
                        flex flex-col
                        border-b border-gray-100
                        p-6
                        text-center
                        sm:border-0 sm:border-r
                      "
                    >
                      <dt
                        class="
                          order-2
                          mt-2
                          text-lg
                          leading-6
                          font-medium
                          text-gray-500
                        "
                      >
                        Stars
                      </dt>
                      <dd
                        class="order-1 text-5xl font-extrabold text-green-300"
                      >
                        500+
                      </dd>
                    </div>
                    <div
                      class="
                        flex flex-col
                        border-t border-b border-gray-100
                        p-6
                        text-center
                        sm:border-0 sm:border-l sm:border-r
                      "
                    >
                      <dt
                        class="
                          order-2
                          mt-2
                          text-lg
                          leading-6
                          font-medium
                          text-gray-500
                        "
                      >
                        Commits
                      </dt>
                      <dd class="order-1 text-5xl font-extrabold text-blue-500">
                        1,000+
                      </dd>
                    </div>
                    <div
                      class="
                        flex flex-col
                        border-t border-gray-100
                        p-6
                        text-center
                        sm:border-0 sm:border-l
                      "
                    >
                      <dt
                        class="
                          order-2
                          mt-2
                          text-lg
                          leading-6
                          font-medium
                          text-gray-500
                        "
                      >
                        Downloads / Month
                      </dt>
                      <dd
                        class="order-1 text-5xl font-extrabold text-indigo-500"
                      >
                        10K+
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <Testimonials />
        </div>
        <section>
          <div class="max-w-6xl mx-auto py-12 sm:px-8 sm:py-24">
            <div class="px-6 sm:px-0 text-center">
              <h2 class="text-green-300 font-bold font-mono mb-5">
                Build / Backtest / Deploy
              </h2>
              <h1 class="text-4xl font-bold sm:text-5xl">
                The Blankly Approach
              </h1>

              <a
                href="https://blankly.finance"
                target="_blank"
                class="
                  inline-flex
                  text-base
                  mt-4
                  ml-0
                  sm:ml-1
                  font-medium
                  text-blue-500
                  hover:text-blue-800
                  items-center
                "
              >
                Check out our Blankly Platform
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 inline-block ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <div class="mt-20 px-4 sm:px-0">
              <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div class="pt-6">
                  <div
                    class="flow-root bg-gray-50 border rounded-lg px-8 pb-12"
                  >
                    <div class="-mt-6">
                      <div>
                        <span
                          class="
                            inline-flex
                            items-center
                            justify-center
                            p-3
                            bg-indigo-500
                            rounded-md
                            shadow-lg
                          "
                        >
                          <!-- Heroicon name: outline/cloud-upload -->
                          <svg
                            class="h-8 w-8 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </span>
                      </div>
                      <h3
                        class="
                          mt-12
                          text-3xl
                          font-medium
                          text-indigo-500
                          tracking-tight
                        "
                      >
                        Build
                      </h3>
                      <p class="mt-5 text-base text-gray-500">
                        Build trading algorithms using a
                        <a
                          class="
                            text-blue-500
                            cursor-pointer
                            hover:text-blue-800
                          "
                          href="https://github.com/Blankly-Finance/Blankly"
                          target="_blank"
                          >package</a
                        >
                        that is actively maintained, open sourced. It takes
                        minutes to start instead of months. Backtest, paper
                        trade, and go live. Check out
                        <a
                          class="
                            text-blue-500
                            cursor-pointer
                            hover:text-blue-800
                          "
                          href="https://youtu.be/pcm0h63rhUU"
                          target="_blank"
                          >this YouTube video</a
                        >
                        of a crypto trading bot in less than 25 lines.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="pt-6">
                  <div
                    class="flow-root bg-gray-50 border rounded-lg px-6 pb-12"
                  >
                    <div class="-mt-6">
                      <div>
                        <span
                          class="
                            inline-flex
                            items-center
                            justify-center
                            p-3
                            bg-blue-500
                            rounded-md
                            shadow-lg
                          "
                        >
                          <!-- Heroicon name: outline/lock-closed -->
                          <svg
                            class="h-8 w-8 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </span>
                      </div>
                      <h3
                        class="
                          mt-12
                          text-3xl
                          font-medium
                          text-blue-500
                          tracking-tight
                        "
                      >
                        Backtest
                      </h3>
                      <p class="mt-5 text-base text-gray-500">
                        Simplify and automate the backtesting process. Leverage
                        the wealth of results to transform your algo trading
                        development. Use powerful visualization and metrics
                        across your backtests without having to change your
                        code.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="pt-6">
                  <div
                    class="flow-root bg-gray-50 border rounded-lg px-6 pb-12"
                  >
                    <div class="-mt-6">
                      <div>
                        <span
                          class="
                            inline-flex
                            items-center
                            justify-center
                            p-3
                            bg-green-300
                            rounded-md
                            shadow-lg
                          "
                        >
                          <!-- Heroicon name: outline/refresh -->
                          <svg
                            class="h-8 w-8 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                        </span>
                      </div>
                      <h3
                        class="
                          mt-12
                          text-3xl
                          font-medium
                          text-green-300
                          tracking-tight
                        "
                      >
                        Deploy
                      </h3>
                      <p class="mt-5 text-base text-gray-500">
                        Deploy live in one line using our
                        <a
                          href="https://blankly.finance"
                          target="_blank"
                          class="text-blue-500 cursor-pointer"
                          >platform</a
                        >. Manage all your deployed trading projects all in one
                        streamlined platform. Seamless cloud deployment and
                        monitoring for all your trading strategies. We integrate
                        directly with your local code and the cloud.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- <CodeShow /> -->
        <CTA />
        <FAQ />
        <br />
        <br />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script>
import { logEvent } from 'firebase/analytics'
import FAQ from '@/components/home/FAQ'
import CTA from '@/components/home/CTA'
import Footer from '@/components/Footer'
import OneCodebase from '@/components/home/OneCodebase.vue'
import Testimonials from '@/components/home/Testimonials.vue'

const communicationFeatures = []

export default {
  components: {
    FAQ,
    CTA,
    OneCodebase,
    Testimonials,
    Footer,
  },
  data() {
    return {
      communicationFeatures,
    }
  },
  methods: {
    logDiscordEvent() {
      logEvent(this.$analytics, 'join_discord')
    },
  },
}
</script>
