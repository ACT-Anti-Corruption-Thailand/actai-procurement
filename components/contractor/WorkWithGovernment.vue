<template>
  <div>
    <h4 class="font-bold text-white mb-5">ภาพรวมโครงการที่จัดทำ</h4>

    <BarChartSection />

    <!-- <div class="rounded-10 flex flex-col-mb mb-3">
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
    </div> -->

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
