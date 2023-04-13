<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-6 sm:py-24 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-gray-900 text-center">
        Frequently asked questions
      </h2>
      <div class="mt-12">
        <dl
          class="
            space-y-10
            md:space-y-0
            md:grid
            md:grid-cols-2
            md:grid-rows-2
            md:gap-x-8
            md:gap-y-12
            lg:grid-cols-3
          "
        >
          <div v-for="faq in faqs" :key="faq.id">
            <dt class="text-lg leading-6 font-medium text-gray-900">
              {{ faq.question }}
            </dt>
            <dd class="mt-2 text-base text-gray-500" v-html="faq.answer"></dd>
          </div>
        </dl>
      </div>
    </div>
    <script v-html="jsonLD"></script>
  </div>
</template>

<script>
const faqs = [
  {
    id: 1,
    question: 'Why did you create Blankly?',
    answer:
      "Blankly started out of our own struggles building programmatic trading algorithms. It took us months to just gather the data needed, another month to build the model, and another few months just to figure out how to deploy it. With Blankly, we take that process and make it just a few lines of code. We want to make what we've learned over time and make it available for everyone.",
  },
  {
    id: 2,
    question: 'Is Blankly Open-Sourced?',
    answer:
      "Yes, all of Blankly is open-sourced, definitely check out our <a class='text-blue-600 hover:text-blue-700 cursor-pointer' href='https://github.com/Blankly-Finance/Blankly'>Github</a> and submit a PR. We're continuously making more and more improvements as we go. So definitely check out our <a class='text-blue-600 hover:text-blue-700 cursor-pointer' href='https://github.com/Blankly/Blankly-Finance'>github</a> for the latest updates and <a class='text-blue-600 hover:text-blue-700 cursor-pointer' href='https://github.com/Blankly/Blankly-Finance/Blankly/releases'>releases</a>.",
  },
  {
    id: 3,
    question: 'What can you do with Blankly?',
    answer:
      "We're making it super easy for you to build one trading bot that runs on any exchange. We give you the tools and the ability not only to trade, but also backtest your model and optimize for you to make the best models out there. We're not trying to sell you our specific trading bot. Check out this <a class='text-blue-600 hover:text-blue-700 cursor-pointer' href='https://youtu.be/pcm0h63rhUU'>YouTube Video</a> for an example",
  },
  {
    id: 4,
    question: 'So is this just connecting multiple APIs?',
    answer:
      "We started out just doing that: making it easy to connect to Coinbase Pro and Binance. We soon expanded to multiple assets and exchanges. However, Blankly really shines not just in trade execution, but also model backtesting in one line, with custom data, and deploying to optimized cloud infrastructure. We're streamlinining the entire workflow, and not just the trading.",
  },
  {
    id: 5,
    question: 'How do I get started?',
    answer:
      "All you have to do is install our package and check out our getting started docs! It's as simple as that. Easily run backtests on our Blankly Platform for free (<a class='text-blue-600 hover:text-blue-700 cursor-pointer' href='https://blankly.finance'>Join the Waitlist</a>). ",
  },
  {
    id: 6,
    question: 'Can I integrate an existing model?',
    answer:
      'Yes, Blankly allows for easy and quick iteration. I built a genetic algorithm to trade stocks in the past and integrated it with Blankly within minutes. We make it super easy to integrate for any exchange.',
  },
  // More questions...
]

export default {
  data() {
    return {
      faqs,
    }
  },
  computed: {
    jsonLD() {
      const questions = faqs.map((faq) => {
        return {
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        }
      })

      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: questions,
      }
    },
  },
}
</script>
