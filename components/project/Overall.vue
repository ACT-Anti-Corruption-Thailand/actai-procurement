<template>
  <div>
    <h4 class="font-bold text-white mb-5">ภาพรวม</h4>
    <div class="bg-white text-black p-7 rounded-md">
      <div class="flex flex-col-mb gap-2">
        <div>
          <div class="flex">
            <div class="flex-1">
              <p class="b2">งบประมาณรวม (บาท)</p>
              <p class="b1">607,588,000</p>
            </div>
            <div class="flex-1">
              <p class="b2">ราคากลางรวม (บาท)</p>
              <p class="b1">607,588,000</p>
            </div>
          </div>

          <div class="bg-[#F5F5F5] p-2 rounded-md">
            <p class="b2">วงเงินสัญญารวม (บาท)</p>
            <h4 class="font-bold">385,512,898</h4>
            <div class="flex">
              <div class="flex-1">
                <p class="b2">ต่ำกว่างบประมาณรวม</p>
                <p class="b1">xx%</p>
              </div>
              <div class="flex-1">
                <p class="b2">ต่ำกว่างบประมาณรวม</p>
                <p class="b1">xx%</p>
              </div>
            </div>
          </div>

          <p class="b4">ตัวเลขนี้บ่งบอกอะไร</p>

          <hr class="my-5" />
          <p class="b4">ที่ตั้งโครงการ*</p>
          <hr class="my-5" />

          <div class="flex">
            <div class="flex-1">
              <p class="b2">วันที่ประกาศโครงการ</p>
              <p class="b1">10/11/2557</p>
            </div>
            <div class="flex-1">
              <p class="b2">ปีงบประมาณ*</p>
              <p class="b1">2558</p>
              <p class="b4">
                *ปีงบประมาณ เริ่มนับจาก ต.ค. - ก.ย. เช่น ปีงบประมาณ 2568 หมายถึง
                ต.ค. 67 - ก.ย. 68
              </p>
            </div>
          </div>

          <hr class="my-5" />
          <p class="b2">สถานะโครงการ</p>
          <p class="b1">ระหว่างดำเนินการ</p>
        </div>
        <div>
          <p class="b2">หน่วยงานเจ้าของโครงการ</p>
          <p class="b1">สำนักงานเลขาธิการสภาผู้แทนราษฎร</p>
          <p class="b3">ที่ตั้ง : กรุงเทพมหานคร</p>
          <hr class="my-5" />

          <div class="flex">
            <div>
              <p class="b2">วิธีการจัดหา</p>
              <p class="b1">ประกวดราคา</p>
            </div>
            <div>
              <p class="b2">ประเภทการจัดหา</p>
              <p class="b1">จ้างก่อสร้าง</p>
            </div>
          </div>

          <hr class="my-5" />

          <p class="b2">ผู้รับจ้างที่ชนะการประมูล</p>
          <p class="b2">
            (สามารถมีได้มากกว่า 1 ราย ถ้าโครงการมีหลายสัญญา/รายการย่อย)
          </p>

          <p v-for="(item, i) in 5" class="b1" :key="i">
            {{ i + 1 }} บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด
            (มหาชน)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
