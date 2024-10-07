<template>
  <div class="flex items-center justify-end gap-2">
    <button
      type="button"
      class="p-2.5 border border-[#0B5C90] hover:border-[#1688CA] rounded-[10px] ml-1 b2 text-[#0B5C90]"
    >
      <span class="hidden sm:inline">ดาวน์โหลดทั้งหมด (CSV)</span>
      <img
        src="../../public/src/images/download.svg"
        alt="filter"
        class="inline"
      />
    </button>
    <button
      type="button"
      class="p-2.5 rounded-[10px] b2 text-[#0B5C90] hover:text-[#1688CA]"
    >
      <span class="hidden sm:inline">คัดลอกลิงก์</span>

      <img src="../../public/src/images/copy.svg" alt="copy" class="inline" />
    </button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
