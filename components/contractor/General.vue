<template>
  <div>
    <h4 class="font-bold text-white mb-5">ข้อมูลทั่วไป</h4>
    <div class="bg-white text-black p-7 rounded-10">
      <div>
        <div>
          <p class="b2 text-[#5E5E5E]">ที่อยู่</p>
          <p class="b1">
            อาคารซิโน-ไทย ทาวเวอร์ ชั้น 29-30, 32/59-60 ถนนอโศก สุขุมวิท 21
            แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพมหานคร 10110
          </p>
        </div>

        <div class="flex flex-col-mb gap-2 mt-3">
          <div class="flex-1 border-t pt-3">
            <p class="b2 text-[#5E5E5E]">เลขทะเบียนนิติบุคคล</p>
            <p class="b1">0103515022863</p>
          </div>
          <div class="flex-1 border-t pt-3">
            <p class="b2 text-[#5E5E5E]">ประเภทการจดทะเบียน</p>
            <p class="b1">บริษัทจำกัด</p>
          </div>
        </div>

        <div class="flex flex-col-mb gap-2 mt-3">
          <div class="flex-1 border-t pt-3">
            <p class="b2 text-[#5E5E5E]">ทุนจดทะเบียน</p>
            <p class="b1">200,000 บาท</p>
          </div>
          <div class="flex-1 border-t pt-3">
            <p class="b2 text-[#5E5E5E]">วันจดทะเบียน</p>
            <p class="b1">29/08/2567</p>
          </div>
        </div>

        <div class="flex flex-col-mb gap-2 mt-3">
          <div class="flex-1 border-t pt-3">
            <p class="b2 text-[#5E5E5E]">หมวดธุรกิจ</p>
            <p class="b1">
              การผลิตเครื่องจักรอื่นๆที่ใช้งานทั่วไปซึ่งมิได้จัดประเภทไว้ในที่อื่น
            </p>
            <p class="b4 text-[#8E8E8E]">
              หมายเหตุ:
              แสดงเฉพาะหมวดธุรกิจที่จดทะเบียนและหมวดที่ยื่นบัญชีปีล่าสุด
              ซึ่งอาจไม่ใช่ทั้งหมด หากมีการจดทะเบียนหมวดอื่นๆ เพิ่ม
            </p>
          </div>
          <div class="flex-1 border-t pt-3">
            <p class="b2 text-[#5E5E5E]">สถานภาพ</p>
            <p class="b1">ยังดำเนินกิจการอยู่</p>
          </div>
        </div>

        <div class="flex-1 border-t pt-3 mt-3">
          <p class="b2 text-[#5E5E5E]">ประวัติการเปลี่ยนแปลง</p>
          <ul class="b1 list-disc ml-5">
            <li>13/07/2567 เปลี่ยนชื่อนิติบุคคลจาก xxx เป็น yyy</li>
            <li>29/08/2567 เปลี่ยนแปลงทุนจดทะเบียนจาก xxx เป็น yyy</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-10 gap-2 my-3">
      <div class="p-7">
        <h5 class="font-bold">รายชื่อกรรมการ/ผู้เป็นหุ้นส่วน</h5>
        <p class="b4 text-[#8E8E8E]">
          หมายเหตุ : ในกรณีที่เป็นผู้รับจ้างประเภท “บริษัทจำกัด” จะใช้คำว่า
          “กรรมการ” ส่วนผู้รับจ้างประเภท “ห้างหุ้นส่วน” จะใช้คำว่า
          “ผู้เป็นหุ้นส่วน”
        </p>

        <div class="flex flex-col-mb gap-2">
          <div class="flex-1">
            <hr class="my-5" />
            <p class="b2 text-[#5E5E5E]">กรรมการ/ผู้เป็นหุ้นส่วน</p>
            <p v-for="(item, i) in partnerList.partners" class="b1" :key="i">
              {{ i + 1 }}. {{ item }}
            </p>
          </div>
          <div class="flex-1">
            <hr class="my-5" />
            <p class="b2 text-[#5E5E5E]">
              กรรมการลงชื่อผูกพัน/หุ้นส่วนผู้จัดการ
            </p>
            <p
              v-for="(item, i) in partnerList.managingPartners"
              class="b1"
              :key="i"
            >
              {{ i + 1 }}. {{ item }}
            </p>
          </div>
        </div>
      </div>
      <div class="p-5 bg-[#F5F5F5] rounded-b-md w-full">
        <div class="flex flex-col-mb sm:items-center sm:justify-between">
          <p class="font-bold b1">รายชื่อและวาระย้อนหลัง</p>
          <p class="b4 sm:text-right">
            *เป็นข้อมูลที่ระบบจัดเก็บเอง อาจมีความไม่สมบูรณ์ของข้อมูล<br />อัปเดตข้อมูล:
            25/01/2565
          </p>
        </div>

        <div class="flex flex-col-mb gap-2">
          <div class="flex-1">
            <hr class="my-5" />
            <p class="b2 text-[#5E5E5E]">กรรมการ/ผู้เป็นหุ้นส่วน</p>
            <p
              v-for="(item, i) in retrospectiveList.partners"
              class="b1"
              :key="i"
            >
              {{ i + 1 }}. {{ item }}
            </p>
          </div>
          <div class="flex-1">
            <hr class="my-5" />
            <p class="b2 text-[#5E5E5E]">
              กรรมการลงชื่อผูกพัน/หุ้นส่วนผู้จัดการ
            </p>
            <p
              v-for="(item, i) in retrospectiveList.managingPartners"
              class="b1"
              :key="i"
            >
              {{ i + 1 }}. {{ item }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const partnerList = {
  partners: [
    'นายวัลลภ รุ่งกิจวรเสถียร',
    'นายมาศถวิน ชาญวีรกูล',
    'พลตำรวจเอกเจตน์ มงคลหัตถี',
    'นายชำนิ จันทร์ฉาย',
    'นายธนาธิป วิทยะสิรินันท์',
    'นางอนิลรัตน์ นิติสาโรจน',
    'นายสุชัย ภูพิชญ์พงษ์',
    'นายภาคภูมิ ศรีชำน',
  ],
  managingPartners: [
    'นายวัลลภ รุ่งกิจวรเสถียร',
    'นายมาศถวิน ชาญวีรกูล',
    'พลตำรวจเอกเจตน์ มงคลหัตถี',
    'นายชำนิ จันทร์ฉาย',
    'นายธนาธิป วิทยะสิรินันท์',
    'นางอนิลรัตน์ นิติสาโรจน',
    'นายสุชัย ภูพิชญ์พงษ์',
    'นายภาคภูมิ ศรีชำน',
  ],
};

const retrospectiveList = {
  partners: [
    'นายวัลลภ รุ่งกิจวรเสถียร',
    'นายมาศถวิน ชาญวีรกูล',
    'พลตำรวจเอกเจตน์ มงคลหัตถี',
    'นายชำนิ จันทร์ฉาย',
    'นายธนาธิป วิทยะสิรินันท์',
    'นางอนิลรัตน์ นิติสาโรจน',
    'นายสุชัย ภูพิชญ์พงษ์',
    'นายภาคภูมิ ศรีชำน',
  ],
  managingPartners: [
    'นายวัลลภ รุ่งกิจวรเสถียร',
    'นายมาศถวิน ชาญวีรกูล',
    'พลตำรวจเอกเจตน์ มงคลหัตถี',
    'นายชำนิ จันทร์ฉาย',
    'นายธนาธิป วิทยะสิรินันท์',
    'นางอนิลรัตน์ นิติสาโรจน',
    'นายสุชัย ภูพิชญ์พงษ์',
    'นายภาคภูมิ ศรีชำน',
  ],
};
</script>

<style lang="scss" scoped></style>
