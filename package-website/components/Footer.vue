/* eslint-disable vue/one-component-per-file */
<template>
  <footer class="bg-gray-50 border-t" aria-labelledby="footerHeading">
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
                  text-gray-600
                  tracking-wider
                  uppercase
                "
              >
                Our Package
              </h3>
              <ul class="mt-4 space-y-4">
                <li v-for="item in navigation.solutions" :key="item.name">
                  <a
                    :href="item.href"
                    class="text-base text-gray-500 hover:text-white"
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
                  text-gray-600
                  tracking-wider
                  uppercase
                "
              >
                More
              </h3>
              <ul class="mt-4 space-y-4">
                <li v-for="item in navigation.support" :key="item.name">
                  <a
                    :href="item.href"
                    class="text-base text-gray-500 hover:text-white"
                  >
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3
                class="
                  text-sm
                  font-semibold
                  text-gray-600
                  tracking-wider
                  uppercase
                "
              >
                About Blankly
              </h3>
              <ul class="mt-4 space-y-4">
                <li v-for="item in navigation.company" :key="item.name">
                  <a
                    :href="item.href"
                    class="text-base text-gray-500 hover:text-white"
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
                  text-gray-600
                  tracking-wider
                  uppercase
                "
              >
                Legal
              </h3>
              <ul class="mt-4 space-y-4">
                <li v-for="item in navigation.legal" :key="item.name">
                  <a
                    :href="item.href"
                    class="text-base text-gray-500 hover:text-white"
                  >
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mt-8 sm:mt-8 lg:mt-4 xl:mt-0">
          <h3
            class="text-sm font-semibold text-gray-600 tracking-wider uppercase"
          >
            Subscribe to Newsletter
          </h3>
          <form
            class="xl:max-w-3xl lg:w-full mt-5 sm:flex"
            @submit.prevent="addEmail"
          >
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
      <div class="mt-8 pt-8 md:flex md:items-center md:justify-between">
        <div class="flex space-x-6 md:order-2">
          <a
            v-for="item in navigation.social"
            :key="item.name"
            :href="item.href"
            class="text-gray-600 hover:text-gray-500"
          >
            <span class="sr-only">{{ item.name }}</span>
            <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
          </a>
        </div>
        <div>
          <NuxtLink to="/">
            <span class="sr-only">Blankly</span>
            <img
              class="h-8 w-auto"
              src="~/assets/images/blankly-black.svg"
              alt=""
            />
          </NuxtLink>
          <p class="mt-8 text-base text-gray-600 md:mt-4 md:order-1">
            &copy; 2021 Blankly, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { updateWaitlist } from '@/store/waitlist.js'

const navigation = {
  solutions: [
    { name: 'Docs', href: 'https://docs.blankly.finance' },
    { name: 'Our Community', href: 'https://discord.gg/xJAjGEAXNS' },
    { name: 'The Repo', href: 'https://github.com/Blankly-Finance/Blankly' },
    {
      name: 'Release Notes',
      href: 'https://github.com/Blankly-Finance/Blankly/releases',
    },
  ],
  products: [
    { name: 'Blankly Package', href: '/' },
    { name: 'Blankly Platform', href: 'https://blankly.finance' },
    { name: 'Blankly Connect', href: 'https://blankly.finance/products/api' },
  ],
  support: [
    {
      name: 'YouTube Channel',
      href: 'https://www.youtube.com/channel/UCKAS1ATdeSLzv-ACUojwANA',
    },
    { name: 'GitHub', href: 'https://github.com/Blankly-Finance' },
    { name: 'Contact Sales', href: 'https://blankly.finance/contact-us' },
    { name: 'Status', href: 'https://status.blankly.finance' },
  ],
  company: [
    { name: 'About Us', href: 'https://blankly.finance/about' },
    { name: 'Twitter', href: 'https://twitter.com/blankly_finance' },
    { name: 'Newsletter', href: 'https://blankly.substack.com' },
    // { name: 'Jobs', href: '#' },
    // { name: 'Press', href: '#' },
  ],
  legal: [
    // { name: 'Claim', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    // { name: 'Terms', href: '#' },
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
        this.emailAdded = true
        this.notified = true
      }
    },
  },
}
</script>
