<script setup lang="ts">
const isOpen = ref(false);
const config = useRuntimeConfig();
const featureFlags = useFeatureFlags();

const summary = ref({});
const d = new Date();

const act_project = [
  {
    name: "ACT Ai Politics Data — ACT Ai",
    desc: "ร่วมเป็นส่วนหนึ่งในการค้นหาและตรวจสอบเพื่อสร้างความโปร่งใสทางการเมือง (Political Transparency) ไปกับ ACT Ai",
    img: "og_actai",
    link: "https://poldata.actai.co/",
  },
  {
    name: "โรงเรียนโปร่งใส",
    desc: "ขอชวนทุกคนมาแลกเปลี่ยน เพื่อพัฒนาโรงเรียนไปด้วยกัน",
    img: "og_school_gov",
    link: "https://schoolgov.actai.co/",
  },
  {
    name: "ผ่างบเมือง ให้งบประมาณเมือง…เป็นเรื่องตรวจสอบได้ ",
    desc: "ร่วมกันตรวจสอบงบประมาณรายจ่ายของ อบจ. บ้านเรา และทำให้งบประมาณเมืองเป็นเรื่องที่ทุกคนตรวจสอบได้",
    img: "og_local_budgeting",
    link: "https://localbudgeting.actai.co/",
  },
];

const getOverallSummary = async () => {
  const urlParams = new URLSearchParams();
  urlParams.set("budgetYearStart", 2551);
  urlParams.set("budgetYearEnd", d.getFullYear() + 543);

  const res = await fetch(
    `${config.public.apiUrl}/project/summary/by-budget-year?${urlParams}`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    summary.value = data;
    isLoading.value = false;
  }
};

const isLoading = ref(true);

onMounted(async () => {
  await getOverallSummary();
});
</script>

