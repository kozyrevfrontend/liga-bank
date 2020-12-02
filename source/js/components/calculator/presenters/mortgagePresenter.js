import { BasicPresenter } from './basicPresenter';
import { mortgageCalculator } from '../models/mortgageCalculator';
import { mortgageCalculatorView } from '../views/mortgageCalculatorView';

class MortgagePresenter extends BasicPresenter {
  constructor(model, view) {
    super(model, view);

    this.maternityCapitalCheckboxHandler = this.maternityCapitalCheckboxHandler.bind(this);
  }

  initSpecials() {
    this.view.renderCalculatorSpecials(this.maternityCapitalCheckboxHandler);
  }

  maternityCapitalCheckboxHandler(node) {
    if (node.checked) {
      this.calculator.maternityCapital = true;
    } else {
      this.calculator.maternityCapital = false;
    }

    this.calculator.calculateCreditPersentage();
    this.calculator.calculateTotalCreditSumm();
    this.calculator.calculateAnnuityPayment();
    this.calculator.calculateMinimumIncome();

    this.view.renderCalculatorResults(
      this.calculator.totalCreditSumm.toLocaleString('ru-RU'),
      this.calculator.creditPersentage.toFixed(2).toLocaleString('ru-RU'),
      this.calculator.annuityPayment.toLocaleString('ru-RU'),
      this.calculator.minimumIncome.toLocaleString('ru-RU')
    );
  }
}

export const mortgagePresenter = new MortgagePresenter(mortgageCalculator, mortgageCalculatorView);
