<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean;
}>();
</script>
<template>
  <div v-if="!props.isLoading">
    <slot />
  </div>
  <div v-else class="flex flex-col justify-center items-center min-h-20">
    <loading />
  </div>
</template>
