<script setup lang="ts">
import type { Contractor } from '../../public/src/data/search_result';

const props = defineProps<{
  contractorList?: Contractor;
}>();

function highlight(title: string, text: string) {
  var innerHTML = title;
  const urlParams = decodeURI(window.location.href).split('=')[1];
  var index = innerHTML.indexOf(urlParams);

  if (index >= 0) {
    innerHTML =
      innerHTML.substring(0, index) +
      "<span class='text-[#74060A]'>" +
      innerHTML.substring(index, index + urlParams.length) +
      '</span>' +
      innerHTML.substring(index + urlParams.length);
  }
  return innerHTML;
}

const searchText = ref('');

onMounted(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  searchText.value = urlParams.get('search');
});
</script>

<template>
  <div v-if="props.contractorList?.pagination.totalItem == 0">
    <h5 class="text-center text-[#8E8E8E]">ไม่พบผู้รับจ้างที่มีคำค้นนี้</h5>
  </div>
  <div class="mx-auto max-w-6xl px-4" v-else>
    <div class="flex items-center justify-between">
      <h4 class="font-bold">
        {{ props.contractorList?.pagination?.totalItem }} ผู้รับจ้าง
      </h4>
      <!-- <FilterPopupResult section="ผู้รับจ้าง" /> -->
    </div>

    <!-- <div class="flex items-center justify-between my-3 sm:my-5">
      <div class="flex gap-2 items-center relative">
        <SortBy
          text="เรียงตาม"
          :list="[
            'ความใกล้เคียงคำค้น',
            'วงเงินสัญญารวม',
            'จำนวนโครงการที่ได้งาน',
          ]"
        />
      </div>
      <DownloadAndCopy />
    </div> -->

    <ProjectIconGuide
      :data="{
        province: '= ที่ตั้ง',
        entityNo: '= เลขทะเบียนนิติบุคคล',
      }"
      color="#8E8E8E"
    />

    <div class="my-3">
      <a
        v-for="item in props.contractorList?.searchResult"
        class="flex justify-between p-2.5 sm:p-5 rounded-10 btn-light-4"
        :key="'contractor-' + item.companyId"
        target="_blank"
        :href="'/contractor/' + item.companyId"
      >
        <div>
          <p
            class="b1 font-bold"
            v-html="highlight(item?.companyName, keyword)"
          ></p>
          <ProjectIconGuide
            :data="{
              province: item.companyName,
            }"
            color="#8E8E8E"
          />
          <ProjectTag text="ตรวจพบความน่าสนใจ" v-if="item.hasCorruptionRisk" />
        </div>
        <div class="flex sm:gap-10 text-right flex-col-mb">
          <div>
            <p class="b4 text-[#5E5E5E]">โครงการที่ได้งาน</p>
            <p class="b1">{{ item?.totalProject.toLocaleString() }}</p>
          </div>
          <div>
            <p class="b4 text-[#5E5E5E]">วงเงินสัญญารวม (บาท)</p>
            <p class="b1">{{ item?.totalContractMoney.toLocaleString() }}</p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
