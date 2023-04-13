<template>
  <div class="relative px-2 sm:px-0 mt-16 mb-16 overflow-invisible">
    <div class="relative">
      <div
        class="
          lg:mx-auto
          lg:max-w-7xl
          lg:px-8
          lg:grid
          lg:grid-cols-2
          lg:grid-flow-col-dense
          lg:gap-24
        "
      >
        <div class="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:mx-0 lg:px-0">
          <div>
            <div>
              <span
                class="
                  h-12
                  w-12
                  rounded-md
                  flex
                  items-center
                  justify-center
                  bg-green-300
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </span>
            </div>
            <div class="mt-6">
              <h2 class="text-3xl font-bold tracking-tight text-gray-900">
                Build trading algorithms the way you want
              </h2>
              <p class="mt-4 text-lg text-gray-500">
                With our trading interface, we make it easy to structure your
                code how you want. Our module is designed to fit almost any
                trading style - from simple moving averages to machine learning
                models. We provide advanced technical analysis tools, immediate
                access to exchange's REST APIs, and websocket feeds for price
                updates and order book changes.
              </p>
              <div class="mt-6">
                <a
                  href="#"
                  class="
                    inline-flex
                    text-base
                    font-medium
                    text-gray-500
                    hover:text-gray-800
                    items-center
                  "
                >
                  Check out our Base Bot and Strategy Classes
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
            </div>
          </div>
        </div>
        <div class="mt-12 sm:mt-16 lg:mt-0">
          <div
            class="
              lg:px-0 lg:m-0 lg:relative
              hidden
              w-full
              lg:-mr-48
              sm:flex
              items-center
              lg:h-full
            "
          >
            <div class="sm:w-full md:w-auto" id="gist-bots"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-24">
      <div
        class="
          lg:mx-auto
          lg:max-w-7xl
          lg:px-8
          lg:grid
          lg:grid-cols-2
          lg:grid-flow-col-dense
          lg:gap-24
        "
      >
        <div
          class="
            px-4
            max-w-xl
            mx-auto
            sm:px-6
            lg:py-32 lg:mx-0 lg:px-0 lg:col-start-2
          "
        >
          <div>
            <div>
              <span
                class="
                  h-12
                  w-12
                  rounded-md
                  flex
                  items-center
                  justify-center
                  bg-green-300
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  />
                </svg>
              </span>
            </div>
            <div class="mt-6">
              <h2 class="text-3xl font-bold tracking-tight text-gray-900">
                Integrate your existing code with ease
              </h2>
              <p class="mt-4 text-lg text-gray-500">
                Bring powerful and accurate backtesting to your existing models
                by wrapping it in a few lines of code. Instantly trade across
                new exchanges and asset classes by leveraging our blankly
                interface. Our powerful integrations allow you to experiment and
                optimize like never before.
              </p>
              <div class="mt-6">
                <a
                  href="#"
                  class="
                    inline-flex
                    text-base
                    font-medium
                    text-gray-500
                    hover:text-gray-800
                    items-center
                  "
                >
                  View Documentation Examples
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
            </div>
          </div>
        </div>
        <div class="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
          <div
            class="
              pr-4
              lg:-ml-48
              hidden
              md:flex
              lg:m-0
              items-center
              lg:relative lg:h-full
            "
          >
            <div id="gist-two" class="flex-grow"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative">
      <div
        class="
          lg:mx-auto
          lg:max-w-7xl
          lg:px-8
          lg:grid
          lg:grid-cols-2
          lg:grid-flow-col-dense
          lg:gap-24
        "
      >
        <div class="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:mx-0 lg:px-0">
          <div>
            <div>
              <span
                class="
                  h-12
                  w-12
                  rounded-md
                  flex
                  items-center
                  justify-center
                  bg-green-300
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </span>
            </div>
            <div class="mt-6">
              <h2 class="text-3xl font-bold tracking-tight text-gray-900">
                Deploy in one command
              </h2>
              <p class="mt-4 text-lg text-gray-500">
                Stop creating new kubernetes clusters or Dockerfiles. Stop
                managing package installations and security updates, and stop
                worrying about hosting at home. We do that all for you in one
                command. Immediately deploy and update your code on our
                infrastructure - focus on improving your trading algos instead
                of running servers.
              </p>
              <div class="mt-6">
                <a
                  href="https://blankly.finance"
                  target="_blank"
                  class="
                    inline-flex
                    text-base
                    font-medium
                    text-gray-500
                    hover:text-gray-800
                    items-center
                  "
                >
                  View our Blankly Platform
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
            </div>
          </div>
          <!-- <div class="mt-8 border-t border-gray-200 pt-6">
            <blockquote>
              <div>
                <p class="text-base text-gray-500">
                  &ldquo;Talking is cheap, show me the code.&rdquo;
                </p>
              </div>
              <footer class="mt-3">
                <div class="flex items-center space-x-3">
                  <div class="text-base font-medium text-gray-700">
                    Linus Torvalds
                  </div>
                </div>
              </footer>
            </blockquote>
          </div> -->
        </div>
        <div class="mt-12 sm:mt-16 lg:mt-0">
          <div
            class="
              pl-4
              -mr-48
              sm:pl-6
              md:-mr-16
              lg:px-0 lg:m-0
              hidden
              sm:flex
              lg:relative
              items-center
              lg:h-full
            "
          >
            <div id="gist-three" class="flex-grow"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // eslint-disable-next-line no-useless-escape
    this.$postscribe(
      '#gist-bots',
      // eslint-disable-next-line no-useless-escape
      '<script src="https://gist.github.com/EmersonDove/8136960666605c504267e5417fbf49c2.js"><\/script>'
    )
    this.$postscribe(
      '#gist-two',
      // eslint-disable-next-line no-useless-escape
      '<script src="https://gist.github.com/EmersonDove/8a23b35c269902c771e69b6324e9d184.js"><\/script>'
    )

    this.$postscribe(
      '#gist-three',
      // eslint-disable-next-line no-useless-escape
      '<script src="https://gist.github.com/EmersonDove/284ae32d2d5e86f83453562f3f5a3c0e.js"><\/script>'
    )
  },
}
</script>
