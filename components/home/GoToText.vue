<template>
  <div class="flex items-center gap-2 my-3">
    <p :class="`b2 text-[${props.color}]`">{{ props.text }}</p>
    <arrow :color="props.color" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
  color: string;
}>();
</script>

<style lang="scss" scoped></style>
