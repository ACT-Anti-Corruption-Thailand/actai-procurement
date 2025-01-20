<script setup lang="ts">
import { ref } from 'vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from '@headlessui/vue';

const props = defineProps<{
  section: string;
  list?: object;
}>();

const emit = defineEmits(['change', 'count']);

import { CheckIcon } from '@heroicons/vue/24/solid';
import qs from 'qs';

const isOpen = ref(false);
const plan = ref('งบประมาณ');
const filterCount = ref(0);
const isClear = ref(false);

const selected = ref({
  agencies: 'ทุกหน่วยงาน',
  province: 'ทุกจังหวัด',
  resourcingMethod: 'ทุกวิธี',
});

const setFilter = (val: any, section: string, defaultVal: string) => {
  selected.value[section] = val.length > 0 ? [...val].toString() : defaultVal;

  filterCount.value =
    val.length > 0 ? (filterCount.value += 1) : (filterCount.value -= 1);
};

const searchByResult = () => {
  let filter = {};

  filter = {
    agencies:
      selected.value.agencies == 'ทุกหน่วยงาน'
        ? undefined
        : selected.value.agencies,
    province:
      selected.value.province == 'ทุกจังหวัด'
        ? undefined
        : selected.value.province,
    resourcingMethod:
      selected.value.resourcingMethod == 'ทุกวิธี'
        ? undefined
        : selected.value.resourcingMethod,
  };

  var str = qs.stringify({ filter });
  isOpen.value = false;
  emit('change', 'filter', '&' + str);
};

const clearFilter = () => {
  isClear.value = true;
  filterCount.value = 0;

  selected.value = {
    agencies: 'ทุกหน่วยงาน',
    province: 'ทุกจังหวัด',
    resourcingMethod: 'ทุกวิธี',
  };

  emit('change', 'filter', '');

  nextTick(() => {
    isClear.value = false;
  });
};

function closeModal() {
  isOpen.value = false;
}

function openModal() {
  isOpen.value = true;
}
</script>

<template>
  <div class="flex items-center mt-3">
    <button
      type="button"
      @click="openModal"
      class="b3 rounded-10 btn-light-1 p-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
    >
      <img
        src="../../public/src/images/filter-icon.svg"
        alt="filter"
        class="inline"
      />
      ตัวกรอง
      <div
        v-if="filterCount > 0"
        class="inline-flex rounded-full w-5 h-5 justify-center items-center text-white bg-[#0B5C90]"
      >
        {{ filterCount }}
      </div>
    </button>
    <button
      @click="clearFilter"
      v-if="filterCount > 0"
      type="button"
      class="p-2.5 border btn-light-3 link-1 rounded-10 ml-1"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 14C10.1867 14 11.3467 13.6481 12.3334 12.9888C13.3201 12.3295 14.0892 11.3925 14.5433 10.2961C14.9974 9.19975 15.1162 7.99335 14.8847 6.82946C14.6532 5.66558 14.0818 4.59648 13.2426 3.75736C12.4035 2.91825 11.3344 2.3468 10.1705 2.11529C9.00666 1.88378 7.80026 2.0026 6.7039 2.45673C5.60754 2.91085 4.67047 3.67989 4.01118 4.66658C3.35189 5.65328 3 6.81331 3 8V11.1L1.2 9.3L0.5 10L3.5 13L6.5 10L5.8 9.3L4 11.1V8C4 7.0111 4.29324 6.0444 4.84265 5.22215C5.39206 4.39991 6.17295 3.75904 7.08658 3.38061C8.00021 3.00217 9.00555 2.90315 9.97545 3.09608C10.9454 3.289 11.8363 3.76521 12.5355 4.46447C13.2348 5.16373 13.711 6.05465 13.9039 7.02455C14.0969 7.99446 13.9978 8.99979 13.6194 9.91342C13.241 10.8271 12.6001 11.6079 11.7779 12.1574C10.9556 12.7068 9.98891 13 9 13V14Z"
          fill="currentColor"
        />
      </svg>
    </button>
  </div>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-[500px] transform overflow-hidden rounded-10 bg-[#F5F5F5] p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex justify-between items-center">
                <div class="text-[#7F7F7F] flex gap-2 b2 font-bold">
                  <filterIcon color="#7F7F7F" />
                  ตัวกรอง
                </div>
                <img
                  src="../../public/src/images/close.svg"
                  alt="close"
                  class="absolute right-5 top-5 cursor-pointer"
                  @click="isOpen = false"
                />
              </div>

              <div class="overflow-y-scroll max-h-[80vh]">
                <div>
                  <Combobox
                    title="หน่วยงานรัฐเจ้าของโครงการ"
                    :list="props.list?.agencies"
                    defaultVal="ทุกหน่วยงาน"
                    @change="(n) => setFilter(n, 'agencies', 'ทุกหน่วยงาน')"
                    :selectedVal="selected.agencies"
                    :isClear="isClear"
                  />

                  <Combobox
                    title="ที่ตั้งโครงการ"
                    :list="props.list?.provinces"
                    defaultVal="ทุกจังหวัด"
                    @change="(n) => setFilter(n, 'province', 'ทุกจังหวัด')"
                    :selectedVal="selected.province"
                    :isClear="isClear"
                  />

                  <Combobox
                    title="วิธีการจัดหา"
                    :list="props.list?.resourcingMethod"
                    defaultVal="ทุกวิธี"
                    @change="(n) => setFilter(n, 'resourcingMethod', 'ทุกวิธี')"
                    :selectedVal="selected.resourcingMethod"
                    :isClear="isClear"
                  />
                </div>
              </div>

              <div
                class="flex items-center justify-between sm:justify-end pt-3 sm:mt-0 gap-2"
              >
                <button
                  @click="clearFilter"
                  type="button"
                  class="p-2.5 border border-[#0B5C90] hover:border-[#1688CA] rounded-10 b2 text-[#0B5C90] min-w-32"
                >
                  ล้างตัวกรอง
                  <img
                    src="../../public/src/images/reset.svg"
                    alt="filter"
                    class="inline"
                  />
                </button>
                <button
                  type="button"
                  @click="searchByResult"
                  class="b2 rounded-10 bg-black p-2.5 min-w-32 text-white hover:bg-[#1F1F1F] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                  ตกลง <CheckIcon class="size-4 inline" />
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
.radio-btn[aria-checked='true'] {
  background: #d9d9d9 !important;
}
</style>
