<script setup lang="ts">
import type { MapData } from '../../public/src/data/search_result';
import { Line } from 'vue-chartjs';
import type { ChartComponentRef } from 'vue-chartjs';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';

const titleChartSelected = ref('ความเสี่ยงทุจริต');
const sectionChartSelected = ref('risk');
let selected = ref('งบประมาณ');
const isOpen = ref(false);
const isOpen2 = ref(false);
const totalContractOverall = ref(0);
const totalBudgetOverall = ref(0);
const totalProject = ref(0);
const totalCorruptProject = ref(0);
const totalBudget = ref(0);
const mapDataList = ref<MapData | null>(null);
const bar = ref<ChartComponentRef | null>(null);
const data = ref([]);
const yearList = ref([]);
const chartDataSet1 = ref([]);
const chartDataSet2 = ref([]);
const chartDataSet3 = ref([]);
const chartDataSet4 = ref([]);
const chartDataSet5 = ref([]);
const isDone = ref(false);

const chartData = ref({
  labels: [],
  datasets: [],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    filler: {
      propagate: false,
    },
    legend: {
      display: false,
    },
    tooltip: {
      titleFont: {
        size: 20,
        family: 'DB_Helvethaica_X',
      },
      bodyFont: {
        size: 16,
        family: 'DB_Helvethaica_X',
      },
      callbacks: {
        title: function (context) {
          return 'ปี ' + context[0].label.replace('’', '');
        },
        label: function (context) {
          return context.formattedValue;
        },
        footer: function (context) {
          let a = context[0].raw - context[1].raw;
          return a == 0
            ? 0
            : ((context[0].raw - context[1].raw) * -1).toLocaleString();
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 16,
          family: 'DB_Helvethaica_X',
          color: '#8E8E8E',
        },
      },
    },
    y: {
      ticks: {
        font: {
          size: 16,
          family: 'DB_Helvethaica_X',
        },
        callback: function (value, index, ticks) {
          return value > 1000000
            ? (value / 1000000).toLocaleString() + 'M'
            : value;
        },
      },
    },
  },
});

