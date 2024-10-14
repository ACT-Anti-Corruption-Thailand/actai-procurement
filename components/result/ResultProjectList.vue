<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

const selectedTab = ref(0);
const isOpen = ref(false);
const isOpen2 = ref(false);

const props = defineProps<{
  iconGuide: object;
  mockDataGuide: object;
  data: array;
  yearList: array;
  projectList: array;
  chartDataSet1: array;
  chartDataSet2: array;
}>();

const dataTest = ref(null);

const yearlyAggregates = [
  {
    budgetYear: '2555',
    totalProject: 0,
    totalContract: 0,
    aggregateBy: {
      budgetMoney: 0,
      hasCorruptionRiskProject: 0,
      hasNoCorruptionRiskProject: 0,
      projectStatus: {
        completed: 0,
        contracted: 0,
        inprogress: 0,
        cancelContract: 0,
        cancelProject: 0,
      },
      contractStatus: {
        delivered: 0,
        deliveredOnTime: 0,
        deliveredLate: 0,
        contracted: 0,
        inprogress: 0,
        cancelContract: 0,
      },
      resourcingMethod: {
        bidding: 0,
        internationalBidding: 0,
        eBidding: 0,
        eBiddingViaMarket: 0,
        settlePrice: 0,
        checkPrice: 0,
        eMarket: 0,
        specialMethod: 0,
        selective: 0,
        specific: 0,
      },
    },
  },
  {
    budgetYear: '2556',
    totalProject: 100,
    totalContract: 60,
    aggregateBy: {
      budgetMoney: 120000000,
      hasCorruptionRiskProject: 20,
      hasNoCorruptionRiskProject: 10,
      projectStatus: {
        completed: 10,
        contracted: 30,
        inprogress: 20,
        cancelContract: 20,
        cancelProject: 20,
      },
      contractStatus: {
        delivered: 10,
        deliveredOnTime: 5,
        deliveredLate: 5,
        contracted: 25,
        inprogress: 5,
        cancelContract: 20,
      },
      resourcingMethod: {
        bidding: 10,
        internationalBidding: 20,
        eBidding: 20,
        eBiddingViaMarket: 5,
        settlePrice: 10,
        checkPrice: 8,
        eMarket: 4,
        specialMethod: 23,
        selective: 32,
        specific: 20,
      },
    },
  },
  {
    budgetYear: '2557',
    totalProject: 34,
    totalContract: 5,
    aggregateBy: {
      budgetMoney: 65000000,
      hasCorruptionRiskProject: 5,
      hasNoCorruptionRiskProject: 5,
      projectStatus: {
        completed: 0,
        contracted: 0,
        inprogress: 0,
        cancelContract: 0,
        cancelProject: 0,
      },
      contractStatus: {
        delivered: 0,
        deliveredOnTime: 0,
        deliveredLate: 0,
        contracted: 0,
        inprogress: 0,
        cancelContract: 0,
      },
      resourcingMethod: {
        bidding: 0,
        internationalBidding: 0,
        eBidding: 0,
        eBiddingViaMarket: 0,
        settlePrice: 0,
        checkPrice: 0,
        eMarket: 0,
        specialMethod: 0,
        selective: 0,
        specific: 0,
      },
    },
  },
];

function changeTab(index) {
  selectedTab.value = index;
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

function highlight(title: string, text: string) {
  var innerHTML = title;
  const urlParams = decodeURI(window.location.href).split('=')[1];
  var index = innerHTML.indexOf(urlParams);

  if (index >= 0) {
    innerHTML =
      innerHTML.substring(0, index) +
      "<span class='text-[#74060A]'>" +
      innerHTML.substring(index, index + urlParams.length) +
      '</span>' +
      innerHTML.substring(index + urlParams.length);
  }
  return innerHTML;
}

const searchText = ref('');

onMounted(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  searchText.value = urlParams.get('search');
});

