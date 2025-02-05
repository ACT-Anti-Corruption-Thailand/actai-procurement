<script setup lang="ts">
import type { Contractor } from '../../public/src/data/search_result';
import { isLoadingGovContractor } from '~/store/loading';
import { sortByGovContractor, sortOrderGovContractor } from '~/store/filter';
import qs from 'qs';
const route = useRoute();
const props = defineProps<{
  data: Contractor;
  filterListContractor: object;
  agencyName?: string;
}>();
const emit = defineEmits(['change']);
const page = ref(10);
const sort = ref('totalContractAmount');
const sortOrder = ref('desc');
const queryForDownload = ref('');
const filterList = ref('');

const searchText = ref('');

const searchResult = computed(() => {
  return props.data.searchResult;
});

const setParams = (type: string, val: string) => {
  const searchParams = new URLSearchParams();
  queryForDownload.value = '';

  if (type == 'sortBy') sort.value = val;
  else if (type == 'page') page.value = page.value == 0 ? 20 : page.value + val;
  // else if (type == 'filter') filterList.value = val;
  else if (type == 'sortOrder') sortOrder.value = val;

  searchParams.set('keyword', searchText.value);
  searchParams.set('sortBy', type == 'sortBy' ? val : sort.value);
  searchParams.set('sortOrder', type == 'sortOrder' ? val : sortOrder.value);
  searchParams.set('pageSize', type == 'page' ? page.value : 10);

  queryForDownload.value = '?' + searchParams.toString() + filterList.value;
  emit('change', '&' + searchParams.toString() + filterList.value);
};

onBeforeMount(() => {
  queryForDownload.value = '?' + qs.stringify(route.query);
  searchText.value = route.query.keyword || '';

  if (route.hash.includes('contractor')) {
    sort.value = sortByGovContractor.value;
    sortOrder.value = sortOrderGovContractor.value;
  } else {
    queryForDownload.value = '';
  }
});
</script>

<template>
  <h4 class="font-bold text-white mb-5">ผู้รับจ้างที่ได้งาน</h4>

  <div class="bg-white rounded-10 gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <div class="flex items-end gap-2">
        <div class="flex-1">
          <p class="b2 text-[#7F7F7F]">ตัวกรอง</p>
          <div class="relative">
            <input
              @change="setParams('keyword', searchText)"
              v-model="searchText"
              type="text"
              class="input-text h-full"
              placeholder="กรองด้วยชื่อผู้รับจ้าง"
            />
            <SearchIcon
              color="#000000"
              class="absolute inset-y-0 my-auto left-2"
            />
          </div>
        </div>
        <!-- <FilterPopupGovernment
          section="ผู้รับจ้างที่ได้งาน"
          @change="setParams"
          :list="props.filterListContractor"
        /> -->
      </div>
    </div>
    <div class="p-5 rounded-b-md w-full">
      <div class="flex items-center justify-between mb-3">
        <h5 class="font-bold w-3/5">
          ทั้งหมด {{ props.data?.pagination?.totalItem?.toLocaleString() }} ราย
          วงเงินสัญญา

          <span v-if="props.data?.summary != null">
            {{ setNumber(props.data?.summary?.totalContractMoney) }}</span
          >
          บาท
        </h5>
        <DownloadAndCopy
          isShowCopyBtn
          section="company"
          :filterList="queryForDownload"
          :keyword="props.agencyName"
        />
      </div>

      <SortBy
        text="เรียงตาม"
        :list="[
          {
            name: 'วงเงินสัญญา',
            value: 'totalContractAmount',
          },
          {
            name: 'จำนวนโครงการ',
            value: 'totalProject',
          },
        ]"
        class="mb-3"
        @change="setParams"
        @sortBy="setParams"
        :selectedSortBy="sortByGovContractor"
        :selectedSortOrder="sortOrderGovContractor"
      />

      <template v-if="isLoadingGovContractor">
        <div class="p-5 b1 text-center">Loading...</div>
      </template>
      <div class="overflow-auto" v-else>
        <table class="table-auto text-left table-wrapper">
          <thead class="bg-[#8E8E8E] b3 text-white">
            <tr>
              <th>ลำดับ</th>
              <th>ผู้รับจ้าง</th>
              <th class="text-right w-24">จำนวนโครงการ</th>
              <th class="text-right w-24">วงเงินสัญญารวม</th>
            </tr>
          </thead>
          <tbody class="b1">
            <tr v-for="(item, i) in searchResult" :key="i">
              <td>{{ i + 1 }}</td>
              <td class="font-bold">
                <a
                  :href="'/contractor/' + item.companyId"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-[#0B5C90]"
                >
                  {{ item.companyName }}
                </a>
              </td>
              <td class="text-right">
                {{ item.totalProject.toLocaleString() }}
              </td>
              <td class="text-right">
                {{ setNumber(item.totalContractMoney) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="b2 text-center my-3">
        {{ props.data?.searchResult?.length }} /
        {{ props.data?.pagination?.totalItem?.toLocaleString() }}
      </p>

      <div class="text-center mt-3">
        <LoadMore
          v-if="
            props.data?.searchResult?.length < props.data?.pagination?.totalItem
          "
          @click="setParams('page', 10)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-text {
  padding-left: 30px;
  background: white;
}
</style>
