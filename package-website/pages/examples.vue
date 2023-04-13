<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <WhiteNavBar name="Blankly Package" tab="overview" product="package" />
    <div class="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div class="relative mx-auto lg:max-w-7xl lg:px-8">
        <div>
          <h2
            class="
              text-4xl
              tracking-tight
              font-extrabold
              text-gray-900
              sm:text-5xl
            "
          >
            Blankly Package Examples
          </h2>
          <p class="mt-6 text-xl text-gray-500 sm:mt-8 w-3/4">
            Whether you're just starting out or you're a professional. Use these
            examples to get you up and running in no time and see the power of
            Blankly.
          </p>
        </div>
        <div
          class="mt-12 grid gap-16 pt-12 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12"
        >
          <div
            class="
              relative
              cursor-pointer
              pt-16
              hover:shadow-2xl
              transition
              pb-10
              rounded-2xl
              shadow-xl
              overflow-hidden
            "
            @click="navigate(featuredPosts[0].slug)"
          >
            <img
              class="absolute inset-0 h-full w-full object-cover"
              :src="featuredPosts[0].image"
              alt=""
            />
            <div class="absolute inset-0 bg-blue-500 mix-blend-multiply" />
            <div
              class="
                absolute
                inset-0
                bg-gradient-to-t
                from-gray-500
                via-gray-500
                opacity-90
              "
            />
            <div class="relative px-8">
              <blockquote class="flex flex-col">
                <div
                  class="relative text-lg font-medium text-white md:flex-grow"
                >
                  <h1 class="text-4xl font-extrabold my-6">
                    {{ featuredPosts[0].title }}
                  </h1>
                  <p class="relative">
                    {{ featuredPosts[0].description }}
                  </p>
                </div>

                <footer class="mt-8">
                  <div class="flex items-center">
                    <img
                      class="
                        h-10
                        object-cover
                        w-10
                        rounded-full
                        border-2 border-white
                      "
                      :src="featuredPosts[0].authorImage"
                      alt=""
                    />
                    <p class="ml-3 font-medium text-gray-300">
                      <a> {{ featuredPosts[0].authorName }}</a>
                    </p>
                  </div>
                  <p class="text-base font-semibold text-indigo-200 mt-5">
                    Featured, {{ featuredPosts[0].readingTime }} min read
                  </p>
                </footer>
              </blockquote>
            </div>
          </div>
          <div
            class="
              relative
              pt-16
              pb-10
              hover:shadow-2xl
              transition
              cursor-pointer
              rounded-2xl
              shadow-xl
              overflow-hidden
            "
            @click="navigate(featuredPosts[1].slug)"
          >
            <img
              class="absolute inset-0h-full w-full object-cover"
              :src="featuredPosts[1].image"
              alt=""
            />
            <div class="absolute inset-0 bg-indigo-500 mix-blend-multiply" />
            <div
              class="
                absolute
                inset-0
                bg-gradient-to-t
                from-indigo-600
                via-indigo-600
                opacity-90
              "
            />
            <div class="relative h-full px-8">
              <blockquote class="flex h-full flex-col">
                <div
                  class="
                    relative
                    text-lg
                    flex-1
                    font-medium
                    text-white
                    md:flex-grow
                  "
                >
                  <h1 class="text-4xl font-extrabold my-6">
                    {{ featuredPosts[1].title }}
                  </h1>
                  <p class="relative flex-1">
                    {{ featuredPosts[1].description }}
                  </p>
                </div>

                <footer class="mt-8">
                  <div class="flex items-center">
                    <img
                      class="
                        h-10
                        w-10
                        object-cover
                        rounded-full
                        border-2 border-white
                      "
                      :src="featuredPosts[1].authorImage"
                      alt=""
                    />
                    <p class="ml-3 font-medium text-gray-300">
                      <a> {{ featuredPosts[1].authorName }}</a>
                    </p>
                  </div>
                  <p class="text-base font-semibold text-indigo-200 mt-5">
                    Featured, {{ featuredPosts[1].readingTime }} min read
                  </p>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>

        <div class="mt-12 grid pt-12 lg:grid-cols-3 xl:grid-cols-4 lg:gap-y-12">
          <div
            v-for="post in nonFeaturedPosts"
            :key="post.title"
            class="flex flex-col hover:bg-gray-50 cursor-pointer transition p-5"
            @click="navigate(post.slug)"
          >
            <a :href="post.href" class="block mt-4 flex flex-col flex-1">
              <p class="text-xl font-semibold text-gray-900">
                {{ post.title }}
              </p>
              <p class="mt-3 text-base text-gray-500">
                {{ post.description.slice(0, 75) }}...
              </p>
            </a>
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
                  <a>
                    {{ post.authorName }}
                  </a>
                </p>
                <div class="flex space-x-1 text-sm text-gray-500">
                  <time :datetime="post.date">
                    {{ processDate(post.date) }}
                  </time>
                  <span aria-hidden="true"> &middot; </span>
                  <span> {{ post.readingTime }} min read </span>
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
        'featured',
        'authorImage',
        'categoryClass',
        'category',
        'categoryText',
        'readingTime',
        'description',
      ])
      .sortBy('date', 'desc')
      .fetch()
    const featuredPosts = posts.filter((post) => post.featured)
    const nonFeaturedPosts = posts.filter((post) => !post.featured)
    return {
      nonFeaturedPosts,
      featuredPosts,
    }
  },
  head() {
    return {
      title: 'Blankly Package | Examples 🚀',
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: 'Blankly Package | Examples 🚀',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Blankly Package | Examples 🚀',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Blankly Package | Examples 🚀',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'Trading algorithm examples to get you up and running as quickly as possible 🚀.',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content:
            'Trading algorithm examples to get you up and running as quickly as possible 🚀.',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Trading algorithm examples to get you up and running as quickly as possible 🚀.',
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
