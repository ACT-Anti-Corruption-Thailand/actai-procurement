<script setup lang="ts">
import type { Project } from '../../public/src/data/search_result';

const props = defineProps<{
  data: Project;
}>();

const featureFlags = useFeatureFlags();
</script>

<template>
  <h4 class="font-bold text-white mb-5">ประวัติการทิ้งงาน</h4>

  <div class="bg-white rounded-10 gap-2 mb-3">
    <div class="p-5 rounded-b-md w-full">
      <div class="flex items-center justify-between mb-3">
        <div>
          <h5 class="font-black">
            ทั้งหมด
            {{ props.data?.pagination?.totalItem.toLocaleString() }} โครงการ
            วงเงินสัญญา
            {{ setNumber(props.data?.summary?.totalContractMoney) }} บาท
          </h5>
          <p class="b4 text-[#8E8E8E]">
            หมายเหตุ: การขึ้นบัญชีผู้ทิ้งงานนี้ จะมีผลตามกฎหมายโดยทั่วไป
            เป็นระยะเวลา 10 ปี
            <a
              class="underline link-1"
              target="_blank"
              href="https://www.dla.go.th/upload/template/tempNews/2014/12/32725_1.pdf"
              >อ่านหลักเกณฑ์เพิ่มเติม</a
            >
          </p>
        </div>
        <DownloadAndCopy
          isShowCopyBtn
          section="contractor"
          filterList=""
          v-if="props.data?.searchResult.length != 0"
        />
      </div>

      <div class="overflow-auto">
        <table class="table-auto text-left table-wrapper">
          <thead class="bg-[#8E8E8E] b3 text-white">
            <tr>
              <th class="">วันที่ประกาศผู้ทิ้งงาน</th>
              <th class="w-2/4">
                ชื่อโครงการ
                <ProjectIconGuide
                  :data="{
                    contractNo: '= เลขที่สัญญา',
                    no: '= เลขที่โครงการ',
                  }"
                  color="#DADADA"
                />
              </th>
              <th class="w-1/4">หน่วยงานรัฐ</th>
              <th>วงเงินสัญญารวม</th>
            </tr>
          </thead>
          <tbody class="b1">
            <tr v-for="(item, i) in props.data?.searchResult" :key="i">
              <td class="b2 text-[#5E5E5E]">
                {{ setDate(item.announcementDate) }}
              </td>
              <td>
                <a
                  :href="`/project/${item.projectId}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-[#0B5C90]"
                >
                  <b>{{ item.projectName }}</b></a
                >

                <ProjectIconGuide
                  :data="{
                    no: item.projectId,
                  }"
                  color="#8E8E8E"
                />
                <ProjectTag
                  text="พบความเสี่ยงทุจริต"
                  v-if="featureFlags?.SUSPICIOUS_LABEL && item.hasCorruptionRisk"
                />
              </td>
              <td>
                <a
                  target="_blank"
                  :href="`/government/${item.agencyId}`"
                  class="hover:text-[#0B5C90]"
                  >{{ item.agencyName }}</a
                >

                <p v-if="item.agencyName == null">-</p>
              </td>
              <td>
                <b> {{ setNumber(item.totalContractMoney) }}</b>
              </td>
            </tr>

            <tr class="text-center" v-if="props.data?.searchResult.length == 0">
              <td colspan="4">ไม่พบข้อมูล</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
