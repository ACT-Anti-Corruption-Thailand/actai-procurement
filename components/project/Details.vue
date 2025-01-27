<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import type {
  ProjectContractor,
  ProjectContract,
  ProjectEstimatePrice,
} from '../../public/src/data/data_details';

const emit = defineEmits(['search']);

const props = defineProps<{
  contracters: ProjectContractor;
  contracts: ProjectContract;
  estimatePrice: ProjectEstimatePrice;
  total: number;
}>();

const biddingStep = [
  { title: 'ซื้อซอง', total: 0, img: 'buy-auction' },
  { title: 'ยื่นซอง', total: 0, img: 'bidding' },
  { title: 'ผ่านคุณสมบัติ', total: 0, img: 'passed' },
  { title: 'เข้าเสนอราคา', total: 0, img: 'e-bidding' },
];

const sumBidding = ref(0);
const sort = ref('');
const page = ref(0);

const setDate = (date) => {
  return new Date(date).toLocaleDateString('th-TH');
};

onBeforeMount(() => {
  const contracter = props.contracters.map((data) => data.processInvolved);

  contracter.forEach((element) => {
    element.forEach((element2) => {
      let b = biddingStep.filter((a) => a.title == element2);
      b[0].total += 1;
    });
  });

  sumBidding.value = biddingStep.reduce(
    (partialSum, a) => partialSum + a.total,
    0
  );
});

const searchText = ref('');

const searchResult = computed(() => {
  props.estimatePrice.forEach((element) => {
    let a = element.contractors.filter((x) => x.isWinner);
    element.winnerEstimatePrice = a.length > 0 ? a[0].biddingPrice : 0;
    element.hasWinner = a.length > 0 ? true : false;
  });

  return searchText.value != ''
    ? props.estimatePrice.filter((x) => x.name.includes(searchText.value))
    : props.estimatePrice;
});

const setParams = (type: string, val: string) => {
  const searchParams = new URLSearchParams();

  if (type == 'sortBy') sort.value = val;

  searchParams.set('sortBy', type == 'sortBy' ? val : sort.value);
  searchParams.set('sortOrder', type == 'sortOrder' ? val : 'desc');

  emit('search', searchParams.toString());
};
</script>

