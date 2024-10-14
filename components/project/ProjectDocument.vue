<script setup lang="ts">
import type { ProjectDocuments } from '../../public/src/data/data_details';

const props = defineProps<{
  data: ProjectDocuments;
}>();
</script>

<template>
  <h4 class="font-bold text-white mb-5">เอกสารที่เกี่ยวข้อง</h4>
  <a
    :href="item.link"
    target="_blank"
    rel="noopener noreferrer"
    v-for="item in props.data"
  >
    <div class="bg-white btn-dark-1 rounded-10 p-2 flex gap-2 mb-3">
      <img src="../../public/src/images/document.svg" alt="" />
      <p class="b2">{{ item.name }}</p>
    </div>
  </a>
</template>

<style lang="scss" scoped></style>
