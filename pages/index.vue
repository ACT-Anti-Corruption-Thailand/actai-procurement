<template>
  <div class="relative">
    <video
      id="background-video"
      autoplay
      loop
      muted
      poster="../public/src/images/bg-intro.svg"
    >
      <source
        src="../public/src/images/landing_illustration.mp4"
        type="video/mp4"
      />
    </video>
    <div class="text-white min-h-[90vh] flex justify-center items-center">
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
  </div>

  <InfoOfTheMonth />

  <WebsiteGuide />

  <FraudRisk />

  <div class="bg-white text-black py-10 px-3">
    <div class="text-center">
      <div class="flex flex-col-mb justify-center max-w-5xl mx-auto gap-3">
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
    <div class="text-center text-white max-w-6xl mx-auto">
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

    <div class="flex justify-center gap-2 my-3 items-center">
      <p class="b1 text-[#BCBCBC]">พัฒนาโดย</p>
      <div>
        <img src="../public/src/images/act-logo-2.svg" alt="" />
      </div>
    </div>

    <div class="flex justify-center gap-4 my-3 items-center flex-wrap">
      <p class="b1 text-[#BCBCBC]">ร่วมกับ</p>
      <a href="https://hand.co.th/" target="_blank" rel="noopener noreferrer">
        <img src="../public/src/images/hand_logo.svg" alt="" />
      </a>
      <a
        href="https://punchup.world/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="../public/src/images/pu_logo.svg" alt="" />
      </a>
      <a
        href="https://www.boonmeelab.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="../public/src/images/bml_logo.svg" alt="" />
      </a>
      <a href="https://iapp.co.th/" target="_blank" rel="noopener noreferrer">
        <img src="../public/src/images/iapp_logo.svg" alt="" />
      </a>
    </div>
  </div>

  <div class="bg-[#1F1F1F] py-10 px-3">
    <div class="max-w-6xl mx-auto">
      <h5 class="font-bold text-white text-center mb-3">
        ตัวอย่างโครงการอื่นๆ ในเครือ ACT Ai
      </h5>

      <div class="overflow-auto">
        <div class="flex gap-3 lg:justify-center flex-col-mb">
          <div
            v-for="(item, i) in 3"
            :key="i"
            class="border border-white rounded-md w-full sm:w-[370px]"
          >
            <div class="aspect-video mock-og rounded-t-md"></div>

            <div class="bg-white rounded-b-md p-3">
              <p class="b1 font-bold">Build Better Lives by CoST</p>
              <p class="b2">
                ค้นหาโครงการหน้าบ้าน
                และร่วมสร้างความโปร่งใสในโครงการก่อสร้างภาครัฐ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#background-video {
  height: 90vh;
  width: 100vw;
  object-fit: cover;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
}

.mock-og {
  background: url('../public/src/images/mock_og.png');
  background-position: center;
  background-size: cover;
}
</style>
