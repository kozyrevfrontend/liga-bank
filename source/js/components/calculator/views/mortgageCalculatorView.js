import { createMortgageCalculatorResultsTemplate } from './markups/mortgage/calculatorMortgageResultsTemplate';
import { createMortgageCalculatorCreditSummTemplate } from './markups/mortgage/calculatorMortgageCreditSummTemplate';
import { createMortgageCalculatorDownPaymentTemplate } from './markups/mortgage/calculatorMortgageDownPaymentTemplate';
import { createMortgageCalculatorPaymentValueTemplate } from './markups/mortgage/calculatorMortgagePaymentValueTemplate';
import { renderElement } from './utils';
import { deleteChildrenElements } from './utils';

class MortgageCalculatorView {
  constructor(markups, utils) {
    this.createMortgageCalculatorResultsTemplate = markups.createMortgageCalculatorResultsTemplate;
    this.createMortgageCalculatorCreditSummTemplate = markups.createMortgageCalculatorCreditSummTemplate;
    this.createCalculatorCreditSummInputTemplate = markups.createCalculatorCreditSummInputTemplate;
    this.createMortgageCalculatorDownPaymentTemplate = markups.createMortgageCalculatorDownPaymentTemplate;
    this.createMortgageCalculatorPaymentValueTemplate = markups.createMortgageCalculatorPaymentValueTemplate;

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

  renderCalculatorCreditSumm(minimumCreditSumm, maximumCreditSumm, creditSumm, handler) {
    const calculatorWrapper = document.querySelector(`.calculator__wrapper`);
    const stepTwoWrapper = calculatorWrapper.querySelector(`#stepTwoWrapper`);

    if (stepTwoWrapper) {
      calculatorWrapper.removeChild(stepTwoWrapper);
    }

    this.renderElement(calculatorWrapper, this.createMortgageCalculatorCreditSummTemplate(minimumCreditSumm, maximumCreditSumm, creditSumm));

    const creditSummInput = calculatorWrapper.querySelector(`#creditSumm`);
    const decreaseButton = calculatorWrapper.querySelector(`.calculator__button--decrease`);
    const increaseButton = calculatorWrapper.querySelector(`.calculator__button--increase`);
    const creditSummStep = 100000;

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

  renderCalculatorDownPayment(minimumDownPaymentPersentage, minimumDownPayment, downPayment, inputHandler, rangeHandler) {
    const stepTwoWrapper = document.querySelector(`#stepTwoWrapper`);
    const downPaymentSection = stepTwoWrapper.querySelector(`#downPaymentSection`);

    if (downPaymentSection) {
      stepTwoWrapper.removeChild(downPaymentSection);
    }

    this.renderElement(stepTwoWrapper, this.createMortgageCalculatorDownPaymentTemplate(minimumDownPaymentPersentage));

    this.renderCalculatorPaymentValue(minimumDownPayment, downPayment, inputHandler);

    const downPaymentRange = stepTwoWrapper.querySelector(`#downPaymentRange`);

    downPaymentRange.addEventListener(`input`, (evt) => {
      rangeHandler(parseInt(evt.currentTarget.value, 10));
    });
  }

  renderCalculatorPaymentValue(minimumDownPayment, downPayment, inputHandler) {
    this.removeCalculatorPaymentValue();

    const downPaymentSection = document.querySelector(`#downPaymentSection`);
    const downPaymentSectionInner = downPaymentSection.querySelector(`.calculator__section-inner`);

    this.renderElement(downPaymentSectionInner, this.createMortgageCalculatorPaymentValueTemplate(minimumDownPayment, downPayment), `afterbegin`);

    const downPaymentInput = downPaymentSection.querySelector(`#downPayment`);

    downPaymentInput.addEventListener(`change`, (evt) => {
      if (parseInt(evt.currentTarget.value, 10) < parseInt(evt.currentTarget.min, 10)) {
        evt.currentTarget.value = evt.currentTarget.min;
      }

      inputHandler(parseInt(evt.currentTarget.value, 10));
    });
  }

  removeCalculatorPaymentValue() {
    const downPaymentSection = document.querySelector(`#downPaymentSection`);
    const downPaymentSectionInner = downPaymentSection.querySelector(`.calculator__section-inner`);
    const downPaymentInput = downPaymentSection.querySelector(`#downPayment`);

    if (downPaymentSection.querySelector(`#downPayment`)) {
      downPaymentSectionInner.removeChild(downPaymentInput);
    }
  }
}

export const mortgageCalculatorView = new MortgageCalculatorView(
  {
    createMortgageCalculatorResultsTemplate,
    createMortgageCalculatorCreditSummTemplate,
    createMortgageCalculatorDownPaymentTemplate,
    createMortgageCalculatorPaymentValueTemplate
  },
  {
    renderElement,
    deleteChildrenElements
  }
);
