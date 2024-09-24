<template>
  <div class="rounded-md flex flex-col-mb mb-3">
    <div class="p-7 bg-[#F5F5F5] checkbox-wrapper sm:w-1/3">
      <h4 class="font-black">พฤติกรรมการเสนอราคา</h4>

      <p class="b1 font-bold">เสนอราคา รวมทุกปี 2,400 โครงการ</p>

      <p class="b4 text-[#8E8E8E] text-right">หน่วย : โครงการ</p>

      <div class="b1">
        <div class="flex justify-between">
          <p>เสนอราคาสูงกว่าราคากลาง</p>
          <p class="font-bold text-[#7051B4]">1,000</p>
        </div>
        <div class="flex justify-between">
          <p>เสนอราคาต่ำกว่าราคากลาง 0-1% (เสนอราคาใกล้ราคากลาง)</p>
          <p class="font-bold text-[#EC7601]">1,000</p>
        </div>
        <div class="flex justify-between">
          <p>เสนอราคาต่ำกว่าราคากลางเกิน 15%</p>
          <p class="font-bold text-[#CE5700]">1,000</p>
        </div>
        <div class="flex justify-between">
          <p>อื่นๆ</p>
          <p class="font-bold text-[#8E8E8E]">1,000</p>
        </div>
      </div>
    </div>
    <div
      class="py-7 pr-7 pl-10 bg-[#FFFFFF] chart-wrapper sm:w-2/3 text-[#8E8E8E] relative"
    >
      <p class="text-center b2">จำนวนโครงการที่เสนอราคาในแต่ละปีงบประมาณ</p>

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

const isOpen = ref(false);

const chartData = ref({
  labels: ['’54', '’55', '’56'],
  datasets: [
    {
      label: 'เสนอราคาสูงกว่าราคากลาง',
      backgroundColor: '#7051B4',
      data: [500, 300, 450],
    },
    {
      label: 'เสนอราคาต่ำกว่าราคากลาง 0-1% (เสนอราคาใกล้ราคากลาง)',
      backgroundColor: '#EC7601',
      data: [100, 0, 0],
    },
    {
      label: 'เสนอราคาต่ำกว่าราคากลางเกิน 15%',
      backgroundColor: '#CE5700',
      data: [250, 250, 300],
    },
    {
      label: 'อื่นๆ',
      backgroundColor: '#C0C0C0',
      data: [150, 50, 100],
    },
  ],
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
          return 'ปี 25' + context[0].label.replace('’', '');
        },
        label: function (context) {
          return context.formattedValue;
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        font: {
          size: 16,
          family: 'DB_Helvethaica_X',
          color: '#8E8E8E',
        },
      },
    },
    y: {
      stacked: true,
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
