<template>
  <div>
    <h4 class="font-bold text-white mb-5">ข้อมูลทั่วไป</h4>
    <div class="bg-white text-black p-7 rounded-md">
      <div>
        <div>
          <p class="b2">ที่อยู่</p>
          <p class="b1">
            อาคารซิโน-ไทย ทาวเวอร์ ชั้น 29-30, 32/59-60 ถนนอโศก สุขุมวิท 21
            แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพมหานคร10110
          </p>
        </div>

        <hr class="my-5" />

        <div class="flex">
          <div class="flex-1">
            <p class="b2">เลขทะเบียนนิติบุคคล</p>
            <p class="b1">0103515022863</p>
          </div>
          <div class="flex-1">
            <p class="b2">ประเภทการจดทะเบียน</p>
            <p class="b1">บริษัทจำกัด</p>
          </div>
        </div>

        <hr class="my-5" />

        <div class="flex">
          <div class="flex-1">
            <p class="b2">ทุนจดทะเบียน*</p>
            <p class="b1">200,000 บาท</p>
          </div>
          <div class="flex-1">
            <p class="b2">วันจดทะเบียน</p>
            <p class="b1">10/11/2557</p>
          </div>
        </div>

        <hr class="my-5" />

        <div class="flex">
          <div class="flex-1">
            <p class="b2">หมวดธุรกิจ*</p>
            <p class="b1">
              การผลิตเครื่องจักรอื่นๆที่ใช้งานทั่วไปซึ่งมิได้จัดประเภทไว้ในที่อื่น
            </p>
            <p class="b4">
              หมายเหตุ:
              แสดงเฉพาะหมวดธุรกิจที่จดทะเบียนและหมวดที่ยื่นบัญชีปีล่าสุด
              ซึ่งอาจไม่ใช่ทั้งหมด หากมีการจดทะเบียนหมวดอื่นๆ เพิ่ม
            </p>
          </div>
          <div class="flex-1">
            <p class="b2">สถานภาพ</p>
            <p class="b1">ยังดำเนินกิจการอยู่</p>
          </div>
        </div>

        <hr class="my-5" />
        <p class="b2">ประวัติการเปลี่ยนแปลง</p>
        <ul class="b1 list-disc ml-5">
          <li>เปลี่ยนชื่อนิติบุคคลจาก xxx เป็น yyy</li>
          <li>เปลี่ยนแปลงทุนจดทะเบียนจาก xxx เป็น yyy</li>
        </ul>
      </div>
    </div>

    <div class="bg-white rounded-md gap-2 my-3">
      <div class="p-7">
        <h5 class="font-bold">รายชื่อกรรมการ/ผู้เป็นหุ้นส่วน</h5>

        <div class="flex gap-2">
          <div class="flex-1">
            <hr class="my-5" />
            <p class="b2">กรรมการ/ผู้เป็นหุ้นส่วน</p>
            <p v-for="(item, i) in 10" class="b1" :key="i">
              {{ i + 1 }} XXX XXX
            </p>
          </div>
          <div class="flex-1">
            <hr class="my-5" />
            <p class="b2">กรรมการลงชื่อผูกพัน/หุ้นส่วนผู้จัดการ</p>
            <p v-for="(item, i) in 10" class="b1" :key="i">
              {{ i + 1 }} XXX XXX
            </p>
          </div>
        </div>
      </div>
      <div class="p-5 bg-[#F5F5F5] rounded-b-md w-full">
        <p class="font-bold">รายชื่อและวาระย้อนหลัง</p>

        <div class="flex gap-2">
          <div class="flex-1">
            <hr class="my-5" />
            <p class="b2">กรรมการ/ผู้เป็นหุ้นส่วน</p>
            <p v-for="(item, i) in 10" class="b1" :key="i">
              {{ i + 1 }} XXX XXX
            </p>
          </div>
          <div class="flex-1">
            <hr class="my-5" />
            <p class="b2">กรรมการลงชื่อผูกพัน/หุ้นส่วนผู้จัดการ</p>
            <p v-for="(item, i) in 10" class="b1" :key="i">
              {{ i + 1 }} XXX XXX
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
