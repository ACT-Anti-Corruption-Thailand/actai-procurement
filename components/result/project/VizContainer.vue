<script setup lang="ts">
import type { ChartDataSet, ProjectListSummaryData } from "~/models/data";
import type { MapData } from "~/public/src/data/search_result";
const props = defineProps<{
  searchParams: string;
}>();
const featureFlags = useFeatureFlags();
const summaryData = ref<ProjectListSummaryData>();
const chartData = ref(null);
const yearList = ref([]);
const chartDataSet1 = ref<ChartDataSet[]>([]);
const chartDataSet2 = ref<ChartDataSet[]>([]);
const chartDataSet3 = ref<ChartDataSet[]>([]);
const chartDataSet4 = ref<ChartDataSet[]>([]);
const chartDataSet5 = ref<ChartDataSet[]>([]);
const mapDataList = ref<MapData | null>(null);
const route = useRoute();
const isLoadingChartData = ref(true);
const isLoadingSummaryList = ref(true);
const isLoadingMapData = ref(true);

onBeforeMount(async () => {
  await fetchData(props.searchParams);
});

const fetchData = async (params: string) => {
  const data = await getProjectChartDataList(
    params,
    String(route.query.search)
  );
  chartData.value = data;
  if (data.yearlyAggregates.length > 0) setChartData(data.yearlyAggregates);
  isLoadingChartData.value = false;

  summaryData.value = await getProjectSummaryList(
    params,
    String(route.query.search)
  );
  isLoadingSummaryList.value = false;

  mapDataList.value = await getMapData(params, String(route.query.search));
  isLoadingMapData.value = false;
};

watch(
  () => props.searchParams,
  async (newParams) => {
    isLoadingChartData.value = true;
    isLoadingSummaryList.value = true;
    isLoadingMapData.value = true;
    await fetchData(newParams);
  }
);

const setChartData = (data) => {
  chartDataSet1.value = [];
  chartDataSet2.value = [];
  chartDataSet3.value = [];
  chartDataSet4.value = [];
  chartDataSet5.value = [];

  const dataset_year = data.map((a) => a.budgetYear);
  const dataset1 = data.map((a) => a.aggregateBy.budgetMoney);
  const dataset2 = data.map((a) => a.totalProject);
  const dataset3 = data.map((a) => a.aggregateBy.hasCorruptionRiskProject);

  yearList.value = dataset_year;

  chartDataSet1.value.push({
    label: "",
    backgroundColor: "#000000",
    data: dataset1,
    sum: dataset1.reduce((sum, num) => sum + num, 0),
  });

  let a = [];

  dataset2.forEach((element, i) => {
    a.push(element - dataset3[i]);
  });

  chartDataSet2.value.push(
    {
      label: "ไม่พบความเสี่ยง",
      backgroundColor: "#000000",
      data: a,
      sum: a.reduce((sum, num) => sum + num, 0),
      isChecked: true,
    },
    {
      label: "พบความเสี่ยง",
      backgroundColor: "#EC1C24",
      data: dataset3,
      sum: dataset3.reduce((sum, num) => sum + num, 0),
      isChecked: true,
    }
  );

  onSetChartData("status", data);
  onSetChartData("contract", data);
  onSetChartData("method", data);
};

const onSetChartData = (section: string, data) => {
  if (section == "status") {
    const projectStatuses = [
      ...new Set(
        data.flatMap((o) => o.aggregateBy.projectStatus).map((o) => o.name)
      ),
    ]; // be ส่งมาเท่าข้อมูลที่มี ถ้าส่งมาหมดก็ไม่ต้อง new set

    const colorProjectStatus = [
      {
        name: "แล้วเสร็จตามสัญญา",
        color: "#0F7979",
      },
      {
        name: "จัดทำสัญญา/PO แล้ว",
        color: "#6DD5D5",
      },
      {
        name: "ระหว่างดำเนินการ",
        color: "#DADADA",
      },
      {
        name: "ยกเลิกประกาศเชิญชวน",
        color: "#FFCECE",
      },
      {
        name: "ยกเลิกสัญญา",
        color: "#FF8888",
      },
      {
        name: "ยกเลิกโครงการ",
        color: "#FF5353",
      },
      {
        name: "สิ้นสุดสัญญา",
        color: "#EC1C24",
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
  } else if (section == "contract") {
    const projectContractStatuses = [
      ...new Set(
        data.flatMap((o) => o.aggregateBy.contractStatus).map((o) => o.name)
      ),
    ];

    const colorContractStatus = [
      {
        name: "ส่งงานล่าช้ากว่ากำหนด",
        color: "#054775",
      },
      {
        name: "ส่งงานครบถ้วน",
        color: "#0F7979",
      },
      {
        name: "ส่งงานตามกำหนด",
        color: "#1AA8A8",
      },
      {
        name: "จัดทำสัญญา/POแล้ว",
        color: "#6DD5D5",
      },
      {
        name: "ระหว่างดำเนินการ",
        color: "#DADADA",
      },
      {
        name: "ยกเลิกสัญญา",
        color: "#FF8888",
      },
      {
        name: "สิ้นสุดสัญญา",
        color: "#EC1C24",
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
        name: "ประกวดราคา",
        color: "#CE5700",
      },
      {
        name: "ประกวดราคานานาชาติ",
        color: "#F08C06",
      },
      {
        name: "ประกวดราคาอิเล็กทรอนิกส์ (e-bidding)",
        color: "#F8B60E",
      },
      {
        name: "ประกวดราคาด้วยวิธีการทางอิเล็กทรอนิกส์โดยผ่านผู้ให้บริการตลาดกลาง",
        color: "#FEEDAF",
      },
      {
        name: "ตกลงราคา",
        color: "#6DD5D5",
      },
      {
        name: "สอบราคา",
        color: "#2EA0DF",
      },
      {
        name: "ตลาดอิเล็กทรอนิกส์ (e-market)",
        color: "#7051B4",
      },
      {
        name: "พิเศษ",
        color: "#EF9CC4",
      },
      {
        name: "คัดเลือก",
        color: "#D83D88",
      },
      {
        name: "เฉพาะเจาะจง",
        color: "#8A004B",
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
      label: "อื่นๆ",
      backgroundColor: "#DADADA",
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
  <div class="max-w-6xl mx-auto">
    <BarChart
      :data="chartDataSet1"
      :yearList="yearList"
      modelValue="งบประมาณ"
      id="chart-1"
      section="budget"
      v-if="chartDataSet1.length > 0"
    />

    <BarChart
      :data="chartDataSet2"
      :yearList="yearList"
      modelValue="ความเสี่ยงทุจริต"
      id="chart-2"
      section="risk"
      v-if="featureFlags?.SUSPICIOUS_LABEL && chartDataSet2.length > 0"
    />

    <BarChart
      :data="chartDataSet3"
      :yearList="yearList"
      modelValue="สถานะโครงการ"
      id="chart-3"
      section="project"
      v-if="chartDataSet3.length > 0"
    />

    <BarChart
      :data="chartDataSet4"
      :yearList="yearList"
      modelValue="สถานะสัญญา"
      id="chart-4"
      section="contract"
      v-if="chartDataSet4.length > 0"
    />

    <BarChart
      :data="chartDataSet5"
      :yearList="yearList"
      modelValue="วิธีการจัดหา"
      id="chart-5"
      section="method"
      v-if="chartDataSet5.length > 0"
    />

    <MapSection
      class="mt-5"
      id="maps"
      :data="mapDataList"
      v-if="mapDataList != null && summaryData!.totalProject != 0"
    />
  </div>
</template>
