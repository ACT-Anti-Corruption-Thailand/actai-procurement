<script setup>
const menu = ref('ทั้งหมด');
</script>

<template>
  <Header />
  <div class="bg-white p-5">
    <div class="max-w-6xl mx-auto flex gap-2">
      <div class="sm:w-3/5">
        <h3 class="font-bold">
          ประกวดราคาจ้างโครงการจ้างก่อสร้างอาคารรัฐสภาแห่งใหม่ พร้อมอาคารประกอบ
        </h3>
        <p class="b1">เลขที่โครงการ : 56015020021</p>
        <p class="b4 text-[#8E8E8E]">โครงการฯ อัปเดตข้อมูลเมื่อ 25/01/2565</p>
      </div>
      <div class="sm:w-2/5"></div>
    </div>
  </div>
  <div class="bg-[#1F1F1F] p-5">
    <div class="flex flex-col-mb gap-5 max-w-6xl mx-auto">
      <div class="sm:w-1/4">
        <div class="flex">
          <p class="b4 font-bold text-[#8E8E8E]">รายการข้อมูล</p>
        </div>

        <div class="text-white b1">
          <div class="p-4 border-l-4 border-l-[#EC1C24] bg-black border-b">
            <p>ข้อมูลทั่วไป</p>
          </div>
          <div class="p-4 border-b">
            <p>การรับงานกับหน่วยงานรัฐ</p>
            <ul class="list-disc ml-5">
              <li>จำนวนโครงการ</li>
              <li>สถานะโครงการ</li>
              <li>การกระจายตัวโครงการ</li>
              <li>วงเงินสัญญา</li>
              <li>สัดส่วนวิธีการประมูลงาน</li>
              <li>พฤติกรรมการเสนอราคา</li>
            </ul>
          </div>
          <div class="p-4 border-l-4 border-l-[#EC1C24] bg-black border-b">
            <p>ประวัติการทิ้งงาน</p>
          </div>
          <div class="p-4 border-b"><p>ความสัมพันธ์</p></div>
          <div class="p-4 border-b">
            <p>กลุ่มเอกชนที่เข้าร่วมประมูลด้วยกัน</p>
          </div>
          <div class="p-4 border-b"><p>รายชื่อโครงการที่เกี่ยวข้อง</p></div>
          <div class="p-4 border-b"><p>หน่วยงานรัฐที่เป็นผู้ว่าจ้าง</p></div>
        </div>
      </div>
      <div class="sm:w-3/4"><AbandonmentHistory /></div>
    </div>

    <ACTLineButton />
  </div>
  <Footer />
</template>

<style lang="scss" scoped></style>
