import { createCreditCalculatorResultsTemplate } from './markups/credit/calculatorCreditResultsTemplate';
import { createCreditCalculatorCreditSummTemplate } from './markups/credit/calculatorCreditCreditSummTemplate';
import { createCalculatorPeriodTemplate } from './markups/creditCalculatorPeriodTemplate';
import { createCalculatorPeriodValueTemplate } from './markups/creditCalculatorPeriodValueTemplate';
import { createCreditCalculatorSpecialsTemplate } from './markups/credit/calculatorCreditSpecialsTemplate';
import { createCreditCalculatorOrderTemplate } from './markups/credit/calculatorCreditOrderTemplate';
import { createCalculatorPeriodRangeTemplate } from './markups/creditCalculatorPeriodRangeTemplate';
import { popup } from '../../popup/popup';
import { renderElement } from './utils';
import { deleteChildrenElements } from './utils';

class CreditCalculatorView {
  constructor(markups, utils, basicPopup) {
    this.createCreditCalculatorResultsTemplate = markups.createCreditCalculatorResultsTemplate;
    this.createCreditCalculatorCreditSummTemplate = markups.createCreditCalculatorCreditSummTemplate;
    this.createCalculatorPeriodTemplate = markups.createCalculatorPeriodTemplate;
    this.createCalculatorPeriodValueTemplate = markups.createCalculatorPeriodValueTemplate;
    this.createCreditCalculatorSpecialsTemplate = markups.createCreditCalculatorSpecialsTemplate;
    this.createCreditCalculatorOrderTemplate = markups.createCreditCalculatorOrderTemplate;
    this.createCalculatorPeriodRangeTemplate = markups.createCalculatorPeriodRangeTemplate;
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

    this.renderElement(calculatorContainer, this.createCreditCalculatorResultsTemplate(totalCreditSumm, creditPersentage, annuityPayment, minimumIncome));

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

    this.renderElement(calculatorWrapper, this.createCreditCalculatorCreditSummTemplate(minimumCreditSumm, maximumCreditSumm, creditSumm));

    const creditSummInput = calculatorWrapper.querySelector(`#creditSumm`);
    const decreaseButton = calculatorWrapper.querySelector(`.calculator__button--decrease`);
    const increaseButton = calculatorWrapper.querySelector(`.calculator__button--increase`);
    const creditSummStep = 50000;
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

  renderCalculatorPeriod(minimumCreditPeriod, maximumCreditPeriod, creditPeriod, inputHandler, rangeHandler) {
    const stepTwoWrapper = document.querySelector(`#stepTwoWrapper`);
    const periodSection = stepTwoWrapper.querySelector(`#periodSection`);

    if (periodSection) {
      stepTwoWrapper.removeChild(periodSection);
    }

    this.renderElement(stepTwoWrapper, this.createCalculatorPeriodTemplate(minimumCreditPeriod, maximumCreditPeriod));

    this.renderCalculatorPeriodValue(minimumCreditPeriod, maximumCreditPeriod, creditPeriod, inputHandler);

    this.renderCalculatorPeriodRange(minimumCreditPeriod, maximumCreditPeriod, creditPeriod, rangeHandler);
  }

  renderCalculatorPeriodRange(minimumCreditPeriod, maximumCreditPeriod, creditPeriod, rangeHandler) {
    this.removeCalculatorPeriodRange();

    const periodSection = document.querySelector(`#periodSection`);
    const periodRangeContainer = periodSection.querySelector(`.calculator__section-inner`);

    this.renderElement(periodRangeContainer, this.createCalculatorPeriodRangeTemplate(minimumCreditPeriod, maximumCreditPeriod, creditPeriod));

    const periodRange = periodRangeContainer.querySelector(`#periodRange`);

    periodRange.addEventListener(`input`, (evt) => {
      rangeHandler(parseInt(evt.currentTarget.value, 10));
    });
  }

  removeCalculatorPeriodRange() {
    const periodSection = document.querySelector(`#periodSection`);
    const periodRangeContainer = periodSection.querySelector(`.calculator__section-inner`);
    const periodRange = periodRangeContainer.querySelector(`#periodRange`);

    if (periodRange) {
      periodRangeContainer.removeChild(periodRange);
    }
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

    this.renderElement(stepTwoWrapper, this.createCreditCalculatorSpecialsTemplate());

    const salaryProjectCheckbox = stepTwoWrapper.querySelector(`#salaryProject`);

    salaryProjectCheckbox.addEventListener(`change`, (evt) => {
      handler(evt.currentTarget);
    });
  }

  renderCalculatorOrder(creditSumm, downPayment, creditPeriod, orderCount, handler) {
    this.removeCalculatorOrder();

    const calculator = document.querySelector(`.calculator`);

    this.renderElement(calculator, this.createCreditCalculatorOrderTemplate(creditSumm, downPayment, creditPeriod, orderCount));

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

export const creditCalculatorView = new CreditCalculatorView(
  {
    createCreditCalculatorResultsTemplate,
    createCreditCalculatorCreditSummTemplate,
    createCalculatorPeriodTemplate,
    createCalculatorPeriodValueTemplate,
    createCreditCalculatorSpecialsTemplate,
    createCreditCalculatorOrderTemplate,
    createCalculatorPeriodRangeTemplate
  },
  {
    renderElement,
    deleteChildrenElements
  },
  popup
);
