<script setup lang="ts">
const config = useRuntimeConfig();

const menu = ref('ทั้งหมด');
const menuList = ref(['ทั้งหมด', 'โครงการฯ', 'หน่วยงานรัฐ', 'ผู้รับจ้าง']);

import type {
  Government,
  Project,
  Contractor,
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

onMounted(async () => {
  const urlParams = decodeURI(window.location.href).split('=')[1];

  const res = await fetch(
    `${config.public.apiUrl}/project/search/summary?keyword=${urlParams}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    summaryData.value = data;
  }

  const res2 = await fetch(
    `${config.public.apiUrl}/project/aggregate/by-budget-year?keyword=${urlParams}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res2.json();
    chartData.value = data;
    setChartData(data.yearlyAggregates);
  }
});

onBeforeMount(async () => {
  await getProjectList('', '');
  await getProjectList('', 'details');
  await getGovList('', '');
  await getGovList('', 'details');
  await getContractorList('', '');
  await getContractorList('', 'details');
});

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

const setChartData = (data) => {
  const dataset_year = data.map((a) => a.budgetYear);
  const dataset1 = data.map((a) => a.aggregateBy.budgetMoney);
  const dataset2 = data.map((a) => a.totalProject);
  const dataset3 = data.map((a) => a.aggregateBy.hasCorruptionRiskProject);
  const dataset4 = data.map((a) => a.aggregateBy.projectStatus);
  const dataset5 = data.map((a) => a.aggregateBy.contractStatus);
  const dataset6 = data.map((a) => a.aggregateBy.resourcingMethod);

  yearList.value = dataset_year;

  chartDataSet1.value.push({
    label: '',
    backgroundColor: '#000000',
    data: dataset1,
  });

  chartDataSet2.value.push(
    {
      label: 'พบความเสี่ยง',
      backgroundColor: onSetColor('พบความเสี่ยง'),
      data: dataset3,
    },
    {
      label: 'ไม่พบความเสี่ยง',
      backgroundColor: onSetColor('ไม่พบความเสี่ยง'),
      data: onSetChartData(dataset2, dataset3),
    }
  );

  dataset4.forEach((element) => {
    element.forEach((element2) => {
      let index = chartDataSet3.value.filter((x) => x.label == element2.name);

      if (index.length == 0) {
        chartDataSet3.value.push({
          label: element2.name,
          backgroundColor: onSetColor(element2.name),
          data: [],
        });
      }
    });
  });

  dataset5.forEach((element) => {
    element.forEach((element2) => {
      let index = chartDataSet4.value.filter((x) => x.label == element2.name);

      if (index.length == 0) {
        chartDataSet4.value.push({
          label: element2.name,
          backgroundColor: onSetColor(element2.name),
          data: [],
        });
      }
    });
  });

  dataset6.forEach((element) => {
    element.forEach((element2) => {
      let index = chartDataSet5.value.filter((x) => x.label == element2.name);

      if (index.length == 0) {
        chartDataSet5.value.push({
          label: element2.name,
          backgroundColor: onSetColor(element2.name),
          data: [],
        });
      }
    });
  });

  console.log(chartDataSet3.value);
  console.log(chartDataSet4.value);
  console.log(chartDataSet5.value);
};

const onSetChartData = (data, data2) => {
  let a = [];

  data.forEach((element, i) => {
    a.push(element - data2[i]);
  });

  return a;
};

const onSetColor = (text: string) => {
  const colorList = [
    {
      name: 'พบความเสี่ยง',
      color: '#EC1C24',
    },
    {
      name: 'ไม่พบความเสี่ยง',
      color: '#000000',
    },
    {
      name: 'แล้วเสร็จตามสัญญา',
      color: '#0F7979',
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
      name: 'ยกเลิกโครงการ',
      color: '#FF5353',
    },
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
      name: 'จัดทำสัญญา/PO แล้ว',
      color: '#6DD5D5',
    },
    {
      name: 'อยู่ระหว่างดำเนินการ',
      color: '#DADADA',
    },
    {
      name: 'ยกเลิกสัญญา',
      color: '#FF8888',
    },
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
      name: 'ประกวดราคาด้วยวิธีการทางอิเล็กทรอนิกส์-โดยผ่านผู้ให้บริการตลาดกลาง',
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

  let selected = colorList.filter((x) => x.name == text);
  return selected[0].color;
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
  <div class="bg-white pt-7">
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
      />
      <ResultGovernment
        v-else-if="menu == 'หน่วยงานรัฐ'"
        :govList="govList"
        @search="getGovList"
      />
      <ResultContractor
        v-else
        :contractorList="contractorList"
        @search="getContractorList"
      />
    </ClientOnly>
    <!-- </div> -->
  </div>
  <Footer />
</template>

<style lang="scss" scoped></style>
