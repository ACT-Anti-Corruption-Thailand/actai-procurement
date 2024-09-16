<script setup>
const menu = ref('ภาพรวม');
</script>

<template>
  <Header />
  <div class="bg-white p-5">
    <div class="max-w-6xl mx-auto flex gap-2">
      <div class="sm:w-3/5">
        <h3 class="font-bold">การไฟฟ้านครหลวง ฝ่ายก่อสร้าง</h3>
        <p class="b1">เลขที่โครงการ : 56015020021</p>
        <p class="b4 text-[#8E8E8E]">โครงการฯ อัปเดตข้อมูลเมื่อ 24/08/2562</p>
      </div>
      <div class="sm:w-2/5"></div>
    </div>
  </div>
  <div class="bg-[#1F1F1F] p-5">
    <div class="flex flex-col-mb gap-5 max-w-6xl mx-auto">
      <div class="sm:w-1/4">
        <div class="flex justify-between w-full py-3">
          <p class="b4 font-bold text-[#8E8E8E]">รายการข้อมูล</p>
          <img src="../public/src/images/minimize.svg" alt="minimize" />
        </div>

        <div class="text-white b1 cursor-pointer">
          <div
            class="p-4 border-b"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black': menu == 'ภาพรวม',
            }"
            @click="menu = 'ภาพรวม'"
          >
            <p>ภาพรวม</p>
          </div>
          <div
            class="p-4 border-b"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black': menu == 'ข้อมูลเจาะลึก',
            }"
            @click="menu = 'ข้อมูลเจาะลึก'"
          >
            <p>ข้อมูลเจาะลึก</p>
            <ul class="list-disc ml-5">
              <li>จำนวนนิติบุคคลที่เข้าร่วมในแต่ละขั้นตอน</li>
              <li>ผู้ชนะการประมูล</li>
              <li>การเสนอราคา</li>
            </ul>
          </div>
          <div
            class="p-4 border-b"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black':
                menu == 'เอกสารที่เกี่ยวข้อง',
            }"
            @click="menu = 'เอกสารที่เกี่ยวข้อง'"
          >
            <p>เอกสารที่เกี่ยวข้อง</p>
          </div>
        </div>
      </div>
      <div class="sm:w-3/4">
        <OverallProject v-if="menu == 'ภาพรวม'" />
        <Details v-else-if="menu == 'ข้อมูลเจาะลึก'" />
        <ProjectDocument v-else />
      </div>
    </div>

    <div class="mx-auto max-w-6xl text-white" v-if="menu == 'ภาพรวม'">
      <ACTLineButton />

      <p class="b1 mt-5 flex items-center flex-wrap">
        <info color="#FFFFFF" />
        ท่านสามารถตรวจสอบความถูกต้องของข้อมูลเพื่อใช้ประกอบการอ้างอิงอีกครั้งได้ที่<a
          href="http://www.gprocurement.go.th/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline text-[#8DCCF0] mx-1"
          >http://www.gprocurement.go.th/</a
        >แจ้งข้อมูลเพิ่มเติมที่ FB :
        <a
          href="https://www.facebook.com/act.anticorruptionThailand/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline text-[#8DCCF0] mx-1"
        >
          องค์กรต่อต้านคอร์รัปชัน</a
        >
      </p>
    </div>
  </div>
  <Footer />
</template>

<style lang="scss" scoped></style>
