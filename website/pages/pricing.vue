<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-white relative">
    <WhiteNavBar />
    <div
      class="
        relative
        max-w-4xl
        mx-auto
        py-24
        px-4
        sm:px-6
        lg:max-w-7xl lg:py-24 lg:px-8
      "
    >
      <div class="relative">
        <h1
          class="
            text-5xl
            font-extrabold
            text-gray-900
            sm:leading-none sm:tracking-tight
            lg:text-6xl
          "
        >
          Build better trading algorithms faster.
        </h1>
        <p class="mt-6 max-w-4xl text-xl text-gray-500">
          Whether you're just starting out or you're trading millions, we've got
          you covered and are here to streamline your algotrading workflow on
          hosted or self-hosted infrastructure so you can focus on building
          better algorithms.
        </p>
        <div class="text-blue-500 font-semibold mt-5">
          Note: We are currently completely free as we start our open preview!
        </div>
      </div>
    </div>

    <main>
      <!-- Pricing Section -->
      <section class="relative" aria-labelledby="pricing-heading">
        <h2 id="pricing-heading" class="sr-only">Pricing</h2>
        <!-- <div
          class="
            flex
            items-center
            cursor-pointer
            justify-start
            max-w-7xl
            sm:px-8
            px-4
            mx-auto
            mb-12
            text-sm
            font-medium
          "
        >
          <div
            :class="{
              'bg-gray-900 text-white font-semibold': activeTab === 'hosted',
              'text-gray-500 border border-gray-200':
                activeTab === 'self-hosted',
            }"
            @click="activeTab = 'hosted'"
            class="px-6 py-2 rounded-full"
          >
            Hosted w/ Blankly Cloud
          </div>
          <div
            :class="{
              'bg-gray-900 text-white': activeTab === 'self-hosted',
              'text-gray-500 border border-gray-200': activeTab === 'hosted',
            }"
            @click="activeTab = 'self-hosted'"
            class="px-6 py-2 ml-2 rounded-full"
          >
            Self-Hosted
          </div>
        </div>
        <div class="max-w-7xl mx-auto text-left px-9 mb-16">
          <div v-if="activeTab === 'hosted'">
            <h1 class="text-3xl font-bold">Hosted w/ Blankly Cloud</h1>
            <p class="text-lg text-gray-500 mt-3 sm:w-3/5">
              Get the full feature set of the Blankly Event-Driven Cloud out of
              the box including model experiments, live parameter updates, and a
              full end to end workflow
            </p>
          </div>
          <div v-else>
            <h1 class="text-3xl font-bold">Self-Hosted with Reporting</h1>
            <p class="text-lg text-gray-500 mt-3 sm:w-3/5">
              Host on your own and get all the Blankly event-driven
              infrastructure while integrating backtests, risk, and live
              monitoring instantly
            </p>
          </div>
        </div> -->
        <div>
          <div
            v-if="activeTab === 'hosted'"
            class="
              mx-auto
              max-w-7xl
              px-4
              space-y-12
              sm:px-6
              lg:space-y-0 lg:grid lg:grid-cols-3 lg:grid lg:gap-x-8
            "
          >
            <div
              v-for="tier in hostedPricing.tiers.slice(0, 3)"
              :key="tier.title"
              class="relative p-8 bg-white rounded-2xl flex flex-col"
              :class="{
                'shadow-xl border-blue-500 border-4': tier.mostPopular,
                'border-2 border-gray-200': !tier.mostPopular,
              }"
            >
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-900">
                  {{ tier.title }}
                </h3>
                <p
                  v-if="tier.mostPopular"
                  class="
                    absolute
                    top-0
                    py-1.5
                    px-4
                    bg-blue-500
                    rounded-full
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-white
                    transform
                    -translate-y-1/2
                  "
                >
                  Most popular
                </p>
                <p
                  class="mt-4 flex items-baseline text-gray-900"
                  v-if="tier.title !== 'Enterprise or High Volume'"
                >
                  <span class="text-5xl font-extrabold tracking-tight"
                    >${{ tier.price }}</span
                  >
                  <span class="ml-1 text-xl font-semibold">{{
                    tier.frequency
                  }}</span>
                  <span class="text-sm text-gray-500 ml-2 pb-2 block"
                    >+ Hosting</span
                  >
                </p>
                <p
                  v-else
                  class="
                    text-3xl
                    mt-4
                    items-baseline
                    flex
                    font-medium
                    tracking-tight
                  "
                >
                  Contact Sales
                </p>
                <p class="mt-6 text-gray-500">{{ tier.description }}</p>

                <!-- Feature list -->
                <ul
                  role="list"
                  class="mt-6 gap-6 sm:grid sm:grid-cols-2 md:grid-cols-1"
                >
                  <li
                    v-for="feature in tier.features"
                    :key="feature"
                    class="flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-blue-500"
                      :class="{
                        'text-indigo-500': tier.cta == 'Contact Sales',
                      }"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="ml-3 text-gray-500">{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <a
                :href="tier.href"
                class="
                  mt-12
                  block
                  w-full
                  py-3
                  px-6
                  border border-transparent
                  rounded-md
                  text-center
                  font-medium
                "
                :class="{
                  'bg-blue-500 text-white hover:bg-blue-600': tier.mostPopular,
                  'bg-gray-200 text-gray-700 hover:bg-gray-100':
                    !tier.mostPopular && tier.cta != 'Contact Sales',
                  'bg-indigo-500 text-white hover:bg-indigo-600':
                    tier.cta == 'Contact Sales',
                }"
                >{{ tier.cta }}</a
              >
            </div>
          </div>
          <div
            class="
              max-w-2xl
              mx-auto
              px-4
              space-y-12
              sm:px-6
              lg:max-w-7xl
              lg:space-y-0
              lg:px-8
              lg:grid
              lg:grid-cols-3
              lg:gap-x-8
            "
            v-else
          >
            <div
              v-for="tier in selfHostedPricing.tiers"
              :key="tier.title"
              class="relative p-8 bg-white rounded-2xl flex flex-col"
              :class="{
                'shadow-xl border-blue-500 border-4': tier.mostPopular,
                'border-2 border-gray-200': !tier.mostPopular,
              }"
            >
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-900">
                  {{ tier.title }}
                </h3>
                <p
                  v-if="tier.mostPopular"
                  class="
                    absolute
                    top-0
                    py-1.5
                    px-4
                    bg-blue-500
                    rounded-full
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-white
                    transform
                    -translate-y-1/2
                  "
                >
                  Most popular
                </p>
                <p
                  class="mt-4 flex items-baseline text-gray-900"
                  v-if="tier.title !== 'Enterprise or High Volume'"
                >
                  <span class="text-5xl font-extrabold tracking-tight"
                    >${{ tier.price }}</span
                  >
                  <span class="ml-1 text-xl font-semibold">{{
                    tier.frequency
                  }}</span>
                </p>
                <p
                  v-else
                  class="
                    text-3xl
                    mt-4
                    items-baseline
                    flex
                    font-medium
                    tracking-tight
                  "
                >
                  Contact Sales
                </p>
                <p class="mt-6 text-gray-500">{{ tier.description }}</p>

                <!-- Feature list -->
                <ul role="list" class="mt-6 space-y-6">
                  <li
                    v-for="feature in tier.features"
                    :key="feature"
                    class="flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-blue-500"
                      :class="{
                        'text-indigo-500': tier.cta == 'Contact Sales',
                      }"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="ml-3 text-gray-500">{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <a
                :href="tier.href"
                class="
                  mt-12
                  block
                  w-full
                  py-3
                  px-6
                  border border-transparent
                  rounded-md
                  text-center
                  font-medium
                "
                :class="{
                  'bg-blue-500 text-white hover:bg-blue-600': tier.mostPopular,
                  'bg-gray-200 text-gray-700 hover:bg-gray-100':
                    !tier.mostPopular && tier.cta != 'Contact Sales',
                  'bg-indigo-500 text-white hover:bg-indigo-600':
                    tier.cta == 'Contact Sales',
                }"
                >{{ tier.cta }}</a
              >
            </div>
          </div>
          <div class="sm:px-6 px-4 max-w-7xl mx-auto">
            <div
              v-for="tier in hostedPricing.tiers.slice(3)"
              :key="tier.title"
              class="relative p-8 bg-white mt-10 rounded-2xl"
              :class="{
                'shadow-xl border-blue-500 border-4': tier.mostPopular,
                'border-2 border-gray-200': !tier.mostPopular,
              }"
            >
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-900">
                  {{ tier.title }}
                </h3>
                <p
                  v-if="tier.mostPopular"
                  class="
                    absolute
                    top-0
                    py-1.5
                    px-4
                    bg-blue-500
                    rounded-full
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-white
                    transform
                    -translate-y-1/2
                  "
                >
                  Most popular
                </p>
                <p
                  class="mt-4 flex items-baseline text-gray-900"
                  v-if="tier.title !== 'Enterprise or High Volume'"
                >
                  <span class="text-5xl font-extrabold tracking-tight"
                    >${{ tier.price }}</span
                  >
                  <span class="ml-1 text-xl font-semibold">{{
                    tier.frequency
                  }}</span>
                  <span class="text-sm text-gray-500 ml-2 pb-2 block"
                    >+ Hosting</span
                  >
                </p>
                <p
                  v-else
                  class="
                    text-3xl
                    mt-4
                    items-baseline
                    flex
                    font-medium
                    tracking-tight
                  "
                >
                  Contact Sales
                </p>
                <p class="mt-6 text-gray-500">{{ tier.description }}</p>

                <!-- Feature list -->
                <ul
                  role="list"
                  class="mt-6 gap-6 sm:grid sm:grid-cols-2 xl:grid-cols-3"
                >
                  <li
                    v-for="feature in tier.features"
                    :key="feature"
                    class="flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-blue-500"
                      :class="{
                        'text-indigo-500': tier.cta == 'Contact Sales',
                      }"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="ml-3 text-gray-500">{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <a
                :href="tier.href"
                class="
                  mt-12
                  block
                  w-full
                  py-3
                  px-6
                  border border-transparent
                  rounded-md
                  text-center
                  font-medium
                "
                :class="{
                  'bg-blue-500 text-white hover:bg-blue-600': tier.mostPopular,
                  'bg-gray-200 text-gray-700 hover:bg-gray-100':
                    !tier.mostPopular && tier.cta != 'Contact Sales',
                  'bg-indigo-500 text-white hover:bg-indigo-600':
                    tier.cta == 'Contact Sales',
                }"
                >{{ tier.cta }}</a
              >
            </div>
          </div>
        </div>
      </section>

      <!-- Logo Cloud -->
      <!-- <section
        aria-labelledby="customer-heading"
        class="
          max-w-2xl
          mx-auto
          py-24
          px-4
          sm:px-6
          lg:max-w-7xl lg:py-32 lg:px-8
        "
      >
        <h2 id="customer-heading" class="sr-only">Our customers</h2>
        <div class="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
          <div
            class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
          >
            <img
              class="h-12"
              src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
              alt="Tuple"
            />
          </div>
          <div
            class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
          >
            <img
              class="h-12"
              src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg"
              alt="Mirage"
            />
          </div>
          <div
            class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
          >
            <img
              class="h-12"
              src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
              alt="StaticKit"
            />
          </div>
          <div
            class="col-span-1 flex justify-center md:col-span-3 lg:col-span-1"
          >
            <img
              class="h-12"
              src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
              alt="Transistor"
            />
          </div>
          <div
            class="col-span-2 flex justify-center md:col-span-3 lg:col-span-1"
          >
            <img
              class="h-12"
              src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
              alt="Workcation"
            />
          </div>
        </div>
      </section> -->

      <!-- Testimonial -->
      <!-- <div class="relative mt-14">
        <div
          aria-hidden="true"
          class="
            absolute
            inset-x-0
            h-1/2
            bg-gradient-to-b
            from-white
            to-gray-50
          "
        />

        <div
          class="relative max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <div
            class="
              relative
              py-24
              px-8
              bg-gray-500
              rounded-xl
              shadow-2xl
              overflow-hidden
              lg:px-16 lg:grid lg:grid-cols-2 lg:gap-x-8
            "
          >
            <div
              class="
                absolute
                inset-0
                opacity-50
                filter
                saturate-0
                mix-blend-multiply
              "
            >
              <img
                src="https://images.unsplash.com/photo-1601381718415-a05fb0a261f3?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8ODl8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1216&q=80"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
            <div class="relative lg:col-span-1">
              <img
                class="h-12 w-auto"
                src="https://tailwindui.com/img/logos/workcation-logo-white.svg"
                alt=""
              />
              <blockquote class="mt-6 text-white">
                <p class="text-xl font-medium sm:text-2xl">
                  Workflow has completely transformed how we interact with
                  customers. We've seen record bookings, higher customer
                  satisfaction, and reduced churn.
                </p>
                <footer class="mt-6">
                  <p class="flex flex-col font-medium">
                    <span>Marie Chilvers</span>
                    <span>CEO, Workcation</span>
                  </p>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div> -->
      <!-- FAQ -->
      <section
        aria-labelledby="faq-heading"
        class="
          max-w-7xl
          mx-auto
          py-24
          px-4
          divide-y divide-gray-200
          sm:px-6
          lg:max-w-7xl lg:py-32 lg:px-8
        "
      >
        <h2 id="faq-heading" class="text-3xl font-extrabold text-gray-900">
          Frequently asked questions
        </h2>
        <div class="mt-8">
          <dl class="divide-y divide-gray-200">
            <div
              v-for="faq in faqs"
              :key="faq.id"
              class="pt-6 pb-8 md:grid md:grid-cols-12 md:gap-8"
            >
              <dt class="text-base font-medium text-gray-900 md:col-span-5">
                {{ faq.question }}
              </dt>
              <dd class="mt-2 md:mt-0 md:col-span-7">
                <p class="text-base text-gray-500">
                  {{ faq.answer }}
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import {
  BookmarkAltIcon,
  BookOpenIcon,
  RssIcon,
  ViewListIcon,
} from '@heroicons/vue/outline'
import Footer from '@/components/Footer.vue'

