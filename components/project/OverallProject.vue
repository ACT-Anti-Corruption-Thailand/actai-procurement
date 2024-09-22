<template>
  <div>
    <h4 class="font-bold text-white mb-5">ภาพรวม</h4>
    <div class="bg-white text-black p-7 rounded-md">
      <div class="flex flex-col-mb gap-3">
        <div class="flex-1">
          <div class="flex gap-2">
            <div class="flex-1 sm:border-r">
              <p class="b2">งบประมาณรวม (บาท)</p>
              <p class="b1">120,000,000</p>
            </div>
            <div class="flex-1">
              <p class="b2">ราคากลางรวม (บาท)</p>
              <p class="b1">8,790,000</p>
            </div>
          </div>

          <div class="bg-[#F5F5F5] p-2 rounded-md my-2">
            <p class="b2">วงเงินสัญญารวม (บาท)</p>
            <h4 class="font-black">382,900,000</h4>
            <div class="flex gap-2">
              <div class="flex-1 text-[#CE5700] sm:border-r">
                <p class="b2">ต่ำกว่างบประมาณรวม</p>
                <p class="b1">xx%</p>
              </div>
              <div class="flex-1 text-[#7051B4]">
                <p class="b2">ต่ำกว่างบประมาณรวม</p>
                <p class="b1">xx%</p>
              </div>
            </div>
          </div>

          <p
            @click="isOpen = true"
            class="b4 flex gap-1 items-center text-[#0B5C90] duration-300 cursor-pointer"
          >
            <info color="#0B5C90" />
            <span>ตัวเลขนี้บ่งบอกอะไร</span>
          </p>

          <hr class="my-5" />
          <!-- <p class="b4">ที่ตั้งโครงการ*</p>
          <hr class="my-5" /> -->

          <div class="flex">
            <div class="flex-1">
              <p class="b2">วันที่ประกาศโครงการ</p>
              <p class="b1">24/08/2562</p>
            </div>
            <div class="flex-1">
              <p class="b2">ปีงบประมาณ*</p>
              <p class="b1">2556</p>
              <p class="b4">
                *ปีงบประมาณ เริ่มนับจาก ต.ค. - ก.ย. เช่น ปีงบประมาณ 2568 หมายถึง
                ต.ค. 67 - ก.ย. 68
              </p>
            </div>
          </div>

          <hr class="my-5" />
          <p class="b2 flex gap-2">
            สถานะโครงการ
            <span
              class="b4 flex gap-1 items-center text-[#0B5C90] duration-300 cursor-pointer"
            >
              <info color="#0B5C90" />
              <span>มีสถานะอะไรบ้าง</span>
            </span>
          </p>
          <p class="b1">ระหว่างดำเนินการ</p>
        </div>
        <div class="flex-1">
          <p class="b2">หน่วยงานเจ้าของโครงการ</p>
          <p class="b1">การไฟฟ้านครหลวง ฝ่ายก่อสร้าง</p>
          <p class="b3">ที่ตั้ง : กรุงเทพมหานคร</p>
          <hr class="my-5" />

          <div class="flex flex-col-mb">
            <div class="flex-1">
              <p class="b2 flex">
                วิธีการจัดหา
                <span
                  class="b4 flex gap-1 items-center text-[#0B5C90] duration-300 cursor-pointer"
                >
                  <info color="#0B5C90" />
                  <span>มีวิธีอะไรบ้าง</span></span
                >
              </p>
              <p class="b1">ประกวดราคา</p>
            </div>
            <div class="flex-1">
              <p class="b2 flex">
                ประเภทการจัดหา
                <span
                  class="b4 flex gap-1 items-center text-[#0B5C90] duration-300 cursor-pointer"
                >
                  <info color="#0B5C90" />
                  <span>มีประเภทอะไรบ้าง</span></span
                >
              </p>
              <p class="b1">จ้างก่อสร้าง</p>
            </div>
          </div>

          <hr class="my-5" />

          <p class="b2">ผู้รับจ้างที่ชนะการประมูล</p>
          <p class="b2 text-[#8E8E8E]">
            (สามารถมีได้มากกว่า 1 ราย ถ้าโครงการมีหลายสัญญา/รายการย่อย)
          </p>

          <p class="b1">
            1. บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)
          </p>
          <p class="b2 text-[#EC1C24]">เคยมีประวัติทิ้งงาน</p>
        </div>
      </div>
    </div>

    <Modal v-if="isOpen" @close="isOpen = false" title="ตัวเลขนี้บ่งบอกอะไร" />
  </div>
</template>

<script setup>
const isOpen = ref(false);
</script>

<style lang="scss" scoped></style>
