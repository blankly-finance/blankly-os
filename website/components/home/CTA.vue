<template>
  <section id="cta">
    <div class="bg-white">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div
          class="
            bg-gray-900
            rounded-lg
            shadow-xl
            overflow-hidden
            lg:grid lg:grid-cols-2 lg:gap-4
          "
        >
          <div
            class="
              pt-10
              pb-12
              px-6
              sm:pt-16 sm:px-16
              lg:py-16 lg:pr-0
              xl:py-20 xl:px-20
            "
          >
            <div class="lg:self-center">
              <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
                <span class="block">Ready to dive in?</span>
                <span class="block">Read the Blankly docs today</span>
              </h2>
              <p class="mt-4 text-lg leading-6 text-green-200">
                It's super easy to get up and running and building your own
                money-making model in no time.
              </p>
              <a
                href="https://docs.blankly.finance"
                target="_blank"
                class="
                  mt-8
                  bg-white
                  border border-transparent
                  rounded-md
                  shadow
                  px-5
                  py-3
                  inline-flex
                  items-center
                  justify-center
                  sm:justify-start
                  text-base
                  w-full
                  sm:w-auto
                  font-medium
                  text-green-300
                  hover:bg-green-50
                "
                >View Documentation</a
              >
            </div>
          </div>
          <div
            class="
              -mt-6
              hidden
              sm:block
              aspect-w-5 aspect-h-3
              md:aspect-w-2 md:aspect-h-1
            "
          >
            <img
              class="
                transform
                rounded-md
                object-center
                hidden
                sm:block sm:translate-x-16
                mx-auto
                object-cover
                my-0
              "
              width="300"
              src="~/assets/images/background-2.svg"
              alt="App screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {}
</script>
