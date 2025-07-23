<script setup lang="ts">
import type { Project } from '../../public/src/data/search_result';
import type { FilterListProject } from '~/models/data';
import qs from 'qs';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { isLoadingContractorProject } from '~/store/loading';
import {
  sortByContractorProject,
  sortOrderContractorProject,
} from '~/store/filter';

const props = defineProps<{
  data: Project;
  isLoading: boolean;
  filterListProject: FilterListProject;
}>();
const emit = defineEmits(['change']);

const route = useRoute();
const featureFlags = useFeatureFlags()
const page = ref(10);
const sort = ref('announcementDate');
const sortOrder = ref('desc');
const filterList = ref('');
const queryForDownload = ref('');
const companyId = ref('');
let searchParams = new URLSearchParams();

const searchText = ref('');

const setParams = (type: string, val: string) => {
  queryForDownload.value = '';

  if (type == 'sortBy') sort.value = val;
  else if (type == 'page') page.value = page.value == 0 ? 20 : page.value + val;
  else if (type == 'filter')
    filterList.value = val != '' ? val : '&' + companyId.value;
  else if (type == 'sortOrder') sortOrder.value = val;

  searchParams.set('keyword', searchText.value);
  searchParams.set('sortBy', type == 'sortBy' ? val : sort.value);
  searchParams.set('sortOrder', type == 'sortOrder' ? val : sortOrder.value);
  searchParams.set('pageSize', type == 'page' ? page.value : 10);

  queryForDownload.value =
    '?' + searchParams.toString() + filterList.value + companyId.value;
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

  if (route.hash.includes('project')) {
    sort.value = sortByContractorProject.value;
    sortOrder.value = sortOrderContractorProject.value;
  } else {
    // queryForDownload.value = '';
  }
});
</script>

