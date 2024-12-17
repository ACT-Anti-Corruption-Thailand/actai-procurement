<script setup>
import { ChevronRightIcon } from '@heroicons/vue/24/solid';
const keyword = ['ก่อสร้าง', 'เฉลิมพระเกียรติ', 'ถนน'];

const config = useRuntimeConfig();
const searchSummary = ref({});
const d = new Date();

const getSearchSummary = async () => {
  const urlParams = new URLSearchParams();
  urlParams.set('page', 1);
  urlParams.set('pageSize', 10);
  urlParams.set('budgetYearStart', 2562);
  urlParams.set('budgetYearEnd', 2567);

  const res = await fetch(
    `${config.public.apiUrl}/search/summary?${urlParams}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    searchSummary.value = data;
  }
};

onMounted(async () => {
  await getSearchSummary();
});
</script>

<template>
  <div class="bg-black py-10 px-3" v-if="searchSummary?.result?.length > 0">
    <div class="text-center text-white">
      <h3 class="font-bold mb-10">เว็บไซต์นี้ทำอะไรได้บ้าง</h3>
      <div
        class="flex flex-col lg:flex-row justify-center max-w-6xl mx-auto gap-10"
      >
        <div class="w-full lg:w-2/5 text-left">
          <div
            class="rounded-full b2 p-2 border w-[30px] h-[30px] flex justify-center items-center"
          >
            1
          </div>
          <h4 class="font-bold leading-9 mt-2">
            ค้นหาโครงการจัดซื้อจัดจ้างภาครัฐ/หน่วยงานรัฐ/ผู้รับจ้างที่สนใจ
          </h4>

          <p class="b1 my-3">
            ช่องค้นหาของ ACT Ai <br />
            ช่วยให้คุณค้นหาข้อมูลเกี่ยวกับโครงการจัดซื้อจัดจ้าง หน่วยงานภาครัฐ
            และผู้รับจ้างที่เกี่ยวข้องได้ง่าย ๆ
            เพียงแค่พิมพ์คีย์เวิร์ดที่ต้องการ เช่น
            ชื่อหรือคีย์เวิร์ดในชื่อโครงการ ชื่อจังหวัดที่ตั้งของโครงการ
            เลขที่โครงการ ชื่อหน่วยงานรัฐ ชื่อผู้รับจ้าง
            เลขทะเบียนนิติบุคคลของผู้รับจ้าง
          </p>

          <div class="rounded-10 p-2.5 bg-[#1F1F1F]">
            <p class="b1">
              <b>เคล็ดลับ:</b> คุณสามารถใช้เครื่องหมาย " "
              ครอบคำที่ต้องการค้นหาเพื่อให้การสืบค้นแม่นยำมากยิ่งขึ้น
            </p>
          </div>
        </div>

        <div class="w-full lg:w-3/5 text-left">
          <p class="b2 text-[#DADADA]">
            ตัวอย่างคำที่พบบ่อยในชื่อโครงการปีงบประมาณล่าสุด (2568)
          </p>
          <p class="b4 text-[#A6A6A6]">
            *ปีงบประมาณ เริ่มนับจาก ต.ค. - ก.ย. เช่น ปีงบประมาณ 2568 หมายถึง
            ต.ค. 67 - ก.ย. 68
          </p>

          <div class="flex gap-2 items-center">
            <div class="overflow-auto hide-scroll mt-3">
              <div class="flex gap-3">
                <div v-for="(item, i) in searchSummary?.result" :key="i">
                  <NuxtLink :to="`/result?search=${item.searchKeyword}`">
                    <div
                      class="p-5 btn-dark-1 duration-300 rounded-10 w-[288px] text-left"
                    >
                      <p class="b1 font-bold mb-3 text-black">
                        โครงการฯ ที่มีคำว่า
                        <span class="text-[#74060A]"
                          >“{{ item.searchKeyword }}”</span
                        >
                      </p>
                      <p class="b4 text-[#5E5E5E]">
                        รวม {{ item.totalProject.toLocaleString() }} โครงการ
                      </p>
                      <p class="b4 text-[#5E5E5E]">
                        ใช้งบประมาณรวม
                        {{
                          parseInt(item.totalBudgetMoney).toLocaleString()
                        }}
                        บาท
                      </p>

                      <GoToText
                        color="#0B5C90"
                        text="ดูทั้งหมด"
                        class="mt-20 mb-0 text-[#0B5C90]"
                      />
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
            <ChevronRightIcon class="size-8" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
