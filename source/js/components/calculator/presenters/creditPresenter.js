import { BasicPresenter } from './basicPresenter';
import { creditCalculator } from '../models/creditCalculator';
import { creditCalculatorView } from '../views/creditCalculatorView';

class CreditPresenter extends BasicPresenter {
  constructor(model, view) {
    super(model, view);

    this.salaryProjectCheckboxHandler = this.salaryProjectCheckboxHandler.bind(this);
  }

  initSpecials() {
    this.view.renderCalculatorSpecials(this.salaryProjectCheckboxHandler);
  }

  salaryProjectCheckboxHandler(node) {
    if (node.checked) {
      this.calculator.salaryProject = true;
    } else {
      this.calculator.salaryProject = false;
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

export const creditPresenter = new CreditPresenter(creditCalculator, creditCalculatorView);
