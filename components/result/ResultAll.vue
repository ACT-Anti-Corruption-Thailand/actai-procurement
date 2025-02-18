<script setup lang="ts">
import type {
  Government,
  Project,
  Contractor,
} from '../../public/src/data/search_result';

const props = defineProps<{
  iconGuide: object;
  mockDataGuide: object;
  projectList?: Project;
  govList?: Government;
  contractorList?: Contractor;
}>();

defineEmits(['changeMenu']);

const keyword = ref('');

function highlight(title: string, text: string) {
  var innerHTML = title;
  const urlParams = decodeURI(window.location.href).split('=')[1];
  var index = innerHTML.toLowerCase().indexOf(urlParams);

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

onBeforeMount(async () => {
  keyword.value = localStorage.getItem('keyword');
});

onMounted(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  searchText.value = urlParams.get('search');
});
</script>

<template>
  <div v-if="props.projectList?.pagination.totalItem == 0" class="pb-7">
    <h5 class="text-center text-[#8E8E8E]">
      ไม่พบโครงการจัดซื้อจัดจ้าง หน่วยงานรัฐ และผู้รับจ้างที่มีคำค้นนี้
    </h5>
  </div>

  <div class="mx-auto max-w-6xl px-4" v-else>
    <div
      class="border-b border-black mb-5"
      v-if="props.projectList?.searchResult?.length > 0"
    >
      <h4 class="font-black">โครงการจัดซื้อจัดจ้าง</h4>

      <ProjectIconGuide :data="props.iconGuide" color="#8E8E8E" />

      <div class="my-3">
        <a
          v-for="item in props.projectList?.searchResult.slice(0, 3)"
          :key="'project-' + item.projectId"
          target="_blank"
          :href="'/project/' + item.projectId"
        >
          <div
            class="flex justify-between flex-col-mb p-2.5 sm:p-5 rounded-10 btn-light-4"
          >
            <div class="w-3/4">
              <p class="b1 font-bold" v-html="highlight(item?.projectName)"></p>

              <ProjectIconGuide
                :data="{
                  province: item.province,
                  year: item.budgetYear,
                  owner: item.agencyName,
                  no: item.projectId,
                  date: item.announcementDate,
                }"
                color="#8E8E8E"
              />

              <ProjectTag
                text="พบความเสี่ยงทุจริต"
                v-if="item.hasCorruptionRisk"
              />
            </div>
            <div
              class="sm:w-1/4 text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-normal"
            >
              <p class="b4 text-[#5E5E5E]">งบประมาณรวม (บาท)</p>
              <p class="b1" v-if="item?.totalBudget != null">
                {{ setNumber(item?.totalBudget) }}
              </p>
            </div>
          </div>
        </a>
      </div>

      <GoToText
        color="#0B5C90"
        :text="`ดูโครงการทั้งหมด (${props.projectList?.pagination.totalItem.toLocaleString()})`"
        class="mb-5 mt-0 link-1"
        @click="$emit('changeMenu', 'โครงการฯ')"
      />
    </div>

    <div
      class="border-b border-black mb-5"
      v-if="props.govList?.searchResult?.length > 0"
    >
      <h4 class="font-black">หน่วยงานรัฐ</h4>
      <ProjectIconGuide
        :data="{
          province: '= ที่ตั้ง',
        }"
        color="#8E8E8E"
      />

      <div class="my-3">
        <a
          v-for="item in props.govList?.searchResult.slice(0, 3)"
          class="flex justify-between p-2.5 sm:p-5 rounded-10 btn-light-4"
          :key="'gov-' + item.agencyId"
          target="_blank"
          :href="'/government/' + item.agencyId"
        >
          <div class="basis-2/5 lg:basis-3/5">
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
          <div class="flex text-right flex-col-mb basis-3/5 lg:basis-2/5">
            <div class="basis-1/3">
              <p class="b4 text-[#5E5E5E]">โครงการทั้งหมด</p>
              <p class="b1">{{ item?.totalProject.toLocaleString() }}</p>
            </div>
            <div class="text-[#EC1C24] basis-1/3">
              <p class="b4 text-[#EC1C2460]">โครงการเสี่ยงทุจริต</p>
              <p class="b1">
                {{ item?.totalProjectHasCorruptionRisk.toLocaleString() }}
                ({{
                  item?.totalProject == 0
                    ? 0
                    : setNumber(
                        (item?.totalProjectHasCorruptionRisk /
                          item?.totalProject) *
                          100
                      )
                }}%)
              </p>
            </div>
            <div class="basis-1/3">
              <p class="b4 text-[#5E5E5E]">งบประมาณรวม (บาท)</p>
              <p class="b1">
                {{ setNumber(item?.totalBudgetMoney) }}
              </p>
            </div>
          </div>
        </a>
      </div>

      <GoToText
        color="#0B5C90"
        :text="`ดูหน่วยงานรัฐทั้งหมด (${props.govList?.pagination.totalItem.toLocaleString()})`"
        class="mb-5 mt-0 text-[#0B5C90] cursor-pointer"
        @click="$emit('changeMenu', 'หน่วยงานรัฐ')"
      />
    </div>

    <div class="mb-10" v-if="props.contractorList?.searchResult?.length > 0">
      <h4 class="font-black">ผู้รับจ้าง</h4>
      <ProjectIconGuide
        :data="{
          province: '= ที่ตั้ง',
        }"
        color="#8E8E8E"
      />

      <div class="my-3">
        <a
          v-for="item in props.contractorList?.searchResult.slice(0, 3)"
          class="flex justify-between p-2.5 sm:p-5 rounded-10 btn-light-4"
          :key="'contractor-' + item.companyId"
          target="_blank"
          :href="'/contractor/' + item.companyId"
          :class="{
            'pointer-events-none': item.companyId.toLowerCase().includes('x'),
          }"
        >
          <div class="basis-3/5">
            <p
              class="b1 font-bold"
              v-html="highlight(item.companyName, keyword)"
            ></p>
            <ProjectIconGuide
              :data="{
                province: item.province,
              }"
              color="#8E8E8E"
            />

            <ProjectTag
              text="ตรวจพบความน่าสนใจ"
              v-if="item.hasCorruptionRisk"
            />
          </div>
          <div
            class="flex sm:gap-10 text-right flex-col-mb basis-2/5 justify-end"
          >
            <div class="basis-1/3">
              <p class="b4 text-[#5E5E5E]">โครงการที่ได้งาน</p>
              <p class="b1">{{ item?.totalProject.toLocaleString() }}</p>
            </div>
            <div class="basis-1/3">
              <p class="b4 text-[#5E5E5E]">วงเงินสัญญารวม (บาท)</p>
              <p class="b1">{{ setNumber(item?.totalContractMoney) }}</p>
            </div>
          </div>
        </a>
      </div>

      <GoToText
        color="#0B5C90"
        :text="`ดูผู้รับจ้างทั้งหมด (${props.contractorList?.pagination.totalItem.toLocaleString()})`"
        class="mb-5 mt-0 text-[#0B5C90] cursor-pointer"
        @click="$emit('changeMenu', 'ผู้รับจ้าง')"
      />
    </div>
  </div>
</template>

<style scoped></style>
