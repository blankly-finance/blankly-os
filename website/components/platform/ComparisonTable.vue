<template>
  <div class="flex flex-col roboto items-center my-12 max-w-7xl mx-auto">
    <div class="-my-2 sm:-mx-6 lg:-mx-8 mx-auto min-w-full">
      <div class="py-2 align-middle inline-block min-w-full sm:px-3 lg:px-8">
        <div
          class="
            overflow-hidden
            border-2 border-gray-200
            sm:rounded-md
            shadow-xl
          "
        >
          <table id="dataTable" class="min-w-full divide-y divide-gray-200">
            <thead class="bg-white">
              <tr>
                <th
                  scope="col"
                  class="
                    pl-5
                    pr-3
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                ></th>
                <th
                  scope="col"
                  class="
                    pl-5
                    pr-3
                    py-3
                    text-left text-sm
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  <img
                    class="h-8 w-auto sm:h-8"
                    src="~/assets/images/blankly-black.svg"
                    alt=""
                  />
                </th>
                <th
                  scope="col"
                  class="
                    px-3
                    py-3
                    text-left text-sm text-gray-800
                    uppercase
                    tracking-wider
                  "
                >
                  QuantSigma
                </th>
                <th
                  scope="col"
                  class="
                    px-3
                    py-3
                    text-left text-sm text-gray-800
                    uppercase
                    tracking-wider
                  "
                >
                  Trality
                </th>
                <th
                  scope="col"
                  class="
                    px-3
                    py-3
                    text-left text-sm text-gray-800
                    uppercase
                    tracking-wider
                  "
                >
                  Tradologics
                </th>
                <th
                  scope="col"
                  class="
                    px-3
                    py-3
                    text-left text-sm text-gray-800
                    uppercase
                    tracking-wider
                  "
                >
                  QuantConnect
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="entry in table"
                :key="entry[0]"
                class="bg-white hover:bg-gray-100 transition-all"
              >
                <td
                  class="
                    pl-5
                    py-4
                    border border-gray-200
                    whitespace-nowrap
                    font-semibold
                  "
                >
                  {{ entry[0] }}
                </td>
                <td
                  v-for="(val, index) in entry.slice(1)"
                  :key="index"
                  class="px-6 border border-gray-200 py-4 whitespace-nowrap"
                >
                  <div class="text-sm text-gray-900 tracking-wide">
                    {{ val }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const data = [
  ['Backtest History', '✅ Yes', '✅ Yes', '✅ Yes', '✅ Yes', '✅ Yes'],
  ['Backtest Comparisons', '✅ Yes', '🟡 Limited', '❌ No', '❌ No', '❌ No'],
  ['Custom Configurations', '✅ Yes', '❌ No', '❌ No', '❌ No', '❌ No'],
  ['Custom Data Pipelines', '✅ Yes', '❌ No', '❌ No', '✅ Yes', '❌ No'],
  [
    'Deployment Version History',
    '✅ Yes',
    '❌ No',
    '✅ Yes',
    '❌ No',
    '🟡 Limited',
  ],
  ['Real-Time Monitoring', '✅ Yes', '✅ Yes', '✅ Yes', '✅ Yes', '✅ Yes'],
  ['Live Parameter Updates', '✅ Yes', '❌ No', '❌ No', '🟡 Limited', '❌ No'],
  ['CI/CD Features', '✅ Yes', '❌ No', '❌ No', '❌ No', '🟡 Limited'],
  ['Team Permissions', '✅ Yes', '❌ No', '❌ No', '✅ Yes', '✅ Yes'],
  [
    'Stocks, Crypto, Forex Supported',
    '✅ Yes',
    '❌ No',
    '❌ No',
    '✅ Yes',
    '🟡 Limited',
  ],
]
export default {
  data() {
    return {
      table: data,
    }
  },
}
</script>
