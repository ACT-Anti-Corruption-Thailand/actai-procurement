<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';

const sortBy = ref('desc');

function highlight(title: string, text: string) {
  var innerHTML = title;
  var index = innerHTML.indexOf(text);
  if (index >= 0) {
    innerHTML =
      innerHTML.substring(0, index) +
      "<span class='text-[#74060A]'>" +
      innerHTML.substring(index, index + text.length) +
      '</span>' +
      innerHTML.substring(index + text.length);
    return innerHTML;
  }
}
</script>

<template>
  <div class="">
    <div class="flex flex-col-mb sm:items-center justify-between">
      <h4 class="font-bold">xx,xxxx หน่วยงานรัฐ</h4>
      <FilterPopup />
    </div>

    <div class="flex items-center justify-between my-5 flex-col-mb">
      <div class="flex gap-2 items-center relative">
        <p class="b1">เรียงตาม</p>
        <SortBy
          class="bg-[#F5F5F5]"
          :list="['ความใกล้เคียงคำค้น', 'วันที่ประกาศโครงการ', 'งบประมาณรวม']"
        />

        <RadioGroup v-model="sortBy" class="flex gap-1">
          <RadioGroupOption
            v-slot="{ checked }"
            class="flex-1 radio-btn b1 rounded-md"
            value="desc"
          >
            <img src="../../public/src/images/sort-desc.svg" alt="" />
          </RadioGroupOption>
          <RadioGroupOption
            v-slot="{ checked }"
            class="flex-1 radio-btn b1 rounded-md"
            value="asc"
          >
            <img src="../../public/src/images/sort-asc.svg" alt="" />
          </RadioGroupOption>
        </RadioGroup>
      </div>
      <DownloadAndCopy />
    </div>

    <ProjectIconGuide
      :data="{
        province: '= ที่ตั้ง',
      }"
      class="text-[#8E8E8E]"
    />

    <div class="flex justify-between py-5">
      <NuxtLink to="/government">
        <div>
          <p
            class="b1 font-bold"
            v-html="highlight('การไฟฟ้านครหลวง ฝ่ายก่อสร้าง', 'ก่อสร้าง')"
          ></p>
          <ProjectIconGuide
            :data="{
              province: 'กรุงเทพมหานคร',
            }"
            class="text-[#8E8E8E]"
          /></div
      ></NuxtLink>
      <div class="flex sm:gap-10 text-right flex-col-mb">
        <div>
          <p class="b4">โครงการทั้งหมด</p>
          <p class="b1">222</p>
        </div>
        <div class="text-[#EC1C24]">
          <p class="b4">โครงการเสี่ยงทุจริต</p>
          <p class="b1">27 (xx.x%)</p>
        </div>
        <div>
          <p class="b4">งบประมาณรวม (บาท)</p>
          <p class="b1">340,000,000</p>
        </div>
      </div>
    </div>

    <div class="flex justify-between py-5">
      <div>
        <p class="b1 font-bold">สำนักงานเศรษฐกิจการเกษตร</p>
        <ProjectIconGuide
          :data="{
            province: 'แพร่',
          }"
          class="text-[#8E8E8E]"
        />
      </div>
      <div class="flex sm:gap-10 text-right flex-col-mb">
        <div>
          <p class="b4">โครงการทั้งหมด</p>
          <p class="b1">1234</p>
        </div>
        <div class="text-[#EC1C24]">
          <p class="b4">โครงการเสี่ยงทุจริต</p>
          <p class="b1">432 (xx.x%)</p>
        </div>
        <div>
          <p class="b4">งบประมาณรวม (บาท)</p>
          <p class="b1">390,150,000</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
