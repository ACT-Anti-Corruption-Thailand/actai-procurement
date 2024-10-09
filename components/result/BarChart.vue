<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';

const props = defineProps<{
  title: string;
  data: object;
  titleType: string;
}>();

const maxVal = ref(0);
const grid = ref([]);

const checkboxList = ref([
  {
    name: 'พบความเสี่ยง',
    section: 'risk',
    color: '#EC1C24',
    isChecked: true,
    id: 'hasCorruptionRiskProject',
  },
  {
    name: 'ไม่พบความเสี่ยง',
    section: 'risk',
    color: '#000000',
    isChecked: true,
    id: 'hasNoCorruptionRiskProject',
  },
  {
    name: 'แล้วเสร็จตามสัญญา',
    section: 'status project',
    color: '#0F7979',
    isChecked: true,
    id: 'completed',
  },
  {
    name: 'จัดทำสัญญา/POแล้ว',
    section: 'status project',
    color: '#6DD5D5',
    isChecked: true,
    id: 'contracted',
  },
  {
    name: 'ระหว่างดำเนินการ',
    section: 'status project',
    color: '#DADADA',
    isChecked: true,
    id: 'inprogress',
  },
  {
    name: 'ยกเลิกสัญญา',
    section: 'status project',
    color: '#FF8888',
    isChecked: true,
    id: 'cancelContract',
  },
  {
    name: 'ยกเลิกโครงการ',
    section: 'status project',
    color: '#FF5353',
    isChecked: true,
    id: 'cancelProject',
  },
  {
    name: 'ส่งงานล่าช้ากว่ากำหนด',
    section: 'status contact',
    color: '#054775',
    isChecked: true,
    id: 'delivered',
  },
  {
    name: 'ส่งงานครบถ้วน',
    section: 'status contact',
    color: '#0F7979',
    isChecked: true,
    id: 'deliveredOnTime',
  },
  {
    name: 'ส่งงานตามกำหนด',
    section: 'status contact',
    color: '#1AA8A8',
    isChecked: true,
    id: 'deliveredLate',
  },
  {
    name: 'จัดทำสัญญา/PO แล้ว',
    section: 'status contact',
    color: '#6DD5D5',
    isChecked: true,
    id: 'contracted',
  },
  {
    name: 'อยู่ระหว่างดำเนินการ',
    section: 'status contact',
    color: '#DADADA',
    isChecked: true,
    id: 'inprogress',
  },
  {
    name: 'ยกเลิกสัญญา',
    section: 'status contact',
    color: '#FF8888',
    isChecked: true,
    id: 'cancelContract',
  },
  {
    name: 'ประกวดราคา',
    section: 'type',
    color: '#CE5700',
    isChecked: true,
    id: 'bidding',
  },
  {
    name: 'ประกวดราคานานาชาติ',
    section: 'type',
    color: '#F08C06',
    isChecked: true,
    id: 'internationalBidding',
  },
  {
    name: 'ประกวดราคาอิเล็กทรอนิกส์ (e-bidding)',
    section: 'type',
    color: '#F8B60E',
    isChecked: true,
    id: 'eBidding',
  },
  {
    name: 'ประกวดราคาด้วยวิธีการทางอิเล็กทรอนิกส์-โดยผ่านผู้ให้บริการตลาดกลาง',
    section: 'type',
    color: '#FEEDAF',
    isChecked: true,
    id: 'eBiddingViaMarket',
  },
  {
    name: 'ตกลงราคา',
    section: 'type',
    color: '#6DD5D5',
    isChecked: true,
    id: 'settlePrice',
  },
  {
    name: 'สอบราคา',
    section: 'type',
    color: '#2EA0DF',
    isChecked: true,
    id: 'checkPrice',
  },
  {
    name: 'ตลาดอิเล็กทรอนิกส์ (e-market)',
    section: 'type',
    color: '#7051B4',
    isChecked: true,
    id: 'eMarket',
  },
  {
    name: 'พิเศษ',
    section: 'type',
    color: '#EF9CC4',
    isChecked: true,
    id: 'specialMethod',
  },
  {
    name: 'คัดเลือก',
    section: 'type',
    color: '#D83D88',
    isChecked: true,
    id: 'selective',
  },
  {
    name: 'เฉพาะเจาะจง',
    section: 'type',
    color: '#8A004B',
    isChecked: true,
    id: 'specific',
  },
]);

