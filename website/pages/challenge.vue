<template>
  <div class="h-screen overflow-hidden">
    <header class="relative pb-40 bg-light-blue-800 sm:pb-40">
      <div class="absolute h-screen inset-0">
        <img
          class="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1559242550-bdfaa5081d95?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1960&q=80"
          alt=""
        />
      </div>
      <div class="bg-black bg-gradient-to-t pt-2">
        <NavBar />
      </div>
      <div
        class="
          relative
          mt-24
          max-w-md
          mx-auto
          px-4
          sm:max-w-3xl sm:mt-24 sm:px-6
          lg:max-w-7xl lg:px-8
        "
      >
        <h1
          class="
            font-extrabold
            tracking-tight
            max-w-xl
            text-white
            sm:text-6xl
            lg:text-8xl
          "
        >
          The <span class="text-green-300">Blankly Challenge</span>
        </h1>
        <p class="mt-6 text-xl text-white max-w-3xl">
          Want to join the team? It's simple and straightforward: do the
          challenge and submit your code. We're looking for the best and
          brightest developers out there to join our mission.
        </p>
        <form class="max-w-3xl mt-10 sm:flex" @submit.prevent="addEmail">
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
              bg-gray-800
              shadow-sm
              hover:bg-gray-900
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
            Start the Challenge
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
            Challenge Started
          </div>
        </form>
        <SuccessAlert
          v-if="emailAdded && notified"
          message="Awesome. Your challenge has started! Link if Popup Doesn't Work: https://forms.gle/Jo3CK9SCkMywqkq6A"
          @dismiss="notified = false"
        />
      </div>
    </header>
  </div>
</template>
<script>
import { updateWaitlist, addChallenge } from '@/store/waitlist.js'

import SuccessAlert from '@/components/SuccessAlert.vue'

export default {
  components: {
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
      title: 'The Blankly Challenge',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "Want to join the team? It's simple and straightforward: do the challenge within 3 hours, submit your code, and get an interview.",
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Blankly Mission Accessible Quant Challenge Algorithmic Trading',
        },
      ],
    }
  },
  methods: {
    async addEmail() {
      if (this.emailStr.length > 0) {
        await addChallenge(this.emailStr, this.$db)
        await updateWaitlist('challenge', this.emailStr, this.$db)
        this.emailAdded = true
        this.notified = true
        window.open('https://forms.gle/Jo3CK9SCkMywqkq6A', '_blank').focus()
      }
    },
  },
}
</script>
