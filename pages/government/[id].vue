<script setup lang="ts">
const menu = ref('ภาพรวมโครงการที่จัดทำ');
const config = useRuntimeConfig();
const route = useRoute();
const isShowTab = ref(true);

import type { FilterListProject } from '~/models/data';
import type { GovernmentDetails } from '../../public/src/data/data_details';
import type { Project, Contractor } from '../../public/src/data/search_result';
import qs from 'qs';
import {
  defaultSelectedGovProject,
  defaultSelectedGovContractor,
  selectedGovProject,
  selectedGovContractor,
  sortByGovProject,
  sortOrderGovProject,
  sortByGovContractor,
  sortOrderGovContractor,
} from '~/store/filter';
import {
  isLoadingGovProject,
  isLoadingGovContractor,
  isLoadingOverall,
} from '~/store/loading';

const govData = ref<GovernmentDetails>([]);
const govProjectList = ref<Project>([]);
const govContracterList = ref<Contractor>([]);
const filterListProject = ref<FilterListProject>();
const filterListContractor = ref({});
const listMenu = ref(['ภาพรวมโครงการที่จัดทำ']);

const getGovData = async () => {
  const segments = route.path.split('/')[2];

  const res = await fetch(`${config.public.apiUrl}/agency/${segments}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    const data = await res.json();
    govData.value = JSON.parse(JSON.stringify(data)) || [];
  }
};

const getGovProject = async (q) => {
  isLoadingGovProject.value = true;
  const segments = route.path.split('/')[2];

  const params = new URLSearchParams();
  params.set('page', 1);

  let filter = {
    agencyId: segments,
  };

  var str = qs.stringify({ filter });

  const res = await fetch(
    `${config.public.apiUrl}/project/search?${str}&${params}${q}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    govProjectList.value = JSON.parse(JSON.stringify(data)) || [];
  }
  isLoadingGovProject.value = false;
};

