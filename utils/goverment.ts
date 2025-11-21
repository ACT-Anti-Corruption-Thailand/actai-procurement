export const getGovList = async (params: string, query: string) => {
  const config = useRuntimeConfig();
  const p = params != null ? params : "";

  const res = await fetch(
    `${config.public.apiUrl}/agency/search?keyword=${query}${p}`
  );

  if (res.ok) {
    const data = await res.json();
    return JSON.parse(JSON.stringify(data)) || [];
  }
  return [];
};
