<template>
  <h4 class="font-bold text-white mb-5">ความสัมพันธ์</h4>

  <div
    v-if="
      props.data?.relationshipWith?.politicians.length == 0 &&
      props.data?.relationshipWith?.politicalParties.length == 0 &&
      props.data?.relationshipWith?.companies.length == 0
    "
    class="bg-white rounded-10 gap-2 mb-3 p-5"
  >
    <h5 class="text-center text-[#8E8E8E]">ไม่พบข้อมูล</h5>
  </div>

  <div class="bg-white rounded-10 gap-2 mb-3" v-else>
    <div class="p-5 rounded-b-md w-full">
      <template v-if="props.data?.relationshipWith?.politicians.length > 0">
        <h5 class="font-black">นักการเมือง/เจ้าหน้าที่รัฐ</h5>

        <div
          class="flex flex-col-mb gap-1 mb-3"
          v-for="item in props.data?.relationshipWith?.politicians"
        >
          <div class="flex flex-1 gap-2">
            <div>
              <img
                :src="`https://parliamentwatch.wevis.info/images/politicians/${item.name.replace(
                  ' ',
                  '-'
                )}.webp`"
                alt=""
                class="w-8 h-8 rounded-full border-2 border-black"
                @error="replaceByDefaultPoliticiansImg"
              />
            </div>
            <SafeExternalLink
              class="b1 font-bold flex items-center gap-2 h-fit"
              linkClass="link-1"
              :href="`https://poldata.actai.co/info/${item.name.replace(
                ' ',
                '-'
              )}/`"
              >{{ item.name }}
              <arrow color="#0B5C90" class="-rotate-45 mt-1 mb-1"
            /></SafeExternalLink>
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
                <p
                  class="text-[#8E8E8E] b1 ml-7"
                  v-if="item2.relatedTo != null"
                >
                  {{ item2.relatedTo.join(', ') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr />
      </template>

      <template v-if="props.data?.relationshipWith?.companies.length > 0">
        <h5 class="font-black">นิติบุคคลอื่น</h5>
        <div
          class="flex flex-col-mb gap-1 mb-3"
          v-for="item in props.data?.relationshipWith.companies"
        >
          <div class="flex flex-1 gap-2">
            <div>
              <img src="../../public/src/images/corporation.svg" alt="" />
            </div>
            <a
              :href="`/contractor/${item.id}`"
              target="_blank"
              rel="noopener noreferrer"
              class="b1 text-[#0B5C90] hover:text-[#1688CA] font-bold"
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
                    v-else-if="
                      item2.relationshipType ==
                      'เป็นเครือญาติของกรรมการ/หุ้นส่วน'
                    "
                  />
                  <img
                    src="../../public/src/images/relationship_type_4.svg"
                    alt=""
                    v-else
                  />
                </div>

                <p class="text-[#EC1C24] b2">
                  {{ item2.relationshipType }}
                </p>
              </div>
              <div>
                <p
                  class="text-[#8E8E8E] b1 ml-7"
                  v-if="item2.relatedTo != null"
                >
                  {{ item2.relatedTo.join(', ') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr />
      </template>

      <template
        v-if="props.data?.relationshipWith?.politicalParties.length > 0"
      >
        <h5 class="font-black">พรรคการเมืองที่เคยได้รับเงินบริจาคจากองค์กร</h5>

        <div class="flex gap-2">
          <div
            class="flex gap-2 items-center"
            v-for="item in props.data?.relationshipWith?.politicalParties"
          >
            <img
              :src="`https://parliamentwatch.wevis.info/images/parties/${item}.webp`"
              alt=""
              class="w-8 h-8 rounded-full border-2 border-black"
              :alt="item"
              @error="replaceByDefaultPartiesImg"
            />

            <p class="b1 font-bold">{{ item }}</p>
          </div>
        </div>
        <SafeExternalLink
          class="b1 flex items-center gap-1 h-fit mt-1"
          linkClass="link-1"
          :href="`https://poldata.actai.co/info/${props.companyName.replace(
            ' ',
            '-'
          )}`"
          ><template v-slot="{ isLinkValid }">
            <template v-if="isLinkValid">
              ดูประวัติการบริจาคเงิน
              <arrow color="#0B5C90" class="-rotate-45 mt-1 mb-1" />
            </template>
          </template>
        </SafeExternalLink>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import SafeExternalLink from '../SafeExternalLink.vue';
import type { ContracterRelationship } from '../../public/src/data/data_details';
import defaultPoliticianImg from '../../public/src/images/person_fallback.svg';
import defaultPartiesImg from '../../public/src/images/party_fallback.svg';

const props = defineProps<{
  data: ContracterRelationship;
  companyName: string;
}>();

const replaceByDefaultPoliticiansImg = (e) => {
  e.target.src = defaultPoliticianImg;
};

const replaceByDefaultPartiesImg = (e) => {
  e.target.src = defaultPartiesImg;
};
</script>

<style lang="scss">
.test {
}
</style>
