<template>
  <Listbox v-model="selectedPerson" as="Component">
    <ListboxButton class="dropdown-btn"
      >{{ selectedPerson.name }}<ChevronDownIcon
    /></ListboxButton>
    <ListboxOptions class="dropdown-list absolute">
      <ListboxOption v-for="(item, i) in props.list" :key="i" :value="item">
        {{ item }}
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>

<script setup lang="ts">
const props = defineProps<{
  list: array;
}>();

import { ref } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';

import { ChevronDownIcon } from '@heroicons/vue/24/solid';

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
];
const selectedPerson = ref(people[0]);
</script>

<style scoped></style>
