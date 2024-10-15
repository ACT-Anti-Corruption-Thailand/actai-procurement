import { defineStore } from 'pinia';

export const useDataStore = defineStore('getData', {
  state: () => ({
    projects: [],
    gov: [],
    contractor: [],
    chartData: [],
  }),
  actions: {
    async getProjectDataList(params: string) {
      const urlParams = decodeURI(window.location.href).split('=')[1];

      const res = await fetch(
        `https://act-api.meeboon.dev/project/search?keyword=${urlParams}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        this.projects = JSON.parse(JSON.stringify(data)) || [];
      }
    },
    async getGovDataList(params: string) {
      const urlParams = decodeURI(window.location.href).split('=')[1];

      const res = await fetch(
        `https://act-api.meeboon.dev/agency/search?keyword=${urlParams}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        this.gov = JSON.parse(JSON.stringify(data)) || [];
      }
    },
    async getContractorDataList(params: string) {
      const urlParams = decodeURI(window.location.href).split('=')[1];

      const res = await fetch(
        `https://act-api.meeboon.dev/company/search?keyword=${urlParams}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        this.contractor = JSON.parse(JSON.stringify(data)) || [];
      }
    },
  },
});
