<template>
  <div class="rounded-10 flex flex-col-mb mb-3">
    <div class="p-7 bg-[#F5F5F5] checkbox-wrapper sm:w-1/3">
      <h4 class="font-black">
        {{ props.title }}
      </h4>

      <template v-if="props.title == 'งบประมาณ'">
        <p class="b1 font-bold">รวมทุกปีงบประมาณ* {{ setSum() }} บาท</p>
        <p class="b4 text-[#5E5E5E]">
          *ปีงบประมาณ เริ่มนับจาก ต.ค. - ก.ย. เช่น ปีงบประมาณ 2568 หมายถึง ต.ค.
          67 - ก.ย. 68
        </p></template
      >

      <template v-else-if="props.title == 'ความเสี่ยงทุจริต'">
        <p class="b1 font-bold">รวม {{ setSum() }} โครงการ</p>
        <p class="b4 text-[#8E8E8E] text-right">
          หน่วย : โครงการ (%ของโครงการทั้งหมด)
        </p>
        <div
          class="flex gap-2"
          v-for="(item, i) in checkboxList.filter((x) => x.section == 'risk')"
        >
          <input
            type="checkbox"
            :id="`risk-${i + 1}`"
            class="size-5"
            :value="item.isChecked"
            v-model="item.isChecked"
            :style="{ color: item.color }"
            @click="test(i)"
          />
          <label :for="`risk-${i + 1}`" class="b1 flex justify-between w-full"
            ><span>{{ item.name }}</span>
            <span class="text-[#5E5E5E] text-right"
              >x,xxx,xxx,xxx (xx.xx%)</span
            ></label
          >
        </div>
      </template>

      <template v-else-if="props.title == 'วิธีการจัดหา'">
        <p class="b1 font-bold" v-if="props.titleType == '0'">
          รวม xxx,xxx,xxx โครงการ
        </p>
        <p class="b4 text-[#8E8E8E] text-right">
          หน่วย : โครงการ (%ของโครงการทั้งหมด)
        </p>
        <div
          class="flex gap-2"
          v-for="(item, i) in checkboxList.filter((x) => x.section == 'type')"
        >
          <input
            type="checkbox"
            :id="`type-${i + 1}`"
            class="size-5"
            :value="item.isChecked"
            v-model="item.isChecked"
            :style="{ color: item.color }"
            @click="test(i)"
          />
          <label :for="`type-${i + 1}`" class="b1 flex justify-between w-full"
            ><span>{{ item.name }}</span>
            <span class="text-[#5E5E5E] text-right"
              >x,xxx,xxx,xxx (xx.xx%)</span
            ></label
          >
        </div>
      </template>
    </div>
    <div class="py-7 pr-7 pl-10 bg-[#FFFFFF] chart-wrapper sm:w-2/3 relative">
      <p class="yaxis-text">
        {{ props.title == 'งบประมาณ' ? 'ล้านบาท' : 'จำนวนโครงการ' }}
      </p>

      <p class="text-[#8E8E8E] text-center mb-3 b2">
        {{ setChartTitle }}
      </p>

      <div>
        <Bar
          :data="chartData"
          :options="chartOptions"
          height="300"
          ref="chart"
        />
      </div>

      <p class="text-[#8E8E8E] font-bold text-center mt-2">ปีงบประมาณ</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChartComponentRef } from 'vue-chartjs';
import { Bar } from 'vue-chartjs';

const props = defineProps<{
  data: array;
  yearList: array;
  title: string;
  section: string;
}>();

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
      backgroundColor: '#F5F5F5',
      titleColor: '#000',
      bodyColor: '#000',
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
          return 'ปี ' + context[0].label;
        },
        label: function (context) {
          return context.formattedValue + ' บาท';
        },
      },
    },
  },
  scales: {
    x: {
      stacked: props.title == 'งบประมาณ' ? false : true,
      ticks: {
        font: {
          size: 16,
          family: 'DB_Helvethaica_X',
          color: '#8E8E8E',
        },
      },
    },
    y: {
      stacked: props.title == 'งบประมาณ' ? false : true,
      ticks: {
        font: {
          size: 16,
          family: 'DB_Helvethaica_X',
        },
        callback: function (value, index, ticks) {
          if (value > 1000000000)
            return (value / 1000000000).toLocaleString() + 'b';
          else if (value > 1000000)
            return (value / 1000000).toLocaleString() + '';
          else return value;
        },
      },
    },
  },
});

const chart = ref<ChartComponentRef | null>(null);

onBeforeMount(() => {
  chartData.value.labels = props.yearList;
  chartData.value.datasets = props.data;
});

const test = (a) => {
  const aa = chart.value?.chart?.isDatasetVisible(a);

  if (!aa) chart.value?.chart?.show(a);
  else chart.value?.chart?.hide(a);
};

