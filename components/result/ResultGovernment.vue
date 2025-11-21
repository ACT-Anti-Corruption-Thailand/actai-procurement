<script setup lang="ts">
import qs from "qs";
import type { Government } from "~/public/src/data/search_result";
import { sortByResultGov, sortOrderResultGov } from "~/store/filter";
import { isLoadingResultGov } from "~/store/loading";

const route = useRoute();
const featureFlags = useFeatureFlags();
const searchParamString = ref("");
const sort = ref("relevanceScore");
const sortOrder = ref("desc");
const page = ref(0);
const queryForDownload = ref("");

const govListAll = ref<Government | null>(null);
const isLoadingGovList = ref(true);
const filterList = ref("");
const filterListGovernment = ref();

onBeforeMount(async () => {
  if (route.hash.includes("government")) {
    queryForDownload.value = "?" + qs.stringify(route.query);
    sort.value = sortByResultGov.value;
    sortOrder.value = sortOrderResultGov.value;
  } else {
    queryForDownload.value = "?search=" + route.query.search;
  }

  const data = await getAgencyFilter();
  filterListGovernment.value = data;

  await fetchData(searchParamString.value);
});
const fetchData = async (params: string) => {
  govListAll.value = await getGovList(params, String(route.query.search));
  console.log(`govListAll.value`, govListAll.value);

  isLoadingGovList.value = false;
};

watch(
  () => searchParamString.value,
  async (newParams) => {
    isLoadingGovList.value = true;
    await fetchData(newParams);
  }
);

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
  <LoadingContainer :isLoading="isLoadingGovList">
    <div class="mx-auto max-w-6xl px-4" v-if="govListAll">
      <div class="flex items-center justify-between">
        <h4 class="font-bold">
          {{ govListAll?.pagination?.totalItem.toLocaleString() }} หน่วยงานรัฐ
        </h4>
        <FilterPopupResult
          section="หน่วยงานรัฐ"
          @change="setParams"
          :list="filterListGovernment"
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
                name: 'งบประมาณรวม',
                value: 'budgetMoney',
              },
              {
                name: 'จำนวนโครงการทั้งหมด',
                value: 'totalProject',
              },
              ...(featureFlags?.SUSPICIOUS_LABEL
                ? [
                    {
                      name: 'จำนวนโครงการเสี่ยงทุจริต',
                      value: 'totalProjectHasCorruptionRisk',
                    },
                    {
                      name: '% โครงการเสี่ยงทุจริตจากทั้งหมด',
                      value: 'percentageProjectHasCorruptionRisk',
                    },
                  ]
                : []),
            ]"
            text="เรียงตาม"
            @change="setParams"
            @sortBy="setParams"
            :selectedSortBy="sortByResultGov"
            :selectedSortOrder="sortOrderResultGov"
          />
        </div>
        <DownloadAndCopy
          section="agency"
          :filterList="queryForDownload"
          isShowCopyBtn
          resultSection="keyword"
        />
      </div>

      <ProjectIconGuide
        :data="{
          province: '= ที่ตั้ง',
        }"
        color="#8E8E8E"
      />

      <template v-if="isLoadingResultGov">
        <div class="p-5 b1 text-center">Loading...</div>
      </template>

      <template v-else>
        <div v-if="govListAll?.pagination.totalItem == 0" class="pb-7">
          <h5 class="text-center text-[#8E8E8E]">
            ไม่พบหน่วยงานรัฐที่มีคำค้นนี้
          </h5>
        </div>
        <div class="my-3" v-else>
          <a
            v-for="item in govListAll?.searchResult"
            class="flex justify-between p-2.5 sm:p-5 rounded-10 btn-light-4"
            :key="'gov-' + item.agencyId"
            target="_blank"
            :href="'/government/' + item.agencyId"
          >
            <div class="basis-2/5 lg:basis-3/5">
              <p class="b1 font-bold" v-html="highlight(item?.agencyName)"></p>
              <ProjectIconGuide
                :data="{
                  province: item.province,
                }"
                color="#8E8E8E"
              />
            </div>
            <div
              class="flex sm:gap-10 text-right flex-col-mb basis-3/5 lg:basis-2/5"
            >
              <div class="flex-1">
                <p class="b4 text-[#5E5E5E]">โครงการทั้งหมด</p>
                <p class="b1">{{ item?.totalProject.toLocaleString() }}</p>
              </div>
              <div
                v-if="featureFlags?.SUSPICIOUS_LABEL"
                class="text-[#EC1C24] flex-1"
              >
                <p class="b4 text-[#EC1C2460]">โครงการเสี่ยงทุจริต</p>
                <p class="b1">
                  {{
                    item?.totalProjectHasCorruptionRisk.toLocaleString(
                      undefined,
                      {
                        maximumFractionDigits: 2,
                      }
                    )
                  }}
                  ({{
                    item?.totalProject == 0
                      ? 0
                      : setNumber(
                          (item?.totalProjectHasCorruptionRisk /
                            item?.totalProject) *
                            100
                        )
                  }}%)
                </p>
              </div>
              <div class="flex-1">
                <p class="b4 text-[#5E5E5E]">งบประมาณรวม (บาท)</p>
                <p class="b1">
                  {{ setNumber(item?.totalBudgetMoney) }}
                </p>
              </div>
            </div>
          </a>

          <div class="text-center">
            <LoadMore
              v-if="
                govListAll.searchResult.length <
                govListAll.pagination?.totalItem
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
