<template>
  <div class="min-h-screen bg-white">
    <header class="relative pb-40 bg-light-blue-800 sm:pb-40">
      <div class="absolute inset-0">
        <img
          class="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
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
          sm:max-w-3xl sm:mt-32 sm:px-6
          lg:max-w-7xl lg:px-8
        "
      >
        <h1 class="font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
          Get in touch with us
        </h1>
        <p class="mt-6 text-xl text-white max-w-3xl">
          We'd love to hear what you or your team is working on. At Blankly,
          we're constantly improving our package and platform by talking to
          people like you. Shoot us a message, an email, or a pull request, and
          we'd be happy to see how we can help!
        </p>
      </div>
    </header>

    <main>
      <!-- Side-by-side grid -->
      <div class="bg-white">
        <div
          class="
            max-w-md
            mx-auto
            py-24
            px-4
            sm:max-w-3xl sm:py-32 sm:px-6
            lg:max-w-7xl lg:px-8
          "
        >
          <div class="divide-y divide-warm-gray-200">
            <section
              class="lg:grid lg:grid-cols-3 lg:gap-8"
              aria-labelledby="contactHeading"
            >
              <h2
                id="contactHeading"
                class="text-2xl font-extrabold text-warm-gray-900 sm:text-3xl"
              >
                Get in touch
              </h2>
              <div
                class="
                  mt-8
                  grid grid-cols-1
                  gap-12
                  sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12
                  lg:mt-0 lg:col-span-2
                "
              >
                <div v-for="item in contactDetails" :key="item.name">
                  <h3 class="text-lg font-medium text-warm-gray-900">
                    {{ item.name }}
                  </h3>
                  <dl class="mt-2 text-base text-warm-gray-500">
                    <div>
                      <dt class="sr-only">Email</dt>
                      <dd>
                        {{ item.email }}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <hr class="max-w-6xl mx-auto" />
      <!-- FAQ -->
      <div class="bg-warm-gray-50">
        <div
          class="
            max-w-md
            mx-auto
            py-24
            px-4
            sm:max-w-3xl sm:py-32 sm:px-6
            lg:max-w-7xl lg:px-8
          "
        >
          <div class="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 class="text-3xl font-bold text-warm-gray-900">
                Frequently asked questions
              </h2>
              <p class="mt-4 text-lg text-warm-gray-500">
                Can’t find the answer you’re looking for? Reach out to our
                <a
                  target="_blank"
                  href="mailto:support@blankly.finance"
                  class="font-medium text-cyan-700 hover:text-cyan-600"
                  >customer support</a
                >
                team.
              </p>
            </div>
            <div class="mt-12 lg:mt-0 lg:col-span-2">
              <dl class="space-y-12">
                <div v-for="faq in faqs" :key="faq.id">
                  <dt class="text-lg font-medium text-warm-gray-900">
                    {{ faq.question }}
                  </dt>
                  <dd class="mt-2 text-base text-warm-gray-500">
                    {{ faq.answer }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter -->
      <div class="relative">
        <div
          class="absolute left-0 right-0 h-1/2 bg-warm-gray-50"
          aria-hidden="true"
        />
        <div
          class="
            relative
            max-w-md
            mx-auto
            mb-16
            px-4
            sm:max-w-3xl sm:px-6
            lg:max-w-7xl lg:px-8
          "
        >
          <div
            class="
              py-10
              px-6
              bg-gray-900
              rounded-3xl
              sm:py-16 sm:px-12
              lg:py-20 lg:px-20 lg:flex lg:items-center
            "
          >
            <div class="lg:w-0 lg:flex-1">
              <h2 class="text-3xl font-extrabold tracking-tight text-white">
                Sign up for our newsletter
              </h2>
              <p class="mt-4 max-w-3xl text-lg text-white">
                Keep up to date with everything Blankly. We'll send tips,
                suggestions, and much more as we keep growing!
              </p>
            </div>
            <div class="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
              <form class="max-w-3xl mt-5 sm:flex" @submit.prevent="addEmail">
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
                    bg-gray-700
                    shadow-sm
                    hover:bg-gray-800
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
                  Subscribe
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
                  Subscribed
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { updateWaitlist } from '@/store/waitlist.js'

const contactDetails = [
  {
    name: 'Collaborate',
    email: 'sales@blankly.finance',
    telephone: '+1 (555) 123-4567',
  },
  {
    name: 'Press',
    email: 'sales@blankly.finance',
    telephone: '+1 (555) 123-4567',
  },
  {
    name: 'Join our team',
    email: 'inquires@blankly.finance',
    telephone: '+1 (555) 123-4567',
  },
  {
    name: 'Say hello',
    email: 'hello@blankly.finance',
    telephone: '+1 (555) 123-4567',
  },
]
const faqs = [
  {
    id: 1,
    question: 'Why did you create Blankly?',
    answer:
      "Blankly started out of our own struggles building quant models. It took us months to just gather the data needed, another month to build the model, and another few months just to figure out how to deploy it. With Blankly, we take that process and make it just a few lines of code. We want to make what we've learned over time and make it available for everyone.",
  },
  {
    id: 2,
    question: 'Is Blankly Open-Sourced?',
    answer:
      "Yes, all of Blankly is open-sourced, definitely check out our Github and submit a PR. We're continuously making more and more improvements as we go. So definitely check out our github for the latest updates and releases.",
  },
  {
    id: 3,
    question: 'What can you do with Blankly?',
    answer:
      "We're making it super easy for you to build one trading bot that runs on any exchange. We give you the tools and the ability to interface with any exchange and we let you handle the rest. We're not trying to sell you our specific trading bot",
  },
  {
    id: 4,
    question: 'What else do you have in store?',
    answer:
      "We're working really hard and have a lot more coming soon. So stay tuned and check out our project roadmap to see what's up!",
  },
  {
    id: 5,
    question: 'How do I get started?',
    answer:
      "All you have to do is install our package and check out our getting started docs! It's as simple as that.",
  },
  // More questions...
]

export default {
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      contactDetails,
      faqs,
      emailStr: '',
      emailAdded: false,
      notified: false,
    }
  },
  head() {
    return {
      title: 'Contact Us | Blankly',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "Reach out to us! We'd love to hear your feedback and how we can continue to improve Blankly",
        },
      ],
    }
  },
  methods: {
    async addEmail() {
      if (this.emailStr.length > 0) {
        await updateWaitlist('contact-us', this.emailStr, this.$db)
        this.emailAdded = true
        this.notified = true
      }
    },
  },
}
</script>
