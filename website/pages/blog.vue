<template>
  <div>
    <header class="relative pb-28 bg-light-blue-800 sm:pb-28">
      <div class="absolute inset-0">
        <img
          class="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
        <div
          class="
            absolute
            inset-0
            bg-gradient-to-r
            from-gray-600
            to-gray-900
            mix-blend-multiply
          "
          aria-hidden="true"
        />
      </div>
      <div class="bg-transparent bg-gradient-to-t pt-2 relative">
        <NavBar />
      </div>
      <div
        class="
          relative
          mt-24
          max-w-md
          mx-auto
          px-6
          sm:max-w-3xl sm:mt-32
          lg:max-w-7xl lg:px-8
        "
      >
        <h1
          class="
            font-extrabold
            tracking-tight
            text-white text-4xl
            sm:text-5xl
            lg:text-7xl
          "
        >
          The Blankly Blog
        </h1>
        <p class="mt-6 text-xl text-white max-w-3xl">
          We're constantly writing content about the quant space, Blankly
          tutorials, and much much more! Subscribe today and get everything
          Quant.
        </p>
      </div>
    </header>
    <div class="relative bg-white pb-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
      <div class="px-2 sm:px-6 lg:px-8 relative max-w-7xl mx-auto">
        <div
          class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none"
        >
          <div
            v-for="post in posts"
            :key="post.title"
            class="
              flex flex-col
              cursor-pointer
              rounded-lg
              hover:bg-gray-50
              border-gray-100 border-2
              overflow-hidden
            "
            @click="navigate(post.slug)"
          >
            <div
              class="flex-1 hover:bg-gray-50 p-6 flex flex-col justify-between"
            >
              <div class="flex-1">
                <p class="text-gray-400 text-sm">
                  {{ processDate(post.date) }}
                </p>
                <a :href="post.href" class="block mt-8">
                  <p class="text-2xl font-semibold text-gray-900">
                    {{ post.title }}
                  </p>
                  <p class="mt-3 text-base text-gray-500">
                    {{ post.description }}
                  </p>
                </a>
              </div>
              <div class="mt-6 flex items-center">
                <div class="flex-shrink-0">
                  <a>
                    <span class="sr-only">{{ post.authorName }}</span>
                    <img
                      class="h-10 w-10 rounded-full object-cover"
                      :src="post.authorImage"
                      alt=""
                    />
                  </a>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    <a class="hover:underline">
                      {{ post.authorName }}
                    </a>
                  </p>
                </div>
                <div class="flex space-x-1 ml-1 text-sm text-gray-500">
                  <span aria-hidden="true"> &middot; </span>
                  <span> {{ post.readingTime }} minute read </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  async asyncData({ $content }) {
    const posts = await $content()
      .only([
        'title',
        'image',
        'tags',
        'date',
        'slug',
        'authorName',
        'authorImage',
        'readingTime',
        'description',
      ])
      .sortBy('date', 'desc')
      .fetch()

    return {
      posts,
    }
  },
  head() {
    return {
      title: 'Blankly | Our Blankly Blog 🚀',
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: 'Blankly | Our Blankly Blog 🚀',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Blankly | Our Blankly Blog 🚀',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Blankly | Our Blankly Blog 🚀',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'We write about anything from building trading algorithms, market updates, and things we learned as we build the future 🚀.',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content:
            'We write about anything from building trading algorithms, market updates, and things we learned as we build the future 🚀.',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'We write about anything from building trading algorithms, market updates, and things we learned as we build the future 🚀.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Blog Articles Quant Workflow Trading Algorithms Market Backtesting Building Deployment',
        },
      ],
    }
  },
  methods: {
    processDate(str) {
      return moment(str).format('LL')
    },
    navigate(slug) {
      this.$router.push('/' + slug)
    },
  },
}
</script>
