<template>
  <div class="flex items-center mt-0">
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
    </button>
    <button
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
                <template v-if="props.section == 'โครงการ'">
                  <div>
                    <div class="text-[#7F7F7F] mt-5">
                      <p class="font-bold b1">ปีงบประมาณ</p>
                      <p class="b5">
                        ปีงบประมาณ เริ่มนับจาก ต.ค. - ก.ย. เช่น ปีงบประมาณ 2568
                        หมายถึง ต.ค. 67 - ก.ย. 68
                      </p>
                    </div>

                    <div class="flex w-full gap-2 items-center">
                      <div class="flex-1 relative">
                        <ListBox
                          title=""
                          :selected="selected[0].yearFrom"
                          :list="filterList.year"
                        />
                      </div>

                      <p class="b1">-</p>

                      <div class="flex-1 relative">
                        <ListBox
                          title=""
                          :selected="selected[0].yearTo"
                          :list="filterList.year"
                        />
                      </div>
                    </div>

                    <Combobox
                      title="หน่วยงานรัฐเจ้าของโครงการ"
                      :selected="selected[0].agencies"
                      :list="filterList.agencies"
                    />

                    <Combobox
                      title="สังกัด"
                      :selected="selected[0].agencyBelongTo"
                      :list="filterList.agencyBelongTo"
                    />

                    <Combobox
                      title="ที่ตั้งโครงการ"
                      :selected="selected[0].provinces"
                      :list="filterList.provinces"
                    />

                    <Combobox
                      title="สถานะโครงการ"
                      :selected="selected[0].projectStatus"
                      :list="filterList.projectStatus"
                    />

                    <Combobox
                      title="วิธีการจัดหา"
                      :selected="selected[0].resoucingMethod"
                      :list="filterList.resoucingMethod"
                    />

                    <Combobox
                      title="ประเภทการจัดหา"
                      :selected="selected[0].recourcingType"
                      :list="filterList.recourcingType"
                    />

                    <Combobox
                      title="ประเภทผู้รับจ้าง"
                      :selected="selected[0].contractorType"
                      :list="filterList.contractorType"
                    />

                    <div class="text-[#7F7F7F] mt-5">
                      <p class="font-bold b1">วงเงิน</p>
                    </div>

                    <RadioGroup v-model="plan" class="flex">
                      <RadioGroupOption
                        v-slot="{ checked }"
                        class="flex-1 radio-btn b1"
                        value="งบประมาณ"
                      >
                        <span>งบประมาณ</span>
                      </RadioGroupOption>
                      <RadioGroupOption
                        v-slot="{ checked }"
                        class="flex-1 radio-btn b1"
                        value="วงเงินสัญญา"
                      >
                        <span>วงเงินสัญญา</span>
                      </RadioGroupOption>
                    </RadioGroup>

                    <div class="flex w-full gap-2 items-center my-3">
                      <div class="flex-1 relative">
                        <input
                          type="text"
                          class="dropdown-btn border-0"
                          placeholder="เริ่มต้น"
                        />
                      </div>

                      <p class="b1">-</p>

                      <div class="flex-1 relative">
                        <input
                          type="text"
                          class="dropdown-btn border-0"
                          placeholder="สิ้นสุด"
                        />
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else-if="props.section == 'หน่วยงานรัฐ'">
                  <div class="overflow-y-scroll max-h-[80vh]">
                    <Combobox
                      title="สังกัด"
                      :selected="selected[0].agencyBelongTo"
                      :list="filterList.agencyBelongTo"
                    />

                    <Combobox
                      title="ที่ตั้งหน่วยงาน"
                      :selected="selected[0].provinces"
                      :list="filterList.provinces"
                    /></div
                ></template>
                <template v-else>
                  <Combobox
                    title="ที่ตั้งผู้รับจ้าง"
                    :selected="selected[0].provinces"
                    :list="filterList.provinces"
                  />

                  <Combobox
                    title="ประเภทผู้รับจ้าง"
                    :selected="selected[0].contractorType"
                    :list="filterList.contractorType"
                  />
                </template>

                <div
                  class="flex items-center my-4"
                  v-if="props.section != 'หน่วยงานรัฐ'"
                >
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded"
                  />
                  <label for="default-checkbox" class="ms-2 b4 text-[#EC1C24]"
                    >ดูเฉพาะโครงการที่พบความเสี่ยงทุจริต</label
                  >
                </div>
              </div>

              <div
                class="flex items-center justify-between sm:justify-end pt-3 sm:mt-0 gap-2"
              >
                <button
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
                  @click="isOpen = false"
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

