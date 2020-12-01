(function () {
  'use strict';

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

  const menu = new Menu();

  class Slider {
    constructor(domNode, config, nameSpace) {
      this.config = config;
      this.currentConfig = this.findSuitableCfg();

      this.nameSpace = nameSpace;

      this.sliderContainer = domNode.querySelector(`.slider-container`);
      this.sliderNavigation = domNode.querySelector(`.slider-navigation`);
      this.sliderItems = this.sliderContainer.querySelectorAll(`.slider-item`);
      this.sliderNavigationButtons = this.sliderNavigation.querySelectorAll(`.slider-nav-btn`);

      this.slideCount = this.sliderItems.length;
      this.slideWidth = this.setSlideWidth();
      this.currentSlide = 0;

      this.changeSlide = this.changeSlide.bind(this);
    }

    init() {
      this.initActiveClasses(this.nameSpace);

      this.addNavigationButtonClickListeners();

      this.addSwipeListener();

      if (!this.currentConfig.navigation) {
        this.disableNavigationButtons();
      }

      if (this.currentConfig.slideShow) {
        this.activateSlideShow();
      }

      window.addEventListener(`resize`, () => {
        this.slideWidth = this.setSlideWidth();

        this.setSliderTransition(this.currentSlide);

        this.currentConfig = this.findSuitableCfg();

        this.enableNavigationButtons();

        if (!this.currentConfig.navigation) {
          this.disableNavigationButtons();
        }
      });
    }

    findSuitableCfg() {
      const suitableCfg = this.config.find((cfg) => {
        return window.matchMedia(`(min-width: ${cfg.screenWidth}px)`).matches;
      });
      return suitableCfg;
    }

    setSlideWidth() {
      return this.sliderContainer.clientWidth + this.currentConfig.slideGap;
    }

    setSliderTransition(slideNumber) {
      this.sliderContainer.style.transform = `translateX(-` + this.slideWidth * slideNumber + `px)`;
    }

    goToSlide(slideNumber) {
      this.setSliderTransition(slideNumber);

      this.currentSlide = slideNumber;

      this.setActiveClass(this.nameSpace);
    }

    moveRight() {
      if (this.currentSlide >= this.slideCount - 1) {
        this.goToSlide(0);

        this.currentSlide = 0;

        return;
      }

      this.currentSlide++;

      this.goToSlide(this.currentSlide);
    }

    moveLeft() {
      if (this.currentSlide === 0) {
        this.goToSlide(this.slideCount - 1);

        this.currentSlide = this.slideCount - 1;

        return;
      }

      this.currentSlide--;

      this.goToSlide(this.currentSlide);
    }

    changeSlide() {
      if (this.currentSlide >= this.slideCount - 1) {
        this.goToSlide(0);

        this.currentSlide = 0;

        return;
      }

      this.currentSlide++;

      this.goToSlide(this.currentSlide);
    }

    initActiveClasses(nameSpace) {
      const slides = this.sliderContainer.querySelectorAll(`.slider-item`);
      slides[0].classList.add(`slider-item--active`);

      for (let i = 1; i < slides.length; i++) {
        this.disableTab(slides[i]);
      }

      const firstDot = this.sliderNavigation.querySelector(`.${nameSpace}__nav-btn:first-child`);
      firstDot.classList.add(`${nameSpace}__nav-btn--active`);
    }

    setActiveClass(nameSpace) {
      let currentActive = this.sliderContainer.querySelector(`.slider-item--active`);
      this.disableTab(currentActive);
      currentActive.classList.remove(`slider-item--active`);

      this.sliderItems[this.currentSlide].classList.add(`slider-item--active`);
      this.enableTab(this.sliderItems[this.currentSlide]);

      let currentDot = this.sliderNavigation.querySelector(`.${nameSpace}__nav-btn--active`);
      currentDot.classList.remove(`${nameSpace}__nav-btn--active`);

      this.sliderNavigationButtons[this.currentSlide].classList.add(`${nameSpace}__nav-btn--active`);
    }

    disableTab(domNode) {
      const links = domNode.querySelectorAll(`a`);
      const buttons = domNode.querySelectorAll(`button`);

      if (links) {
        links.forEach((link) => {
          link.tabIndex = -1;
        });
      }

      if (buttons) {
        buttons.forEach((button) => {
          button.tabIndex = -1;
        });
      }
    }

    enableTab(domNode) {
      const links = domNode.querySelectorAll(`a`);
      const buttons = domNode.querySelectorAll(`button`);

      if (links) {
        links.forEach((link) => {
          link.tabIndex = 0;
        });
      }

      if (buttons) {
        buttons.forEach((button) => {
          button.tabIndex = 0;
        });
      }
    }

    navigationHandler(node, int) {
      node.addEventListener(`click`, () => {
        this.goToSlide(int);
      });
    }

    addNavigationButtonClickListeners() {
      this.sliderNavigationButtons.forEach((button, index) => {
        this.navigationHandler(button, index);
      });
    }

    disableNavigationButtons() {
      this.sliderNavigationButtons.forEach((button) => {
        button.style.pointerEvents = `none`;
      });
    }

    enableNavigationButtons() {
      this.sliderNavigationButtons.forEach((button) => {
        button.style.pointerEvents = `auto`;
      });
    }

    activateSlideShow() {
      window.setInterval(this.changeSlide, this.currentConfig.delay);
    }

    addSwipeListener() {
      this.swipe(this.sliderContainer);
      this.sliderContainer.addEventListener('swipe', (evt) => {
        if (evt.detail.direction === 'left') {
          this.moveRight();
        } else if (evt.detail.direction === 'right') {
          this.moveLeft();
        }
      });
    }

    swipe(el) {
      const settings = {
        minDistanсe: 30,
        maxDistance: 300,
        maxTime: 700,
        minTime: 50
      };


      let direction;
      let swipeType;
      let distance;
      let startX = 0;
      let distanceX = 0;
      let startY = 0;
      let distanceY = 0;
      let startTime = 0;

      const checkStart = function (evt) {
        direction = 'none';
        swipeType = 'none';
        distance = 0;
        startX = evt.targetTouches[0].pageX;
        startY = evt.targetTouches[0].pageY;
        startTime = new Date().getTime();
      };

      const checkMove = function (evt) {
        distanceX = evt.targetTouches[0].pageX - startX;
        distanceY = evt.targetTouches[0].pageY - startY;

        if (Math.abs(distanceX) > Math.abs(distanceY)) {
          direction = (distanceX < 0) ? 'left' : 'right';
        } else {
          direction = (distanceY < 0) ? 'up' : 'down';
        }
      };

      const checkEnd = function () {
        const endTime = new Date().getTime();
        const time = endTime - startTime;
        if (time >= settings.minTime && time <= settings.maxTime) {
          if (Math.abs(distanceX) >= settings.minDistanсe && Math.abs(distanceY) <= settings.maxDistance) {
            swipeType = direction;
          } else if (Math.abs(distanceY) >= settings.minDist && Math.abs(distanceX) <= settings.maxDistance) {
            swipeType = direction;
          }
        }
        distance = (direction === 'left' || direction === 'right') ? Math.abs(distanceX) : Math.abs(distanceY);

        if (swipeType !== 'none' && distance >= settings.minDistanсe) {
          const swipeEvent = new CustomEvent('swipe', {
            detail: {
              direction,
              distance,
              time
            }
          });
          el.dispatchEvent(swipeEvent);
        }
      };

      el.addEventListener('touchstart', checkStart);
      el.addEventListener('touchmove', checkMove);
      el.addEventListener('touchend', checkEnd);
    }
  }

  const promoConfig = [
    {
      screenWidth: 1024,
      navigation: true,
      slideShow: true,
      delay: 4000,
      swipe: false,
      slideFullScreen: true,
      slideGap: 0
    },
    {
      screenWidth: 320,
      navigation: false,
      slideShow: true,
      delay: 4000,
      swipe: true,
      slideFullScreen: true,
      slideGap: 0
    }
  ];

  const productsConfig = [
    {
      screenWidth: 1024,
      navigation: true,
      slideShow: false,
      delay: 4000,
      swipe: false,
      slideFullScreen: false,
      slideGap: 98
    },
    {
      screenWidth: 320,
      navigation: false,
      slideShow: false,
      delay: 4000,
      swipe: true,
      slideFullScreen: true,
      slideGap: 0
    }
  ];

  const promoSlider = new Slider(document.querySelector(`.promo`), promoConfig, `promo`);
  const productsSlider = new Slider(document.querySelector(`.products`), productsConfig, `products`);

  function renderElement(parentElement, template, place = `beforeend`) {
    parentElement.insertAdjacentHTML(place, template);
  }

  function deleteChildrenElements(list) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  }

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

  const basicCalculatorView = new BasicCalculatorView(
    {
      renderElement,
      deleteChildrenElements
    }
  );

  class BasicPresenter {
    constructor(model, view) {
      this.calculator = model;
      this.view = view;

      this.creditSummInputHandler = this.creditSummInputHandler.bind(this);
    }

    init(id) {
      this.calculator.init(id);

      console.dir(this.calculator);

      this.view.renderCalculatorResults(
        this.calculator.totalCreditSumm.toLocaleString('ru-RU'),
        this.calculator.creditPersentage.toFixed(2).toLocaleString('ru-RU'),
        this.calculator.annuityPayment.toLocaleString('ru-RU'),
        this.calculator.minimumIncome.toLocaleString('ru-RU')
      );

      this.view.renderCalculatorCreditSumm(
        this.calculator.minimumCreditSumm,
        this.calculator.maximumCreditSumm,
        this.calculator.creditSumm,
        this.creditSummInputHandler
      );
    }

    creditSummInputHandler(value) {
      this.calculator.setCreditSumm(value);

      if (this.calculator.minimumDownPaymentPersentage) {
        this.calculator.setMinimumDownPayment();
        this.calculator.calculateDownPayment(this.calculator.minimumDownPaymentPersentage);
        this.calculator.calculateDownPaymentPersentage();
      }

      this.calculator.calculateCreditPersentage();
      this.calculator.calculateTotalCreditSumm();
      this.calculator.calculateAnnuityPayment();
      this.calculator.calculateMinimumIncome();

      this.view.renderCalculatorResults(
        this.calculator.totalCreditSumm.toLocaleString('ru-RU'),
        this.calculator.creditPersentage.toFixed(2).toLocaleString('ru-RU'),
        this.calculator.annuityPayment.toLocaleString('ru-RU'),
        this.calculator.minimumIncome.toLocaleString('ru-RU')
      );
    }
  }

  class Calculator {
    constructor(data) {
      this.data = data;
      this.currentData = null;

      this.minimumIncomeRatio = 0.45;
      this.minimumIncome = null;

      this.creditSumm = null;
      this.minimumCreditSumm = null;
      this.maximumCreditSumm = null;

      this.creditPeriod = null;
      this.minimumCreditPeriod = null;
      this.maximumCreditPeriod = null;

      this.annuityPayment = null;
      this.creditPersentage = null;
      this.totalCreditSumm = null;

      this.minimumDownPaymentPersentage = null;
      this.minimumDownPayment = null;
      this.downPaymentPersentage = null;
      this.downPayment = null;
    }

    init(id) {
      this.setCurrentData(id);
      this.setMinimumCreditSumm();
      this.setMaximumCreditSumm();
      this.setCreditSumm(this.minimumCreditSumm);
      this.setMinimumCreditPeriod();
      this.setMaximumCreditPeriod();
      this.setCreditPeriod(this.minimumCreditPeriod);

      if (this.currentData.minimumDownPaymentPersentage) {
        this.setMinimumDownPaymentPersentage();
        this.setMinimumDownPayment();
        this.calculateDownPayment(this.minimumDownPaymentPersentage);
        this.calculateDownPaymentPersentage();
      }

      this.calculateCreditPersentage();
      this.calculateTotalCreditSumm();
      this.calculateAnnuityPayment();
      this.calculateMinimumIncome();
    }

    setCurrentData(id) {
      this.currentData = this.data[id];
    }

    setCreditSumm(summ) {
      this.creditSumm = summ;
    }

    setMinimumCreditSumm() {
      this.minimumCreditSumm = this.currentData.creditSumm.min;
    }

    setMaximumCreditSumm() {
      this.maximumCreditSumm = this.currentData.creditSumm.max;
    }

    setCreditPeriod(period) {
      this.creditPeriod = period;
    }

    setMinimumCreditPeriod() {
      this.minimumCreditPeriod = this.currentData.creditPeriod.min;
    }

    setMaximumCreditPeriod() {
      this.maximumCreditPeriod = this.currentData.creditPeriod.max;
    }

    setMinimumDownPaymentPersentage() {
      this.minimumDownPaymentPersentage = this.currentData.minimumDownPaymentPersentage;
    }

    setMinimumDownPayment() {
      this.minimumDownPayment = this.creditSumm * this.minimumDownPaymentPersentage / 100;
    }

    calculateDownPayment(persent) {
      this.downPayment = this.creditSumm * persent / 100;
    }

    calculateDownPaymentPersentage() {
      this.downPaymentPersentage = Math.floor((this.downPayment / this.creditSumm) * 100);
    }

    calculateAnnuityPayment() {
      const creditPeriodInMonth = this.creditPeriod * 12;
      const monthlyCreditPersentage = this.creditPersentage / 100 / 12;

      this.annuityPayment = Math.floor(this.totalCreditSumm * (monthlyCreditPersentage + (monthlyCreditPersentage / (Math.pow((1 + monthlyCreditPersentage), creditPeriodInMonth) - 1))));
    }

    calculateMinimumIncome() {
      this.minimumIncome = Math.floor((this.annuityPayment / this.minimumIncomeRatio));
    }
  }

  const creditProgramsData = {
    mortgage: {
      creditSumm: {
        min: 1200000,
        max: 25000000
      },
      creditPeriod: {
        min: 5,
        max: 30
      },
      minimumDownPaymentPersentage: 10,
      basicPersent: 15,
      creditPersentage: {
        basic: 9.4,
        special: 8.5
      },
      maternityCapital: 470000
    },
    auto: {
      creditSumm: {
        min: 500000,
        max: 5000000
      },
      creditPeriod: {
        min: 1,
        max: 5
      },
      minimumDownPaymentPersentage: 20,
      basicCreditSumm: 2000000,
      creditPersentage: {
        basic: 16,
        special: 15,
        insurance: 8.5,
        fullInsurance: 3.5
      }
    },
    credit: {
      creditSumm: {
        min: 50000,
        max: 3000000
      },
      creditPeriod: {
        min: 1,
        max: 7
      },
      basicCreditSumm: {
        min: 750000,
        max: 2000000
      },
      creditPersentage: {
        basic: 15,
        middle: 12.5,
        special: 9.5,
        salaryProject: 0.5
      }
    }
  };

  class MortgageCalculator extends Calculator {
    constructor(data) {
      super(data);

      this.maternityCapital = false;
    }

    calculateCreditPersentage() {
      this.creditPersentage = (this.downPaymentPersentage < this.currentData.basicPersent) ? this.currentData.creditPersentage.basic : this.currentData.creditPersentage.special;
    }

    calculateTotalCreditSumm() {
      if (this.maternityCapital) {
        this.totalCreditSumm = this.creditSumm - this.downPayment - this.currentData.maternityCapital;
      } else {
        this.totalCreditSumm = this.creditSumm - this.downPayment;
      }
    }
  }

  const mortgageCalculator = new MortgageCalculator(creditProgramsData);

  function createMortgageCalculatorResultsTemplate(creditSumm, creditPersentage, annuityPayment, minimumIncome) {
    return (
      `<div class="calculator__results results">
      <h3 class="results__title">Наше предложение</h3>
      <dl class="results__board">
        <div class="results__wrapper">
          <dt class="results__value">${creditSumm} рублей </dt>
          <dd class="results__description">Сумма ипотеки</dd>
        </div>
        <div class="results__wrapper results__wrapper--fix">
          <dt class="results__value">${creditPersentage}%</dt>
          <dd class="results__description">Процентная ставка</dd>
        </div>
        <div class="results__wrapper">
          <dt class="results__value">${annuityPayment} рублей</dt>
          <dd class="results__description">Ежемесячный платеж</dd>
        </div>
        <div class="results__wrapper results__wrapper--fix">
          <dt class="results__value">${minimumIncome} рублей</dt>
          <dd class="results__description">Необходимый доход</dd>
        </div>
      </dl>
      <button class="results__apply button"><span>Оформить заявку</span></button>
    </div>`
    );
  }

  function createMortgageCalculatorCreditSummTemplate(minimumCreditSumm, maximumCreditSumm, creditSumm) {
    return (
      `<div class="calculator__wrapper-inner" id="creditSummWrapper">
      <h3 class="calculator__title">Шаг 2. Введите параметры кредита</h3>
      <div class="calculator__section">
        <h4 class="calculator__title-inner">Стоимость недвижимости</h4>
        <p class="calculator__section-inner" id="section-summ">
          <input class="calculator__field" id="creditSumm" type="number" value="${creditSumm}" min="${minimumCreditSumm}" max="${maximumCreditSumm}">
          <button class="calculator__button calculator__button--decrease" aria-label="Уменьшить стоимость автомобиля">
            <svg width="16" height="2">
              <use href="img/sprite_auto.svg#icon-minus"></use>
            </svg>
          </button>
          <button class="calculator__button calculator__button--increase" aria-label="Увеличить стоимость автомобиля">
            <svg width="16" height="16">
              <use href="img/sprite_auto.svg#icon-plus"></use>
            </svg>
          </button>
        </p>
        <p class="calculator__legend">От ${minimumCreditSumm}  до ${maximumCreditSumm} рублей</p>
      </div>
    </div>`
    );
  }

  class MortgageCalculatorView {
    constructor(markups, utils) {
      this.createMortgageCalculatorResultsTemplate = markups.createMortgageCalculatorResultsTemplate;
      this.createMortgageCalculatorCreditSummTemplate = markups.createMortgageCalculatorCreditSummTemplate;
      this.createCalculatorCreditSummInputTemplate = markups.createCalculatorCreditSummInputTemplate;

      this.renderElement = utils.renderElement;
      this.deleteChildrenElements = utils.deleteChildrenElements;
    }

    renderCalculatorResults(totalCreditSumm, creditPersentage, annuityPayment, minimumIncome) {
      const calculatorContainer = document.querySelector(`.calculator__container`);
      const calculatorResults = calculatorContainer.querySelector(`.calculator__results`);

      if (calculatorResults) {
        calculatorContainer.removeChild(calculatorResults);
      }

      this.renderElement(calculatorContainer, this.createMortgageCalculatorResultsTemplate(totalCreditSumm, creditPersentage, annuityPayment, minimumIncome));
    }

    renderCalculatorCreditSumm(minimumCreditSumm, maximumCreditSumm, creditSumm, handler) {
      const calculatorWrapper = document.querySelector(`.calculator__wrapper`);
      const creditSummWrapper = calculatorWrapper.querySelector(`#creditSummWrapper`);

      if (creditSummWrapper) {
        calculatorWrapper.removeChild(creditSummWrapper);
      }

      this.renderElement(calculatorWrapper, this.createMortgageCalculatorCreditSummTemplate(minimumCreditSumm, maximumCreditSumm, creditSumm));

      const creditSummInput = calculatorWrapper.querySelector(`#creditSumm`);
      const decreaseButton = calculatorWrapper.querySelector(`.calculator__button--decrease`);
      const increaseButton = calculatorWrapper.querySelector(`.calculator__button--increase`);
      const creditSummStep = 100000;

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
  }

  const mortgageCalculatorView = new MortgageCalculatorView(
    {
      createMortgageCalculatorResultsTemplate,
      createMortgageCalculatorCreditSummTemplate
    },
    {
      renderElement,
      deleteChildrenElements
    }
  );

  class MortgagePresenter extends BasicPresenter {
    constructor(model, view) {
      super(model, view);
    }
  }

  const mortgagePresenter = new MortgagePresenter(mortgageCalculator, mortgageCalculatorView);

  class AutoCalculator extends Calculator {
    constructor(data) {
      super(data);

      this.autoInsurance = false;
      this.lifeInsurance = false;
    }

    calculateCreditPersentage() {
      this.creditPersentage = this.currentData.creditPersentage.basic;

      if (this.creditSumm >= this.currentData.basicCreditSumm) {
        this.creditPersentage = this.currentData.creditPersentage.special;
      }

      if (this.autoInsurance || this.lifeInsurance) {
        this.creditPersentage = this.currentData.creditPersentage.insurance;
      }

      if (this.autoInsurance && this.lifeInsurance) {
        this.creditPersentage = this.currentData.creditPersentage.fullInsurance;
      }
    }

    calculateTotalCreditSumm() {
      this.totalCreditSumm = this.creditSumm - this.downPayment;
    }
  }

  const autoCalculator = new AutoCalculator(creditProgramsData);

  function createAutoCalculatorResultsTemplate(creditSumm, creditPersentage, annuityPayment, minimumIncome) {
    return (
      `<div class="calculator__results results">
      <h3 class="results__title">Наше предложение</h3>
      <dl class="results__board">
        <div class="results__wrapper">
          <dt class="results__value">${creditSumm} рублей </dt>
          <dd class="results__description">Сумма автокредита</dd>
        </div>
        <div class="results__wrapper results__wrapper--fix">
          <dt class="results__value">${creditPersentage}%</dt>
          <dd class="results__description">Процентная ставка</dd>
        </div>
        <div class="results__wrapper">
          <dt class="results__value">${annuityPayment} рублей</dt>
          <dd class="results__description">Ежемесячный платеж</dd>
        </div>
        <div class="results__wrapper results__wrapper--fix">
          <dt class="results__value">${minimumIncome} рублей</dt>
          <dd class="results__description">Необходимый доход</dd>
        </div>
      </dl>
      <button class="results__apply button"><span>Оформить заявку</span></button>
    </div>`
    );
  }

  function createAutoCalculatorCreditSummTemplate(minimumCreditSumm, maximumCreditSumm, creditSumm) {
    return (
      `<div class="calculator__wrapper-inner" id="creditSummWrapper">
      <h3 class="calculator__title">Шаг 2. Введите параметры кредита</h3>
      <div class="calculator__section">
        <h4 class="calculator__title-inner">Стоимость автомобиля</h4>
        <p class="calculator__section-inner" id="section-summ">
          <input class="calculator__field" id="creditSumm" type="number" value="${creditSumm}" min="${minimumCreditSumm}" max="${maximumCreditSumm}">
          <button class="calculator__button calculator__button--decrease" aria-label="Уменьшить стоимость автомобиля">
            <svg width="16" height="2">
              <use href="img/sprite_auto.svg#icon-minus"></use>
            </svg>
          </button>
          <button class="calculator__button calculator__button--increase" aria-label="Увеличить стоимость автомобиля">
            <svg width="16" height="16">
              <use href="img/sprite_auto.svg#icon-plus"></use>
            </svg>
          </button>
        </p>
        <p class="calculator__legend">От ${minimumCreditSumm}  до ${maximumCreditSumm} рублей</p>
      </div>
    </div>`
    );
  }

  class AutoCalculatorView {
    constructor(markups, utils) {
      this.createAutoCalculatorResultsTemplate = markups.createAutoCalculatorResultsTemplate;
      this.createAutoCalculatorCreditSummTemplate = markups.createAutoCalculatorCreditSummTemplate;

      this.renderElement = utils.renderElement;
      this.deleteChildrenElements = utils.deleteChildrenElements;
    }

    renderCalculatorResults(totalCreditSumm, creditPersentage, annuityPayment, minimumIncome) {
      const calculatorContainer = document.querySelector(`.calculator__container`);
      const calculatorResults = calculatorContainer.querySelector(`.calculator__results`);

      if (calculatorResults) {
        calculatorContainer.removeChild(calculatorResults);
      }

      this.renderElement(calculatorContainer, this.createAutoCalculatorResultsTemplate(totalCreditSumm, creditPersentage, annuityPayment, minimumIncome));
    }

    renderCalculatorCreditSumm(minimumCreditSumm, maximumCreditSumm, creditSumm, handler) {
      const calculatorWrapper = document.querySelector(`.calculator__wrapper`);
      const creditSummWrapper = calculatorWrapper.querySelector(`#creditSummWrapper`);

      if (creditSummWrapper) {
        calculatorWrapper.removeChild(creditSummWrapper);
      }

      this.renderElement(calculatorWrapper, this.createAutoCalculatorCreditSummTemplate(minimumCreditSumm, maximumCreditSumm, creditSumm));

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
  }

  const autoCalculatorView = new AutoCalculatorView(
    {
      createAutoCalculatorResultsTemplate,
      createAutoCalculatorCreditSummTemplate
    },
    {
      renderElement,
      deleteChildrenElements
    }
  );

  class AutoPresenter extends BasicPresenter {
    constructor(model, view) {
      super(model, view);
    }
  }

  const autoPresenter = new AutoPresenter(autoCalculator, autoCalculatorView);

  class CreditCalculator extends Calculator {
    constructor(data) {
      super(data);

      this.salaryProject = false;
    }

    calculateCreditPersentage() {
      this.creditPersentage = this.currentData.creditPersentage.basic;

      if (this.creditSumm >= this.currentData.basicCreditSumm.min && this.creditSumm < this.currentData.basicCreditSumm.max) {
        this.creditPersentage = this.currentData.creditPersentage.middle;
      }

      if (this.creditSumm >= this.currentData.basicCreditSumm.max) {
        this.creditPersentage = this.currentData.creditPersentage.special;
      }

      if (this.salaryProject) {
        this.creditPersentage -= this.currentData.creditPersentage.salaryProject;
      }
    }

    calculateTotalCreditSumm() {
      this.totalCreditSumm = this.creditSumm;
    }
  }

  const creditCalculator = new CreditCalculator(creditProgramsData);

  function createCreditCalculatorResultsTemplate(creditSumm, creditPersentage, annuityPayment, minimumIncome) {
    return (
      `<div class="calculator__results results">
      <h3 class="results__title">Наше предложение</h3>
      <dl class="results__board">
        <div class="results__wrapper">
          <dt class="results__value">${creditSumm} рублей </dt>
          <dd class="results__description">Сумма кредита</dd>
        </div>
        <div class="results__wrapper results__wrapper--fix">
          <dt class="results__value">${creditPersentage}%</dt>
          <dd class="results__description">Процентная ставка</dd>
        </div>
        <div class="results__wrapper">
          <dt class="results__value">${annuityPayment} рублей</dt>
          <dd class="results__description">Ежемесячный платеж</dd>
        </div>
        <div class="results__wrapper results__wrapper--fix">
          <dt class="results__value">${minimumIncome} рублей</dt>
          <dd class="results__description">Необходимый доход</dd>
        </div>
      </dl>
      <button class="results__apply button"><span>Оформить заявку</span></button>
    </div>`
    );
  }

  function createCreditCalculatorCreditSummTemplate(minimumCreditSumm, maximumCreditSumm, creditSumm) {
    return (
      `<div class="calculator__wrapper-inner" id="creditSummWrapper">
      <h3 class="calculator__title">Шаг 2. Введите параметры кредита</h3>
      <div class="calculator__section">
        <h4 class="calculator__title-inner">Сумма потребительского кредита</h4>
        <p class="calculator__section-inner" id="section-summ">
          <input class="calculator__field" id="creditSumm" type="number" value="${creditSumm}" min="${minimumCreditSumm}" max="${maximumCreditSumm}">
          <button class="calculator__button calculator__button--decrease" aria-label="Уменьшить стоимость автомобиля">
            <svg width="16" height="2">
              <use href="img/sprite_auto.svg#icon-minus"></use>
            </svg>
          </button>
          <button class="calculator__button calculator__button--increase" aria-label="Увеличить стоимость автомобиля">
            <svg width="16" height="16">
              <use href="img/sprite_auto.svg#icon-plus"></use>
            </svg>
          </button>
        </p>
        <p class="calculator__legend">От ${minimumCreditSumm}  до ${maximumCreditSumm} рублей</p>
      </div>
    </div>`
    );
  }

  class CreditCalculatorView {
    constructor(markups, utils) {
      this.createCreditCalculatorResultsTemplate = markups.createCreditCalculatorResultsTemplate;
      this.createCreditCalculatorCreditSummTemplate = markups.createCreditCalculatorCreditSummTemplate;

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
      const creditSummWrapper = calculatorWrapper.querySelector(`#creditSummWrapper`);

      if (creditSummWrapper) {
        calculatorWrapper.removeChild(creditSummWrapper);
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
  }

  const creditCalculatorView = new CreditCalculatorView(
    {
      createCreditCalculatorResultsTemplate,
      createCreditCalculatorCreditSummTemplate
    },
    {
      renderElement,
      deleteChildrenElements
    }
  );

  class CreditPresenter extends BasicPresenter {
    constructor(model, view) {
      super(model, view);
    }
  }

  const creditPresenter = new CreditPresenter(creditCalculator, creditCalculatorView);

  class StaringPresenter {
    constructor(presenters, basicView) {
      this.mortgagePresenter = presenters.mortgagePresenter;
      this.autoPresenter = presenters.autoPresenter;
      this.creditPresenter = presenters.creditPresenter;
      this.basicView = basicView;

      this.creditOptionsClickHandler = this.creditOptionsClickHandler.bind(this);
    }

    init() {
      this.basicView.addCreditPurposeClickListener();
      this.basicView.addCreditOptionsClickListeners(this.creditOptionsClickHandler);
    }

    creditOptionsClickHandler(id) {
      switch (id) {
        case `mortgage`:
          this.mortgagePresenter.init(id);
          break;
        case `auto`:
          this.autoPresenter.init(id);
          break;
        case `credit`:
          this.creditPresenter.init(id);
          break;
      }
    }
  }

  const startingPresenter = new StaringPresenter(
    {
      mortgagePresenter,
      autoPresenter,
      creditPresenter
    },
    basicCalculatorView
  );

  menu.init();
  promoSlider.init();
  productsSlider.init();
  startingPresenter.init();

}());

//# sourceMappingURL=main.js.map
