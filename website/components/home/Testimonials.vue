<template>
  <div class="mx-auto max-w-7xl p-10 sm:p-0">
    <div class="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <ul class="space-y-8">
        <li
          v-for="testimonial in testimonials.slice(0, ulLength)"
          :key="testimonial.name"
          class="text-sm leading-6"
        >
          <figure
            class="relative flex flex-col-reverse py-6"
          >
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
          class="text-sm leading-6"
        >
          <figure
            class="relative flex flex-col-reverse py-6"
          >
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
          class="text-sm leading-6"
        >
          <figure
            class="relative flex flex-col-reverse py-6"
          >
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
  }
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
