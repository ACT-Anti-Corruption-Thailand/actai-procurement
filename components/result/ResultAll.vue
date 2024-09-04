<script setup lang="ts"></script>

<template>
  <div class="mx-auto max-w-6xl">
    <div class="border-b border-black mb-5">
      <h4 class="font-bold">โครงการจัดซื้อจัดจ้าง</h4>
      <div
        class="flex justify-between py-5 flex-col-mb"
        v-for="(item, i) in 3"
        :key="i"
      >
        <div>
          <p class="b1 font-bold">
            สอบราคาซื้อชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02
            ),ชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02
            ),ชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02
            ),ชุดก่อสร้าง(60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02
            ) (เลขที่โครงการ : 59046019435) เลขที่โครงการ: 59046019435
          </p>
        </div>
        <div>
          <p class="b4">งบประมาณรวม (บาท)</p>
          <p class="b1">190,000,000,000</p>
        </div>
      </div>
    </div>

    <div class="border-b border-black mb-5">
      <h4 class="font-bold">หน่วยงานรัฐ</h4>
      <div class="flex justify-between py-5" v-for="(item, i) in 3" :key="i">
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

    <div class="border-b border-black mb-5">
      <h4 class="font-bold">ผู้รับจ้าง</h4>
      <div class="flex justify-between py-5" v-for="(item, i) in 3" :key="i">
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
  </div>
</template>

<style scoped></style>
