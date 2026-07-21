export const getProjectList = async (params: string, query: string) => {
  const config = useRuntimeConfig();

  const page = params.includes('page=') ? '' : '&page=1';
  const pageSize = params.includes('pageSize=') ? '' : '&pageSize=10';

  const res = await fetch(
    `${config.public.apiUrl}/v2/project/search?keyword=${query}${params}${page}${pageSize}`
  );

  if (res.ok) {
    const data = await res.json();

    return JSON.parse(JSON.stringify(data)) || [];
  }

  return [];
};
export const getProjectSummaryList = async (params: string, query: string) => {
  const config = useRuntimeConfig();

  const res2 = await fetch(
    `${config.public.apiUrl}/v2/project/search/summary?keyword=${query}${params}`
  );

  if (res2.ok) {
    const data = await res2.json();
    return data;
  }

  return [];
};

export const getProjectChartDataList = async (
  params: string,
  query: string
) => {
  const config = useRuntimeConfig();

  const res3 = await fetch(
    `${config.public.apiUrl}/v2/project/aggregate/by-budget-year?keyword=${query}${params}`
  );

  if (res3.ok) {
    const data = await res3.json();
    return data;
  }
  return [];
};

export const getMapData = async (params: string, query: string) => {
  const config = useRuntimeConfig();

  const res = await fetch(
    `${config.public.apiUrl}/v2/project/aggregate/by-province?keyword=${query}${params}`
  );

  if (res.ok) {
    const data = await res.json();
    return data.provinces.filter(
      (x: any) => x.totalProject != 0 && x.name != 'ไม่ระบุ'
    );
  }
  return [];
};
