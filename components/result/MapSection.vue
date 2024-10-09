<template>
  <div class="bg-white p-4 sm:p-7 rounded-10">
    <h4 class="font-black">การกระจายตัวโครงการใน 4 จังหวัด</h4>

    <RadioGroup v-model="plan" class="flex lg:hidden">
      <RadioGroupOption
        v-slot="{ checked }"
        class="flex-1 radio-btn b1"
        value="จำนวนโครงการ"
      >
        <span>จำนวนโครงการ</span>
      </RadioGroupOption>
      <RadioGroupOption
        v-slot="{ checked }"
        class="flex-1 radio-btn b1"
        value="งบประมาณ"
      >
        <span>งบประมาณ</span>
      </RadioGroupOption>
    </RadioGroup>

    <div class="flex gap-2 flex-col-mb">
      <div class="flex-1" v-if="plan == 'all' || plan == 'จำนวนโครงการ'">
        <h5 class="font-bold hidden lg:block">จำนวนโครงการ</h5>
        <p class="b1 font-bold">รวม 6,040 โครงการ</p>
        <div
          class="border rounded-10 border-[#DADADA] px-5 pt-5 pb-14 sm:pb-5 my-3 relative"
        >
          <Map
            class="mx-auto max-w-xs h-fit w-fit"
            no="1"
            :provinces="provinces"
          />

          <div class="absolute w-32 bottom-5 right-5 text-[#8E8E8E]">
            <div class="flex justify-between b4">
              <p>0</p>
              <p>3,564</p>
            </div>
            <div
              class="h-[10px] w-full bg-gradient-to-r from-[#F5F5F5] to-[#484848]"
            ></div>
            <p>หน่วย : โครงการ</p>
          </div>
        </div>
      </div>
      <div class="flex-1" v-if="plan == 'all' || plan == 'งบประมาณ'">
        <h5 class="font-bold hidden lg:block">งบประมาณ</h5>
        <p class="b1 font-bold">รวม 6,135,658,110 บาท</p>
        <div
          class="border rounded-10 border-[#DADADA] px-5 pt-5 pb-14 sm:pb-5 my-3 relative"
        >
          <Map class="mx-auto max-w-xs h-fit" no="2" :provinces="provinces" />

          <div class="absolute w-32 bottom-5 right-5 text-[#8E8E8E]">
            <div class="flex justify-between b4">
              <p>0</p>
              <p>38B</p>
            </div>
            <div
              class="h-[10px] w-full bg-gradient-to-r from-[#F5F5F5] to-[#484848]"
            ></div>
            <p>หน่วย : บาท</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center max-w-4xl mx-auto gap-1">
      <RadioGroup v-model="sortBy" class="flex gap-1">
        <RadioGroupOption
          v-slot="{ checked }"
          class="radio-btn b1 rounded-10"
          value="desc"
        >
          <img src="../../public/src/images/sort-desc.svg" alt="" />
        </RadioGroupOption>
        <RadioGroupOption
          v-slot="{ checked }"
          class="radio-btn b1 rounded-10"
          value="asc"
        >
          <img src="../../public/src/images/sort-asc.svg" alt="" />
        </RadioGroupOption>
      </RadioGroup>

      <div class="relative w-3/4">
        <input
          type="text"
          class="input-text h-full"
          v-model="searchText"
          placeholder="พิมพ์ชื่อจังหวัด"
        />
        <SearchIcon color="#000000" class="absolute inset-y-0 my-auto left-2" />
      </div>
    </div>

    <div class="flex gap-5 mt-3">
      <div class="flex-1" v-if="plan == 'all' || plan == 'จำนวนโครงการ'">
        <p class="b4 text-right">จำนวนโครงการ</p>
        <div
          class="flex justify-between items-center py-2 border-b cursor-pointer"
          @click="setFill(item.name_en, 1)"
          v-for="(item, i) in searchResult"
        >
          <div class="flex gap-2 items-center">
            <p class="b4">{{ i + 1 }}</p>
            <p class="b1 font-bold">{{ item.name }}</p>
          </div>
          <div>
            <p class="b1">{{ item.totalProject.toLocaleString() }}</p>
          </div>
        </div>

        <p class="b1 text-center" v-if="searchResult.length == 0">
          ไม่พบข้อมูล
        </p>
      </div>
      <div class="flex-1" v-if="plan == 'all' || plan == 'งบประมาณ'">
        <p class="b4 text-right">งบประมาณ (บาท)</p>
        <div
          class="flex justify-between items-center py-2 border-b cursor-pointer"
          @click="setFill(item.name_en, 2)"
          v-for="(item, i) in searchResult"
        >
          <div class="flex gap-2 items-center">
            <p class="b4">{{ i + 1 }}</p>
            <p class="b1 font-bold">{{ item.name }}</p>
          </div>
          <div>
            <p class="b1">{{ item.totalBudgetMoney.toLocaleString() }}</p>
          </div>
        </div>

        <p class="b1 text-center" v-if="searchResult.length == 0">
          ไม่พบข้อมูล
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';

const sortBy = ref('desc');
let searchText = ref('');
let plan = ref('จำนวนโครงการ');

const provinces = [
  {
    name: 'กรุงเทพมหานคร',
    name_en: 'bangkok',
    totalProject: 3564,
    totalBudgetMoney: 38899482862,
    totalCorruptionProject: 497,
  },
  {
    name: 'ปทุมธานี',
    name_en: 'pathumthani',
    totalProject: 120,
    totalBudgetMoney: 482865642,
    totalCorruptionProject: 34,
  },
  {
    name: 'เชียงใหม่',
    name_en: 'chiangmai',
    totalProject: 2000,
    totalBudgetMoney: 6482865642,
    totalCorruptionProject: 34,
  },
  {
    name: 'แพร่',
    name_en: 'phrae',
    totalProject: 356,
    totalBudgetMoney: 270443964,
    totalCorruptionProject: 239,
  },
];

const searchResult = computed(() => {
  let filteredData =
    sortBy.value == 'desc'
      ? provinces.sort((a, b) => b.totalProject - a.totalProject)
      : provinces.sort((a, b) => a.totalProject - b.totalProject);

  return filteredData.filter((data) => {
    if (data.name.includes(searchText.value)) {
      return data;
    }
  });
});

const setFill = (id, n) => {
  let provinces_list = document.getElementsByClassName('provinces-1');
  let provinces_list_2 = document.getElementsByClassName('provinces-2');

  [...provinces_list].forEach((element) => {
    element.style.stroke = 'black';
  });

  [...provinces_list_2].forEach((element) => {
    element.style.stroke = 'black';
  });

  document.querySelector('.provinces-' + n + '#' + id).style.stroke = 'red';
};

onMounted(() => {
  plan.value = window.innerWidth > 1024 ? 'all' : 'จำนวนโครงการ';
});
</script>

<style lang="scss" scoped>
.input-text {
  padding-left: 30px !important;

  @include mobile {
    // width: 150px !important;
  }
}
</style>
