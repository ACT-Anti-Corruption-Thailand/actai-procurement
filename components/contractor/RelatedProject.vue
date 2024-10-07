<template>
  <h4 class="font-bold text-white mb-5">รายชื่อโครงการที่เกี่ยวข้อง</h4>

  <div class="bg-white rounded-md gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <div class="flex items-end gap-2">
        <div class="flex-1">
          <p class="b2 text-[#7F7F7F]">ค้นหาโครงการ</p>
          <div class="relative">
            <input
              type="text"
              class="input-text h-full"
              placeholder="พิมพ์คำในชื่อหรือเลขที่โครงการ"
            />
            <SearchIcon
              color="#000000"
              class="absolute inset-y-0 my-auto left-2"
            />
          </div>
        </div>
        <FilterResultContractor section="รายชื่อโครงการที่เกี่ยวข้อง" />
      </div>

      <div class="mt-3">
        <input type="checkbox" name="" id="isRisk" class="text-black ring-0" />
        <label for="isRisk" class="text-[#EC1C24] ml-1 b1"
          >ดูเฉพาะโครงการที่พบความเสี่ยงทุจริต</label
        >
      </div>
    </div>
    <div class="p-5 rounded-b-md w-full">
      <div class="flex items-center justify-between mb-3 gap-2">
        <h5 class="font-black w-3/4">
          ทั้งหมด xx,xxx โครงการ วงเงินสัญญา xxx บาท
        </h5>
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
              <th>
                ชื่อโครงการ<ProjectIconGuide
                  :data="{
                    province: '= ที่ตั้ง',
                    no: '= เลขที่โครงการ',
                  }"
                  color="#DADADA"
                />
              </th>
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
                  color="#7F7F7F"
                />
                <ProjectTag text="พบความเสี่ยงทุจริต" />
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
                  :href="`/contractor?name=บริษัท-แพลนเน็ต-คอมมิวนิเคชั่น-เอเชีย-จำกัด-(มหาชน)`"
                  >บริษัท แพลนเน็ต คอมมิวนิเคชั่น เอเชีย จำกัด (มหาชน)</a
                >
              </td>
              <td>บริษัท แพลนเน็ต คอมมิวนิเคชั่น เอเชีย จำกัด (มหาชน)</td>
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
