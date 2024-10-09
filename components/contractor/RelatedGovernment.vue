<template>
  <h4 class="font-bold text-white mb-5">หน่วยงานรัฐที่เป็นผู้ว่าจ้าง</h4>

  <div class="bg-white rounded-10 gap-2 mb-3">
    <div class="p-5 bg-[#F5F5F5] rounded-t-md w-full">
      <div class="flex items-end gap-2">
        <div class="flex-1">
          <p class="b2 text-[#7F7F7F]">ค้นหาหน่วยงานรัฐ</p>
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
        <FilterResultContractor section="หน่วยงานรัฐที่เป็นผู้ว่าจ้าง" />
      </div>
    </div>
    <div class="p-5 rounded-b-md w-full">
      <div class="flex items-center justify-between mb-3 gap-2">
        <h5 class="font-bold w-3/5">
          ทั้งหมด xxx หน่วยงาน วงเงินสัญญา xx,xxx,xxx บาท
        </h5>
        <DownloadAndCopy />
      </div>

      <SortBy
        text="เรียงตาม"
        :list="['วงเงินสัญญา', 'จำนวนโครงการ']"
        class="mb-3"
      />

      <div class="overflow-auto">
        <table class="table-auto text-left table-wrapper">
          <thead class="bg-[#8E8E8E] b3 text-white">
            <tr>
              <th>ลำดับ</th>
              <th>ผู้รับจ้าง</th>
              <th class="text-right">จำนวนโครงการ</th>
              <th class="text-right">วงเงินสัญญารวม</th>
            </tr>
          </thead>
          <tbody class="b1">
            <tr v-for="(item, i) in 10" :key="i">
              <td class="text-[#7F7F7F]">{{ i + 1 }}</td>
              <td class="font-bold">
                <a
                  target="_blank"
                  :href="`/contractor?name=สำนักงานคณะกรรมการป้องกันและปราบปรามยาเสพติด`"
                >
                  สำนักงานคณะกรรมการป้องกันและปราบปรามยาเสพติด
                </a>
              </td>
              <td class="text-right">3,000</td>
              <td class="text-right">15,890,000.23</td>
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
