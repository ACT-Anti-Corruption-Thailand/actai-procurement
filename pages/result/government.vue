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
import { isLoadingOverall, isLoadingResultGov } from "~/store/loading";
import type { Government } from "../../public/src/data/search_result";

const govListAll = ref<Government | null>(null);
const govList = ref<Government | null>(null);
const filterListProject = ref<FilterListProject>();
const filterListGovernment = ref({});
const filterListContractor = ref({});

onBeforeMount(async () => {
  isLoadingOverall.value = true;

  const { ...filter_query } = route.query;
  delete filter_query.search;
  let str = qs.stringify(filter_query);
  let filter_query_text_gov = route.hash.includes("government")
    ? "&" + str
    : "";

  getFilter();

  await getGovList("", "");
  await getGovList(filter_query_text_gov, "details");

  isLoadingOverall.value = false;
});

const getFilter = async () => {
  const res = await fetch(`${config.public.apiUrl}/project/search/filters`);

  if (res.ok) {
    const data = await res.json();
    filterListProject.value = data;
  }

  const res2 = await fetch(`${config.public.apiUrl}/agency/search/filters`);

  if (res2.ok) {
    const data = await res2.json();
    filterListGovernment.value = data;
  }

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

definePageMeta({
  layout: "result",
});
</script>

<template>
  <ResultGovernment
    :govList="govList"
    @search="getGovList"
    :filterListGovernment="filterListGovernment"
  />
</template>

<style lang="scss" scoped></style>
