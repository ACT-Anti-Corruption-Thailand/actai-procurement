<template>
  <h4 class="font-bold text-white mb-5">ความสัมพันธ์</h4>

  <div class="bg-white rounded-md gap-2 mb-3">
    <div class="p-5 rounded-b-md w-full">
      <h5 class="font-black">นักการเมือง/เจ้าหน้าที่รัฐ</h5>
      <div
        class="flex flex-col-mb gap-1 mb-3"
        v-for="item in relationshipWith.politicians"
      >
        <div class="flex flex-1 gap-2">
          <div>
            <img
              :src="`../../src/images/politician-photos-crop/${item.name.replace(
                ' ',
                '-'
              )}.jpg`"
              alt=""
              class="w-8 h-8 rounded-full border-2 border-black"
            />
          </div>
          <a
            :href="`https://poldata.actai.co/info/${item.name.replace(
              ' ',
              '-'
            )}/`"
            target="_blank"
            rel="noopener noreferrer"
            class="b1 text-[#0B5C90] font-bold mb-3"
            >{{ item.name }}</a
          >
          <arrow color="#0B5C90" class="-rotate-45 mt-1" />
          <div
            class="w-full h-[1px] bg-[#EC1C24] flex-1 mt-3 hidden sm:block"
          ></div>
        </div>
        <div class="flex gap-1 flex-col flex-1">
          <div class="flex flex-col" v-for="item2 in item.relationships">
            <div class="flex gap-2">
              <div class="inline">
                <img
                  src="../../public/src/images/relationship_type_1.svg"
                  alt=""
                  v-if="item2.relationshipType == 'มีที่อยู่เดียวกับองค์กร'"
                />
                <img
                  src="../../public/src/images/relationship_type_2.svg"
                  alt=""
                  v-else-if="
                    item2.relationshipType == 'เป็น/เคยเป็นกรรมการ/หุ้นส่วน'
                  "
                />
                <img
                  src="../../public/src/images/relationship_type_3.svg"
                  alt=""
                  v-else
                />
              </div>

              <p class="text-[#EC1C24] b2">
                {{ item2.relationshipType }}
              </p>
            </div>
            <div>
              <span class="text-[#8E8E8E] b1" v-if="item2.relatedTo != null">
                {{ item2.relatedTo.join(', ') }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <h5 class="font-black">นิติบุคคลอื่น</h5>
      <div
        class="flex flex-col-mb gap-1 mb-3"
        v-for="item in relationshipWith.companies"
      >
        <div class="flex flex-1 gap-2">
          <div>
            <img src="../../public/src/images/corporation.svg" alt="" />
          </div>
          <a
            :href="`/contracter?name=${item.name.replace(/ /g, '-')}`"
            target="_blank"
            rel="noopener noreferrer"
            class="b1 text-[#0B5C90] font-bold"
            >{{ item.name }}</a
          >
          <div class="w-full h-[1px] bg-[#EC1C24] flex-1 mt-3"></div>
        </div>
        <div class="flex gap-1 flex-col flex-1">
          <div class="flex flex-col" v-for="item2 in item.relationships">
            <div class="flex gap-2">
              <div class="inline">
                <img
                  src="../../public/src/images/relationship_type_1.svg"
                  alt=""
                  v-if="item2.relationshipType == 'มีที่อยู่เดียวกับองค์กร'"
                />
                <img
                  src="../../public/src/images/relationship_type_2.svg"
                  alt=""
                  v-else-if="
                    item2.relationshipType == 'เป็น/เคยเป็นกรรมการ/หุ้นส่วน'
                  "
                />
                <img
                  src="../../public/src/images/relationship_type_3.svg"
                  alt=""
                  v-else
                />
              </div>

              <p class="text-[#EC1C24] b2">
                {{ item2.relationshipType }}
              </p>
            </div>
            <div>
              <span class="text-[#8E8E8E] b1" v-if="item2.relatedTo != null">
                {{ item2.relatedTo.join(', ') }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <h5 class="font-black">พรรคการเมืองที่เคยได้รับเงินบริจาคจากองค์กร</h5>

      <div class="flex gap-2">
        <div
          class="flex gap-2 items-center"
          v-for="item in relationshipWith.politicalParties"
        >
          <img
            :src="`../../src/images/party-logos/${item}.png`"
            alt=""
            class="w-8 h-8 rounded-full border-2 border-black"
            :alt="item"
          />

          <p class="b1 font-bold">{{ item }}</p>
        </div>
      </div>

      <a
        href="https://poldata.actai.co/donation/#parties"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GoToText color="#0B5C90" text="ดูประวัติการบริจาคเงิน" />
      </a>
    </div>
  </div>
</template>

<script setup>
const relationshipWith = {
  politicians: [
    {
      name: 'อนุทิน ชาญวีรกูล',
      relationships: [
        {
          relationshipType: 'มีที่อยู่เดียวกับองค์กร',
          relatedTo: null,
        },
      ],
    },
    {
      name: 'กัลยา โสภณพนิช',
      relationships: [
        {
          relationshipType: 'เป็น/เคยเป็นกรรมการ/หุ้นส่วน',
          relatedTo: null,
        },
      ],
    },
    {
      name: 'อภิชัย เตชะอุบล',
      relationships: [
        {
          relationshipType: 'เป็นเครือญาติของกรรมการ/หุ้นส่วน',
          relatedTo: [
            'พลเอกสุรพันธ์ สัจจิพานนท์',
            'นายเรวัต ฉ่ำเฉลิม',
            'นายวัลลภ รุ่งกิจวรเสถียร',
          ],
        },
      ],
    },
    // {
    //   name: 'พลเอกสุรพันธ์ สัจจิพานนท์',
    //   relationships: [
    //     {
    //       relationshipType: 'มีที่อยู่เดียวกับองค์กร',
    //       relatedTo: null,
    //     },
    //     {
    //       relationshipType: 'เป็น/เคยเป็นกรรมการ/หุ้นส่วน',
    //       relatedTo: null,
    //     },
    //     {
    //       relationshipType: 'เป็นเครือญาติของกรรมการ/หุ้นส่วน',
    //       relatedTo: [
    //         'พลเอกสุรพันธ์ สัจจิพานนท์',
    //         'นายเรวัต ฉ่ำเฉลิม',
    //         'นายวัลลภ รุ่งกิจวรเสถียร',
    //       ],
    //     },
    //   ],
    // },
  ],
  companies: [
    {
      id: '14',
      name: 'บริษัท แพลนเน็ต คอมมิวนิเคชั่น เอเชีย จำกัด (มหาชน)',
      relationships: [
        {
          relationshipType: 'มีกรรมการ/หุ้นส่วนคนเดียวกัน',
          relatedTo: ['นายเรวัต ฉ่ำเฉลิม'],
        },
      ],
    },
    {
      id: '15',
      name: 'บริษัท แพลนเน็ต คอมมิวนิเคชั่น เอเชีย จำกัด (มหาชน)',
      relationships: [
        {
          relationshipType: 'มีกรรมการ/หุ้นส่วนคนเดียวกัน',
          relatedTo: ['พลเอกสุรพันธ์ สัจจิพานนท์'],
        },
      ],
    },
  ],
  politicalParties: ['ประชาธิปัตย์', 'ก้าวไกล'],
};
</script>
