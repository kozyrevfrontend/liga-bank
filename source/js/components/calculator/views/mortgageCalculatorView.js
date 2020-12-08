import { createMortgageCalculatorResultsTemplate } from './markups/mortgage/calculatorMortgageResultsTemplate';
import { createMortgageCalculatorCreditSummTemplate } from './markups/mortgage/calculatorMortgageCreditSummTemplate';
import { createMortgageCalculatorDownPaymentTemplate } from './markups/mortgage/calculatorMortgageDownPaymentTemplate';
import { createMortgageCalculatorPaymentValueTemplate } from './markups/mortgage/calculatorMortgagePaymentValueTemplate';
import { createCalculatorPeriodTemplate } from './markups/creditCalculatorPeriodTemplate';
import { createCalculatorPeriodValueTemplate } from './markups/creditCalculatorPeriodValueTemplate';
import { createMortgageCalculatorSpecialsTemplate } from './markups/mortgage/calculatorMortgageSpecialsTemplate';
import { createMortgageCalculatorUserMessageTemplate } from './markups/mortgage/calculatorMortgageUserMessageTemplate';
import { createMortgageCalculatorOrderTemplate } from './markups/mortgage/calculatorMortgageOrderTemplate';
import { popup } from '../../popup/popup';
import { renderElement } from './utils';
import { deleteChildrenElements } from './utils';

class MortgageCalculatorView {
  constructor(markups, utils, basicPopup) {
    this.createMortgageCalculatorResultsTemplate = markups.createMortgageCalculatorResultsTemplate;
    this.createMortgageCalculatorCreditSummTemplate = markups.createMortgageCalculatorCreditSummTemplate;
    this.createCalculatorCreditSummInputTemplate = markups.createCalculatorCreditSummInputTemplate;
    this.createMortgageCalculatorDownPaymentTemplate = markups.createMortgageCalculatorDownPaymentTemplate;
    this.createMortgageCalculatorPaymentValueTemplate = markups.createMortgageCalculatorPaymentValueTemplate;
    this.createCalculatorPeriodTemplate = markups.createCalculatorPeriodTemplate;
    this.createCalculatorPeriodValueTemplate = markups.createCalculatorPeriodValueTemplate;
    this.createMortgageCalculatorSpecialsTemplate = markups.createMortgageCalculatorSpecialsTemplate;
    this.createMortgageCalculatorUserMessageTemplate = markups.createMortgageCalculatorUserMessageTemplate;
    this.createMortgageCalculatorOrderTemplate = markups.createMortgageCalculatorOrderTemplate;
    this.createPopupTemplate = markups.createPopupTemplate;
    this.popup = basicPopup;


    this.renderElement = utils.renderElement;
    this.deleteChildrenElements = utils.deleteChildrenElements;
  }

