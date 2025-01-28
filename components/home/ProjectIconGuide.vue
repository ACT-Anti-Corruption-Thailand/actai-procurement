<template>
  <div :class="`flex flex-wrap gap-2 b4 text-[${props.color}]`">
    <div class="flex gap-0.5 items-center" v-if="props.data.province != null">
      <pin :color="props.color" />
      <p>{{ props.data.province }}</p>
    </div>
    <div class="flex gap-0.5 items-center" v-if="props.data.year != null">
      <year :color="props.color" />
      <p>
        {{ props.data.year }}
        <span v-if="props.data.date != null"
          >({{ setDate(props.data.date) }})</span
        >
      </p>
    </div>
    <div class="flex gap-0.5 items-center" v-if="props.data.owner != null">
      <agency :color="props.color" />
      <p>{{ props.data.owner }}</p>
    </div>
    <div class="flex gap-0.5 items-center" v-if="props.data.no != null">
      <projectNo :color="props.color" />
      <p>{{ props.data.no }}</p>
    </div>
    <div class="flex gap-0.5 items-center" v-if="props.data.entityNo != null">
      <entityNo :color="props.color" />
      <p>{{ props.data.entityNo }}</p>
    </div>
    <div class="flex gap-0.5 items-center" v-if="props.data.contractNo != null">
      <contractNo :color="props.color" />
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
