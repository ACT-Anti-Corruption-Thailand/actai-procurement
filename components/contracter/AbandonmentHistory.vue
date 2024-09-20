<template>
  <h4 class="font-bold text-white mb-5">ประวัติการทิ้งงาน</h4>

  <div class="bg-white rounded-md gap-2 mb-3">
    <div class="p-5 rounded-b-md w-full">
      <div class="flex items-center justify-between mb-3 flex-col-mb">
        <div>
          <h5 class="font-black">
            ทั้งหมด xxx โครงการ วงเงินสัญญา xx,xxx,xxx บาท
          </h5>
          <p class="b4 text-[#8E8E8E]">
            หมายเหตุ: การขึ้นบัญชีผู้ทิ้งงานนี้ จะมีผลตามกฎหมายโดยทั่วไป
            เป็นระยะเวลา 10 ปี อ่านหลักเกณฑ์เพิ่มเติม
          </p>
        </div>
        <DownloadAndCopy />
      </div>

      <div class="overflow-auto">
        <table class="table-auto text-left w-[800px] lg:w-full">
          <thead class="bg-[#8E8E8E] b3 text-white">
            <tr>
              <th class="w-28">วันที่ประกาศผู้ทิ้งงาน</th>
              <th class="w-72">ชื่อโครงการ</th>
              <th>หน่วยงานรัฐ</th>
              <th>วงเงินสัญญารวม</th>
            </tr>
          </thead>
          <tbody class="b1">
            <tr v-for="(item, i) in 5" :key="i">
              <td>03/08/2567</td>
              <td>
                <b>สอบราคาซื้อชุดก่อสร้าง (60.14.13.02)</b>
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
              <td>สำนักงานคณะกรรมการป้องกันและปราบปรามยาเสพติด</td>
              <td><b>15,890,000.23</b></td>
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
