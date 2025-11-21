<script setup lang="ts">
import qs from "qs";
import type { ProjectListSummaryData } from "~/models/data";
const props = defineProps<{
  searchParams: string;
}>();
const featureFlags = useFeatureFlags();
const summaryData = ref<ProjectListSummaryData>();
const isLoadingProjectSummaryData = ref(true);
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
};

const menuList = ref([
  {
    title: "สถานะโครงการที่พบมากที่สุด",
    desc: "",
    percent: 0,
    total: 0,
    id: "chart-3",
  },
  {
    title: "สถานะของสัญญาที่พบมากที่สุด",
    desc: "",
    percent: 0,
    total: 0,
    id: "chart-4",
  },
  {
    title: "วิธีการจัดหาที่พบมากที่สุด",
    desc: "",
    percent: 0,
    total: 0,
    id: "chart-5",
  },
  {
    title: "จังหวัดที่มีจำนวนโครงการมากที่สุด",
    desc: "",
    id: "maps",
  },
  {
    title: "จังหวัดที่ใช้งบประมาณมากที่สุด",
    desc: "",
    id: "maps",
  },
]);

watch(summaryData, (newData) => {
  if (newData) {
    menuList.value[0].desc = newData.maxProjectStatus?.name;
    menuList.value[0].total = newData.maxProjectStatus?.total;
    menuList.value[0].percent =
      newData.totalProject != 0
        ? (newData.maxProjectStatus?.total / newData.totalProject) * 100
        : 0;
    menuList.value[1].desc = newData.maxContractStatus?.name;
    menuList.value[1].total = newData.maxContractStatus?.total;
    menuList.value[1].percent =
      newData.totalProject != 0
        ? (newData.maxContractStatus?.total / newData.totalProject) * 100
        : 0;
    menuList.value[2].desc = newData.maxResourcingMethod?.name;
    menuList.value[2].total = newData.maxResourcingMethod?.total;
    menuList.value[2].percent =
      newData.totalProject != 0
        ? (newData.maxResourcingMethod?.total / newData.totalProject) * 100
        : 0;
    menuList.value[3].desc = newData.provinceWithHighestBudgetMoney;
    menuList.value[4].desc = newData.provinceWithHighestProjects;

    console.log("menuList.value", menuList.value);
  }
});

watch(
  () => props.searchParams,
  async (newParams) => {
    isLoadingProjectSummaryData.value = true;
    await fetchData(newParams);
  }
);
</script>

<template>
  <LoadingContainer :isLoading="isLoadingProjectSummaryData">
    <div class="mx-auto max-w-6xl px-4 lg:px-0" v-if="summaryData">
      <h5 class="font-bold my-5">
        {{ summaryData.totalProject.toLocaleString() }}
        โครงการจัดซื้อจัดจ้าง
      </h5>
      <div class="flex flex-col-mb gap-2">
        <a href="#chart-1" class="flex-1">
          <div class="rounded-10 btn-chart p-5 text-white relative">
            <p class="b1">งบประมาณรวม (บาท)</p>
            <h4 class="font-black" v-if="summaryData != null">
              {{ setNumber(summaryData.totalBudgetMoney) }}
            </h4>
            <arrow
              color="#FFFFFF"
              class="absolute right-5 top-5 rotate-90"
            /></div
        ></a>
        <a v-if="featureFlags?.SUSPICIOUS_LABEL" href="#chart-2" class="flex-1">
          <div class="rounded-10 btn-chart p-5 relative text-white">
            <p class="b1 text-[#EC1C24]">โครงการเสี่ยงทุจริต</p>
            <h4 class="font-black text-[#EC1C24]">
              {{
                summaryData.totalProject != 0
                  ? setNumber(
                      (summaryData.totalProjectHasCorruption /
                        summaryData.totalProject) *
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
                >({{ setNumber(item.percent || 0) }}%)</span
              >
            </p>
            <p class="b1 font-bold">
              {{ item.desc != null ? item.desc : "-" }}
            </p>
            <arrow color="#FFFFFF" class="absolute right-5 top-6 rotate-90" />
          </div>
        </a>
      </div>
    </div>
  </LoadingContainer>
  <div class="bg-[#1F1F1F] p-4 sm:p-10 mt-10">
    <LoadingContainer :isLoading="isLoadingProjectSummaryData">
      <VizContainer :searchParams="props.searchParams" />
    </LoadingContainer>
    <div
      @click="scrollToTop()"
      class="flex link-2 justify-center gap-2 b2 mt-5 items-center"
    >
      กลับด้านบน <arrow color="#8DCCF0" class="-rotate-90" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.btn-chart {
  @apply bg-black hover:bg-[#333333] duration-300 cursor-pointer;
}
</style>
