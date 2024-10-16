export interface ProjectDetails {
  projectId: string;
  projectName: string;
  totalBudgetMoney: number;
  totalEstimatePrice: number;
  totalContractMoney: number;
  subDistrict: string;
  district: string;
  province: string;
  projectLocation: {
    lat: number;
    long: number;
  };
  announcementDate: Date;
  budgetYear: number;
  projectStatus: string;
  agency: {
    id: string;
    name: string;
    subDistrict: string;
    district: string;
    province: string;
  };
  resourcingMethod: string;
  resourcingType: string;
  winnerContractors: [
    {
      id: null;
      name: string;
      hasAbandonProject: false;
    }
  ];
  corruptionRisk?: [];
  lastUpdatedOn: Date;
}

export interface ProjectContractor {
  contractors: [
    {
      id: string;
      name: string;
      isWinner: boolean;
      processInvolved: [];
    }
  ];
}

export interface ProjectContract {
  contractors: [
    {
      id: string;
      name: string;
      contracts: [
        {
          id: string;
          name: string;
          date: string;
          status: string;
          money: number;
        }
      ];
    }
  ];
}

export interface ProjectEstimatePrice {
  items: [
    {
      name: string;
      estimatePrice: number;
      contractors: [];
    }
  ];
}

export interface ProjectDocuments {
  relatedDocuments: [
    {
      name: string;
      fileType: string;
      link: string;
    }
  ];
}

export interface GovernmentDetails {
  agencyId: string;
  agencyName: string;
  agencyBelongTo: string;
  province: string;
  lastUpdatedOn: string;
}

export interface ContractorDetails {
  companyId: string;
  companyName: string;
  hasCorruptionRiskCases: number;
  lastUpdatedOn: string;
  address: string;
  registeredType: string;
  registeredBudget: number;
  registeredDate: string;
  businessType: string;
  status: string;
  changeHistory: [
    {
      date: string;
      change: string;
      old: string;
      new: string;
    }
  ];
  partnerList: {
    partners: string[];
    managingPartners: [];
  };
  retrospectiveList: {
    partners: [];
    managingPartners: [];
  };
  corruptionRisk: [];
}

export interface ContracterRelationship {
  // relationshipWith:
  //   {
  //     politicians: [ {
  //       name: string;
  //       relationships: [ {
  //         relationshipType: string;
  //         relatedTo: string[];
  //       }];
  //     }];
  //     companies: [ {
  //       id: string;
  //       name: string;
  //       relationships: [ {
  //         relationshipType: string;
  //         relatedTo: string[];
  //       }];
  //     }];
  //     politicalParties: string[]
  //   }
  relatedCompanies: [];
}

export interface ContracterRelatedCompanies {
  id: string;
  name: string;
  totalBiddingProject: number;
}