const setChartTitle = computed(() => {
  if (props.title == 'งบประมาณ')
    return 'งบประมาณรวมทุกโครงการในแต่ละปีงบประมาณ';
  else if (props.title == 'ความเสี่ยงทุจริต')
    return 'จำนวนโครงการในแต่ละปีงบประมาณ แบ่งสัดส่วนตามความเสี่ยงทุจริต';
  else if (props.title == 'สถานะโครงการ')
    return 'จำนวนโครงการในแต่ละปีงบประมาณ แบ่งสัดส่วนตามสถานะโครงการล่าสุด*';
  else if (props.title == 'สถานะสัญญา')
    return 'จำนวนโครงการในแต่ละปีงบประมาณ แบ่งสัดส่วนตามสถานะโครงการล่าสุด*';
  else return 'จำนวนโครงการในแต่ละปีงบประมาณ แบ่งสัดส่วนตามวิธีการจัดหา';
});

const setSum = () => {
  //   const data = props.data[0].data;
  //   return [1, 2, 3]
  //     .reduce((partialSum, a) => partialSum + a, 0)
  //     .toLocaleString();
  return 'xxx';
};

const checkboxList = ref([
  {
    name: 'พบความเสี่ยง',
    section: 'risk',
    color: '#EC1C24',
    isChecked: true,
    id: 'hasCorruptionRiskProject',
  },
  {
    name: 'ไม่พบความเสี่ยง',
    section: 'risk',
    color: '#000000',
    isChecked: true,
    id: 'hasNoCorruptionRiskProject',
  },
  {
    name: 'แล้วเสร็จตามสัญญา',
    section: 'status project',
    color: '#0F7979',
    isChecked: true,
    id: 'completed',
  },
  {
    name: 'จัดทำสัญญา/POแล้ว',
    section: 'status project',
    color: '#6DD5D5',
    isChecked: true,
    id: 'contracted',
  },
  {
    name: 'ระหว่างดำเนินการ',
    section: 'status project',
    color: '#DADADA',
    isChecked: true,
    id: 'inprogress',
  },
  {
    name: 'ยกเลิกสัญญา',
    section: 'status project',
    color: '#FF8888',
    isChecked: true,
    id: 'cancelContract',
  },
  {
    name: 'ยกเลิกโครงการ',
    section: 'status project',
    color: '#FF5353',
    isChecked: true,
    id: 'cancelProject',
  },
  {
    name: 'ส่งงานล่าช้ากว่ากำหนด',
    section: 'status contact',
    color: '#054775',
    isChecked: true,
    id: 'delivered',
  },
  {
    name: 'ส่งงานครบถ้วน',
    section: 'status contact',
    color: '#0F7979',
    isChecked: true,
    id: 'deliveredOnTime',
  },
  {
    name: 'ส่งงานตามกำหนด',
    section: 'status contact',
    color: '#1AA8A8',
    isChecked: true,
    id: 'deliveredLate',
  },
  {
    name: 'จัดทำสัญญา/PO แล้ว',
    section: 'status contact',
    color: '#6DD5D5',
    isChecked: true,
    id: 'contracted',
  },
  {
    name: 'อยู่ระหว่างดำเนินการ',
    section: 'status contact',
    color: '#DADADA',
    isChecked: true,
    id: 'inprogress',
  },
  {
    name: 'ยกเลิกสัญญา',
    section: 'status contact',
    color: '#FF8888',
    isChecked: true,
    id: 'cancelContract',
  },
  {
    name: 'ประกวดราคา',
    section: 'type',
    color: '#CE5700',
    isChecked: true,
    id: 'bidding',
  },
  {
    name: 'ประกวดราคานานาชาติ',
    section: 'type',
    color: '#F08C06',
    isChecked: true,
    id: 'internationalBidding',
  },
  {
    name: 'ประกวดราคาอิเล็กทรอนิกส์ (e-bidding)',
    section: 'type',
    color: '#F8B60E',
    isChecked: true,
    id: 'eBidding',
  },
  {
    name: 'ประกวดราคาด้วยวิธีการทางอิเล็กทรอนิกส์-โดยผ่านผู้ให้บริการตลาดกลาง',
    section: 'type',
    color: '#FEEDAF',
    isChecked: true,
    id: 'eBiddingViaMarket',
  },
  {
    name: 'ตกลงราคา',
    section: 'type',
    color: '#6DD5D5',
    isChecked: true,
    id: 'settlePrice',
  },
  {
    name: 'สอบราคา',
    section: 'type',
    color: '#2EA0DF',
    isChecked: true,
    id: 'checkPrice',
  },
  {
    name: 'ตลาดอิเล็กทรอนิกส์ (e-market)',
    section: 'type',
    color: '#7051B4',
    isChecked: true,
    id: 'eMarket',
  },
  {
    name: 'พิเศษ',
    section: 'type',
    color: '#EF9CC4',
    isChecked: true,
    id: 'specialMethod',
  },
  {
    name: 'คัดเลือก',
    section: 'type',
    color: '#D83D88',
    isChecked: true,
    id: 'selective',
  },
  {
    name: 'เฉพาะเจาะจง',
    section: 'type',
    color: '#8A004B',
    isChecked: true,
    id: 'specific',
  },
]);
</script>

<style scoped></style>
