import { creditProgramsData } from '../data/CreditProgramsData';

class Calculator {
  constructor(data) {
    this.data = data;
    this.currentData = null;

    this.minimumIncomeRatio = 0.45;
    this.minimumIncome = null;

    this.creditSumm = null;
    this.minimumCreditSumm = null;
    this.maximumCreditSumm = null;

    this.creditPeriod = null;
    this.minimumCreditPeriod = null;
    this.maximumCreditPeriod = null;

    this.annuityPayment = null;
    this.creditPersentage = null;
    this.totalCreditSumm = null;

    this.minimumDownPaymentPersentage = null;
    this.minimumDownPayment = null;
    this.downPaymentPersentage = null;
    this.downPayment = null;
  }

  init(id) {
    this.setCurrentData(id);
    this.setMinimumCreditSumm();
    this.setMaximumCreditSumm();
    this.setCreditSumm(this.minimumCreditSumm);
    this.setMinimumCreditPeriod();
    this.setMaximumCreditPeriod();
    this.setCreditPeriod(this.minimumCreditPeriod);

    if (this.currentData.minimumDownPaymentPersentage) {
      this.setMinimumDownPaymentPersentage();
      this.setMinimumDownPayment();
      this.calculateDownPayment(this.minimumDownPaymentPersentage);
      this.calculateDownPaymentPersentage();
    }

    this.calculateCreditPersentage();
    this.calculateTotalCreditSumm();
    this.calculateAnnuityPayment();
    this.calculateMinimumIncome();
  }

  setCurrentData(id) {
    this.currentData = this.data[id];
  }

  setCreditSumm(summ) {
    this.creditSumm = summ;
  }

  setMinimumCreditSumm() {
    this.minimumCreditSumm = this.currentData.creditSumm.min;
  }

  setMaximumCreditSumm() {
    this.maximumCreditSumm = this.currentData.creditSumm.max;
  }

  setCreditPeriod(period) {
    this.creditPeriod = period;
  }

  setMinimumCreditPeriod() {
    this.minimumCreditPeriod = this.currentData.creditPeriod.min;
  }

  setMaximumCreditPeriod() {
    this.maximumCreditPeriod = this.currentData.creditPeriod.max;
  }

  setMinimumDownPaymentPersentage() {
    this.minimumDownPaymentPersentage = this.currentData.minimumDownPaymentPersentage;
  }

  setMinimumDownPayment() {
    this.minimumDownPayment = this.creditSumm * this.minimumDownPaymentPersentage / 100;
  }

  calculateDownPayment(persent) {
    this.downPayment = this.creditSumm * persent / 100;
  }

  calculateDownPaymentPersentage() {
    this.downPaymentPersentage = Math.floor((this.downPayment / this.creditSumm) * 100);
  }

  calculateAnnuityPayment() {
    const creditPeriodInMonth = this.creditPeriod * 12;
    const monthlyCreditPersentage = this.creditPersentage / 100 / 12;

    this.annuityPayment = Math.floor(this.totalCreditSumm * (monthlyCreditPersentage + (monthlyCreditPersentage / (Math.pow((1 + monthlyCreditPersentage), creditPeriodInMonth) - 1))));
  }

  calculateMinimumIncome() {
    this.minimumIncome = Math.floor((this.annuityPayment / this.minimumIncomeRatio));
  }
}

class MortgageCalculator extends Calculator {
  constructor(data) {
    super(data);

    this.maternityCapital = false;
  }

  calculateCreditPersentage() {
    this.creditPersentage = (this.downPaymentPersentage < this.currentData.basicPersent) ? this.currentData.creditPersentage.basic : this.currentData.creditPersentage.special;
  }

  calculateTotalCreditSumm() {
    if (this.currentData.maternityCapital) {
      this.totalCreditSumm = this.creditSumm - this.downPayment - this.currentData.maternityCapital;
    } else {
      this.totalCreditSumm = this.creditSumm - this.downPayment;
    }
  }
}

class AutoCalculator extends Calculator {
  constructor(data) {
    super(data);

    this.autoInsurance = false;
    this.lifeInsurance = false;
  }

  calculateCreditPersentage() {
    this.creditPersentage = this.currentData.creditPersentage.basic;

    if (this.creditSumm >= this.currentData.basicCreditSumm) {
      this.creditPersentage = this.currentData.creditPersentage.special;
    }

    if (this.autoInsurance || this.lifeInsurance) {
      this.creditPersentage = this.currentData.creditPersentage.insurance;
    }

    if (this.autoInsurance && this.lifeInsurance) {
      this.creditPersentage = this.currentData.creditPersentage.fullInsurance;
    }
  }

  calculateTotalCreditSumm() {
    this.totalCreditSumm = this.creditSumm - this.downPayment;
  }
}

class CreditCalculator extends Calculator {
  constructor(data) {
    super(data);

    this.salaryProject = false;
  }

  calculateCreditPersentage() {
    this.creditPersentage = this.currentData.creditPersentage.basic;

    if (this.creditSumm >= this.currentData.basicCreditSumm.min && this.creditSumm < this.currentData.basicCreditSumm.max) {
      this.creditPersentage = this.currentData.creditPersentage.middle;
    }

    if (this.creditSumm >= this.currentData.basicCreditSumm.max) {
      this.creditPersentage = this.currentData.creditPersentage.special;
    }

    if (this.salaryProject) {
      this.creditPersentage -= this.currentData.creditPersentage.salaryProject;
    }
  }

  calculateTotalCreditSumm() {
    this.totalCreditSumm = this.creditSumm;
  }
}

export const mortgageCalculator = new MortgageCalculator(creditProgramsData);
export const autoCalculator = new AutoCalculator(creditProgramsData);
export const creditCalculator = new CreditCalculator(creditProgramsData);
