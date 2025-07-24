<script setup lang="ts">
import { chartdata } from '~/store/chartData';

const titleChartSelected = ref('ความเสี่ยงทุจริต');
const isOpen = ref(false);
const isOpen2 = ref(false);
const totalContractOverall = ref(0);
const totalBudgetOverall = ref(0);
const data = ref([]);
const yearList = ref([]);
const chartDataSet2 = ref([]);
const chartDataSet4 = ref([]);
const chartDataSet5 = ref([]);
const isDone = ref(false);

useFeatureFlags(flags => {
  if (!flags?.SUSPICIOUS_LABEL) {
    titleChartSelected.value = 'สถานะโครงการล่าสุด'
  }
});

onBeforeMount(async () => {
  let q = chartdata.value.yearlyAggregates.map(
    (x) => x.contractMoneyAggregateBy.budgetMoney
  );

  totalContractOverall.value = chartdata.value.yearlyAggregates.reduce(
    (a, b) => a + b.totalContract,
    0
  );

  totalBudgetOverall.value = q.reduce((a, b) => a + b, 0);

  data.value = chartdata.value.yearlyAggregates;
  yearList.value = chartdata.value.yearlyAggregates.map((x) =>
    x.budgetYear.toString()
  );

  setChartData(chartdata.value.yearlyAggregates);

  isDone.value = true;
});

const sectionChart = computed(() => {
  if (titleChartSelected.value == 'ความเสี่ยงทุจริต') return 'risk2';
  else if (titleChartSelected.value == 'สถานะโครงการล่าสุด') return 'project2';
  else return 'method2';
});

const barChartData = computed(() => {
  if (titleChartSelected.value == 'ความเสี่ยงทุจริต')
    return chartDataSet2.value;
  else if (titleChartSelected.value == 'สถานะโครงการล่าสุด')
    return chartDataSet4.value;
  else return chartDataSet5.value;
});

const setChartData = (data) => {
  const dataset3 = data.map(
    (a) => a.contractMoneyAggregateBy.hasCorruptionRisk
  );
  const dataset4 = data.map((a) => a.contractMoneyAggregateBy.noCorruptionRisk);

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
      data: dataset4,
      sum: dataset4.reduce((sum, num) => sum + num, 0),
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
        data
          .flatMap((o) => o.contractMoneyAggregateBy.projectStatus)
          .map((o) => o.name)
      ),
    ];

    const colorContractStatus = [
      {
        name: 'แล้วเสร็จตามสัญญา',
        color: '#0F7979',
      },
      {
        name: 'จัดทำสัญญา/PO แล้ว',
        color: '#6DD5D5',
      },
      {
        name: 'ระหว่างดำเนินการ',
        color: '#DADADA',
      },
      {
        name: 'ยกเลิกประกาศเชิญชวน',
        color: '#FFCECE',
      },
      {
        name: 'ยกเลิกสัญญา',
        color: '#FF8888',
      },
      {
        name: 'ยกเลิกโครงการ',
        color: '#FF5353',
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
        (d) =>
          d.contractMoneyAggregateBy.projectStatus.find((d) => d.name == name)
            .total
      );

      let c = colorContractStatus.filter((x) => x.name == name);

      return {
        label: name,
        backgroundColor: c[0].color,
        data: data.map(
          (d) =>
            d.contractMoneyAggregateBy.projectStatus.find((d) => d.name == name)
              .total
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
    <BarChart
      v-if="isDone"
      v-model="titleChartSelected"
      hasChooseChartData
      :yearList="yearList"
      :data="barChartData"
      titleType="1"
      titleGov="วงเงินสัญญา"
      :section="sectionChart"
    />

    <Modal
      v-if="isOpen"
      @close="isOpen = false"
      title="ACT Ai ตรวจสอบโครงการเสี่ยงอย่างไร ?"
    />

    <Modal v-if="isOpen2" @close="isOpen2 = false" title="กราฟนี้บ่งบอกอะไร" />
  </div>
</template>
