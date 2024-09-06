<template>
  <h4 class="font-bold text-white mb-5">ภาพรวม</h4>
  <div
    class="bg-white rounded-md p-2 flex gap-2 mb-3"
    v-for="(item, i) in 10"
    :key="i"
  >
    <img src="../../public/src/images/document.svg" alt="" />
    <p class="b2">
      ยกเลิกประกาศรายชื่อผู้ผ่านการตรวจสอบผู้ไม่มีผลประโยชน์ร่วมกัน
    </p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
