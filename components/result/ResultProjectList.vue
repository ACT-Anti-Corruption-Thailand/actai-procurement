<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
</script>

<template>
  <TabGroup>
    <TabList>
      <Tab class="tab-menu b1">รายชื่อ</Tab>
      <Tab class="tab-menu b1">ภาพรวม</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <div class="flex gap-2 py-5 flex-col-mb">
          <div class="rounded-md bg-black p-5 text-white sm:w-3/5">
            <p class="b1 font-bold">
              จำนวนโครงการจัดซื้อจัดจ้างตามเงื่อนไขที่ค้นหา
            </p>
            <h2 class="font-bold">x,xxx,xxx,xxx โครงการ</h2>
            <hr />
            <div class="flex">
              <div class="flex-1">
                <p class="b2">งบประมาณรวม (บาท)</p>
                <h5 class="font-bold">xx,xxx,xxx,xxx,xxx.xx</h5>
              </div>
              <div class="flex-1 text-[#EC1C24]">
                <p class="b2">เป็นโครงการเสี่ยงทุจริต</p>
                <h5 class="font-bold">xx.xx%</h5>
              </div>
            </div>
          </div>

          <div class="sm:w-2/5">
            <div class="rounded-md bg-[#F5F5F5] p-5 text-black mb-3">
              <p class="b2">หน่วยงานรัฐเจ้าของโครงการ</p>
              <h5 class="font-bold">x,xxx,xxx,xxx หน่วยงาน</h5>
            </div>
            <div class="rounded-md bg-[#F5F5F5] p-5 text-black">
              <p class="b2">ผู้รับจ้าง</p>
              <h5 class="font-bold">x,xxx,xxx,xxx ราย</h5>
            </div>
          </div>
        </div>

        <div
          class="flex justify-between py-5 flex-col-mb"
          v-for="(item, i) in 10"
          :key="i"
        >
          <div>
            <p class="b1 font-bold">
              สอบราคาซื้อชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02
              ),ชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02
              ),ชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02
              ),ชุดก่อสร้าง(60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02
              ) (เลขที่โครงการ : 59046019435) เลขที่โครงการ: 59046019435
            </p>
          </div>
          <div>
            <p class="b4">งบประมาณรวม (บาท)</p>
            <p class="b1">190,000,000,000</p>
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <h5 class="font-bold my-5">xxx,xxx,xxx โครงการจัดซื้อจัดจ้าง</h5>
        <div class="flex flex-col-mb gap-2">
          <div class="rounded-md bg-black p-5 text-white sm:w-3/5">
            <p class="b1">งบประมาณรวม (บาท)</p>
            <h4 class="font-bold">x,xxx,xxx,xxx โครงการ</h4>
          </div>
          <div class="rounded-md bg-black p-5 text-[#EC1C24] sm:w-3/5">
            <p class="b1">โครงการเสี่ยงทุจริต</p>
            <h4 class="font-bold">xx.xx%</h4>
          </div>
        </div>
        <div class="flex flex-col-mb gap-2 mt-5">
          <div class="rounded-md bg-black p-5 text-white sm:w-1/5">
            <p class="b1">สถานะโครงการที่พบมากที่สุด (xx%)</p>
            <p class="b1 font-bold">จัดทำสัญญา/POแล้ว</p>
          </div>
          <div class="rounded-md bg-black p-5 text-white sm:w-1/5">
            <p class="b1">สถานะของสัญญาที่พบมากที่สุด (xx%)</p>
            <p class="b1 font-bold">ส่งงานล่าช้ากว่ากำหนด</p>
          </div>
          <div class="rounded-md bg-black p-5 text-white sm:w-1/5">
            <p class="b1">วิธีการจัดหาที่พบมากที่สุด (xx%)</p>
            <p class="b1 font-bold">
              ประกวดราคาด้วยวิธีการทางอิเล็กทรอนิกส์-โดยผ่านผู้ให้บริการตลาดกลาง
            </p>
          </div>
          <div class="rounded-md bg-black p-5 text-white sm:w-1/5">
            <p class="b1">จังหวัดที่มีจำนวนโครงการมากที่สุด</p>
            <p class="b1 font-bold">กรุงเทพมหานคร</p>
          </div>
          <div class="rounded-md bg-black p-5 text-white sm:w-1/5">
            <p class="b1">จังหวัดที่ใช้งบประมาณมากที่สุด</p>
            <p class="b1 font-bold">พระนครศรีอยุธยา</p>
          </div>
        </div>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<style lang="scss" scoped></style>
