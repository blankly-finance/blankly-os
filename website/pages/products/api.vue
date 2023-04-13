<template>
  <div>
    <WhiteNavBar name="Blankly Connect" product="api" />
    <main class="mt-10 mx-auto sm:px-0 sm:mt-24 lg:mt-16">
      <div class="mx-auto max-w-7xl sm:px-0 px-4 lg:gap-8">
        <div class="text-center md:mx-auto lg:text-center">
          <span
            class="
              block
              text-sm
              font-semibold
              uppercase
              tracking-wide
              text-gray-500
              sm:text-base
              lg:text-sm
              xl:text-base
            "
            >Coming soon for Trading Apps and Enterprise</span
          >
          <h1 class="text-center flex justify-center">
            <span
              class="
                sm:mt-1
                mt-10
                block
                text-5xl
                tracking-tight
                font-extrabold
                sm:text-7xl
                xl:text-8xl
              "
            >
              <span class="block text-gray-900">One API for your </span>
              <VueTypedJs
                :strings="['brokerages', 'accounts', 'exchanges']"
                :loop="true"
                :type-speed="50"
                :back-speed="60"
                :show-cursor="false"
              >
                <span
                  style="min-height: 100px"
                  class="typing mx-auto block min-h-5 text-green-300"
                ></span>
              </VueTypedJs>
            </span>
          </h1>
          <p
            class="
              mt-3
              text-base text-gray-500
              sm:mt-5
              max-w-xl
              mx-auto
              sm:text-xl
              lg:text-lg
              xl:text-xl
            "
          >
            Blankly is the single source to connect, unify, and trade across all
            exchanges. One API to rule them all 👑.
          </p>
          <div class="mt-8 sm:mx-auto max-w-xl mx-auto sm:text-center">
            <p class="text-base font-medium text-gray-900">
              Building a trading app or platform? Join the waitlist.
            </p>
            <form class="mt-3 sm:flex" @submit.prevent="addEmail">
              <label for="email" class="sr-only">Email</label>
              <input
                id="email"
                v-model="emailStr"
                type="email"
                :disabled="emailAdded"
                name="email"
                class="
                  block
                  w-full
                  py-3
                  text-base
                  rounded-md
                  placeholder-gray-500
                  shadow-sm
                  focus:ring-gray-500
                  focus:border-gray-500
                  sm:flex-1
                  border-gray-300
                "
                placeholder="Enter your email"
              />
              <button
                v-if="!emailAdded"
                type="submit"
                class="
                  mt-3
                  w-full
                  px-6
                  py-3
                  border border-transparent
                  text-base
                  font-medium
                  rounded-md
                  text-white
                  bg-gray-800
                  shadow-sm
                  hover:bg-gray-900
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                  sm:mt-0
                  sm:ml-3
                  sm:flex-shrink-0
                  sm:inline-flex
                  sm:items-center
                  sm:w-auto
                "
              >
                Join Waitlist
              </button>
              <div
                v-else
                class="
                  mt-3
                  w-full
                  px-6
                  py-3
                  border border-transparent
                  text-base
                  font-medium
                  cursor-not-allowed
                  rounded-md
                  text-white
                  bg-green-400
                  sm:mt-0
                  sm:ml-3
                  sm:flex-shrink-0
                  sm:inline-flex
                  sm:items-center
                  sm:w-auto
                "
              >
                You're added!
              </div>
            </form>
            <SuccessAlert
              v-if="emailAdded && notified"
              message="You Have Successfully Joined Waitlist 🎉. Welcome to Blankly 🚀"
              @dismiss="notified = false"
            />
          </div>
        </div>
      </div>
      <div class="max-w-4xl py-20 px-4 sm:px-0 mx-auto">
        <hr />
      </div>
      <div
        class="relative mx-auto text-center px-4 sm:px-0 max-w-7xl rounded-lg"
      >
        <img
          class="mx-auto sm:w-1/2 w-full"
          src="~/assets/images/api/blankly-api-main.svg"
          alt=""
        />
      </div>
      <div>
        <Problems />
      </div>
      <div>
        <Solution />
        <div class="bg-white py-10 sm:py-0">
          <h1 class="text-gray-600 text-md uppercase font-bold text-center">
            We're working on connecting with over 15+ Exchanges, Wallets, and
            Brokerages
          </h1>
          <div class="mx-auto max-w-7xl py-12">
            <div
              class="
                flex
                mx-auto
                items-center
                justify-center
                self-center
                space-x-6
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
            </div>
          </div>
        </div>
      </div>
      <div class="py-24 bg-black mx-auto text-center">
        <div class="pb-16 text-center hidden md:block">
          <h2 class="font-extrabold text-white text-3xl sm:text-5xl">
            See the <span class="text-green-300">Code in Action</span>
          </h2>
          <p class="mt-3 text-lg mx-auto px-4 sm:px-0 max-w-xl text-white">
            With varying APIs, different auth flows, and complicated
            maintenance. It's a whole mess to keep your dev stack up to date.
          </p>
        </div>

        <div
          class="
            relative
            mx-4
            hidden
            md:block
            sm:mx-auto
            max-w-4xl
            border-2 border-gray-500
            rounded-lg
          "
        >
          <img
            class="w-full"
            src="~/assets/images/api/integrations.js.svg"
            alt=""
          />
        </div>
      </div>
      <div class="relative bg-black">
        <div class="relative max-w-4xl pb-24 mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2
              class="
                text-base
                font-semibold
                uppercase
                tracking-wider
                text-gray-300
              "
            >
              Excited About This?
            </h2>
            <p
              class="
                mt-2
                text-white text-3xl
                font-extrabold
                tracking-tight
                sm:text-4xl
              "
            >
              Let's work together
            </p>
            <p class="mt-3 text-lg text-gray-300">
              We're excited to hear what you're building and would love to talk
              more with you and your idea.
            </p>
            <div class="mt-8">
              <form class="mt-3 sm:flex" @submit.prevent="addEmail">
                <label for="email" class="sr-only">Email</label>
                <input
                  id="email"
                  v-model="emailStr"
                  type="email"
                  name="email"
                  :disabled="emailAdded"
                  class="
                    block
                    sm:w-2/3
                    w-full
                    ml-0
                    sm:ml-3
                    py-3
                    text-base
                    rounded-md
                    placeholder-gray-500
                    shadow-sm
                    focus:ring-green-500
                    focus:border-green-500
                    sm:flex-1
                    border-gray-300
                  "
                  placeholder="Enter your email"
                />
                <button
                  v-if="!emailAdded"
                  class="
                    mt-3
                    w-full
                    px-6
                    py-3
                    border border-transparent
                    text-base
                    font-medium
                    rounded-md
                    text-white
                    bg-gray-800
                    shadow-sm
                    hover:bg-gray-900
                    focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                    sm:mt-0
                    sm:ml-3
                    sm:flex-shrink-0
                    sm:inline-flex
                    sm:items-center
                    sm:w-auto
                  "
                >
                  Join Waitlist
                </button>
                <div
                  v-else
                  class="
                    mt-3
                    w-full
                    px-6
                    py-3
                    border border-transparent
                    text-base
                    font-medium
                    rounded-md
                    text-white
                    cursor-not-allowed
                    bg-green-400
                    sm:mt-0
                    sm:ml-3
                    sm:flex-shrink-0
                    sm:inline-flex
                    sm:items-center
                    sm:w-auto
                  "
                >
                  You're added!
                </div>
              </form>
              <SuccessAlert
                v-if="emailAdded && notified"
                message="You Have Successfully Joined Waitlist 🎉. Welcome to Blankly 🚀"
                @dismiss="notified = false"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