const links = [
  {
    title: 'Documentation',
    description: 'Learn how to integrate our tools with your app',
    icon: BookOpenIcon,
  },
  {
    title: 'API Reference',
    description: 'A complete API reference for our libraries',
    icon: ViewListIcon,
  },
  {
    title: 'Guides',
    description: 'Installation guides that cover popular setups',
    icon: BookmarkAltIcon,
  },
  {
    title: 'Blog',
    description: 'Read our latest news and articles',
    icon: RssIcon,
  },
]

const hostedPricing = {
  tiers: [
    {
      title: 'Free',
      price: 0,
      frequency: '/mo',
      description: 'Giving you the tools to get you up and running instantly.',
      features: [
        '2K Hosting Credits',
        'Unlimited Backtests (Only Hosted)',
        'Live Deployment (Only Hosted)',
        'Integrate Reporting with Your Stack',
        'Deployment Logs',
        'Backtest Comparisons',
        'Deploy from CLI (Only Hosted)',
        'Trade Annotations',
        'Local Backtest Exports',
      ],
      href: 'https://github.com/blankly-finance',
      cta: 'Get Started',
      mostPopular: false,
    },
    {
      title: 'Hobby',
      price: 35,
      frequency: '/seat/mo',
      description: 'Tools to help you collaborate and trade live with comfort.',
      features: [
        '5K Free Hosting Credits / mo',
        'Live monitoring and reporting',
        'Up to $500K Monthly Trading Volume',
        'Team Collaboration',
        'Model Experiments (Only Hosted)',
        'Model CI/CD via Git',
        'Blankly Plugins',
        'Blankly Portfolio',
        'Risk Tearsheets',
        'Live Parameter Updates (Only Hosted)',
      ],
      href: 'https://github.com/blankly-finance',
      cta: 'Get Started',
    },
    {
      title: 'Pro',
      price: 75,
      frequency: '/seat/mo',
      description:
        'The full toolkit to scale your algotrading operation at scale.',
      features: [
        '10K Free Hosting Credits / mo',
        'Full live monitoring, and portfolio risk',
        'Email Support',
        'Team Collaboration',
        'Model Experiments (Only Hosted)',
        'Model CI/CD via Git',
        'Blankly Plugins',
        'Blankly Portfolio',
        'Risk Tearsheets',
        'Live Parameter Updates (Only Hosted)',
        'Blankly Automations',
      ],
      mostPopular: true,
      href: 'https://github.com/blankly-finance',
      cta: 'Get Started',
    },
    {
      title: 'Enterprise or High Volume',
      price: 48,
      frequency: '/month',
      description: 'Dedicated support and infrastructure for your company.',
      features: [
        'SSO/SAML',
        'More than $10M+ Trading Volume',
        'Isolated infrastructure',
        'Optimized Builds & Backtests',
        'On-prem deployment via Anthos',
        '99.9% Uptime Agreements',
        'Dedicated support managers & SLAs',
        'Integrate with internal frameworks',
        'Custom Integrations',
      ],
      href: 'https://github.com/blankly-finance',
      cta: 'Get Started',
      mostPopular: false,
    },
  ],
}