const chart = computed(() => {
  let data = [];

  if (props.title == 'งบประมาณ') {
    props.data.forEach((element) => {
      data.push({
        year: element.budgetYear.substring(2, 4),
        total: element.aggregateBy.budgetMoney,
      });
    });

    maxVal.value = Math.max(...data.map((o) => o.total));

    grid.value = [120, 100, 80, 60, 40, 20];
  } else if (props.title == 'ความเสี่ยงทุจริต') {
    props.data.forEach((element) => {
      data.push({
        year: element.budgetYear.substring(2, 4),
        hasCorruptionRiskProject: element.aggregateBy.hasCorruptionRiskProject,
        hasNoCorruptionRiskProject:
          element.aggregateBy.hasNoCorruptionRiskProject,
      });
    });

    maxVal.value = Math.max(
      ...data.map(
        (o) => o.hasCorruptionRiskProject + o.hasNoCorruptionRiskProject
      )
    );

    grid.value = [30, 20, 10];
  } else if (props.title == 'สถานะโครงการ') {
    props.data.forEach((element) => {
      data.push({
        year: element.budgetYear.substring(2, 4),
        completed: element.aggregateBy.projectStatus.completed,
        contracted: element.aggregateBy.projectStatus.contracted,
        inprogress: element.aggregateBy.projectStatus.inprogress,
        cancelContract: element.aggregateBy.projectStatus.cancelContract,
        cancelProject: element.aggregateBy.projectStatus.cancelProject,
      });
    });

    maxVal.value = Math.max(
      ...data.map(
        (o) =>
          o.completed +
          o.contracted +
          o.inprogress +
          o.cancelContract +
          o.cancelProject
      )
    );

    grid.value = [100, 80, 60, 40, 20];
  } else if (props.title == 'สถานะสัญญา') {
    props.data.forEach((element) => {
      data.push({
        year: element.budgetYear.substring(2, 4),
        delivered: element.aggregateBy.contractStatus.delivered,
        deliveredOnTime: element.aggregateBy.contractStatus.deliveredOnTime,
        deliveredLate: element.aggregateBy.contractStatus.deliveredLate,
        contracted: element.aggregateBy.contractStatus.contracted,
        inprogress: element.aggregateBy.contractStatus.inprogress,
        cancelContract: element.aggregateBy.contractStatus.cancelContract,
      });
    });

    // maxVal.value = Math.max(
    //   ...data.map(
    //     (o) =>
    //       o.delivered +
    //       o.deliveredOnTime +
    //       o.deliveredLate +
    //       o.contracted +
    //       o.inprogress +
    //       o.cancelContract
    //   )
    // );

    maxVal.value = 80;

    grid.value = [80, 60, 40, 20];
  } else {
    props.data.forEach((element) => {
      data.push({
        year: element.budgetYear.substring(2, 4),
        bidding: element.aggregateBy.resourcingMethod.bidding,
        internationalBidding:
          element.aggregateBy.resourcingMethod.internationalBidding,
        eBidding: element.aggregateBy.resourcingMethod.eBidding,
        eBiddingViaMarket:
          element.aggregateBy.resourcingMethod.eBiddingViaMarket,
        settlePrice: element.aggregateBy.resourcingMethod.settlePrice,
        checkPrice: element.aggregateBy.resourcingMethod.checkPrice,
        eMarket: element.aggregateBy.resourcingMethod.eMarket,
        specialMethod: element.aggregateBy.resourcingMethod.specialMethod,
        selective: element.aggregateBy.resourcingMethod.selective,
        specific: element.aggregateBy.resourcingMethod.specific,
      });
    });

    maxVal.value = 160;

    grid.value = [160, 140, 120, 100, 80, 60, 40, 20];
  }

  return data;
});

function compareNumbers(a, b) {
  return b - a;
}

const setChartTitle = computed(() => {
  if (props.title == 'งบประมาณ')
    return 'งบประมาณรวมทุกโครงการในแต่ละปีงบประมาณ';
  else if (props.title == 'ความเสี่ยงทุจริต')
    return 'จำนวนโครงการในแต่ละปีงบประมาณ แบ่งสัดส่วนตามความเสี่ยงทุจริต';
  else if (props.title == 'สถานะโครงการ')
    return 'จำนวนโครงการในแต่ละปีงบประมาณ แบ่งสัดส่วนตามสถานะโครงการล่าสุด*';
  else if (props.title == 'สถานะสัญญา')
    return 'จำนวนโครงการในแต่ละปีงบประมาณ แบ่งสัดส่วนตามสถานะโครงการล่าสุด*';
  else return 'จำนวนโครงการในแต่ละปีงบประมาณ แบ่งสัดส่วนตามวิธีการจัดหา';
});

