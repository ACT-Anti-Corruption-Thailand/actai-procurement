<template>
  <div>
    <h4 class="font-bold text-white mb-5">ภาพรวมโครงการที่จัดทำ</h4>

    <!-- <BarChart
      :title="title"
      :data="yearlyAggregates"
      id="chart-2"
      titleType="2"
      @title="(n) => (title = n)"
      @isOpen="isOpen = true"
    />

    <BarChart
      :title="title"
      :data="yearlyAggregates"
      id="chart-2"
      titleType="3"
      @title="(n) => (title = n)"
      @isOpen="isOpen = true"
    /> -->

    <div class="rounded-10 flex flex-col-mb mb-3">
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
          <label for="isRisk" class="text-[#EC1C24] ml-1 b4"
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
          :no="selected == 'งบประมาณ' ? '1' : '2'"
          :provinces="provinces"
        />
      </div>
    </div>

    <!-- <AuctionBarChart /> -->

    <!-- <OfferPriceBarChart /> -->

    <Modal
      v-if="isOpen"
      @close="isOpen = false"
      title="ACT Ai ตรวจสอบโครงการเสี่ยงอย่างไร ?"
    />
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

const title = ref('ความเสี่ยงทุจริต');
const selected = ref('งบประมาณ');
const isOpen = ref(false);

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
