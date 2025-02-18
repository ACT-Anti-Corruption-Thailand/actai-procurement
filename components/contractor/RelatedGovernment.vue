<script setup lang="ts">
import type { Government } from '../../public/src/data/search_result';
import { sortByContractorGov, sortOrderContractorGov } from '~/store/filter';
import { isLoadingContractorGov } from '~/store/loading';
import qs from 'qs';

const props = defineProps<{
  data: Government;
  isLoading: boolean;
  filterListGovernment: object;
}>();

const route = useRoute();
const emit = defineEmits(['change']);
const page = ref(10);
const sort = ref('totalContractAmount');
const sortOrder = ref('desc');
const filterList = ref('');
const queryForDownload = ref('');
const searchText = ref('');
const companyId = ref('');

const setParams = (type: string, val: string) => {
  const searchParams = new URLSearchParams();
  queryForDownload.value = '';

  if (type == 'sortBy') sort.value = val;
  else if (type == 'page') page.value = page.value == 0 ? 20 : page.value + val;
  else if (type == 'filter') filterList.value = val;
  else if (type == 'sortOrder') sortOrder.value = val;

  searchParams.set('keyword', searchText.value);
  searchParams.set('sortBy', type == 'sortBy' ? val : sort.value);
  searchParams.set('sortOrder', type == 'sortOrder' ? val : sortOrder.value);
  searchParams.set('pageSize', type == 'page' ? page.value : 10);

  queryForDownload.value =
    '?' + searchParams.toString() + filterList.value + '&' + companyId.value;

  emit(
    'change',
    '&' + searchParams.toString() + filterList.value + '&' + companyId.value
  );
};

onBeforeMount(() => {
  let filter = {
    companyId: route.path.split('/')[2],
  };

  companyId.value = qs.stringify({ filter });

  queryForDownload.value =
    '?' + qs.stringify(route.query) + '&' + companyId.value;

  searchText.value = route.query.keyword || '';

  if (route.hash.includes('government')) {
    sort.value = sortByContractorGov.value;
    sortOrder.value = sortOrderContractorGov.value;
  } else {
    // queryForDownload.value = '';
  }
});
</script>

<template>
  <h4 class="font-bold text-white mb-5">หน่วยงานรัฐที่เป็นผู้ว่าจ้าง</h4>

  <div class="bg-white rounded-10 gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <div class="flex items-end gap-2">
        <div class="flex-1">
          <p class="b2 text-[#7F7F7F]">ค้นหาหน่วยงานรัฐ</p>
          <div class="relative">
            <input
              @change="setParams('keyword', searchText)"
              v-model="searchText"
              type="text"
              class="input-text h-full"
              placeholder="พิมพ์ชื่อหน่วยงาน"
            />
            <SearchIcon
              color="#000000"
              class="absolute inset-y-0 my-auto left-2"
            />
          </div>
        </div>
        <FilterPopupContractor
          section="หน่วยงานรัฐที่เป็นผู้ว่าจ้าง"
          @change="setParams"
          :list="props.filterListGovernment"
        />
      </div>
    </div>
    <div class="p-5 rounded-b-md w-full">
      <div class="flex items-center justify-between mb-3 gap-2">
        <h5 class="font-bold w-3/5">
          ทั้งหมด
          {{ props.data?.pagination?.totalItem.toLocaleString() }} หน่วยงาน
          วงเงินสัญญา
          <span v-if="props.data?.summary != null">
            {{ setNumber(props.data?.summary?.totalContractMoney) }}</span
          >
          บาท
        </h5>
        <DownloadAndCopy
          section="agency"
          :filterList="queryForDownload"
          isShowCopyBtn
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
        :selectedSortBy="sortByContractorGov"
        :selectedSortOrder="sortOrderContractorGov"
      />

      <template v-if="isLoadingContractorGov">
        <div class="p-5 b1 text-center">Loading...</div>
      </template>
      <template v-else>
        <div class="overflow-auto">
          <table class="table-auto text-left table-wrapper">
            <thead class="bg-[#8E8E8E] b3 text-white">
              <tr>
                <th>ลำดับ</th>
                <th>ผู้ว่าจ้าง</th>
                <th class="text-right">จำนวนโครงการ</th>
                <th class="text-right">วงเงินสัญญารวม</th>
              </tr>
            </thead>
            <tbody class="b1">
              <tr v-for="(item, i) in props.data?.searchResult" :key="i">
                <td class="text-[#7F7F7F]">{{ i + 1 }}</td>
                <td class="font-bold">
                  <a
                    :href="'/government/' + item.agencyId"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-[#0B5C90]"
                  >
                    {{ item.agencyName }}
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
      </template>

      <p class="b2 text-center my-3">
        {{ props.data?.searchResult?.length }} /
        {{ props.data?.pagination?.totalItem.toLocaleString() }}
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
