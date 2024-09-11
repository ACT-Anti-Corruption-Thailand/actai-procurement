<template>
  <div
    class="bg-white p-5 rounded-xl w-full min-w-[300px] max-w-[370px] text-black text-left"
  >
    <p class="b1 font-bold mb-3 text-ellipsis line-clamp-2">
      {{ props.data.name }}
    </p>
    <div class="flex flex-wrap gap-1 b4">
      <div class="flex gap-1 items-center" v-if="props.data.province != ''">
        <div class="flex-1">
          <img src="../../public/src/images/pin.svg" alt="pin" />
        </div>
        <p>{{ props.data.province }}</p>
      </div>
      <div class="flex gap-1" v-if="props.data.year != ''">
        <div>
          <img src="../../public/src/images/calendar.svg" alt="calendar" />
        </div>
        <p>{{ props.data.year }}</p>
      </div>
      <div class="flex gap-1" v-if="props.data.owner != ''">
        <img src="../../public/src/images/owner.svg" alt="owner" />
        <p>{{ props.data.owner }}</p>
      </div>
      <div class="flex gap-1" v-if="props.data.no != ''">
        <img src="../../public/src/images/no.svg" alt="no" />
        <p>{{ props.data.no }}</p>
      </div>
    </div>

    <template v-if="index == 0">
      <div class="rounded-full bg-[#FFEFF0] p-1 w-fit flex gap-2 my-3">
        <img src="../../public/src/images/risk-flag.svg" alt="risk" />
        <p class="b4 text-[#EC1C24]">พบความเสี่ยงทุจริต</p>
      </div>
      <p class="b1">งบประมาณรวม 190,000,000,000 บาท</p></template
    >
    <template v-else-if="index == 1"
      ><p class="b1 text-[#EC1C24] mt-3">โครงการเสี่ยงทุจริต 10,000 (xx.x%)</p>
      <p class="b1">รวม 190,000 โครงการ</p>
      <p class="b1">งบประมาณรวม 190,000,000 บาท</p></template
    >
    <template v-else>
      <div class="rounded-full bg-[#FFEFF0] p-1 w-fit flex gap-2 my-3">
        <img src="../../public/src/images/risk-flag.svg" alt="pin" />
        <p class="b4 text-[#EC1C24]">ตรวจพบความน่าสนใจ</p>
      </div>
      <p class="b1">รวม 190,000 โครงการ</p>
      <p class="b1">วงเงินสัญญารวม 190,000,000 บาท</p></template
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