const getGovContracter = async (q) => {
  isLoadingGovContractor.value = true;
  const segments = route.path.split('/')[2];

  let filter = {
    agencyId: segments,
  };

  var str = qs.stringify({ filter });

  const params = new URLSearchParams();
  params.set('page', 1);

  const res = await fetch(
    `${config.public.apiUrl}/company/search?${str}&${params}${q}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    govContracterList.value = JSON.parse(JSON.stringify(data)) || [];
  }
  isLoadingGovContractor.value = false;
};

onBeforeMount(async () => {
  isLoadingOverall.value = true;

  const segments = route.path.split('/')[2];
  let filter = await getFilter(config.public.apiUrl, '?agencyId=' + segments);
  filterListProject.value = filter[0];
  filterListContractor.value = filter[2];

  if (
    route.query['filter[budgetYear][start]'] == null ||
    route.query['filter[budgetYear][end]'] == null
  ) {
    selectedGovProject.value.yearFrom = filterListProject
      .value!.budgetYears.at(0)!
      .toString();
    selectedGovProject.value.yearTo = filterListProject
      .value!.budgetYears.at(-1)!
      .toString();
    selectedGovContractor.value.yearFrom = filterListContractor
      .value!.budgetYears.at(0)!
      .toString();
    selectedGovContractor.value.yearTo = filterListContractor
      .value!.budgetYears.at(-1)!
      .toString();
  }

  const { ...filter_query } = route.query;
  let str = qs.stringify(filter_query);
  let filter_query_text_project = route.hash.includes('project')
    ? '&' + str
    : '&sortBy=announcementDate&sortOrder=desc';
  let filter_query_text_contractor = route.hash.includes('contractor')
    ? '&' + str
    : '&sortBy=totalContractAmount&sortOrder=desc';

  await getGovData();
  await getGovProject(filter_query_text_project, 10);
  await getGovContracter(filter_query_text_contractor, 10);

  setMenuList();

  if (route.hash.includes('project')) {
    menu.value = 'รายชื่อโครงการที่จัดทำ';

    selectedGovProject.value = {
      yearFrom:
        route.query['filter[budgetYear][start]']?.toString() ||
        filterListProject.value?.budgetYears.at(0)!.toString(),
      yearTo:
        route.query['filter[budgetYear][end]']?.toString() ||
        filterListProject.value?.budgetYears.at(-1)!.toString(),
      projectStatus:
        route.query['filter[projectStatus]']?.toString() ||
        defaultSelectedGovProject.projectStatus,
      province:
        route.query['filter[province]']?.toString() ||
        defaultSelectedGovProject.province,
      resourcingMethod:
        route.query['filter[resourcingMethod]']?.toString() ||
        defaultSelectedGovProject.resourcingMethod,
      companyId:
        route.query['filter[companyId]']?.toString() ||
        defaultSelectedGovProject.companyId,
      hasCorruptionRisk:
        route.query['filter[hasCorruptionRisk]'] === 'true' ||
        defaultSelectedGovProject.hasCorruptionRisk,
    };

    sortByGovProject.value =
      route.query.sortBy?.toString() || 'announcementDate';
    sortOrderGovProject.value = route.query.sortOrder?.toString() || 'desc';
  } else if (route.hash.includes('contractor')) {
    selectedGovContractor.value = {
      yearFrom:
        route.query['filter[budgetYear][start]']?.toString() ||
        filterListProject.value?.budgetYears.at(0)!.toString(),
      yearTo:
        route.query['filter[budgetYear][end]']?.toString() ||
        filterListProject.value?.budgetYears.at(-1)!.toString(),
      resourcingMethod:
        route.query['filter[resourcingMethod]']?.toString() ||
        defaultSelectedGovContractor.resourcingMethod,
    };

    menu.value = 'ผู้รับจ้างที่ได้งาน';
    sortByGovContractor.value =
      route.query.sortBy?.toString() || 'totalContractAmount';
    sortOrderGovContractor.value = route.query.sortOrder?.toString() || 'desc';
  }

  isLoadingOverall.value = false;
});

const setMenuList = () => {
  if (govProjectList.value?.pagination?.totalItem != 0)
    listMenu.value.push('รายชื่อโครงการที่จัดทำ');

  if (govContracterList.value?.pagination?.totalItem != 0)
    listMenu.value.push('ผู้รับจ้างที่ได้งาน');
};
</script>

<template>
  <Header />

  <div class="bg-white p-5">
    <Breadcrumb :title="govData?.agencyName" />
    <div class="max-w-7xl mx-auto flex gap-2 flex-col-mb">
      <div class="sm:w-4/5">
        <h3 class="font-black">{{ govData.agencyName }}</h3>
        <p
          class="b1 mb-3 text-[#7F7F7F]"
          v-if="govData?.agencyBelongTo != null"
        >
          {{ govData?.agencyBelongTo }}
        </p>
        <p class="b1 flex gap-1">
          {{ govData.province }}
          <a
            :href="'https://www.google.com/maps/search/' + govData.agencyName"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#0B5C90] flex gap-1"
            >แผนที่
            <img src="../../public/src/images/link-ggmap.svg" alt="link gg map"
          /></a>
        </p>
        <p class="b4 text-[#8E8E8E]">
          หน่วยงานอัปเดตข้อมูลเมื่อ
          {{
            govData.lastUpdatedOn != null ? setDate(govData.lastUpdatedOn) : '-'
          }}
        </p>
      </div>
      <div class="sm:w-1/5">
        <Share color="#0B5C90" text="แชร์หน้านี้" class="mt-2 sm:ml-auto" />
      </div>
    </div>
  </div>
  <div class="bg-[#1F1F1F] p-5">
    <div class="flex flex-col-mb gap-5 max-w-7xl mx-auto">
      <div :class="[isShowTab ? 'sm:w-1/4' : 'hidden']">
        <div class="flex justify-between w-full py-3">
          <p class="b4 font-bold text-[#8E8E8E]">รายการข้อมูล</p>
          <img
            src="../../public/src/images/minimize.svg"
            alt="minimize"
            @click="isShowTab = false"
            class="cursor-pointer"
          />
        </div>

        <div class="text-white b1 cursor-pointer">
          <div
            class="p-4 border-b border-[#333333] btn-dark-4"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black':
                menu == 'ภาพรวมโครงการที่จัดทำ',
            }"
            @click="menu = 'ภาพรวมโครงการที่จัดทำ'"
          >
            <p>ภาพรวมโครงการที่จัดทำ</p>
            <ul class="list-disc ml-5">
              <li>จำนวนโครงการ</li>
              <li>งบประมาณโครงการ</li>
              <li>การกระจายตัวโครงการ</li>
            </ul>
          </div>
          <div
            class="p-4 border-b border-[#333333] btn-dark-4"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black':
                menu == 'รายชื่อโครงการที่จัดทำ',
            }"
            @click="menu = 'รายชื่อโครงการที่จัดทำ'"
            v-if="govProjectList.pagination?.totalItem > 0"
          >
            <p>รายชื่อโครงการที่จัดทำ</p>
          </div>
          <div
            class="p-4 border-b border-[#333333] btn-dark-4"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black':
                menu == 'ผู้รับจ้างที่ได้งาน',
            }"
            @click="menu = 'ผู้รับจ้างที่ได้งาน'"
            v-if="govContracterList.pagination?.totalItem > 0"
          >
            <p>ผู้รับจ้างที่ได้งาน</p>
          </div>
        </div>
      </div>
      <div :class="[isShowTab ? 'sm:w-3/4' : 'w-full', 'relative']">
        <Overall v-if="menu == 'ภาพรวมโครงการที่จัดทำ'" />

        <ProjectList
          v-else-if="menu == 'รายชื่อโครงการที่จัดทำ'"
          :data="govProjectList"
          :agencyName="govData?.agencyName"
          @change="getGovProject"
          :filterListProject="filterListProject"
        />
        <ContractorList
          v-else
          :data="govContracterList"
          :agencyName="govData?.agencyName"
          @change="getGovContracter"
          :filterListContractor="filterListContractor"
        />

        <img
          src="../public/src/images/showtab-btn.svg"
          alt="showtab button"
          class="cursor-pointer fixed bottom-5 left-5"
          @click="isShowTab = true"
          v-if="!isShowTab"
        />
      </div>
    </div>

    <Navigation
      :menuList="listMenu"
      section="gov"
      :activemenu="menu"
      @menu="(n) => (menu = n)"
    />

    <div
      class="mx-auto max-w-6xl text-white"
      v-if="menu == 'ภาพรวมโครงการที่จัดทำ'"
    >
      <ACTLineButton />

      <p class="b1 mt-5 flex items-center flex-wrap gap-2">
        <img src="../../public/src/images/status-icon.svg" />
        ท่านสามารถตรวจสอบความถูกต้องของข้อมูลเพื่อใช้ประกอบการอ้างอิงอีกครั้งได้ที่<a
          href="http://www.gprocurement.go.th/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline text-[#8DCCF0] mx-1"
          >http://www.gprocurement.go.th/</a
        >แจ้งข้อมูลเพิ่มเติมที่ FB :
        <a
          href="https://www.facebook.com/act.anticorruptionThailand/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline text-[#8DCCF0] mx-1"
        >
          องค์กรต่อต้านคอร์รัปชัน</a
        >
      </p>
    </div>
  </div>
  <Footer />
</template>

<style lang="scss" scoped></style>
