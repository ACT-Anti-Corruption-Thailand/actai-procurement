<template>
  <div :class="`flex flex-wrap gap-1 b4 ${props.color}`">
    <div class="flex gap-1 items-center" v-if="props.data.province != null">
      <pin color="#8E8E8E" />
      <p>{{ props.data.province }}</p>
    </div>
    <div class="flex gap-1 items-center" v-if="props.data.year != null">
      <year color="#8E8E8E" />
      <p>{{ props.data.year }}</p>
    </div>
    <div class="flex gap-1 items-center" v-if="props.data.owner != null">
      <agency color="#8E8E8E" />
      <p>{{ props.data.owner }}</p>
    </div>
    <div class="flex gap-1 items-center" v-if="props.data.no != null">
      <projectNo color="#8E8E8E" />
      <p>{{ props.data.no }}</p>
    </div>
    <div class="flex gap-1 items-center" v-if="props.data.entityNo != null">
      <entityNo color="#8E8E8E" />
      <p>{{ props.data.entityNo }}</p>
    </div>
    <div class="flex gap-1 items-center" v-if="props.data.contractNo != null">
      <contractNo color="#8E8E8E" />
      <p>{{ props.data.contractNo }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: Object;
  color: string;
}>();
</script>

<style lang="scss" scoped></style>
