<template>
  <div class="text-[#7F7F7F] mt-5" v-if="props.title != ''">
    <p class="font-bold b1">{{ props.title }}</p>
  </div>

  <div class="flex w-full gap-2 items-center">
    <div class="flex-1 relative">
      <Listbox v-model="props.selected">
        <ListboxButton class="dropdown-btn"
          >{{ props.selected }}<ChevronDownIcon
        /></ListboxButton>
        <ListboxOptions class="dropdown-list absolute">
          <ListboxOption v-for="(item, i) in props.list" :key="i" :value="item">
            {{ item }}
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
  selected: string;
  list: object;
}>();

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';

import { ChevronDownIcon } from '@heroicons/vue/24/solid';
</script>

<style lang="scss" scoped></style>
