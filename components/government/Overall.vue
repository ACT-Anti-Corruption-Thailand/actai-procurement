<script setup lang="ts">
import type { MapData } from '../../public/src/data/search_result';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import qs from 'qs';

const titleChartSelected = ref('ความเสี่ยงทุจริต');
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
const yearList = ref([]);
const chartDataSet1 = ref([]);
const chartDataSet2 = ref([]);
const chartDataSet4 = ref([]);
const chartDataSet5 = ref([]);
const isDone = ref(false);

const chartData = ref({
  labels: [],
  datasets: [],
});

const featureFlags = useFeatureFlags(flags => {
  if (!flags?.SUSPICIOUS_LABEL) {
    titleChartSelected.value = 'สถานะโครงการล่าสุด'
  }
});


onBeforeMount(async () => {
  const config = useRuntimeConfig();
  const urlParams = window.location.pathname.split('/')[2];

  let filter = {
    agencyId: urlParams,
  };

  var str = qs.stringify({ filter });

  const res = await fetch(
    `${config.public.apiUrl}/project/aggregate/by-budget-year?${str}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    let q = data.yearlyAggregates.map((x) => x.aggregateBy.budgetMoney);
    let contractMoney = data.yearlyAggregates.map(
      (x) => x.aggregateBy.contractMoney
    );

    chartData.value = {
      labels: data.yearlyAggregates.map((x) => x.budgetYear.toString()),
      datasets: [
        {
          label: 'วงเงินสัญญารวม (บาท)',
          backgroundColor: '#FFFFFF',
          borderColor: '#000000',
          data: contractMoney,
          fill: true,
        },
        {
          label: 'งบประมาณรวม (บาท)',
          backgroundColor: '#DADADA',
          borderColor: '#5E5E5E',
          borderDash: [5, 5],
          data: q,
          fill: true,
        },
      ],
    };

    totalContractOverall.value = contractMoney.reduce((a, b) => a + b, 0);

    totalBudgetOverall.value = q.reduce((a, b) => a + b, 0);

    data.value = data.yearlyAggregates;
    yearList.value = data.yearlyAggregates.map((x) => x.budgetYear.toString());

    setChartData(data.yearlyAggregates);

    isDone.value = true;
  }

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

  if (res.ok) {
    const data = await res2.json();

    mapDataList.value = data.provinces.filter((x) => x.totalProject != 0);

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
  if (!isCorrupt.value) {
    return mapDataList.value.map((o) => ({
      name: o.name,
      totalProject: o.totalProject,
      totalBudgetMoney: o.totalBudgetMoney,
    }));
  } else {
    return mapDataList.value.map((o) => ({
      name: o.name,
      totalProject: o.totalCorruptionProject,
      totalBudgetMoney: o.totalCorruptionProjectBudget,
    }));
  }
});

const sectionChart = computed(() => {
  if (titleChartSelected.value == 'ความเสี่ยงทุจริต') return 'risk';
  else if (titleChartSelected.value == 'สถานะโครงการล่าสุด') return 'project';
  else return 'method';
});

const barChartData = computed(() => {
  if (titleChartSelected.value == 'ความเสี่ยงทุจริต')
    return chartDataSet2.value;
  else if (titleChartSelected.value == 'สถานะโครงการล่าสุด')
    return chartDataSet4.value;
  else return chartDataSet5.value;
});

const setChartData = (data) => {
  const dataset_year = data.map((a) => a.budgetYear);
  const dataset1 = data.map((a) => a.aggregateBy.budgetMoney);
  const dataset2 = data.map((a) => a.totalProject);
  const dataset3 = data.map((a) => a.aggregateBy.hasCorruptionRiskProject);

  yearList.value = dataset_year;

  chartDataSet1.value.push({
    label: '',
    backgroundColor: '#000000',
    data: dataset1,
    sum: dataset1.reduce((sum, num) => sum + num, 0),
  });

  let a = [];

  dataset2.forEach((element, i) => {
    a.push(element - dataset3[i]);
  });

  chartDataSet2.value.push(
    {
      label: 'พบความเสี่ยง',
      backgroundColor: '#EC1C24',
      data: dataset3,
      sum: dataset3.reduce((sum, num) => sum + num, 0),
      isChecked: true,
    },
    {
      label: 'ไม่พบความเสี่ยง',
      backgroundColor: '#000000',
      data: a,
      sum: a.reduce((sum, num) => sum + num, 0),
      isChecked: true,
    }
  );

  onSetChartData('contract', data);
  onSetChartData('method', data);
};

const onSetChartData = (section: string, data) => {
  if (section == 'contract') {
    const projectContractStatuses = [
      ...new Set(
        data.flatMap((o) => o.aggregateBy.contractStatus).map((o) => o.name)
      ),
    ];

    const colorContractStatus = [
      {
        name: 'ส่งงานล่าช้ากว่ากำหนด',
        color: '#054775',
      },
      {
        name: 'ส่งงานครบถ้วน',
        color: '#0F7979',
      },
      {
        name: 'ส่งงานตามกำหนด',
        color: '#1AA8A8',
      },
      {
        name: 'จัดทำสัญญา/POแล้ว',
        color: '#6DD5D5',
      },
      {
        name: 'ระหว่างดำเนินการ',
        color: '#DADADA',
      },
      {
        name: 'ยกเลิกสัญญา',
        color: '#FF8888',
      },
      {
        name: 'สิ้นสุดสัญญา',
        color: '#EC1C24',
      },
    ];

    const grouped = colorContractStatus.map((c) => {
      return c.name;
    });

    const res = projectContractStatuses.sort(
      (a, b) => grouped.indexOf(b) - grouped.indexOf(a)
    );

    chartDataSet4.value = res.map((name, i) => {
      const chartdata = data.map(
        (d) => d.aggregateBy.contractStatus.find((d) => d.name == name).total
      );

      let c = colorContractStatus.filter((x) => x.name == name);

      return {
        label: name,
        backgroundColor: c[0].color,
        data: data.map(
          (d) => d.aggregateBy.contractStatus.find((d) => d.name == name).total
        ),
        sum: chartdata.reduce((sum, num) => sum + num, 0),
        isChecked: true,
      };
    });
  } else {
    const projectResourceMethod = [
      ...new Set(
        data.flatMap((o) => o.aggregateBy.resourcingMethod).map((o) => o.name)
      ),
    ];

    const colorResourceMethod = [
      {
        name: 'ประกวดราคา',
        color: '#CE5700',
      },
      {
        name: 'ประกวดราคานานาชาติ',
        color: '#F08C06',
      },
      {
        name: 'ประกวดราคาอิเล็กทรอนิกส์ (e-bidding)',
        color: '#F8B60E',
      },
      {
        name: 'ประกวดราคาด้วยวิธีการทางอิเล็กทรอนิกส์โดยผ่านผู้ให้บริการตลาดกลาง',
        color: '#FEEDAF',
      },
      {
        name: 'ตกลงราคา',
        color: '#6DD5D5',
      },
      {
        name: 'สอบราคา',
        color: '#2EA0DF',
      },
      {
        name: 'ตลาดอิเล็กทรอนิกส์ (e-market)',
        color: '#7051B4',
      },
      {
        name: 'พิเศษ',
        color: '#EF9CC4',
      },
      {
        name: 'คัดเลือก',
        color: '#D83D88',
      },
      {
        name: 'เฉพาะเจาะจง',
        color: '#8A004B',
      },
    ];

    const grouped = colorResourceMethod.map((c) => {
      return c.name;
    });

    const res = grouped.sort((a, b) => grouped.indexOf(b) - grouped.indexOf(a));

    let others = projectResourceMethod.filter((val) => !grouped.includes(val));

    let chartData1 = res.map((name, i) => {
      const chartdata = data.map(
        (d) => d.aggregateBy.resourcingMethod.find((d) => d.name == name).total
      );

      let c = colorResourceMethod.filter((x) => x.name == name);

      return {
        label: name,
        backgroundColor: c[0].color,
        sum: chartdata.reduce((sum, num) => sum + num, 0),
        data: chartdata,
        isChecked: true,
      };
    });

    let chartData2 = others.map((name, i) => {
      const chartdata = data.map(
        (d) => d.aggregateBy.resourcingMethod.find((d) => d.name == name).total
      );

      return {
        sum: chartdata.reduce((sum, num) => sum + num, 0),
        data: chartdata,
      };
    });

    const c = {
      label: 'อื่นๆ',
      backgroundColor: '#DADADA',
      data: chartData2.reduce((sum, years) => {
        years.data.forEach((num, i) => {
          sum[i] += num;
        });
        return sum;
      }, new Array(chartData2[0].data.length).fill(0)),
      sum: 0,
      isChecked: true,
    };

    c.sum = c.data.reduce((sum, num) => sum + num, 0);

    chartDataSet5.value.push(c);

    chartData1.forEach((element) => {
      chartDataSet5.value.push(element);
    });
  }
};
</script>

<template>
  <div>
    <h4 class="font-bold text-white mb-5">ภาพรวมโครงการที่จัดทำ</h4>

    <BarChart
      v-if="isDone"
      v-model="titleChartSelected"
      hasChooseChartData
      :yearList="yearList"
      :data="barChartData"
      titleType="1"
      titleGov="จำนวนโครงการ"
      :section="sectionChart"
    />

    <div
      class="rounded-10 flex flex-col-mb mb-3"
      v-if="totalBudgetOverall != 0"
    >
      <div class="p-7 bg-[#F5F5F5] checkbox-wrapper sm:w-1/3">
        <h4 class="font-black">งบประมาณโครงการ</h4>

        <div class="flex items-center b1 gap-2">
          <div class="h-[1px] w-10 bg-black"></div>
          <div>
            <p>วงเงินสัญญารวม (บาท)</p>
            <p class="font-bold">{{ setNumber(totalContractOverall) }}</p>
          </div>
        </div>

        <div class="flex items-center b1 gap-2 text-[#5E5E5E]">
          <div class="h-[1px] w-10 border border-dashed border-[#8E8E8E]"></div>
          <div>
            <p>งบประมาณรวม (บาท)</p>
            <p class="font-bold">{{ setNumber(totalBudgetOverall) }}</p>
          </div>
        </div>

        <div class="flex items-center b1 gap-2 text-[#8E8E8E]">
          <div class="h-[15px] w-10 bg-[#DADADA]"></div>
          <div>
            <p>ส่วนต่าง (บาท)</p>
            <p class="font-bold">
              {{ setNumber(totalBudgetOverall - totalContractOverall) }}
            </p>
          </div>
        </div>

        <p
          class="b4 flex gap-1 items-center text-[#0B5C90] duration-300 cursor-pointer"
          @click="isOpen2 = true"
        >
          <info color="#0B5C90" />
          <span>กราฟนี้บ่งบอกอะไร</span>
        </p>
      </div>
      <div
        class="py-7 pr-7 pl-10 bg-[#FFFFFF] chart-wrapper sm:w-2/3 text-[#8E8E8E] relative"
      >
        <p class="text-center b2">
          เปรียบเทียบวงเงินสัญญาและงบประมาณรวมในแต่ละปี
        </p>

        <div>
          <LineChart :data="chartData" />
        </div>

        <p class="text-center b4 font-bold">ปีงบประมาณ</p>
        <p class="text-center b4 font-bold yaxis-text">งบประมาณ (บาท)</p>
      </div>
    </div>

    <div class="rounded-10 flex flex-col-mb mb-3" v-if="totalProjectMap != 0">
      <div class="p-7 bg-[#F5F5F5] checkbox-wrapper sm:w-1/3">
        <h4 class="font-black">การกระจายตัวโครงการ</h4>
        <p class="b1 font-bold">
          รวม {{ totalProjectMap?.toLocaleString() }}
          {{ selected == 'งบประมาณ' ? 'บาท' : 'โครงการ' }} ใน
          {{ mapDataList?.length }} จังหวัด
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

        <div v-if="featureFlags?.SUSPICIOUS_LABEL" class="mt-3">
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
            โครงการ ใน {{ mapDataList?.length }} จังหวัด)</label
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
              {{ totalProjectMapOverall.toLocaleString() }}
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
