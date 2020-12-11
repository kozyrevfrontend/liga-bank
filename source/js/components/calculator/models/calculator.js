export class Calculator {
  constructor(data) {
    this.data = data;
    this.currentData = null;

    this.minimumIncomeRatio = 0.45;
    this.minimumIncome = null;

    this.creditSumm = null;
    this.minimumCreditSumm = null;
    this.maximumCreditSumm = null;
    this.minimumTotalCreditSumm = null;

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
    this.setOrders();
    this.setMinimunTotalCreditSumm();
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

  setOrders() {
    if (localStorage.orders) {
      return;
    }

    localStorage.orders = 9;
  }

  setMinimunTotalCreditSumm() {
    if (this.currentData.minimumTotalCreditSumm) {
      this.minimumTotalCreditSumm = this.currentData.minimumTotalCreditSumm;
    }
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
