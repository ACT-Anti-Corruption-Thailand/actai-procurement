<script setup>
import { ref, computed } from 'vue';
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue';

const searchList = [
  { id: 1, name: 'ก่อสร้าง' },
  { id: 2, name: 'ก่อสร้างถนน' },
];

let selected = ref('');
let query = ref('');

let filteredPeople = computed(() =>
  query.value === ''
    ? searchList
    : searchList.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
);
</script>

<template>
  {{ query }}
  <ClientOnly fallback-tag="span" fallback="Loading...">
    <div class="w-full max-w-xl flex">
      <Combobox v-model="selected" class="">
        <div class="w-full">
          <div
            class="relative w-full cursor-default overflow-hidden rounded-l-lg bg-white text-left b2 ring-[#C2141B]"
          >
            <ComboboxInput
              placeholder="ค้นด้วยคำในชื่อโครงการ/เลขที่โครงการ/ชื่อหน่วยงาน/ชื่อผู้รับจ้าง/เลขทะเบียนนิติบุคคล"
              class="w-full border-none py-2 px-3 text-black focus:ring-[#C2141B] b2"
              :displayValue="(person) => person.name"
              @change="query = $event.target.value"
            />
            <img
              src="../public/src/images/close.svg"
              alt="close"
              class="absolute right-5 my-auto w-4 h-4 inset-y-0 cursor-pointer"
              @click="query = ''"
              v-if="query != ''"
            />
          </div>
          <TransitionRoot
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            @after-leave="query = ''"
          >
            <ComboboxOptions
              class="absolute mt-1 max-h-60 max-w-[85%] sm:max-w-xl w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              <div
                v-if="filteredPeople.length === 0 && query !== ''"
                class="relative cursor-default select-none px-4 py-2 text-black b2"
              >
                ไม่พบผลการค้นหา
              </div>

              <ComboboxOption
                v-for="person in filteredPeople"
                as="template"
                :key="person.id"
                :value="person"
                v-slot="{ selected, active }"
              >
                <NuxtLink :to="`/result?search=${person.name}`">
                  <li
                    class="relative cursor-default select-none py-2 px-2 text-left b2"
                    :class="{
                      'bg-black text-white': active,
                      'text-black': !active,
                    }"
                  >
                    <span
                      class="block truncate"
                      :class="{
                        'font-medium': selected,
                        'font-normal': !selected,
                      }"
                    >
                      {{ person.name }}
                    </span>
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-center pl-3"
                      :class="{ 'text-white': active, 'text-black': !active }"
                    >
                    </span>
                  </li>
                </NuxtLink>
              </ComboboxOption>
            </ComboboxOptions>
          </TransitionRoot>
        </div>
      </Combobox>
      <NuxtLink
        :to="`/result?search=${query}`"
        :class="[query == '' ? 'pointer-events-none' : '']"
      >
        <div class="h-11 w-11">
          <img
            src="/public/src/images/search.svg"
            alt=""
            class="bg-[#C2141B] p-3 rounded-r-lg cursor-pointer"
          /></div
      ></NuxtLink>
    </div>
  </ClientOnly>
</template>
