/* eslint-disable vue/one-component-per-file */
<template>
  <footer class="bg-gray-800" aria-labelledby="footerHeading">
    <h2 id="footerHeading" class="sr-only">Footer</h2>
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="grid grid-cols-2 gap-8 xl:col-span-2">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3
                class="
                  text-sm
                  font-semibold
                  text-gray-400
                  tracking-wider
                  uppercase
                "
              >
                Blankly
              </h3>
              <ul class="mt-4 space-y-4">
                <li v-for="item in navigation.solutions" :key="item.name">
                  <a
                    :href="item.href"
                    class="text-base text-gray-300 hover:text-white"
                  >
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
            <div class="mt-12 md:mt-0">
              <h3
                class="
                  text-sm
                  font-semibold
                  text-gray-400
                  tracking-wider
                  uppercase
                "
              >
                Support
              </h3>
              <ul class="mt-4 space-y-4">
                <li v-for="item in navigation.support" :key="item.name">
                  <a
                    :href="item.href"
                    class="text-base text-gray-300 hover:text-white"
                  >
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div class="mt-12 md:mt-0">
              <h3
                class="
                  text-sm
                  font-semibold
                  text-gray-400
                  tracking-wider
                  uppercase
                "
              >
                Products
              </h3>
              <ul class="mt-4 space-y-4">
                <li v-for="item in navigation.products" :key="item.name">
                  <a
                    :href="item.href"
                    class="text-base text-gray-300 hover:text-white"
                  >
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3
                class="
                  text-sm
                  font-semibold
                  text-gray-400
                  tracking-wider
                  uppercase
                "
              >
                Company
              </h3>
              <ul class="mt-4 space-y-4">
                <li v-for="item in navigation.company" :key="item.name">
                  <a
                    :href="item.href"
                    class="text-base text-gray-300 hover:text-white"
                  >
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mt-8 sm:mt-0">
          <h3
            class="text-sm font-semibold text-gray-400 tracking-wider uppercase"
          >
            Subscribe to Newsletter
          </h3>
          <form class="max-w-3xl mt-5 sm:flex" @submit.prevent="addEmail">
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
                focus:ring-gray-500 focus:border-gray-500
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
                bg-gray-900
                shadow-sm
                hover:bg-black
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-gray-500
                sm:mt-0
                sm:ml-5
                sm:flex-shrink-0
                sm:inline-flex
                sm:items-center
                sm:w-auto
              "
            >
              Subscribe
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
              Subscribed
            </div>
          </form>
          <a
            href="https://discord.gg/xJAjGEAXNS"
            target="_blank"
            class="
              inline-flex
              items-center
              justify-center
              w-full
              mt-4
              px-4
              py-2
              border border-transparent
              text-base
              font-bold
              rounded
              text-white
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
        </div>
      </div>
      <div
        class="
          mt-8
          border-t border-gray-700
          pt-8
          md:flex md:items-center md:justify-between
        "
      >
        <div class="flex space-x-6 md:order-2">
          <a
            v-for="item in navigation.social"
            :key="item.name"
            :href="item.href"
            class="text-gray-400 hover:text-gray-300"
          >
            <span class="sr-only">{{ item.name }}</span>
            <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
          </a>
        </div>
        <div class="mt-8 text-base text-gray-500 md:mt-0 md:order-1">
          <a href="/">
            <span class="sr-only">Blankly</span>
            <img
              class="h-8 w-auto"
              src="~/assets/images/white-logo.svg"
              alt=""
            />
          </a>
          <div class="flex mt-3 items-center space-x-2">
            <a
              target="_blank"
              href="https://twitter.com/blanklyfinance"
              class="h-5 w-5 flex"
            >
              <img
                class="text-white"
                src="~/assets/images/twitter-white.svg"
                alt=""
              />
            </a>
            <a
              target="_blank"
              href="https://github.com/blankly-financedis"
              class="h-5 w-5 flex -mt-1 text-white"
            >
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
              >
                <path
                  d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"
                />
              </svg>
            </a>
            <a
              target="_blank"
              href="https://discord.gg/xJAjGEAXNS"
              class="h-5 w-5 flex"
            >
              <img
                class="text-white"
                src="~/assets/images/discord-white.svg"
                alt=""
              />
            </a>
            <a
              target="_blank"
              href="https://medium.com/@blankly"
              class="h-5 w-5 flex text-white"
            >
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
              >
                <path
                  d="M8.5 7A8.5 8.5 0 108.5 24 8.5 8.5 0 108.5 7zM22 8A4 7.5 0 1022 23 4 7.5 0 1022 8zM28.5 9A1.5 6.5 0 1028.5 22 1.5 6.5 0 1028.5 9z"
                />
              </svg>
            </a>
          </div>
          <p class="mt-8 text-sm md:mt-12 md:order-1">
            &copy; 2022 Blankly Finance, Inc. All rights reserved.
          </p>
          <p class="text-xs mt-5">
            Blankly Finance, Inc. does not recommend any securities or other
            investment decisions of any type. We are a software company, and we
            are not engaged in the business of buying, promoting, or selling
            securities of any type. You accept all the risks associated with
            your use of our tools as you conceive, design, make, and implement
            your own personal investment decisions.
          </p>
          <p class="text-xs mt-2">
            Hypothetical performance results have inherent limitations and
            should only be considered as a guide to a possible outcome. No
            representation is made that using our tools or any content on this
            website will or is likely to achieve profits or losses like those
            that result from any testing or hypothetical exercises using our
            tools. Hypothetical trading does not involve risk. There may be
            significant differences between hypothetical performance results and
            actual results. No hypothetical trading can completely account for
            the impact of financial risk in actual trading.
          </p>
          <p class="text-xs mt-2">
            Our content is provided for general informational purposes only. It
            is not intended to constitute investment or trading advice or any
            other kind of professional advice and should not be relied upon as
            such. Before acting based on any such information or the utilization
            of the algorithms you develop using our tools, we encourage you to
            consult with the appropriate professionals. We do not endorse any
            third parties referenced on this website.
          </p>
          <p class="text-xs mt-2">
            Market and economic views are subject to change without notice and
            may be untimely when presented here. Do not infer or assume that any
            securities, sectors, or markets described on this website were or
            will be profitable. Past performance is no guarantee of future
            results. There is a possibility of loss. Historical or hypothetical
            performance results are presented for illustrative purposes only. If
            you invest you should be aware that system response, execution
            price, speed, liquidity, market data, and account access times are
            affected by many factors, including market volatility, size and type
            of order, market conditions, system performance, and other factors.
            These risks are to be assumed by the customer.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { logEvent } from 'firebase/analytics'
