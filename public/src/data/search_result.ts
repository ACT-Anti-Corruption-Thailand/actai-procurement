export interface Project {
  pagination: {
    totalItem: number;
    totalPage: number;
  };
  searchResult: [
    {
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
    }
  ];
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