<script setup lang="ts">
import { ref } from 'vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  RadioGroup,
  RadioGroupOption,
} from '@headlessui/vue';

const props = defineProps<{
  section: string;
}>();

import { CheckIcon } from '@heroicons/vue/24/solid';

const isOpen = ref(false);
const plan = ref('งบประมาณ');

const selected = [
  {
    yearFrom: '2566',
    yearTo: '2567',
    agencies: 'ทุกหน่วยงาน',
    agencyBelongTo: 'ทุกหน่วยงาน',
    contractorType: 'ทุกประเภท',
    projectStatus: 'ทุกสถานะ',
    provinces: 'ทุกจังหวัด',
    recourcingType: 'ทุกประเภท',
    resoucingMethod: 'ทุกวิธี',
  },
];

const filterList = ref({
  year: ['2560', '2561', '2562', '2563', '2564', '2565', '2566', '2567'],
  agencies: [
    'ทุกหน่วยงาน',
    'การไฟฟ้านครหลวง ฝ่ายก่อสร้าง',
    'สำนักเลขาธิการนายกรัฐมนตรี',
    'สำนักงบประมาณ',
  ],
  agencyBelongTo: [
    'ทุกหน่วยงาน',
    'สำนักนายกรัฐมนตรี',
    'กระทรวงกลาโหม',
    'กระทรวงการคลัง',
    'กระทรวงการต่างประเทศ',
    'กระทรวงการท่องเทียวและกีฬา',
    'กระทรวงพัฒนาสังคมและความมั่นคงของมนุษย์',
    'กระทรวงเกษตรและสหกรณ์',
    'สำนักงานพิพิธภัณฑ์เกษตรเฉลิมพระเกียรติพระบาทสมเด็จพระเจ้าอยู่หัว (องค์การมหาชน)',
    'กระทรวงคมนาคม',
    'กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม',
    'กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม',
    'กระทรวงพลังงาน',
    'กระทรวงพาณิชย์',
    'กระทรวงมหาดไทย',
    'กระทรวงยุติธรรม',
    'กระทรวงแรงงาน',
    'กระทรวงวัฒนธรรม',
    'กระทรวงการอุคมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม',
    'กระทรวงศึกษาธิการ',
    'กระทรวงสาธารณสุข',
    'กระทรวงอุตสาหกรรม',
    'หน่วยงานของรัฐที่ไม่สังกัดสำนักนายกรัฐมนตรี กระทรวงหรือทบวง',
    'องค์กรอิสระตามรัฐธรรมนูญ',
    'PTT MEA LTD',
    'ไม่สามารถระบุได้',
  ],
  provinces: ['ทุกจังหวัด', 'กรุงเทพมหานคร', 'ปทุมธานี', 'แพร่'],
  projectStatus: [
    'ทุกสถานะ',
    'แล้วเสร็จตามสัญญา',
    'จัดทำสัญญา / PO แล้ว',
    'ระหว่างดำเนินการ',
    'ยกเลิกสัญญา',
    'ยกเลิกโครงการ',
  ],
  resoucingMethod: [
    'ทุกวิธี',
    'ประกวดราคา',
    'ตกลงราคา',
    'สอบราคา',
    'เฉพาะเจาะจง',
  ],
  recourcingType: ['ทุกประเภท', 'จ้างก่อสร้าง'],
  contractorType: ['ทุกประเภท', 'บริษัทจำกัด', 'ห้างหุ้นส่วน'],
});

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
</script>

<style scoped>
.radio-btn[aria-checked='true'] {
  background: #d9d9d9 !important;
}
</style>
