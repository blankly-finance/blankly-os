<template>
  <header class="bg-white">
    <div class="relative bg-gray-50 border-b">
      <div class="max-w-7xl mx-auto py-4 px-3 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <p
            class="
              font-medium
              text-black text-sm
              sm:text-base
              flex
              items-center
            "
          >
            <img src="~/assets/images/package-icon.svg" class="w-8 h-8 mr-3" />
            <span class="font-bold mr-5"> Blankly Package </span>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=Blankly-Finance&repo=Blankly&type=star&count=true"
              frameborder="0"
              scrolling="0"
              class="hidden sm:block"
              width="100"
              height="20"
              title="GitHub"
            ></iframe>
          </p>
          <span class="block sm:ml-2 sm:inline-block">
            <a
              href="https://package.blankly.finance"
              target="_blank"
              class="text-black text-sm sm:text-base font-semibold"
            >
              Build trading algorithms for any asset
              <span aria-hidden="true">&rarr;</span></a
            >
          </span>
        </div>
      </div>
    </div>
    <div
      class="
        max-w-7xl
        mx-auto
        px-4
        sm:px-4
        lg:divide-y lg:divide-gray-200 lg:px-8
      "
    >
      <nav
        class="
          relative
          max-w-7xl
          pt-8
          pb-4
          mx-auto
          flex
          items-center
          justify-between
        "
        aria-label="Global"
      >
        <div class="flex items-center flex-1">
          <div class="flex items-center justify-between w-full md:w-auto">
            <NuxtLink to="/">
              <span class="sr-only">Blankly</span>
              <img
                class="h-8 w-auto sm:h-10"
                src="~/assets/images/blankly-black.svg"
                alt=""
              />
            </NuxtLink>
            <div class="-mr-2 flex items-center md:hidden">
              <button
                class="
                  inline-flex
                  items-center
                  justify-center
                  p-2
                  rounded-md
                  text-gray-400
                  hover:text-gray-900 hover:bg-gray-200
                  focus:outline-none focus:bg-gray-200 focus:text-gray-900
                "
                @click="toggle"
              >
                <svg
                  :class="[isOpen ? 'hidden' : 'block', 'h-6 w-6']"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                <svg
                  :class="[isOpen ? 'block' : 'hidden', 'h-6 w-6']"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="hidden md:flex md:items-center md:space-x-6">
          <div class="hidden space-x-8 md:flex md:ml-10 mr-4">
            <div v-for="item in navigation" :key="item.name">
              <NuxtLink
                v-if="!item.external"
                :to="item.href"
                class="text-base font-medium text-gray-900 hover:text-gray-500"
                >{{ item.name }}</NuxtLink
              >
              <a
                v-if="item.external"
                :href="item.href"
                target="_blank"
                class="text-base font-medium text-gray-900 hover:text-gray-500"
                >{{ item.name }}</a
              >
            </div>
          </div>

          <a
            href="https://github.com/blankly-finance"
            target="_blank"
            class="
              inline-flex
              items-center
              px-4
              py-2
              border border-transparent
              text-base
              rounded
              font-medium
              shadow-xl
              text-white
              bg-gray-900
              hover:bg-gray-700
            "
          >
            Download the package
            <span class="ml-2" aria-hidden="true">&rarr;</span>
          </a>
          <a
            target="_blank"
            href="https://twitter.com/blanklyfinance"
            class="h-5 w-5 flex"
          >
            <img src="~/assets/images/twitter.svg" alt="" />
          </a>
        </div>
      </nav>
      <transition
        enter-active-class="duration-150 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="duration-100 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-show="isOpen"
          class="
            flex flex-col
            bg-gray-50
            rounded-lg
            align-center
            overflow-hidden
          "
        >
          <div class="pt-5 pb-6">
            <div class="px-2 space-y-1">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                class="
                  block
                  px-3
                  py-2
                  rounded-md
                  text-base
                  flex
                  font-medium
                  text-gray-900
                  hover:bg-gray-200
                "
              >
                {{ item.name }}</a
              >
            </div>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
const navigation = [
  {
    name: 'Home',
    href: '/',
    product: true,
    external: false,
  },
  {
    name: 'Why Us?',
    href: '/why-us',
    product: true,
    external: false,
  },
  { name: 'About Us', href: '/about', external: false },
  { name: 'Contact', href: '/about', external: false },
  { name: 'Blog', href: '/blog', external: false },
  // { name: 'Contact Us', href: '/contact-us', external: false },
]

export default {
  props: {
    name: {
      default: 'Product',
      type: String,
    },
    // eslint-disable-next-line vue/require-default-prop
    tab: String,
    // eslint-disable-next-line vue/require-default-prop
    product: String,
    showSub: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      navigation,
      isOpen: false,
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>
