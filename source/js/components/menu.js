import {popup} from './popup/popup';

class Menu {
  constructor(popupBasic) {
    this.navigation = document.querySelector(`.page-header__nav`);
    this.button = document.querySelector(`.page-header__menu`);
    this.enterLink = document.querySelector(`.enter`);
    this.popup = popupBasic;
  }

  init() {
    this.navigation.classList.add(`page-header__nav--closed`);
    this.button.classList.add(`page-header__menu--closed`);

    this.button.addEventListener(`click`, () => {
      this.button.classList.toggle(`page-header__menu--closed`);
      this.navigation.classList.toggle(`page-header__nav--closed`);
    });

    this.enterLink.addEventListener(`click`, () => {
      this.popup.renderPopupMenuLogin();
    });
  }
}

export const menu = new Menu(popup);
