<script setup lang="ts">
const menu = ref('ภาพรวม');
const isShowTab = ref(true);
const config = useRuntimeConfig();

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';

import type {
  ProjectDetails,
  ProjectDocuments,
  ProjectContractor,
  ProjectContract,
  ProjectEstimatePrice,
} from '../../public/src/data/data_details';

onBeforeMount(async () => {
  await getProjectDataAndDocs();
  await getProjectEstimatePrice();
  await getProjectContractor();
});

const projectData = ref<ProjectDetails>([]);
const projectDocs = ref<ProjectDocuments>([]);
const projectContractor = ref<ProjectContractor>([]);
const projectContract = ref<ProjectContract>([]);
const projectEstimatePrice = ref<ProjectEstimatePrice>([]);

const getProjectDataAndDocs = async () => {
  const segments = window.location.href.split('/')[4];

  const res = await fetch(`${config.public.apiUrl}/project/${segments}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    const data = await res.json();
    projectData.value = JSON.parse(JSON.stringify(data)) || [];
  }

  const res2 = await fetch(
    `${config.public.apiUrl}/project/${segments}/document`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res2.ok) {
    const data = await res2.json();
    projectDocs.value = JSON.parse(JSON.stringify(data.relatedDocuments)) || [];
  }
};

const getProjectContractor = async () => {
  const segments = window.location.href.split('/')[4];

  const res = await fetch(
    `${config.public.apiUrl}/project/${segments}/contractor`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    projectContractor.value = data.contractors || [];
  }

  const res2 = await fetch(
    `${config.public.apiUrl}/project/${segments}/contract`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res2.ok) {
    const data = await res2.json();
    projectContract.value = data.contractors || [];
  }
};

const getProjectEstimatePrice = async () => {
  const segments = window.location.href.split('/')[4];

  const res = await fetch(
    `${config.public.apiUrl}/project/${segments}/item-estimate-price`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    projectEstimatePrice.value = data.items || [];
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
    <Breadcrumb :title="projectData.projectName" />
    <div class="max-w-7xl mx-auto flex gap-3 sm:gap-5 flex-col-mb">
      <div class="sm:w-4/5">
        <h3 class="font-black">{{ projectData.projectName }}</h3>
        <p class="b1">เลขที่โครงการ : {{ projectData.projectId }}</p>
        <p class="b4 text-[#8E8E8E]">
          โครงการฯ อัปเดตข้อมูลเมื่อ
          {{
            projectData.lastUpdatedOn != null
              ? setDate(projectData.lastUpdatedOn)
              : '-'
          }}
        </p>
      </div>
      <div class="sm:w-1/5">
        <div
          v-if="projectData?.corruptionRisk?.length > 0"
          class="bg-[#FFEFF0] hover:bg-[#FFCECE] duration-300 rounded-10 text-[#EC1C24] b2 p-2.5 mb-2"
        >
          <div class="flex items-center gap-2">
            <img src="../../public/src/images/risk-flag.svg" alt="risk" />
            <p class="font-bold">พบความเสี่ยงทุจริต x ประเด็น</p>
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

        <!-- <div class="flex items-center gap-2">
          <img src="../../public/src/images/checkmark.svg" alt="checkmark" />
          <p class="font-bold">เข้าร่วมโครงการ CoST</p>
        </div>
        <div class="flex items-center gap-2">
          <img src="../../public/src/images/checkmark.svg" alt="checkmark" />
          <p class="font-bold">เข้าร่วมโครงการ Integrity Pact</p>
        </div> -->

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
              'border-l-4 border-l-[#EC1C24] bg-black': menu == 'ภาพรวม',
            }"
            @click="menu = 'ภาพรวม'"
          >
            <p>ภาพรวม</p>
          </div>
          <div
            class="p-4 border-b border-[#333333] btn-dark-4"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black': menu == 'ข้อมูลเจาะลึก',
            }"
            @click="menu = 'ข้อมูลเจาะลึก'"
          >
            <p>ข้อมูลเจาะลึก</p>
            <ul class="list-disc ml-5">
              <li>จำนวนนิติบุคคลที่เข้าร่วมในแต่ละขั้นตอน</li>
              <li>ผู้ชนะการประมูล</li>
              <li>การเสนอราคา</li>
            </ul>
          </div>
          <div
            class="p-4 border-b border-[#333333] btn-dark-4"
            :class="{
              'border-l-4 border-l-[#EC1C24] bg-black':
                menu == 'เอกสารที่เกี่ยวข้อง',
            }"
            @click="menu = 'เอกสารที่เกี่ยวข้อง'"
          >
            <p>เอกสารที่เกี่ยวข้อง</p>
          </div>
        </div>
      </div>
      <div :class="[isShowTab ? 'sm:w-3/4' : 'w-full', 'relative']">
        <OverallProject v-if="menu == 'ภาพรวม'" :data="projectData" />
        <Details
          v-else-if="menu == 'ข้อมูลเจาะลึก'"
          :contracters="projectContractor"
          :contracts="projectContract"
          :estimatePrice="projectEstimatePrice"
        />
        <ProjectDocument v-else :data="projectDocs" />

        <img
          src="../../public/src/images/showtab-btn.svg"
          alt="showtab button"
          class="cursor-pointer fixed bottom-5 left-5"
          @click="isShowTab = true"
          v-if="!isShowTab"
        />
      </div>
    </div>

    <Navigation
      section="project"
      :activemenu="menu"
      @menu="(n) => (menu = n)"
    />

    <div class="mx-auto max-w-6xl text-white" v-if="menu == 'ภาพรวม'">
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

<style lang="scss" scoped>
h3 {
  @include mobile {
    font-size: 26px;
  }
}
</style>
