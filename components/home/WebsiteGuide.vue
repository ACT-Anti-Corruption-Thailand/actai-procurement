<script setup></script>

<template>
  <div class="bg-black py-10 px-3">
    <div class="text-center text-white">
      <h3 class="font-bold mb-10">เว็บไซต์นี้ทำอะไรได้บ้าง</h3>
      <div
        class="flex flex-col sm:flex-row justify-center max-w-5xl mx-auto gap-3"
      >
        <div class="w-full sm:w-2/5 text-left">
          <div
            class="rounded-full b2 p-2 border w-[30px] h-[30px] flex justify-center items-center"
          >
            1
          </div>
          <h4 class="font-bold">
            ค้นหาโครงการจัดซื้อจัดจ้างภาครัฐ/หน่วยงานรัฐ/ผู้รับจ้างที่สนใจ
          </h4>

          <p class="b1">สามารถค้นได้จากคำหลายประเภท เช่น</p>
          <ul class="b1 list-disc ml-5">
            <li>ชื่อ หรือ คำในชื่อโครงการ/หน่วยงานรัฐ/ผู้รับจ้าง</li>
            <li>เลขที่โครงการ</li>
            <li>จังหวัดที่ตั้งของโครงการ</li>
            <li>เลขทะเบียนนิติบุคคลของผู้รับจ้าง</li>
          </ul>
        </div>
        <div class="w-full sm:w-3/5 text-left">
          <p class="b2">
            ตัวอย่างคำที่พบบ่อยในชื่อโครงการปีงบประมาณ*ล่าสุด (2568)
          </p>
          <p class="b4">
            *ปีงบประมาณ เริ่มนับจาก ต.ค. - ก.ย. เช่น ปีงบประมาณ 2568 หมายถึง
            ต.ค. 67 - ก.ย. 68
          </p>
          <div class="overflow-auto">
            <div class="flex gap-3 gap-3">
              <div v-for="item in 3">
                <div
                  class="bg-white p-5 rounded-xl bg-black w-[220px] text-black text-left"
                >
                  <p class="b1 font-bold mb-3">
                    บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด
                    (มหาชน)
                  </p>
                  <p class="b1">งบประมาณรวม 190,000,000,000 บาท</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
