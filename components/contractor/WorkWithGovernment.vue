<template>
  <div>
    <h4 class="font-bold text-white mb-5">การรับงานกับหน่วยงานรัฐ</h4>

    <ChartDataTotalProject />

    <ChartDataTotalContract />

    <MapSectionCompany />

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
const isOpen = ref(false);

const props = defineProps<{
  auctionData: unknown[];
  totalAuction: number;
  totalBidding: number;
  totalWinner: number;
}>();
</script>

<style scoped></style>
