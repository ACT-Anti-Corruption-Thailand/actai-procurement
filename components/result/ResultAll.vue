<script setup lang="ts">
defineProps<{
  iconGuide: object;
  mockDataGuide: object;
}>();

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
  <div class="mx-auto max-w-6xl">
    <div class="border-b border-black mb-5">
      <h4 class="font-black">โครงการจัดซื้อจัดจ้าง</h4>

      <ProjectIconGuide :data="iconGuide" class="text-[#8E8E8E]" />

      <div v-for="(item, i) in 3" :key="i" class="py-5">
        <div class="flex justify-between flex-col-mb">
          <div>
            <p
              class="b1 font-bold"
              v-html="
                highlight('สอบราคาซื้อชุดก่อสร้าง (60.14.13)', 'ก่อสร้าง')
              "
            ></p>
            <ProjectIconGuide :data="mockDataGuide" class="text-[#8E8E8E]" />
            <div class="rounded-full bg-[#FFEFF0] p-1 w-fit flex gap-2">
              <img src="../../public/src/images/risk-flag.svg" alt="risk" />
              <p class="b4 text-[#EC1C24]">พบความเสี่ยงทุจริต</p>
            </div>
          </div>
          <div
            class="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-normal"
          >
            <p class="b4">งบประมาณรวม (บาท)</p>
            <p class="b1">190,000,000,000</p>
          </div>
        </div>
      </div>

      <GoToText
        color="#0B5C90"
        text="ดูโครงการทั้งหมด (x,xxx,xxx,xxx)"
        class="mb-5 text-[#0B5C90] cursor-pointer"
        @click="$emit('changeMenu', 'โครงการฯ')"
      />
    </div>

    <div class="border-b border-black mb-5">
      <h4 class="font-bold">หน่วยงานรัฐ</h4>
      <ProjectIconGuide
        :data="{
          province: '= ที่ตั้ง',
        }"
        class="text-[#8E8E8E]"
      />

      <div class="flex justify-between py-5" v-for="(item, i) in 3" :key="i">
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
          />
        </div>
        <div class="flex sm:gap-10 text-right flex-col-mb">
          <div>
            <p class="b4">โครงการทั้งหมด</p>
            <p class="b1">190,000</p>
          </div>
          <div class="text-[#EC1C24]">
            <p class="b4">โครงการเสี่ยงทุจริต</p>
            <p class="b1">10,000 (xx.x%)</p>
          </div>
          <div>
            <p class="b4">งบประมาณรวม (บาท)</p>
            <p class="b1">190,000,000</p>
          </div>
        </div>
      </div>

      <GoToText
        color="#0B5C90"
        text="ดูหน่วยงานรัฐทั้งหมด (x,xxx,xxx,xxx)"
        class="mb-5 text-[#0B5C90] cursor-pointer"
        @click="$emit('changeMenu', 'หน่วยงานรัฐ')"
      />
    </div>

    <div class="border-b border-black mb-5">
      <h4 class="font-bold">ผู้รับจ้าง</h4>
      <ProjectIconGuide
        :data="{
          province: '= ที่ตั้ง',
        }"
        class="text-[#8E8E8E]"
      />

      <div class="flex justify-between py-5" v-for="(item, i) in 3" :key="i">
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
          />
        </div>
        <div class="flex sm:gap-10 text-right flex-col-mb">
          <div>
            <p class="b4">โครงการทั้งหมด</p>
            <p class="b1">190,000</p>
          </div>
          <div class="text-[#EC1C24]">
            <p class="b4">โครงการเสี่ยงทุจริต</p>
            <p class="b1">10,000 (xx.x%)</p>
          </div>
          <div>
            <p class="b4">งบประมาณรวม (บาท)</p>
            <p class="b1">190,000,000</p>
          </div>
        </div>
      </div>

      <GoToText
        color="#0B5C90"
        text="ดูผู้รับจ้างทั้งหมด (x,xxx,xxx,xxx)"
        class="mb-5 text-[#0B5C90] cursor-pointer"
        @click="$emit('changeMenu', 'ผู้รับจ้าง')"
      />
    </div>
  </div>
</template>

<style scoped></style>
