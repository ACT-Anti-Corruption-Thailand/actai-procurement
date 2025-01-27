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

export const selected = ref({ ...defaultSelected });
export const selectedGov = ref({ ...defaultSelectedGov });
export const selectedContractor = ref({ ...defaultSelectedContractor });
