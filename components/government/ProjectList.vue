<script setup lang="ts">
const isOpen = ref(false);

import type { Project } from '../../public/src/data/search_result';
import qs from 'qs';

const props = defineProps<{
  data: Project;
}>();
const emit = defineEmits(['change']);

const isRisk = ref(false);
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
  let data = props.data.searchResult;

  return searchText.value != ''
    ? data.filter((x) => x.projectName.includes(searchText.value))
    : data;
});

const setFilter = (isChangePage) => {
  if (isChangePage) pageNum.value++;

  let filter = {
    hasCorruptionRisk: isRisk.value,
  };

  var str = qs.stringify({ filter });
  emit('change', '&' + str, pageNum.value);
};

watch(isRisk, (val) => {
  pageNum.value = 1;

  nextTick(() => {
    setFilter(false);
  });
});
</script>

<template>
  <h4 class="font-bold text-white mb-5">รายชื่อโครงการที่จัดทำ</h4>

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
              placeholder="กรองด้วยชื่อโครงการ"
            />
            <SearchIcon
              color="#000000"
              class="absolute inset-y-0 my-auto left-2"
            />
          </div>
        </div>
        <!-- <FilterPopupGovernment section="รายชื่อโครงการที่จัดทำ" /> -->
      </div>

      <div class="mt-3">
        <input
          type="checkbox"
          name=""
          id="isRisk"
          v-model="isRisk"
          class="text-black ring-0"
        />
        <label for="isRisk" class="text-[#EC1C24] ml-1 b4"
          >ดูเฉพาะโครงการที่พบความเสี่ยงทุจริต</label
        >
      </div>
    </div>
    <div class="p-5 rounded-b-md w-full">
      <div class="flex items-center justify-between mb-3 gap-2">
        <h5 class="font-bold w-3/5">
          ทั้งหมด
          {{ props.data?.pagination?.totalItem.toLocaleString() }} โครงการ
          วงเงินสัญญา
          {{ props.data?.summary?.totalContractMoney.toLocaleString() }} บาท
        </h5>
        <DownloadAndCopy section="government" filterList="" />
      </div>

      <!-- <SortBy
        text="เรียงตาม"
        :list="['วันที่ประกาศโครงการ', 'วงเงินสัญญา']"
        class="mb-3"
      /> -->

      <div class="overflow-auto">
        <table class="table-auto text-left w-[800px] lg:w-full">
          <thead class="bg-[#8E8E8E] b3 text-white">
            <tr>
              <th class="w-1/3">
                ชื่อโครงการ
                <ProjectIconGuide
                  :data="{
                    province: '= ที่ตั้ง',
                    no: '= เลขที่โครงการ',
                  }"
                  color="#DADADA"
                />
              </th>
              <th>วันที่ประกาศโครงการ</th>
              <th class="w-1/6">สถานะโครงการ</th>
              <th class="w-1/4">วิธีการจัดหา</th>
              <th class="w-1/4">
                ผู้รับจ้างที่ได้งาน
                <info
                  color="#FFFFFF"
                  class="inline cursor-pointer"
                  @click="isOpen = true"
                />
              </th>
              <th v-if="props.data?.totalBudgetMoney != null">
                วงเงินสัญญารวม <br />งบประมาณรวม
              </th>
            </tr>
          </thead>
          <tbody class="b1">
            <tr v-for="(item, i) in searchResult" :key="i">
              <td>
                <a
                  :href="'/project/' + item.projectId"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-[#0B5C90] font-bold"
                >
                  {{ item.projectName }}
                </a>
                <ProjectIconGuide
                  :data="{
                    province: item.province,
                    no: item.projectId,
                  }"
                  color="#7F7F7F"
                />
                <ProjectTag
                  text="พบความเสี่ยงทุจริต"
                  v-if="item.hasCorruptionRisk"
                />
              </td>
              <td>11/10/2567</td>
              <td
                :class="{
                  'bg-[#DADADA]': item.projectStatus == 'ระหว่างดำเนินการ',
                  'bg-[#6DD5D5]': item.projectStatus == 'จัดทำสัญญา/PO แล้ว',
                  'bg-[#0F7979] text-white':
                    item.projectStatus == 'แล้วเสร็จตามสัญญา',
                  'bg-[#EC1C24] text-white':
                    item.projectStatus == 'สิ้นสุดสัญญา',
                  'bg-[#FF8888]': item.projectStatus == 'ยกเลิกสัญญา',
                  'bg-[#FF5353]': item.projectStatus == 'ยกเลิกโครงการ',
                  'bg-[#FFCECE]': item.projectStatus == 'ยกเลิกประกาศเชิญชวน',
                }"
              >
                {{ item.projectStatus }}
              </td>
              <td>
                {{
                  item.resourcingMethod == null ? '-' : item.resourcingMethod
                }}
              </td>
              <td>{{ item.agencyName }}</td>
              <td v-if="props.data?.totalBudgetMoney != null">
                <b> {{ props.data?.totalBudgetMoney.toLocaleString() }}</b>
                <br />{{ props.data?.totalContractMoney.toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="text-center mt-3">
          <LoadMore
            v-if="
              props.data?.searchResult.length <
              props.data?.pagination?.totalItem
            "
            @click="setFilter(true)"
          />
        </div>
      </div>

      <Modal
        v-if="isOpen"
        @close="isOpen = false"
        title="ผู้รับจ้างที่ได้งาน"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-text {
  padding-left: 30px;
  background: white;
}
</style>
