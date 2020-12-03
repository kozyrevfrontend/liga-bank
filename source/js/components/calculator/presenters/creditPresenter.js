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
      this.calculator.totalCreditSumm.toLocaleString('ru-RU'),
      this.calculator.creditPersentage.toFixed(2).toLocaleString('ru-RU'),
      this.calculator.annuityPayment.toLocaleString('ru-RU'),
      this.calculator.minimumIncome.toLocaleString('ru-RU'),
      this.creditResultsButtonHandler
    );
  }
}

export const creditPresenter = new CreditPresenter(creditCalculator, creditCalculatorView);
