<template>
  <div class="text-[#7F7F7F] mt-5">
    <p class="font-bold b1">ปีงบประมาณ 555</p>
    <p class="b5">
      ปีงบประมาณ เริ่มนับจาก ต.ค. - ก.ย. เช่น ปีงบประมาณ 2568 หมายถึง ต.ค. 67 -
      ก.ย. 68
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
      <input type="text" class="dropdown-btn border-0" placeholder="เริ่มต้น" />
    </div>

    <p class="b1">-</p>

    <div class="flex-1 relative">
      <input type="text" class="dropdown-btn border-0" placeholder="สิ้นสุด" />
    </div>
  </div>

  <div class="flex items-center mb-4">
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
</template>

<script setup>
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';

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

// const getFilterList = async () => {
//   const res = await fetch(`${config.public.apiUrl}/project/search/filters`, {
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   if (res.ok) {
//     const data = await res.json();
//     console.log(data);
//   }
// };

// onMounted(async () => {
//   await getFilterList();
// });
</script>

<style scoped>
.radio-btn[aria-checked='true'] {
  background: #d9d9d9 !important;
}
</style>
