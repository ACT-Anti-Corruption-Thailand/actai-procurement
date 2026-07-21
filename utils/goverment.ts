export const getGovList = async (params: string, query: string) => {
  const config = useRuntimeConfig();
  const p = params != null ? params : "";

  const page = p.includes('page=') ? '' : '&page=1';
  const pageSize = p.includes('pageSize=') ? '' : '&pageSize=10';

  const res = await fetch(
    `${config.public.apiUrl}/v2/agency/search?keyword=${query}${p}${page}${pageSize}`
  );

  if (res.ok) {
    const data = await res.json();
    return JSON.parse(JSON.stringify(data)) || [];
  }
  return [];
};