<template>
  <div class="relative">
    <video
      class="pointer-events-none"
      id="background-video"
      autoplay
      loop
      muted
      playsinline
      webkit-playsinline
    >
      <source
        src="../public/src/images/landing_illustration.mp4"
        type="video/mp4"
      />
    </video>
    <div
      class="text-white min-h-[90vh] flex justify-center items-center relative z-10"
    >
      <div class="text-center max-w-screen-sm mx-auto px-3">
        <img
          src="../public/src/images/act-logo.svg"
          alt="ACT Logo"
          class="mx-auto mb-5"
        />
        <h1 class="font-bold">จับโกงงบจัดซื้อจัดจ้างภาครัฐ</h1>
        <h5 class="text-[#BCBCBC] mb-3">
          ร่วมตรวจสอบความโปร่งใสของภาครัฐด้วยการมีส่วนร่วมของประชาชน
        </h5>
        <p class="b4 font-bold">
          ค้นหาโครงการจัดซื้อจัดจ้างภาครัฐ / หน่วยงานรัฐ / ผู้รับจ้าง
        </p>

        <div class="my-3">
          <Search />
        </div>
        <div v-if="!isLoading">
          <p class="b3 text-[#BCBCBC]">
            <b>ขอบเขตข้อมูลในเว็บไซต์:</b> เก็บข้อมูลตั้งแต่ปี พ.ศ. 2551 -
            ปัจจุบัน <br />
            โดยมีโครงการจัดซื้อจัดจ้างทั้งหมด
            <template v-if="summary?.totalProject != null">
              {{ summary?.totalProject.toLocaleString() }} โครงการ หน่วยงานรัฐ
              {{ summary?.totalAgency.toLocaleString() }} หน่วยงาน และ
              ผู้รับจ้าง {{ summary?.totalCompany.toLocaleString() }} ราย
            </template>
          </p>
        </div>
        <div v-else class="flex flex-col justify-center items-center">
          <loading />
        </div>
        <p
          class="b4 flex gap-1 items-center link-2 justify-center cursor-pointer"
          @click="isOpen = true"
        >
          <info color="#8DCCF0" />
          <span>อ่านคำแนะนำและข้อจำกัดของเครื่องมือค้นหา</span>
        </p>
        <Share class="mt-1 mx-auto" color="#FFFFFF" text="แชร์" />
      </div>
    </div>
  </div>

  <Modal
    v-if="isOpen"
    @close="isOpen = false"
    title="อ่านคำแนะนำและข้อจำกัดของเครื่องมือค้นหา"
  />

  <InfoOfTheMonth />

  <WebsiteGuide />

  <FraudRisk v-if="featureFlags?.SUSPICIOUS_LABEL" />

  <div class="bg-white text-black py-10 px-3">
    <div class="text-center">
      <div class="flex flex-col-mb justify-center max-w-6xl mx-auto gap-3">
        <div class="w-full sm:w-2/5 text-left">
          <div
            class="rounded-full b2 p-2 border border-black w-[30px] h-[30px] flex justify-center items-center"
          >
            {{ featureFlags?.SUSPICIOUS_LABEL ? 3 : 2 }}
          </div>
          <h4 class="font-black mb-3">เข้าใจการจัดซื้อจัดจ้างภาครัฐ</h4>

          <p class="b1">
            เราเข้าใจดีว่าข้อมูลเกี่ยวกับการจัดซื้อจัดจ้างภาครัฐนั้นเป็นเรื่องซับซ้อนและเต็มไปด้วยคำศัพท์เฉพาะ
            เราจึงเตรียมเนื้อหาที่เข้าใจง่ายไว้ปูพื้นฐานให้ทุกคน
            เพื่อนำไปสู่การตรวจสอบที่มีประสิทธิภาพยิ่งขึ้น
          </p>
        </div>
        <div class="w-full sm:w-3/5 text-left">
          <p class="b4">ตัวอย่างเนื้อหา</p>

          <a href="/learn#what-is-government-procurement">
            <div class="info-btn">
              <p>การจัดซื้อจัดจ้างภาครัฐ คืออะไร ?</p>
              <arrow color="#000000" />
            </div>
          </a>

          <a href="/learn#who-is-involved">
            <div class="info-btn">
              <p>เกี่ยวข้องกับใครบ้าง ?</p>
              <arrow color="#000000" />
            </div>
          </a>

          <a href="/learn#processes">
            <div class="info-btn">
              <p>มีกระบวนการอะไรบ้าง ?</p>
              <arrow color="#000000" />
            </div>
          </a>

          <a href="/learn">
            <GoToText
              color="#0B5C90"
              text="ดูเนื้อหาทั้งหมด"
              class="mt-5 mb-0 link-1"
          /></a>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-black py-10 px-3">
    <div class="text-center text-white max-w-6xl mx-auto">
      <h3 class="font-bold mb-5">
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
        เพื่อให้เกิดประโยชน์ในการต่อต้านคอร์รัปชัน <br /><br />
        ACT Ai จึงถูกพัฒนาให้เป็นเครื่องมือในการเปิดเผย เชื่อมโยง จัดการ
        และวิเคราะห์ชุดข้อมูลที่มีความสำคัญต่อการต่อต้านคอร์รัปชัน
        เพื่อสนับสนุนนักข่าว สื่อ ภาคประชาสังคม
        และประชาชนที่ต้องการเข้าถึงข้อมูลเพื่อตรวจสอบและติดตามการทำงานของภาครัฐโดยไม่มีค่าใช้จ่าย
      </p>
    </div>

    <div class="flex justify-center gap-2 my-3 items-center">
      <p class="b1 text-[#BCBCBC]">พัฒนาโดย</p>
      <div>
        <a
          href="http://www.anticorruption.in.th/2016/th/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="../public/src/images/act-logo-2.svg" alt="" />
        </a>
      </div>
    </div>

    <div class="flex justify-center gap-4 my-3 items-center flex-wrap">
      <p class="b1 text-[#BCBCBC]">ร่วมกับ</p>
      <a href="https://hand.co.th/" target="_blank" rel="noopener noreferrer">
        <img src="../public/src/images/hand-logo.svg" alt="" />
      </a>
      <a
        href="https://punchup.world/"
        target="-blank"
        rel="noopener noreferrer"
      >
        <img src="../public/src/images/pu-logo.svg" alt="" />
      </a>
      <a
        href="https://www.boonmeelab.com/"
        target="-blank"
        rel="noopener noreferrer"
      >
        <img src="../public/src/images/bml-logo.svg" alt="" />
      </a>
      <a href="https://iapp.co.th/" target="-blank" rel="noopener noreferrer">
        <img src="../public/src/images/iapp-logo.svg" alt="" />
      </a>
    </div>
  </div>

  <div class="bg-[#1F1F1F] py-10 px-3">
    <div class="max-w-6xl mx-auto">
      <h5 class="font-bold text-white text-center mb-3">
        ตัวอย่างโครงการอื่น ๆ ในเครือ ACT Ai
      </h5>

      <div class="overflow-auto">
        <div class="flex gap-3 lg:justify-between flex-col-mb">
          <a
            v-for="(item, i) in act_project"
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              :key="i"
              class="border border-white rounded-10 w-full sm:w-[370px] flex flex-col h-full"
            >
              <img
                :src="`../src/images/${item.img}.png`"
                :alt="item.name"
                class="rounded-t-lg"
              />

              <div class="bg-white p-3 rounded-b-lg h-full">
                <p class="b1 font-bold">{{ item.name }}</p>
                <p class="b2">
                  {{ item.desc }}
                </p>
              </div>
            </div></a
          >
        </div>
      </div>

      <a href="https://actai.co" target="_blank" rel="noopener noreferrer">
        <div
          class="p-3 border border-white gap-2 justify-center b2 flex rounded-lg mt-5 text-white items-center"
        >
          ดูทั้งหมด<arrow color="#FFFFFF" class="-rotate-45" />
        </div>
      </a>
    </div>
  </div>

  <Footer />
</template>

<style lang="scss" scoped>
#background-video {
  height: 91vh;
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
  background: url("../public/src/images/mock_og.png");
  background-position: center;
  background-size: cover;
  aspect-ratio: 16/7;
}
</style>
