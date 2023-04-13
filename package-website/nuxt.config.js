export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Blankly Package - Build Trading Algorithms For Any Asset',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Blankly is an open-sourced python framework that lets you build trading algortihms that run on any exchange. We abstract away all the infrastructure so you can focus on building good strategies.',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        property: 'og:title',
        content: 'Blankly Package - Build Trading Algorithms For Any Asset',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        property: 'og:description',
        content:
          'Blankly is an open-sourced python framework that lets you build quantitative models that run on any exchange. We abstract away all the infrastructure so you can focus on building good models.',
      },
      {
        hid: 'image',
        name: 'image',
        content: 'https://package.blankly.finance/preview.png',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        property: 'og:image',
        content: 'https://package.blankly.finance/preview.png',
      },
      {
        hid: 'og:type',
        name: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'url',
        name: 'url',
        content: 'https://package.blankly.finance',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Blankly Package - Build Trading Algorithms For Any Asset',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://package.blankly.finance/preview.png',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Blankly is an open-sourced python framework that lets you build quantitative models that run on any exchange. We abstract away all the infrastructure so you can focus on building good models.',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'Algorithmic Trading Models Python Package Crypto Backtest Cloud Deploy Quant Workflow Security Hedge Fund Enterprise',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css',
      },
    ],
    script: [
      {
        src: '//script.crazyegg.com/pages/scripts/0111/3090.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/gist.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/postscribe.client.js' },
    { src: '~/plugins/typed.js', mode: 'client' },
    { src: '~/plugins/firebase.client.js', mode: 'client' },
    { src: '~/plugins/prism.client.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@hexdigital/nuxt-intercom',
  ],
  intercom: {
    appId: 'iau71r9e',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/sitemap',
  ],
  sitemap: {
    hostname: 'https://blankly.finance',
  },
  content: {
    markdown: {
      remarkPlugins: ['remark-math'],
      rehypePlugins: [['rehype-katex', { output: 'html' }]],
    },
  },
  generate: {
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await $content({ deep: true }).only(['path']).fetch()
      return files.map((file) => (file.path === '/index' ? '/' : file.path))
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
    },
  },
}
