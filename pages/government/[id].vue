<script setup lang="ts">
const menu = ref('ภาพรวมโครงการที่จัดทำ');
const config = useRuntimeConfig();
const isShowTab = ref(true);

import type { GovernmentDetails } from '../../public/src/data/data_details';
import type { Project, Contractor } from '../../public/src/data/search_result';

onBeforeMount(async () => {
  await getGovData();
  await getGovProject('', 1);
  await getGovContracter('', 1);
});

const govData = ref<GovernmentDetails>([]);
const govProjectList = ref<Project>([]);
const govContracterList = ref<Contractor>([]);

const getGovData = async () => {
  const segments = window.location.href.split('/')[4];

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

const getGovProject = async (q, n) => {
  const segments = window.location.href.split('/')[4];

  const params = new URLSearchParams();
  params.set('keyword', govData.value.agencyName);
  params.set('page', n);
  params.set('pageSize', 10);

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
    govProjectList.value = JSON.parse(JSON.stringify(data)) || [];
  }
};

const getGovContracter = async (q, n) => {
  const segments = window.location.href.split('/')[4];

  const params = new URLSearchParams();
  params.set('keyword', govData.value.agencyName);
  params.set('page', n);
  params.set('pageSize', 10);

  const res = await fetch(
    `${config.public.apiUrl}/company/search?${params}${q}`,
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
          @change="getGovProject"
        />
        <ContractorList
          v-else
          :data="govContracterList"
          @change="getGovContracter"
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

    <Navigation section="gov" :activemenu="menu" @menu="(n) => (menu = n)" />

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
