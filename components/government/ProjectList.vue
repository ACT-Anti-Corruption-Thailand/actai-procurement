<template>
  <h4 class="font-bold text-white mb-5">รายชื่อโครงการที่จัดทำ</h4>

  <div class="bg-white rounded-md gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <div class="flex sm:items-end gap-2 flex-col-mb">
        <div class="flex-1">
          <p class="b2 text-[#7F7F7F]">ตัวกรอง</p>
          <div class="relative">
            <input
              type="text"
              class="input-text h-full"
              placeholder="กรองด้วยชื่อรายการ/ผู้เข้าเสนอราคา/เลขทะเบียนนิติบุคคล"
            />
            <SearchIcon
              color="#000000"
              class="absolute inset-y-0 my-auto left-2"
            />
          </div>
        </div>
        <FilterPopup />
      </div>

      <div class="mt-3">
        <input type="checkbox" name="" id="isRisk" class="text-black ring-0" />
        <label for="isRisk" class="text-[#EC1C24] ml-1 b1"
          >ดูเฉพาะโครงการที่พบความเสี่ยงทุจริต</label
        >
      </div>
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
              <th class="w-72">
                ชื่อโครงการ
                <ProjectIconGuide
                  :data="{
                    province: '= ที่ตั้ง',
                    no: '= เลขที่โครงการ',
                  }"
                  color="#DADADA"
                />
              </th>
              <th>วันที่ประกาศโครงการ</th>
              <th>สถานะโครงการ</th>
              <th>วิธีการจัดหา</th>
              <th>ผู้รับจ้างที่ได้งาน</th>
              <th>วงเงินสัญญารวม <br />งบประมาณรวม</th>
            </tr>
          </thead>
          <tbody class="b1">
            <tr v-for="(item, i) in 5" :key="i">
              <td>
                <b>สอบราคาซื้อชุดก่อสร้าง (60.14.13.02)</b>
                <ProjectIconGuide
                  :data="{
                    province: 'แพร่',
                    no: '56015020021',
                  }"
                  color="#7F7F7F"
                />
                <div class="rounded-full bg-[#FFEFF0] p-1 w-fit flex gap-2">
                  <img src="../../public/src/images/risk-flag.svg" alt="risk" />
                  <p class="b4 text-[#EC1C24]">พบความเสี่ยงทุจริต</p>
                </div>
              </td>
              <td>11/10/2567</td>
              <td class="bg-[#DADADA]">ระหว่างดำเนินการ</td>
              <td>
                ประกวดราคาด้วยวิธีการทางอิเล็กทรอนิกส์
                โดยผ่านผู้ให้บริการตลาดกลาง
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

<script setup></script>

<style lang="scss" scoped>
.input-text {
  padding-left: 30px;
  background: white;
}
</style>