const selfHostedPricing = {
  tiers: [
    {
      title: 'Hobby',
      price: 0,
      frequency: '/mo',
      description: 'Giving you the tools to get you up and running instantly.',
      features: [
        'Live Deployment Monitoring',
        'Deployment Logs',
        'Backtest Comparisons',
        'Trade Annotations',
        'Local Backtest Exports',
      ],
      href: '#',
      cta: 'Coming Soon',
      mostPopular: false,
    },
    {
      title: 'Pro',
      price: 35,
      frequency: '/seat/mo',
      href: '#',
      description:
        'Tools to help you collaborate, scale and trade live with comfort.',
      features: [
        'Full live monitoring, and portfolio risk',
        'Email Support',
        'Team Collaboration',
        'Blankly Plugins',
        'Risk Tearsheets',
        'Blankly Portfolio',
        'Blankly Automations',
      ],
      cta: 'Coming Soon',
      mostPopular: true,
    },
    {
      title: 'Enterprise or High Volume',
      price: 48,
      href: '/contact-us',
      frequency: '/month',
      description: 'Dedicated support and infrastructure for your company.',
      features: [
        'SSO/SAML',
        'More than 1M+ Trading Volume',
        'On-prem infrastructure reporting',
        'Dedicated support managers & SLAs',
        'Onboarding with internal frameworks',
        'Custom Integrations',
      ],
      cta: 'Contact Sales',
      mostPopular: false,
    },
  ],
}

