export const getChartData = async (apiUrl: string, query: string) => {
  const res = await fetch(
    `${apiUrl}/project/aggregate/by-budget-year?${query}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const chartData = res.ok ? await res.json() : undefined;

  return chartData;
};

export const getCompanyChartData = async (apiUrl: string, id: string) => {
  const res = await fetch(`${apiUrl}/company/${id}/aggregate/by-budget-year`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const companyChartData = res.ok ? await res.json() : undefined;

  return companyChartData;
};
