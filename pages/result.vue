<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();

const menu = ref('ทั้งหมด');
const menuList = ref(['ทั้งหมด', 'โครงการฯ', 'หน่วยงานรัฐ', 'ผู้รับจ้าง']);

import type {
  Government,
  Project,
  Contractor,
  MapData,
} from '../public/src/data/search_result';

const iconGuide = ref({
  name: '',
  province: '= ที่ตั้ง',
  year: '= ปีงบประมาณ (วันที่ประกาศโครงการ)',
  owner: '= หน่วยงานรัฐ',
  no: '= เลขที่โครงการ',
});

const mockDataGuide = ref({
  name: '',
  province: 'แพร่',
  year: '2567 (10/11/2567)',
  owner: 'สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน',
  no: '56015020021',
});

const summaryData = ref(null);
const chartData = ref(null);
const yearList = ref([]);
const chartDataSet1 = ref([]);
const chartDataSet2 = ref([]);
const chartDataSet3 = ref([]);
const chartDataSet4 = ref([]);
const chartDataSet5 = ref([]);
const keyword = ref(null);
const projectListAll = ref<Project | null>(null);
const projectList = ref<Project | null>(null);
const govListAll = ref<Government | null>(null);
const govList = ref<Government | null>(null);
const contractorListAll = ref<Contractor | null>(null);
const contractorList = ref<Contractor | null>(null);
const mapDataList = ref<MapData | null>(null);
const filterListProject = ref({});
const filterListGovernment = ref({});
const filterListContractor = ref({});

onBeforeMount(async () => {
  // await getProjectList('', '');
  await getProjectList('&sortBy=relevanceScore&sortOrder=desc', 'details');
  // await getGovList('', '');
  await getGovList('&sortBy=relevanceScore&sortOrder=desc', 'details');
  // await getContractorList('', '');
  await getContractorList('&sortBy=relevanceScore&sortOrder=desc', 'details');
  // await getMapData();
  getFilter();
});

const getFilter = async () => {
  const res = await fetch(`${config.public.apiUrl}/project/search/filters`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    const data = await res.json();
    filterListProject.value = data;
  }

  const res2 = await fetch(`${config.public.apiUrl}/agency/search/filters`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res2.ok) {
    const data = await res2.json();
    filterListGovernment.value = data;
  }

  const res3 = await fetch(`${config.public.apiUrl}/company/search/filters`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res3.ok) {
    const data = await res3.json();
    filterListContractor.value = data;
  }
};

const getProjectList = async (params: string, section: string) => {
  const urlParams = decodeURI(window.location.href).split('=')[1];
  const p = params != null ? params : '';

  const res = await fetch(
    `${config.public.apiUrl}/project/search?keyword=${urlParams}${p}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();

    if (section == 'details')
      projectList.value = JSON.parse(JSON.stringify(data)) || [];
    else projectListAll.value = JSON.parse(JSON.stringify(data)) || [];
  }

  const res2 = await fetch(
    `${config.public.apiUrl}/project/search/summary?keyword=${urlParams}${p}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res2.ok) {
    const data = await res2.json();
    summaryData.value = data;
  }

  const res3 = await fetch(
    `${config.public.apiUrl}/project/aggregate/by-budget-year?keyword=${urlParams}${p}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res3.ok) {
    const data = await res3.json();
    chartData.value = data;
    setChartData(data.yearlyAggregates);
  }
};

const getGovList = async (params: string, section: string) => {
  const urlParams = decodeURI(window.location.href).split('=')[1];
  const p = params != null ? params : '';

  const res = await fetch(
    `${config.public.apiUrl}/agency/search?keyword=${urlParams}${p}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    if (section == 'details')
      govList.value = JSON.parse(JSON.stringify(data)) || [];
    else govListAll.value = JSON.parse(JSON.stringify(data)) || [];
  }
};

