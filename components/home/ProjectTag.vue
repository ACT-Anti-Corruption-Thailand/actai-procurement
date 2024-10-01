<template>
  <div class="rounded-full bg-[#FFEFF0] p-[5px] w-fit flex gap-[2px] my-1">
    <img src="../../public/src/images/risk-flag.svg" alt="risk" />
    <p class="b4 text-[#EC1C24]">{{ props.text }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
}>();
</script>

<style lang="scss" scoped></style>
