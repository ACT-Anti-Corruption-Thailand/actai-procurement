export const defaultSelected = {
  yearFrom: '',
  yearTo: '',
  agencies: 'ทุกหน่วยงาน',
  agencyBelongTo: 'ทุกหน่วยงาน',
  contractorType: 'ทุกประเภท',
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
};

export const defaultSelectedGovContractor = {
  yearFrom: '',
  yearTo: '',
  resourcingMethod: 'ทุกวิธี',
};

export const defaultSelectedContractorProject = {
  yearFrom: '',
  yearTo: '',
  agencies: 'ทุกหน่วยงาน',
  province: 'ทุกจังหวัด',
  resourcingMethod: 'ทุกวิธี',
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
