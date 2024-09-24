<template>
  <div>
    <h4 class="font-bold text-white mb-5">ภาพรวมโครงการที่จัดทำ</h4>

    <BarChart
      :title="title"
      :data="yearlyAggregates"
      id="chart-2"
      :isInGov="true"
      @title="(n) => (title = n)"
      @isOpen="isOpen = true"
    />

    <div class="rounded-md flex flex-col-mb mb-3">
      <div class="p-7 bg-[#F5F5F5] checkbox-wrapper sm:w-1/3">
        <h4 class="font-black">งบประมาณโครงการ</h4>

        <div class="flex items-center b1 gap-2">
          <div class="h-[1px] w-10 bg-black"></div>
          <div>
            <p>วงเงินสัญญารวม (บาท)</p>
            <p class="font-bold">185,000,000.00</p>
          </div>
        </div>

        <div class="flex items-center b1 gap-2 text-[#8E8E8E]">
          <div class="h-[1px] w-10 border border-dashed border-[#8E8E8E]"></div>
          <div>
            <p>วงเงินสัญญารวม (บาท)</p>
            <p class="font-bold">120,000,000.00</p>
          </div>
        </div>

        <div class="flex items-center b1 gap-2 text-[#8E8E8E]">
          <div class="h-[15px] w-10 bg-[#8E8E8E]"></div>
          <div>
            <p>ส่วนต่าง (บาท)</p>
            <p class="font-bold">10,000,000.00</p>
          </div>
        </div>

        <p
          class="b4 flex gap-1 items-center text-[#0B5C90] duration-300 cursor-pointer"
          @click="isOpen2 = true"
        >
          <info color="#0B5C90" />
          <span>ตัวเลขนี้บ่งบอกอะไร</span>
        </p>
      </div>
      <div
        class="py-7 pr-7 pl-10 bg-[#FFFFFF] chart-wrapper sm:w-2/3 text-[#8E8E8E] relative"
      >
        <p class="text-center b2">
          เปรียบเทียบวงเงินสัญญาและงบประมาณรวมในแต่ละปี
        </p>

        <div>
          <Line
            :data="chartData"
            :options="chartOptions"
            height="300"
            ref="bar"
          />
        </div>

        <p class="text-center b4 font-bold">ปีงบประมาณ</p>
        <p class="text-center b4 font-bold yaxis-text">งบประมาณ (บาท)</p>
      </div>
    </div>

    <div class="rounded-md flex flex-col-mb mb-3">
      <div class="p-7 bg-[#F5F5F5] checkbox-wrapper sm:w-1/3">
        <h4 class="font-black">การกระจายตัวโครงการ</h4>
        <p class="b1 font-bold">รวม xxx,xxx,xxx.xx บาท ใน xx จังหวัด</p>

        <p class="b1 mt-3">แสดงความเข้มสีตาม</p>
        <ListBox
          title=""
          :selected="selected"
          :list="['งบประมาณ', 'จำนวนโครงการ']"
        />

        <div class="mt-3">
          <input
            type="checkbox"
            name=""
            id="isRisk"
            class="text-black ring-0"
          />
          <label for="isRisk" class="text-[#EC1C24] ml-1 b1"
            >ดูเฉพาะโครงการที่พบความเสี่ยงทุจริต (xx,xxx โครงการ ใน xx
            จังหวัด)</label
          >
        </div>
      </div>
      <div
        class="py-7 pr-7 pl-10 bg-[#FFFFFF] chart-wrapper sm:w-2/3 text-[#8E8E8E] relative"
      >
        <Map
          class="mx-auto max-w-xs h-fit"
          :no="selected == 'งบประมาณ' ? 1 : 2"
          :provinces="provinces"
        />
      </div>
    </div>

    <Modal
      v-if="isOpen"
      @close="isOpen = false"
      title="ACT Ai ตรวจสอบโครงการเสี่ยงอย่างไร ?"
    />

    <Modal v-if="isOpen2" @close="isOpen2 = false" title="กราฟนี้บ่งบอกอะไร" />
  </div>
</template>

<script setup lang="ts">
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

import { Line } from 'vue-chartjs';

const title = ref('ความเสี่ยงทุจริต');
const selected = ref('งบประมาณ');
const isOpen = ref(false);
const isOpen2 = ref(false);

const chartData = ref({
  labels: ['’55', '’56', '’57'],
  datasets: [
    {
      label: 'วงเงินสัญญารวม (บาท)',
      backgroundColor: '#FFFFFF',
      borderColor: '#000000',
      data: [0, 110000000, 55000000],
      fill: true,
    },
    {
      label: 'งบประมาณรวม (บาท)',
      backgroundColor: '#DADADA',
      borderColor: '#5E5E5E',
      borderDash: [5, 5],
      data: [0, 120000000, 65000000],
      fill: true,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    filler: {
      propagate: false,
    },
    legend: {
      display: false,
    },
    tooltip: {
      titleFont: {
        size: 20,
        family: 'DB_Helvethaica_X',
      },
      bodyFont: {
        size: 16,
        family: 'DB_Helvethaica_X',
      },
      callbacks: {
        title: function (context) {
          return 'ปี 25' + context[0].label.replace('’', '');
        },
        label: function (context) {
          return context.formattedValue;
        },
        footer: function (context) {
          let a = context[0].raw - context[1].raw;
          return a == 0
            ? 0
            : ((context[0].raw - context[1].raw) * -1).toLocaleString();
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 16,
          family: 'DB_Helvethaica_X',
          color: '#8E8E8E',
        },
      },
    },
    y: {
      ticks: {
        font: {
          size: 16,
          family: 'DB_Helvethaica_X',
        },
        callback: function (value, index, ticks) {
          return value > 1000000 ? (value / 1000000).toLocaleString() : value;
        },
      },
    },
  },
});

const provinces = [
  {
    name: 'กรุงเทพมหานคร',
    name_en: 'bangkok',
    totalProject: 3564,
    totalBudgetMoney: 38899482862,
    totalCorruptionProject: 497,
  },
  {
    name: 'ปทุมธานี',
    name_en: 'pathumthani',
    totalProject: 120,
    totalBudgetMoney: 482865642,
    totalCorruptionProject: 34,
  },
  {
    name: 'เชียงใหม่',
    name_en: 'chiangmai',
    totalProject: 2000,
    totalBudgetMoney: 6482865642,
    totalCorruptionProject: 34,
  },
  {
    name: 'แพร่',
    name_en: 'phrae',
    totalProject: 356,
    totalBudgetMoney: 270443964,
    totalCorruptionProject: 239,
  },
];
</script>

<style scoped></style>
