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
            เป็นระยะเวลา 10 ปี
            <a
              class="underline text-[#0B5C90]"
              target="_blank"
              href="https://www.dla.go.th/upload/template/tempNews/2014/12/32725_1.pdf"
              >อ่านหลักเกณฑ์เพิ่มเติม</a
            >
          </p>
        </div>
        <DownloadAndCopy />
      </div>

      <div class="overflow-auto">
        <table class="table-auto text-left w-[800px] lg:w-full">
          <thead class="bg-[#8E8E8E] b3 text-white">
            <tr>
              <th class="w-28">วันที่ประกาศผู้ทิ้งงาน</th>
              <th class="w-72">
                ชื่อโครงการ
                <ProjectIconGuide
                  :data="{
                    contractNo: '= เลขที่สัญญา',
                    no: '= เลขที่โครงการ',
                  }"
                  color="#DADADA"
                />
              </th>
              <th>หน่วยงานรัฐ</th>
              <th>วงเงินสัญญารวม</th>
            </tr>
          </thead>
          <tbody class="b1">
            <tr v-for="(item, i) in 5" :key="i">
              <td class="b2 text-[#5E5E5E]">03/08/2567</td>
              <td>
                <a
                  target="_blank"
                  :href="`/project?name=สอบราคาซื้อชุดก่อสร้าง-(60.14.13.02)`"
                >
                  <b>สอบราคาซื้อชุดก่อสร้าง (60.14.13.02)</b>
                </a>
                <ProjectIconGuide
                  :data="{
                    no: '56015020021',
                    contractNo: '1153/2564',
                  }"
                  color="#8E8E8E"
                />
                <ProjectTag text="พบความเสี่ยงทุจริต" />
              </td>
              <td>
                <a
                  target="_blank"
                  :href="`/government?name=สำนักงานคณะกรรมการป้องกันและปราบปรามยาเสพติด`"
                  >สำนักงานคณะกรรมการป้องกันและปราบปรามยาเสพติด</a
                >
              </td>
              <td><b>15,890,000.23</b></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
