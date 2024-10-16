<script setup lang="ts">
const menu = ref('ข้อมูลทั่วไป');
const isShowTab = ref(true);
const config = useRuntimeConfig();

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';

import type {
  ContractorDetails,
  ContracterRelationship,
  ContracterRelatedCompanies,
} from '../../public/src/data/data_details';
import type { Project, Government } from '../../public/src/data/search_result';

onBeforeMount(async () => {
  await getContracterData();
  await getContracterProject();
  await getContracterGov();
  await getContracterRelationship();
  await getContracterRelatedCompany();
});

const contractorData = ref<ContractorDetails>([]);
const contractorAbandonProjectList = ref<Project>([]);
const contractorProjectList = ref<Project>([]);
const contractorGovList = ref<Government>([]);
const contractorRelationship = ref<ContracterRelationship>([]);
const contractorRelatedCompanies = ref<ContracterRelatedCompanies>([]);

const getContracterData = async () => {
  const segments = window.location.href.split('/')[4];

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

const getContracterProject = async () => {
  const segments = window.location.href.split('/')[4];

  const params = new URLSearchParams();
  params.set('keyword', contractorData.value.companyName);
  params.set('page', 1);
  params.set('pageSize', 10);

  const res = await fetch(`${config.public.apiUrl}/project/search?${params}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const res2 = await fetch(
    `${config.public.apiUrl}/project/search?${params}&hasAbandonProject=true`,
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

  if (res2.ok) {
    const data = await res2.json();
    contractorAbandonProjectList.value = JSON.parse(JSON.stringify(data)) || [];
  }
};

const getContracterGov = async () => {
  const segments = window.location.href.split('/')[4];

  const params = new URLSearchParams();
  params.set('keyword', contractorData.value.companyName);
  params.set('page', 1);
  params.set('pageSize', 10);

  const res = await fetch(`${config.public.apiUrl}/agency/search?${params}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    const data = await res.json();
    contractorGovList.value = JSON.parse(JSON.stringify(data)) || [];
  }
};

const getContracterRelationship = async () => {
  const segments = window.location.href.split('/')[4];

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
    contractorRelationship.value = data.relatedCompanies;
  }
};

const getContracterRelatedCompany = async () => {
  const segments = window.location.href.split('/')[4];

  const res = await fetch(
    `${config.public.apiUrl}/company/${segments}/related-company`,
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

const setDate = (date) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return new Date(date).toLocaleDateString('th-TH', options);
};
</script>

<template>
  <Header />
  <div class="bg-white p-5 z-10 sticky top-0">
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
          v-if="contractorData.hasCorruptionRiskCases != 0"
          class="bg-[#FFEFF0] hover:bg-[#FFCECE] duration-300 rounded-10 text-[#EC1C24] b2 p-2.5 mb-2"
        >
          <div class="flex items-center gap-2">
            <img src="../../public/src/images/risk-flag.svg" alt="risk" />
            <p class="font-bold">ตรวจพบความน่าสนใจ x กรณี</p>
          </div>

          <ClientOnly fallback-tag="span" fallback="Loading...">
            <Disclosure v-slot="{ open }">
              <DisclosurePanel class="text-[#EC1C24] b4">
                <ul class="list-disc ml-10">
                  <li>เสนอราคาใกล้ราคากลาง</li>
                  <li>เสนอราคาสูง</li>
                  <li>เสนอราคาสูงกว่าราคากลาง</li>
                  <li>เสนอราคาเกาะกลุ่ม</li>
                  <li>เสนอราคาเท่ากัน</li>
                  <li>เสนอราคาต่ำกว่าราคากลางผิดปกติ</li>
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
          <!-- <div
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
              <li>สถานะโครงการ</li>
              <li>การกระจายตัวโครงการ</li>
              <li>วงเงินสัญญา</li>
              <li>สัดส่วนวิธีการประมูลงาน</li>
              <li>พฤติกรรมการเสนอราคา</li>
            </ul>
          </div> -->
          <div
            class="p-4 border-b border-[#333333] btn-dark-4"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black':
                menu == 'ประวัติการทิ้งงาน',
            }"
            @click="menu = 'ประวัติการทิ้งงาน'"
          >
            <p>ประวัติการทิ้งงาน</p>
          </div>
          <div
            class="p-4 border-b border-[#333333] btn-dark-4"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black': menu == 'ความสัมพันธ์',
            }"
            @click="menu = 'ความสัมพันธ์'"
          >
            <p>ความสัมพันธ์</p>
          </div>
          <div
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
        <WorkWithGovernment v-else-if="menu == 'การรับงานกับหน่วยงานรัฐ'" />
        <AbandonmentHistory
          v-else-if="menu == 'ประวัติการทิ้งงาน'"
          :data="contractorAbandonProjectList"
        />
        <Relationship
          v-else-if="menu == 'ความสัมพันธ์'"
          :data="contractorRelationship"
        />
        <Auction
          v-else-if="menu == 'กลุ่มเอกชนที่เข้าร่วมประมูลด้วยกัน'"
          :data="contractorRelatedCompanies"
        />
        <RelatedProject
          v-else-if="menu == 'รายชื่อโครงการที่เกี่ยวข้อง'"
          :data="contractorProjectList"
        />
        <RelatedGovernment
          v-else-if="menu == 'หน่วยงานรัฐที่เป็นผู้ว่าจ้าง'"
          :data="contractorGovList"
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
