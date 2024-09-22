<template>
  <h4 class="font-bold text-white mb-5">รายชื่อโครงการที่เกี่ยวข้อง</h4>

  <div class="bg-white rounded-md gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <FilterPopup />
    </div>
    <div class="p-5 rounded-b-md w-full">
      <div class="flex items-center justify-between mb-3 flex-col-mb">
        <h5 class="font-black">ทั้งหมด xx,xxx โครงการ วงเงินสัญญา xxx บาท</h5>
        <DownloadAndCopy />
      </div>

      <SortBy
        text="เรียงตาม"
        :list="['วันที่ประกาศโครงการ', 'วงเงินสัญญา']"
        class="mb-3"
      />

      <div class="overflow-auto">
        <table class="table-auto text-left w-[800px] lg:w-full">
          <thead class="bg-[#8E8E8E] b3 text-white">
            <tr>
              <th>ชื่อโครงการ</th>
              <th>วันที่ประกาศโครงการ</th>
              <th class="w-20">สถานะ</th>
              <th>วิธีการจัดหา</th>
              <th>หน่วยงานรัฐ</th>
              <th>ผู้ร่วมประมูล</th>
              <th>ผู้ชนะ</th>
              <th>วงเงินสัญญารวมของโครงการ <br />งบประมาณรวม</th>
            </tr>
          </thead>
          <tbody class="b1">
            <tr v-for="(item, i) in 5" :key="i">
              <td>
                <b
                  ><a
                    target="_blank"
                    :href="`/project?name=สอบราคาซื้อชุดก่อสร้าง-(60.14.13.02)`"
                    >สอบราคาซื้อชุดก่อสร้าง (60.14.13.02)</a
                  ></b
                >
                <ProjectIconGuide
                  :data="{
                    province: 'แพร่',
                    no: '56015020021',
                  }"
                  class="text-[#8E8E8E]"
                />
                <div class="rounded-full bg-[#FFEFF0] p-1 w-fit flex gap-2">
                  <img src="../../public/src/images/risk-flag.svg" alt="risk" />
                  <p class="b4 text-[#EC1C24]">พบความเสี่ยงทุจริต</p>
                </div>
              </td>
              <td>11/10/2567</td>
              <td class="bg-[#C0C0C0]">เสนอราคา</td>
              <td>
                ประกวดราคาด้วยวิธีการทางอิเล็กทรอนิกส์
                โดยผ่านผู้ให้บริการตลาดกลาง
              </td>
              <td>
                <a
                  target="_blank"
                  :href="`/government?name=สำนักงานเลขาธิการสภาผู้แทนราษฎร`"
                  >สำนักงานเลขาธิการสภาผู้แทนราษฎร</a
                >
              </td>
              <td>
                <a
                  target="_blank"
                  :href="`/contracter?name=บริษัท-แพลนเน็ต-คอมมิวนิเคชั่น-เอเชีย-จำกัด-(มหาชน)`"
                  >1. บริษัท แพลนเน็ต คอมมิวนิเคชั่น เอเชีย จำกัด (มหาชน)</a
                >
              </td>
              <td>1. บริษัท แพลนเน็ต คอมมิวนิเคชั่น เอเชีย จำกัด (มหาชน)</td>
              <td><b>15,890,000.23</b> <br />15,890,000.23</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
</script>

<style lang="scss" scoped></style>
