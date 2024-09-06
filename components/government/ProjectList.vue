<template>
  <h4 class="font-bold text-white mb-5">ข้อมูลเจาะลึก</h4>

  <div class="bg-white rounded-md gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <h4 class="font-bold">รายชื่อโครงการที่จัดทำ</h4>
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