const menuList = ref([
  {
    title: 'สถานะโครงการที่พบมากที่สุด',
    desc: '',
    total: 0,
    id: 'chart-3',
  },
  {
    title: 'สถานะของสัญญาที่พบมากที่สุด',
    desc: '',
    total: 0,
    id: 'chart-4',
  },
  {
    title: 'วิธีการจัดหาที่พบมากที่สุด',
    desc: '',
    total: 0,
    id: 'chart-5',
  },
  {
    title: 'จังหวัดที่มีจำนวนโครงการมากที่สุด',
    desc: '',
    id: 'maps',
  },
  {
    title: 'จังหวัดที่ใช้งบประมาณมากที่สุด',
    desc: '',
    id: 'maps',
  },
]);

onMounted(() => {
  menuList.value[0].desc = props.data.maxProjectStatus.name;
  menuList.value[0].total = props.data.maxProjectStatus.total;
  menuList.value[1].desc = props.data.maxContractStatus.name;
  menuList.value[1].total = props.data.maxContractStatus.total;
  menuList.value[2].desc = props.data.maxResourcingMethod.name;
  menuList.value[2].total = props.data.maxResourcingMethod.total;
  menuList.value[3].desc = props.data.provinceWithHighestBudgetMoney;
  menuList.value[4].desc = props.data.provinceWithHighestProjects;
});
</script>

