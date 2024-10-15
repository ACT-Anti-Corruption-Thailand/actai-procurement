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
      <Combobox v-model="selectedList" multiple v-slot="{ open }">
        <div class="relative">
          <ComboboxInput
            placeholder="test"
            :displayValue="(person) => query"
            class="dropdown-btn border-0 hover:ring-0"
            @change="(person) => test(person)"
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
            <ComboboxOptions static class="dropdown-list absolutes">
              <ComboboxOption
                v-for="(item, i) in result"
                :key="i"
                :value="item"
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
                  {{ item }}
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
  defaultVal: string;
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

const selectedList = ref([]);
const hasChange = ref(false);

let query = ref(props.defaultVal);

const emit = defineEmits(['change']);

const handleEnterOptions = () => {
  let text = '';

  if (selectedList.value.length > 1) {
    const index = selectedList.value.indexOf(props.defaultVal);
    if (index != -1) selectedList.value.splice(index, 1);
  }

  // console.log(selectedList.value);

  if (selectedList.value.length > 0) {
    if (selectedList.value.length > 1)
      text =
        [...selectedList.value][0] +
        ', +' +
        (selectedList.value.length - 1).toString();
    else text = [...selectedList.value][0];
  } else {
    text = props.defaultVal;
  }
  query.value = text;
  hasChange.value = false;
  emit('change', selectedList.value);
};

const result = computed(() => {
  const data = [...props.list];

  if (!hasChange.value) return [...props.list];
  else
    return data.filter((data) => {
      if (data.includes(query.value)) {
        return data;
      }
    });
});

const test = (a) => {
  query.value = a.target.value;
  hasChange.value = true;
};
</script>

<style lang="scss" scoped></style>