onBeforeMount(async () => {
  const config = useRuntimeConfig();
  const urlParams = window.location.pathname.split('/')[2];

  const res = await fetch(
    `${config.public.apiUrl}/project/aggregate/by-budget-year?agencyId=${urlParams}`,
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

    chartData.value = {
      labels: data.yearlyAggregates.map((x) => x.budgetYear.toString()),
      datasets: [
        {
          label: 'วงเงินสัญญารวม (บาท)',
          backgroundColor: '#FFFFFF',
          borderColor: '#000000',
          data: data.yearlyAggregates.map((x) => x.totalContract),
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

    totalContractOverall.value = data.yearlyAggregates.reduce(
      (a, b) => a + b.totalContract,
      0
    );

    totalBudgetOverall.value = q.reduce((a, b) => a + b, 0);

    data.value = data.yearlyAggregates;
    yearList.value = data.yearlyAggregates.map((x) => x.budgetYear.toString());

    setChartData(data.yearlyAggregates);

    isDone.value = true;
  }

  const res2 = await fetch(
    `${config.public.apiUrl}/project/aggregate/by-province?agencyId=${urlParams}`,
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
    const b = mapDataList?.value.map((o) => o.totalBudgetMoney);
    const c = mapDataList?.value.map((o) => o.totalCorruptionProject);

    return selected.value == 'งบประมาณ'
      ? b.reduce((partialSum, a) => partialSum + a, 0)
      : b.reduce((partialSum, a) => partialSum + a, 0);
  }
});

const titleChart = computed(() => {
  if (titleChartSelected.value == 'ความเสี่ยงทุจริต') return 'ความเสี่ยงทุจริต';
  else if (titleChartSelected.value == 'สถานะโครงการล่าสุด')
    return 'สถานะโครงการล่าสุด';
  else return 'วิธีการจัดหา';
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

  onSetChartData('status', data);
  onSetChartData('contract', data);
  onSetChartData('method', data);
};

const onSetChartData = (section: string, data) => {
  if (section == 'status') {
    const projectStatuses = [
      ...new Set(
        data.flatMap((o) => o.aggregateBy.projectStatus).map((o) => o.name)
      ),
    ]; // be ส่งมาเท่าข้อมูลที่มี ถ้าส่งมาหมดก็ไม่ต้อง new set

    const colorProjectStatus = [
      '#0F7979',
      '#6DD5D5',
      '#DADADA',
      '#FF8888',
      '#FF5353',
    ];

    chartDataSet3.value = projectStatuses.map((name, i) => {
      const chartdata = data.map(
        (d) => d.aggregateBy.projectStatus.find((d) => d.name == name).total
      );

      return {
        label: name,
        backgroundColor: colorProjectStatus[i],
        data: data.map(
          (d) => d.aggregateBy.projectStatus.find((d) => d.name == name).total
        ),
        sum: chartdata.reduce((sum, num) => sum + num, 0),
        isChecked: true,
      };
    });
  } else if (section == 'contract') {
    const projectContractStatuses = [
      ...new Set(
        data.flatMap((o) => o.aggregateBy.contractStatus).map((o) => o.name)
      ),
    ];

    const colorContracttStatus = [
      '#054775',
      '#0F7979',
      '#1AA8A8',
      '#6DD5D5',
      '#DADADA',
      '#FF8888',
    ];

    chartDataSet4.value = projectContractStatuses.map((name, i) => {
      const chartdata = data.map(
        (d) => d.aggregateBy.contractStatus.find((d) => d.name == name).total
      );

      return {
        label: name,
        backgroundColor: colorContracttStatus[i],
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
      '#CE5700',
      '#F08C06',
      '#F8B60E',
      '#FEEDAF',
      '#6DD5D5',
      '#2EA0DF',
      '#7051B4',
      '#EF9CC4',
      '#D83D88',
      '#8A004B',
    ];

    const chartData1 = projectResourceMethod
      .map((name, i) => {
        const chartdata = data.map(
          (d) =>
            d.aggregateBy.resourcingMethod.find((d) => d.name == name).total
        );

        return {
          label: name,
          backgroundColor: '',
          sum: chartdata.reduce((sum, num) => sum + num, 0),
          data: chartdata,
          isChecked: true,
        };
      })
      .sort((a, z) => z.sum - a.sum);

    const a = chartData1.slice(0, 9);
    a.forEach((element, i) => {
      element.backgroundColor = colorResourceMethod[i];
    });
    const b = chartData1.slice(9);

    const c = {
      label: 'อื่นๆ',
      backgroundColor: '#5E5E5E',
      data: b.reduce((sum, years) => {
        years.data.forEach((num, i) => {
          sum[i] += num;
        });
        return sum;
      }, new Array(b[0].data.length).fill(0)),
      sum: 0,
      isChecked: true,
    };

    c.sum = c.data.reduce((sum, num) => sum + num, 0);

    a.forEach((element) => {
      chartDataSet5.value.push(element);
    });

    chartDataSet5.value.push(c);
  }
};
</script>

<template>
  <div>
    <h4 class="font-bold text-white mb-5">ภาพรวมโครงการที่จัดทำ</h4>

    <BarChart
      v-if="isDone"
      :yearList="yearList"
      :data="barChartData"
      titleType="1"
      :title="titleChart"
      @isOpen="isOpen = true"
      :section="sectionChart"
    />

    <div class="rounded-10 flex flex-col-mb mb-3">
      <div class="p-7 bg-[#F5F5F5] checkbox-wrapper sm:w-1/3">
        <h4 class="font-black">งบประมาณโครงการ</h4>

        <div class="flex items-center b1 gap-2">
          <div class="h-[1px] w-10 bg-black"></div>
          <div>
            <p>วงเงินสัญญารวม (บาท)</p>
            <p class="font-bold">{{ totalContractOverall.toLocaleString() }}</p>
          </div>
        </div>

        <div class="flex items-center b1 gap-2 text-[#5E5E5E]">
          <div class="h-[1px] w-10 border border-dashed border-[#8E8E8E]"></div>
          <div>
            <p>งบประมาณรวม (บาท)</p>
            <p class="font-bold">{{ totalBudgetOverall.toLocaleString() }}</p>
          </div>
        </div>

        <div class="flex items-center b1 gap-2 text-[#8E8E8E]">
          <div class="h-[15px] w-10 bg-[#DADADA]"></div>
          <div>
            <p>ส่วนต่าง (บาท)</p>
            <p class="font-bold">
              {{ (totalBudgetOverall - totalContractOverall).toLocaleString() }}
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
          <Line
            :data="chartData"
            :options="chartOptions"
            height="300"
            ref="bar"
          />
        </div>

        <p class="text-center b4 font-bold">ปีงบประมาณ</p>
        <p class="text-center b4 font-bold yaxis-text">งบประมาณ (บาท)</p>
      </div>
    </div>

    <div class="rounded-10 flex flex-col-mb mb-3">
      <div class="p-7 bg-[#F5F5F5] checkbox-wrapper sm:w-1/3">
        <h4 class="font-black">การกระจายตัวโครงการ</h4>
        <p class="b1 font-bold">
          รวม {{ totalProjectMap?.toLocaleString() }} บาท ใน
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

        <div class="mt-3">
          <input
            type="checkbox"
            name=""
            id="isRisk"
            class="text-black ring-0"
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
          :no="selected == 'งบประมาณ' ? '1' : '2'"
          :provinces="mapDataList"
          :total="selected == 'งบประมาณ' ? totalBudget : totalCorruptProject"
          v-if="mapDataList != null"
        />

        <div class="absolute w-32 bottom-5 right-5 text-[#8E8E8E]">
          <div class="flex justify-between b4">
            <p>0</p>
            <p>
              {{
                selected == 'งบประมาณ'
                  ? totalBudget.toLocaleString()
                  : totalCorruptProject.toLocaleString()
              }}
            </p>
          </div>
          <div
            class="h-[10px] w-full bg-gradient-to-r from-[#F5F5F5] to-[#484848]"
          ></div>
          <p>หน่วย : {{ selected == 'งบประมาณ' ? 'โครงการ' : 'บาท' }}</p>
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
