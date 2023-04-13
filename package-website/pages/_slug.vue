<template>
  <div>
    <header class="relative pb-14 sm:pb-14">
      <div class="relative pt-2">
        <WhiteNavbar :show-sub="false" />
      </div>
      <div
        class="
          relative
          text-center
          max-w-md
          mx-auto
          px-4
          mt-10
          sm:max-w-3xl sm:px-6
          lg:max-w-7xl lg:px-8
        "
      >
        <NuxtLink
          to="/examples"
          href="/examples"
          class="block text-gray-900 sm:float-left"
          >← Go Back</NuxtLink
        >
        <div class="text-center flex flex-col">
          <div>
            <span
              class="
                inline-flex
                items-center
                px-8
                my-5
                py-0.5
                rounded-full
                text-sm
                mt-6
                mb-8
                font-medium
              "
              :class="`${post.categoryClass} ${post.categoryText}`"
            >
              {{ post.category }}
            </span>
          </div>
          <time class="block text-gray-600 mb-10">{{ processDate(post.date) }}</time>
          <h1
            class="
              font-bold
              tracking-tight
              sm:w-4/5
              mx-auto
              text-gray-900 text-4xl
              sm:text-5xl
              lg:text-6xl
            "
          >
            {{ post.title }}
          </h1>
          <p class="mt-6 text-xl mx-auto text-gray-400 px-3 py-4 max-w-3xl">
            {{ post.description }}
          </p>
        </div>
        <div class="mt-6 mx-auto">
          <div class="flex-shrink-0 justify-center flex mx-auto items-center">
            <a>
              <span class="sr-only">{{ post.authorName }}</span>
              <img
                class="h-10 w-10 rounded-full object-cover"
                :src="post.authorImage"
                alt=""
              />
            </a>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">
                <a class="hover:underline">
                  {{ post.authorName }}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
    <hr class="mx-auto max-w-7xl py-5" />
    <article class="pb-24">
      <div class="w-full">
        <div class="px-8 sm:max-w-6xl mx-auto max-w-xl">
          <nuxt-content
            class="mt-14 max-w-4xl mx-auto prose prose-lg max-w-none"
            :document="post"
          />
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import moment from 'moment'
import WhiteNavbar from '@/components/WhiteNavBar.vue'
export default {
  components: {
    WhiteNavbar,
  },
  async asyncData({ $content, params }) {
    const post = await $content(params.slug).fetch()
    post.date = moment(post.date).format('LLL')
    return { post }
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.post.title,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.post.description,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://blankly.finance/${this.$route.params.slug}`,
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: `https://blankly.finance/${this.$route.params.slug}`,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.post.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.post.description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.post.image,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.post.image,
        },
        {
          property: 'article:published_time',
          content: this.post.date,
        },
        {
          property: 'article:tag',
          content: this.post.category ? this.post.category.toString() : '',
        },
        { name: 'twitter:label1', content: 'Written by' },
        { name: 'twitter:data1', content: this.post.authorName },
        { name: 'twitter:label2', content: 'Filed under' },
        {
          name: 'twitter:data2',
          content: this.post.category ? this.post.category.toString() : '',
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://blankly.finance/${this.$route.params.slug}`,
        },
      ],
    }
  },
  methods: {
    processDate(str) {
      return moment(str).format('LL')
    }
  },
}
</script>