<template>
  <h4 class="font-bold text-white mb-5">รายชื่อโครงการที่เกี่ยวข้อง</h4>

  <div class="bg-white rounded-10 gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <div class="flex items-end gap-2">
        <div class="flex-1">
          <p class="b2 text-[#7F7F7F]">ค้นหาโครงการ</p>
          <div class="relative">
            <input
              @change="setParams('keyword', searchText)"
              v-model="searchText"
              type="text"
              class="input-text h-full"
              placeholder="พิมพ์คำในชื่อหรือเลขที่โครงการ"
            />
            <SearchIcon
              color="#000000"
              class="absolute inset-y-0 my-auto left-2"
            />
          </div>
        </div>
        <FilterPopupContractor
          section="รายชื่อโครงการที่เกี่ยวข้อง"
          @change="setParams"
          :list="props.filterListProject"
        />
      </div>
    </div>
    <div class="p-5 rounded-b-md w-full">
      <div class="flex items-center justify-between mb-3 gap-2">
        <h5 class="font-black w-3/5">
          ทั้งหมด
          {{ props.data?.pagination?.totalItem.toLocaleString() }} โครงการ
          วงเงินสัญญา

          <span v-if="props.data?.summary != null">
            {{ setNumber(props.data?.summary?.totalContractMoney) }}</span
          >
          บาท
        </h5>
        <DownloadAndCopy
          section="project"
          :filterList="queryForDownload"
          isShowCopyBtn
        />
      </div>

      <SortBy
        text="เรียงตาม"
        :list="[
          {
            name: 'วันที่ประกาศโครงการ',
            value: 'announcementDate',
          },
          {
            name: 'วงเงินสัญญา',
            value: 'totalContractAmount',
          },
        ]"
        class="mb-3"
        @change="setParams"
        @sortBy="setParams"
        :selectedSortBy="sortByContractorProject"
        :selectedSortOrder="sortOrderContractorProject"
      />

      <template v-if="isLoadingContractorProject">
        <div class="p-5 b1 text-center">Loading...</div>
      </template>
      <template v-else>
        <div class="overflow-auto">
          <table class="table-auto text-left table-wrapper">
            <thead class="bg-[#8E8E8E] b3 text-white">
              <tr>
                <th>
                  ชื่อโครงการ<ProjectIconGuide
                    :data="{
                      province: '= ที่ตั้ง',
                      no: '= เลขที่โครงการ',
                    }"
                    color="#DADADA"
                  />
                </th>
                <th>วันที่ประกาศโครงการ</th>
                <th class="w-20">สถานะ</th>
                <th class="w-20">วิธีการจัดหา</th>
                <th class="w-20">หน่วยงานรัฐ</th>
                <th class="w-20">ผู้ร่วมประมูล</th>
                <th class="w-20">ผู้ชนะ</th>
                <th>
                  วงเงินสัญญารวมของโครงการ <br /><span class="text-[#DADADA]"
                    >งบประมาณรวม</span
                  >
                </th>
              </tr>
            </thead>
            <tbody class="b1">
              <tr v-for="(item, i) in props.data.searchResult" :key="i">
                <td>
                  <a
                    :href="`/project/${item.projectId}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-[#0B5C90]"
                  >
                    <b>{{ item.projectName }}</b></a
                  >
                  <ProjectIconGuide
                    :data="{
                      province: item.province,
                      no: item.projectId,
                    }"
                    color="#7F7F7F"
                  />
                  <ProjectTag
                    text="พบความเสี่ยงทุจริต"
                    v-if="featureFlags?.SUSPICIOUS_LABEL && item.hasCorruptionRisk"
                  />
                </td>
                <td>{{ setDate(item.announcementDate) }}</td>
                <td
                  :class="{
                    'bg-[#FFCECE] ':
                      item.projectStatus == 'ยกเลิกประกาศเชิญชวน',
                    'bg-[#0F7979] text-white':
                      item.projectStatus == 'แล้วเสร็จตามสัญญา',
                    'bg-[#FF5353] ': item.projectStatus == 'ยกเลิกโครงการ',
                    'bg-[#6DD5D5]': item.projectStatus == 'จัดทำสัญญา/PO แล้ว',
                    'bg-[#DADADA]': item.projectStatus == 'ระหว่างดำเนินการ',
                    'bg-[#FF8888] ': item.projectStatus == 'ยกเลิกสัญญา',
                    'bg-[#EC1C24] ': item.projectStatus == 'สิ้นสุดสัญญา',
                  }"
                >
                  {{ item.projectStatus }}
                </td>
                <td>
                  {{
                    item.resourcingMethod == null ? '-' : item.resourcingMethod
                  }}
                </td>
                <td>
                  <a
                    v-if="item.agencyName"
                    target="_blank"
                    :href="`/government/${item.agencyId}`"
                    class="hover:text-[#0B5C90]"
                    >{{ item.agencyName }}</a
                  >

                  <p v-else>-</p>
                </td>

                <td>
                  <template v-if="item.bidder?.length > 0">
                    <p>1. {{ item.bidder[0] }}</p>
                    <Disclosure
                      v-if="item.bidder?.length > 1"
                      v-slot="{ open }"
                    >
                      <DisclosurePanel>
                        <p v-for="(data, i) in item.bidder?.slice(1)">
                          {{ i + 2 }}. {{ data }}
                        </p>
                      </DisclosurePanel>
                      <DisclosureButton class="b4 text-[#0B5C90] text-left">
                        {{
                          open
                            ? ' ..ดูน้อยลง'
                            : `..ดูเพิ่ม (${item.bidder?.length - 1} องค์กร)`
                        }}
                      </DisclosureButton>
                    </Disclosure></template
                  >

                  <p v-else>-</p>
                </td>

                <td>
                  <template v-if="item.contractors?.length > 0">
                    <a
                      target="_blank"
                      class="b1 hover:text-[#0B5C90] block"
                      :href="`/contractor/${item.contractors[0].id}`"
                      :class="{
                        'pointer-events-none': item.contractors[0].id
                          ?.toLowerCase()
                          .includes('x'),
                      }"
                      >1. {{ item.contractors[0].name }}</a
                    >
                    <Disclosure
                      v-if="item.contractors?.length > 1"
                      v-slot="{ open }"
                    >
                      <DisclosurePanel>
                        <a
                          target="_blank"
                          class="b1 hover:text-[#0B5C90] block"
                          :href="`/contractor/${data.id}`"
                          :class="{
                            'pointer-events-none': data.id
                              ?.toLowerCase()
                              .includes('x'),
                          }"
                          v-for="(data, i) in item.contractors?.slice(
                            1,
                            item.contractors.length
                          )"
                        >
                          {{ i + 2 }}. {{ data?.name }}
                        </a>
                      </DisclosurePanel>
                      <DisclosureButton class="b4 text-[#0B5C90] text-left">
                        {{
                          open
                            ? ' ..ดูน้อยลง'
                            : `..ดูเพิ่ม (${
                                item.contractors?.slice(
                                  1,
                                  item.contractors.length
                                ).length
                              } องค์กร)`
                        }}
                      </DisclosureButton>
                    </Disclosure></template
                  >

                  <p v-else>-</p>
                </td>
                <td
                  v-if="
                    item.totalContractMoney != null ||
                    item.totalBudgetMoney != null
                  "
                  class="text-right"
                >
                  <b>{{ setNumber(item.totalContractMoney) }}</b>
                  <br />{{ setNumber(item.totalBudget) }}
                </td>
              </tr>
            </tbody>
          </table>

          <p class="b2 text-center my-3">
            {{ props.data?.searchResult?.length }} /
            {{ props.data?.pagination?.totalItem.toLocaleString() }}
          </p>

          <div class="text-center mt-3">
            <LoadMore
              v-if="
                props.data?.searchResult?.length <
                props.data?.pagination?.totalItem
              "
              @click="setParams('page', 10)"
            />
          </div></div
      ></template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-text {
  padding-left: 30px;
  background: white;
}
</style>
