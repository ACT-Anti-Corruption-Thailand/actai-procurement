<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import type {
  ProjectContractor,
  ProjectContract,
  ProjectEstimatePrice,
} from '../../public/src/data/data_details';

const props = defineProps<{
  contracters: ProjectContractor;
  contracts: ProjectContract;
  estimatePrice: ProjectEstimatePrice;
}>();

const biddingStep = [
  { title: 'ซื้อซอง', total: 0, img: 'buy-auction' },
  { title: 'ยื่นซอง', total: 0, img: 'bidding' },
  { title: 'ผ่านคุณสมบัติ', total: 0, img: 'passed' },
  { title: 'เข้าเสนอราคา', total: 0, img: 'e-bidding' },
];

const sum = biddingStep.reduce((partialSum, a) => partialSum + a.total, 0);

const contractorsBidding = [
  {
    id: '10',
    name: 'บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)',
    isWinner: true,
    processInvolved: ['ซื้อซอง', 'ยื่นซอง', 'ผ่านคุณสมบัติ', 'เข้าเสนอราคา'],
  },
  {
    id: '11',
    name: 'บริษัท โกลด์ อินฟินิท จำกัด',
    isWinner: false,
    processInvolved: ['ซื้อซอง', 'ยื่นซอง', 'ผ่านคุณสมบัติ', 'เข้าเสนอราคา'],
  },
  {
    id: '12',
    name: 'บริษัท เออาร์ดี เอ็นจิเนียริ่ง ซิสเต็มส์ จำกัด',
    isWinner: false,
    processInvolved: ['ซื้อซอง', 'ยื่นซอง'],
  },
];

const contractors = [
  {
    id: '10',
    name: 'บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)',
    contracts: [
      {
        id: '600906009000',
        number: '84/2560',
        date: '2024-08-28',
        status: 'จัดทำสัญญา/ PO แล้ว',
        money: 3716992.05,
      },
      {
        id: '600916009002',
        number: '85/2560',
        date: '2024-09-28',
        status: 'จัดทำสัญญา/ PO แล้ว',
        money: 3716992.05,
      },
    ],
  },
  {
    id: '11',
    name: 'บริษัท โกลด์ อินฟินิท จำกัด',
    contracts: [
      {
        id: '60090',
        number: '84/2560',
        date: '2024-08-28',
        status: 'จัดทำสัญญา/ PO แล้ว',
        money: 3716992.05,
      },
    ],
  },
  {
    id: '12',
    name: 'บริษัท โกลด์ อินฟินิท จำกัด',
    contracts: [
      {
        id: '60090',
        number: '84/2560',
        date: '2024-08-28',
        status: 'จัดทำสัญญา/ PO แล้ว',
        money: 3716992.05,
      },
    ],
  },
];

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
});
</script>

