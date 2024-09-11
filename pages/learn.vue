<template>
  <Header />
  <div class="p-5 sm:p-10 bg-[#F5F5F5]">
    <h3 class="font-bold max-w-6xl mx-auto">เข้าใจการจัดซื้อจัดจ้างภาครัฐ</h3>
  </div>
  <div class="max-w-6xl mx-auto p-5 sm:p-10 b1">
    <ClientOnly fallback-tag="span" fallback="Loading...">
      <Disclosure>
        <DisclosureButton class="disclosure-btn">
          <ChevronDownIcon class="size-6" />
          <h5 class="font-bold">การจัดซื้อจัดจ้างภาครัฐ คืออะไร ?</h5>
        </DisclosureButton>
        <DisclosurePanel class="disclosure-panel">
          พระราชบัญญัติการจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ. 2560
          ได้ให้คำนิยามไว้ว่า
          <ul class="list-disc ml-5">
            <li>
              การจัดซื้อจัดจ้าง หมายถึง
              การดำเนินการเพื่อให้ได้มาซึ่งพัสดุโดยการซื้อ จ้าง เช่า แลกเปลี่ยน
              หรือโดยนิติกรรมอื่นตามที่กำหนดในกฎกระทรวง
            </li>
            <li>
              พัสดุ หมายถึง สินค้า งานบริการ งาน ก่อสร้าง
              งานจ้างที่ปรึกษาและงานจ้างออกแบบ หรือควบคุมงานก่อสร้าง
              รวมทั้งการดำเนินการอื่นตามที่กำหนดในกฎกระทรวง
            </li>
          </ul>
        </DisclosurePanel>
      </Disclosure>

      <hr class="my-5" />

      <Disclosure>
        <DisclosureButton class="disclosure-btn">
          <ChevronDownIcon class="size-6" />
          <h5 class="font-bold">เกี่ยวข้องกับใครบ้าง ?</h5>
        </DisclosureButton>
        <DisclosurePanel class="disclosure-panel">
          <ul class="list-disc ml-5">
            <li>
              <b>หน่วยงานของรัฐ ได้แก่</b>
              ราชการส่วนกลาง ส่วนภูมิภาค ส่วนท้องถิ่น
              รัฐวิสาหกิจตามกฎหมายว่าด้วยวิธีการงบประมาณ องค์การมหาชน
              องค์กรอิสระ องค์กรตามรัฐธรรมนูญ หน่วยธุรการของศาล
              มหาวิทยาลัยในกํากับ หน่วยงานสังกัดรัฐสภาหรือในกํากับของรัฐสภา
              หน่วยงานอิสระของรัฐ และหน่วยงานอื่นตามที่กําหนดในกฎกระทรวง
            </li>
            <li>
              <b>ผู้ค้าภาครัฐ หรือ คู่สัญญากับหน่วยงานของรัฐ ได้แก่</b>
              บุคคลหรือนิติบุคคล (ผู้ประกอบการ)
              ที่ยื่นข้อเสนอหรือได้ลงนามในสัญญาหรือข้อตกลงเป็นคู่สัญญากับหน่วยงานของรัฐ
            </li>
            <li>
              <b>ประชาชน </b>เจ้าของภาษี 
              ผู้ได้รับประโยชน์จากสินค้าบริการและงานก่อสร้างที่มาจากการจัดซื้อจัดจ้างภาครัฐ
              รวมถึงผู้มีส่วนร่วมในการติดตามและตรวจสอบการดำเนินงานของรัฐให้เป็นไปอย่างโปร่งใส
              มีธรรมาภิบาล และมีประสิทธิภาพ
            </li>
          </ul>
        </DisclosurePanel>
      </Disclosure>

      <hr class="my-5" />

      <Disclosure>
        <DisclosureButton class="disclosure-btn">
          <ChevronDownIcon class="size-6" />
          <h5 class="font-bold">มีกระบวนการอะไรบ้าง</h5>
        </DisclosureButton>
        <DisclosurePanel class="disclosure-panel">
          <ul class="list-decimal ml-5">
            <li>หน่วยงานของรัฐได้รับจัดสรรงบประมาณประจำปี</li>
            <li>จัดทำแผนการจัดซื้อจัดจ้างประจำปีงบประมาณ</li>
            <li>จัดทำโครงการจัดซื้อจัดจ้าง</li>
            <li>
              เลือกวิธีการจัดซื้อจัดจ้างที่เหมาะสม (ขึ้นอยู่กับสินค้า/บริการ
              งบประมาณ ตามระเบียบของกรมบัญชีกลาง)
            </li>
            <li>
              เข้าสู่กระบวนการจัดซื้อจัดจ้างภาครัฐ
              โดยขั้นตอนและกระบวนการจัดซื้อจัดจ้างในส่วนนี้
              จะมีรายละเอียดที่ต่างกันไปขึ้นอยู่กับ “วิธีการจัดหา”
            </li>
          </ul>

          <div class="bg-[#F5F5F5] p-3 mt-3 rounded-md">
            <p class="font-bold">
              ตัวอย่างขั้นตอบของวิธีการจัดหา “ประกวดราคาอิเล็กทรอนิกส์
              (e-bidding)”
            </p>
            <ul class="list-decimal ml-5">
              <li>ประกาศเชิญชวนผู้ค้า (ผู้ประกอบการ) ให้ยื่นเสนอราคา</li>
              <li>ผู้ค้าซื้อซองประมูลงาน</li>
              <li>ยื่นเสนอราคาภายในระยะเวลาที่กำหนด</li>
              <li>หน่วยงานเจ้าของโครงการพิจารณาผล</li>
              <li>ประกาศผู้ชนะ</li>
              <li>จัดทำสัญญา</li>
              <li>เผยแพร่ข้อมูลสาระสำคัญในสัญญา</li>
              <li>เข้าสู่กระบวนการบริหารสัญญาต่อไป</li>
            </ul>
          </div>
        </DisclosurePanel>
      </Disclosure>

      <hr class="my-5" />

      <Disclosure>
        <DisclosureButton class="disclosure-btn">
          <ChevronDownIcon class="size-6" />
          <h5 class="font-bold">วิธีการจัดหา มีอะไรบ้าง ลักษณะเป็นอย่างไร?</h5>
        </DisclosureButton>
        <DisclosurePanel class="disclosure-panel">
          <ul class="list-decimal ml-5">
            <li>หน่วยงานของรัฐได้รับจัดสรรงบประมาณประจำปี</li>
            <li>จัดทำแผนการจัดซื้อจัดจ้างประจำปีงบประมาณ</li>
            <li>จัดทำโครงการจัดซื้อจัดจ้าง</li>
            <li>
              เลือกวิธีการจัดซื้อจัดจ้างที่เหมาะสม (ขึ้นอยู่กับสินค้า/บริการ
              งบประมาณ ตามระเบียบของกรมบัญชีกลาง)
            </li>
            <li>
              เข้าสู่กระบวนการจัดซื้อจัดจ้างภาครัฐ
              โดยขั้นตอนและกระบวนการจัดซื้อจัดจ้างในส่วนนี้
              จะมีรายละเอียดที่ต่างกันไปขึ้นอยู่กับ “วิธีการจัดหา”
            </li>
          </ul>

          <div class="bg-[#F5F5F5] p-3 mt-3 rounded-md">
            <p class="font-bold">
              ตัวอย่างขั้นตอบของวิธีการจัดหา “ประกวดราคาอิเล็กทรอนิกส์
              (e-bidding)”
            </p>
            <ul class="list-decimal ml-5">
              <li>ประกาศเชิญชวนผู้ค้า (ผู้ประกอบการ) ให้ยื่นเสนอราคา</li>
              <li>ผู้ค้าซื้อซองประมูลงาน</li>
              <li>ยื่นเสนอราคาภายในระยะเวลาที่กำหนด</li>
              <li>หน่วยงานเจ้าของโครงการพิจารณาผล</li>
              <li>ประกาศผู้ชนะ</li>
              <li>จัดทำสัญญา</li>
              <li>เผยแพร่ข้อมูลสาระสำคัญในสัญญา</li>
              <li>เข้าสู่กระบวนการบริหารสัญญาต่อไป</li>
            </ul>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </ClientOnly>
  </div>
  <Footer />
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
</script>
