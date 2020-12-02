import { createCreditCalculatorResultsTemplate } from './markups/credit/calculatorCreditResultsTemplate';
import { createCreditCalculatorCreditSummTemplate } from './markups/credit/calculatorCreditCreditSummTemplate';
import { createCalculatorPeriodTemplate } from './markups/creditCalculatorPeriodTemplate';
import { createCalculatorPeriodValueTemplate } from './markups/creditCalculatorPeriodValueTemplate';
import { createCreditCalculatorSpecialsTemplate } from './markups/credit/calculatorCreditSpecialsTemplate';
import { renderElement } from './utils';
import { deleteChildrenElements } from './utils';

class CreditCalculatorView {
  constructor(markups, utils) {
    this.createCreditCalculatorResultsTemplate = markups.createCreditCalculatorResultsTemplate;
    this.createCreditCalculatorCreditSummTemplate = markups.createCreditCalculatorCreditSummTemplate;
    this.createCalculatorPeriodTemplate = markups.createCalculatorPeriodTemplate;
    this.createCalculatorPeriodValueTemplate = markups.createCalculatorPeriodValueTemplate;
    this.createCreditCalculatorSpecialsTemplate = markups.createCreditCalculatorSpecialsTemplate;

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

  renderCalculatorCreditSumm(minimumCreditSumm, maximumCreditSumm, creditSumm, handler) {
    const calculatorWrapper = document.querySelector(`.calculator__wrapper`);
    const stepTwoWrapper = calculatorWrapper.querySelector(`#stepTwoWrapper`);

    if (stepTwoWrapper) {
      calculatorWrapper.removeChild(stepTwoWrapper);
    }

    this.renderElement(calculatorWrapper, this.createCreditCalculatorCreditSummTemplate(minimumCreditSumm, maximumCreditSumm, creditSumm));

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

  renderCalculatorPeriod(minimumCreditPeriod, maximumCreditPeriod, creditPeriod, inputHandler, rangeHandler) {
    const stepTwoWrapper = document.querySelector(`#stepTwoWrapper`);
    const periodSection = stepTwoWrapper.querySelector(`#periodSection`);

    if (periodSection) {
      stepTwoWrapper.removeChild(periodSection);
    }

    this.renderElement(stepTwoWrapper, this.createCalculatorPeriodTemplate(minimumCreditPeriod, maximumCreditPeriod));

    this.renderCalculatorPeriodValue(minimumCreditPeriod, maximumCreditPeriod, creditPeriod, inputHandler);

    const periodRange = stepTwoWrapper.querySelector(`#periodRange`);

    periodRange.addEventListener(`input`, (evt) => {
      rangeHandler(parseInt(evt.currentTarget.value, 10));
    });
  }

  renderCalculatorPeriodValue(minimumCreditPeriod, maximumCreditPeriod, creditPeriod, inputHandler) {
    this.removeCalculatorPeriodValue();

    const periodSection = document.querySelector(`#periodSection`);
    const periodSectionInner = periodSection.querySelector(`.calculator__section-inner`);

    this.renderElement(periodSectionInner, this.createCalculatorPeriodValueTemplate(minimumCreditPeriod, maximumCreditPeriod, creditPeriod), `afterbegin`);

    const periodInput = periodSection.querySelector(`#period`);

    periodInput.addEventListener(`change`, (evt) => {
      if (parseInt(evt.currentTarget.value, 10) < parseInt(evt.currentTarget.min, 10)) {
        evt.currentTarget.value = evt.currentTarget.min;
      }

      if (parseInt(evt.currentTarget.value, 10) > parseInt(evt.currentTarget.max, 10)) {
        evt.currentTarget.value = evt.currentTarget.max;
      }

      inputHandler(parseInt(evt.currentTarget.value, 10));
    });
  }

  removeCalculatorPeriodValue() {
    const periodSection = document.querySelector(`#periodSection`);
    const periodSectionInner = periodSection.querySelector(`.calculator__section-inner`);
    const periodInput = periodSection.querySelector(`#period`);

    if (periodSection.querySelector(`#period`)) {
      periodSectionInner.removeChild(periodInput);
    }
  }

  renderCalculatorSpecials(handler) {
    const stepTwoWrapper = document.querySelector(`#stepTwoWrapper`);
    const specials = stepTwoWrapper.querySelector(`#specials`);

    if (specials) {
      stepTwoWrapper.removeChild(specials);
    }

    this.renderElement(stepTwoWrapper, this.createCreditCalculatorSpecialsTemplate());

    const salaryProjectCheckbox = stepTwoWrapper.querySelector(`#salaryProject`);

    salaryProjectCheckbox.addEventListener(`change`, (evt) => {
      handler(evt.currentTarget);
    });
  }
}

export const creditCalculatorView = new CreditCalculatorView(
  {
    createCreditCalculatorResultsTemplate,
    createCreditCalculatorCreditSummTemplate,
    createCalculatorPeriodTemplate,
    createCalculatorPeriodValueTemplate,
    createCreditCalculatorSpecialsTemplate
  },
  {
    renderElement,
    deleteChildrenElements
  }
);
