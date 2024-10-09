<template>
  <h4 class="font-bold text-white mb-5">ผู้รับจ้างที่ได้งาน</h4>

  <div class="bg-white rounded-10 gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <h4 class="font-bold">รายชื่อโครงการที่จัดทำ</h4>
    </div>
    <div class="p-5 rounded-b-md w-full">
      <h5 class="font-bold">แยกตามรายการพิจารณา 50 รายการ</h5>

      <div class="overflow-auto">
        <table class="table-fixed text-left table-wrapper">
          <thead class="bg-[#8E8E8E] b3 text-white">
            <tr>
              <th>ผู้รับจ้าง</th>
              <th>เลขคุมสัญญา</th>
              <th>วันที่ทำสัญญา</th>
            </tr>
          </thead>
          <tbody class="b1">
            <tr v-for="(item, i) in 10" :key="i">
              <td>บริษัท แพลนเน็ต คอมมิวนิเคชั่น เอเชีย จำกัด(มหาชน)</td>
              <td>3,000</td>
              <td>15,890,000.23</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
