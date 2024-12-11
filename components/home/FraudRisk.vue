<script setup lang="ts">
import type { Project, Contractor } from '../../public/src/data/search_result';
const config = useRuntimeConfig();

const projectList = ref<Project | null>(null);
const contractorList = ref<Contractor | null>(null);
const random1 = ref(0);
const random2 = ref(0);

const getProjectList = async () => {
  const urlParams = new URLSearchParams();
  urlParams.set('keyword', '');
  urlParams.set('page', 1);
  urlParams.set('pageSize', 10);

  const res = await fetch(
    `${config.public.apiUrl}/project/search?${urlParams.toString()}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    projectList.value = data;
  }
};

const getContractorList = async () => {
  const urlParams = new URLSearchParams();
  urlParams.set('keyword', '');
  urlParams.set('page', 1);
  urlParams.set('pageSize', 10);

  const res = await fetch(
    `${config.public.apiUrl}/company/search?${urlParams.toString()}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    contractorList.value = data;
  }
};

const randomData = computed(() => {
  return projectList.value?.searchResult[random1.value];
});

const randomData2 = computed(() => {
  return contractorList.value?.searchResult[random2.value];
});

const randomNum = (n: number) => {
  let r = Math.floor(Math.random() * 10);

  if (n == 1) random1.value = r;
  else random2.value = r;
};

onMounted(async () => {
  await getProjectList();
  await getContractorList();
});
</script>

