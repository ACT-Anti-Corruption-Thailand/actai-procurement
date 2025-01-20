<template>
  <div>
    <h4 class="font-bold text-white mb-5">การรับงานกับหน่วยงานรัฐ</h4>

    <GovBarChartAndMap2 />

    <AuctionBarChart
      :data="props.auctionData"
      :totalAuction="props.totalAuction"
      :totalBidding="props.totalBidding"
      :totalWinner="props.totalWinner"
    />

    <OfferPriceBarChart />

    <Modal
      v-if="isOpen"
      @close="isOpen = false"
      title="ACT Ai ตรวจสอบโครงการเสี่ยงอย่างไร ?"
    />
  </div>
</template>

<script setup lang="ts">
import BarChartSection from './ฺBarChartSection.vue';

const title = ref('ความเสี่ยงทุจริต');
const selected = ref('งบประมาณ');
const isOpen = ref(false);

const props = defineProps<{
  auctionData: array;
  totalAuction: number;
  totalBidding: number;
  totalWinner: number;
}>();
</script>

<style scoped></style>
