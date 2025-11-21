<script setup lang="ts">
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import qs from "qs";
import type { FilterListProject } from "~/models/data";
import { sortByResultProject, sortOrderResultProject } from "~/store/filter";

const route = useRoute();
const selectedTab = ref(0);
const isOpen = ref(false);
const isOpen2 = ref(false);
const filterListProject = ref<FilterListProject>();
const searchParamString = ref("");
const sort = ref("relevanceScore");
const sortOrder = ref("desc");
const page = ref(0);
const queryForDownload = ref("");

const filterList = ref("");

function changeTab(index: number) {
  selectedTab.value = index;
}

const setParams = (type: string, val: string) => {
  console.log("setParams", type, val);

  const params = new URLSearchParams();
  queryForDownload.value = "";

  if (type == "sortBy") sort.value = val;
  else if (type == "page")
    page.value = page.value == 0 ? 20 : page.value + +val;
  else if (type == "filter") filterList.value = val;
  else if (type == "sortOrder") sortOrder.value = val;

  params.set("sortBy", type == "sortBy" ? val : sort.value);
  params.set("sortOrder", type == "sortOrder" ? val : sortOrder.value);
  params.set("pageSize", `${type == "page" ? page.value : 10}`);

  queryForDownload.value =
    "?search=" +
    route.query.search +
    "&" +
    params.toString() +
    filterList.value;

  searchParamString.value = "&" + params.toString() + filterList.value;
};

onBeforeMount(async () => {
  queryForDownload.value = "?" + qs.stringify(route.query);
  if (route.hash.includes("project")) {
    sort.value = sortByResultProject.value;
    sortOrder.value = sortOrderResultProject.value;
  } else {
    queryForDownload.value = "?search=" + route.query.search;
  }

  const data = await getProjectFilter();
  filterListProject.value = data;
});

const handleChangeTab = (index: number) => {
  selectedTab.value = index;
};
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
          v-if="filterListProject"
          section="โครงการ"
          @change="setParams"
          :list="filterListProject"
        />
      </div>
    </div>

    <TabPanels>
      <TabPanel class="mx-auto max-w-6xl px-4">
        <ProjectListContainer
          v-on:changeTab="handleChangeTab"
          :setParams="setParams"
          :queryForDownload="queryForDownload"
          :searchParams="searchParamString"
        />
      </TabPanel>
      <TabPanel>
        <ProjectDashboardContainer :searchParams="searchParamString" />
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
