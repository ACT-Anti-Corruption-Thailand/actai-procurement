<script setup lang="ts">
import { getGovList } from "~/utils/goverment";
import type {
  Government,
  Project,
  Contractor,
} from "../../public/src/data/search_result";
import { getContractorList } from "~/utils/contractor";

const props = defineProps<{
  iconGuide: object;
  mockDataGuide: object;
}>();

defineEmits(["changeMenu"]);

const route = useRoute();
const featureFlags = useFeatureFlags();

const searchText = ref("");
const projectList = ref<Project | null>(null);
const isLoadingProjectList = ref(true);
const govList = ref<Government | null>(null);
const isLoadingGovList = ref(true);
const contractorList = ref<Contractor | null>(null);
const isLoadingContractorList = ref(true);

onBeforeMount(async () => {
  projectList.value = await getProjectList("", String(route.query.search));
  isLoadingProjectList.value = false;
  govList.value = await getGovList("", String(route.query.search));
  isLoadingGovList.value = false;
  contractorList.value = await getContractorList(
    "",
    String(route.query.search)
  );
  isLoadingContractorList.value = false;
});

onMounted(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  searchText.value = String(urlParams.get("search"));
});

const handleGoToNext = (path: string) => {
  const router = useRouter();
  const route = useRoute();
  const search = route.query.search;
  router.push(`/result/${path}?search=${search}`);
};
</script>

<template>
  <div
    v-if="
      projectList?.pagination.totalItem == 0 &&
      govList?.pagination.totalItem == 0 &&
      contractorList?.pagination.totalItem == 0
    "
    class="pb-7"
  >
    <h5 class="text-center text-[#8E8E8E]">
      ไม่พบโครงการจัดซื้อจัดจ้าง หน่วยงานรัฐ และผู้รับจ้างที่มีคำค้นนี้
    </h5>
  </div>

  <div class="mx-auto max-w-6xl px-4" v-else>
    <LoadingContainer :is-loading="isLoadingProjectList">
      <div
        class="border-b border-black mb-5"
        v-if="
          projectList?.searchResult && projectList?.searchResult?.length > 0
        "
      >
        <h4 class="font-black">โครงการจัดซื้อจัดจ้าง</h4>

        <ProjectIconGuide :data="props.iconGuide" color="#8E8E8E" />

        <div class="my-3">
          <a
            v-for="item in projectList?.searchResult.slice(0, 3)"
            :key="'project-' + item.projectId"
            target="_blank"
            :href="'/project/' + item.projectId"
          >
            <div
              class="flex justify-between flex-col-mb p-2.5 sm:p-5 rounded-10 btn-light-4"
            >
              <div class="w-3/4">
                <p
                  class="b1 font-bold"
                  v-html="highlight(item?.projectName)"
                ></p>

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
                  v-if="
                    featureFlags?.SUSPICIOUS_LABEL && item.hasCorruptionRisk
                  "
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
          :text="`ดูโครงการทั้งหมด (${projectList?.pagination.totalItem.toLocaleString()})`"
          class="mb-5 mt-0 link-1"
          @click="handleGoToNext('project')"
        />
      </div>
    </LoadingContainer>
    <LoadingContainer :is-loading="isLoadingGovList">
      <div
        class="border-b border-black mb-5"
        v-if="govList?.searchResult && govList?.searchResult?.length > 0"
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
            v-for="item in govList?.searchResult.slice(0, 3)"
            class="flex justify-between p-2.5 sm:p-5 rounded-10 btn-light-4"
            :key="'gov-' + item.agencyId"
            target="_blank"
            :href="'/government/' + item.agencyId"
          >
            <div class="basis-2/5 lg:basis-3/5">
              <p class="b1 font-bold" v-html="highlight(item?.agencyName)"></p>
              <ProjectIconGuide
                :data="{
                  province: item.province,
                }"
                color="#8E8E8E"
              />
            </div>
            <div class="flex text-right flex-col-mb basis-3/5 lg:basis-2/5">
              <div class="flex-1">
                <p class="b4 text-[#5E5E5E]">โครงการทั้งหมด</p>
                <p class="b1">{{ item?.totalProject.toLocaleString() }}</p>
              </div>
              <div
                v-if="featureFlags?.SUSPICIOUS_LABEL"
                class="text-[#EC1C24] flex-1"
              >
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
              <div class="flex-1">
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
          :text="`ดูหน่วยงานรัฐทั้งหมด (${govList?.pagination.totalItem.toLocaleString()})`"
          class="mb-5 mt-0 text-[#0B5C90] cursor-pointer"
          @click="handleGoToNext('government')"
        />
      </div>
    </LoadingContainer>
    <LoadingContainer :is-loading="isLoadingContractorList">
      <div
        class="mb-10"
        v-if="
          contractorList?.searchResult &&
          contractorList?.searchResult?.length > 0
        "
      >
        <h4 class="font-black">ผู้รับจ้าง</h4>
        <ProjectIconGuide
          :data="{
            province: '= ที่ตั้ง',
          }"
          color="#8E8E8E"
        />

        <div class="my-3">
          <a
            v-for="item in contractorList?.searchResult.slice(0, 3)"
            class="flex justify-between p-2.5 sm:p-5 rounded-10 btn-light-4"
            :key="'contractor-' + item.companyId"
            target="_blank"
            :href="'/contractor/' + item.companyId"
            :class="{
              'pointer-events-none': item.companyId.toLowerCase().includes('x'),
            }"
          >
            <div class="basis-3/5">
              <p class="b1 font-bold" v-html="highlight(item.companyName)"></p>
              <ProjectIconGuide
                :data="{
                  province: item.province,
                }"
                color="#8E8E8E"
              />

              <ProjectTag
                text="ตรวจพบความน่าสนใจ"
                v-if="featureFlags?.SUSPICIOUS_LABEL && item.hasCorruptionRisk"
              />
            </div>
            <div
              class="flex sm:gap-10 text-right flex-col-mb basis-2/5 justify-end"
            >
              <div class="flex-1">
                <p class="b4 text-[#5E5E5E]">โครงการที่ได้งาน</p>
                <p class="b1">{{ item?.totalProject.toLocaleString() }}</p>
              </div>
              <div class="flex-1">
                <p class="b4 text-[#5E5E5E]">วงเงินสัญญารวม (บาท)</p>
                <p class="b1">{{ setNumber(item?.totalContractMoney) }}</p>
              </div>
            </div>
          </a>
        </div>

        <GoToText
          color="#0B5C90"
          :text="`ดูผู้รับจ้างทั้งหมด (${contractorList?.pagination.totalItem.toLocaleString()})`"
          class="mb-5 mt-0 text-[#0B5C90] cursor-pointer"
          @click="handleGoToNext('contractor')"
        />
      </div>
    </LoadingContainer>
  </div>
</template>

<style scoped></style>