const faqs = [
  {
    id: 0,
    question: 'How much is it per core and per GiB?',
    answer: '$0.035731 / Core / Hour and $0.001339 / GiB / Hour',
  },
  {
    id: 1,
    question: 'Is it cheaper to do self-hosting?',
    answer:
      'Self-hosting takes a lot more time to set up and oftentimes takes more money (Blankly + Individual Containers). Blankly has signed deals with our cloud partners to offer you the best containers at the best prices. We also actively manage your containers so you can focus on building better algorithms.',
  },
  {
    id: 2,
    question: 'Is hosting with Blankly safe?',
    answer:
      'We ensure that all of your models and backtests are safe, secure, and isolated from anyone else. We follow proper security protocols and manage multi-cluster deployments to ensure your trading algos are always up and running. If you want even more security, check out our enterprise plan uptime agreements.',
  },
  {
    id: 2,
    question: 'Which plan is best for me?',
    answer:
      'The hobby plan is best for those that are just getting started. The pro plan is best for teams and commercial use and those that are serious about making money with their trading algorithms. Enterprise is for teams seeking greater performance, on-prem support, and security.',
  },
  {
    id: 3,
    question: 'Does the platform support any package / framework?',
    answer:
      'Yes it does! We have built the platform to support any trading framework including Jesse.ai, bt, backtrader, and any custom framework of your choosing.',
  },
  {
    id: 4,
    question: 'Is hosting charged separate?',
    answer:
      'Hosting is charged separate however each plan does come with a free number of credits to help get you started.',
  },
  {
    id: 5,
    question: 'Can I buy additional hosting?',
    answer:
      'Yes of course. If you run over your free credit limit, you are automatically notified and charged for additional hosting',
  },
  {
    id: 6,
    question: 'How do you keep my keys and items secure?',
    answer:
      "We encrypt all keys as models are uploaded, we also provide an API Key management service so that you don't have to put your keys in code",
  },
  {
    id: 7,
    question: 'Is there a limit to how many teams I can have?',
    answer: "No, there's no limit",
  },
  {
    id: 8,
    question: 'How do credits translate to usage?',
    answer:
      '1000 credits equals one dollar of usage. We charge different amounts for vCPU and vRAM GB-Hour. Blankly event functions and logic are charged by total duration multipled by total memory usage.',
  },
  // More questions...
]

export default {
  components: {
    Footer,
  },
  data() {
    return {
      links,
      hostedPricing,
      selfHostedPricing,
      faqs,
      activeTab: 'hosted',
    }
  },
}
</script>
