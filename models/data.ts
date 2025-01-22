export interface ProjectListSummaryData {
  maxProjectStatus: NameWithTotal;
  maxContractStatus: NameWithTotal;
  maxResourcingMethod: NameWithTotal;
  provinceWithHighestBudgetMoney: string;
  provinceWithHighestProjects: string;
  totalBudgetMoney: number;
  totalProject: number;
  totalProjectHasCorruption: number;
  totalAgency: number;
  totalCompany: number;
}

export interface FilterListProject {
  budgetYears: number[];
  agencies: unknown[];
  agencyBelongTo: unknown[];
  provinces: string[];
  projectStatus: string[];
  resourcingMethod: string[];
  resourcingType: string[];
  contractorType: string[];
}

export interface ChartDataSet<T = unknown> {
  label: string;
  backgroundColor: string;
  data: T[];
  sum: number;
  isChecked?: boolean;
}

interface NameWithTotal {
  name: string;
  total: number;
}
