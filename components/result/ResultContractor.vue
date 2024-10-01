<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';

const sortBy = ref('desc');

const searchText = ref('');

onMounted(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  searchText.value = urlParams.get('search');
});
</script>

<template>
  <!-- <div>
    <h5 class="text-center text-[#8E8E8E]">ไม่พบผู้รับจ้างที่มีคำค้นนี้</h5>
  </div> -->
  <div class="mx-auto max-w-6xl px-4">
    <div class="flex flex-col-mb sm:items-center justify-between">
      <h4 class="font-bold">xx,xxx,xxx ผู้รับจ้าง</h4>
      <FilterPopup />
    </div>

    <div class="flex items-center justify-between my-5 flex-col-mb">
      <div class="flex gap-2 items-center relative">
        <SortBy
          text="เรียงตาม"
          :list="[
            'ความใกล้เคียงคำค้น',
            'วงเงินสัญญารวม',
            'จำนวนโครงการที่ได้งาน',
          ]"
        />
      </div>
      <DownloadAndCopy />
    </div>

    <ProjectIconGuide
      :data="{
        province: '= ที่ตั้ง',
        entityNo: '= เลขทะเบียนนิติบุคคล',
      }"
      color="#8E8E8E"
    />

    <div class="flex justify-between py-5">
      <a target="_blank" href="/contractor?name=สอบราคาซื้อชุดก่อสร้าง">
        <div>
          <p class="b1 font-bold">
            บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)
          </p>
          <ProjectIconGuide
            :data="{
              province: 'กรุงเทพมหานคร',
              entityNo: '56015020021',
            }"
            color="#8E8E8E"
          />
        </div>
      </a>
      <div class="flex sm:gap-10 text-right flex-col-mb">
        <div>
          <p class="b4 text-[#5E5E5E]">โครงการที่ได้งาน</p>
          <p class="b1">84</p>
        </div>

        <div>
          <p class="b4 text-[#5E5E5E]">วงเงินสัญญารวม (บาท)</p>
          <p class="b1">320,000,000</p>
        </div>
      </div>
    </div>

    <div class="flex justify-between py-5">
      <div>
        <p class="b1 font-bold">บริษัท โกลด์ อินฟินิท จำกัด</p>
        <ProjectIconGuide
          :data="{
            province: 'แพร่',
            entityNo: '56015020021',
          }"
          color="#8E8E8E"
        />
        <ProjectTag text="ตรวจพบความน่าสนใจ" />
      </div>
      <div class="flex sm:gap-10 text-right flex-col-mb">
        <div>
          <p class="b4 text-[#5E5E5E]">โครงการที่ได้งาน</p>
          <p class="b1">36</p>
        </div>

        <div>
          <p class="b4 text-[#5E5E5E]">วงเงินสัญญารวม (บาท)</p>
          <p class="b1">140,000,000</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
