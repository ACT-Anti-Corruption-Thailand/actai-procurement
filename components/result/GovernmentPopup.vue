<script setup lang="ts">
import { ref } from 'vue';
import type { Government } from '../../public/src/data/search_result';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from '@headlessui/vue';
import qs from 'qs';

const config = useRuntimeConfig();
const route = useRoute();
const featureFlags = useFeatureFlags();
const isOpen = ref(true);
const isLoading = ref(false);
const keyword = ref('');
const currentPage = ref(1);
const sort = ref('relevanceScore');
const sortOrder = ref('desc');
const govList = ref<Government | null>(null);
const searchResult = ref<Government | null>(null);
const queryForDownload = ref('');

function highlight(title: string, text: string) {
  var innerHTML = title;
  const urlParams = route.query.search;
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

const onClickHandler = async (page: number) => {
  await getGovList('');
};

const setParams = async (type: string, val: string) => {
  const searchParams = new URLSearchParams();
  if (type == 'sortBy') sort.value = val;
  else if (type == 'sortOrder') sortOrder.value = val;

  searchParams.set('sortBy', type == 'sortBy' ? val : 'relevanceScore');
  searchParams.set('sortOrder', type == 'sortOrder' ? val : 'desc');

  searchParams.set('sortBy', type == 'sortBy' ? val : sort.value);
  searchParams.set('sortOrder', type == 'sortOrder' ? val : sortOrder.value);

  queryForDownload.value = '&' + searchParams.toString();

  await getGovList('&' + searchParams.toString());
};

const getGovList = async (params: string) => {
  isLoading.value = true;
  const urlParams = route.query?.search?.toString();
  const p = params != null ? params : '';

  const res = await fetch(
    `${config.public.apiUrl}/agency/search?page=${currentPage.value}&pageSize=5&projectKeyword=${urlParams}${p}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    govList.value = JSON.parse(JSON.stringify(data)) || [];
    searchResult.value = govList.value?.searchResult.filter((x) =>
      x.agencyName.includes(keyword.value)
    );
  }
  isLoading.value = false;
};

onBeforeMount(() => {
  queryForDownload.value = '?' + qs.stringify(route.query);
});

onMounted(async () => {
  keyword.value = route.query?.search?.toString();
  let filter = '&' + qs.stringify(route.query);
  await getGovList(filter);
});
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center text-center">
          <TransitionChild
            as="template"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-[90vw] max-w-[800px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <img
                src="../../public/src/images/close.svg"
                alt="close"
                class="absolute right-5 top-5 cursor-pointer"
                @click="$emit('close')"
              />
              <div>
                <div>
                  <h4 class="font-bold">
                    หน่วยงานรัฐเจ้าของโครงการ “<span class="text-[#74060A]">{{
                      keyword
                    }}</span
                    >”
                  </h4>
                  <p class="b1">
                    {{ govList?.pagination?.totalItem.toLocaleString() }}
                    หน่วยงานรัฐ
                  </p>
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
                       ...(featureFlags?.SUSPICIOUS_LABEL ? [
                          {
                            name: 'จำนวนโครงการเสี่ยงทุจริต',
                            value: 'totalProjectHasCorruptionRisk',
                          },
                          {
                            name: '% โครงการเสี่ยงทุจริตจากทั้งหมด',
                            value: 'percentageProjectHasCorruptionRisk',
                          }
                        ] : []),
                      ]"
                      text="เรียงตาม"
                      @change="setParams"
                      @sortBy="setParams"
                      selectedSortBy=""
                      selectedSortOrder=""
                    />
                  </div>
                  <DownloadAndCopy
                    section="agency"
                    :filterList="queryForDownload"
                    :isShowCopyBtn="false"
                    resultSection="projectKeyword"
                  />
                </div>

                <ProjectIconGuide
                  :data="{
                    province: '= ที่ตั้ง',
                  }"
                  color="#8E8E8E"
                />

                <template v-if="isLoading">
                  <div class="p-5 b1 text-center">Loading...</div>
                </template>
                <template v-else>
                  <div class="my-3">
                    <a
                      v-for="item in govList?.searchResult"
                      class="flex justify-between p-2.5 sm:p-5 rounded-10 btn-light-4 gap-2"
                      :key="'gov-' + item.agencyId"
                      target="_blank"
                      :href="'/government/' + item.agencyId"
                    >
                      <div class="basis-2/5">
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
                      <div
                        class="basis-3/5 flex justify-between sm:gap-5 text-right flex-col-mb"
                      >
                        <div class="flex-1">
                          <p class="b4 text-[#5E5E5E]">โครงการทั้งหมด</p>
                          <p class="b1">
                            {{ item?.totalProject.toLocaleString() }}
                          </p>
                        </div>
                        <div v-if="featureFlags?.SUSPICIOUS_LABEL" class="text-[#EC1C24] flex-1">
                          <p class="b4 text-[#EC1C2460]">โครงการเสี่ยงทุจริต</p>
                          <p class="b1">
                            {{
                              item?.totalProjectHasCorruptionRisk.toLocaleString()
                            }}
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

                    <div class="text-center">
                      <vue-awesome-paginate
                        :total-items="govList?.pagination?.totalItem"
                        :items-per-page="5"
                        :max-pages-shown="5"
                        v-model="currentPage"
                        @click="onClickHandler"
                      />
                    </div>
                  </div>
                </template>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
