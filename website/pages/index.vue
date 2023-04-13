<template>
  <div>
    <WhiteNavBar name="Blankly Platform" tab="overview" product="platform" />
    <div class="bg-white px-4 sm:px-0">
      <div class="overflow-hidden lg:relative">
        <div
          class="
            mx-auto
            max-w-md
            px-4
            mt-20
            sm:max-w-3xl sm:px-6
            grid
            lg:grid-cols-2 lg:px-8 lg:max-w-7xl
            sm:grid-cols-1
          "
        >
          <div>
            <div class="mt-8">
              <div class="lg:text-left text-center">
                <h1
                  class="
                    text-6xl
                    font-extrabold
                    text-gray-900
                    tracking-tight
                    lg:text-7xl
                    sm:text-7xl
                  "
                >
                  <!-- <div class="slider">
                    <div class="slider-text1">
                      <span class="text-blue-500">Deploy</span> your next
                      trading idea.
                    </div>
                    <div class="slider-text2">
                      <span class="text-green-300">Backtest</span> your next
                      trading idea.
                    </div>
                    <div class="slider-text3">
                      <span class="text-indigo-500">Build</span> your next
                      trading idea.
                    </div>
                  </div> -->
                  Build and deploy your next trading algorithm
                </h1>
                <p
                  class="
                    mt-12
                    max-w-xl
                    mx-auto
                    lg:mx-0 lg:text-left
                    text-center text-xl text-gray-600
                    font-medium
                  "
                >
                  Go from trading idea, to paper trading, to live all in one
                  place. Algotrading without the Headache 🚀
                </p>
              </div>
              <div
                class="
                  rounded-md
                  bg-blue-500
                  p-4
                  max-w-lg
                  lg:mx-0
                  mx-auto
                  mt-16
                "
              >
                <div class="flex items-center">
                  <div class="block flex-shrink-0">🎉</div>
                  <div class="sm:ml-3 flex-1 items-center flex justify-between">
                    <p
                      class="
                        text-sm
                        md:text-base
                        ml-4
                        font-medium
                        sm:ml-4
                        text-white
                      "
                    >
                      We're going completely open source!
                    </p>
                    <p>
                      <a
                        href="https://github.com/blankly-finance"
                        class="
                          whitespace-nowrap
                          block
                          font-medium
                          text-sm
                          sm:text-base
                          text-white
                          hover:text-gray-200
                        "
                        >See the repo <span aria-hidden="true">&rarr;</span></a
                      >
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col md:flex-row mt-5 md:space-x-4 max-w-lg">
                <a
                  href="https://discord.gg/xJAjGEAXNS"
                  target="_blank"
                  class="
                    inline-flex
                    items-center
                    px-4
                    py-2
                    border border-transparent
                    text-base
                    font-bold
                    rounded
                    text-white
                    justify-center
                    bg-indigo-400
                    hover:bg-indigo-500
                  "
                  @click="logDiscordEvent"
                >
                  Join Our Discord
                  <img
                    class="h-4 ml-4"
                    src="~/assets/images/logos/discord.svg"
                    alt="Discord"
                  />
                </a>
                <a
                  href="https://docs.blankly.finance/getting-started/tutorial"
                  class="
                    block
                    mt-3
                    md:mt-0
                    rounded-md
                    flex-1
                    border border-transparent
                    px-5
                    py-3
                    bg-gray-900
                    text-base text-center
                    font-medium
                    text-white
                    shadow-xl
                    hover:bg-black
                    focus:outline-none
                    focus:ring-2
                    focus:ring-gray-500
                    focus:ring-offset-2
                    sm:px-10
                  "
                >
                  Download the package<span aria-hidden="true" class="ml-1"
                    >&rarr;</span
                  >
                </a>
              </div>
              <SuccessAlert
                v-if="emailAdded && notified"
                message="You Have Successfully Joined Waitlist 🎉. Welcome to Blankly 🚀"
                @dismiss="notified = false"
              />
              <div class="mt-8 max-w-lg flex items-start">
                <h1 class="text-sm text-gray-500 w-full">
                  Blankly follows industry standards:
                  <span class="font-semibold">self host or host on premise</span
                  >. No middlemen to slow your alpha.
                </h1>
              </div>
            </div>
          </div>
          <div class="text-left -ml-12 mt-5">
            <img
              width="850"
              class="max-w-none mt-5 hidden md:block"
              src="~/assets/images/image.png"
            />
            <img
              width="850"
              class="md:hidden ml-5 mt-10"
              src="~/assets/images/image.png"
            />
          </div>
        </div>
      </div>
      <div class="py-20">
        <hr class="max-w-4xl mx-auto rounded" />
      </div>
      <div class="text-center mt-12">
        <h1 class="text-md uppercase font-bold">
          Discover The Blankly Approach
        </h1>
      </div>
      <Build />
      <hr class="max-w-3xl mx-auto py-10 mt-12" />
      <Backtest />
      <hr class="max-w-3xl mx-auto py-10 mt-12" />
      <Deploy />
      <hr class="max-w-3xl mx-auto pt-20 mt-12" />
      <CTAPlatform />
      <div class="mb-20"></div>
    </div>
    <!-- <Stats /> -->
    <Footer />
  </div>
