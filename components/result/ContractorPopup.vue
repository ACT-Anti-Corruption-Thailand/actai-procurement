<script setup lang="ts">
import { ref } from 'vue';
import type { Contractor } from '../../public/src/data/search_result';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from '@headlessui/vue';

const config = useRuntimeConfig();
const route = useRoute();
const isOpen = ref(true);
const keyword = ref('');
const currentPage = ref(1);
const contractorList = ref<Contractor | null>(null);

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

const onClickHandler = async (page: number) => {
  await getContractorList('');
};

const setParams = async (type: string, val: string) => {
  const searchParams = new URLSearchParams();

  searchParams.set('sortBy', type == 'sortBy' ? val : 'relevanceScore');
  searchParams.set('sortOrder', type == 'sortOrder' ? val : 'desc');

  await getContractorList('&' + searchParams.toString());
};

const getContractorList = async (params: string) => {
  const urlParams = route.query?.search?.toString();
  const p = params != null ? params : '';

  const res = await fetch(
    `${config.public.apiUrl}/company/search?page=${currentPage.value}&pageSize=5&projectKeyword=${urlParams}${p}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    contractorList.value = JSON.parse(JSON.stringify(data)) || [];
  }
};

onMounted(async () => {
  keyword.value = route.query?.search?.toString();
  await getContractorList('');
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
                    ผู้รับจ้างโครงการ “<span class="text-[#74060A]">{{
                      keyword
                    }}</span
                    >”
                  </h4>
                  <p class="b1">
                    {{ contractorList?.pagination?.totalItem.toLocaleString() }}
                    ราย
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
                          name: 'วงเงินสัญญารวม',
                          value: 'totalProject',
                        },
                        {
                          name: 'จำนวนโครงการที่ได้งาน',
                          value: 'totalContractAmount',
                        },
                      ]"
                      text="เรียงตาม"
                      @change="setParams"
                      @sortBy="setParams"
                    />
                  </div>
                  <DownloadAndCopy section="company" filterList="" />
                </div>

                <ProjectIconGuide
                  :data="{
                    province: '= ที่ตั้ง',
                    entityNo: '= เลขทะเบียนนิติบุคคล',
                  }"
                  color="#8E8E8E"
                />

                <div class="my-3">
                  <a
                    v-for="item in contractorList?.searchResult"
                    class="flex justify-between p-2.5 sm:p-5 rounded-10 btn-light-4"
                    :key="'contractor-' + item.companyId"
                    target="_blank"
                    :href="'/contractor/' + item.companyId"
                  >
                    <div class="basis-2/4">
                      <p
                        class="b1 font-bold"
                        v-html="highlight(item?.companyName, keyword)"
                      ></p>
                      <ProjectIconGuide
                        :data="{
                          province: item.province,
                          entityNo: item.companyId,
                        }"
                        color="#8E8E8E"
                      />
                      <ProjectTag
                        text="ตรวจพบความน่าสนใจ"
                        v-if="item.hasCorruptionRisk"
                      />
                    </div>
                    <div
                      class="flex sm:gap-10 text-right flex-col-mb basis-2/4 justify-end"
                    >
                      <div class="basis-1/3">
                        <p class="b4 text-[#5E5E5E]">โครงการที่ได้งาน</p>
                        <p class="b1">
                          {{ item?.totalProject.toLocaleString() }}
                        </p>
                      </div>
                      <div class="basis-1/3">
                        <p class="b4 text-[#5E5E5E]">วงเงินสัญญารวม (บาท)</p>
                        <p class="b1">
                          {{ setNumber(item?.totalContractMoney) }}
                        </p>
                      </div>
                    </div>
                  </a>

                  <div class="text-center">
                    <vue-awesome-paginate
                      :total-items="contractorList?.pagination?.totalItem"
                      :items-per-page="5"
                      :max-pages-shown="5"
                      v-model="currentPage"
                      @click="onClickHandler"
                    />
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
