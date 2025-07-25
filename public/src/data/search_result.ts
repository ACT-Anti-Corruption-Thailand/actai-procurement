export interface Project {
  pagination: {
    totalItem: number;
    totalPage: number;
  };
  searchResult: {
    projectId: string;
    projectName: string;
    projectStatus: string;
    budgetYear: string;
    totalBudget: number;
    totalBudgetMoney: number;
    agencyId: string;
    agencyName: string;
    province: string;
    hasCorruptionRisk: boolean;
    totalContractMoney: number;
    resourcingMethod: string;
    resourcingType: string;
    contractors?: [];
    bidder?: [];
    announcementDate: Date;
  }[];
}

export interface Government {
  pagination: {
    totalItem: number;
    totalPage: number;
  };
  searchResult: [
    {
      agencyId: string;
      agencyName: string;
      agencyBelongTo: string;
      province: string;
      totalProject: number;
      totalProjectHasCorruptionRisk: number;
      totalBudgetMoney: number;
      totalContractMoney: number;
    }
  ];
}

export interface Contractor {
  pagination: {
    totalItem: number;
    totalPage: number;
  };
  searchResult: [
    {
      companyId: string;
      companyName: string;
      province: string;
      totalProject: number;
      hasCorruptionRisk: number;
      totalContractMoney: number;
    }
  ];
}

export interface MapData {
  provinces: [
    {
      name: string;
      totalProject: number;
      totalBudgetMoney: number;
      totalCorruptionProject: number;
      totalCorruptionProjectBudget: number;
    }
  ];
}

export interface ChartData {
  yearlyAggregates: [
    {
      budgetYear: number;
      totalProject: number;
      totalContract: number;
      aggregateBy: string[];
      contractMoneyAggregateBy: string[];
    }
  ];
}
