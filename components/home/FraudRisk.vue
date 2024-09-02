<script setup></script>

<template>
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
</template>

<style lang="scss" scoped></style>