<template>
  <div class="bg-[#510003] py-10 px-3">
    <div class="text-center text-white">
      <div
        class="flex flex-col lg:flex-row justify-center max-w-6xl mx-auto gap-10"
      >
        <div class="w-full lg:w-2/5 text-left">
          <div
            class="rounded-full b2 p-2 border w-[30px] h-[30px] flex justify-center items-center"
          >
            2
          </div>
          <h4 class="font-bold">ตรวจสอบความเสี่ยงทุจริต</h4>

          <p class="b1 my-3">
            ACT Ai ใช้ AI แบบ rule-based
            ในการวิเคราะห์และระบุความเสี่ยงทุจริตเบื้องต้น
            ท่านสามารถสังเกตสัญลักษณ์
            <img
              src="../../public/src/images/risk-flag.svg"
              alt="risk"
              class="inline w-5 mb-2"
            />
            ในหน้าโครงการและหน้าผู้รับจ้างเพื่อดูความเสี่ยงที่ควรตั้งข้อสังเกต
          </p>

          <div class="rounded-10 p-2.5 border border-[#EC1C24]">
            <p class="b1">
              <b>หมายเหตุ:</b> เป็นเพียงการระบุความเสี่ยงเท่านั้น
              ซึ่งไม่ได้หมายความว่ามีการทุจริตเกิดขึ้นแล้ว
            </p>
          </div>
        </div>
        <div class="w-full lg:w-3/5 text-left grid grid-cols-1 sm:grid-cols-2">
          <div
            class="grid grid-rows-1 sm:grid-rows-2 sm:pr-5 border-b md:border-b-0 md:border-r border-[#EC1C24]"
          >
            <div>
              <p class="b1 font-bold mb-2">โครงการฯ ที่พบความเสี่ยงทุจริต</p>
              <p class="b2">ACT Ai ตรวจสอบอย่างไร ?</p>
              <ul class="list-disc ml-5 b2">
                <li>
                  <b> ตรวจสอบพฤติกรรมการเสนอราคา</b> ในตัวอย่างประเด็น เช่น
                  เสนอราคาใกล้ราคากลาง เสนอราคาเกาะกลุ่ม มีผู้เสนอราคาน้อยกว่า 3
                  ราย เป็นต้น
                </li>
                <li>
                  <b>จับตาความโปร่งใสในการจัดซื้อจัดจ้างของหน่วยงานรัฐ</b>
                  ในตัวอย่างประเด็น เช่น
                  โครงการเฉพาะเจาะจงที่จัดซื้อจัดจ้างท้ายปีงบประมาณ เป็นต้น
                </li>
                <li>
                  <b>เฝ้าระวังและป้องกันการทุจริต</b> ในตัวอย่างประเด็น เช่น
                  คู่เทียบมีกรรมการหรือที่อยู่เดียวกัน
                  ผู้เข้าเสนอราคามีประวัติทิ้งงาน เป็นต้น
                </li>
              </ul>

              <NuxtLink to="/learn#how-to-report">
                <GoToText color="#8DCCF0" text="อ่านเกณฑ์แบบละเอียด" />
              </NuxtLink>
            </div>

            <div v-if="projectList?.searchResult.length > 0">
              <p class="b2">ตัวอย่างจากปีงบประมาณล่าสุด* (2568)</p>
              <p class="b4 text-[#A6A6A6] mb-3">
                *ปีงบประมาณ เริ่มนับจาก ต.ค. - ก.ย. เช่น ปีงบประมาณ 2568 หมายถึง
                ต.ค. 67 - ก.ย. 68
              </p>

              <a
                :href="'/project/' + randomData?.projectId"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ProjectData :data="randomData" :index="0" class="btn-dark-1" />
              </a>

              <div
                class="flex items-center gap-2 my-3 link-2"
                @click="randomNum(1)"
              >
                <p class="b2">สุ่มใหม่</p>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.295 9.705L13.085 11.5H9.775L7.59 8L9.775 4.5H13.085L11.295 6.295L12 7L15 4L12 1L11.295 1.705L13.085 3.5H9.775C9.6059 3.50051 9.4397 3.54389 9.29192 3.62608C9.14414 3.70828 9.01962 3.8266 8.93 3.97L7 7.055L5.07 3.97C4.98038 3.8266 4.85586 3.70828 4.70808 3.62608C4.5603 3.54389 4.3941 3.50051 4.225 3.5H1V4.5H4.225L6.41 8L4.225 11.5H1V12.5H4.225C4.3941 12.4995 4.5603 12.4561 4.70808 12.3739C4.85586 12.2917 4.98038 12.1734 5.07 12.03L7 8.945L8.93 12.03C9.01962 12.1734 9.14414 12.2917 9.29192 12.3739C9.4397 12.4561 9.6059 12.4995 9.775 12.5H13.085L11.295 14.295L12 15L15 12L12 9L11.295 9.705Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="grid grid-rows-1 sm:grid-rows-2 sm:pl-5 pt-3 sm:pt-0">
            <div>
              <p class="b1 font-bold mb-2">ผู้รับจ้างที่น่าสนใจ</p>
              <p class="b2">ACT Ai ตรวจสอบอย่างไร ?</p>
              <ul class="list-disc ml-5 b2">
                <li>
                  <b
                    >ตรวจสอบความสัมพันธ์กับนักการเมืองหรือข้าราชการระดับสูงที่ยื่นบัญชีทรัพย์สิน</b
                  >
                  ในตัวอย่างประเด็น เช่น
                  ที่ตั้งนิติบุคคลตรงกับที่อยู่ของนักการเมืองหรือข้าราชการที่ยื่นบัญชีทรัพย์สิน
                  เป็นต้น
                </li>
                <li>
                  <b>ตรวจสอบประวัติการบริจาคเงินให้พรรคการเมือง</b>
                </li>
                <li>
                  <b>ตรวจสอบประวัติการถูกขึ้นบัญชีผู้ทิ้งงาน</b>
                </li>
              </ul>

              <NuxtLink to="/learn#how-to-report">
                <GoToText color="#8DCCF0" text="อ่านเกณฑ์แบบละเอียด" />
              </NuxtLink>
            </div>

            <div v-if="contractorList?.searchResult.length > 0">
              <p class="b2">ตัวอย่างจากปีงบประมาณล่าสุด* (2568)</p>
              <p class="b4 text-[#A6A6A6] mb-3">
                *ปีงบประมาณ เริ่มนับจาก ต.ค. - ก.ย. เช่น ปีงบประมาณ 2568 หมายถึง
                ต.ค. 67 - ก.ย. 68
              </p>

              <a
                :href="'/contractor/' + randomData2?.companyId"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ProjectData
                  :data="randomData2"
                  :index="2"
                  class="btn-dark-1"
                />
              </a>

              <div
                class="flex items-center gap-2 my-3 link-2"
                @click="randomNum(2)"
              >
                <p class="b2">สุ่มใหม่</p>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.295 9.705L13.085 11.5H9.775L7.59 8L9.775 4.5H13.085L11.295 6.295L12 7L15 4L12 1L11.295 1.705L13.085 3.5H9.775C9.6059 3.50051 9.4397 3.54389 9.29192 3.62608C9.14414 3.70828 9.01962 3.8266 8.93 3.97L7 7.055L5.07 3.97C4.98038 3.8266 4.85586 3.70828 4.70808 3.62608C4.5603 3.54389 4.3941 3.50051 4.225 3.5H1V4.5H4.225L6.41 8L4.225 11.5H1V12.5H4.225C4.3941 12.4995 4.5603 12.4561 4.70808 12.3739C4.85586 12.2917 4.98038 12.1734 5.07 12.03L7 8.945L8.93 12.03C9.01962 12.1734 9.14414 12.2917 9.29192 12.3739C9.4397 12.4561 9.6059 12.4995 9.775 12.5H13.085L11.295 14.295L12 15L15 12L12 9L11.295 9.705Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ACTLineButton />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
