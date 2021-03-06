import { BasicPresenter } from './basicPresenter';
import { autoCalculator } from '../models/autoCalculator';
import { autoCalculatorView } from '../views/autoCalculatorView';

class AutoPresenter extends BasicPresenter {
  constructor(model, view) {
    super(model, view);

    this.autoInsuranceCheckboxHandler = this.autoInsuranceCheckboxHandler.bind(this);
    this.lifeInsuranceCheckboxHandler = this.lifeInsuranceCheckboxHandler.bind(this);
  }

  initSpecials() {
    this.view.renderCalculatorSpecials(this.autoInsuranceCheckboxHandler, this.lifeInsuranceCheckboxHandler);
  }

  autoInsuranceCheckboxHandler(node) {
    if (node.checked) {
      this.calculator.autoInsurance = true;
    } else {
      this.calculator.autoInsurance = false;
    }

    this.calculator.calculateCreditPersentage();
    this.calculator.calculateTotalCreditSumm();
    this.calculator.calculateAnnuityPayment();
    this.calculator.calculateMinimumIncome();

    this.view.renderCalculatorResults(
      this.calculator.totalCreditSumm,
      this.calculator.creditPersentage,
      this.calculator.annuityPayment,
      this.calculator.minimumIncome,
      this.creditResultsButtonHandler
    );
  }

  lifeInsuranceCheckboxHandler(node) {
    if (node.checked) {
      this.calculator.lifeInsurance = true;
    } else {
      this.calculator.lifeInsurance = false;
    }

    this.calculator.calculateCreditPersentage();
    this.calculator.calculateTotalCreditSumm();
    this.calculator.calculateAnnuityPayment();
    this.calculator.calculateMinimumIncome();

    this.view.renderCalculatorResults(
      this.calculator.totalCreditSumm,
      this.calculator.creditPersentage,
      this.calculator.annuityPayment,
      this.calculator.minimumIncome,
      this.creditResultsButtonHandler
    );
  }
}

export const autoPresenter = new AutoPresenter(autoCalculator, autoCalculatorView);
