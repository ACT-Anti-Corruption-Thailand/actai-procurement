<template>
  <div class="flex items-center justify-end gap-2">
    <button
      @click="downloadCSV()"
      type="button"
      class="p-2.5 border btn-light-3 rounded-10 ml-1 b2 link-1 flex items-center gap-2"
    >
      <span class="hidden sm:inline">ดาวน์โหลดทั้งหมด (CSV)</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 12V14H3V12H2V14C2 14.2652 2.10536 14.5196 2.29289 14.7071C2.48043 14.8946 2.73478 15 3 15H13C13.2652 15 13.5196 14.8946 13.7071 14.7071C13.8946 14.5196 14 14.2652 14 14V12H13Z"
          fill="currentColor"
        />
        <path
          d="M13 7L12.295 6.295L8.5 10.085V1H7.5V10.085L3.705 6.295L3 7L8 12L13 7Z"
          fill="currentColor"
        />
      </svg>
    </button>
    <button
      v-if="isShowCopyBtn"
      @click="copyLink()"
      type="button"
      class="p-2.5 rounded-10 b2 text-[#0B5C90] hover:text-[#1688CA] gap-1 flex items-center tooltip"
    >
      <span class="tooltiptext hidden sm:inline" id="myTooltipBtn"
        >คัดลอกลิงก์</span
      >

      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.6252 3.37992C14.3465 3.10024 14.0153 2.87833 13.6507 2.72692C13.286 2.5755 12.8951 2.49756 12.5002 2.49756C12.1054 2.49756 11.7144 2.5755 11.3498 2.72692C10.9851 2.87833 10.6539 3.10024 10.3752 3.37992L11.0852 4.08992C11.2714 3.90378 11.4924 3.75611 11.7356 3.65537C11.9788 3.55463 12.2395 3.50278 12.5027 3.50278C12.766 3.50278 13.0267 3.55463 13.2699 3.65537C13.5131 3.75611 13.7341 3.90378 13.9202 4.08992C14.1064 4.27607 14.254 4.49706 14.3548 4.74028C14.4555 4.98349 14.5074 5.24417 14.5074 5.50742C14.5074 5.77068 14.4555 6.03135 14.3548 6.27457C14.254 6.51778 14.1064 6.73878 13.9202 6.92492L9.92023 10.9249C9.54495 11.3009 9.03569 11.5123 8.5045 11.5128C7.9733 11.5133 7.46367 11.3027 7.08773 10.9274C6.71178 10.5521 6.50032 10.0429 6.49985 9.51169C6.49938 8.98049 6.70995 8.47087 7.08523 8.09492L7.79023 7.38492L7.08523 6.67492L6.37523 7.38492C6.09555 7.66363 5.87364 7.99481 5.72222 8.35947C5.57081 8.72412 5.49286 9.11508 5.49286 9.50992C5.49286 9.90477 5.57081 10.2957 5.72222 10.6604C5.87364 11.025 6.09555 11.3562 6.37523 11.6349C6.94097 12.1934 7.70527 12.5045 8.50023 12.4999C8.89659 12.5016 9.28934 12.4246 9.65579 12.2736C10.0222 12.1225 10.3551 11.9004 10.6352 11.6199L14.6352 7.61992C15.1957 7.0561 15.5095 6.29286 15.5076 5.49785C15.5057 4.70285 15.1884 3.9411 14.6252 3.37992Z"
          fill="currentColor"
        />
        <path
          d="M2.09523 12.4099C1.90853 12.2241 1.76037 12.0032 1.65928 11.7599C1.55819 11.5167 1.50615 11.2559 1.50615 10.9924C1.50615 10.729 1.55819 10.4682 1.65928 10.2249C1.76037 9.98165 1.90853 9.76076 2.09523 9.57492L6.09523 5.57492C6.28107 5.38822 6.50196 5.24007 6.74521 5.13898C6.98847 5.03788 7.2493 4.98584 7.51273 4.98584C7.77616 4.98584 8.03699 5.03788 8.28024 5.13898C8.5235 5.24007 8.74439 5.38822 8.93023 5.57492C9.11575 5.76222 9.2618 5.98486 9.35971 6.22963C9.45762 6.47441 9.5054 6.73634 9.50023 6.99992C9.50175 7.26433 9.45084 7.52641 9.35042 7.771C9.25001 8.0156 9.10209 8.23786 8.91523 8.42492L7.85523 9.49992L8.56523 10.2099L9.62523 9.14992C10.1895 8.58568 10.5065 7.82039 10.5065 7.02242C10.5065 6.22446 10.1895 5.45917 9.62523 4.89492C9.06098 4.33068 8.2957 4.01368 7.49773 4.01368C6.69976 4.01368 5.93448 4.33068 5.37023 4.89492L1.37023 8.89492C1.0898 9.17373 0.867251 9.50522 0.715391 9.87033C0.56353 10.2354 0.485352 10.627 0.485352 11.0224C0.485352 11.4179 0.56353 11.8094 0.715391 12.1745C0.867251 12.5396 1.0898 12.8711 1.37023 13.1499C1.93964 13.7042 2.70568 14.0099 3.50023 13.9999C4.30178 14.0007 5.07109 13.6843 5.64023 13.1199L4.93023 12.4099C4.74439 12.5966 4.5235 12.7448 4.28024 12.8459C4.03699 12.947 3.77616 12.999 3.51273 12.999C3.2493 12.999 2.98847 12.947 2.74521 12.8459C2.50196 12.7448 2.28107 12.5966 2.09523 12.4099Z"
          fill="currentColor"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { csvFormat } from 'd3';
