<script setup lang="ts">
const props = defineProps<{
  title: string;
  data: object;
}>();

const maxVal = ref(0);
const grid = ref([]);

const chart = computed(() => {
  let data = [];

  if (props.title == 'งบประมาณ') {
    props.data.forEach((element) => {
      data.push({
        year: element.budgetYear.substring(2, 4),
        total: element.aggregateBy.budgetMoney,
      });
    });

    maxVal.value = Math.max(...data.map((o) => o.total));

    grid.value = [120, 100, 80, 60, 40, 20];
  } else if (props.title == 'ความเสี่ยงทุจริต') {
    props.data.forEach((element) => {
      data.push({
        year: element.budgetYear.substring(2, 4),
        hasCorruptionRiskProject: element.aggregateBy.hasCorruptionRiskProject,
        hasNoCorruptionRiskProject:
          element.aggregateBy.hasNoCorruptionRiskProject,
      });
    });

    maxVal.value = Math.max(
      ...data.map(
        (o) => o.hasCorruptionRiskProject + o.hasNoCorruptionRiskProject
      )
    );

    grid.value = [30, 20, 10];
  } else if (props.title == 'สถานะโครงการ') {
    props.data.forEach((element) => {
      data.push({
        year: element.budgetYear.substring(2, 4),
        completed: element.aggregateBy.projectStatus.completed,
        contracted: element.aggregateBy.projectStatus.contracted,
        inprogress: element.aggregateBy.projectStatus.inprogress,
        cancelContract: element.aggregateBy.projectStatus.cancelContract,
        cancelProject: element.aggregateBy.projectStatus.cancelProject,
      });
    });

    maxVal.value = Math.max(
      ...data.map(
        (o) =>
          o.completed +
          o.contracted +
          o.inprogress +
          o.cancelContract +
          o.cancelProject
      )
    );

    grid.value = [100, 80, 60, 40, 20];
  } else if (props.title == 'สถานะสัญญา') {
    props.data.forEach((element) => {
      data.push({
        year: element.budgetYear.substring(2, 4),
        delivered: element.aggregateBy.contractStatus.delivered,
        deliveredOnTime: element.aggregateBy.contractStatus.deliveredOnTime,
        deliveredLate: element.aggregateBy.contractStatus.deliveredLate,
        contracted: element.aggregateBy.contractStatus.contracted,
        inprogress: element.aggregateBy.contractStatus.inprogress,
        cancelContract: element.aggregateBy.contractStatus.cancelContract,
      });
    });

    // maxVal.value = Math.max(
    //   ...data.map(
    //     (o) =>
    //       o.delivered +
    //       o.deliveredOnTime +
    //       o.deliveredLate +
    //       o.contracted +
    //       o.inprogress +
    //       o.cancelContract
    //   )
    // );

    maxVal.value = 80;

    grid.value = [80, 60, 40, 20];
  } else {
    props.data.forEach((element) => {
      data.push({
        year: element.budgetYear.substring(2, 4),
        bidding: element.aggregateBy.resourcingMethod.bidding,
        internationalBidding:
          element.aggregateBy.resourcingMethod.internationalBidding,
        eBidding: element.aggregateBy.resourcingMethod.eBidding,
        eBiddingViaMarket:
          element.aggregateBy.resourcingMethod.eBiddingViaMarket,
        settlePrice: element.aggregateBy.resourcingMethod.settlePrice,
        checkPrice: element.aggregateBy.resourcingMethod.checkPrice,
        eMarket: element.aggregateBy.resourcingMethod.eMarket,
        specialMethod: element.aggregateBy.resourcingMethod.specialMethod,
        selective: element.aggregateBy.resourcingMethod.selective,
        specific: element.aggregateBy.resourcingMethod.specific,
      });
    });

    maxVal.value = 160;

    grid.value = [160, 140, 120, 100, 80, 60, 40, 20];
  }

  return data;
});

function compareNumbers(a, b) {
  return b - a;
}
</script>

<template>
  <div class="rounded-md flex flex-col-mb mb-3">
    <div
      class="p-7 bg-[#F5F5F5] rounded-t-md sm:rounded-t-none sm:rounded-l-md sm:w-1/3"
    >
      <h4 class="font-black">{{ props.title }}</h4>
    </div>
    <div
      class="p-7 bg-[#FFFFFF] rounded-b-md sm:rounded-b-none sm:rounded-r-md sm:w-2/3 relative"
    >
      <div class="flex flex-col gap-2 w-full h-80 justify-between">
        <div v-for="item in grid" class="pb-2 gap-2 flex flex-1">
          <p class="text-[#8E8E8E] b4">{{ item }}</p>
          <div class="w-full h-[1px] bg-[#F5F5F5] mt-2"></div>
        </div>
      </div>
      <div
        class="flex gap-2 w-[75%] sm:w-[90%] right-5 items-end h-80 absolute top-10"
      >
        <div
          v-for="item in chart"
          class="flex-1 h-full flex flex-col justify-end"
        >
          <template v-if="props.title == 'งบประมาณ'">
            <div
              :style="{ height: (item.total / maxVal) * 100 + '%' }"
              class="w-full bg-black max-h-72 min-h-[0.5px]"
            ></div
          ></template>
          <template v-else-if="props.title == 'ความเสี่ยงทุจริต'">
            <div
              :style="{
                height: (item.hasNoCorruptionRiskProject / maxVal) * 100 + '%',
              }"
              class="w-full bg-black max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.hasCorruptionRiskProject / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#EC1C24] max-h-72 min-h-[0.5px]"
            ></div
          ></template>
          <template v-else-if="props.title == 'สถานะโครงการ'">
            <div
              :style="{
                height: (item.completed / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#0F7979] max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.contracted / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#6DD5D5] max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.inprogress / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#DADADA] max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.cancelContract / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#FF8888] max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.cancelProject / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#FF5353] max-h-72 min-h-[0.5px]"
            ></div
          ></template>
          <template v-else-if="props.title == 'สถานะสัญญา'">
            <div
              :style="{
                height: (item.deliveredLate / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#054775] max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.delivered / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#0F7979] max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.deliveredOnTime / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#1AA8A8] max-h-72 min-h-[0.5px]"
            ></div>

            <div
              :style="{
                height: (item.contracted / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#6DD5D5] max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.inprogress / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#DADADA] max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.cancelContract / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#FF8888] max-h-72 min-h-[0.5px]"
            ></div
          ></template>
          <template v-else>
            <div
              :style="{
                height: (item.bidding / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#CE5700] max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.internationalBidding / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#F08C06] max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.deliveredOnTime / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#F8B60E] max-h-72 min-h-[0.5px]"
            ></div>

            <div
              :style="{
                height: (item.eBidding / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#F8B60E] max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.eBiddingViaMarket / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#FEEDAF] max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.settlePrice / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#6DD5D5] max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.checkPrice / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#2EA0DF] max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.eMarket / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#7051B4] max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.specialMethod / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#EF9CC4] max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.selective / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#D83D88] max-h-72 min-h-[0.5px]"
            ></div>
            <div
              :style="{
                height: (item.specific / maxVal) * 100 + '%',
              }"
              class="w-full bg-[#8A004B] max-h-72 min-h-[0.5px]"
            ></div
          ></template>

          <p class="text-center">'{{ item.year }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
