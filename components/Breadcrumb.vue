<template>
  <div class="flex items-center gap-1 w-full mb-5 sm:mb-10">
    <NuxtLink to="/" class="text-[#0B5C90] text-nowrap">หน้าหลัก</NuxtLink>
    <p class="truncate text-[#8E8E8E] w-2/4">/ {{ props.title }}</p>
  </div>
</template>

<script setup lang="ts">
let pathname = ref('');

onMounted(() => {
  // pathname = window.location;
});

const props = defineProps<{
  title: string;
}>();
</script>

<style lang="scss" scoped></style>
