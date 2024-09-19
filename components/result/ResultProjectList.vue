<script setup lang="ts">
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  RadioGroup,
  RadioGroupOption,
} from '@headlessui/vue';

const selectedTab = ref(0);
const sortBy = ref('desc');

defineProps<{
  iconGuide: object;
  mockDataGuide: object;
}>();

const yearlyAggregates = [
  {
    budgetYear: '2555',
    totalProject: 0,
    totalContract: 0,
    aggregateBy: {
      budgetMoney: 0,
      hasCorruptionRiskProject: 0,
      hasNoCorruptionRiskProject: 0,
      projectStatus: {
        completed: 0,
        contracted: 0,
        inprogress: 0,
        cancelContract: 0,
        cancelProject: 0,
      },
      contractStatus: {
        delivered: 0,
        deliveredOnTime: 0,
        deliveredLate: 0,
        contracted: 0,
        inprogress: 0,
        cancelContract: 0,
      },
      resourcingMethod: {
        bidding: 0,
        internationalBidding: 0,
        eBidding: 0,
        eBiddingViaMarket: 0,
        settlePrice: 0,
        checkPrice: 0,
        eMarket: 0,
        specialMethod: 0,
        selective: 0,
        specific: 0,
      },
    },
  },
  {
    budgetYear: '2556',
    totalProject: 100,
    totalContract: 60,
    aggregateBy: {
      budgetMoney: 120000000,
      hasCorruptionRiskProject: 20,
      hasNoCorruptionRiskProject: 10,
      projectStatus: {
        completed: 10,
        contracted: 30,
        inprogress: 20,
        cancelContract: 20,
        cancelProject: 20,
      },
      contractStatus: {
        delivered: 10,
        deliveredOnTime: 5,
        deliveredLate: 5,
        contracted: 25,
        inprogress: 5,
        cancelContract: 20,
      },
      resourcingMethod: {
        bidding: 10,
        internationalBidding: 20,
        eBidding: 20,
        eBiddingViaMarket: 5,
        settlePrice: 10,
        checkPrice: 8,
        eMarket: 4,
        specialMethod: 23,
        selective: 32,
        specific: 20,
      },
    },
  },
  {
    budgetYear: '2557',
    totalProject: 34,
    totalContract: 5,
    aggregateBy: {
      budgetMoney: 65000000,
      hasCorruptionRiskProject: 5,
      hasNoCorruptionRiskProject: 5,
      projectStatus: {
        completed: 0,
        contracted: 0,
        inprogress: 0,
        cancelContract: 0,
        cancelProject: 0,
      },
      contractStatus: {
        delivered: 0,
        deliveredOnTime: 0,
        deliveredLate: 0,
        contracted: 0,
        inprogress: 0,
        cancelContract: 0,
      },
      resourcingMethod: {
        bidding: 0,
        internationalBidding: 0,
        eBidding: 0,
        eBiddingViaMarket: 0,
        settlePrice: 0,
        checkPrice: 0,
        eMarket: 0,
        specialMethod: 0,
        selective: 0,
        specific: 0,
      },
    },
  },
];

function changeTab(index) {
  selectedTab.value = index;
}

function highlight(title: string, text: string) {
  var innerHTML = title;
  var index = innerHTML.indexOf(text);
  if (index >= 0) {
    innerHTML =
      innerHTML.substring(0, index) +
      "<span class='text-[#74060A]'>" +
      innerHTML.substring(index, index + text.length) +
      '</span>' +
      innerHTML.substring(index + text.length);
    return innerHTML;
  }
}
</script>

