<script setup lang="ts">
const menu = ref('ข้อมูลทั่วไป');
const isShowTab = ref(true);
const config = useRuntimeConfig();
const route = useRoute();

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';

import type {
  ContractorDetails,
  ContracterRelationship,
  ContracterRelatedCompanies,
} from '../../public/src/data/data_details';
import type {
  Project,
  Government,
  ChartData,
} from '../../public/src/data/search_result';
import qs from 'qs';
import type { FilterListProject } from '~/models/data';

import { chartdata } from '~/store/chartData';
import {
  defaultSelectedContractorProject,
  defaultSelectedContractorGov,
  selectedContractorProject,
  selectedContractorGov,
  sortByContractorProject,
  sortOrderContractorProject,
  sortByContractorGov,
  sortOrderContractorGov,
} from '~/store/filter';
import {
  isLoadingContractorProject,
  isLoadingContractorGov,
  isLoadingOverall,
} from '~/store/loading';

const contractorData = ref<ContractorDetails>([]);
const contractorAbandonProjectList = ref<Project>([]);
const contractorProjectList = ref<Project>([]);
const contractorGovList = ref<Government>([]);
const contractorRelationship = ref<ContracterRelationship>([]);
const contractorRelatedCompanies = ref<ContracterRelatedCompanies>([]);
const contractorAuctionChartData = ref({});
const contractorBudgetYearChartData = ref<ChartData>();
const totalAuction = ref(0);
const totalBidding = ref(0);
const totalWinner = ref(0);
const isLoadingProject = ref(false);
const isLoadingGov = ref(false);
const filterListProject = ref<FilterListProject>();
const filterListGovernment = ref({});
const listMenu = ref(['ข้อมูลทั่วไป']);

const getContracterData = async () => {
  const segments = route.path.split('/')[2];

  const res = await fetch(`${config.public.apiUrl}/company/${segments}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    const data = await res.json();
    contractorData.value = JSON.parse(JSON.stringify(data)) || [];
  }
};

const getContracterAuctionData = async () => {
  const segments = route.path.split('/')[2];

  const res = await fetch(
    `${config.public.apiUrl}/company/${segments}/aggregate/by-budget-year`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();

    contractorAuctionChartData.value = {
      labels: data.yearlyAggregate.map((x) => x.budgetYear.toString()),
      datasets: [
        {
          label: 'ซื้อซอง',
          backgroundColor: '#DADADA',
          data: data.yearlyAggregate.map(
            (x) => x.aggregateBy.biddingProcess.auction
          ),
        },
        {
          label: 'เสนอราคา',
          backgroundColor: '#C0C0C0',
          data: data.yearlyAggregate.map(
            (x) => x.aggregateBy.biddingProcess.bidding
          ),
        },
        {
          label: 'ได้งาน',
          backgroundColor: '#2EA0DF',
          data: data.yearlyAggregate.map(
            (x) => x.aggregateBy.biddingProcess.winner
          ),
        },
      ],
    };

    let a = data.yearlyAggregate.map(
      (x) => x.aggregateBy.biddingProcess.auction
    );
    let b = data.yearlyAggregate.map(
      (x) => x.aggregateBy.biddingProcess.bidding
    );
    let w = data.yearlyAggregate.map(
      (x) => x.aggregateBy.biddingProcess.winner
    );

    totalAuction.value = a.reduce((a, b) => a + b, 0);
    totalBidding.value = b.reduce((a, b) => a + b, 0);
    totalWinner.value = w.reduce((a, b) => a + b, 0);
  }
};

const getContracterProject = async (q) => {
  isLoadingContractorProject.value = true;

  const segments = route.path.split('/')[2];

  const params = new URLSearchParams();
  // params.set('keyword', contractorData.value.companyName);
  params.set('page', 1);

  let filter = {
    companyId: segments,
  };

  var str = qs.stringify({ filter });

  const res = await fetch(
    `${config.public.apiUrl}/project/search?${params}${q}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    contractorProjectList.value = JSON.parse(JSON.stringify(data)) || [];
  }
  isLoadingContractorProject.value = false;
};