const getContractorList = async (params: string, section: string) => {
  const urlParams = decodeURI(window.location.href).split('=')[1];
  const p = params != null ? params : '';

  const res = await fetch(
    `${config.public.apiUrl}/company/search?keyword=${urlParams}${p}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    if (section == 'details')
      contractorList.value = JSON.parse(JSON.stringify(data)) || [];
    else contractorListAll.value = JSON.parse(JSON.stringify(data)) || [];
  }
};

const getMapData = async () => {
  const urlParams = decodeURI(window.location.href).split('=')[1];

  const res = await fetch(
    `${config.public.apiUrl}/project/aggregate/by-province?keyword=${urlParams}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    mapDataList.value = data.provinces;
  }
};

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
      (a, b) => grouped.indexOf(a) - grouped.indexOf(b)
    );

    chartDataSet3.value = res.map((name, i) => {
      const chartdata = data.map(
        (d) => d.aggregateBy.projectStatus.find((d) => d.name == name).total
      );

      let c = colorProjectStatus.filter((x) => x.name == name);

      return {
        label: name,
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
        color: '#0F7979',
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
      (a, b) => grouped.indexOf(a) - grouped.indexOf(b)
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

    let others = projectResourceMethod.filter((val) => !grouped.includes(val));

    let chartData1 = grouped.map((name, i) => {
      const chartdata = data.map(
        (d) => d.aggregateBy.resourcingMethod.find((d) => d.name == name).total
      );

      return {
        label: name,
        backgroundColor: colorResourceMethod[i].color,
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

    chartData1.forEach((element) => {
      chartDataSet5.value.push(element);
    });

    chartDataSet5.value.push(c);
  }
};
</script>

<template>
  <Header />
  <div class="overflow-auto bg-[#333333]">
    <div
      class="p-4 flex gap-2 mx-auto sm:justify-center w-[450px] sm:w-[700px]"
    >
      <div
        class="menu-btn text-white"
        :class="{ active: menu == item }"
        @click="menu = item"
        v-for="(item, i) in menuList"
        :key="i"
      >
        <h5 class="b1 sm:text-[28px]">{{ item }}</h5>
      </div>
    </div>
  </div>
  <div class="p-3 bg-[#F5F5F5]">
    <div class="max-w-6xl mx-auto flex items-center gap-2">
      <info color="#000000" class="" />
      <p class="b4 flex-1">
        ผลลัพธ์จากการค้นหาและประมวลผลของ ACT Ai
        อาจมีข้อจำกัดจากคุณภาพของข้อมูลจากหน่วยงานภาครัฐ เพื่อความถูกต้อง
        โปรดตรวจสอบข้อมูลจากเว็บไซต์ของหน่วยงานภาครัฐอีกครั้งก่อนนำไปใช้อ้างอิง
      </p>
    </div>
  </div>
  <div class="bg-white py-7">
    <!-- <div class="mx-auto max-w-6xl"> -->
    <ClientOnly fallback-tag="span" fallback="Loading...">
      <ResultAll
        v-if="menu == 'ทั้งหมด'"
        @changeMenu="(n) => (menu = n)"
        :iconGuide="iconGuide"
        :mockDataGuide="mockDataGuide"
        :projectList="projectListAll"
        :govList="govListAll"
        :contractorList="contractorListAll"
      />
      <ResultProjectList
        v-else-if="menu == 'โครงการฯ'"
        @search="getProjectList"
        :iconGuide="iconGuide"
        :mockDataGuide="mockDataGuide"
        :data="summaryData"
        :projectList="projectList"
        :yearList="yearList"
        :chartDataSet1="chartDataSet1"
        :chartDataSet2="chartDataSet2"
        :chartDataSet3="chartDataSet3"
        :chartDataSet4="chartDataSet4"
        :chartDataSet5="chartDataSet5"
        :mapData="mapDataList"
        :filterListProject="filterListProject"
      />
      <ResultGovernment
        v-else-if="menu == 'หน่วยงานรัฐ'"
        :govList="govList"
        @search="getGovList"
        :filterListGovernment="filterListGovernment"
      />
      <ResultContractor
        v-else
        :contractorList="contractorList"
        @search="getContractorList"
        :filterListContractor="filterListContractor"
      />
    </ClientOnly>
    <!-- </div> -->
  </div>
  <Footer />
</template>

<style lang="scss" scoped></style>
