<template>
  <div class="mx-auto max-w-5xl p-10 sm:p-6">
    <div class="rounded-lg p-10 border text-xl bg-gray-50 bg-white italic">
      "What I enjoy most about Blankly is how quickly I can go from an idea to
      backtesting to then executing on it in live or paper trading. Prior to
      Blankly, my workflow was disorganized, spanning various notebooks and
      helper code. With Blankly, I don't have to worry about how to put
      something into production - just flip a parameter and get going."
      <p class="mt-4 text-blue-500 font-semibold">- Stefan Hermaneck</p>
    </div>
    <div
      class="
        rounded-lg
        mt-8
        border
        p-10
        text-xl text-gray-600
        bg-gray-50
        italic
      "
    >
      Instead of spending months building and testing my own trading engine, I
      installed the Blankly package and had a trend-following strategy
      up-and-running within a matter of hours. I was able to use that time to
      focus on what matters: researching, testing, and iterating on strategies.
      Additionally, since the package is open source I am able to dig through
      the code to verify it is performing as expected, or add new features so it
      fits my specific needs.

      <p class="mt-4 text-blue-500 font-semibold">- Jake Kalish</p>
    </div>
    <div
      class="grid grid-cols-1 mt-8 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      <ul class="space-y-8">
        <li
          v-for="testimonial in testimonials.slice(0, ulLength)"
          :key="testimonial.name"
          class="text-sm leading-6 px-6"
        >
          <figure class="relative flex flex-col-reverse py-6">
            <blockquote class="mt-3 text-lg italic text-gray-600">
              <p>"{{ testimonial.message }}"</p>
            </blockquote>
            <figcaption class="flex items-center space-x-4">
              <div class="flex-auto">
                <div class="text-gray-400">{{ testimonial.source }}</div>
                <div class="text-base text-blue-500 font-semibold">
                  {{ testimonial.name }}
                </div>
              </div>
            </figcaption>
          </figure>
        </li>
      </ul>
      <ul class="space-y-4">
        <li
          v-for="testimonial in testimonials.slice(ulLength, ulLength * 2)"
          :key="testimonial.name"
          class="text-sm leading-6 px-6"
        >
          <figure class="relative flex flex-col-reverse py-6">
            <blockquote class="mt-3 text-lg italic text-gray-600">
              <p>{{ testimonial.message }}</p>
            </blockquote>
            <figcaption class="flex items-center space-x-4">
              <div class="flex-auto">
                <div class="text-gray-400">{{ testimonial.source }}</div>
                <div class="text-base text-blue-500 font-semibold">
                  {{ testimonial.name }}
                </div>
              </div>
            </figcaption>
          </figure>
        </li>
      </ul>
      <ul class="space-y-8">
        <li
          v-for="testimonial in testimonials.slice(ulLength * 2)"
          :key="testimonial.name"
          class="text-sm leading-6 px-6"
        >
          <figure class="relative flex flex-col-reverse py-6">
            <blockquote class="mt-3 text-lg italic text-gray-600">
              <p>{{ testimonial.message }}</p>
            </blockquote>
            <figcaption class="flex items-center space-x-4">
              <div class="flex-auto">
                <div class="text-gray-400">{{ testimonial.source }}</div>
                <div class="text-base text-blue-500 font-semibold">
                  {{ testimonial.name }}
                </div>
              </div>
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
const testimonials = [
  {
    source: 'r/algotrading',
    name: 'todunaorbust',
    message:
      'This is a incredible piece of work, the website is beautiful, very clear docs, the code is nice and modular. takes the nitty gritty bits out of making algos.',
  },
  {
    source: 'r/algotrading',
    name: 'bigrosso',
    message:
      "This is impressive. Really great work, I love the compatibility with multiple exchanges and the overall structure. Can't even praise the backtesting feature enough. I'm currently diving into the docs to really learn it and hopefully apply to my own strategy.",
  },
  {
    source: 'r/opensource',
    name: 'Notmyn4me',
    message: 'Holy ****, really Nice project!',
  },
]
export default {
  data() {
    return {
      testimonials,
    }
  },
  computed: {
    ulLength() {
      return this.testimonials.length / 3
    },
  },
}
</script>
