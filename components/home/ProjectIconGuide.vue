<template>
  <div class="flex flex-wrap gap-1 b4">
    <div class="flex gap-1 items-center" v-if="props.data.province != null">
      <div class="flex-1">
        <img src="../../public/src/images/pin.svg" alt="pin" />
      </div>
      <p>{{ props.data.province }}</p>
    </div>
    <div class="flex gap-1" v-if="props.data.year != null">
      <div>
        <img src="../../public/src/images/calendar.svg" alt="calendar" />
      </div>
      <p>{{ props.data.year }}</p>
    </div>
    <div class="flex gap-1" v-if="props.data.owner != null">
      <img src="../../public/src/images/owner.svg" alt="owner" />
      <p>{{ props.data.owner }}</p>
    </div>
    <div class="flex gap-1" v-if="props.data.no != null">
      <img src="../../public/src/images/no.svg" alt="no" />
      <p>{{ props.data.no }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: Object;
}>();
</script>

<style lang="scss" scoped></style>
