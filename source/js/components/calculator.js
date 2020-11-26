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

    this.minimumDownPaymentPersentage = null;
    this.minimumDownPayment = null;
    this.downPaymentPersentage = null;
    this.downPayment = null;
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

export const mortgageCalculator = new MortgageCalculator(creditProgramsData);
