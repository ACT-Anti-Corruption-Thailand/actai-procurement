<template>
  <h4 class="font-bold text-white mb-5">ข้อมูลเจาะลึก</h4>
  <div class="bg-white rounded-md gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <h4 class="font-black">จำนวนนิติบุคคลที่เข้าร่วมในแต่ละขั้นตอน</h4>
    </div>
    <div class="p-8 rounded-b-md w-full flex flex-col-mb gap-2">
      <div
        class="px-3 py-5 bg-[#F5F5F5] rounded-md w-full text-center relative"
        v-for="(item, i) in biddingStep"
      >
        <img
          :src="`../src/images/${item.img}.svg`"
          :alt="item.name"
          class="absolute sm:inset-x-0 -left-5 sm:-top-5 mx-auto"
        />

        <div class="flex justify-between sm:flex-col items-center">
          <p class="b1 ml-5 sm:ml-0 sm:mt-3">{{ item.title }}</p>
          <h3 class="font-black">3</h3>
        </div>

        <Disclosure>
          <DisclosureButton
            class="py-2 flex items-center justify-end sm:justify-center gap-2 text-[#0B5C90] font-bold w-full"
          >
            <ChevronDownIcon class="size-2" /> ดูรายชื่อ
          </DisclosureButton>
          <DisclosurePanel class="text-gray-500">
            <div
              class="my-3 border-t border-b border-[#DADADA] py-3 flex flex-wrap items-center justify-center gap-1"
            >
              <div class="w-2 h-2 bg-black"></div>
              <p>= เข้ารอบต่อไป</p>
              <div class="w-2 h-2 bg-[#8E8E8E]"></div>
              <p class="text-[#8E8E8E]">= ตกรอบ</p>
            </div>
            <ul class="text-left list-decimal ml-5">
              <li
                v-for="c in contractorsBidding"
                :class="[
                  c.processInvolved.indexOf(item.title) != -1
                    ? 'text-black'
                    : 'text-[#8E8E8E]',
                  'b3 pb-3',
                ]"
              >
                <p>{{ c.name }}</p>
                <p>12/08/2567</p>
              </li>
            </ul>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-md gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <h4 class="font-black">ผู้ชนะการประมูล</h4>
    </div>
    <div class="p-5 rounded-b-md w-full">
      <div class="flex flex-col-mb justify-between mb-3">
        <h5 class="font-bold">ทั้งหมด x ราย ทำสัญญาจ้าง x ฉบับ</h5>
        <DownloadAndCopy />
      </div>

      <SortBy
        text="เรียงตาม"
        :list="['วงเงินสัญญา', 'วันที่ทำสัญญา']"
        class="mb-3"
      />

      <div class="overflow-auto">
        <table class="table-auto text-left w-[800px] lg:w-full">
          <thead class="bg-[#8E8E8E] b3 text-white">
            <tr class="b3">
              <th>ผู้รับจ้าง</th>
              <th class="w-20">
                เลขคุมสัญญา <br />
                <span class="b4">เลขที่สัญญา</span>
              </th>
              <th>วันที่ทำสัญญา</th>
              <th class="w-24">สถานะสัญญา</th>
              <th>วงเงินสัญญา (บาท)</th>
            </tr>
          </thead>
          <tbody class="b1">
            <template v-for="(item, i) in contractors" :key="i">
              <tr>
                <td :rowspan="item.contracts.length">
                  <a
                    target="_blank"
                    :href="`/contracter?name=${item.name.replace(/ /g, '-')}`"
                  >
                    <b> {{ item.name }}</b></a
                  >
                  <br />
                  <div class="flex items-center gap-2">
                    <img src="../../public/src/images/contractor.svg" alt="" />
                    <p class="b4 text-[#8E8E8E]">56015020021</p>
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
        </table>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-md gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <h4 class="font-black">การเสนอราคา</h4>
    </div>
    <div class="p-5 rounded-b-md w-full">
      <div class="flex flex-col-mb justify-between mb-3">
        <h5 class="font-bold">แยกตามรายการพิจารณา 1 รายการ</h5>
        <DownloadAndCopy />
      </div>

      <p class="text-right">ราคากลาง = x,xxx,xxx.xx บาท</p>

      <div class="overflow-auto">
        <table class="table-auto text-left w-[800px] lg:w-full">
          <thead class="bg-[#8E8E8E] b3 text-white">
            <tr class="b3">
              <th>รายการพิจารณา</th>
              <th class="w-24">
                ผู้เข้าเสนอราคา <br />
                <div class="flex items-center gap-2">
                  <img src="../../public/src/images/contractor.svg" alt="" />
                  <p class="b4">เลขทะเบียนนิติบุคคล</p>
                </div>
              </th>
              <th class="w-14">ราคาประมูล (บาท)</th>
              <th class="w-14">ส่วนต่างราคาผู้ชนะ</th>
              <th class="w-14">ส่วนต่างราคากลาง</th>
            </tr>
          </thead>
          <tbody class="b1">
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
                <a target="_blank" href="/contracter?name=ซิโน-ไทย">
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
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';

const biddingStep = [
  { title: 'ซื้อซอง', img: 'buy-auction' },
  { title: 'ยื่นซอง', img: 'bidding' },
  { title: 'ผ่านคุณสมบัติ', img: 'passed' },
  { title: 'เข้าเสนอราคา', img: 'e-bidding' },
];

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
        id: '60090',
        number: '84/2560',
        date: '2024-08-28',
        status: 'จัดทำสัญญา/ PO แล้ว',
        money: 3716992.05,
      },
      {
        id: '60091',
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
</script>

<style lang="scss" scoped></style>
