import { createCalculatorResultsTemplate } from './markups/calculatorResultsTemplate';
import { renderElement } from './utils';
import { deleteChildrenElements } from './utils';

class CalculatorBasicView {
  constructor(markups, utils) {
    this.creditPurposeField = document.querySelector(`#creditPurpose`);
    this.creditOptionsList = document.querySelector(`.calculator__options-list`);

    this.createCalculatorResultsTemplate = markups.createCalculatorResultsTemplate;

    this.renderElement = utils.renderElement;
    this.deleteChildrenElements = utils.deleteChildrenElements;
  }

  addCreditPurposeClickListener() {
    this.creditPurposeField.addEventListener(`click`, () => {
      this.creditOptionsList.classList.toggle(`calculator__options-list--expanded`);
      this.creditPurposeField.classList.toggle(`calculator__field--expanded`);
    });
  }

  addCreditOptionsClickListeners(handler) {
    const creditPurposeFieldValue = this.creditPurposeField.querySelector(`span`);

    const creditOptionsItems = this.creditOptionsList.querySelectorAll(`.calculator__options-item button`);

    const creditOptionsItemsClickHandler = (item) => {
      item.addEventListener(`click`, (evt) => {
        creditPurposeFieldValue.textContent = evt.currentTarget.innerText;
        this.creditOptionsList.classList.toggle(`calculator__options-list--expanded`);
        this.creditPurposeField.classList.toggle(`calculator__field--expanded`);

        handler(evt.currentTarget.id);
      });
    };

    creditOptionsItems.forEach((item) => {
      creditOptionsItemsClickHandler(item);
    });
  }

  // const creditPurposeField = document.querySelector(`#creditPurpose`);
  // const creditPurposeFieldValue = creditPurposeField.querySelector(`span`);
  // const creditOptionsList = document.querySelector(`.calculator__options-list`);
  // const creditOptionsItems = creditOptionsList.querySelectorAll(`.calculator__options-item button`);

  // creditPurposeField.addEventListener(`click`, () => {
  //   creditOptionsList.classList.toggle(`calculator__options-list--expanded`);
  //   creditPurposeField.classList.toggle(`calculator__field--expanded`);
  // });

  // const creditOptionsItemsClickHandler = (item) => {
  //   item.addEventListener(`click`, (evt) => {
  //     creditPurposeFieldValue.textContent = evt.currentTarget.innerText;
  //     creditOptionsList.classList.toggle(`calculator__options-list--expanded`);
  //     creditPurposeField.classList.toggle(`calculator__field--expanded`);
  //     initCalculator(evt.currentTarget.id);
  //   });
  // };

  // creditOptionsItems.forEach((item) => {
  //   creditOptionsItemsClickHandler(item);
  // });

  renderCalculatorResults(totalCreditSumm, creditPersentage, annuityPayment, minimumIncome) {
    const calculatorContainer = document.querySelector(`.calculator__container`);
    const calculatorResults = calculatorContainer.querySelector(`.calculator__results`);

    if (calculatorResults) {
      calculatorContainer.removeChild(calculatorResults);
    }

    this.renderElement(calculatorContainer, this.createCalculatorResultsTemplate(totalCreditSumm, creditPersentage, annuityPayment, minimumIncome));
  }
}

export const calculatorBasicView = new CalculatorBasicView(
  {
    createCalculatorResultsTemplate
  },
  {
    renderElement,
    deleteChildrenElements
  }
);
