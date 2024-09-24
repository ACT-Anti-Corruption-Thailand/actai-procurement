<template>
  <h4 class="font-bold text-white mb-5">กลุ่มเอกชนที่เข้าร่วมประมูลด้วยกัน</h4>

  <div class="bg-[#F5F5F5] rounded-md p-7" v-if="!isSelectFirstCompany">
    <p class="b1">
      บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)
    </p>
    <h5 class="font-bold mb-3">เคยร่วมประมูลกับเอกชน 29 ราย</h5>
    <div class="relative w-full">
      <input
        type="text"
        class="input-text h-full bg-white"
        v-model="searchText"
        placeholder="พิมพ์ชื่อเอกชน"
      />
      <SearchIcon color="#000000" class="absolute inset-y-0 my-auto left-2" />
    </div>

    <div
      v-for="item in result"
      class="flex justify-between b1 pt-5 cursor-pointer"
      @click="selectCompany(item.name)"
    >
      <p>{{ item.name }}</p>
      <p class="text-[#9A0D13] b2">{{ item.totalBiddingProject }}</p>
    </div>
  </div>
  <div v-else>
    <div class="bg-[#F5F5F5] rounded-t-md p-7">
      <p class="b1">
        บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)
      </p>

      <div>
        <p class="b4 ml-1.5">+</p>
        <div class="flex items-center gap-2">
          <div class="b4 border border-black rounded-full w-5 h-5 text-center">
            1
          </div>
          <div class="bg-white rounded-md p-2.5 font-bold b1 w-full">
            บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)
          </div>
          <img
            src="../../public/src/images/close.svg"
            @click="isSelectFirstCompany = false"
          />
        </div>
      </div>

      <p class="b1 text-[#8E8E8E] ml-7 mt-2">
        ไม่พบเอกชนอื่นที่เคยร่วมประมูลกับกลุ่มนี้
      </p>
    </div>
    <div class="bg-[#FFFFFF] rounded-b-md p-7">
      <h5 class="font-bold text-[#5E5E5E]">
        <span class="text-[#9A0D13]">เคยประมูลร่วมกัน 2 โครงการ</span> ของ 2
        หน่วยงานรัฐ
      </h5>

      <template v-for="item in participatedProjects">
        <p class="b2 text-[#9A0D13]">
          <span class="text-[#5E5E5E]">{{ item.agency.name }}</span> ของ 1
          หน่วยงานรัฐ
        </p>

        <div class="flex gap-5 my-3">
          <div class="b2 pt-5">1</div>
          <div class="bg-[#FFEFF0] rounded-md text-[#9A0D13] p-5 w-full">
            <a
              target="_blank"
              :href="`/project?name=${item.name.replace(/ /g, '-')}`"
            >
              <p class="b2 font-bold">{{ item.name }}</p>
            </a>
            <p class="b4">เลขที่โครงการ: {{ item.id }}</p>
            <p class="b4 text-black">
              <b>ผู้ชนะ:</b> {{ item.bidders.join(',') }}
            </p>

            <Disclosure>
              <DisclosureButton
                class="flex items-center text-[#0B5C90] gap-2 w-full b4 mt-3"
              >
                <ChevronDownIcon class="size-2" /> ดูรายชื่อผู้เข้าร่วมประมูล
                ({{ item.bidders.length }} ราย)
              </DisclosureButton>
              <DisclosurePanel class="b4 text-black mt-3">
                <p class="font-bold">ผู้เข้าร่วมประมูล:</p>
                <ul class="list-decimal ml-5">
                  <li v-for="item2 in item.bidders">{{ item2 }}</li>
                </ul>
              </DisclosurePanel>
            </Disclosure>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';

const searchText = ref('');
const isSelectFirstCompany = ref(false);
const firstCompany = ref('');

const relatedCompanies = [
  {
    id: '11',
    name: 'บริษัท โกลด์ อินฟินิท จำกัด',
    totalBiddingProject: 15,
  },
  {
    id: '12',
    name: 'บริษัท เออาร์ดี เอ็นจิเนียริ่ง ซิสเต็มส์ จำกัด',
    totalBiddingProject: 10,
  },
  {
    id: '13',
    name: 'ธรู ไอพี คอมมิวนิค จำกัด',
    totalBiddingProject: 4,
  },
];

const result = computed(() =>
  searchText.value === ''
    ? relatedCompanies
    : relatedCompanies.filter((person) =>
        person.name.includes(searchText.value)
      )
);

const participatedProjects = [
  {
    id: '0',
    name: 'สอบราคาซื้อชุดก่อสร้าง (60.14.13)',
    agency: {
      id: '0',
      name: 'การไฟฟ้านครหลวง ฝ่ายก่อสร้าง',
    },
    winner: 'บริษัท แพลนเน็ต คอมมิวนิเคชั่น เอเชีย จำกัด (มหาชน)',
    bidders: [
      'บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)',
      'บริษัท แพลนเน็ต คอมมิวนิเคชั่น เอเชีย จำกัด (มหาชน)',
      'บริษัท เออาร์ดี เอ็นจิเนียริ่ง ซิสเต็มส์ จำกัด',
      'บริษัท โกลด์ อินฟินิท จำกัด',
    ],
  },
  {
    id: '1',
    name: 'สอบราคาซื้อชุดก่อสร้าง (60.14.13)',
    agency: {
      id: '1',
      name: 'สำนักงานเศรษฐกิจการเกษตร',
    },
    winner: 'บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)',
    bidders: [
      'บริษัท ซิโน-ไทย เอ็นจีเนียริ่ง แอนด์ คอนสตรัคชั่น จำกัด (มหาชน)',
      'บริษัท แพลนเน็ต คอมมิวนิเคชั่น เอเชีย จำกัด (มหาชน)',
      'บริษัท เออาร์ดี เอ็นจิเนียริ่ง ซิสเต็มส์ จำกัด',
      'บริษัท โกลด์ อินฟินิท จำกัด',
    ],
  },
];

const selectCompany = (name: string) => {
  firstCompany.value = name;
  isSelectFirstCompany.value = true;
};
</script>

<style scoped>
.input-text {
  background: white;
  padding-left: 30px;
}
</style>