const plan = ref('ความเสี่ยงทุจริต');
</script>

<template>
  <div class="rounded-10 flex flex-col-mb mb-3">
    <div class="p-7 bg-[#F5F5F5] checkbox-wrapper sm:w-1/3">
      <h4 class="font-black" v-if="props.titleType == '0'">
        {{ props.title }}
      </h4>

      <template v-if="props.titleType != '0'">
        <template v-if="props.titleType == '1'">
          <h4 class="font-black">จำนวนโครงการที่จัดทำ</h4>
          <p class="b1 font-bold mb-3">รวม xxx,xxx,xxx โครงการ</p>
        </template>
        <template v-else-if="props.titleType == '2'">
          <h4 class="font-black">จำนวนโครงการที่ได้งาน</h4>
          <p class="b1 font-bold mb-3">รวม xxx,xxx,xxx โครงการ</p>
        </template>
        <template v-else-if="props.titleType == '3'">
          <h4 class="font-black">วงเงินสัญญา</h4>
          <p class="b1 font-bold mb-3">
            รวมทุกปี x,xxx,xxx,xxx,xxx,xxx.xx บาท*
          </p>
          <p class="b4 text-[#8E8E8E] mb-3">
            *หมายเหตุ : วงเงินสัญญาที่แสดงอยู่นี้ เป็นวงเงินสัญญารวมของโครงการ
            โดยโครงการสามารถมีผู้รับจ้างได้มากกว่า 1 ราย
            จึงมีโอกาสที่วงเงินสัญญาเฉพาะของผู้รับจ้างรายนี้
            จะน้อยกว่าที่แสดงอยู่
          </p>
        </template>

        <p class="b1">แบ่งสัดส่วนตาม</p>
        <ClientOnly fallback-tag="span" fallback="Loading...">
          <RadioGroup v-model="plan" class="flex flex-col radio-wrapper">
            <RadioGroupOption
              v-slot="{ checked }"
              class="flex-1 radio-btn b1"
              value="ความเสี่ยงทุจริต"
              @click="$emit('title', 'ความเสี่ยงทุจริต')"
            >
              <span>ความเสี่ยงทุจริต</span>
            </RadioGroupOption>
            <RadioGroupOption
              v-slot="{ checked }"
              class="flex-1 radio-btn b1"
              value="สถานะโครงการ"
              @click="$emit('title', 'สถานะโครงการ')"
            >
              <span>สถานะโครงการล่าสุด</span>
            </RadioGroupOption>
            <RadioGroupOption
              v-slot="{ checked }"
              class="flex-1 radio-btn b1"
              value="วิธีการจัดหา"
              @click="$emit('title', 'วิธีการจัดหา')"
            >
              <span>วิธีการจัดหา</span>
            </RadioGroupOption>
          </RadioGroup></ClientOnly
        ></template
      >

      <template v-if="props.title == 'งบประมาณ'">
        <p class="b1 font-bold">รวมทุกปีงบประมาณ* x,xxx,xxx,xxx,xxx,xxx บาท</p>
        <p class="b4 text-[#5E5E5E]">
          *ปีงบประมาณ เริ่มนับจาก ต.ค. - ก.ย. เช่น ปีงบประมาณ 2568 หมายถึง ต.ค.
          67 - ก.ย. 68
        </p></template
      >

      <template v-else-if="props.title == 'ความเสี่ยงทุจริต'">
        <p class="b1 font-bold" v-if="props.titleType == '0'">
          รวม xxx,xxx,xxx โครงการ
        </p>
        <p class="b4 text-[#8E8E8E] text-right">
          หน่วย : โครงการ (%ของโครงการทั้งหมด)
        </p>
        <div
          class="flex gap-2"
          v-for="(item, i) in checkboxList.filter((x) => x.section == 'risk')"
        >
          <input
            type="checkbox"
            :id="`risk-${i + 1}`"
            class="size-5"
            :value="item.isChecked"
            v-model="item.isChecked"
            :style="{ color: item.color }"
          />
          <label :for="`risk-${i + 1}`" class="b1 flex justify-between w-full"
            ><span>{{ item.name }}</span>
            <span class="text-[#5E5E5E] text-right"
              >x,xxx,xxx,xxx (xx.xx%)</span
            ></label
          >
        </div>
      </template>

      <template v-else-if="props.title == 'สถานะโครงการ'">
        <p class="b1 font-bold" v-if="props.titleType == '0'">
          รวม xxx,xxx,xxx โครงการ
        </p>
        <p class="b4 text-[#8E8E8E] text-right">
          หน่วย : โครงการ (%ของโครงการทั้งหมด)
        </p>
        <div
          class="flex gap-2"
          v-for="(item, i) in checkboxList.filter(
            (x) => x.section == 'status project'
          )"
        >
          <input
            type="checkbox"
            :id="`project-${i + 1}`"
            class="size-5"
            :value="item.isChecked"
            v-model="item.isChecked"
            :style="{ color: item.color }"
          />
          <label
            :for="`project-${i + 1}`"
            class="b1 flex justify-between w-full"
            ><span>{{ item.name }}</span>
            <span class="text-[#5E5E5E] text-right"
              >x,xxx,xxx,xxx (xx.xx%)</span
            ></label
          >
        </div>
      </template>

      <template v-else-if="props.title == 'สถานะสัญญา'">
        <p class="b4 text-[#5E5E5E]">
          หมายเหตุ:
          เฉพาะโครงการที่ทำการจัดซื้อจัดจ้างแล้วเท่านั้นจึงจะมีสถานะสัญญา
        </p>
        <p class="b1 font-bold">รวม xxx,xxx,xxx สัญญา</p>
        <p class="b4 text-[#8E8E8E] text-right">
          หน่วย : สัญญา (%ของสัญญาทั้งหมด)
        </p>
        <div
          class="flex gap-2"
          v-for="(item, i) in checkboxList.filter(
            (x) => x.section == 'status contact'
          )"
        >
          <input
            type="checkbox"
            :id="`contact-${i + 1}`"
            class="size-5"
            :value="item.isChecked"
            v-model="item.isChecked"
            :style="{ color: item.color }"
          />
          <label
            :for="`contact-${i + 1}`"
            class="b1 flex justify-between w-full"
            ><span>{{ item.name }}</span>
            <span class="text-[#5E5E5E] text-right"
              >x,xxx,xxx,xxx (xx.xx%)</span
            ></label
          >
        </div>
      </template>

      <template v-else-if="props.title == 'วิธีการจัดหา'">
        <p class="b1 font-bold" v-if="props.titleType == '0'">
          รวม xxx,xxx,xxx โครงการ
        </p>
        <p class="b4 text-[#8E8E8E] text-right">
          หน่วย : โครงการ (%ของโครงการทั้งหมด)
        </p>
        <div
          class="flex gap-2"
          v-for="(item, i) in checkboxList.filter((x) => x.section == 'type')"
        >
          <input
            type="checkbox"
            :id="`type-${i + 1}`"
            class="size-5"
            :value="item.isChecked"
            v-model="item.isChecked"
            :style="{ color: item.color }"
          />
          <label :for="`type-${i + 1}`" class="b1 flex justify-between w-full"
            ><span>{{ item.name }}</span>
            <span class="text-[#5E5E5E] text-right"
              >x,xxx,xxx,xxx (xx.xx%)</span
            ></label
          >
        </div>
      </template>

      <p
        class="b4 flex gap-1 items-center link-1"
        @click="$emit('isOpen')"
        v-if="props.title == 'ความเสี่ยงทุจริต'"
      >
        <info color="#0B5C90" />
        <span>ACT Ai ตรวจสอบโครงการเสี่ยงอย่างไร ?</span>
      </p>

      <p
        class="b4 flex gap-1 items-center link-1"
        @click="$emit('isOpen')"
        v-if="props.title == 'วิธีการจัดหา'"
      >
        <info color="#0B5C90" />
        <span>ความหมายของแต่ละวิธี</span>
      </p>
    </div>
    <div class="py-7 pr-7 pl-10 bg-[#FFFFFF] chart-wrapper sm:w-2/3 relative">
      <p class="yaxis-text">
        {{ props.title == 'งบประมาณ' ? 'ล้านบาท' : 'จำนวนโครงการ' }}
      </p>

      <p class="text-[#8E8E8E] text-center mb-3 b2">
        {{ setChartTitle }}
      </p>

      <div class="relative min-h-[300px]">
        <div class="flex flex-col gap-2 w-full min-h-[250px] justify-between">
          <div v-for="item in grid" class="pb-5 gap-2 flex flex-1">
            <p class="text-[#8E8E8E] b4">{{ item }}</p>
            <div class="w-full h-[1px] bg-[#F5F5F5] mt-2"></div>
          </div>
        </div>

        <div
          class="flex gap-2 w-[70%] sm:w-[90%] right-5 items-end h-full absolute -bottom-2"
        >
          <div
            v-for="(item, i) in chart"
            class="flex-1 h-full flex flex-col justify-end"
          >
            <template v-if="props.title == 'งบประมาณ'">
              <div
                :style="{ height: (item.total / maxVal) * 100 + '%' }"
                class="w-full bg-black max-h-72 min-h-[0.5px]"
              ></div
            ></template>
            <template v-else-if="props.title == 'ความเสี่ยงทุจริต'">
              <div
                :style="{
                  height:
                    (item.hasNoCorruptionRiskProject / maxVal) * 100 + '%',
                }"
                v-if="checkboxList[1].isChecked"
                class="w-full bg-black max-h-72 min-h-[0.5px]"
              ></div>
              <div
                :style="{
                  height: (item.hasCorruptionRiskProject / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#EC1C24] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[0].isChecked"
              ></div
            ></template>
            <template v-else-if="props.title == 'สถานะโครงการ'">
              <div
                :style="{
                  height: (item.completed / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#0F7979] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[2].isChecked"
              ></div>
              <div
                :style="{
                  height: (item.contracted / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#6DD5D5] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[3].isChecked"
              ></div>
              <div
                :style="{
                  height: (item.inprogress / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#DADADA] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[4].isChecked"
              ></div>
              <div
                :style="{
                  height: (item.cancelContract / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#FF8888] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[5].isChecked"
              ></div>
              <div
                :style="{
                  height: (item.cancelProject / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#FF5353] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[6].isChecked"
              ></div
            ></template>
            <template v-else-if="props.title == 'สถานะสัญญา'">
              <div
                :style="{
                  height: (item.deliveredLate / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#054775] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[7].isChecked"
              ></div>
              <div
                :style="{
                  height: (item.delivered / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#0F7979] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[8].isChecked"
              ></div>
              <div
                :style="{
                  height: (item.deliveredOnTime / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#1AA8A8] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[9].isChecked"
              ></div>

              <div
                :style="{
                  height: (item.contracted / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#6DD5D5] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[10].isChecked"
              ></div>
              <div
                :style="{
                  height: (item.inprogress / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#DADADA] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[11].isChecked"
              ></div>
              <div
                :style="{
                  height: (item.cancelContract / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#FF8888] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[12].isChecked"
              ></div
            ></template>
            <template v-else>
              <div
                :style="{
                  height: (item.bidding / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#CE5700] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[13].isChecked"
              ></div>
              <div
                :style="{
                  height: (item.internationalBidding / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#F08C06] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[14].isChecked"
              ></div>
              <div
                :style="{
                  height: (item.eBidding / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#F8B60E] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[15].isChecked"
              ></div>

              <div
                :style="{
                  height: (item.eBiddingViaMarket / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#FEEDAF] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[16].isChecked"
              ></div>
              <div
                :style="{
                  height: (item.settlePrice / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#6DD5D5] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[17].isChecked"
              ></div>
              <div
                :style="{
                  height: (item.checkPrice / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#2EA0DF] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[18].isChecked"
              ></div>
              <div
                :style="{
                  height: (item.eMarket / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#7051B4] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[19].isChecked"
              ></div>
              <div
                :style="{
                  height: (item.specialMethod / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#EF9CC4] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[20].isChecked"
              ></div>
              <div
                :style="{
                  height: (item.selective / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#D83D88] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[21].isChecked"
              ></div>
              <div
                :style="{
                  height: (item.specific / maxVal) * 100 + '%',
                }"
                class="w-full bg-[#8A004B] max-h-72 min-h-[0.5px]"
                v-if="checkboxList[22].isChecked"
              ></div>
            </template>

            <p class="text-center">'{{ item.year }}</p>
          </div>
        </div>
      </div>

      <p class="text-[#8E8E8E] font-bold text-center mt-2">ปีงบประมาณ</p>
    </div>
  </div>
</template>

<style scoped>
.radio-wrapper {
  border: 1px solid #d9d9d9 !important;
  border-radius: 10px !important;
}

input[type='checkbox'] {
  @apply mt-1;
}

label span:first-child {
  @apply w-3/5;
}

label span:last-child {
  @apply w-44 !text-right;
}
</style>