<template>
  <TabGroup :selectedIndex="selectedTab" @change="changeTab" as="Component">
    <div class="flex flex-col-mb justify-between">
      <TabList>
        <Tab class="tab-menu b1">รายชื่อ</Tab>
        <Tab class="tab-menu b1">ภาพรวม</Tab>
      </TabList>
      <div><FilterPopup /></div>
    </div>

    <TabPanels>
      <TabPanel>
        <div class="flex gap-2 py-5 flex-col-mb">
          <div class="rounded-md bg-black p-5 text-white sm:w-3/5">
            <p class="b1 font-bold">
              จำนวนโครงการจัดซื้อจัดจ้างตามเงื่อนไขที่ค้นหา
            </p>
            <h2 class="font-bold">2,000 โครงการ</h2>
            <hr />
            <div class="flex">
              <div class="flex-1">
                <p class="b2">งบประมาณรวม (บาท)</p>
                <h5 class="font-bold">47,540,648</h5>
              </div>
              <div class="flex-1 text-[#EC1C24]">
                <p class="b2">เป็นโครงการเสี่ยงทุจริต</p>
                <h5 class="font-bold">50.00%</h5>
              </div>
            </div>

            <GoToText
              color="#8DCCF0"
              text="ดูภาพรวมเพิ่มเติม"
              class="cursor-pointer mb-0"
              @click="selectedTab = 1"
            />
          </div>

          <div class="sm:w-2/5">
            <div class="rounded-md bg-[#F5F5F5] p-5 text-black mb-3">
              <p class="b2">หน่วยงานรัฐเจ้าของโครงการ</p>
              <h5 class="font-bold">x,xxx,xxx,xxx หน่วยงาน</h5>
            </div>
            <div class="rounded-md bg-[#F5F5F5] p-5 text-black">
              <p class="b2">ผู้รับจ้าง</p>
              <h5 class="font-bold">x,xxx,xxx,xxx ราย</h5>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between my-5 flex-col-mb">
          <div class="flex gap-2 items-center relative">
            <p class="b1">เรียงตาม</p>
            <SortBy
              class="bg-[#F5F5F5]"
              :list="[
                'ความใกล้เคียงคำค้น',
                'วันที่ประกาศโครงการ',
                'งบประมาณรวม',
              ]"
            />

            <RadioGroup v-model="sortBy" class="flex gap-1">
              <RadioGroupOption
                v-slot="{ checked }"
                class="flex-1 radio-btn b1 rounded-md"
                value="desc"
              >
                <img src="../../public/src/images/sort-desc.svg" alt="" />
              </RadioGroupOption>
              <RadioGroupOption
                v-slot="{ checked }"
                class="flex-1 radio-btn b1 rounded-md"
                value="asc"
              >
                <img src="../../public/src/images/sort-asc.svg" alt="" />
              </RadioGroupOption>
            </RadioGroup>
          </div>
          <DownloadAndCopy />
        </div>

        <ProjectIconGuide :data="iconGuide" class="text-[#8E8E8E]" />

        <div class="flex justify-between py-5 flex-col-mb">
          <NuxtLink to="/project">
            <div>
              <p
                class="b1 font-bold"
                v-html="
                  highlight('สอบราคาซื้อชุดก่อสร้าง (60.14.13)', 'ก่อสร้าง')
                "
              ></p>
              <ProjectIconGuide :data="mockDataGuide" class="text-[#8E8E8E]" />
              <div class="rounded-full bg-[#FFEFF0] p-1 w-fit flex gap-2">
                <img src="../../public/src/images/risk-flag.svg" alt="risk" />
                <p class="b4 text-[#EC1C24]">พบความเสี่ยงทุจริต</p>
              </div>
            </div></NuxtLink
          >
          <div>
            <p class="b4">งบประมาณรวม (บาท)</p>
            <p class="b1">190,000,000,000</p>
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <h5 class="font-bold my-5">xxx,xxx,xxx โครงการจัดซื้อจัดจ้าง</h5>
        <div class="flex flex-col-mb gap-2">
          <a href="#chart-1" class="sm:w-2/4">
            <div class="rounded-md bg-black p-5 hover:bg-[#333333] text-white">
              <p class="b1">งบประมาณรวม (บาท)</p>
              <h4 class="font-bold">x,xxx,xxx,xxx โครงการ</h4>
            </div></a
          >
          <a href="#chart-2" class="sm:w-2/4">
            <div
              class="rounded-md bg-black p-5 hover:bg-[#333333] text-[#EC1C24]"
            >
              <p class="b1">โครงการเสี่ยงทุจริต</p>
              <h4 class="font-bold">xx.xx%</h4>
            </div></a
          >
        </div>
        <div class="flex justify-between flex-wrap gap-2 mt-2">
          <a href="#chart-3" class="w-full sm:w-[32%] lg:w-[19%]">
            <div
              class="rounded-md bg-black p-5 hover:bg-[#333333] text-white h-full"
            >
              <p class="b1">สถานะโครงการที่พบมากที่สุด (xx%)</p>
              <p class="b1 font-bold">จัดทำสัญญา / PO แล้ว</p>
            </div>
          </a>

          <a href="#chart-4" class="w-full sm:w-[32%] lg:w-[19%]">
            <div
              class="rounded-md bg-black p-5 hover:bg-[#333333] text-white h-full"
            >
              <p class="b1">สถานะของสัญญาที่พบมากที่สุด (xx%)</p>
              <p class="b1 font-bold">ส่งงานล่าช้ากว่ากำหนด</p>
            </div>
          </a>

          <a href="#chart-5" class="w-full sm:w-[32%] lg:w-[19%]">
            <div
              class="rounded-md bg-black p-5 hover:bg-[#333333] text-white h-full"
            >
              <p class="b1">วิธีการจัดหาที่พบมากที่สุด (xx%)</p>
              <p class="b1 font-bold">
                ประกวดราคาด้วยวิธีการทางอิเล็กทรอนิกส์-โดยผ่านผู้ให้บริการตลาดกลาง
              </p>
            </div>
          </a>

          <a href="#maps" class="w-full sm:w-[49%] lg:w-[19%]">
            <div
              class="rounded-md bg-black p-5 hover:bg-[#333333] text-white h-full"
            >
              <p class="b1">จังหวัดที่มีจำนวนโครงการมากที่สุด</p>
              <p class="b1 font-bold">กรุงเทพมหานคร</p>
            </div>
          </a>

          <a href="#maps" class="w-full sm:w-[49%] lg:w-[19%]">
            <div
              class="rounded-md bg-black p-5 hover:bg-[#333333] text-white h-full"
            >
              <p class="b1">จังหวัดที่ใช้งบประมาณมากที่สุด</p>
              <p class="b1 font-bold">พระนครศรีอยุธยา</p>
            </div>
          </a>
        </div>

        <div class="bg-black p-5 sm:p-10 rounded-md mt-3">
          <div class="max-w-6xl mx-auto">
            <BarChart title="งบประมาณ" :data="yearlyAggregates" id="chart-1" />

            <BarChart
              title="ความเสี่ยงทุจริต"
              :data="yearlyAggregates"
              id="chart-2"
            />

            <BarChart
              title="สถานะโครงการ"
              :data="yearlyAggregates"
              id="chart-3"
            />

            <BarChart
              title="สถานะสัญญา"
              :data="yearlyAggregates"
              id="chart-4"
            />

            <BarChart
              title="วิธีการจัดหา"
              :data="yearlyAggregates"
              id="chart-5"
            />

            <MapSection class="mt-5" id="maps" />
          </div>
        </div>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<style lang="scss" scoped></style>
