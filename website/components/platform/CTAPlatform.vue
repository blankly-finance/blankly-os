<template>
  <div class="bg-white pb-10">
    <div class="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      <h2
        class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
      >
        <span class="block"
          >Ready to <span class="text-green-300">dive in?</span></span
        >
        <span class="block">We're now in open beta! So try it out now!</span>
      </h2>
      <div class="mt-12 max-w-xs mx-auto flex justify-center">
        <a
          href="https://github.com/blankly-finance"
          class="
            block
            rounded-md
            flex-1
            border border-transparent
            px-5
            py-3
            bg-gray-900
            text-base
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
          Download the package <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { logEvent } from 'firebase/analytics'
import { updateWaitlist } from '@/store/waitlist.js'

export default {
  data() {
    return {
      emailStr: '',
      emailAdded: false,
      notified: false,
    }
  },
  methods: {
    async addEmail() {
      if (this.emailStr.length) {
        await updateWaitlist('platform', this.emailStr, this.$db)
        logEvent(this.$analytics, 'waitlist_signup')
        this.emailAdded = true
        this.notified = true
      }
    },
  },
}
</script>
