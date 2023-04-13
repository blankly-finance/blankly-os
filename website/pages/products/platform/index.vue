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
            lg:px-8 lg:max-w-7xl
          "
        >
          <div>
            <div class="mt-8">
              <div class="mt-6 text-center">
                <h1
                  class="
                    font-extrabold
                    text-indigo-500
                    tracking-tight
                    text-7xl
                    sm:text-9xl
                  "
                >
                  Build.
                </h1>
                <h1
                  class="
                    text-7xl
                    font-extrabold
                    text-blue-500
                    tracking-tight
                    sm:text-9xl
                  "
                >
                  Backtest.
                </h1>
                <h1
                  class="
                    text-7xl
                    font-extrabold
                    text-green-300
                    tracking-tight
                    sm:text-9xl
                  "
                >
                  Deploy.
                </h1>
              </div>
              <div class="rounded-md bg-indigo-500 p-4 max-w-xl mx-auto mt-16">
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
                      Check out our early platform demo now!
                    </p>
                    <p>
                      <a
                        href="https://www.loom.com/share/bf64665a38d1469d9760a5120e0a149e"
                        target="_blank"
                        class="
                          whitespace-nowrap
                          block
                          font-medium
                          text-sm
                          sm:text-base
                          text-white
                          hover:text-gray-200
                        "
                        >View Demo <span aria-hidden="true">&rarr;</span></a
                      >
                    </p>
                  </div>
                </div>
              </div>
              <form
                class="mt-8 mx-auto sm:max-w-lg sm:w-full sm:flex"
                @submit.prevent="addEmail"
              >
                <div class="min-w-0 flex-1">
                  <label for="hero-email" class="sr-only">Email address</label>
                  <input
                    id="hero-email"
                    v-model.trim="emailStr"
                    type="email"
                    :disabled="emailAdded"
                    name="email"
                    class="
                      block
                      w-full
                      border border-gray-300
                      rounded-md
                      px-5
                      py-3
                      text-base text-gray-900
                      placeholder-gray-500
                      shadow-sm
                      focus:border-gray-500 focus:ring-gray-500
                    "
                    placeholder="Enter your email"
                  />
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-3">
                  <button
                    v-if="!emailAdded"
                    type="submit"
                    class="
                      block
                      w-full
                      rounded-md
                      border border-transparent
                      px-5
                      py-3
                      bg-gray-900
                      text-base
                      font-medium
                      text-white
                      shadow
                      hover:bg-black
                      focus:outline-none
                      focus:ring-2
                      focus:ring-gray-500
                      focus:ring-offset-2
                      sm:px-10
                    "
                  >
                    Join Waitlist
                  </button>

                  <div
                    v-else
                    class="
                      block
                      w-full
                      rounded-md
                      border border-transparent
                      px-5
                      py-3
                      bg-green-400
                      text-base
                      cursor-not-allowed
                      font-medium
                      text-white
                      sm:px-10
                    "
                  >
                    You're added!
                  </div>
                </div>
              </form>
              <SuccessAlert
                v-if="emailAdded && notified"
                message="You Have Successfully Joined Waitlist 🎉. Welcome to Blankly 🚀"
                @dismiss="notified = false"
              />
              <p
                class="mt-12 max-w-xl mx-auto text-center text-xl text-gray-500"
              >
                Build in minutes. Deploy in seconds. Quant workflow reimagined.
                Built by developers for developers 🚀
              </p>
            </div>
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
      title: 'Build. Backtest. Deploy | Blankly Platform',
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: 'Build. Backtest. Deploy | Blankly Platform',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: 'Build. Backtest. Deploy | Blankly Platform',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: 'Build. Backtest. Deploy | Blankly Platform',
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
          content: 'Build. Backtest. Deploy | Blankly Platform',
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
