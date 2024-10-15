<template>
  <div
    class="btn-dark-1 p-5 rounded-10 w-full min-w-[300px] max-w-[370px] text-black text-left"
  >
    <p class="b1 font-bold mb-3 text-ellipsis line-clamp-2" v-if="index == '0'">
      {{ props.data?.projectName }}
    </p>
    <p
      class="b1 font-bold mb-3 text-ellipsis line-clamp-2"
      v-else-if="index == '1'"
    >
      {{ props.data?.agencyName }}
    </p>
    <p class="b1 font-bold mb-3 text-ellipsis line-clamp-2" v-else>
      {{ props.data?.companyName }}
    </p>

    <ProjectIconGuide
      :data="{
        province: props.data?.province,
        year: props.data?.budgetYear,
        owner: props.data?.agencyName,
        no: props.data?.projectId,
      }"
      color="#5E5E5E"
      v-if="index == '0'"
    />
    <ProjectIconGuide
      :data="{
        province: props.data?.province,
      }"
      color="#5E5E5E"
      v-else-if="index == '1'"
    />
    <ProjectIconGuide
      :data="{
        province: props.data?.province,
        entityNo: props.data?.companyId,
      }"
      color="#5E5E5E"
      v-else
    />

    <template v-if="index == 0">
      <ProjectTag
        text="พบความเสี่ยงทุจริต"
        v-if="props.data?.hasCorruptionRisk"
      />
      <p class="b1 text-[#5E5E5E]" v-if="props.data?.totalBudget != null">
        งบประมาณรวม {{ props.data?.totalBudget.toLocaleString() }} บาท
      </p></template
    >
    <template v-else-if="index == 1"
      ><p
        class="b1 text-[#EC1C24] mt-3"
        v-if="props.data?.totalProjectHasCorruptionRisk != null"
      >
        โครงการเสี่ยงทุจริต
        {{ props.data?.totalProjectHasCorruptionRisk.toLocaleString() }} โครงการ
        (12.2%)
      </p>
      <p class="b1 text-[#5E5E5E]" v-if="props.data?.totalProject != null">
        รวม {{ props.data?.totalProject.toLocaleString() }} โครงการ
      </p>
      <p class="b1 text-[#5E5E5E]" v-if="props.data?.totalBudgetMoney != null">
        งบประมาณรวม {{ props.data?.totalBudgetMoney.toLocaleString() }} บาท
      </p></template
    >
    <template v-else>
      <ProjectTag
        text="ตรวจพบความน่าสนใจ"
        v-if="props.data?.hasCorruptionRisk"
      />
      <p class="b1 text-[#5E5E5E]" v-if="props.data?.totalProject != null">
        รวม {{ props.data?.totalProject.toLocaleString() }} โครงการ
      </p>
      <p
        class="b1 text-[#5E5E5E]"
        v-if="props.data?.totalContractMoney != null"
      >
        วงเงินสัญญารวม {{ props.data?.totalContractMoney.toLocaleString() }} บาท
      </p></template
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
