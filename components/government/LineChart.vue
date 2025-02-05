<template>
  <div class="max-h-[300px]">
    <Line
      :data="props.data"
      :options="chartOptions"
      height="300"
      width="100%"
      ref="bar"
    />
  </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs';

const props = defineProps<{
  data: array;
}>();

const chartOptions = ref({});

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
          precision: 0,
          font: {
            size: 16,
            family: 'DB_Helvethaica_X',
          },
          callback: function (value, index, ticks) {
            return value > 999999
              ? (value / 1000000).toLocaleString() + 'M'
              : value.toLocaleString();
          },
        },
      },
    },
  };
});

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
    tooltipEl.style.opacity = 0;
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
    bodyLines.forEach((body, i) => {
      const span = document.createElement('div');
      span.style.width = '20px';
      span.style.height = '2px';
      span.style.borderTop =
        i == 0 ? '2px solid #000000' : '2px dashed #BCBCBC';
      span.style.display = 'inline-block';
      span.style.marginBottom = '5px';
      span.style.marginRight = '5px';

      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = 0;

      const td = document.createElement('td');
      td.style.borderWidth = 0;
      td.style.color = i == 0 ? '#000000' : '#7F7F7F';

      let bodyText = parseInt(body.toString().split(': ')[1].replace(/,/g, ''));

      const text = document.createTextNode(setNumber(bodyText).toString());

      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const span2 = document.createElement('div');
    span2.style.width = '20px';
    span2.style.height = '10px';
    span2.style.background = '#DADADA';

    span2.style.display = 'inline-block';
    span2.style.marginRight = '5px';

    const tr2 = document.createElement('tr');
    tr2.style.backgroundColor = 'inherit';
    tr2.style.borderWidth = 0;

    const td2 = document.createElement('td');
    td2.style.borderWidth = 0;
    td2.style.color = '#7F7F7F';

    let bodyText1 =
      parseInt(bodyLines[1].toString().split(': ')[1].replace(/,/g, '')) -
      parseInt(bodyLines[0].toString().split(': ')[1].replace(/,/g, ''));

    const text2 = document.createTextNode(setNumber(bodyText1).toString());

    td2.appendChild(span2);
    td2.appendChild(text2);
    tr2.appendChild(td2);
    tableBody.appendChild(tr2);

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
</script>

<style scoped></style>
