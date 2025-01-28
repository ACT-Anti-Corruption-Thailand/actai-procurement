<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import type { Project, MapData } from '../../public/src/data/search_result';
import type {
  ChartDataSet,
  FilterListProject,
  ProjectListSummaryData,
} from '~/models/data';

const props = defineProps<{
  iconGuide: object;
  mockDataGuide: object;
  filterListProject?: FilterListProject;
  data: ProjectListSummaryData;
  yearList: unknown[];
  projectList: Project;
  chartDataSet1: ChartDataSet[];
  chartDataSet2: ChartDataSet[];
  chartDataSet3: ChartDataSet[];
  chartDataSet4: ChartDataSet[];
  chartDataSet5: ChartDataSet[];
  mapData: MapData;
}>();

const selectedTab = ref(0);
const isOpen = ref(false);
const isOpen2 = ref(false);
const isOpenGovModal = ref(false);
const isOpenContractorModal = ref(false);
const emit = defineEmits(['search']);
const sort = ref('relevanceScore');
const sortOrder = ref('desc');
const page = ref(0);
const searchText = ref('');
const queryForDownload = ref('');
const menuList = ref([
  {
    title: 'สถานะโครงการที่พบมากที่สุด',
    desc: '',
    percent: 0,
    total: 0,
    id: 'chart-3',
  },
  {
    title: 'สถานะของสัญญาที่พบมากที่สุด',
    desc: '',
    percent: 0,
    total: 0,
    id: 'chart-4',
  },
  {
    title: 'วิธีการจัดหาที่พบมากที่สุด',
    desc: '',
    percent: 0,
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
const filterList = ref('');

function changeTab(index: number) {
  selectedTab.value = index;
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

function highlight(title: string) {
  var innerHTML = title;
  const urlParams = decodeURI(window.location.href).split('=')[1];
  var index = innerHTML.toLowerCase().indexOf(urlParams);

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

const setParams = (type: string, val: string) => {
  const searchParams = new URLSearchParams();

  if (type == 'sortBy') sort.value = val;
  else if (type == 'page')
    page.value = page.value == 0 ? 20 : page.value + +val;
  else if (type == 'filter') filterList.value = val;
  else if (type == 'sortOrder') sortOrder.value = val;

  searchParams.set('sortBy', type == 'sortBy' ? val : sort.value);
  searchParams.set('sortOrder', type == 'sortOrder' ? val : sortOrder.value);
  searchParams.set('pageSize', `${type == 'page' ? page.value : 10}`);

  queryForDownload.value = '&' + searchParams.toString() + filterList.value;
  emit('search', '&' + searchParams.toString() + filterList.value, 'details');
};

const setSumData = () => {
  menuList.value[0].desc = props.data.maxProjectStatus?.name;
  menuList.value[0].total = props.data.maxProjectStatus?.total;
  menuList.value[0].percent =
    props.data.totalProject != 0
      ? (props.data.maxProjectStatus?.total / props.data.totalProject) * 100
      : 0;
  menuList.value[1].desc = props.data.maxContractStatus?.name;
  menuList.value[1].total = props.data.maxContractStatus?.total;
  menuList.value[1].percent =
    props.data.totalProject != 0
      ? (props.data.maxContractStatus?.total / props.data.totalProject) * 100
      : 0;
  menuList.value[2].desc = props.data.maxResourcingMethod?.name;
  menuList.value[2].total = props.data.maxResourcingMethod?.total;
  menuList.value[2].percent =
    props.data.totalProject != 0
      ? (props.data.maxResourcingMethod?.total / props.data.totalProject) * 100
      : 0;
  menuList.value[3].desc = props.data.provinceWithHighestBudgetMoney;
  menuList.value[4].desc = props.data.provinceWithHighestProjects;
};

const sumDataFromAPI = toRef(props, 'data');

watch(sumDataFromAPI, (newX) => {
  setSumData();
});

onMounted(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  searchText.value = urlParams.get('search') || '';
  queryForDownload.value = '&sortBy=relevanceScore&sortOrder=desc';
  setSumData();
});
</script>

<template>
  <TabGroup :selectedIndex="selectedTab" @change="changeTab" as="Component">
    <div
      class="flex justify-between items-center mx-auto max-w-6xl px-4 sm:px-0"
    >
      <TabList>
        <Tab class="tab-menu b1">รายชื่อ</Tab>
        <Tab class="tab-menu b1">ภาพรวม</Tab>
      </TabList>
      <div>
        <FilterPopupResult
          v-if="props.filterListProject"
          section="โครงการ"
          @change="setParams"
          :list="props.filterListProject"
        />
      </div>
    </div>

    <TabPanels>
      <TabPanel class="mx-auto max-w-6xl px-4">
        <div class="flex gap-2 py-5 flex-col-mb">
          <div class="rounded-10 bg-black p-5 text-white sm:w-3/5">
            <p class="b1 font-bold">
              จำนวนโครงการจัดซื้อจัดจ้างตามเงื่อนไขที่ค้นหา
            </p>
            <h2 class="font-black">
              {{ props.data.totalProject.toLocaleString() }} โครงการ
            </h2>
            <hr />
            <div class="flex gap-2">
              <div class="flex-1">
                <p class="b2">งบประมาณรวม (บาท)</p>
                <h5
                  class="font-bold"
                  v-if="props.data.totalBudgetMoney != null"
                >
                  {{ setNumber(props.data.totalBudgetMoney) }}
                </h5>
              </div>
              <div class="flex-1 text-[#EC1C24]">
                <p class="b2">เป็นโครงการเสี่ยงทุจริต</p>
                <h5 class="font-bold">
                  {{
                    props.data.totalProject != 0
                      ? setNumber(
                          (props.data.totalProjectHasCorruption /
                            props.data.totalProject) *
                            100
                        )
                      : 0
                  }}%
                </h5>
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
              <h5 class="font-bold">
                {{ props.data.totalAgency.toLocaleString() }} หน่วยงาน
              </h5>
              <p
                @click="isOpenGovModal = true"
                class="b2 link-1 flex items-center gap-1"
                v-if="props.data.totalAgency != 0"
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
              </p>
            </div>
            <div class="rounded-10 bg-[#F5F5F5] p-5 text-black">
              <p class="b1">ผู้รับจ้าง</p>
              <h5 class="font-bold">
                {{ props.data.totalCompany.toLocaleString() }} ราย
              </h5>
              <p
                @click="isOpenContractorModal = true"
                class="b2 link-1 flex items-center gap-1"
                v-if="props.data.totalCompany != 0"
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
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between my-5">
          <SortBy
            text="เรียงตาม"
            :list="[
              {
                name: 'ความใกล้เคียงคำค้น',
                value: 'relevanceScore',
              },
              {
                name: 'วันที่ประกาศโครงการ',
                value: 'announcementDate',
              },
              {
                name: 'งบประมาณรวม',
                value: 'budgetMoney',
              },
            ]"
            @change="setParams"
            @sortBy="setParams"
          />

          <DownloadAndCopy :filterList="queryForDownload" section="project" />
        </div>

        <ProjectIconGuide :data="props.iconGuide" color="#8E8E8E" />

        <div v-if="props.projectList?.pagination.totalItem == 0">
          <h5 class="text-center text-[#8E8E8E] py-5">
            ไม่พบโครงการจัดซื้อจัดจ้างที่มีคำค้นนี้
          </h5>
        </div>
        <div class="my-3" v-else>
          <a
            v-for="(item, i) in props.projectList?.searchResult"
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
                    date: item.announcementDate,
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
                <p class="b1">{{ setNumber(item.totalBudget) }}</p>
              </div>
            </div>
          </a>

          <div class="text-center">
            <LoadMore
              v-if="
                props.projectList?.searchResult.length <
                props.projectList?.pagination?.totalItem
              "
              @click="setParams('page', '10')"
            />
          </div>
        </div>

        <GovernmentPopup
          v-if="isOpenGovModal"
          @close="isOpenGovModal = false"
        />
        <ContractorPopup
          v-if="isOpenContractorModal"
          @close="isOpenContractorModal = false"
        />
      </TabPanel>
      <TabPanel>
        <div class="mx-auto max-w-6xl px-4 lg:px-0">
          <h5 class="font-bold my-5">
            {{ props.data.totalProject.toLocaleString() }}
            โครงการจัดซื้อจัดจ้าง
          </h5>
          <div class="flex flex-col-mb gap-2">
            <a href="#chart-1" class="sm:w-2/4">
              <div class="rounded-10 btn-chart p-5 text-white relative">
                <p class="b1">งบประมาณรวม (บาท)</p>
                <h4 class="font-black" v-if="data != null">
                  {{ setNumber(props.data.totalBudgetMoney) }}
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
                  {{
                    props.data.totalProject != 0
                      ? setNumber(
                          (props.data.totalProjectHasCorruption /
                            props.data.totalProject) *
                            100
                        )
                      : 0
                  }}%
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
                <p class="b2 w-[90%] text-[#DADADA]">
                  {{ item.title }}
                  <span v-if="item.id.includes('chart') && item.percent != 0"
                    >({{ setNumber(item.percent) }}%)</span
                  >
                </p>
                <p class="b1 font-bold">
                  {{ item.desc != null ? item.desc : '-' }}
                </p>
                <arrow
                  color="#FFFFFF"
                  class="absolute right-5 top-6 rotate-90"
                />
              </div>
            </a>
          </div>
        </div>

        <div class="bg-[#1F1F1F] p-4 sm:p-10 mt-10">
          <div class="max-w-6xl mx-auto">
            <BarChart
              :data="props.chartDataSet1"
              :yearList="props.yearList"
              title="งบประมาณ"
              id="chart-1"
              section="budget"
              v-if="props.chartDataSet1.length > 0"
            />

            <BarChart
              :data="props.chartDataSet2"
              :yearList="props.yearList"
              title="ความเสี่ยงทุจริต"
              id="chart-2"
              section="risk"
              v-if="props.chartDataSet2.length > 0"
            />

            <BarChart
              :data="props.chartDataSet3"
              :yearList="props.yearList"
              title="สถานะโครงการ"
              id="chart-3"
              section="project"
              v-if="props.chartDataSet3.length > 0"
            />

            <BarChart
              :data="props.chartDataSet4"
              :yearList="props.yearList"
              title="สถานะสัญญา"
              id="chart-4"
              section="contract"
              v-if="props.chartDataSet4.length > 0"
            />

            <BarChart
              :data="props.chartDataSet5"
              :yearList="props.yearList"
              title="วิธีการจัดหา"
              id="chart-5"
              section="method"
              v-if="props.chartDataSet5.length > 0"
            />

            <MapSection
              class="mt-5"
              id="maps"
              :data="props.mapData"
              v-if="props.mapData != null && props.data.totalProject != 0"
            />
          </div>

          <div
            @click="scrollToTop()"
            class="flex link-2 justify-center gap-2 b2 mt-5 items-center"
          >
            กลับด้านบน <arrow color="#8DCCF0" class="-rotate-90" />
          </div>
        </div>
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
