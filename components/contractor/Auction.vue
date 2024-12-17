<template>
  <h4 class="font-bold text-white mb-5">กลุ่มเอกชนที่เข้าร่วมประมูลด้วยกัน</h4>

  <div v-if="props.data.length == 0" class="bg-white rounded-10 gap-2 mb-3 p-5">
    <h5 class="text-center text-[#8E8E8E]">ไม่พบข้อมูล</h5>
  </div>

  <div v-else>
    <div class="bg-[#F5F5F5] rounded-10 p-7" v-if="!isSelectFirstCompany">
      <p class="b1">
        {{ props.companyName }}
      </p>
      <div class="flex items-center gap-2 justify-between mb-3">
        <h5 class="font-bold w-2/4">
          เคยร่วมประมูลกับเอกชน {{ props.data.length }} ราย
        </h5>
        <FilterResultContractor section="" />
      </div>
      <div class="relative w-full">
        <input
          type="text"
          class="input-text h-full bg-white"
          v-model="searchText"
          placeholder="พิมพ์ชื่อเอกชน"
        />
        <SearchIcon color="#000000" class="absolute inset-y-0 my-auto left-2" />
      </div>

      <div class="flex justify-between b2 pt-5 mb-3">
        <p class="text-[#0B5C90] flex gap-2 items-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5001 2.00032C11.4343 1.99994 11.369 2.01255 11.3081 2.03743C11.2472 2.06231 11.1918 2.09898 11.1451 2.14532L8.08008 5.21532L6.41508 2.71532C6.36205 2.6341 6.28655 2.57006 6.19778 2.531C6.109 2.49194 6.01078 2.47954 5.91508 2.49532C5.82134 2.50928 5.7335 2.54959 5.6618 2.61156C5.59009 2.67352 5.53747 2.75459 5.51008 2.84532L2.51008 12.8453C2.47442 12.9349 2.46541 13.0328 2.48413 13.1274C2.50286 13.222 2.54852 13.3091 2.61562 13.3783C2.68272 13.4475 2.76839 13.4959 2.86233 13.5175C2.95626 13.5392 3.05445 13.5332 3.14508 13.5003L13.1451 10.5003C13.2358 10.4729 13.3169 10.4203 13.3788 10.3486C13.4408 10.2769 13.4811 10.1891 13.4951 10.0953C13.5109 9.99962 13.4985 9.9014 13.4594 9.81262C13.4203 9.72384 13.3563 9.64834 13.2751 9.59532L10.7751 7.93032L13.8451 4.86532C13.8919 4.81884 13.9291 4.76353 13.9545 4.70261C13.9799 4.64168 13.993 4.57632 13.993 4.51032C13.993 4.44431 13.9799 4.37896 13.9545 4.31803C13.9291 4.2571 13.8919 4.2018 13.8451 4.15532L11.8451 2.15532C11.7548 2.06047 11.6309 2.00482 11.5001 2.00032ZM11.5001 3.20532L12.7951 4.50032L9.21508 8.07532L11.8401 9.82532L3.74508 12.2553L6.17508 4.16032L7.92508 6.78532L11.5001 3.20532Z"
              fill="#0B5C90"
            />
          </svg>
          คลิกชื่อเพื่อดูโครงการที่เจอกัน
        </p>
        <p class="text-[#9A0D13]">จำนวนโครงการที่เจอกัน</p>
      </div>

      <div
        v-for="item in result"
        class="flex justify-between b1 cursor-pointer hover:bg-white duration-300 p-2.5 rounded-lg"
        @click="selectCompany(item)"
      >
        <p>{{ item.name }}</p>
        <p class="text-[#9A0D13] b2 flex gap-2 items-center">
          {{ item.totalBiddingProject
          }}<svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.0008 8L6.00078 13L5.30078 12.3L9.60078 8L5.30078 3.7L6.00078 3L11.0008 8Z"
              fill="#9A0D13"
            />
          </svg>
        </p>
      </div>
    </div>
    <div v-else>
      <div class="bg-[#F5F5F5] rounded-t-md p-7">
        <p
          class="b4 flex items-center gap-1 text-[#0B5C90] mb-3 cursor-pointer"
          @click="
            isSelectFirstCompany = false;
            participatedCompany = [];
          "
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 8L10 3L10.7 3.7L6.4 8L10.7 12.3L10 13L5 8Z"
              fill="#0B5C90"
            />
          </svg>
          กลับ
        </p>
        <p class="b1">
          {{ props.companyName }}
        </p>

        <div>
          <p class="b4 ml-1.5">+</p>
          <div
            class="flex items-center gap-2"
            v-for="item in participatedCompany"
          >
            <div
              class="b4 border border-black rounded-full w-5 h-5 text-center"
            >
              1
            </div>
            <div class="bg-white rounded-10 p-2.5 font-bold b1 w-full flex-1">
              {{ item }}
            </div>
            <img src="../../public/src/images/close.svg" />
          </div>
        </div>

        <p class="b1 text-[#8E8E8E] ml-7 mt-2">
          ไม่พบเอกชนอื่นที่เคยร่วมประมูลกับกลุ่มนี้
        </p>
      </div>
      <div class="bg-[#FFFFFF] rounded-b-md p-7">
        <h5 class="font-bold text-[#5E5E5E]">
          <span class="text-[#9A0D13]"
            >เคยประมูลร่วมกัน {{ totalProject }} โครงการ</span
          >
          ของ {{ contracterParticipatedCompanyById.length }} หน่วยงานรัฐ
        </h5>

        <template v-for="item in contracterParticipatedCompanyById">
          <p class="b2 text-[#9A0D13]">
            <span class="text-[#5E5E5E]">{{ item.agency.name }}</span>
            {{ item.projects.length }}
            โครงการ
          </p>

          <div class="flex gap-5 my-3" v-for="item2 in item.projects">
            <div class="b2 pt-5 text-[#8E8E8E]">1</div>
            <div class="bg-[#FFEFF0] rounded-10 text-[#9A0D13] p-5 w-full">
              <a target="_blank" :href="`/project/0`">
                <p class="b2 font-bold">{{ item2.name }}</p>
              </a>
              <p class="b4 my-1">เลขที่โครงการ: {{ item2.id }}</p>
              <p class="b4 text-black"><b>ผู้ชนะ:</b> {{ item2.winner }}</p>

              <Disclosure>
                <DisclosureButton
                  class="flex items-center text-[#0B5C90] gap-2 w-full b4 mt-3"
                >
                  <ChevronDownIcon class="size-2" /> ดูรายชื่อผู้เข้าร่วมประมูล
                  ({{ item2.bidders.length }} ราย)
                </DisclosureButton>
                <DisclosurePanel class="b4 text-black mt-3">
                  <p class="font-bold">ผู้เข้าร่วมประมูล:</p>
                  <ul class="list-decimal ml-5">
                    <li v-for="item3 in item2.bidders">{{ item3 }}</li>
                  </ul>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import type {
  ContracterRelatedCompanies,
  ContracterParticipatedCompanies,
} from '../../public/src/data/data_details';

