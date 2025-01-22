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
      <Combobox v-model="selectedList" multiple v-slot="{ open }" nullable>
        <div class="relative">
          <ComboboxInput
            :displayValue="getComboboxText"
            class="dropdown-btn border-0 hover:ring-0"
          >
          </ComboboxInput>
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
        >
          <div v-show="open">
            <ComboboxOptions static class="dropdown-list absolute">
              <ComboboxOption
                v-for="(item, i) in list.slice(0, 5)"
                :key="i"
                :value="item"
                v-slot="{ selected }"
              >
                <input
                  type="checkbox"
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
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue';

import { ChevronDownIcon } from '@heroicons/vue/24/solid';

const props = defineProps<{
  title: string;
  defaultVal: string;
  selectedVal: string;
  list: string[];
  isClear?: boolean;
}>();

const selectedList = ref<string[]>([]);
const isClearFilter = toRef(props, 'isClear');

const emit = defineEmits(['change']);

watch(isClearFilter, (val) => {
  if (val) {
    selectedList.value = [];
  }
});

watch(selectedList, (val) => {
  emit('change', val.length > 0 ? val : [props.defaultVal]);
});

onBeforeMount(() => {
  if (props.selectedVal != props.defaultVal) {
    selectedList.value = props.selectedVal.split(',');
  }
});

function getComboboxText() {
  switch (selectedList.value.length) {
    case 0:
      return props.defaultVal;
    case 1:
      return selectedList.value;
    default:
      return `${selectedList.value[0]}, +${selectedList.value.length - 1}`;
  }
}
</script>
