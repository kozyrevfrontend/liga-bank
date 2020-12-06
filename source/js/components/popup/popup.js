import { createPopupTemplate } from './markup/createPopupTemplate';
import { createPopupCalculatorSuccessTemplate } from './markup/createPopupCalculatorSuccessTemplate';
import { renderElement } from '../calculator/views/utils';
import { deleteChildrenElements } from '../calculator/views/utils';

class Popup {
  constructor(markups, utils) {
    this.createPopupTemplate = markups.createPopupTemplate;
    this.createPopupCalculatorSuccessTemplate = markups.createPopupCalculatorSuccessTemplate;

    this.renderElement = utils.renderElement;
    this.deleteChildrenElements = utils.deleteChildrenElements;

    this.closePopupEscPress = this.closePopupEscPress.bind(this);
  }

  renderPopup() {
    this.renderElement(document.body, this.createPopupTemplate());

    document.body.classList.add(`overflow-hidden`);

    const popup = document.querySelector(`.popup`);
    const popupOverlay = popup.querySelector(`.popup__overlay`);

    document.addEventListener(`keydown`, this.closePopupEscPress);

    popupOverlay.addEventListener(`click`, (evt) => {
      if (evt.target === popupOverlay) {
        this.closePopup();
      }
    });
  }

  closePopup() {
    const popup = document.querySelector(`.popup`);

    document.body.removeChild(popup);
    document.body.classList.remove(`overflow-hidden`);
    document.removeEventListener(`keydown`, this.closePopupEscPress);
  }

  closePopupEscPress(evt) {
    if (evt.key === `Escape`) {
      this.closePopup();
    }
  }

  renderPopupCalculatorSuccess() {
    this.renderPopup();

    const popupOverlay = document.querySelector(`.popup__overlay`);

    this.renderElement(popupOverlay, this.createPopupCalculatorSuccessTemplate());

    const closeButton = popupOverlay.querySelector(`.popup-success__close`);

    closeButton.addEventListener('click', () => {
      this.closePopup();
    });
  }
}

export const popup = new Popup(
  {
    createPopupTemplate,
    createPopupCalculatorSuccessTemplate
  },
  {
    renderElement,
    deleteChildrenElements
  }
);
