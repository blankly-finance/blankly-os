<template>
  <div>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": "https://blankly.finance",
        "logo": "https://blankly.finance/logo.png"
      }
    </script>
    <header class="relative pb-40 bg-light-blue-800 sm:pb-40">
      <div class="absolute inset-0">
        <img
          class="w-full hidden md:block h-full object-cover z-0"
          src="https://images.unsplash.com/photo-1559242550-bdfaa5081d95?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1960&q=80"
          alt=""
        />
      </div>
      <div class="bg-black bg-gradient-to-t pt-2 z-20">
        <NavBar />
      </div>
      <div
        class="
          relative
          py-24
          md:py-0
          -mt-5
          md:mt-24
          max-w-md
          mx-auto
          bg-black
          md:bg-transparent
          px-5
          sm:max-w-3xl sm:mt-32 sm:px-6
          lg:max-w-7xl lg:px-8
        "
      >
        <h1
          class="
            font-extrabold
            tracking-tight
            max-w-5xl
            text-white text-5xl
            lg:text-7xl
          "
        >
          Building the future of
          <span class="text-green-300">modern investing</span>
        </h1>
        <p class="mt-6 text-xl text-white max-w-3xl">
          We've built Blankly so that trading algorithms and quantitative
          finance would be more accessible to more people. As a company, we
          continue to innovate for our customers and our community
        </p>
        <dl class="mt-10 sm:grid sm:grid-cols-4 mb-10 sm:gap-8">
          <div class="flex flex-col">
            <dt
              class="order-2 mt-2 text-lg leading-6 font-medium text-green-300"
            >
              Founded
            </dt>
            <dd class="order-1 text-7xl font-extrabold text-white">2021</dd>
          </div>
          <div class="flex flex-col mt-10 sm:mt-0">
            <dt
              class="order-2 mt-2 text-lg leading-6 font-medium text-green-300"
            >
              Commits
            </dt>
            <dd class="order-1 text-7xl font-extrabold text-white">1K+</dd>
          </div>
          <div class="flex flex-col mt-10 sm:mt-0">
            <dt
              class="order-2 mt-2 text-lg leading-6 font-medium text-green-300"
            >
              Downloads/Month
            </dt>
            <dd class="order-1 text-7xl font-extrabold text-white">10K+</dd>
          </div>
          <div class="flex flex-col mt-10 sm:mt-0">
            <dt
              class="order-2 mt-2 text-lg leading-6 font-medium text-green-300"
            >
              Lines of Code
            </dt>
            <dd class="order-1 text-7xl font-extrabold text-white">20K+</dd>
          </div>
        </dl>
        <a
          class="
            inline-flex
            text-base text-xl
            mt-5
            font-bold
            text-green-300
            cursor-pointer
            hover:text-green-400
            items-center
          "
          href="https://docs.blankly.finance/getting-started/why-blankly"
          target="_blank"
          >Check out our motivations for building Blankly
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 inline-block ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
    </header>
    <main>
      <TeamMembers />
      <hr class="max-w-7xl mx-auto" />
      <AboutText />
      <Footer />
    </main>
  </div>
</template>
<script>
import AboutText from '@/components/about/AboutText.vue'
import TeamMembers from '@/components/about/TeamMembers.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Footer,
    TeamMembers,
    AboutText,
  },
  head() {
    return {
      title: 'About Us | Blankly',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "We're a tight-knit group on a mission to make quantitative finance more accessible to more people. Join the movement now.",
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'Blankly Mission Accessible Quant Algorithmic Trading',
        },
      ],
    }
  },
}
</script>
