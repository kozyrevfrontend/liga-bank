import { createCreditCalculatorResultsTemplate } from './markups/credit/calculatorCreditResultsTemplate';
import { renderElement } from './utils';
import { deleteChildrenElements } from './utils';

class CreditCalculatorView {
  constructor(markups, utils) {
    this.createCreditCalculatorResultsTemplate = markups.createCreditCalculatorResultsTemplate;

    this.renderElement = utils.renderElement;
    this.deleteChildrenElements = utils.deleteChildrenElements;
  }

  renderCalculatorResults(totalCreditSumm, creditPersentage, annuityPayment, minimumIncome) {
    const calculatorContainer = document.querySelector(`.calculator__container`);
    const calculatorResults = calculatorContainer.querySelector(`.calculator__results`);

    if (calculatorResults) {
      calculatorContainer.removeChild(calculatorResults);
    }

    this.renderElement(calculatorContainer, this.createCreditCalculatorResultsTemplate(totalCreditSumm, creditPersentage, annuityPayment, minimumIncome));
  }
}

export const creditCalculatorView = new CreditCalculatorView(
  {
    createCreditCalculatorResultsTemplate
  },
  {
    renderElement,
    deleteChildrenElements
  }
);
