<template>
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 6V5H11V2H10V5H6V2H5V5H2V6H5V10H2V11H5V14H6V11H10V14H11V11H14V10H11V6H14ZM10 10H6V6H10V10Z"
      :fill="color"
    />
  </svg>
</template>

<script setup>
defineProps({
  color: String,
});
</script>

<style lang="scss" scoped></style>
