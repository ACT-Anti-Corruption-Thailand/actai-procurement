<script setup>
const menu = ref('ภาพรวมโครงการที่จัดทำ');
const isShowTab = ref(true);
</script>

<template>
  <Header />
  <div class="bg-white p-5">
    <Breadcrumb title="การไฟฟ้านครหลวง ฝ่ายก่อสร้าง" />
    <div class="max-w-6xl mx-auto flex gap-2 flex-col-mb">
      <div class="sm:w-4/5">
        <h3 class="font-black">การไฟฟ้านครหลวง ฝ่ายก่อสร้าง</h3>
        <p class="b1 mb-3 text-[#7F7F7F]">
          กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม
        </p>
        <p class="b1">กรุงเทพมหานคร</p>
        <p class="b4 text-[#8E8E8E]">หน่วยงานอัปเดตข้อมูลเมื่อ 01/09/2565</p>
      </div>
      <div class="sm:w-1/5">
        <Share color="#0B5C90" text="แชร์หน้านี้" class="mt-2 sm:ml-auto" />
      </div>
    </div>
  </div>
  <div class="bg-[#1F1F1F] p-5">
    <div class="flex flex-col-mb gap-5 max-w-6xl mx-auto">
      <div :class="[isShowTab ? 'sm:w-1/4' : 'hidden']">
        <div class="flex justify-between w-full py-3">
          <p class="b4 font-bold text-[#8E8E8E]">รายการข้อมูล</p>
          <img
            src="../public/src/images/minimize.svg"
            alt="minimize"
            @click="isShowTab = false"
            class="cursor-pointer"
          />
        </div>

        <div class="text-white b1 cursor-pointer">
          <div
            class="p-4 border-b border-[#333333] hover:bg-black"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black':
                menu == 'ภาพรวมโครงการที่จัดทำ',
            }"
            @click="menu = 'ภาพรวมโครงการที่จัดทำ'"
          >
            <p>ภาพรวมโครงการที่จัดทำ</p>
            <ul class="list-disc ml-5">
              <li>จำนวนโครงการ</li>
              <li>สถานะโครงการ</li>
              <li>งบประมาณโครงการ</li>
              <li>การกระจายตัวโครงการ</li>
            </ul>
          </div>
          <div
            class="p-4 border-b border-[#333333] hover:bg-black"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black':
                menu == 'รายชื่อโครงการที่จัดทำ',
            }"
            @click="menu = 'รายชื่อโครงการที่จัดทำ'"
          >
            <p>รายชื่อโครงการที่จัดทำ</p>
          </div>
          <div
            class="p-4 border-b border-[#333333] hover:bg-black"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black':
                menu == 'ผู้รับจ้างที่ได้งาน',
            }"
            @click="menu = 'ผู้รับจ้างที่ได้งาน'"
          >
            <p>ผู้รับจ้างที่ได้งาน</p>
          </div>
        </div>
      </div>
      <div :class="[isShowTab ? 'sm:w-3/4' : 'w-full', 'relative']">
        <Overall v-if="menu == 'ภาพรวมโครงการที่จัดทำ'" />
        <ProjectList v-else-if="menu == 'รายชื่อโครงการที่จัดทำ'" />
        <ContractorList v-else />

        <img
          src="../public/src/images/showtab-btn.svg"
          alt="showtab button"
          class="cursor-pointer fixed bottom-5 left-5"
          @click="isShowTab = true"
          v-if="!isShowTab"
        />
      </div>
    </div>

    <Navigation section="gov" :activemenu="menu" @menu="(n) => (menu = n)" />

    <div
      class="mx-auto max-w-6xl text-white"
      v-if="menu == 'ภาพรวมโครงการที่จัดทำ'"
    >
      <ACTLineButton />

      <p class="b1 mt-5 flex items-center flex-wrap gap-2">
        <img src="../public/src/images/status-icon.svg" />
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
