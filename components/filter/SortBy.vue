<template>
  <div class="flex gap-2 items-center">
    <p class="b1">{{ props.text }}</p>
    <div class="relative">
      <Listbox
        v-model="selected"
        @click="$emit('change', 'sortBy', selected.value)"
        as="div"
      >
        <ListboxButton class="dropdown-btn">
          <span class="text-ellipsis text-nowrap overflow-hidden"
            >{{ selected.name }} </span
          ><ChevronDownIcon
        /></ListboxButton>
        <ListboxOptions class="dropdown-list absolute">
          <ListboxOption v-for="(item, i) in props.list" :key="i" :value="item">
            {{ item.name }}
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>

    <RadioGroup
      as="div"
      v-model="sortBy"
      class="flex gap-1"
      @click="$emit('sortBy', 'sortOrder', sortBy)"
    >
      <RadioGroupOption
        v-slot="{ checked }"
        class="flex-1 radio-btn b1 rounded-10"
        value="desc"
      >
        <img src="../../public/src/images/sort-desc.svg" alt="" />
      </RadioGroupOption>
      <RadioGroupOption
        v-slot="{ checked }"
        class="flex-1 radio-btn b1 rounded-10"
        value="asc"
      >
        <img src="../../public/src/images/sort-asc.svg" alt="" />
      </RadioGroupOption>
    </RadioGroup>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  list: array;
  text: string;
  selectedSortBy?: string;
  selectedSortOrder?: string;
}>();

import { ref } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  RadioGroup,
  RadioGroupOption,
} from '@headlessui/vue';

import { ChevronDownIcon } from '@heroicons/vue/24/solid';

const selected = ref(props.list[0]);
const sortBy = ref('desc');

onBeforeMount(() => {
  selected.value =
    props.selectedSortBy != ''
      ? props.list.filter((x) => x.value == props.selectedSortBy)[0]
      : props.list[0];
  sortBy.value =
    props.selectedSortOrder != '' ? props.selectedSortOrder : 'desc';
});
</script>

<style scoped lang="scss">
.dropdown-btn {
  background: #f5f5f5 !important;
  width: 215px !important;

  @include mobile {
    width: 110px !important;
  }
}

.radio-btn {
  border: 0;
}
</style>
