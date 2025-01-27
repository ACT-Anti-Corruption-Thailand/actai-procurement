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
        <div
          class="relative flex flex-row flex-wrap bg-white rounded items-center p-1 gap-1"
        >
          <button
            v-for="item in selectedList"
            :key="item"
            class="rounded-full bg-black text-white font-bold flex flex-row items-center"
            @click="selectedList = selectedList.filter((i) => i !== item)"
          >
            <span class="ml-2 my-1">{{ item }}</span>
            <XMarkIcon class="size-4 mx-1" />
          </button>
          <div class="relative flex-1">
            <ComboboxInput
              :placeholder="selectedList.length ? '' : defaultVal"
              :displayValue="() => keyword"
              class="w-full border-0 active:ring-0 px-1 py-0"
              @change="(e) => (keyword = e.target.value)"
            />
            <ComboboxButton
              v-if="isShowAllItems"
              class="absolute inset-y-0 right-0 flex items-center pr-2 combobox-btn"
            >
              <ChevronDownIcon class="duration-300 size-4" aria-hidden="true" />
            </ComboboxButton>
          </div>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div v-show="open">
            <ComboboxOptions
              v-if="displayedList.length"
              static
              class="dropdown-list absolute"
            >
              <ComboboxOption
                v-for="(item, i) in displayedList"
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
            <div v-else class="dropdown-list absolute flex justify-center">
              <span class="m-4 text-gray-500">ไม่พบข้อมูลจากคำค้นหา</span>
            </div>
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
import { XMarkIcon } from '@heroicons/vue/24/outline';

const MAX_SHOW_ITEM = 5;

const props = defineProps<{
  title: string;
  defaultVal: string;
  selectedVal: string;
  list: string[];
  isClear?: boolean;
  isShowAllItems?: boolean;
}>();

const selectedList = ref<string[]>([]);
const keyword = ref('');
const isClearFilter = toRef(props, 'isClear');

const displayedList = computed(() =>
  props.list
    .filter((item) => item?.includes(keyword.value))
    .slice(0, props.isShowAllItems ? undefined : MAX_SHOW_ITEM)
);

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
</script>
