<script setup lang="ts">
import type { Contractor } from "~/public/src/data/search_result";
import qs from "qs";
import {
  sortByResultContractor,
  sortOrderResultContractor,
} from "~/store/filter";
import { isLoadingResultContractor } from "~/store/loading";

const route = useRoute();
const featureFlags = useFeatureFlags();
const searchParamString = ref("");

const contractorList = ref<Contractor | null>(null);
const isLoadingContractorList = ref(true);
const filterListContractor = ref();

onBeforeMount(async () => {
  if (route.hash.includes("contractor")) {
    queryForDownload.value = "?" + qs.stringify(route.query);
    sort.value = sortByResultContractor.value;
    sortOrder.value = sortOrderResultContractor.value;
  } else {
    queryForDownload.value = "?search=" + route.query.search;
  }

  const data = await getCompanyFilter();
  filterListContractor.value = data;
  await fetchData(searchParamString.value);
});
const fetchData = async (params: string) => {
  contractorList.value = await getContractorList(
    params,
    String(route.query.search)
  );
  isLoadingContractorList.value = false;
};

watch(
  () => searchParamString.value,
  async (newParams) => {
    isLoadingContractorList.value = true;
    await fetchData(newParams);
  }
);

const sort = ref("relevanceScore");
const sortOrder = ref("desc");
const page = ref(0);
const queryForDownload = ref("");
const filterList = ref("");

const setParams = (type: string, val: string) => {
  const params = new URLSearchParams();
  queryForDownload.value = "";

  if (type == "sortBy") sort.value = val;
  else if (type == "page") page.value == 0 ? 20 : page.value + val;
  else if (type == "filter") filterList.value = val;
  else if (type == "sortOrder") sortOrder.value = val;

  params.set("sortBy", type == "sortBy" ? val : sort.value);
  params.set("sortOrder", type == "sortOrder" ? val : sortOrder.value);
  params.set("pageSize", type == "page" ? String(page.value) : String(10));

  queryForDownload.value =
    "?search=" +
    route.query.search +
    "&" +
    params.toString() +
    filterList.value;

  searchParamString.value = "&" + params.toString() + filterList.value;
};
</script>

<template>
  <LoadingContainer :isLoading="isLoadingContractorList">
    <div class="mx-auto max-w-6xl px-4" v-if="contractorList">
      <div class="flex items-center justify-between">
        <h4 class="font-bold">
          {{ contractorList?.pagination?.totalItem.toLocaleString() }}
          ผู้รับจ้าง
        </h4>
        <FilterPopupResult
          section="ผู้รับจ้าง"
          @change="setParams"
          :list="filterListContractor"
        />
      </div>

      <div class="flex items-center justify-between my-3 sm:my-5">
        <div class="flex gap-2 items-center relative">
          <SortBy
            :list="[
              {
                name: 'ความใกล้เคียงคำค้น',
                value: 'relevanceScore',
              },
              {
                name: 'วงเงินสัญญารวม',
                value: 'totalContractAmount',
              },
              {
                name: 'จำนวนโครงการที่ได้งาน',
                value: 'totalProject',
              },
            ]"
            text="เรียงตาม"
            @change="setParams"
            @sortBy="setParams"
            :selectedSortBy="sortByResultContractor"
            :selectedSortOrder="sortOrderResultContractor"
          />
        </div>
        <DownloadAndCopy
          section="company"
          :filterList="queryForDownload"
          isShowCopyBtn
          resultSection="keyword"
        />
      </div>

      <ProjectIconGuide
        :data="{
          province: '= ที่ตั้ง',
          entityNo: '= เลขทะเบียนนิติบุคคล',
        }"
        color="#8E8E8E"
      />

      <template v-if="isLoadingResultContractor">
        <div class="p-5 b1 text-center">Loading...</div>
      </template>

      <template v-else>
        <div v-if="contractorList?.pagination.totalItem == 0" class="pb-7">
          <h5 class="text-center text-[#8E8E8E]">
            ไม่พบผู้รับจ้างที่มีคำค้นนี้
          </h5>
        </div>
        <div class="my-3" v-else>
          <a
            v-for="item in contractorList?.searchResult"
            class="flex justify-between p-2.5 sm:p-5 rounded-10 btn-light-4"
            :key="'contractor-' + item.companyId"
            target="_blank"
            :href="'/contractor/' + item.companyId"
            :class="{
              'pointer-events-none': item.companyId.toLowerCase().includes('x'),
            }"
          >
            <div class="basis-3/5">
              <p class="b1 font-bold" v-html="highlight(item?.companyName)"></p>
              <ProjectIconGuide
                :data="{
                  province: item.province,
                  entityNo: item.companyId,
                }"
                color="#8E8E8E"
              />
              <ProjectTag
                text="ตรวจพบความน่าสนใจ"
                v-if="featureFlags?.SUSPICIOUS_LABEL && item.hasCorruptionRisk"
              />
            </div>
            <div
              class="flex sm:gap-10 text-right flex-col-mb basis-2/5 justify-end"
            >
              <div class="basis-1/3">
                <p class="b4 text-[#5E5E5E]">โครงการที่ได้งาน</p>
                <p class="b1">{{ item?.totalProject.toLocaleString() }}</p>
              </div>
              <div class="basis-1/3">
                <p class="b4 text-[#5E5E5E]">วงเงินสัญญารวม (บาท)</p>
                <p class="b1">{{ setNumber(item?.totalContractMoney) }}</p>
              </div>
            </div>
          </a>

          <div class="text-center">
            <LoadMore
              v-if="
                contractorList?.searchResult.length <
                contractorList?.pagination?.totalItem
              "
              @click="setParams('page', '10')"
            />
          </div>
        </div>
      </template>
    </div>
  </LoadingContainer>
</template>

<style lang="scss" scoped></style>
