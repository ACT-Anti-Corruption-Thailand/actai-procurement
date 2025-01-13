<script setup lang="ts">
import type { Project } from '../../public/src/data/search_result';
import qs from 'qs';

const props = defineProps<{
  data: Project;
}>();
const emit = defineEmits(['change']);

const isRisk = ref(false);
const pageNum = ref(10);

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
        x.projectName.includes(searchText.value)
      )
    : props.data.searchResult;
});

const setFilter = (isChangePage) => {
  if (isChangePage) pageNum.value += 10;

  let filter = {
    hasCorruptionRisk: isRisk.value,
  };

  var str = qs.stringify({ filter });
  emit('change', '&' + str, pageNum.value);
};

watch(isRisk, (val) => {
  pageNum.value = 10;

  nextTick(() => {
    setFilter(false);
  });
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
        <!-- <FilterResultContractor section="รายชื่อโครงการที่เกี่ยวข้อง" /> -->
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
        <h5 class="font-black w-3/5">
          ทั้งหมด
          {{ props.data?.pagination?.totalItem.toLocaleString() }} โครงการ
          วงเงินสัญญา
          {{ props.data?.summary?.totalContractMoney.toLocaleString() }} บาท
        </h5>
        <DownloadAndCopy section="project" filterList="" />
      </div>

      <!-- <SortBy
        text="เรียงตาม"
        :list="['วันที่ประกาศโครงการ', 'วงเงินสัญญา']"
        class="mb-3"
      /> -->

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
            <tr v-for="(item, i) in searchResult" :key="i">
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
                  v-if="item.hasCorruptionRisk"
                />
              </td>
              <td>{{ setDate(item.announcementDate) }}</td>
              <td
                :class="{
                  'bg-[#054775] text-white':
                    item.projectStatus == 'ส่งงานล่าช้ากว่ากำหนด',
                  'bg-[#0F7979] text-white':
                    item.projectStatus == 'ส่งงานครบถ้วน',
                  'bg-[#1AA8A8] text-white':
                    item.projectStatus == 'ส่งงานตามกำหนด',
                  'bg-[#6DD5D5] text-white':
                    item.projectStatus == 'จัดทำสัญญา/POแล้ว',
                  'bg-[#DADADA]': item.projectStatus == 'ระหว่างดำเนินการ',
                  'bg-[#FF8888] text-white':
                    item.projectStatus == 'ยกเลิกสัญญา',
                  'bg-[#EC1C24] text-white':
                    item.projectStatus == 'สิ้นสุดสัญญา',
                }"
              >
                {{ item.projectStatus }}
              </td>
              <td
                :class="{
                  'bg-[#CE5700] text-white':
                    item.resourcingMethod == 'ประกวดราคา',
                  'bg-[#F08C06] text-white':
                    item.resourcingMethod == 'ประกวดราคานานาชาติ',
                  'bg-[#F8B60E] ':
                    item.resourcingMethod ==
                    'ประกวดราคาด้วยวิธีการทางอิเล็กทรอนิกส์',
                  'bg-[#FEEDAF] ':
                    item.resourcingMethod ==
                    'ประกวดราคาด้วยวิธีการทางอิเล็กทรอนิกส์-โดยผ่านผู้ให้บริการตลาดกลาง',
                  'bg-[#6DD5D5]': item.resourcingMethod == 'ตกลงราคา',
                  'bg-[#2EA0DF] text-white': item.resourcingMethod == 'สอบราคา',
                  'bg-[#7051B4] text-white':
                    item.resourcingMethod == 'ตลาดอิเล็กทรอนิกส์ (e-market)',
                  'bg-[#EF9CC4] text-white': item.resourcingMethod == 'พิเศษ',
                  'bg-[#D83D88] text-white':
                    item.resourcingMethod == 'คัดเลือก',
                  'bg-[#8A004B] text-white':
                    item.resourcingMethod == 'เฉพาะเจาะจง',
                  'bg-[#DADADA] ': item.resourcingMethod == 'สิ้นสุดสัญญา',
                }"
              >
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
                <ul class="list-decimal" v-if="item.contractors?.length > 0">
                  <li v-for="data in item.contractors">
                    <a
                      target="_blank"
                      :href="`/contractor${data.id}`"
                      class="hover:text-[#0B5C90]"
                      >{{ data.name }}</a
                    >
                  </li>
                </ul>

                <p v-else>-</p>
              </td>
              <td>
                <ul class="list-decimal" v-if="item.bidder?.length > 0">
                  <li v-for="data in item.bidder">
                    {{ data }}
                  </li>
                </ul>

                <p v-else>-</p>
              </td>
              <td
                v-if="
                  item.totalContractMoney != null ||
                  item.totalBudgetMoney != null
                "
              >
                <b>{{ item.totalContractMoney.toLocaleString() }}</b>
                <br />
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-text {
  padding-left: 30px;
  background: white;
}
</style>
