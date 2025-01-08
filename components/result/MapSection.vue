<template>
  <div
    class="bg-white p-4 sm:p-7 rounded-10"
    v-if="totalBudget != 0 && totalProject != 0"
  >
    <h4 class="font-black">
      การกระจายตัวโครงการใน {{ provinces.length }} จังหวัด
    </h4>

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
        <p class="b1 font-bold">
          รวม {{ totalProject.toLocaleString() }} โครงการ
        </p>
        <div
          class="border rounded-10 border-[#DADADA] px-5 pt-5 pb-14 sm:pb-5 my-3 relative"
        >
          <Map no="1" :provinces="props.data" :total="totalProject" />

          <div class="absolute w-32 bottom-5 right-5 text-[#8E8E8E]">
            <div class="flex justify-between b4">
              <p>0</p>
              <p>{{ totalProject.toLocaleString() }}</p>
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
        <p class="b1 font-bold">รวม {{ totalBudget.toLocaleString() }} บาท</p>
        <div
          class="border rounded-10 border-[#DADADA] px-5 pt-5 pb-14 sm:pb-5 my-3 relative"
        >
          <Map no="2" :provinces="props.data" :total="totalBudget" />

          <div class="absolute w-32 bottom-5 right-5 text-[#8E8E8E]">
            <div class="flex justify-between b4">
              <p>0</p>
              <p>
                {{
                  totalBudget > 1000000
                    ? (totalBudget / 1000000).toLocaleString() + 'K'
                    : totalBudget.toLocaleString()
                }}
              </p>
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
          class="flex justify-between items-center py-2 cursor-pointer"
          :class="{ 'border-b': i != searchResult.length - 1 }"
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
          class="flex justify-between items-center py-2 cursor-pointer"
          :class="{ 'border-b': i != searchResult.length - 1 }"
          v-for="(item, i) in searchResult2"
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
import type { MapData } from '../../public/src/data/search_result';
import Province_data from '../../public/src/provinces.json';

const props = defineProps<{
  data: MapData;
}>();

const sortBy = ref('desc');
const totalProject = ref(0);
const totalBudget = ref(0);
const provinces = ref([]);
let searchText = ref('');
let plan = ref('จำนวนโครงการ');

const searchResult = computed(() => {
  let filteredData =
    sortBy.value == 'desc'
      ? props.data
          .filter((x) => x.totalProject != 0)
          .sort((a, b) => b.totalProject - a.totalProject)
      : props.data
          .filter((x) => x.totalProject != 0)
          .sort((a, b) => a.totalProject - b.totalProject);

  return filteredData.filter((data) => {
    let p = Province_data.filter((x) => x.name_th == data.name);
    nextTick(() => {
      setStroke(p[0].name_en, 'black');
    });

    if (data.name.includes(searchText.value)) {
      nextTick(() => {
        if (searchText.value != '') setStroke(p[0].name_en, 'red');
      });

      return data;
    }
  });
});

const searchResult2 = computed(() => {
  let filteredData =
    sortBy.value == 'desc'
      ? props.data
          .filter((x) => x.totalBudgetMoney != 0)
          .sort((a, b) => b.totalBudgetMoney - a.totalBudgetMoney)
      : props.data
          .filter((x) => x.totalBudgetMoney != 0)
          .sort((a, b) => a.totalBudgetMoney - b.totalBudgetMoney);

  return filteredData.filter((data) => {
    let p = Province_data.filter((x) => x.name_th == data.name);
    nextTick(() => {
      setStroke(p[0].name_en, 'black');
    });

    if (data.name.includes(searchText.value)) {
      nextTick(() => {
        if (searchText.value != '') setStroke(p[0].name_en, 'red');
      });

      return data;
    }
  });
});

const setStroke = (id, color) => {
  document.querySelector('.provinces-1' + '#' + id).style.stroke = color;
  document.querySelector('.provinces-2' + '#' + id).style.stroke = color;
};

onMounted(() => {
  plan.value = window.innerWidth > 1024 ? 'all' : 'จำนวนโครงการ';

  provinces.value = props.data.filter((x) => x.totalProject != 0);

  const a = provinces.value.map((o) => o.totalProject);
  totalProject.value = a.reduce((partialSum, a) => partialSum + a, 0);
  const b = provinces.value.map((o) => o.totalBudgetMoney);
  totalBudget.value = b.reduce((partialSum, a) => partialSum + a, 0);
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
