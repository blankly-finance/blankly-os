<template>
  <div>
    <nav
      class="
        relative
        max-w-7xl
        pt-10
        mx-auto
        flex
        items-center
        justify-between
        px-4
        sm:px-6
      "
      aria-label="Global"
    >
      <div class="flex items-center flex-1">
        <div class="flex items-center justify-between w-full md:w-auto">
          <NuxtLink to="/">
            <span class="sr-only">Blankly</span>
            <img
              class="h-8 w-auto sm:h-10"
              src="~/assets/images/white-logo.svg"
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
                hover:text-white hover:bg-gray-700
                focus:outline-none focus:bg-gray-700 focus:text-white
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
              class="text-base font-medium text-white hover:text-gray-300"
              >{{ item.name }}</NuxtLink
            >
            <a
              v-if="item.name === 'The Package'"
              :href="item.href"
              target="_blank"
              class="text-base flex font-medium text-white hover:text-gray-300"
              ><span v-if="item.name === 'The Package'" class="mr-2 text-white"
                ><svg
                  fill="#FFFFFF"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24px"
                  height="24px"
                >
                  <path
                    d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"
                  /></svg></span
              >{{ item.name }}</a
            >
            <a
              v-if="item.external && item.name !== 'The Package'"
              :href="item.href"
              target="_blank"
              class="text-base font-medium text-white hover:text-gray-300"
              >{{ item.name }}</a
            >
          </div>
        </div>
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
          bg-gray-900
          rounded-md
          mx-4
          mt-4
          flex flex-col
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
                font-medium
                text-white
                flex
                hover:bg-black
              "
              ><span v-if="item.name === 'The Package'" class="mr-2">
                <svg
                  fill="#FFFFFF"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24px"
                  height="24px"
                >
                  <path
                    d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"
                  /></svg></span
              >{{ item.name }}</a
            >
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
const navigation = [
  {
    name: 'The Package',
    href: 'https://github.com/Blankly-Finance/Blankly',
    product: true,
    external: true,
  },
  {
    name: 'Blankly Platform',
    href: '/products/platform',
    product: true,
    external: false,
  },
  {
    name: 'Blankly Connect',
    href: '/products/api',
    product: true,
    external: false,
  },
  { name: 'Blog', href: '/blog', external: false },
  { name: 'About Us', href: '/about', external: false },
  // { name: 'Contact Us', href: '/contact-us', external: false },
]
export default {
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
