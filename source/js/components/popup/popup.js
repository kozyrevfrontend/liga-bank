import { createPopupTemplate } from './markup/createPopupTemplate';
import { createPopupCalculatorSuccessTemplate } from './markup/createPopupCalculatorSuccessTemplate';
import { createPopupLoginTemplate } from './markup/createPopupLoginTemplate';
import { renderElement } from '../calculator/views/utils';
import { deleteChildrenElements } from '../calculator/views/utils';

class Popup {
  constructor(markups, utils) {
    this.createPopupTemplate = markups.createPopupTemplate;
    this.createPopupCalculatorSuccessTemplate = markups.createPopupCalculatorSuccessTemplate;
    this.createPopupLoginTemplate = markups.createPopupLoginTemplate;

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

  renderPopupMenuLogin() {
    this.renderPopup();

    const popupOverlay = document.querySelector(`.popup__overlay`);

    this.renderElement(popupOverlay, this.createPopupLoginTemplate());

    const loginInput = popupOverlay.querySelector(`#login`);

    loginInput.focus();

    if (localStorage.login) {
      loginInput.value = localStorage.login;
    }

    loginInput.addEventListener(`change`, (evt) => {
      localStorage.login = evt.currentTarget.value;
    });


    const closeButton = popupOverlay.querySelector(`.popup-login__close`);

    closeButton.addEventListener('click', () => {
      this.closePopup();
    });

    const passwordInput = popupOverlay.querySelector(`#password`);
    const passwordIcon = popupOverlay.querySelector(`#passwordIcon`);

    if (localStorage.password) {
      passwordInput.value = localStorage.password;
    }

    passwordInput.addEventListener(`change`, (evt) => {
      localStorage.password = evt.currentTarget.value;
    });

    passwordIcon.addEventListener(`mousedown`, (evt) => {
      evt.stopPropagation();
      passwordInput.setAttribute(`type`, `text`);
    });

    passwordIcon.addEventListener(`mouseup`, (evt) => {
      evt.stopPropagation();
      passwordInput.setAttribute(`type`, `password`);
    });

    passwordIcon.addEventListener(`touchstart`, (evt) => {
      evt.stopPropagation();
      passwordInput.setAttribute(`type`, `text`);
    });

    passwordIcon.addEventListener(`touchends`, (evt) => {
      evt.stopPropagation();
      passwordInput.setAttribute(`type`, `password`);
    });
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
    createPopupCalculatorSuccessTemplate,
    createPopupLoginTemplate
  },
  {
    renderElement,
    deleteChildrenElements
  }
);
