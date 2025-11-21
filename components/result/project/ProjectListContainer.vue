<script setup lang="ts">
import type { ProjectListSummaryData } from "~/models/data";
import qs from "qs";
import type { Project } from "~/public/src/data/search_result";
import { sortByResultProject, sortOrderResultProject } from "~/store/filter";
const props = defineProps<{
  onChangeTab: (index: number) => void;
  setParams: (type: string, val: string) => void;
  queryForDownload: string;
  searchParams: string;
}>();
const featureFlags = useFeatureFlags();
const summaryData = ref<ProjectListSummaryData>();
const isLoadingProjectSummaryData = ref(true);
const projectList = ref<Project | null>(null);
const isLoadingProjectList = ref(true);

const isOpenGovModal = ref(false);
const isOpenContractorModal = ref(false);

const route = useRoute();
onBeforeMount(async () => {
  await fetchData(props.searchParams);
});

const fetchData = async (params: string) => {
  summaryData.value = await getProjectSummaryList(
    params,
    String(route.query.search)
  );
  isLoadingProjectSummaryData.value = false;

  projectList.value = await getProjectList(params, String(route.query.search));
  isLoadingProjectList.value = false;
};

watch(
  () => props.searchParams,
  async (newParams) => {
    isLoadingProjectSummaryData.value = true;
    isLoadingProjectList.value = true;
    await fetchData(newParams);
  }
);

const iconGuide = {
  name: "",
  province: "= ที่ตั้ง",
  year: "= ปีงบประมาณ (วันที่ประกาศโครงการ)",
  owner: "= หน่วยงานรัฐ",
  no: "= เลขที่โครงการ",
};
</script>

<template>
  <LoadingContainer :isLoading="isLoadingProjectSummaryData">
    <div class="flex gap-2 py-5 flex-col-mb" v-if="summaryData">
      <div class="rounded-10 bg-black p-5 text-white sm:w-3/5">
        <p class="b1 font-bold">
          จำนวนโครงการจัดซื้อจัดจ้างตามเงื่อนไขที่ค้นหา
        </p>
        <h2 class="font-black">
          {{ summaryData.totalProject.toLocaleString() }} โครงการ
        </h2>
        <hr />
        <div class="flex gap-2">
          <div class="flex-1">
            <p class="b2">งบประมาณรวม (บาท)</p>
            <h5 class="font-bold" v-if="summaryData.totalBudgetMoney != null">
              {{ setNumber(summaryData.totalBudgetMoney) }}
            </h5>
          </div>
          <div
            v-if="featureFlags?.SUSPICIOUS_LABEL"
            class="flex-1 text-[#EC1C24]"
          >
            <p class="b2">เป็นโครงการเสี่ยงทุจริต</p>
            <h5 class="font-bold">
              {{
                summaryData.totalProject != 0
                  ? setNumber(
                      (summaryData.totalProjectHasCorruption /
                        summaryData.totalProject) *
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
          @click="props.onChangeTab(1)"
        />
      </div>

      <div class="sm:w-2/5">
        <div class="rounded-10 bg-[#F5F5F5] p-5 text-black mb-3">
          <p class="b1">หน่วยงานรัฐเจ้าของโครงการ</p>
          <h5 class="font-bold">
            {{ summaryData.totalAgency.toLocaleString() }} หน่วยงาน
          </h5>
          <p
            @click="isOpenGovModal = true"
            class="b2 link-1 flex items-center gap-1"
            v-if="summaryData.totalAgency != 0"
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
            {{ summaryData.totalCompany.toLocaleString() }} ราย
          </h5>
          <p
            @click="isOpenContractorModal = true"
            class="b2 link-1 flex items-center gap-1"
            v-if="summaryData.totalCompany != 0"
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
  </LoadingContainer>

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
      @change="props.setParams"
      @sortBy="props.setParams"
      :selectedSortBy="sortByResultProject"
      :selectedSortOrder="sortOrderResultProject"
    />

    <DownloadAndCopy
      :filterList="queryForDownload"
      section="project"
      isShowCopyBtn
      resultSection="keyword"
    />
  </div>

  <ProjectIconGuide :data="iconGuide" color="#8E8E8E" />

  <LoadingContainer :isLoading="isLoadingProjectList">
    <div v-if="projectList?.pagination.totalItem == 0">
      <h5 class="text-center text-[#8E8E8E] py-5">
        ไม่พบโครงการจัดซื้อจัดจ้างที่มีคำค้นนี้
      </h5>
    </div>
    <div class="my-3" v-else>
      <a
        v-for="(item, i) in projectList?.searchResult"
        :key="i"
        target="_blank"
        :href="'/project/' + item.projectId"
      >
        <div
          class="flex justify-between flex-col-mb p-2.5 sm:p-5 rounded-10 btn-light-4"
        >
          <div class="w-3/4">
            <p class="b1 font-bold" v-html="highlight(item.projectName)"></p>
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
              v-if="featureFlags?.SUSPICIOUS_LABEL && item.hasCorruptionRisk"
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
            projectList?.searchResult &&
            projectList?.searchResult.length <
              projectList?.pagination?.totalItem
          "
          @click="props.setParams('page', '10')"
        />
      </div></div
  ></LoadingContainer>

  <GovernmentPopup v-if="isOpenGovModal" @close="isOpenGovModal = false" />
  <ContractorPopup
    v-if="isOpenContractorModal"
    @close="isOpenContractorModal = false"
  />
</template>
