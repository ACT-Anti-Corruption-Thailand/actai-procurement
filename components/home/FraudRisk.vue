<script setup>
const mockdata = ref([
  {
    name: 'สอบราคาซื้อชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02 ),ชุดก่อสร้าง(60.14.13.02 ),ชุดก่อสร้าง (60.14.13.02 ) (เลขที่โครงการ : 59046019435) เลขที่โครงการ: 59046019435',
    province: 'แพร่',
    year: '2568 (10/11/2567)',
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
  <div class="bg-[#510003] py-10 px-3">
    <div class="text-center text-white">
      <div
        class="flex flex-col lg:flex-row justify-center max-w-5xl mx-auto gap-5"
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

          <div class="rounded-[10px] p-2.5 border border-[#EC1C24]">
            <p class="b1">
              <b>หมายเหตุ:</b> เป็นเพียงการระบุความเสี่ยงเท่านั้น
              ซึ่งไม่ได้หมายความว่ามีการทุจริตเกิดขึ้นแล้ว
            </p>
          </div>
        </div>
        <div class="w-full lg:w-3/5 text-left flex flex-col-mb">
          <div
            class="flex-1 p-3 border-b md:border-b-0 md:border-r border-[#EC1C24]"
          >
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

            <NuxtLink to="/learn#อยากร่วมจับโกงต้องสังเกตจากอะไร">
              <GoToText color="#8DCCF0" text="อ่านเกณฑ์แบบละเอียด" />
            </NuxtLink>

            <p class="b2">ตัวอย่างจากปีงบประมาณล่าสุด* (2568)</p>
            <p class="b4 text-[#A6A6A6] mb-3">
              *ปีงบประมาณ เริ่มนับจาก ต.ค. - ก.ย. เช่น ปีงบประมาณ 2568 หมายถึง
              ต.ค. 67 - ก.ย. 68
            </p>

            <a
              target="_blank"
              :href="`/project?name=บริษัท-ซิโน-ไทย-เอ็นจีเนียริ่ง-แอนด์-คอนสตรัคชั่น-จำกัด-(มหาชน)`"
            >
              <ProjectData
                :data="mockdata[0]"
                :index="0"
                class="hover:bg-[#DADADA] duration-300"
              />
            </a>

            <div class="flex items-center gap-2 my-3">
              <p class="b2 text-[#8DCCF0]">สุ่มใหม่</p>
              <img src="../../public/src/images/shuffle.svg" alt="shuffle" />
            </div>
          </div>

          <div class="flex-1 p-3">
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

            <NuxtLink to="/learn#อยากร่วมจับโกงต้องสังเกตจากอะไร">
              <GoToText color="#8DCCF0" text="อ่านเกณฑ์แบบละเอียด" />
            </NuxtLink>

            <p class="b2">ตัวอย่างจากปีงบประมาณล่าสุด* (2568)</p>
            <p class="b4 text-[#A6A6A6] mb-3">
              *ปีงบประมาณ เริ่มนับจาก ต.ค. - ก.ย. เช่น ปีงบประมาณ 2568 หมายถึง
              ต.ค. 67 - ก.ย. 68
            </p>

            <a
              target="_blank"
              :href="`/project?name=สอบราคาซื้อชุดก่อสร้าง-(60.14.13.02)`"
            >
              <ProjectData
                :data="mockdata[2]"
                :index="2"
                class="hover:bg-[#DADADA] duration-300"
              />
            </a>

            <div class="flex items-center gap-2 my-3">
              <p class="b2 text-[#8DCCF0]">สุ่มใหม่</p>
              <img src="../../public/src/images/shuffle.svg" alt="shuffle" />
            </div>
          </div>
        </div>
      </div>

      <ACTLineButton />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
