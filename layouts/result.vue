<script setup lang="ts">
const route = useRoute();
const search = route.query.search;

const menuList = ref([
  { name: "ทั้งหมด", path: "/result", fullPath: `/result?search=${search}` },
  {
    name: "โครงการฯ",
    path: "/result/project",
    fullPath: `/result/project?search=${search}`,
  },
  {
    name: "หน่วยงานรัฐ",
    path: "/result/government",
    fullPath: `/result/government?search=${search}`,
  },
  {
    name: "ผู้รับจ้าง",
    path: "/result/contractor",
    fullPath: `/result/contractor?search=${search}`,
  },
]);
</script>
<template>
  <div>
    <Header />
    <div class="overflow-auto bg-[#333333]">
      <div
        class="p-4 flex gap-2 mx-auto sm:justify-center w-[450px] sm:w-[700px]"
      >
        <a
          class="menu-btn text-white"
          :class="{ active: route.path === encodeURI(item.path) }"
          v-for="(item, i) in menuList"
          :key="i"
          :href="item.fullPath"
        >
          <h5 class="b1 sm:text-[28px]">{{ item.name }}</h5>
        </a>
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
      <slot />
    </div>
    <Footer />
  </div>
</template>
