<script setup>
const menu = ref('ทั้งหมด');
</script>

<template>
  <Header />
  <div class="overflow-auto bg-[#333333]">
    <div class="p-4 flex gap-2 mx-auto sm:justify-center w-[700px]">
      <div class="menu-btn" @click="menu = 'ทั้งหมด'">
        <h5>ทั้งหมด</h5>
      </div>
      <div class="menu-btn" @click="menu = 'โครงการฯ'">
        <h5>โครงการฯ</h5>
      </div>
      <div class="menu-btn" @click="menu = 'หน่วยงานรัฐ'">
        <h5>หน่วยงานรัฐ</h5>
      </div>
      <div class="menu-btn" @click="menu = 'ผู้รับจ้าง'">
        <h5>ผู้รับจ้าง</h5>
      </div>
    </div>
  </div>
  <div class="p-3 bg-[#F5F5F5]">
    <p class="b4">
      ผลลัพธ์จากการค้นหาและประมวลผลของ ACT Ai
      อาจมีข้อจำกัดจากคุณภาพของข้อมูลจากหน่วยงานภาครัฐ เพื่อความถูกต้อง
      โปรดตรวจสอบข้อมูลจากเว็บไซต์ของหน่วยงานภาครัฐอีกครั้งก่อนนำไปใช้อ้างอิง
    </p>
  </div>
  <div class="bg-white p-7">
    <div class="mx-auto max-w-6xl">
      <ClientOnly fallback-tag="span" fallback="Loading...">
        <ResultAll v-if="menu == 'ทั้งหมด'" />
        <ResultProjectList v-else-if="menu == 'โครงการฯ'" />
        <ResultGovernment v-else-if="menu == 'หน่วยงานรัฐ'" />
        <ResultContractor v-else />
      </ClientOnly>
    </div>
  </div>
  <Footer />
</template>

<style lang="scss" scoped></style>