const getContracterAbandonProject = async (q, n) => {
  const segments = route.path.split('/')[2];

  const params = new URLSearchParams();
  // params.set('keyword', contractorData.value.companyName);
  params.set('page', 1);
  params.set('pageSize', n);

  let filter = {
    hasAbandonProject: true,
    companyId: segments,
  };

  var str = qs.stringify({ filter });

  const res2 = await fetch(
    `${config.public.apiUrl}/project/search?${params}&${str}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res2.ok) {
    const data = await res2.json();
    contractorAbandonProjectList.value = JSON.parse(JSON.stringify(data)) || [];
  }
};

const getContracterGov = async (q, n) => {
  isLoadingContractorGov.value = true;

  const segments = route.path.split('/')[2];

  const params = new URLSearchParams();
  params.set('page', 1);

  let filter = {
    companyId: segments,
  };

  var str = qs.stringify({ filter });

  const res = await fetch(
    `${config.public.apiUrl}/agency/search?${params}&${str}${q}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    contractorGovList.value = JSON.parse(JSON.stringify(data)) || [];
    isLoadingGov.value = false;
  }

  isLoadingContractorGov.value = false;
};

const getContracterRelationship = async () => {
  const segments = route.path.split('/')[2];

  const res = await fetch(
    `${config.public.apiUrl}/company/${segments}/relationship`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    contractorRelationship.value = data;
  }
};

