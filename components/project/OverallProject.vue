<script setup lang="ts">
const isOpen = ref(false);
const isOpen2 = ref(false);

import type { ProjectDetails } from '../../public/src/data/data_details';

const props = defineProps<{
  data: ProjectDetails;
}>();
</script>

<template>
  <div>
    <h4 class="font-bold text-white mb-5">ภาพรวม</h4>
    <div class="bg-white text-black p-7 rounded-10">
      <div class="flex flex-col-mb gap-3">
        <div class="flex-1">
          <div class="flex gap-2 border-t py-3">
            <div class="flex-1 border-r">
              <p class="b2">งบประมาณรวม (บาท)</p>
              <p class="b1" v-if="props.data.totalBudgetMoney != null">
                {{ setNumber(props.data.totalBudgetMoney) }}
              </p>
            </div>
            <div class="flex-1">
              <p class="b2">ราคากลางรวม (บาท)</p>
              <p class="b1" v-if="props.data.totalEstimatePrice != null">
                {{
                  props.data.totalEstimatePrice != 0
                    ? setNumber(props.data.totalEstimatePrice)
                    : '-'
                }}
              </p>
            </div>
          </div>

          <div class="bg-[#F5F5F5] p-2 rounded-10">
            <p class="b2 text-[#7F7F7F]">วงเงินสัญญารวม (บาท)</p>
            <h4 class="font-black" v-if="props.data.totalContractMoney != null">
              {{ setNumber(props.data.totalContractMoney) }}
            </h4>
            <div class="flex gap-2">
              <div
                v-if="props.data.totalBudgetMoney != 0"
                class="flex-1 sm:border-r"
                :class="[
                  {
                    'text-[#7051B4]':
                      props.data.totalContractMoney >
                      props.data.totalBudgetMoney,
                    'text-[#CE5700]':
                      props.data.totalContractMoney <
                      props.data.totalBudgetMoney,
                    'text-[#1F1F1F]':
                      props.data.totalBudgetMoney ==
                      props.data.totalContractMoney,
                  },
                ]"
              >
                <p class="b2">
                  <span
                    v-if="
                      props.data.totalContractMoney >
                      props.data.totalBudgetMoney
                    "
                    >สูงกว่า</span
                  >
                  <span
                    v-else-if="
                      props.data.totalContractMoney <
                      props.data.totalBudgetMoney
                    "
                    >ต่ำกว่า</span
                  >
                  <span v-else>เท่ากับ</span>งบประมาณรวม
                </p>
                <p
                  class="b1"
                  v-if="
                    props.data.totalContractMoney != props.data.totalBudgetMoney
                  "
                >
                  {{
                    setNumber(
                      ((props.data.totalBudgetMoney -
                        props.data.totalContractMoney) /
                        props.data.totalBudgetMoney) *
                        100
                    )
                  }}%
                </p>
              </div>
              <div
                v-if="props.data.totalEstimatePrice != 0"
                class="flex-1"
                :class="[
                  {
                    'text-[#7051B4]':
                      props.data.totalEstimatePrice <
                      props.data.totalContractMoney,
                    'text-[#CE5700]':
                      props.data.totalEstimatePrice >
                      props.data.totalContractMoney,
                    'text-[#1F1F1F]':
                      props.data.totalEstimatePrice ==
                      props.data.totalContractMoney,
                  },
                ]"
              >
                <p class="b2">
                  <span
                    v-if="
                      props.data.totalEstimatePrice <
                      props.data.totalContractMoney
                    "
                    >สูงกว่า</span
                  >
                  <span
                    v-else-if="
                      props.data.totalEstimatePrice >
                      props.data.totalContractMoney
                    "
                    >ต่ำกว่า</span
                  >
                  <span v-else>เท่ากับ</span>ราคากลางรวม
                </p>
                <p
                  class="b1"
                  v-if="
                    props.data.totalEstimatePrice !=
                    props.data.totalContractMoney
                  "
                >
                  {{
                    setNumber(
                      ((props.data.totalEstimatePrice -
                        props.data.totalContractMoney) /
                        props.data.totalEstimatePrice) *
                        100
                    )
                  }}%
                </p>
              </div>
            </div>
          </div>

          <p
            @click="isOpen = true"
            class="b4 flex gap-1 items-center link-1 my-3"
          >
            <info color="#0B5C90" />
            <span>ตัวเลขนี้บ่งบอกอะไร</span>
          </p>

          <div class="border-t pt-3 mt-3">
            <p class="b2 text-[#8E8E8E]">ที่ตั้งโครงการ*</p>
            <p class="b1">
              {{
                props.data.province == 'ไม่ระบุ'
                  ? props.data?.agency?.name
                  : 'จ.' + props.data.province
              }}
            </p>
            <p class="b4 text-[#8E8E8E]">
              หมายเหตุ: ในกรณีที่ข้อมูลโครงการไม่ได้ระบุที่ตั้ง
              ระบบจะใช้ที่ตั้งของหน่วยงานเจ้าของโครงการแทน
            </p>
          </div>

          <div class="flex gap-2 mt-3">
            <div class="flex-1 border-t pt-3">
              <p class="b2 text-[#5E5E5E]">วันที่ประกาศโครงการ</p>
              <p class="b1">
                {{
                  props.data.announcementDate != null
                    ? setDate(props.data.announcementDate)
                    : 'ไม่ระบุ'
                }}
              </p>
            </div>
            <div class="flex-1 border-t pt-3">
              <p class="b2 text-[#5E5E5E]">ปีงบประมาณ*</p>
              <p class="b1">{{ props.data.budgetYear }}</p>
              <p class="b4 text-[#8E8E8E]">
                *ปีงบประมาณ เริ่มนับจาก ต.ค. - ก.ย. เช่น ปีงบประมาณ 2568 หมายถึง
                ต.ค. 67 - ก.ย. 68
              </p>
            </div>
          </div>

          <div class="border-t pt-3 mt-3">
            <p class="b2 text-[#8E8E8E]">สถานะโครงการ</p>
            <p class="b1">{{ props.data.projectStatus }}</p>
          </div>
        </div>
        <div class="flex-1">
          <div class="border-t py-3">
            <p class="b2 text-[#5E5E5E]">หน่วยงานเจ้าของโครงการ</p>
            <a
              target="_blank"
              class="b1 hover:text-[#0B5C90]"
              :href="`/government/${props.data?.agency?.id}`"
              :class="{
                'pointer-events-none': props.data?.agency?.name == null,
              }"
            >
              {{
                props.data?.agency?.name != null
                  ? props.data?.agency?.name
                  : '-'
              }}
            </a>
            <p class="b3" v-if="props.data?.agency?.province != null">
              ที่ตั้ง : {{ props.data?.agency?.province }}
            </p>
          </div>

          <div class="flex flex-col-mb gap-2">
            <div class="flex-1 border-t pt-3">
              <p class="b2 flex gap-1 text-[#5E5E5E]">
                วิธีการจัดหา
                <span
                  @click="isOpen2 = true"
                  class="b4 flex gap-1 items-center link-1"
                >
                  <info color="#0B5C90" />
                  <span>มีวิธีอะไรบ้าง</span></span
                >
              </p>
              <p class="b1">{{ props.data.resourcingMethod }}</p>
            </div>
            <div class="flex-1 border-t pt-3">
              <p class="b2 text-[#5E5E5E]">ประเภทการจัดหา</p>
              <p class="b1">{{ props.data.resourcingType }}</p>
            </div>
          </div>

          <div class="border-t py-3 mt-3">
            <p class="b2 text-[#5E5E5E]">ผู้รับจ้างที่ชนะการประมูล</p>
            <p class="b2 text-[#8E8E8E]">
              (สามารถมีได้มากกว่า 1 ราย ถ้าโครงการมีหลายสัญญา/รายการย่อย)
            </p>

            <template
              v-for="(item, i) in props.data.winnerContractors"
              :key="'winner-' + i"
            >
              <a
                target="_blank"
                class="b1 hover:text-[#0B5C90] block"
                :href="`/contractor/${item.id}`"
                :class="{
                  'pointer-events-none': item.id?.toLowerCase().includes('x'),
                }"
                >{{ i + 1 }}. {{ item.name }}</a
              >
              <p class="b2 text-[#EC1C24]" v-if="item.hasAbandonProject">
                เคยมีประวัติทิ้งงาน
              </p>
            </template>

            <p
              class="b1 p-5 w-full text-center"
              v-if="props.data?.winnerContractors?.length == 0"
            >
              ไม่พบข้อมูล
            </p>
          </div>
        </div>
      </div>
    </div>

    <Modal v-if="isOpen" @close="isOpen = false" title="ตัวเลขนี้บ่งบอกอะไร" />

    <Modal
      v-if="isOpen2"
      @close="isOpen2 = false"
      title="วิธีการจัดหา มีอะไรบ้าง ลักษณะเป็นอย่างไร?"
    />
  </div>
</template>

<style lang="scss" scoped></style>
