<script setup lang="ts">
import { chartdata } from '~/store/chartData';

const titleChartSelected = ref('ความเสี่ยงทุจริต');
const isOpen = ref(false);
const isOpen2 = ref(false);
const totalContractOverall = ref(0);
const totalBudgetOverall = ref(0);
const data = ref([]);
const yearList = ref([]);
const chartDataSet1 = ref([]);
const chartDataSet2 = ref([]);
const chartDataSet3 = ref([]);
const chartDataSet4 = ref([]);
const chartDataSet5 = ref([]);
const isDone = ref(false);

useFeatureFlags(flags => {
  if (!flags?.SUSPICIOUS_LABEL) {
    titleChartSelected.value = 'สถานะโครงการล่าสุด'
  }
});

const chartData = ref({
  labels: [],
  datasets: [],
});

onBeforeMount(async () => {
  let q = chartdata.value.yearlyAggregates.map(
    (x) => x.aggregateBy.budgetMoney
  );

  chartData.value = {
    labels: chartdata.value.yearlyAggregates.map((x) =>
      x.budgetYear.toString()
    ),
    datasets: [
      {
        label: 'วงเงินสัญญารวม (บาท)',
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        data: chartdata.value.yearlyAggregates.map((x) => x.totalContract),
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

    const grouped = colorProjectStatus.map((c) => {
      return c.name;
    });

    const res = projectStatuses.sort(
      (a, b) => grouped.indexOf(b) - grouped.indexOf(a)
    );

    chartDataSet3.value = res.map((name, i) => {
      const chartdata = data.map(
        (d) => d.aggregateBy.projectStatus.find((d) => d.name == name).total
      );

      let c = colorProjectStatus.filter((x) => x.name == name);

      return {
        label: name as string,
        backgroundColor: c[0].color,
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
        label: name as string,
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
    <BarChart
      v-if="isDone"
      v-model="titleChartSelected"
      hasChooseChartData
      :yearList="yearList"
      :data="barChartData"
      titleType="1"
      titleGov="จำนวนโครงการที่ได้งาน"
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

<style scoped></style>
