<template>
  <div
    :class="[
      props.color == '#0B5C90' ? 'link-1' : 'link-2',
      'b2 duration-300 flex items-center gap-2 my-3',
    ]"
  >
    <p>
      {{ props.text }}
    </p>
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
