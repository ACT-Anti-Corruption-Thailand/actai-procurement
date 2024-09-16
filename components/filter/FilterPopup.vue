<template>
  <div class="flex items-center mt-3 sm:mt-0">
    <button
      type="button"
      @click="openModal"
      class="b2 rounded-[10px] bg-black p-2.5 text-sm font-medium text-white hover:bg-[#1F1F1F] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
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
      class="p-2.5 border border-[#0B5C90] rounded-[10px] ml-1"
    >
      <img
        src="../../public/src/images/reset.svg"
        alt="filter"
        class="inline"
      />
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
              class="w-full max-w-[500px] transform overflow-hidden rounded-[10px] bg-[#F5F5F5] p-6 text-left align-middle shadow-xl transition-all"
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

              <div class="overflow-y-scroll h-[80vh]">
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
                      :selected="selected[0].year"
                      :list="filterList.year"
                    />
                  </div>

                  <p class="b1">-</p>

                  <div class="flex-1 relative">
                    <ListBox
                      title=""
                      :selected="selected[0].year"
                      :list="filterList.year"
                    />
                  </div>
                </div>

                <ListBox
                  title="หน่วยงานรัฐเจ้าของโครงการ"
                  :selected="selected[0].agencies"
                  :list="filterList.agencies"
                />

                <ListBox
                  title="สังกัด"
                  :selected="selected[0].agencyBelongTo"
                  :list="filterList.agencyBelongTo"
                />

                <ListBox
                  title="ที่ตั้งโครงการ"
                  :selected="selected[0].provinces"
                  :list="filterList.provinces"
                />

                <ListBox
                  title="สถานะโครงการ"
                  :selected="selected[0].projectStatus"
                  :list="filterList.projectStatus"
                />

                <ListBox
                  title="วิธีการจัดหา"
                  :selected="selected[0].resoucingMethod"
                  :list="filterList.resoucingMethod"
                />

                <ListBox
                  title="ประเภทการจัดหา"
                  :selected="selected[0].recourcingType"
                  :list="filterList.recourcingType"
                />

                <ListBox
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
                      class="dropdown-btn"
                      placeholder="เริ่มต้น"
                    />
                  </div>

                  <p class="b1">-</p>

                  <div class="flex-1 relative">
                    <input
                      type="text"
                      class="dropdown-btn"
                      placeholder="สิ้นสุด"
                    />
                  </div>
                </div>

                <div class="flex items-center mb-4">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                  <label for="default-checkbox" class="ms-2 b1 text-[#EC1C24]"
                    >ดูเฉพาะโครงการที่พบความเสี่ยงทุจริต</label
                  >
                </div>
              </div>

              <div class="flex items-center justify-end mt-3 sm:mt-0 gap-2">
                <button
                  type="button"
                  class="p-2.5 border border-[#0B5C90] rounded-[10px] ml-1 b2 text-[#0B5C90]"
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
                  class="b2 rounded-[10px] bg-black p-2.5 text-sm font-medium text-white hover:bg-[#1F1F1F] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                  ตกลง
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  RadioGroup,
  RadioGroupOption,
} from '@headlessui/vue';

const isOpen = ref(false);
const plan = ref('งบประมาณ ');

const selected = [
  {
    year: '2567',
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

<style scoped></style>
