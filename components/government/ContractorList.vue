<script setup lang="ts">
import type { Contractor } from '../../public/src/data/search_result';

const props = defineProps<{
  data: Contractor;
}>();
const emit = defineEmits(['change']);
const pageNum = ref(1);

const setDate = (date) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return new Date(date).toLocaleDateString('th-TH', options);
};

const searchText = ref('');

const searchResult = computed(() => {
  return searchText.value != ''
    ? props.data.searchResult.filter((x) =>
        x.companyName.includes(searchText.value)
      )
    : props.data.searchResult;
});

const setFilter = (isChangePage) => {
  if (isChangePage) pageNum.value++;

  // let filter = {
  //   hasCorruptionRisk: isRisk.value,
  // };

  // var str = qs.stringify({ filter });

  emit('change', '&' + '', pageNum.value);
};
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
              v-model="searchText"
              type="text"
              class="input-text h-full"
              placeholder="กรองด้วยชื่อรายการ/ผู้เข้าเสนอราคา/เลขทะเบียนนิติบุคคล"
            />
            <SearchIcon
              color="#000000"
              class="absolute inset-y-0 my-auto left-2"
            />
          </div>
        </div>
        <!-- <FilterPopupGovernment section="ผู้รับจ้างที่ได้งาน" /> -->
      </div>
    </div>
    <div class="p-5 rounded-b-md w-full">
      <div class="flex items-center justify-between mb-3">
        <h5 class="font-bold w-3/5">
          ทั้งหมด {{ props.data?.pagination.totalItem.toLocaleString() }} ราย
          วงเงินสัญญา
          {{ props.data?.summary?.totalContractMoney.toLocaleString() }} บาท
        </h5>
        <DownloadAndCopy section="contractor" filterList="" />
      </div>

      <!-- <SortBy
        text="เรียงตาม"
        :list="['วงเงินสัญญา', 'จำนวนโครงการ']"
        class="mb-3"
      /> -->

      <div class="overflow-auto">
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
                {{ item.totalContractMoney.toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="text-center mt-3">
        <LoadMore
          v-if="
            props.data?.searchResult.length < props.data?.pagination?.totalItem
          "
          @click="setFilter(true)"
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