<template>
  <h4 class="font-bold text-white mb-5">ข้อมูลเจาะลึก</h4>
  <div class="bg-white rounded-10 gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <h4 class="font-black">จำนวนนิติบุคคลที่เข้าร่วมในแต่ละขั้นตอน</h4>
    </div>

    <div v-if="sum == 0" class="p-8 b1 text-center">ไม่พบข้อมูล</div>
    <div v-else class="p-8 rounded-b-md w-full flex flex-col-mb gap-2">
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

              <div class="flex gap-2" v-for="(c, i) in props.contracters">
                <p class="text-[#8E8E8E] mt-0.5">{{ i + 1 }}</p>
                <div
                  :class="[
                    c?.processInvolved.indexOf(item.name) != -1
                      ? 'text-black'
                      : 'text-[#8E8E8E]',
                    'b3 pb-3 text-left',
                  ]"
                >
                  <p>{{ c?.name }}</p>
                  <p
                    class="text-[#5E5E5E] flex gap-1 items-center"
                    v-if="item.title == 'ซื้อซอง' || item.title == 'ยื่นซอง'"
                  >
                    <year color="#5E5E5E" /> 12/08/2567
                  </p>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </template>
    </div>
  </div>

  <div class="bg-white rounded-10 gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <h4 class="font-black">ผู้ชนะการประมูล</h4>
    </div>
    <div class="p-5 rounded-b-md w-full">
      <div class="flex justify-between mb-3">
        <h5 class="font-bold w-3/5 sm:w-2/4">
          ทั้งหมด {{ props.contracts.length }} ราย ทำสัญญาจ้าง x ฉบับ
        </h5>
        <!-- <DownloadAndCopy /> -->
      </div>

      <!-- <SortBy
        text="เรียงตาม"
        :list="['วงเงินสัญญา', 'วันที่ทำสัญญา']"
        class="mb-3"
      /> -->

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
                  <a target="_blank" :href="`/contractor/${item.id}`">
                    <b> {{ item.name }}</b></a
                  >
                  <br />
                  <div class="flex items-center gap-2">
                    <img src="../../public/src/images/contractor.svg" alt="" />
                    <p class="b4 text-[#8E8E8E]">{{ item.id }}</p>
                  </div>
                </td>

                <td>
                  {{ item.contracts[0].id }} <br />
                  <span class="text-[#5E5E5E]">
                    {{ item.contracts[0].number }}</span
                  >
                </td>
                <td>
                  {{ setDate(item.contracts[0].date) }}
                </td>
                <td
                  :class="{
                    'bg-[#6DD5D5]':
                      item.contracts[0].status == 'จัดทำสัญญา/ PO แล้ว',
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

  <div class="bg-white rounded-10 gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <h4 class="font-black mb-3">การเสนอราคา</h4>

      <p class="b2 text-[#7F7F7F]">ตัวกรอง</p>
      <div class="relative">
        <input
          type="text"
          class="input-text h-full"
          placeholder="กรองด้วยชื่อรายการ/ผู้เข้าเสนอราคา/เลขทะเบียนนิติบุคคล"
        />
        <SearchIcon color="#000000" class="absolute inset-y-0 my-auto left-2" />
      </div>
    </div>
    <div class="p-5 rounded-b-md w-full">
      <div class="flex justify-between mb-3">
        <h5 class="font-bold w-3/5">
          แยกตามรายการพิจารณา {{ props.estimatePrice.length }} รายการ
        </h5>
        <!-- <DownloadAndCopy /> -->
      </div>

      <p class="text-right" v-if="props.estimatePrice.length > 0">
        ราคากลาง = x,xxx,xxx.xx บาท
      </p>

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
            <tr>
              <td :rowspan="4" class="w-20">
                เครื่องวัดส่วนประกอบของร่างกายแบบความต้านทานกระแสไฟฟ้า
              </td>

              <td class="w-40">
                บริษัท อิตาเลียนไทย ดีเวล๊อปเมนต์ จำกัด (มหาชน)
                <div class="flex items-center gap-2">
                  <img src="../../public/src/images/contractor.svg" alt="" />
                  <p class="b4 text-[#8E8E8E]">56015020021</p>
                </div>
              </td>

              <td>2,790,000</td>
              <td class="bg-[#FFFDEF] text-[#CE5700]">
                ต่ำกว่า 7.02% <br /><span class="b4">210,800 บาท</span>
              </td>
              <td class="bg-[#FFFDEF] text-[#CE5700]">
                ต่ำกว่า 7.02% <br /><span class="b4">210,800 บาท</span>
              </td>
            </tr>
            <tr>
              <td class="w-40">
                บริษัท ซินเท็ค คอนสตรัคชั่น จำกัด (มหาชน)
                <div class="flex items-center gap-2">
                  <img src="../../public/src/images/contractor.svg" alt="" />
                  <p class="b4 text-[#8E8E8E]">56015020021</p>
                </div>
              </td>

              <td>2,921,022</td>
              <td class="bg-[#FFFDEF] text-[#CE5700]">
                ต่ำกว่า 2.66% <br /><span class="b4">79,778 บาท</span>
              </td>
              <td class="bg-[#FFFDEF] text-[#CE5700]">
                ต่ำกว่า 2.66% <br /><span class="b4">79,778 บาท</span>
              </td>
            </tr>
            <tr>
              <td class="w-40 font-bold">
                <div
                  class="rounded-full bg-black flex items-center font-bold text-white gap-1 w-fit px-1"
                >
                  <img src="../../public/src/images/winner.svg" alt="winner" />
                  <p class="b5">ผู้ชนะ</p>
                </div>
                <a target="_blank" href="/contractor?name=ซิโน-ไทย">
                  บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด
                  (มหาชน)
                </a>
                <div class="flex items-center gap-2">
                  <img src="../../public/src/images/contractor.svg" alt="" />
                  <p class="b4 text-[#8E8E8E] font-normal">56015020021</p>
                </div>
              </td>

              <td class="font-bold">3,038,800</td>
              <td class="font-bold">0</td>
              <td class="bg-[#F4EFFF] text-[#7051B4] font-bold">
                สูงกว่า 1.27% <br /><span class="b4">38,000 บาท</span>
              </td>
            </tr>
            <tr>
              <td class="w-40">
                เพาเวอร์ไลน์ เอ็นจิเนียริ่ง
                <div class="flex items-center gap-2">
                  <img src="../../public/src/images/contractor.svg" alt="" />
                  <p class="b4 text-[#8E8E8E]">56015020021</p>
                </div>
              </td>

              <td>4,987,000</td>
              <td class="bg-[#F4EFFF] text-[#7051B4]">
                สูงกว่า 66.19% <br /><span class="b4">1,986,200 บาท</span>
              </td>
              <td class="bg-[#F4EFFF] text-[#7051B4]">
                สูงกว่า 66.19% <br /><span class="b4">1,986,200 บาท</span>
              </td>
            </tr>
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
