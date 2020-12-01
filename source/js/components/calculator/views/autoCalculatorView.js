import { createAutoCalculatorResultsTemplate } from './markups/auto/calculatorAutoResultsTemplate';
import { createAutoCalculatorCreditSummTemplate } from './markups/auto/calculatorAutoCreditSummTemplate';
import { renderElement } from './utils';
import { deleteChildrenElements } from './utils';

class AutoCalculatorView {
  constructor(markups, utils) {
    this.createAutoCalculatorResultsTemplate = markups.createAutoCalculatorResultsTemplate;
    this.createAutoCalculatorCreditSummTemplate = markups.createAutoCalculatorCreditSummTemplate;

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

  renderCalculatorCreditSumm(minimumCreditSumm, maximumCreditSumm, creditSumm, handler) {
    const calculatorWrapper = document.querySelector(`.calculator__wrapper`);
    const creditSummWrapper = calculatorWrapper.querySelector(`#creditSummWrapper`);

    if (creditSummWrapper) {
      calculatorWrapper.removeChild(creditSummWrapper);
    }

    this.renderElement(calculatorWrapper, this.createAutoCalculatorCreditSummTemplate(minimumCreditSumm, maximumCreditSumm, creditSumm));

    const creditSummInput = calculatorWrapper.querySelector(`#creditSumm`);
    const decreaseButton = calculatorWrapper.querySelector(`.calculator__button--decrease`);
    const increaseButton = calculatorWrapper.querySelector(`.calculator__button--increase`);
    const creditSummStep = 50000;

    creditSummInput.addEventListener(`change`, (evt) => {
      if (evt.currentTarget.validity.valid) {
        handler(parseInt(evt.currentTarget.value, 10));
      }
    });

    decreaseButton.addEventListener(`click`, () => {
      if (parseInt(creditSummInput.value, 10) > parseInt(creditSummInput.min, 10)) {
        creditSummInput.value = parseInt(creditSummInput.value, 10) - creditSummStep;
        handler(parseInt(creditSummInput.value, 10));
      }
    });

    increaseButton.addEventListener(`click`, () => {
      if (parseInt(creditSummInput.value, 10) < parseInt(creditSummInput.max, 10)) {
        creditSummInput.value = parseInt(creditSummInput.value, 10) + creditSummStep;
        handler(parseInt(creditSummInput.value, 10));
      }
    });
  }
}

export const autoCalculatorView = new AutoCalculatorView(
  {
    createAutoCalculatorResultsTemplate,
    createAutoCalculatorCreditSummTemplate
  },
  {
    renderElement,
    deleteChildrenElements
  }
);
