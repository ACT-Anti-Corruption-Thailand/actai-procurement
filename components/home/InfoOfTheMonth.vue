<script setup></script>

<template>
  <div class="bg-[#1F1F1F] py-10 px-3">
    <div class="text-center text-white">
      <h5 class="font-bold">ข้อมูลน่าสนใจประจำเดือนกรกฎาคม 2568</h5>
      <p class="b1">
        มีโครงการฯ ใหม่ xx,xxx โครงการ โดย x,xxx หน่วยงานรัฐ และ x,xxx
        ผู้รับจ้าง
      </p>
      <div class="overflow-auto">
        <div class="flex gap-3 lg:justify-center">
          <div v-for="item in 3">
            <p class="b1 font-bold mb-5">โครงการฯ ที่งบประมาณสูงที่สุด</p>
            <div
              class="bg-white p-5 rounded-xl bg-black w-[370px] text-black text-left"
            >
              <p class="b1 font-bold mb-3">
                บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)
              </p>
              <p class="b1">งบประมาณรวม 190,000,000,000 บาท</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