<script>
import { logEvent } from 'firebase/analytics'
import WhiteNavBar from '@/components/WhiteNavBar.vue'
import Problems from '@/components/api/Problems.vue'
import Solution from '@/components/api/Solution.vue'
import { VueTypedJs } from 'vue-typed-js'
import Footer from '@/components/Footer.vue'
import SuccessAlert from '@/components/SuccessAlert.vue'
import { updateWaitlist } from '@/store/waitlist.js'

export default {
  components: {
    WhiteNavBar,
    Problems,
    Solution,
    Footer,
    VueTypedJs,
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
      title: 'Blankly Connect | One API for Trading',
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: 'Blankly Connect | One API for Trading',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Blankly Connect | One API for Trading',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Blankly Connect | One API for Trading',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'Blankly is the single source to connect, unify, and trade across all exchanges. One API to rule them all 👑.',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content:
            'Blankly is the single source to connect, unify, and trade across all exchanges. One API to rule them all 👑.',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Blankly is the single source to connect, unify, and trade across all exchanges. One API to rule them all 👑.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'API Unification Trading Exchanges Brokerages Wallets Unify Transfer',
        },
        {
          hid: 'image',
          name: 'image',
          content: 'https://blankly.finance/connect.png',
        },
        {
          hid: 'og:image',
          name: 'og:image',
          property: 'og:image',
          content: 'https://blankly.finance/connect.png',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://blankly.finance/connect.png',
        },
      ],
    }
  },
  methods: {
    async addEmail() {
      if (this.emailStr.length > 0) {
        await updateWaitlist('connect', this.emailStr, this.$db)
        this.emailAdded = true
        logEvent(this.$analytics, 'waitlist_signup')
        this.notified = true
      }
    },
  },
}
</script>
