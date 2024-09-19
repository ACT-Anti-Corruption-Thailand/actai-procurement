<template>
  <div>
    <h4 class="font-bold text-white mb-5">ภาพรวมโครงการที่จัดทำ</h4>

    <BarChart title="ความเสี่ยงทุจริต" :data="yearlyAggregates" id="chart-2" />
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
</script>

<style scoped></style>
