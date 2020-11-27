import { Calculator } from './calculator';
import { creditProgramsData } from '../data/CreditProgramsData';

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

export const autoCalculator = new AutoCalculator(creditProgramsData);
