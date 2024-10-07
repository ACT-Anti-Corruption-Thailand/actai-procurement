<script setup>
const mockdata = ref([
  {
    name: 'สอบราคาซื้อชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง(60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02 ) (เลขที่โครงการ : 59046019435) เลขที่โครงการ: 59046019435',
    province: 'แพร่',
    year: '2568',
    owner: 'สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน',
    no: '56015020021',
  },
  {
    name: 'การไฟฟ้านครหลวง ฝ่ายก่อสร้าง',
    province: 'กรุงเทพมหานคร',
  },
  {
    name: 'บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)',
    province: 'กรุงเทพมหานคร',
    entityNo: '56015020021',
  },
]);
</script>

<template>
  <div class="bg-[#1F1F1F] py-10 px-3">
    <div class="text-center text-white">
      <h5 class="font-bold">ข้อมูลน่าสนใจประจำเดือนกรกฎาคม 2568</h5>
      <p class="b1 text-[#A6A6A6]">
        มีโครงการฯ ใหม่ 100,000 โครงการ โดย 200 หน่วยงานรัฐ และ 2,500 ผู้รับจ้าง
      </p>
      <div class="overflow-auto mt-3 hide-scroll">
        <div class="flex gap-3 lg:justify-center max-w-6xl mx-auto">
          <div
            v-for="(item, i) in mockdata"
            :key="i"
            class="flex-1 flex flex-col"
          >
            <p class="b1 font-bold mb-2.5">
              <template v-if="i == 0">โครงการฯ ที่งบประมาณสูงที่สุด</template>
              <template v-else-if="i == 1"
                >หน่วยงานรัฐที่ของบประมาณมากที่สุด</template
              >
              <template v-else>ผู้รับจ้างที่มีมูลค่าสัญญารวมมากที่สุด</template>
            </p>
            <ProjectData :data="item" :index="i" class="h-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
