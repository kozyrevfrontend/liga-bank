import { Calculator } from './calculator';

export default class MortgageCalculator extends Calculator {
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