<template>
  <h4 class="font-bold text-white mb-5">ข้อมูลเจาะลึก</h4>
  <div class="bg-white rounded-10 gap-2 mb-3" v-if="sumBidding != 0">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <h4 class="font-black">จำนวนนิติบุคคลที่เข้าร่วมในแต่ละขั้นตอน</h4>
    </div>

    <div class="p-8 rounded-b-md w-full flex flex-col-mb gap-2">
      <template v-for="(item, i) in biddingStep">
        <div
          class="px-3 py-5 bg-[#F5F5F5] rounded-10 w-full text-center relative"
          v-if="item.total != 0"
        >
          <img
            :src="`../src/images/${item.img}.svg`"
            :alt="item.title"
            class="absolute sm:inset-x-0 -left-5 sm:-top-5 mx-auto"
          />

          <div class="flex justify-between sm:flex-col items-center">
            <p class="b1 ml-5 sm:ml-0 sm:mt-3">{{ item.title }}</p>
            <h3 class="font-black">{{ item.total }}</h3>
          </div>

          <Disclosure v-slot="{ open }" v-if="item.total != 0">
            <DisclosureButton
              class="py-2 flex items-center justify-end sm:justify-center gap-2 text-[#0B5C90] font-bold w-full"
            >
              <ChevronDownIcon
                :class="[open ? 'rotate-180 transform' : '', 'size-2']"
              />
              {{ open ? 'ปิดรายชื่อ' : 'ดูรายชื่อ' }}
            </DisclosureButton>
            <DisclosurePanel class="text-gray-500">
              <div
                class="my-3 border-t border-b border-[#DADADA] py-3 flex flex-wrap items-center justify-center gap-1"
              >
                <div class="w-2 h-2 bg-black"></div>
                <p>
                  =
                  {{
                    item.title != 'เข้าเสนอราคา'
                      ? 'เข้ารอบต่อไป'
                      : 'ผู้ชนะการประมูล'
                  }}
                </p>
                <div class="w-2 h-2 bg-[#8E8E8E]"></div>
                <p class="text-[#8E8E8E]">= ตกรอบ</p>
              </div>

              <div
                class="flex gap-2"
                v-for="(c, i) in props.contracters.filter((x) =>
                  x.processInvolved.includes(item.title)
                )"
                :class="[
                  c?.processInvolved.includes('ยื่นซอง') ||
                  c?.processInvolved.includes('ผ่านคุณสมบัติ') ||
                  c?.processInvolved.includes('เข้าเสนอราคา')
                    ? 'text-black'
                    : 'text-[#8E8E8E]',
                  'text-[#8E8E8E] mt-0.5',
                ]"
              >
                <p>
                  {{ i + 1 }}
                </p>
                <div class="b3 pb-3 text-left">
                  <a
                    target="_blank"
                    :href="`/contractor/${c.id}`"
                    class="hover:text-[#0B5C90]"
                    >{{ c?.name }}</a
                  >
                  <p
                    class="text-[#5E5E5E] flex gap-1 items-center"
                    v-if="item.title == 'ซื้อซอง' || item.title == 'ยื่นซอง'"
                  >
                    <template v-if="item.title == 'ซื้อซอง'">
                      <year color="#5E5E5E" /> {{ setDate(c?.buyDocDate) }}
                    </template>
                    <template v-else-if="item.title == 'ยื่นซอง'">
                      <year color="#5E5E5E" /> {{ setDate(c?.submitDocDate) }}
                    </template>
                  </p>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </template>
    </div>
  </div>

  <div
    class="bg-white rounded-10 gap-2 mb-3"
    v-if="props.contracts.length != 0"
  >
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <h4 class="font-black">ผู้ชนะการประมูล</h4>
    </div>
    <div class="p-5 rounded-b-md w-full">
      <div class="flex justify-between mb-3">
        <h5 class="font-bold w-3/5 sm:w-2/4">
          ทั้งหมด {{ props.contracts.length }} ราย ทำสัญญาจ้าง
          {{ props.contracts.length }} ฉบับ
        </h5>
        <DownloadAndCopy section="bidder" filterList="" part="contract" />
      </div>

      <SortBy
        text="เรียงตาม"
        :list="[
          {
            name: 'วงเงินสัญญา',
            value: 'contractMoney',
          },
          {
            name: 'วันที่ทำสัญญา',
            value: 'contractDate',
          },
        ]"
        class="mb-3"
        @change="setParams"
        @sortBy="setParams"
      />

      <div class="overflow-auto">
        <table class="table-auto text-left table-wrapper">
          <thead class="bg-[#8E8E8E] b3 text-white">
            <tr class="b3">
              <th>ผู้รับจ้าง</th>
              <th class="w-20">
                เลขคุมสัญญา <br />
                <span class="b4 text-[#DADADA]">เลขที่สัญญา</span>
              </th>
              <th>วันที่ทำสัญญา</th>
              <th class="w-24">สถานะสัญญา</th>
              <th>วงเงินสัญญา (บาท)</th>
            </tr>
          </thead>
          <tbody class="b1" v-if="props.contracts.length > 0">
            <template v-for="(item, i) in props.contracts" :key="i">
              <tr>
                <td :rowspan="item.contracts.length">
                  <a
                    target="_blank"
                    :href="`/contractor/${item.id}`"
                    class="hover:text-[#0B5C90]"
                  >
                    <b> {{ item.name }}</b></a
                  >
                  <br />
                  <div class="flex items-center gap-2">
                    <img src="../../public/src/images/contractor.svg" alt="" />
                    <p class="b4 text-[#8E8E8E]">{{ item.id }}</p>
                  </div>
                </td>

                <td>
                  {{ item.contracts[0].number }} <br />
                  <span class="text-[#5E5E5E]">
                    {{ item.contracts[0].id }}</span
                  >
                </td>
                <td>
                  {{ setDate(item.contracts[0].date) }}
                </td>
                <td
                  :class="{
                    'bg-[#054775] text-white':
                      item.contracts[0].status == 'ส่งงานล่าช้ากว่ากำหนด',
                    'bg-[#0F7979] text-white':
                      item.contracts[0].status == 'ส่งงานครบถ้วน',
                    'bg-[#1AA8A8] text-white':
                      item.contracts[0].status == 'ส่งงานตามกำหนด',
                    'bg-[#6DD5D5] text-white':
                      item.contracts[0].status == 'จัดทำสัญญา/POแล้ว',
                    'bg-[#DADADA]':
                      item.contracts[0].status == 'ระหว่างดำเนินการ',
                    'bg-[#FF8888] text-white':
                      item.contracts[0].status == 'ยกเลิกสัญญา',
                    'bg-[#EC1C24] text-white':
                      item.contracts[0].status == 'สิ้นสุดสัญญา',
                  }"
                >
                  {{ item.contracts[0].status }}
                </td>
                <td>{{ item.contracts[0].money.toLocaleString() }}</td>
              </tr>
              <template v-if="item.contracts.length > 1">
                <tr v-for="(item2, j) in item.contracts.slice(1)" :key="j">
                  <td>
                    {{ item2.id }} <br />
                    <span class="text-[#5E5E5E]"> {{ item2.number }}</span>
                  </td>
                  <td>{{ setDate(item2.date) }}</td>
                  <td
                    :class="{
                      'bg-[#6DD5D5]': item2.status == 'จัดทำสัญญา/ PO แล้ว',
                    }"
                  >
                    {{ item2.status }}
                  </td>
                  <td>{{ item2.money.toLocaleString() }}</td>
                </tr>
              </template>
            </template>
          </tbody>
          <tbody class="b1 text-center" v-else>
            <tr>
              <td colspan="5">ไม่พบข้อมูล</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div
    class="bg-white rounded-10 gap-2 mb-3"
    v-if="props.estimatePrice.length != 0"
  >
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <h4 class="font-black mb-3">การเสนอราคา</h4>

      <p class="b2 text-[#7F7F7F]">ตัวกรอง</p>
      <div class="relative">
        <input
          v-model="searchText"
          type="text"
          class="input-text h-full"
          placeholder="กรองด้วยชื่อรายการพิจารณา"
        />
        <SearchIcon color="#000000" class="absolute inset-y-0 my-auto left-2" />
      </div>
    </div>
    <div class="p-5 rounded-b-md w-full">
      <div class="flex justify-between mb-3">
        <h5 class="font-bold w-3/5">
          แยกตามรายการพิจารณา {{ searchResult.length }} รายการ
        </h5>
        <DownloadAndCopy
          section="bidder"
          filterList=""
          part="item-estimate-price"
        />
      </div>

      <div class="text-right" v-if="props.estimatePrice.length > 0">
        <p v-if="props.total != 0">
          ราคากลาง = {{ props.total.toLocaleString() }} บาท
        </p>
        <p v-else>ไม่มีข้อมูลราคากลาง</p>
      </div>

      <div class="overflow-auto">
        <table class="table-auto text-left table-wrapper">
          <thead class="bg-[#8E8E8E] b3 text-white">
            <tr class="b3">
              <th>รายการพิจารณา</th>
              <th class="w-24">
                <span class="text-white">ผู้เข้าเสนอราคา</span> <br />
                <div class="flex items-center gap-2">
                  <ProjectIconGuide
                    :data="{
                      entityNo: '= เลขทะเบียนนิติบุคคล',
                    }"
                    color="#D9D9D9"
                  />
                </div>
              </th>
              <th class="w-[85px]">ราคาประมูล (บาท)</th>
              <th class="w-[85px]">ส่วนต่างราคาผู้ชนะ</th>
              <th class="w-[85px]">ส่วนต่างราคากลาง</th>
            </tr>
          </thead>
          <tbody class="b1" v-if="props.estimatePrice.length > 0">
            <template v-for="(data, i) in searchResult">
              <tr>
                <td
                  :rowspan="data.contractors.length"
                  class="w-20 border-b-black"
                >
                  {{ data.name }}
                </td>

                <td
                  class="w-40"
                  :class="{ 'border-b-black': data.contractors.length == 1 }"
                >
                  <div
                    class="bg-black b5 rounded-10 text-white py-0.5 px-2.5 w-fit font-bold"
                    v-if="data.contractors[0].isWinner"
                  >
                    <img
                      src="../../public/src/images/winner.svg"
                      alt="winner"
                      class="mr-1 inline-block"
                    />ผู้ชนะ
                  </div>
                  <a
                    target="_blank"
                    :href="`/contractor/${data.contractors[0].id}`"
                    class="hover:text-[#0B5C90]"
                    :class="{ 'font-bold': data.contractors[0].isWinner }"
                  >
                    {{ data.contractors[0].name }}
                  </a>

                  <div class="flex items-center gap-2">
                    <img src="../../public/src/images/contractor.svg" alt="" />
                    <p class="b4 text-[#8E8E8E]">
                      {{ data.contractors[0].id }}
                    </p>
                  </div>
                </td>

                <td
                  :class="{
                    'font-bold': data.contractors[0].isWinner,
                    'border-b-black': data.contractors.length == 1,
                  }"
                >
                  {{ data.contractors[0].biddingPrice.toLocaleString() }}
                </td>

                <td
                  class="text-right"
                  :class="[
                    {
                      'border-b-black': data.contractors.length == 1,
                      'font-bold': data.contractors[0].isWinner,
                      'text-[#7051B4] bg-[#F4EFFF]':
                        data.contractors[0].biddingPrice >
                        data.winnerEstimatePrice,
                      'text-[#CE5700] bg-[#FFFDEF]':
                        data.contractors[0].biddingPrice <
                        data.winnerEstimatePrice,
                      'text-[#1F1F1F]':
                        data.contractors[0].biddingPrice ==
                        data.winnerEstimatePrice,
                      '!bg-transparent': !data.hasWinner,
                    },
                  ]"
                >
                  <div>
                    <p class="b2">
                      <template v-if="data.hasWinner">
                        <span
                          v-if="
                            data.contractors[0].biddingPrice >
                            data.winnerEstimatePrice
                          "
                          >สูงกว่า</span
                        >
                        <span
                          v-else-if="
                            data.contractors[0].biddingPrice <
                            data.winnerEstimatePrice
                          "
                          >ต่ำกว่า</span
                        >
                        <span v-else>-</span>
                      </template>
                      <span v-else>-</span>
                    </p>

                    <p
                      class="b1"
                      v-if="
                        data.hasWinner &&
                        data.contractors[0].biddingPrice !=
                          data.winnerEstimatePrice
                      "
                    >
                      {{
                        (
                          ((data.contractors[0].biddingPrice -
                            data.winnerEstimatePrice) /
                            data.winnerEstimatePrice) *
                          100
                        ).toFixed(2)
                      }}%
                    </p>
                  </div>
                </td>

                <td
                  class="text-right"
                  :class="[
                    {
                      'border-b-black': data.contractors.length == 1,
                      'font-bold': data.contractors[0].isWinner,
                      'text-[#7051B4] bg-[#F4EFFF]':
                        data.contractors[0].biddingPrice > props.total,
                      'text-[#CE5700] bg-[#FFFDEF]':
                        data.contractors[0].biddingPrice < props.total,
                      'text-[#1F1F1F]':
                        data.contractors[0].biddingPrice == props.total,
                      '!bg-transparent': props.total == 0,
                    },
                  ]"
                >
                  <div>
                    <template v-if="props.total != 0">
                      <p class="b2">
                        <span
                          v-if="data.contractors[0].biddingPrice > props.total"
                          >สูงกว่า</span
                        >
                        <span
                          v-else-if="
                            data.contractors[0].biddingPrice < props.total
                          "
                          >ต่ำกว่า</span
                        >
                        <span v-else>เท่ากัน</span>
                      </p>
                      <p
                        class="b1"
                        v-if="data.contractors[0].biddingPrice != props.total"
                      >
                        {{
                          (
                            ((props.total - data.contractors[0].biddingPrice) /
                              props.total) *
                            100
                          ).toFixed(2)
                        }}%
                      </p>
                    </template>
                    <template v-else>-</template>
                  </div>
                </td>
              </tr>

              <tr
                v-for="(item, j) in data.contractors.slice(
                  1,
                  data.contractors.length
                )"
              >
                <td
                  class="w-40"
                  :class="{
                    'border-b-black':
                      j + 1 ==
                      data.contractors.slice(1, data.contractors.length).length,
                  }"
                >
                  <div
                    class="bg-black b5 rounded-10 text-white py-0.5 px-2.5 w-fit font-bold"
                    v-if="item.isWinner"
                  >
                    <img
                      src="../../public/src/images/winner.svg"
                      alt="winner"
                      class="mr-1 inline-block"
                    />
                    ผู้ชนะ
                  </div>
                  <a
                    target="_blank"
                    :href="`/contractor/${item.id}`"
                    class="hover:text-[#0B5C90]"
                    :class="{ 'font-bold': item.isWinner }"
                  >
                    {{ item.name }}
                  </a>
                  <div class="flex items-center gap-2">
                    <img src="../../public/src/images/contractor.svg" alt="" />
                    <p class="b4 text-[#8E8E8E]">{{ item.id }}</p>
                  </div>
                </td>

                <td
                  :class="{
                    'font-bold': item.isWinner,
                    'border-b-black':
                      j + 1 ==
                      data.contractors.slice(1, data.contractors.length).length,
                  }"
                >
                  {{ item.biddingPrice.toLocaleString() }}
                </td>

                <td
                  class="text-right"
                  :class="[
                    {
                      'border-b-black':
                        j + 1 ==
                        data.contractors.slice(1, data.contractors.length)
                          .length,
                      'font-bold': item.isWinner,
                      'text-[#7051B4] bg-[#F4EFFF]':
                        item.biddingPrice > data.winnerEstimatePrice,
                      'text-[#CE5700] bg-[#FFFDEF]':
                        item.biddingPrice < data.winnerEstimatePrice,
                      'text-[#1F1F1F]':
                        item.biddingPrice == data.winnerEstimatePrice,
                      '!bg-transparent': !data.hasWinner,
                    },
                  ]"
                >
                  <div>
                    <p class="b2">
                      <template v-if="data.hasWinner">
                        <span
                          v-if="item.biddingPrice > data.winnerEstimatePrice"
                          >สูงกว่า</span
                        >
                        <span
                          v-else-if="
                            item.biddingPrice < data.winnerEstimatePrice
                          "
                          >ต่ำกว่า</span
                        >
                        <span v-else>เท่ากัน</span>
                      </template>
                      <span v-else>-</span>
                    </p>
                    <p
                      class="b1"
                      v-if="
                        data.hasWinner &&
                        item.biddingPrice != data.winnerEstimatePrice
                      "
                    >
                      {{
                        (
                          ((item.biddingPrice - data.winnerEstimatePrice) /
                            data.winnerEstimatePrice) *
                          100
                        ).toFixed(2)
                      }}%
                    </p>
                  </div>
                </td>

                <td
                  class="text-right"
                  :class="[
                    {
                      'border-b-black':
                        j + 1 ==
                        data.contractors.slice(1, data.contractors.length)
                          .length,
                      'font-bold': item.isWinner,
                      'text-[#7051B4] bg-[#F4EFFF]':
                        item.biddingPrice > props.total,
                      'text-[#CE5700] bg-[#FFFDEF]':
                        item.biddingPrice < props.total,
                      'text-[#1F1F1F]': item.biddingPrice == props.total,
                      '!bg-transparent': props.total == 0,
                    },
                  ]"
                >
                  <div>
                    <template v-if="props.total != 0">
                      <p class="b2">
                        <span v-if="item.biddingPrice > props.total"
                          >สูงกว่า</span
                        >
                        <span v-else-if="item.biddingPrice < props.total"
                          >ต่ำกว่า</span
                        >
                        <span v-else>เท่ากัน</span>
                      </p>
                      <p class="b1" v-if="item.biddingPrice != props.total">
                        {{
                          (
                            ((props.total - item.biddingPrice) / props.total) *
                            100
                          ).toFixed(2)
                        }}%
                      </p>
                    </template>
                    <template v-else>-</template>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
          <tbody class="b1 text-center" v-else>
            <tr>
              <td colspan="5">ไม่พบข้อมูล</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-text {
  padding-left: 30px;
  background: white;
}
</style>
