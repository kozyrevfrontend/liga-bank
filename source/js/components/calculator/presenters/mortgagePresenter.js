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

    if (this.calculator.totalCreditSumm < this.calculator.minimumTotalCreditSumm) {
      this.view.renderCalculatorUserMessage(this.calculator.minimumTotalCreditSumm);
    } else {
      this.view.renderCalculatorResults(
        this.calculator.totalCreditSumm,
        this.calculator.creditPersentage,
        this.calculator.annuityPayment,
        this.calculator.minimumIncome,
        this.creditResultsButtonHandler
      );
    }
  }
}

export const mortgagePresenter = new MortgagePresenter(mortgageCalculator, mortgageCalculatorView);
