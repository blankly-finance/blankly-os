<template>
  <div class="pt-20 bg-gray-900 overflow-hidden lg:pt-24">
    <div
      class="
        relative
        max-w-xl
        px-6
        mx-auto
        sm:px-6
        lg:px-8 lg:max-w-7xl
        py-12
        sm:py-24
      "
    >
      <div class="relative">
        <h2
          class="
            text-center text-4xl
            leading-8
            font-extrabold
            tracking-tight
            text-white
            sm:text-5xl
          "
        >
          We connect, unify, and trade, all from
          <span class="text-green-300">one API</span>
        </h2>
        <p class="mt-4 max-w-3xl mx-auto text-center text-xl text-white">
          We supercharge your dev team by making it super easy to integrate and
          scale without managing all the integrations your customers would need.
        </p>
      </div>

      <div
        class="
          relative
          mt-12
          lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-4 lg:items-start
        "
      >
        <div class="relative">
          <h3
            class="
              text-3xl
              font-extrabold
              text-white
              tracking-tight
              sm:text-4xl
            "
          >
            One API. <br />
            <span class="text-green-300">Much Less Code.</span>
          </h3>
          <p class="mt-3 text-lg text-white">
            Use one API to connect with MetaMask, trade on Robinhood, and trade
            from Coinbase. We have SDKs in Javascript and are expanding to many
            other languages.
          </p>

          <dl class="mt-10 max-w-lg space-y-10">
            <div class="relative">
              <dt>
                <div
                  class="
                    absolute
                    flex
                    items-center
                    justify-center
                    h-12
                    w-12
                    rounded-md
                    bg-green-300
                    text-white
                  "
                >
                  <!-- Heroicon name: outline/globe-alt -->
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-white">
                  Trade Securely without all the integrations
                </p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-white">
                We transact and route the trades as needed. All you have to do
                is send us the right request.
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div
                  class="
                    absolute
                    flex
                    items-center
                    justify-center
                    h-12
                    w-12
                    rounded-md
                    bg-green-300
                    text-white
                  "
                >
                  <!-- Heroicon name: outline/scale -->
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-white">
                  Trade and Transact Across All
                </p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-white">
                Why trade in each app when you can just easily trade from one
                place?
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div
                  class="
                    absolute
                    flex
                    items-center
                    justify-center
                    h-12
                    w-12
                    rounded-md
                    bg-green-300
                    text-white
                  "
                >
                  <!-- Heroicon name: outline/lightning-bolt -->
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-white">
                  View Account History
                </p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-white">
                Individuals want to see how they're doing over time, what trades
                they've made, and if they're increasing their net worth.
              </dd>
            </div>
          </dl>
        </div>

        <div class="mt-10 relative ml-0 lg:mt-0" aria-hidden="true">
          <div class="flex justify-end mb-5">
            <button
              class="
                text-white
                rounded-md
                py-2
                px-3
                inline-flex
                items-center
                text-sm
                font-medium
              "
              :class="{
                'bg-gray-500': tab === 'without',
                'bg-gray-800': tab !== 'without',
              }"
              aria-current="page"
              @click="changeTab('without')"
            >
              Without Blankly
            </button>
            <button
              class="
                text-white
                rounded-md
                py-2
                px-3
                ml-3
                inline-flex
                items-center
                text-sm
                font-medium
              "
              :class="{
                'bg-gray-500': tab === 'with',
                'bg-gray-800': tab !== 'with',
              }"
              aria-current="page"
              @click="changeTab('with')"
            >
              With Blankly
            </button>
          </div>
          <div v-show="tab === 'without'" id="bad_gist"></div>
          <div v-show="tab === 'with'" id="api_gist"></div>
        </div>
      </div>

      <div class="relative mt-16 sm:mt-16 lg:mt-24">
        <div
          class="
            lg:grid
            lg:grid-flow-row-dense
            lg:grid-cols-2
            lg:gap-8
            lg:items-center
          "
        >
          <div class="lg:col-start-2">
            <h3
              class="text-3xl font-bold text-white tracking-tight sm:text-4xl"
            >
              Trade securely without the
              <span class="text-green-300">integration headache</span>
            </h3>
            <p class="mt-3 text-lg text-white">
              With varying APIs, different auth flows, and complicated
              maintenance. It's a whole mess to keep your dev stack up to date.
            </p>

            <dl class="mt-10 space-y-10">
              <div class="relative">
                <dt>
                  <div
                    class="
                      absolute
                      flex
                      items-center
                      justify-center
                      h-12
                      w-12
                      rounded-md
                      bg-green-300
                      text-white
                    "
                  >
                    <!-- Heroicon name: outline/annotation -->
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>
                  <p class="ml-16 text-lg leading-6 font-medium text-white">
                    Complicated Auth Flows
                  </p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-white">
                  Some are API keys, others are OAuth 2.0. How do you provide a
                  seamless experience for your users? How do you make it easy to
                  integrate across your technologies?
                </dd>
              </div>

              <div class="relative">
                <dt>
                  <div
                    class="
                      absolute
                      flex
                      items-center
                      justify-center
                      h-12
                      w-12
                      rounded-md
                      bg-green-300
                      text-white
                    "
                  >
                    <!-- Heroicon name: outline/mail -->
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p class="ml-16 text-lg leading-6 font-medium text-white">
                    Different APIs for All
                  </p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-white">
                  The transactions require different endpoints, varying
                  protocols, and a complicated mess of updates.
                </dd>
              </div>
              <div class="relative">
                <dt>
                  <div
                    class="
                      absolute
                      flex
                      items-center
                      justify-center
                      h-12
                      w-12
                      rounded-md
                      bg-green-300
                      text-white
                    "
                  >
                    <!-- Heroicon name: outline/mail -->
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p class="ml-16 text-lg leading-6 font-medium text-white">
                    A Developer Nightmare
                  </p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-white">
                  Actively maintaining your connections is time wasted not spent
                  on building your product and providing the best user
                  experience.
                </dd>
              </div>
            </dl>
          </div>

          <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
            <img
              class="relative mx-auto"
              width="490"
              src="~/assets/images/api/security.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="py-24 bg-white">
      <div class="max-w-xl mx-auto px-4 sm:px-6 sm:max-w-7xl lg:px-8">
        <div class="pb-12 text-center">
          <h1 class="text-5xl font-extrabold mb-8 text-gray-900">
            Built by Developers
            <span class="text-green-300">For Developers</span>
          </h1>
          <p class="text-gray-700 text-md mx-auto">
            We know your struggles because we've tried to build out trading apps
            of our own. Whether it's building our own algorithm or connecting
            all of our wallets. It's frustrating and we wanted to do something
            about it.
          </p>
        </div>
        <dl
          class="
            space-y-10
            lg:space-y-0
            px-4
            sm:px-6
            lg:grid lg:grid-cols-3 lg:gap-8
          "
        >
          <div>
            <dt>
              <div
                class="
                  flex
                  items-center
                  justify-center
                  h-12
                  w-12
                  rounded-md
                  bg-green-300
                  text-white
                "
              >
                <!-- Heroicon name: outline/globe-alt -->
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <p class="mt-5 text-lg leading-6 font-medium text-gray-900">
                Securely Connect to Multiple Exchange
              </p>
            </dt>
            <dd class="mt-2 text-base text-gray-700">
              We support a wide variety of exchange connections to make it easy
              to integrate with all your user's needs.
            </dd>
          </div>

          <div>
            <dt>
              <div
                class="
                  flex
                  items-center
                  justify-center
                  h-12
                  w-12
                  rounded-md
                  bg-green-300
                  text-white
                "
              >
                <!-- Heroicon name: outline/scale -->
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <p class="mt-5 text-lg leading-6 font-medium text-gray-900">
                Transact with Ease
              </p>
            </dt>
            <dd class="mt-2 text-base text-gray-700">
              Easily read and trade across accounts and wallets. We make it all
              the same interaction.
            </dd>
          </div>

          <div>
            <dt>
              <div
                class="
                  flex
                  items-center
                  justify-center
                  h-12
                  w-12
                  rounded-md
                  bg-green-300
                  text-white
                "
              >
                <!-- Heroicon name: outline/lightning-bolt -->
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <p class="mt-5 text-lg leading-6 font-medium text-gray-900">
                Easy SDK Integration
              </p>
            </dt>
            <dd class="mt-2 text-base text-gray-700">
              We make it easy to integrate with any of your existing codebase.
              We're building out multiple SDKs to help out with any project
              type.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: 'with',
    }
  },
  mounted() {
    this.$postscribe(
      '#api_gist',
      // eslint-disable-next-line no-useless-escape
      '<script src="https://gist.github.com/EmersonDove/736a73ba76b1a39c085de67728cce8fc.js"><\/script>'
    )
    this.$postscribe(
      '#bad_gist',
      // eslint-disable-next-line no-useless-escape
      '<script src="https://gist.github.com/EmersonDove/47bd0eed3f8dcb815e014bc53e6bf28f.js"><\/script>'
    )
  },
  methods: {
    changeTab(tab) {
      this.tab = tab
    },
  },
}
</script>