const props = defineProps<{
  data: ContracterRelatedCompanies;
  companyName: string;
}>();

const config = useRuntimeConfig();

const contractorRelatedCompanyById = ref<ContracterRelatedCompanies>([]);
const contracterParticipatedCompanyById = ref<ContracterParticipatedCompanies>(
  []
);
const searchText = ref('');
const isSelectFirstCompany = ref(false);
const firstCompany = ref('');
const participatedCompany = ref([]);
const totalProject = ref(0);

const result = computed(() =>
  searchText.value === ''
    ? props.data
    : props.data.filter((person) => person.name.includes(searchText.value))
);

const selectCompany = (data) => {
  firstCompany.value = data.name;
  isSelectFirstCompany.value = true;
  participatedCompany.value.push(data.name);
  getContracterRelatedCompany(data.id);
  getContracterParticipatedCompany(data.id);
};

const getContracterRelatedCompany = async (id) => {
  const res = await fetch(
    `${config.public.apiUrl}/company/${id}/related-company`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    contractorRelatedCompanyById.value = data.relatedCompanies;
  }
};

const getContracterParticipatedCompany = async (id) => {
  const res = await fetch(
    `${config.public.apiUrl}/project/participated-company?companyId=` + id,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    contracterParticipatedCompanyById.value = data.participatedProjects;

    const a = data.participatedProjects.map((x) => x.projects.length);
    totalProject.value = a.reduce((a, b) => a + b, 0);
  }
};
</script>

<style scoped>
.input-text {
  background: white;
  padding-left: 30px;
}
</style>