import { updateWaitlist } from '@/store/waitlist.js'

const navigation = {
  solutions: [
    { name: 'Why Blankly?', href: '/why-us' },
    { name: 'Our Community', href: 'https://discord.gg/xJAjGEAXNS' },
    {
      name: 'The GitHub Repo',
      href: 'https://github.com/Blankly-Finance/Blankly',
    },
  ],
  products: [
    { name: 'Blankly Package', href: 'https://package.blankly.finance' },
    { name: 'Blankly Platform', href: '/' },
    { name: 'Blankly Connect', href: '/products/api' },
  ],
  support: [
    { name: 'Documentation', href: 'https://docs.blankly.finance' },
    { name: 'Status', href: 'https://status.blankly.finance' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'Privacy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms' },
  ],
  company: [
    { name: 'About', href: 'https://blankly.finance/about' },
    { name: 'Blog', href: 'https://blankly.finance/blog' },
    {
      name: 'Jobs',
      href: 'https://blankly.notion.site/Blankly-is-Hiring-8c285b9b0a9348cab67953fd7a7321fc',
    },
    // { name: 'Press', href: '#' },
  ],
}

export default {
  data() {
    return {
      navigation,
      emailStr: '',
      emailAdded: false,
      notified: false,
    }
  },
  methods: {
    async addEmail() {
      if (this.emailStr.length > 0) {
        await updateWaitlist('footer', this.emailStr, this.$db)
        logEvent(this.$analytics, 'waitlist_signup')
        this.emailAdded = true
        this.notified = true
      }
    },
    logDiscordEvent() {
      logEvent(this.$analytics, 'join_discord')
    },
  },
}
</script>