</template>

<script>
import { logEvent } from 'firebase/analytics'
import WhiteNavBar from '@/components/WhiteNavBar.vue'
import Build from '@/components/platform/Build.vue'
import Backtest from '@/components/platform/Backtest.vue'
import Deploy from '@/components/platform/Deploy.vue'
// import Stats from '@/components/platform/Stats.vue'
import Footer from '@/components/Footer.vue'
import CTAPlatform from '@/components/platform/CTAPlatform.vue'
import { updateWaitlist } from '@/store/waitlist.js'
import SuccessAlert from '@/components/SuccessAlert.vue'
export default {
  components: {
    WhiteNavBar,
    Build,
    Backtest,
    Deploy,
    // Stats,
    Footer,
    CTAPlatform,
    SuccessAlert,
  },
  data() {
    return {
      emailStr: '',
      emailAdded: false,
      notified: false,
    }
  },
  head() {
    return {
      title: 'Blankly - Build & Deploy Trading Algorithms Faster',
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: 'Blankly - Build & Deploy Trading Algorithms Faster',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: 'Blankly - Build & Deploy Trading Algorithms Faster',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: 'Blankly - Build & Deploy Trading Algorithms Faster',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content:
            'Build in minutes. Deploy in seconds. Quant workflow reimagined. Built by developers for developers 🚀',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'Build in minutes. Deploy in seconds. Quant workflow reimagined. Built by developers for developers 🚀',
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
          content: 'Blankly - Build & Deploy Trading Algorithms Faster',
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
            'Build in minutes. Deploy in seconds. Quant workflow reimagined. Built by developers for developers 🚀',
        },
      ],
    }
  },
  methods: {
    async addEmail() {
      if (this.emailStr.length > 0) {
        await updateWaitlist('platform', this.emailStr, this.$db)
        logEvent(this.$analytics, 'waitlist_signup')
        this.emailAdded = true
        this.notified = true
      }
    },
  },
}
</script>
<style>
.slider-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.slider {
  height: 150px;
  overflow: hidden;
}
.slider div {
  height: 200px;
  box-sizing: border-box;
}
.slider-text1 {
  animation: slide 10s linear infinite;
}

@keyframes slide {
  0% {
    margin-top: -600px;
  }
  5% {
    margin-top: -400px;
  }
  33% {
    margin-top: -400px;
  }
  38% {
    margin-top: -200px;
  }
  66% {
    margin-top: -200px;
  }
  71% {
    margin-top: 0px;
  }
  100% {
    margin-top: 0px;
  }
}
</style>
