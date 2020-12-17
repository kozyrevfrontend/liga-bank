import { createMortgageCalculatorResultsTemplate } from './markups/mortgage/calculatorMortgageResultsTemplate';
import { createMortgageCalculatorCreditSummTemplate } from './markups/mortgage/calculatorMortgageCreditSummTemplate';
import { createMortgageCalculatorDownPaymentTemplate } from './markups/mortgage/calculatorMortgageDownPaymentTemplate';
import { createMortgageCalculatorPaymentValueTemplate } from './markups/mortgage/calculatorMortgagePaymentValueTemplate';
import { createCalculatorPeriodTemplate } from './markups/creditCalculatorPeriodTemplate';
import { createCalculatorPeriodValueTemplate } from './markups/creditCalculatorPeriodValueTemplate';
import { createMortgageCalculatorSpecialsTemplate } from './markups/mortgage/calculatorMortgageSpecialsTemplate';
import { createMortgageCalculatorUserMessageTemplate } from './markups/mortgage/calculatorMortgageUserMessageTemplate';
import { createMortgageCalculatorOrderTemplate } from './markups/mortgage/calculatorMortgageOrderTemplate';
import { createCalculatorPeymentLegendTemplate } from './markups/creditCalculatorPeymentLegendTemplate';
import { createMortgageCalculatorPaymentRangeTemplate } from './markups/mortgage/calculatorMortgagePaymentRangeTemplate';
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
    this.createCalculatorPeymentLegendTemplate = markups.createCalculatorPeymentLegendTemplate;
    this.createCalculatorPeriodTemplate = markups.createCalculatorPeriodTemplate;
    this.createCalculatorPeriodValueTemplate = markups.createCalculatorPeriodValueTemplate;
    this.createMortgageCalculatorSpecialsTemplate = markups.createMortgageCalculatorSpecialsTemplate;
    this.createMortgageCalculatorUserMessageTemplate = markups.createMortgageCalculatorUserMessageTemplate;
    this.createMortgageCalculatorOrderTemplate = markups.createMortgageCalculatorOrderTemplate;
    this.createMortgageCalculatorPaymentRangeTemplate = markups.createMortgageCalculatorPaymentRangeTemplate;
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

  renderCalculatorDownPayment(minimumDownPaymentPersentage, downPaymentPersentage, minimumDownPayment, downPayment, inputHandler, rangeHandler) {
    const stepTwoWrapper = document.querySelector(`#stepTwoWrapper`);
    const downPaymentSection = stepTwoWrapper.querySelector(`#downPaymentSection`);

    if (downPaymentSection) {
      stepTwoWrapper.removeChild(downPaymentSection);
    }

    this.renderElement(stepTwoWrapper, this.createMortgageCalculatorDownPaymentTemplate());

    this.renderCalculatorPaymentLegend(minimumDownPaymentPersentage);

    this.renderCalculatorPaymentValue(minimumDownPayment, downPayment, inputHandler);

    this.renderCalculatorPaymentRange(minimumDownPaymentPersentage, downPaymentPersentage, rangeHandler);
  }

  renderCalculatorPaymentRange(minimumDownPaymentPersentage, downPaymentPersentage, rangeHandler) {
    this.removeCalculatorPaymentRange();

    const downPaymentSection = document.querySelector(`#downPaymentSection`);
    const paymentRangeContainer = downPaymentSection.querySelector(`.calculator__section-inner`);

    this.renderElement(paymentRangeContainer, this.createMortgageCalculatorPaymentRangeTemplate(minimumDownPaymentPersentage, downPaymentPersentage));

    const downPaymentRange = paymentRangeContainer.querySelector(`#downPaymentRange`);

    downPaymentRange.addEventListener(`input`, (evt) => {
      rangeHandler(parseInt(evt.currentTarget.value, 10));
    });
  }

  removeCalculatorPaymentRange() {
    const downPaymentSection = document.querySelector(`#downPaymentSection`);
    const paymentRangeContainer = downPaymentSection.querySelector(`.calculator__section-inner`);
    const paymentRange = paymentRangeContainer.querySelector(`#downPaymentRange`);

    if (paymentRange) {
      paymentRangeContainer.removeChild(paymentRange);
    }
  }

  renderCalculatorPaymentLegend(downPaymentPersentage) {
    this.removeCalculatorPaymentLegend();

    const downPaymentSection = document.querySelector(`#downPaymentSection`);

    this.renderElement(downPaymentSection, this.createCalculatorPeymentLegendTemplate(downPaymentPersentage));
  }

  removeCalculatorPaymentLegend() {
    const downPaymentSection = document.querySelector(`#downPaymentSection`);
    const downPaymentLegend = downPaymentSection.querySelector(`#downPaymentLegend`);

    if (downPaymentLegend) {
      downPaymentSection.removeChild(downPaymentLegend);
    }
  }

  renderCalculatorPaymentValue(minimumDownPayment, downPayment, inputHandler) {
    this.removeCalculatorPaymentValue();

    const downPaymentSection = document.querySelector(`#downPaymentSection`);
    const downPaymentSectionInner = downPaymentSection.querySelector(`.calculator__section-inner`);

    this.renderElement(downPaymentSectionInner, this.createMortgageCalculatorPaymentValueTemplate(minimumDownPayment, downPayment), `afterbegin`);

    const downPaymentInput = downPaymentSection.querySelector(`#downPayment`);
    const downPaymentInputMask = downPaymentSection.querySelector(`.calculator__field-mask`);

    downPaymentInput.addEventListener(`change`, (evt) => {
      if (parseInt(evt.currentTarget.value, 10) < parseInt(evt.currentTarget.min, 10)) {
        evt.currentTarget.value = evt.currentTarget.min;
      }

      downPaymentInputMask.textContent = `${parseInt(downPaymentInput.value, 10).toLocaleString(`ru-RU`)} рублей`;

      inputHandler(parseInt(evt.currentTarget.value, 10));
    });

    downPaymentInput.addEventListener(`focus`, () => {
      downPaymentInputMask.style.display = `none`;
    });

    downPaymentInput.addEventListener(`blur`, () => {
      downPaymentInputMask.style.display = `inline-block`;
    });

    downPaymentInputMask.addEventListener(`click`, () => {
      downPaymentInput.focus();
    });
  }

  removeCalculatorPaymentValue() {
    const downPaymentSection = document.querySelector(`#downPaymentSection`);
    const downPaymentSectionInner = downPaymentSection.querySelector(`.calculator__section-inner`);
    const downPaymentInputWrapper = downPaymentSection.querySelector(`.calculator__field-wrapper`);

    if (downPaymentSection.querySelector(`#downPayment`)) {
      downPaymentSectionInner.removeChild(downPaymentInputWrapper);
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
    const periodInputMask = periodSection.querySelector(`.calculator__field-mask`);

    periodInput.addEventListener(`change`, (evt) => {
      if (parseInt(evt.currentTarget.value, 10) < parseInt(evt.currentTarget.min, 10)) {
        evt.currentTarget.value = evt.currentTarget.min;
      }

      if (parseInt(evt.currentTarget.value, 10) > parseInt(evt.currentTarget.max, 10)) {
        evt.currentTarget.value = evt.currentTarget.max;
      }

      let years = `лет`;

      if (parseInt(evt.currentTarget.value, 10) === 1 || parseInt(evt.currentTarget.value, 10) === 21) {
        years = `год`;
      }

      if (evt.currentTarget.value >= 2 && evt.currentTarget.value <= 4 || evt.currentTarget.value >= 22 && evt.currentTarget.value <= 24) {
        years = `года`;
      }

      periodInputMask.textContent = `${evt.currentTarget.value} ${years}`;

      inputHandler(parseInt(evt.currentTarget.value, 10));
    });

    periodInput.addEventListener(`focus`, () => {
      periodInputMask.style.display = `none`;
    });

    periodInput.addEventListener(`blur`, () => {
      periodInputMask.style.display = `inline-block`;
    });

    periodInputMask.addEventListener(`click`, () => {
      periodInput.focus();
    });
  }

  removeCalculatorPeriodValue() {
    const periodSection = document.querySelector(`#periodSection`);
    const periodSectionInner = periodSection.querySelector(`.calculator__section-inner`);
    const periodInputWrapper = periodSection.querySelector(`.calculator__field-wrapper`);

    if (periodSection.querySelector(`#period`)) {
      periodSectionInner.removeChild(periodInputWrapper);
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

  renderCalculatorOrder(creditSumm, downPayment, creditPeriod, orderCount, handler) {
    this.removeCalculatorOrder();

    const calculator = document.querySelector(`.calculator`);

    this.renderElement(calculator, this.createMortgageCalculatorOrderTemplate(creditSumm, downPayment, creditPeriod, orderCount));

    const calculatorForm = calculator.querySelector(`#calculatorForm`);

    const userNameInput = calculatorForm.querySelector(`#userName`);
    userNameInput.focus();

    if (localStorage.orderUserName) {
      userNameInput.value = localStorage.orderUserName;
    }

    userNameInput.addEventListener(`change`, (evt) => {
      localStorage.orderUserName = evt.currentTarget.value;
    });

    const userPhoneInput = calculatorForm.querySelector(`#userPhone`);

    if (localStorage.orderUserPhone) {
      userPhoneInput.value = localStorage.orderUserPhone;
    }

    userPhoneInput.addEventListener(`change`, (evt) => {
      localStorage.orderUserPhone = evt.currentTarget.value;
    });

    const userEmailInput = calculatorForm.querySelector(`#userEmail`);

    if (localStorage.orderUserEmail) {
      userEmailInput.value = localStorage.orderUserEmail;
    }

    userEmailInput.addEventListener(`change`, (evt) => {
      localStorage.orderUserEmail = evt.currentTarget.value;
    });

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
    createCalculatorPeymentLegendTemplate,
    createCalculatorPeriodTemplate,
    createCalculatorPeriodValueTemplate,
    createMortgageCalculatorSpecialsTemplate,
    createMortgageCalculatorUserMessageTemplate,
    createMortgageCalculatorOrderTemplate,
    createMortgageCalculatorPaymentRangeTemplate
  },
  {
    renderElement,
    deleteChildrenElements
  },
  popup
);
