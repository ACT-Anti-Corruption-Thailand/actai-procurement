<template>
  <div class="rounded-10 flex flex-col-mb mb-3">
    <div class="p-7 bg-[#F5F5F5] checkbox-wrapper sm:w-1/3">
      <h4 class="font-black">
        {{ props.titleGov != null ? props.titleGov : title }}
      </h4>
      <p class="text-[#5E5E5E] b4" v-if="title == 'สถานะสัญญา'">
        หมายเหตุ:
        เฉพาะโครงการที่ทำการจัดซื้อจัดจ้างแล้วเท่านั้นจึงจะมีสถานะสัญญา
      </p>

      <template v-if="title == 'งบประมาณ'">
        <p class="b1 font-bold">
          รวมทุกปีงบประมาณ*
          {{ setNumber(total) }}
          บาท
        </p>
        <p class="b4 text-[#5E5E5E]">
          *ปีงบประมาณ เริ่มนับจาก ต.ค. - ก.ย. เช่น ปีงบประมาณ 2568 หมายถึง ต.ค.
          67 - ก.ย. 68
        </p></template
      >

      <template v-else>
        <p class="b1 font-bold">
          <template v-if="props.titleGov == 'วงเงินสัญญา'">
            รวมทุกปี
            {{ selectionTotal.toLocaleString() }}
            บาท*<br />
            <span class="b4 text-[#8E8E8E] font-normal"
              >*หมายเหตุ : วงเงินสัญญาที่แสดงอยู่นี้
              เป็นวงเงินสัญญารวมของโครงการ
              โดยโครงการสามารถมีผู้รับจ้างได้มากกว่า 1 ราย
              จึงมีโอกาสที่วงเงินสัญญาเฉพาะของผู้รับจ้างรายนี้
              จะน้อยกว่าที่แสดงอยู่</span
            >
          </template>
          <template v-else>
            รวม
            {{ selectionTotal.toLocaleString() }}
            {{ title == 'สถานะสัญญา' ? 'สัญญา' : 'โครงการ' }}</template
          >
        </p>

        <RadioGroup
          v-model="title"
          v-if="hasChooseChartData"
          class="b1 w-full radio-btn-chart my-2"
        >
          <RadioGroupLabel>แบ่งสัดส่วนตาม</RadioGroupLabel>
          <RadioGroupOption
            v-if="featureFlags?.SUSPICIOUS_LABEL"
            value="ความเสี่ยงทุจริต"
            class="radio-option option-1"
            :class="
              title == 'ความเสี่ยงทุจริต'
                ? 'bg-[#D9D9D9] '
                : 'text-[#7F7F7F]'
            "          >
            <span>ความเสี่ยงทุจริต</span>
          </RadioGroupOption>
          <RadioGroupOption
            value="สถานะโครงการล่าสุด"
            class="radio-option"
            :class="`${
              title == 'สถานะโครงการล่าสุด'
                ? 'bg-[#D9D9D9]'
                : 'text-[#7F7F7F]'
          } ${featureFlags?.SUSPICIOUS_LABEL ? '' : 'option-1'}`"          >
            <span>สถานะโครงการล่าสุด</span>
          </RadioGroupOption>
          <RadioGroupOption
            value="วิธีการจัดหา"
            class="radio-option"
            :class="
              title == 'วิธีการจัดหา' ? 'bg-[#D9D9D9]' : 'text-[#7F7F7F]'
            "          >
            <span>วิธีการจัดหา</span>
          </RadioGroupOption>
        </RadioGroup>

        <p class="b4 text-[#8E8E8E] text-right">
          <template v-if="props.titleGov == 'วงเงินสัญญา'">
            หน่วย : บาท (% ของวงเงินสัญญาทั้งหมด)
          </template>
          <template v-else>
            หน่วย :
            {{ title == 'สถานะสัญญา' ? 'สัญญา' : 'โครงการ' }} (% ของ{{
              title == 'สถานะสัญญา' ? 'สัญญา' : 'โครงการ'
            }}ทั้งหมด)</template
          >
        </p>

        <div
          class="flex gap-2"
          v-for="(item, i) in props.data.slice().reverse()"
        >
          <input
            type="checkbox"
            :id="`type-${props.section}-${props.data.length - 1 - i}`"
            class="size-5"
            :value="item.isChecked"
            v-model="item.isChecked"
            :style="{ color: item.backgroundColor }"
            @click="onChangeHideShowData(props.data.length - 1 - i)"
          />
          <label
            :for="`type-${props.section}-${props.data.length - 1 - i}`"
            class="b1 flex justify-between w-full"
            ><span class="w-3/5">{{ item.label }}</span>
            <span class="text-[#5E5E5E] text-right"
              >{{ item.sum.toLocaleString() }} ({{
                item.sum != 0 ? setNumber((item.sum / total) * 100) : 0
              }}%)</span
            ></label
          >
        </div>

        <p
          @click="isOpen = true"
          class="b4 flex gap-1 items-center link-1"
          v-if="title == 'ความเสี่ยงทุจริต'"
        >
          <info color="#0B5C90" />
          <span>ACT Ai ตรวจสอบโครงการเสี่ยงอย่างไร ?</span>
        </p>
        <p
          @click="isOpen2 = true"
          class="b4 flex gap-1 items-center link-1"
          v-if="title == 'วิธีการจัดหา'"
        >
          <info color="#0B5C90" />
          <span>ความหมายของแต่ละวิธี</span>
        </p>
      </template>
    </div>
    <div class="py-7 pr-7 pl-10 bg-[#FFFFFF] chart-wrapper sm:w-2/3 relative">
      <p class="yaxis-text">
        <template v-if="title == 'สถานะสัญญา'">สัญญา</template>
        <template v-else>
          {{
            title == 'งบประมาณ' || props.titleGov == 'วงเงินสัญญา'
              ? 'บาท'
              : 'จำนวนโครงการ'
          }}
        </template>
      </p>

      <p class="text-[#8E8E8E] text-center mb-3 b2">
        <template v-if="props.titleGov == 'วงเงินสัญญา'"
          >วงเงินสัญญารวมทุกโครงการในแต่ละปีงบประมาณ</template
        >
        <template
          v-else-if="
            props.titleGov == 'จำนวนโครงการที่ได้งาน' ||
            props.titleGov == 'จำนวนโครงการ'
          "
          >{{ setChartTitleGovContractor }}</template
        >
        <template v-else>
          {{ setChartTitle }}
        </template>
      </p>

      <div>
        <Bar
          :key="chartData.datasets.length"
          :data="chartData"
          :options="chartOptions"
          height="300"
          ref="chart"
        />
      </div>

      <p class="text-[#8E8E8E] font-bold text-center mt-2">ปีงบประมาณ</p>
    </div>

    <Modal
      v-if="isOpen"
      @close="isOpen = false"
      title="ACT Ai ตรวจสอบโครงการเสี่ยงอย่างไร ?"
    />

    <Modal
      v-if="isOpen2"
      @close="isOpen2 = false"
      title="วิธีการจัดหา มีอะไรบ้าง ลักษณะเป็นอย่างไร?"
    />
  </div>
</template>

<script setup lang="ts">
import type { ChartComponentRef } from 'vue-chartjs';
import { Bar } from 'vue-chartjs';
import { RadioGroup, RadioGroupOption, RadioGroupLabel } from '@headlessui/vue';

const props = defineProps<{
  data: unknown[];
  yearList: unknown[];
  titleGov?: string;
  section: string;
  hasChooseChartData?: boolean;
}>();

const title = defineModel<string>({ required: true })

const featureFlags = useFeatureFlags()

const totalByData = ref(0);
const isOpen = ref(false);
const isOpen2 = ref(false);

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
      itemSort: function (a, b) {
        return b.datasetIndex - a.datasetIndex;
      },
      backgroundColor: '#F5F5F5',
      titleColor: '#000',
      bodyColor: '#000',
      titleFont: {
        size: 20,
        family: 'DB_Helvethaica_X',
      },
      titleSpacing: 0,
      titleMarginBottom: 3,
      bodyFont: {
        size: 16,
        family: 'DB_Helvethaica_X',
      },
      padding: 10,
      callbacks: {
        title: function (context) {
          return 'ปี ' + context[0].label;
        },
        afterTitle: function (context) {
          let a = context.map((o) => o.raw);
          let total = a.reduce((a, b) => a + b, 0);
          totalByData.value = total;

          let unit = '';
          if (title.value == 'สถานะสัญญา') unit = ' สัญญา';
          else if (title.value == 'งบประมาณ' || props.titleGov == 'วงเงินสัญญา')
            unit = ' บาท';
          else unit = ' โครงการ';

          if (props.section != 'budget') return total.toLocaleString() + unit;
        },
        label: function (context) {
          if (props.section != 'budget') {
            let total = 0;
            total += context.raw;

            return context.formattedValue == 0
              ? '0'
              : context.formattedValue +
                  ' (' +
                  ((context.raw / totalByData.value) * 100).toLocaleString(
                    undefined,
                    { maximumFractionDigits: 2 }
                  ) +
                  '%)';
          }
        },
      },
    },
  },
  scales: {
    x: {
      stacked: title.value == 'งบประมาณ' ? false : true,
      ticks: {
        font: {
          size: 16,
          family: 'DB_Helvethaica_X',
          color: '#8E8E8E',
        },
      },
    },
    y: {
      stacked: title.value == 'งบประมาณ' ? false : true,
      ticks: {
        precision: 0,
        font: {
          size: 16,
          family: 'DB_Helvethaica_X',
        },
        callback: function (value) {
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
});

const chart = ref<ChartComponentRef | null>(null);

const chartData = computed(() => ({
  labels: props.yearList,
  datasets: props.data
}));


const onChangeHideShowData = (a) => {
  const isShow = chart.value?.chart?.isDatasetVisible(a);

  if (!isShow) chart.value?.chart?.show(a);
  else chart.value?.chart?.hide(a);
};

const setChartTitle = computed(() => {
  if (title.value == 'งบประมาณ')
    return 'งบประมาณรวมทุกโครงการในแต่ละปีงบประมาณ';
  else if (title.value == 'ความเสี่ยงทุจริต')
    return 'จำนวนโครงการในแต่ละปีงบประมาณ แบ่งสัดส่วนตามความเสี่ยงทุจริต';
  else if (title.value == 'สถานะโครงการ')
    return 'จำนวนโครงการในแต่ละปีงบประมาณ แบ่งสัดส่วนตามสถานะโครงการล่าสุด*';
  else if (title.value == 'สถานะสัญญา')
    return 'จำนวนโครงการในแต่ละปีงบประมาณ แบ่งสัดส่วนตามสถานะสัญญาล่าสุด*';
  else return 'จำนวนโครงการในแต่ละปีงบประมาณ แบ่งสัดส่วนตามวิธีการจัดหา';
});

const setChartTitleGovContractor = computed(() => {
  if (title.value == 'ความเสี่ยงทุจริต')
    return 'จำนวนโครงการที่เกิดขึ้นใหม่ในแต่ละปีงบประมาณ แบ่งสัดส่วนตามความเสี่ยงทุจริต';
  if (title.value == 'สถานะโครงการล่าสุด')
    return 'จำนวนโครงการที่เกิดขึ้นใหม่ในแต่ละปีงบประมาณ แบ่งสัดส่วนตามสถานะโครงการล่าสุด*';
  else if (title.value == 'วิธีการจัดหา')
    return 'จำนวนโครงการในแต่ละปีงบประมาณ แบ่งสัดส่วนตามวิธีการจัดหา';
});

const total = computed(() => props.data.reduce<number>((sum, num) => sum + num.sum, 0))

const selectionTotal = computed(() => {
  let b = props.data.filter((data) => data.isChecked);
  return b.reduce<number>((sum, num) => sum + num.sum, 0);
});
</script>

<style scoped lang="scss">
.radio-btn-chart {
  .radio-option {
    padding: 5px;
    border: 1px solid #d9d9d9;
    cursor: pointer;
  }

  .option-1 {
    border-top-right-radius: 10px !important;
    border-top-left-radius: 10px !important;
    border-bottom: transparent !important;
  }

  .radio-option:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top: transparent !important;
  }
}
</style>
