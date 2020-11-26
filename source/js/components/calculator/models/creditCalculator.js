import { Calculator } from './calculator';

export default class CreditCalculator extends Calculator {
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
