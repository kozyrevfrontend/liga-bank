import { renderElement } from './utils';
import { deleteChildrenElements } from './utils';

class BasicCalculatorView {
  constructor(utils) {
    this.creditPurposeField = document.querySelector(`#creditPurpose`);
    this.creditOptionsList = document.querySelector(`.calculator__options-list`);

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
}

export const basicCalculatorView = new BasicCalculatorView(
  {
    renderElement,
    deleteChildrenElements
  }
);
