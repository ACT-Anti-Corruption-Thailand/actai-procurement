export const getFilter = async (apiUrl: string, query?: string) => {
  const res = await fetch(`${apiUrl}/project/search/filters${query}`);

  const filterProject = res.ok ? await res.json() : undefined;

  const res2 = await fetch(`${apiUrl}/agency/search/filters${query}`);

  const filterGov = res.ok ? await res2.json() : undefined;

  const res3 = await fetch(`${apiUrl}/company/search/filters${query}`);

  const filterContractor = res.ok ? await res3.json() : undefined;

  return [filterProject, filterGov, filterContractor];
};

export const getProjectFilter = async () => {
  const config = useRuntimeConfig();
  const res = await fetch(`${config.public.apiUrl}/project/search/filters`);

  if (res.ok) {
    const data = await res.json();
    return data;
  }
  return null;
};

export const getAgencyFilter = async () => {
  const config = useRuntimeConfig();

  const res2 = await fetch(`${config.public.apiUrl}/agency/search/filters`);

  if (res2.ok) {
    const data = await res2.json();
    return data;
  }

  return null;
};

export const getCompanyFilter = async () => {
  const config = useRuntimeConfig();

  const res3 = await fetch(`${config.public.apiUrl}/company/search/filters`);

  if (res3.ok) {
    const data = await res3.json();
    return data;
  }
  return null;
};
