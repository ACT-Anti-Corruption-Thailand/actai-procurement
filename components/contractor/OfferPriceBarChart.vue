<template>
  <div class="rounded-10 flex flex-col-mb mb-3">
    <div class="p-7 bg-[#F5F5F5] checkbox-wrapper sm:w-1/3">
      <h4 class="font-black">พฤติกรรมการเสนอราคา</h4>

      <p class="b1 font-bold">
        เสนอราคา รวมทุกปี
        {{
          (
            totalCloseToEstimatePrice +
            totalHigherThanEstimatePrice +
            totalLowerThanEstimatePrice +
            totalOther
          ).toLocaleString()
        }}
        โครงการ
      </p>

      <p class="b4 text-[#8E8E8E] text-right">หน่วย : โครงการ</p>

      <div class="b1">
        <div class="flex justify-between gap-2 border-b border-[#DADADA] pb-2">
          <div class="flex gap-2">
            <svg
              class="w-3 mt-2"
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 0L10 8.66025H0L5 0Z" fill="#7051B4" />
            </svg>
            <p>เสนอราคาสูงกว่าราคากลาง</p>
          </div>
          <p class="font-bold text-[#7051B4]">
            {{ totalHigherThanEstimatePrice.toLocaleString() }}
          </p>
        </div>
        <div class="flex justify-between gap-2 border-b border-[#DADADA] py-2">
          <div class="flex gap-2">
            <svg
              class="w-4 mt-2"
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.55771 2.34534C1.99138 2.34534 1.52662 2.45614 1.16343 2.67775C0.806402 2.89935 0.41859 3.24715 0 3.72114V1.16343C0.387812 0.818713 0.784857 0.538627 1.19114 0.323176C1.59741 0.107725 2.06217 0 2.58541 0C3.18867 0 4.01354 0.236996 5.06002 0.710988C6.11265 1.18498 6.86365 1.42198 7.31302 1.42198C7.84241 1.42198 8.33179 1.29886 8.78116 1.05263C9.23669 0.806402 9.64297 0.470914 10 0.0461681V2.66851C9.77839 2.89012 9.49215 3.09634 9.14127 3.28717C8.56263 3.60726 7.98092 3.76731 7.39612 3.76731C6.7867 3.76731 5.95876 3.53032 4.91228 3.05632C3.87196 2.58233 3.0871 2.34534 2.55771 2.34534ZM2.55771 6.5928C1.99138 6.5928 1.53278 6.69437 1.1819 6.89751C0.831025 7.09449 0.437058 7.44537 0 7.95014V5.38319C0.412435 5.00154 0.80948 4.7153 1.19114 4.52447C1.57279 4.33364 2.03755 4.23515 2.58541 4.22899C3.19483 4.22899 4.02278 4.46599 5.06925 4.93998C6.12188 5.41397 6.86981 5.65097 7.31302 5.65097C7.98399 5.65097 8.61804 5.4386 9.21514 5.01385C9.51677 4.79224 9.77839 4.54294 10 4.26593V6.89751C9.70452 7.1622 9.37827 7.38689 9.02124 7.57156C8.47953 7.84857 7.93783 7.98707 7.39612 7.98707C6.76824 7.98707 5.94644 7.75623 4.93075 7.29455C3.92121 6.82672 3.13019 6.5928 2.55771 6.5928Z"
                fill="#EC7601"
              />
            </svg>

            <p>เสนอราคาต่ำกว่าราคากลาง 0-1% (เสนอราคาใกล้ราคากลาง)</p>
          </div>
          <p class="font-bold text-[#EC7601]">
            {{ totalCloseToEstimatePrice.toLocaleString() }}
          </p>
        </div>
        <div class="flex justify-between gap-2 border-b border-[#DADADA] py-2">
          <div class="flex gap-2">
            <svg
              class="w-3 mt-2"
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 8.66016L10 -9.82285e-05H0L5 8.66016Z"
                fill="#CE5700"
              />
            </svg>

            <p>เสนอราคาต่ำกว่าราคากลางเกิน 15%</p>
          </div>
          <p class="font-bold text-[#CE5700]">
            {{ totalLowerThanEstimatePrice.toLocaleString() }}
          </p>
        </div>
        <div class="flex justify-between gap-2 pt-2">
          <div class="flex gap-2">
            <svg
              class="w-3 mt-2"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="10" height="10" fill="#C0C0C0" />
            </svg>

            <p>อื่นๆ</p>
          </div>
          <p class="font-bold text-[#8E8E8E]">
            {{ totalOther.toLocaleString() }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="py-7 pr-7 pl-10 bg-[#FFFFFF] chart-wrapper sm:w-2/3 text-[#8E8E8E] relative"
    >
      <p class="text-center b2">จำนวนโครงการที่เสนอราคาในแต่ละปีงบประมาณ</p>

      <div class="max-h-[300px]">
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
const totalCloseToEstimatePrice = ref(0);
const totalHigherThanEstimatePrice = ref(0);
const totalLowerThanEstimatePrice = ref(0);
const totalOther = ref(0);

const chartData = ref({
  labels: [],
  datasets: [],
});

const chartOptions = ref({});

const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.fontFamily = 'DB_Helvethaica_X';
    tooltipEl.style.zIndex = '1';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';
    tooltipEl.className = 'popup-custom';

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 1;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b) => b.lines);

    const tableHead = document.createElement('thead');

    titleLines.forEach((title) => {
      const tr = document.createElement('tr');
      tr.style.borderWidth = 0;
      tr.style.padding = 0;

      const th = document.createElement('th');
      th.style.borderWidth = 0;

      const text = document.createTextNode('ปี ' + title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');

    let x = 0;

    bodyLines.forEach((body, i) => {
      let bodyText = body.toString().split(': ')[1];
      x += parseInt(bodyText);
    });

    const tr2 = document.createElement('tr');
    tr2.style.backgroundColor = 'inherit';
    tr2.style.borderWidth = 0;

    const td2 = document.createElement('td');
    td2.style.borderWidth = 0;
    td2.style.whiteSpace = 'nowrap';

    const text2 = document.createTextNode(
      x.toLocaleString().toString() + ' โครงการ'
    );

    td2.appendChild(text2);
    tr2.appendChild(td2);
    tableBody.appendChild(tr2);

    bodyLines.forEach((body, i) => {
      const span = document.createElement('div');
      span.style.width = '10px';
      span.style.height = '10px';
      span.classList.add('icon' + (i + 1));
      span.style.marginRight = '5px';
      span.style.display = 'inline-block';

      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = 0;

      const td = document.createElement('td');
      td.style.borderWidth = 0;
      td.style.color = i == 0 ? '#000000' : '#7F7F7F';

      let bodyText = body.toString().split(': ')[1];
      const text = document.createTextNode(bodyText);
      x += parseInt(bodyText);

      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding =
    tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

onMounted(async () => {
  chartOptions.value = {
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
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
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
          precision: 0,
          font: {
            size: 16,
            family: 'DB_Helvethaica_X',
          },
          callback: function (value, index, ticks) {
            if (value > 1000000000)
              return (
                (value / 1000000000).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                }) + 'B'
              );
            else if (value > 999999)
              return (
                (value / 1000000).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                }) + 'M'
              );
            else return value.toLocaleString();
          },
        },
      },
    },
  };
});

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
          label: 'เสนอราคาสูงกว่าราคากลาง',
          backgroundColor: '#7051B4',
          data: data.yearlyAggregate.map(
            (x) => x.aggregateBy.biddingBehavior.higherThanEstimatePrice
          ),
        },
        {
          label: 'เสนอราคาต่ำกว่าราคากลาง 0-1% (เสนอราคาใกล้ราคากลาง)',
          backgroundColor: '#EC7601',
          data: data.yearlyAggregate.map(
            (x) => x.aggregateBy.biddingBehavior.closeToEstimatePrice
          ),
        },
        {
          label: 'เสนอราคาต่ำกว่าราคากลางเกิน 15%',
          backgroundColor: '#CE5700',
          data: data.yearlyAggregate.map(
            (x) => x.aggregateBy.biddingBehavior.lowerThanEstimatePrice
          ),
        },
        {
          label: 'อื่นๆ',
          backgroundColor: '#C0C0C0',
          data: data.yearlyAggregate.map(
            (x) => x.aggregateBy.biddingBehavior.other
          ),
        },
      ],
    };

    let h = data.yearlyAggregate.map(
      (x) => x.aggregateBy.biddingBehavior.higherThanEstimatePrice
    );
    let c = data.yearlyAggregate.map(
      (x) => x.aggregateBy.biddingBehavior.closeToEstimatePrice
    );
    let l = data.yearlyAggregate.map(
      (x) => x.aggregateBy.biddingBehavior.lowerThanEstimatePrice
    );
    let o = data.yearlyAggregate.map(
      (x) => x.aggregateBy.biddingBehavior.other
    );

    totalHigherThanEstimatePrice.value = h.reduce((a, b) => a + b, 0);
    totalCloseToEstimatePrice.value = c.reduce((a, b) => a + b, 0);
    totalLowerThanEstimatePrice.value = l.reduce((a, b) => a + b, 0);
    totalOther.value = o.reduce((a, b) => a + b, 0);
  }
};

onBeforeMount(async () => {
  await getChartData();
});
</script>

<style lang="scss" scoped></style>
