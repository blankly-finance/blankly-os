<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-white">
    <div
      class="max-w-7xl mx-auto py-12 px-4 text-left sm:px-6 lg:px-8 lg:py-24"
    >
      <div class="space-y-12">
        <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-7xl">
          <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Meet our <span class="text-green-300">growing core team</span>
          </h2>
          <p class="text-xl text-gray-500">
            We're a group of impassioned people excited about quantitative
            finance, building things, and making an impact on the world. We've
            all poured our hearts out into this project and the package, so we
            can't wait to see what you do with it.
          </p>
        </div>
        <ul
          class="
            mx-auto
            space-y-16
            sm:grid sm:grid-cols-2 sm:gap-10 sm:space-y-0
            lg:grid-cols-3 lg:max-w-7xl
          "
        >
          <li v-for="person in people" :key="person.name">
            <div class="space-y-6 bg-gray-100 p-10 rounded-md text-center">
              <img
                class="
                  mx-auto
                  h-40
                  w-40
                  object-cover
                  rounded-full
                  xl:w-30 xl:h-30
                "
                :src="person.imageUrl"
                alt=""
              />
              <div class="space-y-2">
                <div class="text-lg leading-6 font-medium space-y-1">
                  <h3>{{ person.name }}</h3>
                  <p class="text-gray-400">{{ person.role }}</p>
                </div>
                <ul class="flex justify-center space-x-5">
                  <li>
                    <a
                      :href="person.email"
                      class="text-gray-400 hover:text-gray-500"
                    >
                      <span class="sr-only">email</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                        />
                        <path
                          d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      :href="person.linkedinUrl"
                      class="text-gray-400 hover:text-gray-500"
                    >
                      <span class="sr-only">LinkedIn</span>
                      <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const people = [
  {
    name: 'Brandon Fan',
    role: 'CEO, Cofounder',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/headshots%2Fbrandon.JPG?alt=media&token=b4ac2b1f-276a-400a-925b-06d1e755de26',
    email: 'mailto:brandon@blankly.finance',
    linkedinUrl: 'https://www.linkedin.com/in/brandonfan1256',
  },
  {
    name: 'Emerson Dove',
    role: 'CTO, Cofounder',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/headshots%2Femerson.jpg?alt=media&token=4da71bec-1340-4ec8-b682-936a2c513a1c',
    email: 'mailto:emerson@blankly.finance',
    linkedinUrl: 'https://www.linkedin.com/in/emerson-dove/',
  },
  {
    name: 'Colin Wang',
    role: 'Head of Business Operations',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/headshots%2Fcolin.png?alt=media&token=416cb884-488e-483f-83e1-96160017f6d1',
    email: 'mailto:colwang@umich.edu',
    linkedinUrl: 'https://www.linkedin.com/in/colinwang007/',
  },
  {
    name: 'Kevin Wang',
    role: 'Head of Marketing',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/headshots%2Fwangkevin.png?alt=media&token=cc3f875e-c5dc-48ee-bff4-865b23c16310',
    email: 'mailto:kwaang@umich.edu',
    linkedinUrl: 'https://www.linkedin.com/in/kevin-wang-5204b619a/',
  },
  {
    name: 'Jeremy Liu',
    role: 'Lead Engineer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/headshots%2Fjeremy.png?alt=media&token=4c9699ab-c3e1-47d3-a9b2-a66795a84680',
    email: 'mailto:jliuu@umich.edu',
    linkedinUrl: 'https://www.linkedin.com/in/jeremylliu/',
  },
  {
    name: 'Aryan Chinnala',
    role: 'Founding Engineer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/headshots%2Faryan.JPG?alt=media&token=c87e8526-a09c-407c-a956-59daf970a826',
    email: 'mailto:aryanchi@umich.edu',
    linkedinUrl: 'https://www.linkedin.com/in/aryanchinnala/',
  },
  {
    name: 'Avi Mehta',
    role: 'Founding Engineer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/headshots%2Favi.jpg?alt=media&token=fed3bd54-2d20-4641-8546-f598f48bb747',
    email: 'mailto:avim@vt.edu',
    linkedinUrl: 'https://www.linkedin.com/in/mehtavi/',
  },
  {
    name: 'Mohnish Aggarwal',
    role: 'Founding Engineer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/headshots%2Fmohnish.jpg?alt=media&token=a4e7587c-618a-41b9-85de-e59731319e3e',
    email: 'mailto:mohnisha@umich.edu',
    linkedinUrl: 'https://www.linkedin.com/in/mohnish-aggarwal-9982a3207/',
  },
  {
    name: 'Matias Kotlik',
    role: 'Founding Engineer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/headshots%2Fmatias.png?alt=media&token=03d33f4a-9d9d-4662-aede-6f920f2f44d9',
    email: 'mailto:mdkotlik@gmail.com',
    linkedinUrl: 'https://www.linkedin.com/in/matias-kotlik-a936131a5/',
  },
  {
    name: 'Marcelina Krowinska',
    role: 'Developer Advocate',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fauthors%2FIMG_1092.jpg?alt=media&token=af3aee69-6efa-4d09-8013-f20a04c1840f',
    email: 'mailto:marcelina13k@vt.edu',
    linkedinUrl: 'https://www.linkedin.com/in/marcelina-krowinska/',
  },
  {
    name: 'Aditya Akula',
    role: 'Developer Advocate',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/headshots%2Faditya.JPG?alt=media&token=5df5807d-1502-471d-935a-6a1f6f72262d',
    email: 'mailto:akula.aditya@gmail.com',
    linkedinUrl: 'https://www.linkedin.com/in/aditya-akula-18a240211/',
  },
  {
    name: 'Alexander Anderson',
    role: 'Content Creator',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/headshots%2Falex.jpeg?alt=media&token=6d28712b-6921-4cc2-9380-aaea0db5b03b',
    email: 'mailto:alex20@vt.edu',
    linkedinUrl: 'https://www.linkedin.com/in/alexander-anderson-bb90a91b2/',
  },
]

export default {
  data() {
    return { people: [] }
  },
  mounted() {
    this.people = people
  },
}
</script>
