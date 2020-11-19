class Menu {
  constructor() {
    this.navigation = document.querySelector(`.page-header__nav`);
    this.button = document.querySelector(`.page-header__menu`);
  }

  init() {
    this.navigation.classList.add(`page-header__nav--closed`);
    this.button.classList.add(`page-header__menu--closed`);

    this.button.addEventListener(`click`, () => {
      this.button.classList.toggle(`page-header__menu--closed`);
      this.navigation.classList.toggle(`page-header__nav--closed`);
    });
  }
}

export const menu = new Menu();
