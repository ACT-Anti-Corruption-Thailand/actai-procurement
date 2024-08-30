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
        <div class="w-full sm:w-3/5 text-left flex flex-col sm:flex-row">
          <div v-for="(item, i) in 2" :key="i">
            <p class="b1 font-bold mb-2">โครงการฯ ที่พบความเสี่ยงทุจริต</p>
            <p class="b2">เกณฑ์ที่ใช้</p>
            <ul class="list-disc ml-5 b2">
              <li v-for="(item, i) in 4" :key="i">
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              </li>
            </ul>
            <a href="#">เกณฑ์แบบละเอียด</a>

            <p class="b2">ตัวอย่างจากปีงบประมาณล่าสุด* (2568)</p>
            <p class="b4">
              *ปีงบประมาณ เริ่มนับจาก ต.ค. - ก.ย. เช่น ปีงบประมาณ 2568 หมายถึง
              ต.ค. 67 - ก.ย. 68
            </p>

            <div
              class="bg-white p-5 rounded-xl bg-black w-[220px] text-black text-left"
            >
              <p class="b1 font-bold mb-3">
                บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)
              </p>
              <p class="b1">งบประมาณรวม 190,000,000,000 บาท</p>
            </div>

            <p class="b2">สุ่มใหม่</p>
          </div>
        </div>
      </div>

      <div class="mx-auto max-w-6xl rounded-md bg-[#EC1C24] p-5 mt-5 text-left">
        <div class="flex justify-between">
          <div class="flex gap-2">
            <div><img src="/src/images/report.svg" alt="" /></div>
            <div>
              <p class="b1 font-bold">
                หากมีข้อสงสัย มีข้อมูลหรือเบาะแสอื่น ๆ สามารถแจ้งได้ที่นี่
              </p>
              <p class="b3">
                เพราะความเสี่ยงทุจริตมีปัจจัยอีกมากมายที่ระบบ AI Detected
                ไม่สามารถระบุได้
              </p>
            </div>
          </div>
          <div><arrow color="#FFFFFF" class="-rotate-45" /></div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-white text-black py-10 px-3">
    <div class="text-center">
      <div
        class="flex flex-col sm:flex-row justify-center max-w-5xl mx-auto gap-3"
      >
        <div class="w-full sm:w-2/5 text-left">
          <div
            class="rounded-full b2 p-2 border w-[30px] h-[30px] flex justify-center items-center"
          >
            3
          </div>
          <h4 class="font-bold">เข้าใจการจัดซื้อจัดจ้างภาครัฐ</h4>

          <p class="b1">
            เราเข้าใจดีว่าข้อมูลเกี่ยวกับการจัดซื้อจัดจ้างภาครัฐนั้นเป็นเรื่องซับซ้อนและเต็มไปด้วยคำศัพท์เฉพาะ
            เราจึงเตรียมเนื้อหาที่เข้าใจง่ายไว้ปูพื้นฐานให้ทุกคน
            เพื่อนำไปสู่การตรวจสอบที่มีประสิทธิภาพยิ่งขึ้น
          </p>
        </div>
        <div class="w-full sm:w-3/5 text-left">
          <p class="b4">ตัวอย่างเนื้อหา</p>

          <div
            class="bg-[#F5F5F5] p-3 flex rounded-md b2 font-bold justify-between text-black items-center mt-3"
          >
            <p>โครงการจัดซื้อจัดจ้างภาครัฐคืออะไร เกี่ยวข้องกับใครบ้าง</p>
            <arrow color="#000000" />
          </div>

          <div
            class="bg-[#F5F5F5] p-3 flex rounded-md b2 font-bold justify-between text-black items-center mt-3"
          >
            <p>โครงการจัดซื้อจัดจ้างภาครัฐคืออะไร เกี่ยวข้องกับใครบ้าง</p>
            <arrow color="#000000" />
          </div>

          <div
            class="bg-[#F5F5F5] p-3 flex rounded-md b2 font-bold justify-between text-black items-center mt-3"
          >
            <p>โครงการจัดซื้อจัดจ้างภาครัฐคืออะไร เกี่ยวข้องกับใครบ้าง</p>
            <arrow color="#000000" />
          </div>

          <p class="b4">ดูเนื้อหาทั้งหมด</p>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-black py-10 px-3">
    <div class="text-center text-white">
      <h3 class="font-bold mb-10">
        เกี่ยวกับ ACT Ai จับโกงงบจัดซื้อจัดจ้างภาครัฐ
      </h3>
      <p class="b1">
        ACT Ai เป็นฐานข้อมูลเปิดขนาดใหญ่
        ที่รวบรวมข้อมูลจัดซื้อจัดจ้างภาครัฐและและข้อมูลผู้รับจ้างที่สำคัญต่อการต่อต้านทุจริตคอร์รัปชันตามมาตรฐานการเปิดเผยข้อมูลระดับสากล
        เพื่อสร้างความโปร่งใส
        สร้างการมีส่วนร่วมให้ทุกภาคส่วนของสังคมได้มีส่วนร่วมใช้ข้อมูลในการติดตามตรวจสอบ
        ซึ่งทําให้เกิดกลไกความรับผิดชอบในสังคม
        ถึงแม้ว่าที่ผ่านมาองค์กรและภาคส่วนต่าง ๆ
        ในประเทศไทยมีความพยายามในการต่อต้านและกำจัดการคอร์รัปชันอยู่ตลอด
        แต่ก็ยังมีปัญหาในการเข้าถึงข้อมูลที่ถูกต้อง เชื่อถือได้ และสะดวก
        รวมถึงขาดเครื่องมือที่ช่วยเอาข้อมูลที่เกี่ยวข้องมาเชื่อมโยงและวิเคราะห์
        เพื่อให้เกิดประโยชน์ในการต่อต้านคอร์รัปชัน ACT Ai
        จึงถูกพัฒนาให้เป็นเครื่องมือในการเปิดเผย เชื่อมโยง จัดการ
        และวิเคราะห์ชุดข้อมูลที่มีความสำคัญต่อการต่อต้านคอร์รัปชัน
        เพื่อสนับสนุนนักข่าว สื่อ ภาคประชาสังคม
        และประชาชนที่ต้องการเข้าถึงข้อมูลเพื่อตรวจสอบและติดตามการทำงานของภาครัฐโดยไม่มีค่าใช้จ่าย
      </p>
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
