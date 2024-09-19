<template>
  <h4 class="font-bold text-white mb-5">ผู้รับจ้างที่ได้งาน</h4>

  <div class="bg-white rounded-md gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <FilterPopup />
    </div>
    <div class="p-5 rounded-b-md w-full">
      <div class="flex items-center justify-between mb-3 flex-col-mb">
        <h5 class="font-black">
          ทั้งหมด xx,xxx ราย วงเงินสัญญา xx,xxx,xxx บาท
        </h5>
        <DownloadAndCopy />
      </div>

      <div class="overflow-auto">
        <table class="table-auto text-left w-[800px] lg:w-full">
          <thead class="bg-[#8E8E8E] b3 text-white">
            <tr>
              <th>ลำดับ</th>
              <th>ผู้รับจ้าง</th>
              <th>จำนวนโครงการ</th>
              <th>วงเงินสัญญารวม</th>
            </tr>
          </thead>
          <tbody class="b1">
            <tr v-for="(item, i) in 10" :key="i">
              <td>{{ i + 1 }}</td>
              <td class="font-bold">
                บริษัท แพลนเน็ต คอมมิวนิเคชั่น เอเชีย จำกัด (มหาชน)
              </td>
              <td>3,000</td>
              <td>15,890,000.23</td>
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