  renderCalculatorResults(totalCreditSumm, creditPersentage, annuityPayment, minimumIncome, handler) {
    const calculatorContainer = document.querySelector(`.calculator__container`);
    const calculatorResults = calculatorContainer.querySelector(`.calculator__results`);

    if (calculatorResults) {
      calculatorContainer.removeChild(calculatorResults);
    }

    this.renderElement(calculatorContainer, this.createMortgageCalculatorResultsTemplate(totalCreditSumm, creditPersentage, annuityPayment, minimumIncome));

    const resultsApplyButton = calculatorContainer.querySelector(`.results__apply`);

    resultsApplyButton.addEventListener(`click`, () => {
      handler();
    });
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
    const creditSummInputMask = calculatorWrapper.querySelector(`.calculator__field-mask`);

    creditSummInput.addEventListener(`change`, (evt) => {
      creditSummInputMask.textContent = `${parseInt(creditSummInput.value, 10).toLocaleString(`ru-RU`)} рублей`;

      if (!evt.currentTarget.validity.valid) {
        creditSummInputMask.textContent = `Некорректное значение`;
      }

      if (evt.currentTarget.validity.valid) {
        handler(parseInt(evt.currentTarget.value, 10));
      }
    });

    creditSummInput.addEventListener(`focus`, () => {
      creditSummInputMask.style.display = `none`;
    });

    creditSummInput.addEventListener(`blur`, () => {
      creditSummInputMask.style.display = `inline-block`;
    });

    creditSummInputMask.addEventListener(`click`, () => {
      creditSummInput.focus();
    });

    decreaseButton.addEventListener(`click`, () => {
      if (parseInt(creditSummInput.value, 10) > parseInt(creditSummInput.min, 10)) {
        creditSummInput.value = parseInt(creditSummInput.value, 10) - creditSummStep;
        creditSummInputMask.textContent = `${parseInt(creditSummInput.value, 10).toLocaleString(`ru-RU`)} рублей`;
        handler(parseInt(creditSummInput.value, 10));
      }
    });

    increaseButton.addEventListener(`click`, () => {
      if (parseInt(creditSummInput.value, 10) < parseInt(creditSummInput.max, 10)) {
        creditSummInput.value = parseInt(creditSummInput.value, 10) + creditSummStep;
        creditSummInputMask.textContent = `${parseInt(creditSummInput.value, 10).toLocaleString(`ru-RU`)} рублей`;
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

    this.renderElement(stepTwoWrapper, this.createMortgageCalculatorSpecialsTemplate());

    const maternityCapitalCheckbox = stepTwoWrapper.querySelector(`#maternityCapital`);

    maternityCapitalCheckbox.addEventListener(`change`, (evt) => {
      handler(evt.currentTarget);
    });
  }

  renderCalculatorUserMessage(minimumTotalCreditSumm) {
    const calculatorContainer = document.querySelector(`.calculator__container`);
    const calculatorResults = calculatorContainer.querySelector(`.calculator__results`);

    if (calculatorResults) {
      calculatorContainer.removeChild(calculatorResults);
    }

    this.renderElement(calculatorContainer, this.createMortgageCalculatorUserMessageTemplate(minimumTotalCreditSumm));
  }

  renderCalculatorOrder(creditSumm, downPayment, creditPeriod, handler) {
    this.removeCalculatorOrder();

    const calculator = document.querySelector(`.calculator`);

    this.renderElement(calculator, this.createMortgageCalculatorOrderTemplate(creditSumm, downPayment, creditPeriod));

    const calculatorForm = calculator.querySelector(`#calculatorForm`);

    const userNameInput = calculatorForm.querySelector(`#userName`);
    userNameInput.focus();

    const calculatorFormInputs = calculatorForm.querySelectorAll(`input`);

    const calculatorFormContainer = document.querySelector(`.calculator__form`);

    calculatorFormInputs.forEach((input) => {
      input.addEventListener(`invalid`, () => {
        calculatorFormContainer.classList.add("form--invalid");
        setTimeout(() => {
          calculatorFormContainer.classList.remove("form--invalid");
        }, 1000);
      });
    });

    calculatorForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();

      this.removeCalculatorOrder();

      handler();
    });
  }

  removeCalculatorOrder() {
    const calculator = document.querySelector(`.calculator`);
    const calculatorOrder = calculator.querySelector(`.calculator__form`);

    if (calculatorOrder) {
      calculator.removeChild(calculatorOrder);
    }
  }
}

export const mortgageCalculatorView = new MortgageCalculatorView(
  {
    createMortgageCalculatorResultsTemplate,
    createMortgageCalculatorCreditSummTemplate,
    createMortgageCalculatorDownPaymentTemplate,
    createMortgageCalculatorPaymentValueTemplate,
    createCalculatorPeriodTemplate,
    createCalculatorPeriodValueTemplate,
    createMortgageCalculatorSpecialsTemplate,
    createMortgageCalculatorUserMessageTemplate,
    createMortgageCalculatorOrderTemplate
  },
  {
    renderElement,
    deleteChildrenElements
  },
  popup
);
