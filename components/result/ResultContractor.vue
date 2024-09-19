<template>
  <div class="">
    <div class="flex flex-col-mb sm:items-center justify-between">
      <h4 class="font-bold">xx,xxxx,xxxx ผู้รับจ้าง</h4>
      <FilterPopup />
    </div>

    <div class="flex items-center justify-between my-5 flex-col-mb">
      <div class="flex gap-2 items-center relative">
        <p class="b1">เรียงตาม</p>
        <SortBy
          class="bg-[#F5F5F5]"
          :list="[
            'ความใกล้เคียงคำค้น',
            'วงเงินสัญญารวม',
            'จำนวนโครงการที่ได้งาน',
          ]"
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
        no: '= เลขทะเบียนนิติบุคคล',
      }"
      class="text-[#8E8E8E]"
    />

    <div class="flex justify-between py-5">
      <NuxtLink to="/contracter">
        <div>
          <p class="b1 font-bold">
            บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)
          </p>
          <ProjectIconGuide
            :data="{
              province: 'กรุงเทพมหานคร',
            }"
            class="text-[#8E8E8E]"
          />
        </div>
      </NuxtLink>
      <div class="flex sm:gap-10 text-right flex-col-mb">
        <div>
          <p class="b4">โครงการที่ได้งาน</p>
          <p class="b1">84</p>
        </div>

        <div>
          <p class="b4">วงเงินสัญญารวม (บาท)</p>
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
          }"
          class="text-[#8E8E8E]"
        />
        <div class="rounded-full bg-[#FFEFF0] p-1 w-fit flex gap-2">
          <img src="../../public/src/images/risk-flag.svg" alt="risk" />
          <p class="b4 text-[#EC1C24]">ตรวจพบความน่าสนใจ</p>
        </div>
      </div>
      <div class="flex sm:gap-10 text-right flex-col-mb">
        <div>
          <p class="b4">โครงการที่ได้งาน</p>
          <p class="b1">36</p>
        </div>

        <div>
          <p class="b4">วงเงินสัญญารวม (บาท)</p>
          <p class="b1">140,000,000</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';

const sortBy = ref('desc');
</script>

<style lang="scss" scoped></style>
