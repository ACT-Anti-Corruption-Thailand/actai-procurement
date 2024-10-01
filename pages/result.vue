<script setup>
const menu = ref('ทั้งหมด');
const menuList = ref(['ทั้งหมด', 'โครงการฯ', 'หน่วยงานรัฐ', 'ผู้รับจ้าง']);

const iconGuide = ref({
  name: '',
  province: '= ที่ตั้ง',
  year: '= ปีงบประมาณ (วันที่ประกาศโครงการ)',
  owner: '= หน่วยงานรัฐ',
  no: '= เลขที่โครงการ',
});

const mockDataGuide = ref({
  name: '',
  province: 'แพร่',
  year: '2567 (10/11/2567)',
  owner: 'สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน',
  no: '= 56015020021',
});
</script>

<template>
  <Header />
  <div class="overflow-auto bg-[#333333]">
    <div class="p-4 flex gap-2 mx-auto sm:justify-center w-[700px]">
      <div
        class="menu-btn text-white"
        :class="{ active: menu == item }"
        @click="menu = item"
        v-for="(item, i) in menuList"
        :key="i"
      >
        <h5>{{ item }}</h5>
      </div>
    </div>
  </div>
  <div class="p-3 bg-[#F5F5F5]">
    <div class="max-w-6xl mx-auto flex items-center gap-2">
      <info color="#000000" class="" />
      <p class="b4 flex-1">
        ผลลัพธ์จากการค้นหาและประมวลผลของ ACT Ai
        อาจมีข้อจำกัดจากคุณภาพของข้อมูลจากหน่วยงานภาครัฐ เพื่อความถูกต้อง
        โปรดตรวจสอบข้อมูลจากเว็บไซต์ของหน่วยงานภาครัฐอีกครั้งก่อนนำไปใช้อ้างอิง
      </p>
    </div>
  </div>
  <div class="bg-white pt-7">
    <!-- <div class="mx-auto max-w-6xl"> -->
    <ClientOnly fallback-tag="span" fallback="Loading...">
      <ResultAll
        v-if="menu == 'ทั้งหมด'"
        @changeMenu="(n) => (menu = n)"
        :iconGuide="iconGuide"
        :mockDataGuide="mockDataGuide"
      />
      <ResultProjectList
        v-else-if="menu == 'โครงการฯ'"
        :iconGuide="iconGuide"
        :mockDataGuide="mockDataGuide"
      />
      <ResultGovernment v-else-if="menu == 'หน่วยงานรัฐ'" />
      <ResultContractor v-else />
    </ClientOnly>
    <!-- </div> -->
  </div>
  <Footer />
</template>

<style lang="scss" scoped></style>
