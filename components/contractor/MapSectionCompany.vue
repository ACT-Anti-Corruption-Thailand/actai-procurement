<script setup lang="ts">
import type { MapData } from '../../public/src/data/search_result';
import type { ChartComponentRef } from 'vue-chartjs';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import qs from 'qs';

const config = useRuntimeConfig();
const route = useRoute();
let selected = ref('งบประมาณ');
const isOpen = ref(false);
const isOpen2 = ref(false);
const isCorrupt = ref(false);
const totalContractOverall = ref(0);
const totalBudgetOverall = ref(0);
const totalProject = ref(0);
const totalCorruptProject = ref(0);
const totalProjectMapOverall = ref(0);
const totalBudget = ref(0);
const mapDataList = ref<MapData | null>(null);
const isDone = ref(false);

onBeforeMount(async () => {
  isDone.value = true;

  const segments = route.path.split('/')[2];

  let filter = {
    companyId: segments,
  };

  var str = qs.stringify({ filter });

  const res2 = await fetch(
    `${config.public.apiUrl}/project/aggregate/by-province?${str}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res2.ok) {
    const data = await res2.json();

    mapDataList.value = data.provinces.filter((x) => x.name != 'ไม่ระบุ');

    const a = mapDataList.value.map((o) => o.totalProject);
    totalProject.value = a.reduce((partialSum, a) => partialSum + a, 0);
    const b = mapDataList.value.map((o) => o.totalBudgetMoney);
    totalBudget.value = b.reduce((partialSum, a) => partialSum + a, 0);
    const c = mapDataList.value.map((o) => o.totalCorruptionProject);
    totalCorruptProject.value = c.reduce((partialSum, a) => partialSum + a, 0);
  }
});

const totalProjectMap = computed(() => {
  if (mapDataList?.value != null) {
    let x = 0;

    const a = mapDataList?.value.map((o) => o.totalProject);
    const b = mapDataList?.value.map((o) => o.totalBudgetMoney);
    const c = mapDataList?.value.map((o) => o.totalCorruptionProject);
    const d = mapDataList?.value.map((o) => o.totalCorruptionProjectBudget);

    if (!isCorrupt.value) {
      x =
        selected.value == 'งบประมาณ'
          ? b.reduce((partialSum, a) => partialSum + a, 0)
          : a.reduce((partialSum, a) => partialSum + a, 0);
    } else {
      x =
        selected.value == 'งบประมาณ'
          ? d.reduce((partialSum, a) => partialSum + a, 0)
          : c.reduce((partialSum, a) => partialSum + a, 0);
    }

    totalProjectMapOverall.value = x;

    return x;
  }
});

const mapData = computed(() => {
  if (mapDataList.value != null) {
    if (!isCorrupt.value) {
      return mapDataList.value
        .filter((x) => x.totalProject != 0)
        .map((o) => ({
          name: o.name,
          totalProject: o.totalProject,
          totalBudgetMoney: o.totalBudgetMoney,
        }));
    } else {
      return mapDataList.value
        .filter((x) => x.totalCorruptionProject != 0)
        .map((o) => ({
          name: o.name,
          totalProject: o.totalCorruptionProject,
          totalBudgetMoney: o.totalCorruptionProjectBudget,
        }));
    }
  }
});
</script>

<template>
  <div>
    <div class="rounded-10 flex flex-col-mb mb-3">
      <div class="p-7 bg-[#F5F5F5] checkbox-wrapper sm:w-1/3">
        <h4 class="font-black">การกระจายตัวโครงการ</h4>
        <p class="b1 font-bold">
          รวม {{ totalProjectMap?.toLocaleString() }}
          {{ selected == 'งบประมาณ' ? 'บาท' : 'โครงการ' }} ใน
          {{ mapData?.length }} จังหวัด
        </p>

        <p class="b1 mt-3">แสดงความเข้มสีตาม</p>
        <div class="relative">
          <ClientOnly fallback-tag="span" fallback="Loading...">
            <Listbox v-model="selected" as="div">
              <ListboxButton class="dropdown-btn">
                <span class="text-ellipsis text-nowrap overflow-hidden"
                  >{{ selected }} </span
                ><ChevronDownIcon
              /></ListboxButton>
              <ListboxOptions class="dropdown-list absolute">
                <ListboxOption value="งบประมาณ"> งบประมาณ </ListboxOption>
                <ListboxOption value="จำนวนโครงการ">
                  จำนวนโครงการ
                </ListboxOption>
              </ListboxOptions>
            </Listbox>
          </ClientOnly>
        </div>

        <div class="mt-3">
          <input
            type="checkbox"
            name=""
            id="isRisk"
            class="text-black ring-0"
            v-model="isCorrupt"
          />
          <label for="isRisk" class="text-[#EC1C24] ml-1 b4"
            >ดูเฉพาะโครงการที่พบความเสี่ยงทุจริต ({{
              totalCorruptProject.toLocaleString()
            }}
            โครงการ ใน {{ mapData?.length }} จังหวัด)</label
          >
        </div>
      </div>
      <div
        class="py-7 pr-7 pl-10 bg-[#FFFFFF] chart-wrapper sm:w-2/3 text-[#8E8E8E] relative"
      >
        <Map
          :no="selected == 'งบประมาณ' ? '2' : '1'"
          :provinces="mapData"
          :total="totalProjectMapOverall"
          v-if="mapDataList != null"
          :isCorrupt="isCorrupt"
          :section="selected"
        />

        <div class="absolute w-32 bottom-5 right-5 text-[#8E8E8E]">
          <div class="flex justify-between b4">
            <p>0</p>
            <p>
              {{
                selected == 'งบประมาณ'
                  ? setNumber(totalBudget)
                  : totalProject.toLocaleString()
              }}
            </p>
          </div>
          <div
            class="h-[10px] w-full bg-gradient-to-r from-[#F5F5F5] to-[#484848]"
          ></div>
          <p>หน่วย : {{ selected == 'งบประมาณ' ? 'บาท' : 'โครงการ' }}</p>
        </div>
      </div>
    </div>

    <Modal
      v-if="isOpen"
      @close="isOpen = false"
      title="ACT Ai ตรวจสอบโครงการเสี่ยงอย่างไร ?"
    />

    <Modal v-if="isOpen2" @close="isOpen2 = false" title="กราฟนี้บ่งบอกอะไร" />
  </div>
</template>

<style scoped></style>
