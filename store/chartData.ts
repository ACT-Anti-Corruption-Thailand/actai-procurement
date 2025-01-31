export const yearlyAggregates = {
  budgetYear: 0,
  totalProject: 0,
  totalContract: 0,
  aggregateBy: [],
  contractMoneyAggregateBy: [],
};

export const yearlyAggregateBudgetYear = {
  budgetYear: '',
  totalProject: 0,
  aggregateBy: [],
};

export const chartdata = ref({ ...yearlyAggregates });
export const chartdataBudgetYear = ref({ ...yearlyAggregateBudgetYear });
