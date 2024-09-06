<template>
  <h4 class="font-bold text-white mb-5">ข้อมูลเจาะลึก</h4>
  <div class="bg-white rounded-md gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <h4 class="font-bold">จำนวนนิติบุคคลที่เข้าร่วมในแต่ละขั้นตอน</h4>
    </div>
    <div class="p-5 rounded-b-md w-full flex gap-2">
      <div
        class="p-5 bg-[#F5F5F5] rounded-md w-full text-center"
        v-for="item in 4"
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
        <table class="table-fixed text-left w-[800px] lg:w-full">
          <thead class="bg-[#8E8E8E] b3 text-white">
            <tr>
              <th>ผู้รับจ้าง</th>
              <th>เลขคุมสัญญา</th>
              <th>วันที่ทำสัญญา</th>
              <th>สถานะสัญญา</th>
              <th>วงเงินสัญญา (บาท)</th>
            </tr>
          </thead>
          <tbody class="b1">
            <tr v-for="(item, i) in 10" :key="i">
              <td>
                บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)
              </td>
              <td>600905017993</td>
              <td>25/09/2560</td>
              <td>จัดทำสัญญา/ PO แล้ว</td>
              <td>3,038,800.09</td>
            </tr>
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
      <h5 class="font-bold">แยกตามรายการพิจารณา 50 รายการ</h5>

      <div class="overflow-auto">
        <table class="table-fixed text-left w-[800px] lg:w-full">
          <thead class="bg-[#8E8E8E] b3 text-white">
            <tr>
              <th>ผู้รับจ้าง</th>
              <th>เลขคุมสัญญา</th>
              <th>วันที่ทำสัญญา</th>
              <th>สถานะสัญญา</th>
              <th>วงเงินสัญญา (บาท)</th>
            </tr>
          </thead>
          <tbody class="b1">
            <tr v-for="(item, i) in 10" :key="i">
              <td>
                บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)
              </td>
              <td>600905017993</td>
              <td>25/09/2560</td>
              <td>จัดทำสัญญา/ PO แล้ว</td>
              <td>3,038,800.09</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
</script>

<style lang="scss" scoped></style>
