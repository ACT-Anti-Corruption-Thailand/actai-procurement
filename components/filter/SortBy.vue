<template>
  <div class="flex gap-2 items-center">
    <p class="b1">{{ props.text }}</p>

    <div class="relative">
      <Listbox v-model="selectedPerson">
        <ListboxButton class="dropdown-btn"
          >{{ selectedPerson }}<ChevronDownIcon
        /></ListboxButton>
        <ListboxOptions class="dropdown-list absolute">
          <ListboxOption v-for="(item, i) in props.list" :key="i" :value="item">
            {{ item }}
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>

    <RadioGroup v-model="sortBy" class="flex gap-1">
      <RadioGroupOption
        v-slot="{ checked }"
        class="flex-1 radio-btn b1 rounded-md"
        value="desc"
      >
        <img src="../../public/src/images/sort-desc.svg" alt="" />
      </RadioGroupOption>
      <RadioGroupOption
        v-slot="{ checked }"
        class="flex-1 radio-btn b1 rounded-md"
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

const selectedPerson = ref(props.list[0]);
const sortBy = ref('desc');
</script>

<style scoped>
.dropdown-btn {
  background: #f5f5f5 !important;
  width: 215px !important;
}
</style>
