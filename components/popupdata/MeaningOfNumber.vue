<template>
  <div class="b2">
    <p class="b1 font-bold mb-3">ตัวเลขนี้บ่งบอกอะไร</p>

    <p class="mb-3">
      <b> งบประมาณ</b> หมายถึง <br />
      งบประมาณที่หน่วยงานเจ้าของโครงการได้รับจัดสรรงบประมาณมาสำหรับการจัดซื้อจัดจ้างโครงการนี้
    </p>

    <p>
      <b> ราคากลาง</b> หมายถึง
      ราคาเพื่อใช้เป็นฐานสำหรับเปรียบเทียบราคาที่ผู้ยื่นข้อเสนอได้ยื่นเสนอไว้
      ซึ่งสามารถจัดซื้อจัดจ้างได้จริงตามลำดับ ดังต่อไปนี้
    </p>

    <ul class="list-decimal ml-5 b2">
      <li v-for="item in data">
        {{ item }}
      </li>
    </ul>

    <p>หมายเหตุ:</p>

    <ul class="list-disc ml-5 b2">
      <li>
        กรณีโครงการมีหลายรายการพิจารณา
        จะแสดงราคากลางเป็นราคากลางรวมของทุกรายการในโครงการ
        ท่านสามารถค้นหาราคากลางของแต่ละรายการได้จากเอกสารที่เกี่ยวข้อง
      </li>
    </ul>

    <p class="mt-3">
      <b> วงเงินสัญญา</b>
      หมายถึง วงเงินที่หน่วยงานเจ้าของโครงการตกลงทำสัญญาร่วมกับคู่สัญญา
      (ผู้รับจ้าง) ในการจัดซื้อจัดจ้างโครงการนี้
    </p>

    <p>หมายเหตุ:</p>

    <ul class="list-disc ml-5 b2">
      <li>
        กรณีโครงการมีหลายสัญญาจ้าง จะแสดงวงเงินสัญญาเป็นวงเงินสัญญารวมของโครงการ
        ท่านสามารถดูรายละเอียดวงเงินของแต่ละสัญญาจ้างได้ที่ส่วนผู้ชนะการประมูลที่อยู่ภายใต้หัวข้อข้อมูลเจาะลึก
      </li>
      <li>
        โครงการที่ไม่มีข้อมูลวงเงินสัญญา คือ
        โครงการที่ยังไม่ได้เข้าสู่สถานะจัดทำสัญญา
      </li>
    </ul>

    <p class="mt-3">
      ACT Ai จะช่วยคำนวณส่วนต่างระหว่างวงเงินสัญญา งบประมาณ และราคากลาง
      เพื่อให้ท่านใช้เป็นข้อมูลในการตั้งข้อสังเกตเกี่ยวกับพฤติกรรมการเสนอราคา
    </p>
  </div>
</template>

<script setup>
const data = ref([
  'ราคาที่ได้มาจากการคำนวณตามหลักเกณฑ์ที่คณะกรรมการราคากลางกำหนด',
  'ราคาที่ได้มาจากฐานข้อมูลราคาอ้างอิงของพัสดุที่กรมบัญชีกลางจัดทำ',
  'ราคามาตรฐานที่สำนักงบประมาณหรือหน่วยงานกลางอื่นกำหนด',
  'ราคาที่ได้มาจากการสืบราคาจากท้องตลาด',
  'ราคาที่เคยซื้อหรือจ้างครั้งหลังสุดภายในระยะเวลาสองปีงบประมาณ',
  'ราคาอื่นใดตามหลักเกณฑ์ วิธีการ หรือแนวทางปฏิบัติของหน่วยงานของรัฐนั้น ๆ',
]);
</script>

<style lang="scss" scoped></style>