const getContracterRelatedCompany = async (yf, yt) => {
  const segments = route.path.split('/')[2];

  const res = await fetch(
    `${config.public.apiUrl}/company/${segments}/related-company?budgetYearStart=${yf}&budgetYearEnd=${yt}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    contractorRelatedCompanies.value = data.relatedCompanies;
  }
};

const setMenuList = () => {
  if (
    contractorBudgetYearChartData.value?.yearlyAggregates?.length != 0 ||
    totalAuction.value != 0 ||
    totalBidding.value != 0 ||
    totalWinner.value != 0
  )
    listMenu.value.push('การรับงานกับหน่วยงานรัฐ');

  if (contractorAbandonProjectList.value?.pagination?.totalItem != 0)
    listMenu.value.push('ประวัติการทิ้งงาน');

  if (
    contractorRelationship.value.relationshipWith?.companies?.length > 0 ||
    contractorRelationship.value.relationshipWith?.politicalParties?.length >
      0 ||
    contractorRelationship.value.relationshipWith?.politicians?.length > 0
  )
    listMenu.value.push('ความสัมพันธ์');

  if (contractorRelatedCompanies.value.length != 0)
    listMenu.value.push('กลุ่มเอกชนที่เข้าร่วมประมูลด้วยกัน');

  if (contractorProjectList.value?.pagination?.totalItem != 0)
    listMenu.value.push('รายชื่อโครงการที่เกี่ยวข้อง');

  if (contractorGovList.value?.pagination?.totalItem != 0)
    listMenu.value.push('หน่วยงานรัฐที่เป็นผู้ว่าจ้าง');
};

onBeforeMount(async () => {
  isLoadingOverall.value = true;
  isLoadingContractorProject.value = true;
  isLoadingContractorGov.value = true;

  const segments = route.path.split('/')[2];
  let filterList = await getFilter(
    config.public.apiUrl,
    '?companyId=' + segments
  );
  filterListProject.value = filterList[0];
  filterListGovernment.value = filterList[1];

  if (
    route.query['filter[budgetYear][start]'] == null ||
    route.query['filter[budgetYear][end]'] == null
  ) {
    selectedContractorGov.value.yearFrom = filterListProject
      .value!.budgetYears.at(0)!
      .toString();
    selectedContractorGov.value.yearTo = filterListProject
      .value!.budgetYears.at(-1)!
      .toString();
    selectedContractorProject.value.yearFrom = filterListProject
      .value!.budgetYears.at(0)!
      .toString();
    selectedContractorProject.value.yearTo = filterListProject
      .value!.budgetYears.at(-1)!
      .toString();
  }

  let filter = {
    companyId: segments,
  };

  var str = qs.stringify({ filter });

  const { ...filter_query } = route.query;
  let str2 = qs.stringify(filter_query);
  let filter_query_text_project = route.hash.includes('project')
    ? '&' + str2
    : '&' + str + '&sortBy=announcementDate&sortOrder=desc';
  let filter_query_text_gov = route.hash.includes('government')
    ? '&' + str2
    : '&sortBy=totalContractAmount&sortOrder=desc';

  contractorBudgetYearChartData.value = await getChartData(
    config.public.apiUrl,
    str
  );
  chartdata.value = contractorBudgetYearChartData.value;

  await getContracterData();
  await getContracterAuctionData();
  await getContracterRelationship();
  await getContracterRelatedCompany('2560', '2568');
  await getContracterAbandonProject('', 10);
  await getContracterProject(filter_query_text_project, 10);
  await getContracterGov(filter_query_text_gov, 10);

  setMenuList();

  if (route.hash.includes('project')) {
    menu.value = 'รายชื่อโครงการที่เกี่ยวข้อง';

    let agencyNameList = [];
    let agencyListArray = [];
    let companyNameList = [];
    let companyListArray = [];

    if (route.query['filter[agencyId]'] !== undefined) {
      agencyListArray = route.query['filter[agencyId]']?.split(',');

      if (agencyListArray != 'undefined') {
        let agencyList = filterListProject.value?.relatedAgencies?.filter(
          (person) => agencyListArray.includes(person.id.toString())
        );

        agencyNameList = agencyList?.flatMap((o) => o.name);
      }
    }

    if (route.query['filter[companyId]'] !== undefined) {
      companyListArray = route.query['filter[companyId]']?.split(',');

      if (companyListArray != 'undefined') {
        let companyList = filterListProject.value?.relatedCompanies?.filter(
          (person) => companyListArray.includes(person.id.toString())
        );

        companyNameList = companyList?.flatMap((o) => o.name);
      }
    }

    selectedContractorProject.value = {
      yearFrom:
        route.query['filter[budgetYear][start]']?.toString() ||
        filterListProject.value?.budgetYears.at(0)!.toString(),
      yearTo:
        route.query['filter[budgetYear][end]']?.toString() ||
        filterListProject.value?.budgetYears.at(-1)!.toString(),
      agencyId:
        agencyNameList.length != 0
          ? agencyNameList.toString()
          : defaultSelectedContractorProject.agencyId,
      projectStatus:
        route.query['filter[projectStatus]']?.toString() ||
        defaultSelectedContractorProject.projectStatus,
      province:
        route.query['filter[province]']?.toString() ||
        defaultSelectedContractorProject.province,
      resourcingMethod:
        route.query['filter[resourcingMethod]']?.toString() ||
        defaultSelectedContractorProject.resourcingMethod,
      companyId:
        companyNameList.length != 0
          ? companyNameList.toString()
          : defaultSelectedContractorProject.companyId,
      hasCorruptionRisk:
        route.query['filter[hasCorruptionRisk]'] === 'true' ||
        defaultSelectedContractorProject.hasCorruptionRisk,
    };

    sortByContractorProject.value =
      route.query.sortBy?.toString() || 'announcementDate';
    sortOrderContractorProject.value =
      route.query.sortOrder?.toString() || 'desc';
  } else if (route.hash.includes('government')) {
    selectedContractorGov.value = {
      yearFrom:
        route.query['filter[budgetYear][start]']?.toString() ||
        filterListProject.value?.budgetYears.at(0)!.toString(),
      yearTo:
        route.query['filter[budgetYear][end]']?.toString() ||
        filterListProject.value?.budgetYears.at(-1)!.toString(),
      resourcingMethod:
        route.query['filter[resourcingMethod]']?.toString() ||
        defaultSelectedContractorGov.resourcingMethod,
    };

    menu.value = 'หน่วยงานรัฐที่เป็นผู้ว่าจ้าง';
    sortByContractorGov.value =
      route.query.sortBy?.toString() || 'totalContractAmount';
    sortOrderContractorGov.value = route.query.sortOrder?.toString() || 'desc';
  }

  isLoadingOverall.value = false;
});

onMounted(async () => {
  if (route.hash.includes('project'))
    menu.value = 'รายชื่อโครงการที่เกี่ยวข้อง';
  else if (route.hash.includes('government'))
    menu.value = 'หน่วยงานรัฐที่เป็นผู้ว่าจ้าง';
});
</script>

<template>
  <Header />
  <div class="bg-white p-5">
    <Breadcrumb :title="contractorData.companyName" />
    <div class="max-w-7xl mx-auto flex gap-2 flex-col-mb">
      <div class="sm:w-4/5">
        <h3 class="font-black">
          {{ contractorData.companyName }}
        </h3>
        <p class="b4 text-[#8E8E8E]">
          ผู้รับจ้างอัปเดตข้อมูลเมื่อ
          {{ setDate(contractorData.lastUpdatedOn) }}
        </p>
      </div>
      <div class="sm:w-1/5">
        <div
          v-if="contractorData.hasCorruptionRiskCases"
          class="bg-[#FFEFF0] hover:bg-[#FFCECE] duration-300 rounded-10 text-[#EC1C24] b2 p-2.5 mb-2"
        >
          <div class="flex items-center gap-2">
            <img src="../../public/src/images/risk-flag.svg" alt="risk" />
            <p class="font-bold">
              ตรวจพบความน่าสนใจ
              {{ contractorData?.corruptionRisk?.length }} กรณี
            </p>
          </div>

          <ClientOnly fallback-tag="span" fallback="Loading...">
            <Disclosure v-slot="{ open }">
              <DisclosurePanel class="text-[#EC1C24] b4">
                <ul class="list-disc ml-10">
                  <li v-for="item in contractorData?.corruptionRisk">
                    {{ item }}
                  </li>
                </ul>
              </DisclosurePanel>
              <DisclosureButton
                class="ml-2 flex items-center text-[#EC1C24] gap-2 w-full b4"
              >
                <ChevronDownIcon
                  :class="[open ? 'rotate-180 transform' : '', 'size-2']"
                />
                {{ open ? 'ปิดรายละเอียด' : 'ดูรายละเอียด' }}
              </DisclosureButton>
            </Disclosure>
          </ClientOnly>
        </div>

        <Share color="#0B5C90" text="แชร์หน้านี้" class="mt-2" />
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
              'border-l-4 border-l-[#EC1C24] bg-black': menu == 'ข้อมูลทั่วไป',
            }"
            @click="menu = 'ข้อมูลทั่วไป'"
          >
            <p>ข้อมูลทั่วไป</p>
          </div>
          <div
            v-if="
              contractorBudgetYearChartData?.yearlyAggregates?.length != 0 ||
              totalAuction != 0 ||
              totalBidding != 0 ||
              totalWinner != 0
            "
            class="p-4 border-b border-[#333333] btn-dark-4"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black':
                menu == 'การรับงานกับหน่วยงานรัฐ',
            }"
            @click="menu = 'การรับงานกับหน่วยงานรัฐ'"
          >
            <p>การรับงานกับหน่วยงานรัฐ</p>
            <ul class="list-disc ml-5">
              <li>จำนวนโครงการ</li>
              <li>วงเงินสัญญา</li>
              <li>การกระจายตัวโครงการ</li>
              <li>สัดส่วนวิธีการประมูลงาน</li>
              <li>พฤติกรรมการเสนอราคา</li>
            </ul>
          </div>
          <div
            class="p-4 border-b border-[#333333] btn-dark-4"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black':
                menu == 'ประวัติการทิ้งงาน',
            }"
            @click="menu = 'ประวัติการทิ้งงาน'"
            v-if="contractorAbandonProjectList.pagination?.totalItem > 0"
          >
            <p>ประวัติการทิ้งงาน</p>
          </div>
          <div
            class="p-4 border-b border-[#333333] btn-dark-4"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black': menu == 'ความสัมพันธ์',
            }"
            @click="menu = 'ความสัมพันธ์'"
            v-if="
              contractorRelationship.relationshipWith?.companies?.length > 0 ||
              contractorRelationship.relationshipWith?.politicalParties
                ?.length > 0 ||
              contractorRelationship.relationshipWith?.politicians?.length > 0
            "
          >
            <p>ความสัมพันธ์</p>
          </div>
          <div
            v-if="contractorRelatedCompanies?.length != 0"
            class="p-4 border-b border-[#333333] btn-dark-4"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black':
                menu == 'กลุ่มเอกชนที่เข้าร่วมประมูลด้วยกัน',
            }"
            @click="menu = 'กลุ่มเอกชนที่เข้าร่วมประมูลด้วยกัน'"
          >
            <p>กลุ่มเอกชนที่เข้าร่วมประมูลด้วยกัน</p>
          </div>
          <div
            v-if="contractorProjectList?.pagination?.totalItem != 0"
            class="p-4 border-b border-[#333333] btn-dark-4"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black':
                menu == 'รายชื่อโครงการที่เกี่ยวข้อง',
            }"
            @click="menu = 'รายชื่อโครงการที่เกี่ยวข้อง'"
          >
            <p>รายชื่อโครงการที่เกี่ยวข้อง</p>
          </div>
          <div
            v-if="contractorGovList?.pagination?.totalItem != 0"
            class="p-4 border-b border-[#333333] btn-dark-4"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black':
                menu == 'หน่วยงานรัฐที่เป็นผู้ว่าจ้าง',
            }"
            @click="menu = 'หน่วยงานรัฐที่เป็นผู้ว่าจ้าง'"
          >
            <p>หน่วยงานรัฐที่เป็นผู้ว่าจ้าง</p>
          </div>
        </div>
      </div>
      <div :class="[isShowTab ? 'sm:w-3/4' : 'w-full', 'relative']">
        <General v-if="menu == 'ข้อมูลทั่วไป'" :data="contractorData" />
        <WorkWithGovernment
          v-else-if="menu == 'การรับงานกับหน่วยงานรัฐ'"
          :auctionData="contractorAuctionChartData"
          :totalAuction="totalAuction"
          :totalBidding="totalBidding"
          :totalWinner="totalWinner"
        />
        <AbandonmentHistory
          v-else-if="menu == 'ประวัติการทิ้งงาน'"
          :data="contractorAbandonProjectList"
        />
        <Relationship
          v-else-if="menu == 'ความสัมพันธ์'"
          :data="contractorRelationship"
          :companyName="contractorData.companyName"
        />
        <Auction
          v-else-if="menu == 'กลุ่มเอกชนที่เข้าร่วมประมูลด้วยกัน'"
          :data="contractorRelatedCompanies"
          :companyName="contractorData.companyName"
          @change="getContracterRelatedCompany"
        />
        <RelatedProject
          v-else-if="menu == 'รายชื่อโครงการที่เกี่ยวข้อง'"
          :data="contractorProjectList"
          @change="getContracterProject"
          :isLoading="isLoadingProject"
          :filterListProject="filterListProject"
        />
        <RelatedGovernment
          v-else-if="menu == 'หน่วยงานรัฐที่เป็นผู้ว่าจ้าง'"
          :data="contractorGovList"
          @change="getContracterGov"
          :isLoading="isLoadingGov"
          :filterListGovernment="filterListGovernment"
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
      section="contractor"
      :activemenu="menu"
      @menu="(n) => (menu = n)"
    />

    <div class="mx-auto max-w-6xl text-white" v-if="menu == 'ข้อมูลทั่วไป'">
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
