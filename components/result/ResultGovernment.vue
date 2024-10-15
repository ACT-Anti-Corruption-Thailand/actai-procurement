<script setup lang="ts">
import type { Government } from '../../public/src/data/search_result';

const props = defineProps<{
  govList?: Government;
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
const keyword = ref('');

const emit = defineEmits(['search']);

const sort = ref('');
const page = ref(0);

const setParams = (type: string, val: string) => {
  const searchParams = new URLSearchParams();

  if (type == 'sortBy') sort.value = val;
  else if (type == 'page') page.value = page.value == 0 ? 20 : page.value + val;

  searchParams.set('sortBy', type == 'sortBy' ? val : 'relevanceScore');
  searchParams.set('sortOrder', type == 'sortOrder' ? val : 'desc');
  searchParams.set('pageSize', type == 'page' ? page.value : 10);

  emit('search', '&' + searchParams.toString(), 'details');
};

onMounted(() => {
  keyword.value = localStorage.getItem('keyword');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  searchText.value = urlParams.get('search');
});
</script>

<template>
  <div v-if="props.govList?.pagination.totalItem == 0" class="pb-7">
    <h5 class="text-center text-[#8E8E8E]">ไม่พบหน่วยงานรัฐที่มีคำค้นนี้</h5>
  </div>

  <div class="mx-auto max-w-6xl px-4" v-else>
    <div class="flex items-center justify-between">
      <h4 class="font-bold">
        {{ props.govList?.pagination?.totalItem }} หน่วยงานรัฐ
      </h4>
      <FilterPopupResult section="หน่วยงานรัฐ" />
    </div>

    <div class="flex items-center justify-between my-3 sm:my-5">
      <div class="flex gap-2 items-center relative">
        <SortBy
          :list="[
            {
              name: 'ความใกล้เคียงคำค้น',
              value: 'relevanceScore',
            },
            {
              name: 'งบประมาณรวม',
              value: 'budgetMoney',
            },
            {
              name: 'จำนวนโครงการทั้งหมด',
              value: 'totalProject',
            },
            {
              name: 'จำนวนโครงการเสี่ยงทุจริต',
              value: 'totalProjectHasCorruptionRisk',
            },
            {
              name: '% โครงการเสี่ยงทุจริตจากทั้งหมด',
              value: 'percentageProjectHasCorruptionRisk',
            },
          ]"
          text="เรียงตาม"
          @change="setParams"
          @sortBy="setParams"
        />
      </div>
      <!-- <DownloadAndCopy /> -->
    </div>

    <ProjectIconGuide
      :data="{
        province: '= ที่ตั้ง',
      }"
      color="#8E8E8E"
    />

    <div class="my-3">
      <a
        v-for="item in props.govList?.searchResult"
        class="flex justify-between p-2.5 sm:p-5 rounded-10 btn-light-4"
        :key="'gov-' + item.agencyId"
        target="_blank"
        :href="'/government/' + item.agencyId"
      >
        <div>
          <p
            class="b1 font-bold"
            v-html="highlight(item?.agencyName, keyword)"
          ></p>
          <ProjectIconGuide
            :data="{
              province: item.province,
            }"
            color="#8E8E8E"
          />
        </div>
        <div class="flex sm:gap-10 text-right flex-col-mb">
          <div>
            <p class="b4 text-[#5E5E5E]">โครงการทั้งหมด</p>
            <p class="b1">{{ item?.totalProject.toLocaleString() }}</p>
          </div>
          <div class="text-[#EC1C24]">
            <p class="b4 text-[#EC1C2460]">โครงการเสี่ยงทุจริต</p>
            <p class="b1">
              {{ item?.totalProjectHasCorruptionRisk.toLocaleString() }}
              ({{
                item?.totalProject == 0
                  ? 0
                  : (item?.totalProjectHasCorruptionRisk / item?.totalProject) *
                    100
              }}%)
            </p>
          </div>
          <div>
            <p class="b4 text-[#5E5E5E]">งบประมาณรวม (บาท)</p>
            <p class="b1">
              {{ item?.totalBudgetMoney.toLocaleString() }}
            </p>
          </div>
        </div>
      </a>

      <div class="text-center">
        <button
          v-if="
            props.govList?.searchResult.length <
            props.govList?.pagination?.totalItem
          "
          class="border btn-light-3 link-1 p-2.5 w-32 rounded-10"
          @click="setParams('page', 10)"
        >
          โหลดเพิ่ม
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
