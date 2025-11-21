<script setup lang="ts">
const iconGuide = ref({
  name: "",
  province: "= ที่ตั้ง",
  year: "= ปีงบประมาณ (วันที่ประกาศโครงการ)",
  owner: "= หน่วยงานรัฐ",
  no: "= เลขที่โครงการ",
});

const mockDataGuide = ref({
  name: "",
  province: "แพร่",
  year: "2567 (10/11/2567)",
  owner: "สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน",
  no: "56015020021",
});

definePageMeta({
  layout: "result",
});
</script>
<template>
  <ResultAll :iconGuide="iconGuide" :mockDataGuide="mockDataGuide" />
</template>

<style lang="scss" scoped></style>
