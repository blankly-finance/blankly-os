<template>
  <div class="py-16 overflow-hidden lg:py-24">
    <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
      <div class="relative">
        <h2
          class="
            text-center text-3xl
            leading-8
            font-extrabold
            tracking-tight
            text-gray-900
            sm:text-5xl
          "
        >
          Building a Good Trading Experience is
          <span class="text-green-300">Hard</span>
        </h2>
        <p class="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
          It's already enough to care for building a good user experience.
          Building out all the connections, trading, and more makes the
          experience much worse.
        </p>
      </div>

      <div
        class="
          relative
          mt-12
          lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center
        "
      >
        <div class="relative">
          <h3
            class="text-2xl font-bold text-gray-900 tracking-tight sm:text-4xl"
          >
            Individuals have many acccounts
          </h3>
          <p class="mt-3 text-lg text-gray-500">
            Whether it's Robinhood for stocks, Coinbase for Crypto, MetaMask for
            DeFi, we all have our money in different places.
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
                    bg-black
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
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Wholistic View of Assets
                </p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                There's a desire to be able to see all of our assets in one
                place without the hassle of logging into each and every app.
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
                    bg-black
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
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Trade and Transact Across All
                </p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
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
                    bg-black
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
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">
                  View Account History
                </p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Individuals want to see how they're doing over time, what trades
                they've made, and if they're increasing their net worth.
              </dd>
            </div>
          </dl>
        </div>

        <div class="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
          <img
            class="relative mx-auto px-8 sm:px-0"
            width="490"
            src="~/assets/images/api/many-accounts.svg"
            alt=""
          />
        </div>
      </div>

      <div class="relative mt-12 sm:mt-16 lg:mt-24">
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
              class="
                text-2xl
                font-bold
                text-gray-900
                tracking-tight
                sm:text-4xl
              "
            >
              It's difficult to connect with all of them
            </h3>
            <p class="mt-3 text-lg text-gray-500">
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
                      bg-black
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
                  <p class="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Complicated Auth Flows
                  </p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-gray-500">
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
                      bg-black
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
                  <p class="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Different APIs for All
                  </p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-gray-500">
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
                      bg-black
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
                  <p class="ml-16 text-lg leading-6 font-medium text-gray-900">
                    A Developer Nightmare
                  </p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-gray-500">
                  Actively maintaining your connections is time wasted not spent
                  on building your product and providing the best user
                  experience.
                </dd>
              </div>
            </dl>
          </div>

          <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
            <img
              class="relative mx-auto px-8 sm:px-0"
              width="490"
              src="~/assets/images/api/difficult-connection.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
