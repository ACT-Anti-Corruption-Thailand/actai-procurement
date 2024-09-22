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

const searchText = ref('');

onMounted(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  searchText.value = urlParams.get('search');
});
</script>

<template>
  <div v-if="searchText != 'ก่อสร้าง'">
    <h5 class="text-center text-[#8E8E8E]">ไม่พบหน่วยงานรัฐที่มีคำค้นนี้</h5>
  </div>
  <div class="" v-else>
    <div class="flex flex-col-mb sm:items-center justify-between">
      <h4 class="font-bold">xx,xxx หน่วยงานรัฐ</h4>
      <FilterPopup />
    </div>

    <div class="flex items-center justify-between my-5 flex-col-mb">
      <div class="flex gap-2 items-center relative">
        <SortBy
          :list="[
            'ความใกล้เคียงคำค้น',
            'งบประมาณรวม',
            'จำนวนโครงการทั้งหมด',
            'จำนวนโครงการเสี่ยงทุจริต',
            '% โครงการเสี่ยงทุจริตจากทั้งหมด',
          ]"
          text="เรียงตาม"
        />
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
      <a target="_blank" href="/government?name=สอบราคาซื้อชุดก่อสร้าง">
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
      ></a>
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