import qs from 'qs';

const props = defineProps<{
  filterList: string;
  section: string;
  part?: string;
  keyword?: string;
  resultSection?: string;
  isShowCopyBtn?: boolean;
}>();
const config = useRuntimeConfig();
const route = useRoute();
const urlLink = ref('');

const downloadCSV = async () => {
  if (props.section == 'bidder') {
    const urlParams = window.location.pathname.split('/')[2];
    const res = await fetch(
      `${config.public.apiUrl}/project/${urlParams}/${props.part}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (res.ok) {
      const data = await res.json();

      let csvData = csvFormat(
        props.part == 'contract'
          ? data.contractors.flatMap((contractor) =>
              contractor.contracts.map((contract) => ({
                id: contractor.id,
                name: contractor.name,
                contract_number: contract.number,
                contract_date: contract.date,
                contract_money: contract.money,
                contract_id: contract.id,
                contract_status: contract.status,
              }))
            )
          : data.items.flatMap((item) =>
              item.contractors.map((contractor) => ({
                name: item.name,
                estimatePrice: item.estimatePrice,
                contractor_id: contractor.id,
                contractor_isWinner: contractor.isWinner,
                contractor_name: contractor.name,
                contractor_bidding_price: contractor.biddingPrice,
              }))
            )
      );

      let blob = new Blob([csvData], { type: 'text/csv' });
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = `${
        props.part == 'contract' ? 'ผู้ชนะการประมูล' : 'การเสนอราคา'
      }-${urlParams}.csv`;
      document.body.appendChild(a);
      a.click();
    }
  } else {
    let str = '';
    let filter_query_text = '';

    var link = document.createElement('a');
    str = qs.stringify(route.query);
    filter_query_text =
      props.resultSection != ''
        ? props.filterList.replace('search', props.resultSection)
        : props.filterList;

    link.href = `${config.public.apiUrl}/${props.section}/search/download-csv${filter_query_text}`;
    document.body.appendChild(link);
    link.click();
  }
};

const copyLink = () => {
  let url = '';
  let hashtag = '';

  url = config.public.baseUrl;

  if (route.path != '/') url += route.path.replace('/', '');

  if (route.query.search != '') url += props.filterList;

  if (props.section.includes('project')) hashtag = '#project';
  else if (props.section.includes('agency')) hashtag = '#government';
  else if (props.section.includes('company')) hashtag = '#contractor';
  else if (props.section.includes('bidder')) hashtag = '#bidder';

  if (props.part == 'item-estimate-price') hashtag = '#estimateprice';

  //if (props.filterList != '') url += props.filterList;
  urlLink.value = url + hashtag;

  navigator.clipboard.writeText(urlLink.value).then(function () {
    var tooltip = document.getElementById('myTooltipBtn');
    tooltip.innerHTML = 'คัดลอกแล้ว';
  });
};
</script>

<style scoped></style>
