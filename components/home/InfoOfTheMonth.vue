<script setup>
const config = useRuntimeConfig();
const summary = ref({});

var date = new Date();
const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);

const getSummary = async () => {
  const urlParams = new URLSearchParams();
  urlParams.set('startDate', firstDay.toISOString().split('T')[0]);
  urlParams.set('endDate', lastDay.toISOString().split('T')[0]);

  const res = await fetch(
    `${config.public.apiUrl}/project/summary/by-date?${urlParams}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    summary.value = data;
  }
};

const setDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
  };

  return new Date(date).toLocaleDateString('th-TH', options);
};

onMounted(async () => {
  await getSummary();
});
</script>

<template>
  <div
    class="bg-[#1F1F1F] py-10 px-3"
    v-if="
      summary.totalProject != 0 ||
      summary.totalAgency != 0 ||
      summary.totalCompany != 0
    "
  >
    <div class="text-center text-white">
      <h5 class="font-bold">
        ข้อมูลน่าสนใจประจำเดือน{{ setDate(new Date()) }}
      </h5>
      <p class="b1 text-[#A6A6A6]">
        มีโครงการฯ ใหม่ {{ summary?.totalProject?.toLocaleString() }} โครงการ
        โดย {{ summary?.totalAgency?.toLocaleString() }} หน่วยงานรัฐ และ
        {{ summary?.totalCompany?.toLocaleString() }} ผู้รับจ้าง
      </p>
      <div class="overflow-auto mt-3 hide-scroll">
        <div class="flex gap-3 lg:justify-center max-w-6xl mx-auto">
          <div class="flex-1 flex flex-col">
            <p class="b1 font-bold mb-2.5">โครงการฯ ที่งบประมาณสูงที่สุด</p>
            <ProjectData
              :data="summary?.projectWithHighestBudgetMoney"
              :index="0"
              class="h-full"
            />
          </div>
          <div class="flex-1 flex flex-col">
            <p class="b1 font-bold mb-2.5">หน่วยงานรัฐที่ของบประมาณมากที่สุด</p>
            <ProjectData
              :data="summary?.agencyWithHighestBudgetMoney"
              :index="1"
              class="h-full"
            />
          </div>
          <div class="flex-1 flex flex-col">
            <p class="b1 font-bold mb-2.5">
              ผู้รับจ้างที่มีมูลค่าสัญญารวมมากที่สุด
            </p>
            <ProjectData
              :data="summary?.companyWithHighestContractMoney"
              :index="2"
              class="h-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
