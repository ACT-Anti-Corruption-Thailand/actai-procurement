<template>
  <div
    class="bg-white p-5 rounded-xl w-full min-w-[300px] max-w-[370px] text-black text-left"
  >
    <p class="b1 font-bold mb-3 text-ellipsis line-clamp-2">
      {{ props.data.name }}
    </p>
    <ProjectIconGuide :data="data" color="#5E5E5E" />

    <template v-if="index == 0">
      <div class="rounded-full bg-[#FFEFF0] p-1 w-fit flex gap-2 my-3">
        <img src="../../public/src/images/risk-flag.svg" alt="risk" />
        <p class="b4 text-[#EC1C24]">พบความเสี่ยงทุจริต</p>
      </div>
      <p class="b1 text-[#5E5E5E]">งบประมาณรวม 190,000,000,000 บาท</p></template
    >
    <template v-else-if="index == 1"
      ><p class="b1 text-[#EC1C24] mt-3">
        โครงการเสี่ยงทุจริต 27 โครงการ (12.2%)
      </p>
      <p class="b1 text-[#5E5E5E]">รวม 222 โครงการ</p>
      <p class="b1 text-[#5E5E5E]">งบประมาณรวม 340,000,000 บาท</p></template
    >
    <template v-else>
      <div class="rounded-full bg-[#FFEFF0] p-1 w-fit flex gap-2 my-3">
        <img src="../../public/src/images/risk-flag.svg" alt="pin" />
        <p class="b4 text-[#EC1C24]">ตรวจพบความน่าสนใจ</p>
      </div>
      <p class="b1 text-[#5E5E5E]">รวม 84 โครงการ</p>
      <p class="b1 text-[#5E5E5E]">วงเงินสัญญารวม 320,000,000 บาท</p></template
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: Object;
  index: number;
}>();
</script>

<style lang="scss" scoped></style>
