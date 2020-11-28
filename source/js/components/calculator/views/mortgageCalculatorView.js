import { createMortgageCalculatorResultsTemplate } from './markups/mortgage/calculatorMortgageResultsTemplate';
import { renderElement } from './utils';
import { deleteChildrenElements } from './utils';

class MortgageCalculatorView {
  constructor(markups, utils) {
    this.createMortgageCalculatorResultsTemplate = markups.createMortgageCalculatorResultsTemplate;

    this.renderElement = utils.renderElement;
    this.deleteChildrenElements = utils.deleteChildrenElements;
  }

  renderCalculatorResults(totalCreditSumm, creditPersentage, annuityPayment, minimumIncome) {
    const calculatorContainer = document.querySelector(`.calculator__container`);
    const calculatorResults = calculatorContainer.querySelector(`.calculator__results`);

    if (calculatorResults) {
      calculatorContainer.removeChild(calculatorResults);
    }

    this.renderElement(calculatorContainer, this.createMortgageCalculatorResultsTemplate(totalCreditSumm, creditPersentage, annuityPayment, minimumIncome));
  }
}

export const mortgageCalculatorView = new MortgageCalculatorView(
  {
    createMortgageCalculatorResultsTemplate
  },
  {
    renderElement,
    deleteChildrenElements
  }
);
