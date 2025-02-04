export const getFilter = async (apiUrl: string, query?: string) => {
  const res = await fetch(`${apiUrl}/project/search/filters${query}`);

  const filterProject = res.ok ? await res.json() : undefined;

  const res2 = await fetch(`${apiUrl}/agency/search/filters${query}`);

  const filterGov = res.ok ? await res2.json() : undefined;

  const res3 = await fetch(`${apiUrl}/company/search/filters${query}`);

  const filterContractor = res.ok ? await res3.json() : undefined;

  return [filterProject, filterGov, filterContractor];
};
