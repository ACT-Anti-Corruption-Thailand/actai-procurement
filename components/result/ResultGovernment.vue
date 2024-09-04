<template>
  <div class="">
    <h4 class="font-bold">หน่วยงานรัฐ</h4>
    <div class="flex justify-between py-5" v-for="(item, i) in 10" :key="i">
      <div>
        <p class="b1 font-bold">การไฟฟ้านครหลวง ฝ่ายก่อสร้าง</p>
      </div>
      <div class="flex sm:gap-10 text-right flex-col-mb">
        <div>
          <p class="b4">โครงการทั้งหมด</p>
          <p class="b1">190,000</p>
        </div>
        <div class="text-[#EC1C24]">
          <p class="b4">โครงการเสี่ยงทุจริต</p>
          <p class="b1">10,000 (xx.x%)</p>
        </div>
        <div>
          <p class="b4">งบประมาณรวม (บาท)</p>
          <p class="b1">190,000,000</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
