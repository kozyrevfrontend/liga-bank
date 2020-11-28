import { createAutoCalculatorResultsTemplate } from './markups/auto/calculatorAutoResultsTemplate';
import { renderElement } from './utils';
import { deleteChildrenElements } from './utils';

class AutoCalculatorView {
  constructor(markups, utils) {
    this.createAutoCalculatorResultsTemplate = markups.createAutoCalculatorResultsTemplate;

    this.renderElement = utils.renderElement;
    this.deleteChildrenElements = utils.deleteChildrenElements;
  }

  renderCalculatorResults(totalCreditSumm, creditPersentage, annuityPayment, minimumIncome) {
    const calculatorContainer = document.querySelector(`.calculator__container`);
    const calculatorResults = calculatorContainer.querySelector(`.calculator__results`);

    if (calculatorResults) {
      calculatorContainer.removeChild(calculatorResults);
    }

    this.renderElement(calculatorContainer, this.createAutoCalculatorResultsTemplate(totalCreditSumm, creditPersentage, annuityPayment, minimumIncome));
  }
}

export const autoCalculatorView = new AutoCalculatorView(
  {
    createAutoCalculatorResultsTemplate
  },
  {
    renderElement,
    deleteChildrenElements
  }
);
