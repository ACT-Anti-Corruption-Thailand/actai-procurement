<template>
  <div class="rounded-10 flex flex-col-mb mb-3">
    <div class="p-7 bg-[#F5F5F5] checkbox-wrapper sm:w-1/3">
      <h4 class="font-black">สัดส่วนขั้นตอนการประมูลงาน</h4>

      <p class="b2">จำนวนโครงการที่ผ่านแต่ละขั้นตอนของการประมูลงานรวมทุกปี</p>

      <div class="flex b1 justify-between text-center mt-2 gap-1">
        <div class="border-r flex-1">
          <div class="w-3 h-3 mx-auto bg-[#DADADA]"></div>
          <p>ซื้อซอง</p>
          <p class="font-bold">{{ totalAuction.toLocaleString() }}</p>
        </div>
        <div class="border-r flex-1">
          <div class="w-3 h-3 mx-auto bg-[#C0C0C0]"></div>
          <p>เสนอราคา</p>
          <p class="font-bold">{{ totalBidding.toLocaleString() }}</p>
        </div>
        <div class="flex-1">
          <div class="w-3 h-3 mx-auto bg-[#2EA0DF]"></div>
          <p>ได้งาน</p>
          <p class="font-bold">{{ totalWinner.toLocaleString() }}</p>
        </div>
      </div>

      <p class="b4">
        *หมายเหตุ: บางวิธีการจัดหาสามารถได้งานโดยไม่ต้องผ่านบางขั้นตอน
        ท่านสามารถตรวจสอบขั้นตอนการประมูลของแต่ละโครงการได้ที่หน้าโครงการจัดซื้อจัดจ้าง
      </p>

      <p
        class="b4 flex gap-1 items-center text-[#0B5C90] duration-300 cursor-pointer"
        @click="isOpen = true"
      >
        <info color="#0B5C90" />
        <span>กราฟนี้บ่งบอกอะไร</span>
      </p>
    </div>
    <div
      class="py-7 pr-7 pl-10 bg-[#FFFFFF] chart-wrapper sm:w-2/3 text-[#8E8E8E] relative"
    >
      <p class="text-center b2">
        จำนวนโครงการที่ผ่านแต่ละขั้นตอนของการประมูลงานในแต่ละปี
      </p>

      <div>
        <Bar :data="chartData" :options="chartOptions" height="300" ref="bar" />
      </div>

      <p class="text-center b4 font-bold">ปีงบประมาณ</p>
      <p class="text-center b4 font-bold yaxis-text">จำนวนโครงการ</p>
    </div>

    <Modal v-if="isOpen" @close="isOpen = false" title="กราฟนี้บ่งบอกอะไร" />
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs';
const config = useRuntimeConfig();

const isOpen = ref(false);
const totalAuction = ref(0);
const totalBidding = ref(0);
const totalWinner = ref(0);

const getChartData = async () => {
  const segments = window.location.href.split('/')[4];

  const res = await fetch(
    `${config.public.apiUrl}/company/${segments}/aggregate/by-budget-year`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    chartData.value = {
      labels: data.yearlyAggregate.map((x) => x.budgetYear.toString()),
      datasets: [
        {
          label: 'ซื้อซอง',
          backgroundColor: '#DADADA',
          data: data.yearlyAggregate.map(
            (x) => x.aggregateBy.biddingProcess.auction
          ),
        },
        {
          label: 'เสนอราคา',
          backgroundColor: '#C0C0C0',
          data: data.yearlyAggregate.map(
            (x) => x.aggregateBy.biddingProcess.bidding
          ),
        },
        {
          label: 'ได้งาน',
          backgroundColor: '#2EA0DF',
          data: data.yearlyAggregate.map(
            (x) => x.aggregateBy.biddingProcess.winner
          ),
        },
      ],
    };

    let a = data.yearlyAggregate.map(
      (x) => x.aggregateBy.biddingProcess.auction
    );
    let b = data.yearlyAggregate.map(
      (x) => x.aggregateBy.biddingProcess.bidding
    );
    let w = data.yearlyAggregate.map(
      (x) => x.aggregateBy.biddingProcess.winner
    );

    totalAuction.value = a.reduce((a, b) => a + b, 0);
    totalBidding.value = b.reduce((a, b) => a + b, 0);
    totalWinner.value = w.reduce((a, b) => a + b, 0);
  }
};

onBeforeMount(async () => {
  await getChartData();
});

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
          return 'ปี ' + context[0].label.replace('’', '');
        },
        label: function (context) {
          return context.formattedValue;
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
          return value > 1000000 ? (value / 1000000).toLocaleString() : value;
        },
      },
    },
  },
});
</script>

<style lang="scss" scoped></style>
