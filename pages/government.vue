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
          <div class="p-4 border-b">
            <p>ภาพรวมโครงการที่จัดทำ</p>
            <ul class="list-disc ml-5">
              <li>จำนวนโครงการ</li>
              <li>สถานะโครงการ</li>
              <li>งบประมาณโครงการ</li>
              <li>การกระจายตัวโครงการ</li>
            </ul>
          </div>
          <div class="p-4 border-l-4 border-l-[#EC1C24] bg-black border-b">
            <p>รายชื่อโครงการที่จัดทำ</p>
          </div>
          <div class="p-4 border-b"><p>ผู้รับจ้างที่ได้งาน</p></div>
        </div>
      </div>
      <div class="sm:w-3/4"><ProjectList /></div>
    </div>

    <div class="mx-auto max-w-6xl text-white">
      <ACTLineButton />

      <p class="b1 mt-5">
        ท่านสามารถตรวจสอบความถูกต้องของข้อมูลเพื่อใช้ประกอบการอ้างอิงอีกครั้งได้ที่ http://www.gprocurement.go.th/ แจ้งข้อมูลเพิ่มเติมที่
        FB : องค์กรต่อต้านคอร์รัปชัน
      </p>
    </div>
  </div>
  <Footer />
</template>

<style lang="scss" scoped></style>
