<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();

import { useRoute } from "vue-router";
import { isLoadingResultContractor, isLoadingResultGov } from "~/store/loading";
import type {
  Contractor,
  Government,
} from "../../public/src/data/search_result";

const iconGuide = ref({
  name: "",
  province: "= ที่ตั้ง",
  year: "= ปีงบประมาณ (วันที่ประกาศโครงการ)",
  owner: "= หน่วยงานรัฐ",
  no: "= เลขที่โครงการ",
});

const mockDataGuide = ref({
  name: "",
  province: "แพร่",
  year: "2567 (10/11/2567)",
  owner: "สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน",
  no: "56015020021",
});

const govListAll = ref<Government | null>(null);
const govList = ref<Government | null>(null);
const contractorListAll = ref<Contractor | null>(null);
const contractorList = ref<Contractor | null>(null);

onBeforeMount(async () => {
  await getGovList("", "");
  await getContractorList("", "");
});

const getGovList = async (params: string, section: string) => {
  isLoadingResultGov.value = true;
  const urlParams = decodeURI(window.location.href).split("=")[1];
  const p = params != null ? params : "";

  const res = await fetch(
    `${config.public.apiUrl}/agency/search?keyword=${route.query.search}${p}`
  );

  if (res.ok) {
    const data = await res.json();
    if (section == "details")
      govList.value = JSON.parse(JSON.stringify(data)) || [];
    else govListAll.value = JSON.parse(JSON.stringify(data)) || [];
  }
  isLoadingResultGov.value = false;
};

const getContractorList = async (params: string, section: string) => {
  isLoadingResultContractor.value = true;
  const urlParams = decodeURI(window.location.href).split("=")[1];
  const p = params != null ? params : "";

  const res = await fetch(
    `${config.public.apiUrl}/company/search?keyword=${route.query.search}${p}`
  );

  if (res.ok) {
    const data = await res.json();
    if (section == "details")
      contractorList.value = JSON.parse(JSON.stringify(data)) || [];
    else contractorListAll.value = JSON.parse(JSON.stringify(data)) || [];
  }
  isLoadingResultContractor.value = false;
};

definePageMeta({
  layout: "result",
});
</script>
<template>
  <ResultAll
    @changeMenu="(n) => (menu = n)"
    :iconGuide="iconGuide"
    :mockDataGuide="mockDataGuide"
    :govList="govListAll"
    :contractorList="contractorListAll"
  />
</template>

<style lang="scss" scoped></style>
