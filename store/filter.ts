export const defaultSelected = {
  yearFrom: '',
  yearTo: '',
  agencies: 'ทุกหน่วยงาน',
  agencyBelongTo: 'ทุกหน่วยงาน',
  companyEntityType: 'ทุกประเภท',
  projectStatus: 'ทุกสถานะ',
  province: 'ทุกจังหวัด',
  resourcingType: 'ทุกประเภท',
  resourcingMethod: 'ทุกวิธี',
  moneyStart: '',
  moneyEnd: '',
  hasCorruptionRisk: false,
};

export const defaultSelectedGov = {
  agencyBelongTo: 'ทุกหน่วยงาน',
  province: 'ทุกจังหวัด',
};

export const defaultSelectedContractor = {
  province: 'ทุกจังหวัด',
  contractorType: 'ทุกประเภท',
  hasCorruptionRisk: false,
};

export const defaultSelectedGovProject = {
  yearFrom: '',
  yearTo: '',
  province: 'ทุกจังหวัด',
  projectStatus: 'ทุกสถานะ',
  resourcingMethod: 'ทุกวิธี',
  companyId: 'ทุกองค์กร',
  hasCorruptionRisk: false,
};

export const defaultSelectedGovContractor = {
  yearFrom: '',
  yearTo: '',
  resourcingMethod: 'ทุกวิธี',
};

export const defaultSelectedContractorProject = {
  yearFrom: '',
  yearTo: '',
  agencyId: 'ทุกหน่วยงาน',
  province: 'ทุกจังหวัด',
  projectStatus: 'ทุกสถานะ',
  resourcingMethod: 'ทุกวิธี',
  companyId: 'ทุกองค์กร',
  hasCorruptionRisk: false,
};

export const defaultSelectedContractorGov = {
  yearFrom: '',
  yearTo: '',
  resourcingMethod: 'ทุกวิธี',
};

export const selected = ref({ ...defaultSelected });
export const selectedGov = ref({ ...defaultSelectedGov });
export const selectedContractor = ref({ ...defaultSelectedContractor });
export const selectedGovProject = ref({ ...defaultSelectedGovProject });
export const selectedGovContractor = ref({ ...defaultSelectedGovContractor });
export const selectedContractorProject = ref({
  ...defaultSelectedContractorProject,
});
export const selectedContractorGov = ref({ ...defaultSelectedContractorGov });

// sort by + order

export const sortByResultProject = ref('');
export const sortOrderResultProject = ref('');
export const sortByResultGov = ref('');
export const sortOrderResultGov = ref('');
export const sortByResultContractor = ref('');
export const sortOrderResultContractor = ref('');

export const sortByWinner = ref('');
export const sortOrderWinner = ref('');

export const sortByGovProject = ref('');
export const sortOrderGovProject = ref('');
export const sortByGovContractor = ref('');
export const sortOrderGovContractor = ref('');

export const sortByContractorProject = ref('');
export const sortOrderContractorProject = ref('');
export const sortByContractorGov = ref('');
export const sortOrderContractorGov = ref('');
