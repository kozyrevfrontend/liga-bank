export const creditProgramsData = {
  mortgage: {
    minimumTotalCreditSumm: 500000,
    creditSumm: {
      min: 1200000,
      max: 25000000
    },
    creditPeriod: {
      min: 5,
      max: 30
    },
    minimumDownPaymentPersentage: 10,
    basicPersent: 15,
    creditPersentage: {
      basic: 9.4,
      special: 8.5
    },
    maternityCapital: 470000
  },
  auto: {
    minimumTotalCreditSumm: 200000,
    creditSumm: {
      min: 500000,
      max: 5000000
    },
    creditPeriod: {
      min: 1,
      max: 5
    },
    minimumDownPaymentPersentage: 20,
    basicCreditSumm: 2000000,
    creditPersentage: {
      basic: 16,
      special: 15,
      insurance: 8.5,
      fullInsurance: 3.5
    }
  },
  credit: {
    creditSumm: {
      min: 50000,
      max: 3000000
    },
    creditPeriod: {
      min: 1,
      max: 7
    },
    basicCreditSumm: {
      min: 750000,
      max: 2000000
    },
    creditPersentage: {
      basic: 15,
      middle: 12.5,
      special: 9.5,
      salaryProject: 0.5
    }
  }
};
