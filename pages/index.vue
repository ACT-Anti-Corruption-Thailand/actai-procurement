<template>
  <div
    class="text-white bg-black min-h-[90vh] flex justify-center items-center bg-intro"
  >
    <div class="text-center max-w-screen-sm mx-auto px-3">
      <img
        src="../public/src/images/act-logo.svg"
        alt="ACT Logo"
        class="mx-auto mb-5"
      />
      <h1 class="font-bold">จับโกงงบจัดซื้อจัดจ้างภาครัฐ</h1>
      <h5>ร่วมตรวจสอบความโปร่งใสของภาครัฐด้วยการมีส่วนร่วมของประชาชน</h5>
      <p class="b1 font-bold">
        ค้นหาโครงการจัดซื้อจัดจ้างภาครัฐ / หน่วยงานรัฐ / ผู้รับจ้าง
      </p>
      <p class="b3">
        ขอบเขตข้อมูลในเว็บไซต์: เก็บข้อมูลตั้งแต่ปี พ.ศ. 2562 - ปัจจุบัน
        โดยมีโครงการจัดซื้อจัดจ้างทั้งหมด xx,xxx,xxx,xxx โครงการ หน่วยงานรัฐ
        x,xxx หน่วยงาน และ ผู้รับจ้าง xx,xxx ราย
      </p>
      <p class="b4">อ่านคำแนะนำและข้อจำกัดของเครื่องมือค้นหา</p>
    </div>
  </div>
  <div class="bg-[#1F1F1F] py-10 px-3">
    <div class="text-center text-white">
      <h5>ข้อมูลน่าสนใจประจำเดือนกรกฎาคม 2568</h5>
      <p class="b1">
        มีโครงการฯ ใหม่ xx,xxx โครงการ โดย x,xxx หน่วยงานรัฐ และ x,xxx
        ผู้รับจ้าง
      </p>
      <div class="overflow-auto">
        <div class="flex gap-3 lg:justify-center">
          <div v-for="item in 3">
            <p class="b1 font-bold mb-5">โครงการฯ ที่งบประมาณสูงที่สุด</p>
            <div
              class="bg-white p-5 rounded-xl bg-black w-[370px] text-black text-left"
            >
              <p class="b1 font-bold mb-3">
                บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)
              </p>
              <p class="b1">งบประมาณรวม 190,000,000,000 บาท</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-black py-10 px-3">
    <div class="text-center text-white">
      <h3 class="font-bold mb-10">เว็บไซต์นี้ทำอะไรได้บ้าง</h3>
      <div
        class="flex flex-col sm:flex-row justify-center max-w-5xl mx-auto gap-3"
      >
        <div class="w-full sm:w-2/5 text-left">
          <div
            class="rounded-full b2 p-2 border w-[30px] h-[30px] flex justify-center items-center"
          >
            1
          </div>
          <h4 class="font-bold">
            ค้นหาโครงการจัดซื้อจัดจ้างภาครัฐ/หน่วยงานรัฐ/ผู้รับจ้างที่สนใจ
          </h4>

          <p class="b1">สามารถค้นได้จากคำหลายประเภท เช่น</p>
          <ul class="b1 list-disc ml-5">
            <li>ชื่อ หรือ คำในชื่อโครงการ/หน่วยงานรัฐ/ผู้รับจ้าง</li>
            <li>เลขที่โครงการ</li>
            <li>จังหวัดที่ตั้งของโครงการ</li>
            <li>เลขทะเบียนนิติบุคคลของผู้รับจ้าง</li>
          </ul>
        </div>
        <div class="w-full sm:w-3/5 text-left">
          <p class="b2">
            ตัวอย่างคำที่พบบ่อยในชื่อโครงการปีงบประมาณ*ล่าสุด (2568)
          </p>
          <p class="b4">
            *ปีงบประมาณ เริ่มนับจาก ต.ค. - ก.ย. เช่น ปีงบประมาณ 2568 หมายถึง
            ต.ค. 67 - ก.ย. 68
          </p>
          <div class="overflow-auto">
            <div class="flex gap-3 gap-3">
              <div v-for="item in 3">
                <div
                  class="bg-white p-5 rounded-xl bg-black w-[220px] text-black text-left"
                >
                  <p class="b1 font-bold mb-3">
                    บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด
                    (มหาชน)
                  </p>
                  <p class="b1">งบประมาณรวม 190,000,000,000 บาท</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-[#510003] py-10 px-3">
    <div class="text-center text-white">
      <div
        class="flex flex-col sm:flex-row justify-center max-w-5xl mx-auto gap-3"
      >
        <div class="w-full sm:w-2/5 text-left">
          <div
            class="rounded-full b2 p-2 border w-[30px] h-[30px] flex justify-center items-center"
          >
            2
          </div>
          <h4 class="font-bold">ตรวจสอบความเสี่ยงทุจริต</h4>

          <p class="b1">
            เว็บไซต์ใช้ระบบ AI rule-based detection
            ในการระบุความเสี่ยงทุจริตเบื้องต้น
            เป็นเพียงการระบุความเสี่ยงเท่านั้น
            ซึ่งไม่ได้หมายความว่ามีการทุจริตเกิดขึ้นแล้ว
          </p>
        </div>
        <div class="w-full sm:w-3/5 text-left">
          <p class="b2">
            ตัวอย่างคำที่พบบ่อยในชื่อโครงการปีงบประมาณ*ล่าสุด (2568)
          </p>
          <p class="b4">
            *ปีงบประมาณ เริ่มนับจาก ต.ค. - ก.ย. เช่น ปีงบประมาณ 2568 หมายถึง
            ต.ค. 67 - ก.ย. 68
          </p>
          <div class="overflow-auto">
            <div class="flex gap-3 gap-3">
              <div v-for="item in 3">
                <div
                  class="bg-white p-5 rounded-xl bg-black w-[220px] text-black text-left"
                >
                  <p class="b1 font-bold mb-3">
                    บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด
                    (มหาชน)
                  </p>
                  <p class="b1">งบประมาณรวม 190,000,000,000 บาท</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bg-intro {
  position: relative;
  z-index: 1;
}

.bg-intro :before {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background: url('../public/src/images/bg-intro.svg');
  background-repeat: no-repeat;
  background-position: 8% 0;
  background-size: cover;
  z-index: -1;
  animation: slide 10s infinite;
}

@keyframes slide {
  0% {
    background-position: 0% 0;
  }

  13% {
    background-position: 20% 0;
  }

  26% {
    background-position: 32% 0;
  }

  39% {
    background-position: 44% 0;
  }

  52% {
    background-position: 56% 0;
  }

  65% {
    background-position: 68% 0;
  }

  78% {
    background-position: 80% 0;
  }

  100% {
    background-position: 92% 0;
  }
}
</style>
