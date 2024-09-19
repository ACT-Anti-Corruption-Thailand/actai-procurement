<template>
  <h4 class="font-bold text-white mb-5">ข้อมูลเจาะลึก</h4>
  <div class="bg-white rounded-md gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <h4 class="font-bold">จำนวนนิติบุคคลที่เข้าร่วมในแต่ละขั้นตอน</h4>
    </div>
    <div class="p-5 rounded-b-md w-full flex gap-2">
      <div
        class="p-5 bg-[#F5F5F5] rounded-md w-full text-center"
        v-for="(item, i) in 4"
      >
        <p class="b1">ซื้อซอง</p>
        <h3 class="font-bold">55</h3>

        <Disclosure>
          <DisclosureButton class="py-2"> ดูรายชื่อ </DisclosureButton>
          <DisclosurePanel class="text-gray-500">
            Yes! You can purchase a license that you can share with your entire
            team.
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-md gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <h4 class="font-bold">ผู้ชนะการประมูล</h4>
    </div>
    <div class="p-5 rounded-b-md w-full">
      <h5 class="font-bold">ทั้งหมด x ราย ทำสัญญาจ้าง x ฉบับ</h5>

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
                  <b> {{ item.name }}</b> <br />
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
      <h4 class="font-bold">การเสนอราคา</h4>
    </div>
    <div class="p-5 rounded-b-md w-full">
      <h5 class="font-bold">แยกตามรายการพิจารณา 1 รายการ</h5>
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
              <th class="w-10">ราคาประมูล (บาท)</th>
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
              <td>ต่ำกว่า 7.02%</td>
              <td>ต่ำกว่า 7.02%</td>
            </tr>
            <tr>
              <td class="w-40">
                บริษัท ซินเท็ค คอนสตรัคชั่น จำกัด (มหาชน)
                <div class="flex items-center gap-2">
                  <img src="../../public/src/images/contractor.svg" alt="" />
                  <p class="b4 text-[#8E8E8E]">56015020021</p>
                </div>
              </td>

              <td>2,790,000</td>
              <td>ต่ำกว่า 7.02%</td>
              <td>ต่ำกว่า 7.02%</td>
            </tr>
            <tr>
              <td class="w-40 font-bold">
                บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)
                <div class="flex items-center gap-2">
                  <img src="../../public/src/images/contractor.svg" alt="" />
                  <p class="b4 text-[#8E8E8E] font-normal">56015020021</p>
                </div>
              </td>

              <td class="font-bold">2,790,000</td>
              <td class="font-bold">ต่ำกว่า 7.02%</td>
              <td class="font-bold">ต่ำกว่า 7.02%</td>
            </tr>
            <tr>
              <td class="w-40">
                เพาเวอร์ไลน์ เอ็นจิเนียริ่ง
                <div class="flex items-center gap-2">
                  <img src="../../public/src/images/contractor.svg" alt="" />
                  <p class="b4 text-[#8E8E8E]">56015020021</p>
                </div>
              </td>

              <td>2,790,000</td>
              <td>ต่ำกว่า 7.02%</td>
              <td>ต่ำกว่า 7.02%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';

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