<template>
  <!-- <div>
    <h5 class="text-center text-[#8E8E8E]">
      ไม่พบโครงการจัดซื้อจัดจ้างที่มีคำค้นนี้
    </h5>
  </div> -->
  <TabGroup :selectedIndex="selectedTab" @change="changeTab" as="Component">
    <div
      class="flex justify-between items-center mx-auto max-w-6xl px-4 sm:px-0"
    >
      <TabList>
        <Tab class="tab-menu b1">รายชื่อ</Tab>
        <Tab class="tab-menu b1">ภาพรวม</Tab>
      </TabList>
      <!-- <div><FilterPopupResult section="โครงการ" /></div> -->
    </div>

    <TabPanels>
      <TabPanel class="mx-auto max-w-6xl px-4">
        <div class="flex gap-2 py-5 flex-col-mb">
          <div class="rounded-10 bg-black p-5 text-white sm:w-3/5">
            <p class="b1 font-bold">
              จำนวนโครงการจัดซื้อจัดจ้างตามเงื่อนไขที่ค้นหา
            </p>
            <h2 class="font-black">{{ data.totalProject }} โครงการ</h2>
            <hr />
            <div class="flex">
              <div class="flex-1">
                <p class="b2">งบประมาณรวม (บาท)</p>
                <h5 class="font-bold" v-if="data != null">
                  {{ data?.totalBudgetMoney.toLocaleString() }}
                </h5>
              </div>
              <div class="flex-1 text-[#EC1C24]">
                <p class="b2">เป็นโครงการเสี่ยงทุจริต</p>
                <h5 class="font-bold">{{ data.totalProjectHasCorruption }}%</h5>
              </div>
            </div>

            <GoToText
              color="#8DCCF0"
              text="ดูภาพรวมเพิ่มเติม"
              class="mb-0"
              @click="selectedTab = 1"
            />
          </div>

          <div class="sm:w-2/5">
            <div class="rounded-10 bg-[#F5F5F5] p-5 text-black mb-3">
              <p class="b1">หน่วยงานรัฐเจ้าของโครงการ</p>
              <h5 class="font-bold">{{ data.totalAgency }} หน่วยงาน</h5>
              <!-- <p
                class="b2 link-1 flex items-center gap-1"
                v-if="data.totalAgency != 0"
              >
                ดูรายชื่อ
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 2H5C4.73502 2.00078 4.48112 2.10638 4.29375 2.29375C4.10639 2.48112 4.00078 2.73502 4 3V10C4.00078 10.265 4.10639 10.5189 4.29375 10.7062C4.48112 10.8936 4.73502 10.9992 5 11H14C14.265 10.9992 14.5189 10.8936 14.7062 10.7062C14.8936 10.5189 14.9992 10.265 15 10V3C14.9992 2.73502 14.8936 2.48112 14.7062 2.29375C14.5189 2.10638 14.265 2.00078 14 2ZM14 10H5V3H14V10Z"
                    fill="currentColor"
                  />
                  <path
                    d="M9 13H2V8H3V7H2C1.73502 7.00078 1.48112 7.10639 1.29375 7.29375C1.10638 7.48112 1.00078 7.73502 1 8V13C1.00078 13.265 1.10638 13.5189 1.29375 13.7062C1.48112 13.8936 1.73502 13.9992 2 14H9C9.26498 13.9992 9.51888 13.8936 9.70625 13.7062C9.89362 13.5189 9.99922 13.265 10 13V12H9V13Z"
                    fill="currentColor"
                  />
                </svg>
              </p> -->
            </div>
            <div class="rounded-10 bg-[#F5F5F5] p-5 text-black">
              <p class="b1">ผู้รับจ้าง</p>
              <h5 class="font-bold">{{ data.totalCompany }} ราย</h5>
              <!-- <p
                class="b2 link-1 flex items-center gap-1"
                v-if="data.totalCompany != 0"
              >
                ดูรายชื่อ
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 2H5C4.73502 2.00078 4.48112 2.10638 4.29375 2.29375C4.10639 2.48112 4.00078 2.73502 4 3V10C4.00078 10.265 4.10639 10.5189 4.29375 10.7062C4.48112 10.8936 4.73502 10.9992 5 11H14C14.265 10.9992 14.5189 10.8936 14.7062 10.7062C14.8936 10.5189 14.9992 10.265 15 10V3C14.9992 2.73502 14.8936 2.48112 14.7062 2.29375C14.5189 2.10638 14.265 2.00078 14 2ZM14 10H5V3H14V10Z"
                    fill="currentColor"
                  />
                  <path
                    d="M9 13H2V8H3V7H2C1.73502 7.00078 1.48112 7.10639 1.29375 7.29375C1.10638 7.48112 1.00078 7.73502 1 8V13C1.00078 13.265 1.10638 13.5189 1.29375 13.7062C1.48112 13.8936 1.73502 13.9992 2 14H9C9.26498 13.9992 9.51888 13.8936 9.70625 13.7062C9.89362 13.5189 9.99922 13.265 10 13V12H9V13Z"
                    fill="currentColor"
                  />
                </svg>
              </p> -->
            </div>
          </div>
        </div>

        <!-- <div class="flex items-center justify-between my-5">
          <SortBy
            text="เรียงตาม"
            :list="['ความใกล้เคียงคำค้น', 'วันที่ประกาศโครงการ', 'งบประมาณรวม']"
          />

          <DownloadAndCopy />
        </div> -->

        <ProjectIconGuide :data="props.iconGuide" color="#8E8E8E" />

        <div class="my-3">
          <a
            v-for="(item, i) in props.projectList.searchResult"
            :key="i"
            target="_blank"
            :href="'/project/' + item.projectId"
          >
            <div
              class="flex justify-between flex-col-mb p-2.5 sm:p-5 rounded-10 btn-light-4"
            >
              <div class="w-3/4">
                <p
                  class="b1 font-bold"
                  v-html="highlight(item.projectName)"
                ></p>
                <ProjectIconGuide
                  :data="{
                    name: '',
                    province: item.province,
                    year: item.budgetYear,
                    owner: item.agencyName,
                    no: item.projectId,
                  }"
                  color="#8E8E8E"
                />
                <ProjectTag
                  text="พบความเสี่ยงทุจริต"
                  v-if="item.hasCorruptionRisk"
                />
              </div>
              <div
                class="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-normal"
              >
                <p class="b4 text-[#5E5E5E]">งบประมาณรวม (บาท)</p>
                <p class="b1">{{ item.totalBudget.toLocaleString() }}</p>
              </div>
            </div>
          </a>
        </div>
      </TabPanel>
      <TabPanel>
        <div class="mx-auto max-w-6xl px-4 lg:px-0">
          <h5 class="font-bold my-5">
            {{ data.totalProject }} โครงการจัดซื้อจัดจ้าง
          </h5>
          <div class="flex flex-col-mb gap-2">
            <a href="#chart-1" class="sm:w-2/4">
              <div class="rounded-10 btn-chart p-5 text-white relative">
                <p class="b1">งบประมาณรวม (บาท)</p>
                <h4 class="font-black" v-if="data != null">
                  {{ data?.totalBudgetMoney.toLocaleString() }}
                </h4>
                <arrow
                  color="#FFFFFF"
                  class="absolute right-5 top-5 rotate-90"
                /></div
            ></a>
            <a href="#chart-2" class="sm:w-2/4">
              <div class="rounded-10 btn-chart p-5 relative text-white">
                <p class="b1 text-[#EC1C24]">โครงการเสี่ยงทุจริต</p>
                <h4 class="font-black text-[#EC1C24]">
                  {{ data?.totalProjectHasCorruption }}%
                </h4>
                <arrow
                  color="#FFFFFF"
                  class="absolute right-5 top-5 rotate-90"
                /></div
            ></a>
          </div>

          <div class="flex justify-between flex-wrap gap-2 mt-2 mb-7">
            <a
              :href="'#' + item.id"
              :class="{
                'w-full sm:w-[32%] lg:w-[19%]': item.id != 'maps',
                'w-full sm:w-[49%] lg:w-[19%]': item.id == 'maps',
              }"
              v-for="item in menuList"
            >
              <div class="rounded-10 btn-chart p-5 text-white h-full relative">
                <p class="b2 w-[95%] text-[#DADADA]">{{ item.title }}</p>
                <p class="b1 font-bold">{{ item.desc }}</p>
                <arrow
                  color="#FFFFFF"
                  class="absolute right-5 top-5 rotate-90"
                />
              </div>
            </a>
          </div>
        </div>

        <!-- <div class="bg-[#1F1F1F] p-4 sm:p-10 mt-10">
          <div class="max-w-6xl mx-auto">
            <BarChart3
              :data="props.chartDataSet1"
              :yearList="props.yearList"
              title="งบประมาณ"
              section=""
            />

            <BarChart3
              :data="props.chartDataSet2"
              :yearList="props.yearList"
              title="วิธีการจัดหา"
              id="chart-1"
              section="risk"
            />

  

            <BarChart
              title="สถานะโครงการ"
              :data="yearlyAggregates"
              titleType="0"
              id="chart-3"
            />

            <BarChart
              title="สถานะสัญญา"
              :data="yearlyAggregates"
              titleType="0"
              id="chart-4"
            />

            <BarChart
              title="วิธีการจัดหา"
              :data="yearlyAggregates"
              titleType="0"
              id="chart-5"
              @isOpen="isOpen2 = true"
            />

           <MapSection class="mt-5" id="maps" />
          </div>

          <div
            @click="scrollToTop()"
            class="flex link-2 justify-center gap-2 b2 mt-5 items-center"
          >
            กลับด้านบน <arrow color="#8DCCF0" class="-rotate-90" />
          </div>
        </div> -->
      </TabPanel>
    </TabPanels>
  </TabGroup>

  <Modal
    v-if="isOpen"
    @close="isOpen = false"
    title="ACT Ai ตรวจสอบโครงการเสี่ยงอย่างไร ?"
  />

  <Modal
    v-if="isOpen2"
    @close="isOpen2 = false"
    title="วิธีการจัดหา มีอะไรบ้าง ลักษณะเป็นอย่างไร?"
  />
</template>

<style lang="scss" scoped>
.btn-chart {
  @apply bg-black hover:bg-[#333333] duration-300 cursor-pointer;
}
</style>
