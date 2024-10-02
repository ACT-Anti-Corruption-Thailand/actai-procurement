<template>
  <div class="text-[#7F7F7F] mt-5" v-if="props.title != ''">
    <p class="font-bold b1">
      {{ props.title }}
      <span v-if="props.title == 'สังกัด'" class="b5 font-normal"
        >(มีหน่วยงานบางส่วนที่ไม่สามารถระบุสังกัดได้)</span
      >
    </p>
  </div>

  <div class="flex w-full gap-2 items-center">
    <div class="flex-1 relative">
      <Combobox v-model="selectedPeople" multiple v-slot="{ open }">
        <div class="relative">
          <ComboboxInput
            placeholder="test"
            :displayValue="(person) => query"
            class="dropdown-btn border-0 hover:ring-0"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2 combobox-btn"
          >
            <ChevronDownIcon class="duration-300 size-4" aria-hidden="true" />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="handleEnterOptions()"
        >
          <div v-show="open">
            <ComboboxOptions static class="dropdown-list absolute">
              <ComboboxOption
                v-for="person in props.list"
                :key="person.id"
                :value="person"
                v-slot="{ selected, active }"
              >
                <input
                  type="checkbox"
                  name=""
                  id=""
                  :checked="selected"
                  class="text-black mb-1"
                />
                <label class="ml-2 b1">
                  {{ person }}
                </label>
              </ComboboxOption>
            </ComboboxOptions>
          </div>
        </TransitionRoot>
      </Combobox>
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
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue';

import { ChevronDownIcon } from '@heroicons/vue/24/solid';

const selectedPeople = ref([props.selected]);

let query = ref(props.selected);

const handleEnterOptions = () => {
  let text = '';

  if (selectedPeople.value.length > 0) {
    if (selectedPeople.value.length > 1)
      text =
        [...selectedPeople.value][0] +
        ', +' +
        (selectedPeople.value.length - 1).toString();
    else text = [...selectedPeople.value][0];
  }
  query.value = text;
};
</script>

<style lang="scss" scoped></style>
