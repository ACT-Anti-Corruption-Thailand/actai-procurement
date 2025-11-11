<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();

import qs from "qs";

import { useRoute } from "vue-router";
import type { FilterListProject } from "~/models/data";
import {
  defaultSelected,
  defaultSelectedContractor,
  defaultSelectedGov,
  selected,
  selectedContractor,
  selectedGov,
  sortByResultContractor,
  sortByResultGov,
  sortByResultProject,
  sortOrderResultContractor,
  sortOrderResultGov,
  sortOrderResultProject,
} from "~/store/filter";
import { isLoadingOverall, isLoadingResultContractor } from "~/store/loading";
import type { Contractor } from "../../public/src/data/search_result";

const contractorListAll = ref<Contractor | null>(null);
const contractorList = ref<Contractor | null>(null);
const filterListProject = ref<FilterListProject>();
const filterListContractor = ref({});

onBeforeMount(async () => {
  isLoadingOverall.value = true;

  const { ...filter_query } = route.query;
  delete filter_query.search;
  let str = qs.stringify(filter_query);
  let filter_query_text_contractor = route.hash.includes("contractor")
    ? "&" + str
    : "";

  getFilter();

  await getContractorList("", "");
  await getContractorList(filter_query_text_contractor, "details");

  isLoadingOverall.value = false;
});

const getFilter = async () => {
  const res3 = await fetch(`${config.public.apiUrl}/company/search/filters`);

  if (res3.ok) {
    const data = await res3.json();
    filterListContractor.value = data;
  }

  if (
    route.query["filter[budgetYear][start]"] == null ||
    route.query["filter[budgetYear][end]"] == null
  ) {
    selected.value.yearFrom = filterListProject
      .value!.budgetYears.at(0)!
      .toString();
    selected.value.yearTo = filterListProject
      .value!.budgetYears.at(-1)!
      .toString();
  }

  if (route.hash.includes("project")) {
    let moneyMenu = "";

    if (
      route.query["filter[budgetMoney][start]"] != null ||
      route.query["filter[budgetMoney][end]"] != null
    ) {
      moneyMenu = "งบประมาณ";
    } else if (
      route.query["filter[contractMoney][start]"] != null ||
      route.query["filter[contractMoney][end]"] != null
    ) {
      moneyMenu = "วงเงินสัญญา";
    }

    let moneyBudgetStart =
      route.query["filter[budgetMoney][start]"]?.toString() ||
      defaultSelected.moneyStart;
    let moneyBudgetEnd =
      route.query["filter[budgetMoney][end]"]?.toString() ||
      defaultSelected.moneyEnd;
    let moneyContractStart =
      route.query["filter[contractMoney][start]"]?.toString() ||
      defaultSelected.moneyStart;
    let moneyContractEnd =
      route.query["filter[contractMoney][end]"]?.toString() ||
      defaultSelected.moneyEnd;

    selected.value = {
      yearFrom:
        route.query["filter[budgetYear][start]"]?.toString() ||
        filterListProject.value!.budgetYears.at(0)!.toString(),
      yearTo:
        route.query["filter[budgetYear][end]"]?.toString() ||
        filterListProject.value!.budgetYears.at(-1)!.toString(),
      agencies:
        route.query["filter[agencyName]"]?.toString() ||
        defaultSelected.agencies,
      agencyBelongTo:
        route.query["filter[agencyBelongTo]"]?.toString() ||
        defaultSelected.agencyBelongTo,
      companyEntityType:
        route.query["filter[companyEntityType]"]?.toString() ||
        defaultSelected.companyEntityType,
      projectStatus:
        route.query["filter[projectStatus]"]?.toString() ||
        defaultSelected.projectStatus,
      province:
        route.query["filter[province]"]?.toString() || defaultSelected.province,
      resourcingType:
        route.query["filter[resourcingType]"]?.toString() ||
        defaultSelected.resourcingType,
      resourcingMethod:
        route.query["filter[resourcingMethod]"]?.toString() ||
        defaultSelected.resourcingMethod,
      moneyStart:
        moneyMenu == "งบประมาณ" ? moneyBudgetStart : moneyContractStart,
      moneyEnd: moneyMenu == "งบประมาณ" ? moneyBudgetEnd : moneyContractEnd,
      hasCorruptionRisk:
        route.query["filter[hasCorruptionRisk]"] === "true" ||
        defaultSelected.hasCorruptionRisk,
    };

    sortByResultProject.value =
      route.query.sortBy?.toString() || "relevanceScore";
    sortOrderResultProject.value = route.query.sortOrder?.toString() || "desc";
  } else if (route.hash.includes("government")) {
    selectedGov.value = {
      agencyBelongTo:
        route.query["filter[agencyBelongTo]"]?.toString() ||
        defaultSelectedGov.agencyBelongTo,
      province:
        route.query["filter[province]"]?.toString() ||
        defaultSelectedGov.province,
    };

    sortByResultGov.value = route.query.sortBy?.toString() || "relevanceScore";
    sortOrderResultGov.value = route.query.sortOrder?.toString() || "desc";
  } else if (route.hash.includes("contractor")) {
    selectedContractor.value = {
      province:
        route.query["filter[province]"]?.toString() ||
        defaultSelectedContractor.province,
      contractorType:
        route.query["filter[contractorType]"]?.toString() ||
        defaultSelectedContractor.contractorType,
      hasCorruptionRisk:
        route.query["filter[hasCorruptionRisk]"] === "true" ||
        defaultSelectedContractor.hasCorruptionRisk,
    };

    sortByResultContractor.value =
      route.query.sortBy?.toString() || "relevanceScore";
    sortOrderResultContractor.value =
      route.query.sortOrder?.toString() || "desc";
  }
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
  <ResultContractor
    :contractorList="contractorList"
    @search="getContractorList"
    :filterListContractor="filterListContractor"
  />
</template>

<style lang="scss" scoped></style>
