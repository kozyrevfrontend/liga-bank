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

      this.creditResultsButtonHandler = this.creditResultsButtonHandler.bind(this);
      this.creditSummInputHandler = this.creditSummInputHandler.bind(this);
      this.downPaymentInputHandler = this.downPaymentInputHandler.bind(this);
      this.downPaymentRangeHandler = this.downPaymentRangeHandler.bind(this);
      this.periodInputHandler = this.periodInputHandler.bind(this);
      this.periodRangeHandler = this.periodRangeHandler.bind(this);
      this.orderFormSubmitHandler = this.orderFormSubmitHandler.bind(this);
    }

    init(id) {
      this.calculator.init(id);

      this.view.removeCalculatorOrder();

      this.view.renderCalculatorResults(
        this.calculator.totalCreditSumm,
        this.calculator.creditPersentage,
        this.calculator.annuityPayment,
        this.calculator.minimumIncome,
        this.creditResultsButtonHandler
      );

      this.view.renderCalculatorCreditSumm(
        this.calculator.minimumCreditSumm,
        this.calculator.maximumCreditSumm,
        this.calculator.creditSumm,
        this.creditSummInputHandler
      );

      if (this.calculator.minimumDownPaymentPersentage) {
        this.view.renderCalculatorDownPayment(
          this.calculator.minimumDownPaymentPersentage,
          this.calculator.minimumDownPayment,
          this.calculator.downPayment,
          this.downPaymentInputHandler,
          this.downPaymentRangeHandler
        );
      }

      this.view.renderCalculatorPeriod(
        this.calculator.minimumCreditPeriod,
        this.calculator.maximumCreditPeriod,
        this.calculator.creditPeriod,
        this.periodInputHandler,
        this.periodRangeHandler
      );
    }

    creditResultsButtonHandler() {
      this.view.renderCalculatorOrder(
        this.calculator.creditSumm,
        this.calculator.downPayment,
        this.calculator.creditPeriod,
        this.orderFormSubmitHandler
      );
    }

    creditSummInputHandler(value) {
      this.calculator.setCreditSumm(value);

      if (this.calculator.minimumDownPaymentPersentage) {
        this.calculator.setMinimumDownPayment();
        this.calculator.calculateDownPayment(this.calculator.downPaymentPersentage);
        this.calculator.calculateDownPaymentPersentage();

        this.view.renderCalculatorPaymentValue(
          this.calculator.minimumDownPayment,
          this.calculator.downPayment,
          this.downPaymentInputHandler
        );
      }

      this.calculator.calculateCreditPersentage();
      this.calculator.calculateTotalCreditSumm();
      this.calculator.calculateAnnuityPayment();
      this.calculator.calculateMinimumIncome();

      this.view.renderCalculatorResults(
        this.calculator.totalCreditSumm,
        this.calculator.creditPersentage,
        this.calculator.annuityPayment,
        this.calculator.minimumIncome,
        this.creditResultsButtonHandler
      );
    }

    downPaymentInputHandler(value) {
      this.calculator.downPayment = value;
      this.calculator.calculateDownPaymentPersentage();

      this.calculator.calculateCreditPersentage();
      this.calculator.calculateTotalCreditSumm();
      this.calculator.calculateAnnuityPayment();
      this.calculator.calculateMinimumIncome();

      if (this.calculator.minimumTotalCreditSumm) {
        if (this.calculator.totalCreditSumm < this.calculator.minimumTotalCreditSumm) {
          this.view.renderCalculatorUserMessage(this.calculator.minimumTotalCreditSumm);
        } else {
          this.view.renderCalculatorResults(
            this.calculator.totalCreditSumm,
            this.calculator.creditPersentage,
            this.calculator.annuityPayment,
            this.calculator.minimumIncome,
            this.creditResultsButtonHandler
          );
        }
      }
    }

    downPaymentRangeHandler(value) {
      this.calculator.downPaymentPersentage = value;
      this.calculator.calculateDownPayment(value);

      this.view.renderCalculatorPaymentValue(this.calculator.minimumDownPayment, this.calculator.downPayment, this.downPaymentInputHandler);

      this.calculator.calculateCreditPersentage();
      this.calculator.calculateTotalCreditSumm();
      this.calculator.calculateAnnuityPayment();
      this.calculator.calculateMinimumIncome();

      if (this.calculator.minimumTotalCreditSumm) {
        if (this.calculator.totalCreditSumm < this.calculator.minimumTotalCreditSumm) {
          this.view.renderCalculatorUserMessage(this.calculator.minimumTotalCreditSumm);
        } else {
          this.view.renderCalculatorResults(
            this.calculator.totalCreditSumm,
            this.calculator.creditPersentage,
            this.calculator.annuityPayment,
            this.calculator.minimumIncome,
            this.creditResultsButtonHandler
          );
        }
      }
    }

    periodInputHandler(value) {
      this.calculator.creditPeriod = value;

      this.calculator.calculateCreditPersentage();
      this.calculator.calculateTotalCreditSumm();
      this.calculator.calculateAnnuityPayment();
      this.calculator.calculateMinimumIncome();

      this.view.renderCalculatorResults(
        this.calculator.totalCreditSumm,
        this.calculator.creditPersentage,
        this.calculator.annuityPayment,
        this.calculator.minimumIncome,
        this.creditResultsButtonHandler
      );
    }

    periodRangeHandler(value) {
      this.calculator.creditPeriod = value;

      this.view.renderCalculatorPeriodValue(this.calculator.minimumCreditPeriod, this.calculator.maximumCreditPeriod, this.calculator.creditPeriod, this.downPaymentInputHandler);

      this.calculator.calculateCreditPersentage();
      this.calculator.calculateTotalCreditSumm();
      this.calculator.calculateAnnuityPayment();
      this.calculator.calculateMinimumIncome();

      this.view.renderCalculatorResults(
        this.calculator.totalCreditSumm,
        this.calculator.creditPersentage,
        this.calculator.annuityPayment,
        this.calculator.minimumIncome,
        this.creditResultsButtonHandler
      );
    }

    orderFormSubmitHandler() {
      this.view.popup.renderPopupCalculatorSuccess();
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
      this.minimumTotalCreditSumm = null;

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
      this.setMinimunTotalCreditSumm();
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

    setMinimunTotalCreditSumm() {
      if (this.currentData.minimumTotalCreditSumm) {
        this.minimumTotalCreditSumm = this.currentData.minimumTotalCreditSumm;
      }
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
      minimumTotalCreditSumm: 500000,
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
      minimumTotalCreditSumm: 200000,
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
          <dt class="results__value">${creditSumm.toLocaleString('ru-RU')} рублей </dt>
          <dd class="results__description">Сумма ипотеки</dd>
        </div>
        <div class="results__wrapper results__wrapper--fix">
          <dt class="results__value">${creditPersentage.toFixed(2).replace('.', ',')}%</dt>
          <dd class="results__description">Процентная ставка</dd>
        </div>
        <div class="results__wrapper">
          <dt class="results__value">${annuityPayment.toLocaleString('ru-RU')} рублей</dt>
          <dd class="results__description">Ежемесячный платеж</dd>
        </div>
        <div class="results__wrapper results__wrapper--fix">
          <dt class="results__value">${minimumIncome.toLocaleString('ru-RU')} рублей</dt>
          <dd class="results__description">Необходимый доход</dd>
        </div>
      </dl>
      <button class="results__apply button"><span>Оформить заявку</span></button>
    </div>`
    );
  }

  function createMortgageCalculatorCreditSummTemplate(minimumCreditSumm, maximumCreditSumm, creditSumm) {
    return (
      `<div class="calculator__wrapper-inner" id="stepTwoWrapper">
      <h3 class="calculator__title calculator__title--step-two">Шаг 2. Введите параметры кредита</h3>
      <div class="calculator__section">
        <h4 class="calculator__title-inner">Стоимость недвижимости</h4>
        <div class="calculator__section-inner" id="section-summ">
          <div class="calculator__field-wrapper">
            <input class="calculator__field" id="creditSumm" type="number" value="${creditSumm}" min="${minimumCreditSumm}" max="${maximumCreditSumm}">
            <span class="calculator__field-mask">${creditSumm.toLocaleString(`ru-RU`)} рублей</span>
          </div>
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
        </div>
        <p class="calculator__legend">От ${minimumCreditSumm.toLocaleString('ru-RU')}  до ${maximumCreditSumm.toLocaleString('ru-RU')} рублей</p>
      </div>
    </div>`
    );
  }

  function createMortgageCalculatorDownPaymentTemplate(minimumDownPaymentPersentage) {
    return (
      `<div class="calculator__section" id="downPaymentSection">
      <h4 class="calculator__title-inner">Первоначальный взнос</h4>
      <p class="calculator__section-inner">
        <input class="calculator__range range" id="downPaymentRange" type="range" min="${minimumDownPaymentPersentage}" max="100" step="10" value="${minimumDownPaymentPersentage}">
      </p>
      <p class="calculator__legend">${minimumDownPaymentPersentage}%</p>
    </div>`
    );
  }

  function createMortgageCalculatorPaymentValueTemplate(minimumDownPayment, downPayment) {
    return (
      `<div class="calculator__field-wrapper">
      <input class="calculator__field" id="downPayment" type="number" value="${downPayment}" min="${minimumDownPayment}">
      <span class="calculator__field-mask">${downPayment.toLocaleString(`ru-RU`)} рублей</span>
    </div>`
    );
  }

  function createCalculatorPeriodTemplate(minimumCreditPeriod, maximumCreditPeriod) {
    let yearsMin = `лет`;

    if (minimumCreditPeriod === 1) {
      yearsMin = `год`;
    }

    if (minimumCreditPeriod >= 2 && minimumCreditPeriod <= 4) {
      yearsMin = `года`;
    }

    let yearMax = `лет`;

    if (maximumCreditPeriod === 1) {
      yearMax = `год`;
    }

    if (maximumCreditPeriod >= 2 && maximumCreditPeriod <= 4) {
      yearMax = `года`;
    }

    return (
      `<div class="calculator__section" id="periodSection">
      <h4 class="calculator__title-inner">Срок кредитования</h4>
      <p class="calculator__section-inner">
        <input class="calculator__range range" id="periodRange" type="range" min="${minimumCreditPeriod}" max="${maximumCreditPeriod}" step="1" value="${minimumCreditPeriod}">
      </p>
      <p class="calculator__legend">
        <span>${minimumCreditPeriod} ${yearsMin}</span>
        <span>${maximumCreditPeriod} ${yearMax}</span>
      </p>
    </div>`
    );
  }

  function createCalculatorPeriodValueTemplate(minimumCreditPeriod, maximumCreditPeriod, creditPeriod) {
    let years = `лет`;

    if (creditPeriod === 1 || creditPeriod === 21) {
      years = `год`;
    }

    if (creditPeriod >= 2 && creditPeriod <= 4 || creditPeriod >= 22 && creditPeriod <= 24) {
      years = `года`;
    }

    return (
      `<div class="calculator__field-wrapper">
      <input class="calculator__field" id="period" type="number" value="${creditPeriod}" min="${minimumCreditPeriod}" max="${maximumCreditPeriod}">
      <span class="calculator__field-mask">${creditPeriod} ${years}</span>
    </div>`
    );
  }

  function createMortgageCalculatorSpecialsTemplate() {
    return (
      `<div class="calculator__section" id="specials">
      <h4 class="calculator__title-inner visually-hidden">Специальные условия</h4>
      <ul class="calculator__specials-list">
        <li class="calculator__specials-item">
          <input class="calculator__checkbox" id="maternityCapital" type="checkbox" name="maternityCapital">
          <label class="calculator__label" for="maternityCapital" tabindex="0">Использовать материнский капитал</label>
        </li>
      </ul>
    </div>`
    );
  }

  function createMortgageCalculatorUserMessageTemplate(minimumTotalCreditSumm) {
    return (
      `<div class="calculator__results user-message">
      <p class="user-message__message">Наш банк не выдаёт ипотечные
      кредиты меньше ${minimumTotalCreditSumm.toLocaleString('ru-RU')} рублей.</p>
      <p class="user-message__proposal">Попробуйте использовать другие параметры для расчёта.</p>
    </div>`
    );
  }

  function createMortgageCalculatorOrderTemplate(creditSumm, downPayment, creditPeriod) {
    let years = `лет`;

    if (creditPeriod === 1 || creditPeriod === 21) {
      years = `год`;
    }

    if (creditPeriod >= 2 && creditPeriod <= 4 || creditPeriod >= 22 && creditPeriod <= 24) {
      years = `года`;
    }

    return (
      `<div class="calculator__form form">
      <h3 class="form__title">Шаг 3. Оформление заявки</h3>
      <form id="calculatorForm" action="https://echo.htmlacademy.ru" method="POST">
        <p class="form__item form__item--readonly">
          <label for="orderNumber">Номер заявки</label>
          <input id="orderNumber" name="orderNumber" type="text" value="№ 0010" tabindex="-1" readonly>
        </p>
        <p class="form__item form__item--readonly">
          <label for="creditPropose">Цель кредита</label>
          <input id="creditPropose" name="creditPropose" type="text" value="Ипотека" tabindex="-1" readonly>
        </p>
        <p class="form__item form__item--readonly">
          <label for="creditSumm">Стоимость недвижимости</label>
          <input id="creditSumm" name="creditSumm" type="text" value="${creditSumm.toLocaleString(`ru-RU`)} рублей" tabindex="-1" readonly>
        </p>
        <p class="form__item form__item--readonly">
          <label for="downPayment">Первоначальный взнос</label>
          <input id="downPayment" name="downPayment" type="text" value="${downPayment.toLocaleString(`ru-RU`)} рублей" tabindex="-1" readonly>
        </p>
        <p class="form__item form__item--readonly">
          <label for="creditPeriod">Срок кредитования</label>
          <input id="creditPeriod" name="creditPeriod" type="text" value="${creditPeriod} ${years}" tabindex="-1" readonly>
        </p>
        <p class="form__item">
          <label class="visually-hidden" for="userName">Введите ваши ФИО</label>
          <input id="userName" name="userName" type="text" placeholder="ФИО" required autofocus>
        </p>
        <div class="form__wrapper-inner">
          <p class="form__item">
            <label class="visually-hidden" for="userPhone">Введите ваш номер телефона</label>
            <input id="userPhone" name="userPhone" type="number" placeholder="Телефон" required>
          </p>
          <p class="form__item">
            <label class="visually-hidden" for="userEmail">Введите вашу почту</label>
            <input id="userEmail" name="userEmail" type="email" placeholder="E-mail" required>
          </p>
        </div>
        <button class="button form__button" type="submit">
          <span>Отправить</span>
        </button>
      </form>
    </div>`
    );
  }

  function createPopupTemplate() {
    return (
      `<div class="popup">
      <div class="popup__overlay">
      </div>
    </div>`
    );
  }

  function createPopupCalculatorSuccessTemplate() {
    return (
      `<div class="popup-success">
      <div class="popup-success__wrapper">
        <p class="popup-success__title">Спасибо за обращение в наш банк.</p>
        <p class="popup-success__message">Наш менеджер скоро свяжется с вами
        по указанному номеру телефона.</p>
        <button class="popup-success__close" aria-label="Закрыть попап">
          <svg width="16" height="16">
            <use href="img/sprite_auto.svg#icon-cross"></use>
          </svg>
        </button>
      </div>
    </div>`
    );
  }

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

  const popup = new Popup(
    {
      createPopupTemplate,
      createPopupCalculatorSuccessTemplate
    },
    {
      renderElement,
      deleteChildrenElements
    }
  );

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

  const mortgageCalculatorView = new MortgageCalculatorView(
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

  class MortgagePresenter extends BasicPresenter {
    constructor(model, view) {
      super(model, view);

      this.maternityCapitalCheckboxHandler = this.maternityCapitalCheckboxHandler.bind(this);
    }

    initSpecials() {
      this.view.renderCalculatorSpecials(this.maternityCapitalCheckboxHandler);
    }

    maternityCapitalCheckboxHandler(node) {
      if (node.checked) {
        this.calculator.maternityCapital = true;
      } else {
        this.calculator.maternityCapital = false;
      }

      this.calculator.calculateCreditPersentage();
      this.calculator.calculateTotalCreditSumm();
      this.calculator.calculateAnnuityPayment();
      this.calculator.calculateMinimumIncome();

      if (this.calculator.totalCreditSumm < this.calculator.minimumTotalCreditSumm) {
        this.view.renderCalculatorUserMessage(this.calculator.minimumTotalCreditSumm);
      } else {
        this.view.renderCalculatorResults(
          this.calculator.totalCreditSumm,
          this.calculator.creditPersentage,
          this.calculator.annuityPayment,
          this.calculator.minimumIncome,
          this.creditResultsButtonHandler
        );
      }
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
          <dt class="results__value">${creditSumm.toLocaleString('ru-RU')} рублей </dt>
          <dd class="results__description">Сумма автокредита</dd>
        </div>
        <div class="results__wrapper results__wrapper--fix">
          <dt class="results__value">${creditPersentage.toFixed(2).replace('.', ',')}%</dt>
          <dd class="results__description">Процентная ставка</dd>
        </div>
        <div class="results__wrapper">
          <dt class="results__value">${annuityPayment.toLocaleString('ru-RU')} рублей</dt>
          <dd class="results__description">Ежемесячный платеж</dd>
        </div>
        <div class="results__wrapper results__wrapper--fix">
          <dt class="results__value">${minimumIncome.toLocaleString('ru-RU')} рублей</dt>
          <dd class="results__description">Необходимый доход</dd>
        </div>
      </dl>
      <button class="results__apply button"><span>Оформить заявку</span></button>
    </div>`
    );
  }

  function createAutoCalculatorCreditSummTemplate(minimumCreditSumm, maximumCreditSumm, creditSumm) {
    return (
      `<div class="calculator__wrapper-inner" id="stepTwoWrapper">
      <h3 class="calculator__title calculator__title--step-two">Шаг 2. Введите параметры кредита</h3>
      <div class="calculator__section">
        <h4 class="calculator__title-inner">Стоимость автомобиля</h4>
        <div class="calculator__section-inner" id="section-summ">
          <div class="calculator__field-wrapper">
            <input class="calculator__field" id="creditSumm" type="number" value="${creditSumm}" min="${minimumCreditSumm}" max="${maximumCreditSumm}">
            <span class="calculator__field-mask">${creditSumm.toLocaleString(`ru-RU`)} рублей</span>
          </div>
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
        </div>
        <p class="calculator__legend">От ${minimumCreditSumm.toLocaleString('ru-RU')}  до ${maximumCreditSumm.toLocaleString('ru-RU')} рублей</p>
      </div>
    </div>`
    );
  }

  function createAutoCalculatorDownPaymentTemplate(minimumDownPaymentPersentage) {
    return (
      `<div class="calculator__section" id="downPaymentSection">
      <h4 class="calculator__title-inner">Первоначальный взнос</h4>
      <p class="calculator__section-inner">
        <input class="calculator__range range" id="downPaymentRange" type="range" min="${minimumDownPaymentPersentage}" max="100" step="5" value="${minimumDownPaymentPersentage}">
      </p>
      <p class="calculator__legend">${minimumDownPaymentPersentage}%</p>
    </div>`
    );
  }

  function createAutoCalculatorPaymentValueTemplate(minimumDownPayment, downPayment) {
    return (
      `<div class="calculator__field-wrapper">
      <input class="calculator__field" id="downPayment" type="number" value="${downPayment}" min="${minimumDownPayment}">
      <span class="calculator__field-mask">${downPayment.toLocaleString(`ru-RU`)} рублей</span>
    </div>`
    );
  }

  function createAutoCalculatorSpecialsTemplate() {
    return (
      `<div class="calculator__section" id="specials">
      <h4 class="calculator__title-inner visually-hidden">Специальные условия</h4>
      <ul class="calculator__specials-list">
        <li class="calculator__specials-item">
          <input class="calculator__checkbox" id="autoInsurance" type="checkbox" name="autoInsurance">
          <label class="calculator__label" for="autoInsurance" tabindex="0">Оформить КАСКО в нашем банке</label>
        </li>
        <li class="calculator__specials-item">
          <input class="calculator__checkbox" id="lifeInsurance" type="checkbox" name="lifeInsurance">
          <label class="calculator__label" for="lifeInsurance" tabindex="0">Оформить Страхование жизни в нашем банке</label>
        </li>
      </ul>
    </div>`
    );
  }

  function createAutoCalculatorUserMessageTemplate(minimumTotalCreditSumm) {
    return (
      `<div class="calculator__results user-message">
      <p class="user-message__message">Наш банк не выдаёт автокредиты меньше ${minimumTotalCreditSumm.toLocaleString('ru-RU')} рублей.</p>
      <p class="user-message__proposal">Попробуйте использовать другие параметры для расчёта.</p>
    </div>`
    );
  }

  function createAutoCalculatorOrderTemplate(creditSumm, downPayment, creditPeriod) {
    let years = `лет`;

    if (creditPeriod === 1) {
      years = `год`;
    }

    if (creditPeriod >= 2 && creditPeriod <= 4) {
      years = `года`;
    }

    return (
      `<div class="calculator__form form">
      <h3 class="form__title">Шаг 3. Оформление заявки</h3>
      <form id="calculatorForm" action="https://echo.htmlacademy.ru" method="POST">
        <p class="form__item form__item--readonly">
          <label for="orderNumber">Номер заявки</label>
          <input id="orderNumber" name="orderNumber" type="text" value="№ 0010" tabindex="-1" readonly>
        </p>
        <p class="form__item form__item--readonly">
          <label for="creditPropose">Цель кредита</label>
          <input id="creditPropose" name="creditPropose" type="text" value="Автокредит" tabindex="-1" readonly>
        </p>
        <p class="form__item form__item--readonly">
          <label for="creditSumm">Стоимость автомобиля</label>
          <input id="creditSumm" name="creditSumm" type="text" value="${creditSumm.toLocaleString(`ru-RU`)} рублей" tabindex="-1" readonly>
        </p>
        <p class="form__item form__item--readonly">
          <label for="downPayment">Первоначальный взнос</label>
          <input id="downPayment" name="downPayment" type="text" value="${downPayment.toLocaleString(`ru-RU`)} рублей" tabindex="-1" readonly>
        </p>
        <p class="form__item form__item--readonly">
          <label for="creditPeriod">Срок кредитования</label>
          <input id="creditPeriod" name="creditPeriod" type="text" value="${creditPeriod} ${years}" tabindex="-1" readonly>
        </p>
        <p class="form__item">
          <label class="visually-hidden" for="userName">Введите ваши ФИО</label>
          <input id="userName" name="userName" type="text" placeholder="ФИО" required autofocus>
        </p>
        <div class="form__wrapper-inner">
          <p class="form__item">
            <label class="visually-hidden" for="userPhone">Введите ваш номер телефона</label>
            <input id="userPhone" name="userPhone" type="number" placeholder="Телефон" required>
          </p>
          <p class="form__item">
            <label class="visually-hidden" for="userEmail">Введите вашу почту</label>
            <input id="userEmail" name="userEmail" type="email" placeholder="E-mail" required>
          </p>
        </div>
        <button class="button form__button" type="submit">
          <span>Отправить</span>
        </button>
      </form>
    </div>`
    );
  }

  class AutoCalculatorView {
    constructor(markups, utils, basicPopup) {
      this.createAutoCalculatorResultsTemplate = markups.createAutoCalculatorResultsTemplate;
      this.createAutoCalculatorCreditSummTemplate = markups.createAutoCalculatorCreditSummTemplate;
      this.createAutoCalculatorDownPaymentTemplate = markups.createAutoCalculatorDownPaymentTemplate;
      this.createAutoCalculatorPaymentValueTemplate = markups.createAutoCalculatorPaymentValueTemplate;
      this.createCalculatorPeriodTemplate = markups.createCalculatorPeriodTemplate;
      this.createCalculatorPeriodValueTemplate = markups.createCalculatorPeriodValueTemplate;
      this.createAutoCalculatorSpecialsTemplate = markups.createAutoCalculatorSpecialsTemplate;
      this.createAutoCalculatorUserMessageTemplate = markups.createAutoCalculatorUserMessageTemplate;
      this.createAutoCalculatorOrderTemplate = markups.createAutoCalculatorOrderTemplate;
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

      this.renderElement(calculatorContainer, this.createAutoCalculatorResultsTemplate(totalCreditSumm, creditPersentage, annuityPayment, minimumIncome));

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

      this.renderElement(calculatorWrapper, this.createAutoCalculatorCreditSummTemplate(minimumCreditSumm, maximumCreditSumm, creditSumm));

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

    renderCalculatorDownPayment(minimumDownPaymentPersentage, minimumDownPayment, downPayment, inputHandler, rangeHandler) {
      const stepTwoWrapper = document.querySelector(`#stepTwoWrapper`);
      const downPaymentSection = stepTwoWrapper.querySelector(`#downPaymentSection`);

      if (downPaymentSection) {
        stepTwoWrapper.removeChild(downPaymentSection);
      }

      this.renderElement(stepTwoWrapper, this.createAutoCalculatorDownPaymentTemplate(minimumDownPaymentPersentage));

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

      this.renderElement(downPaymentSectionInner, this.createAutoCalculatorPaymentValueTemplate(minimumDownPayment, downPayment), `afterbegin`);

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

    renderCalculatorSpecials(autoInsuranceCheckboxHandler, lifeInsuranceCheckboxHandler) {
      const stepTwoWrapper = document.querySelector(`#stepTwoWrapper`);
      const specials = stepTwoWrapper.querySelector(`#specials`);

      if (specials) {
        stepTwoWrapper.removeChild(specials);
      }

      this.renderElement(stepTwoWrapper, this.createAutoCalculatorSpecialsTemplate());

      const autoInsuranceCheckbox = stepTwoWrapper.querySelector(`#autoInsurance`);

      autoInsuranceCheckbox.addEventListener(`change`, (evt) => {
        autoInsuranceCheckboxHandler(evt.currentTarget);
      });

      const lifeInsuranceCheckbox = stepTwoWrapper.querySelector(`#lifeInsurance`);

      lifeInsuranceCheckbox.addEventListener(`change`, (evt) => {
        lifeInsuranceCheckboxHandler(evt.currentTarget);
      });
    }

    renderCalculatorUserMessage(minimumTotalCreditSumm) {
      const calculatorContainer = document.querySelector(`.calculator__container`);
      const calculatorResults = calculatorContainer.querySelector(`.calculator__results`);

      if (calculatorResults) {
        calculatorContainer.removeChild(calculatorResults);
      }

      this.renderElement(calculatorContainer, this.createAutoCalculatorUserMessageTemplate(minimumTotalCreditSumm));
    }

    renderCalculatorOrder(creditSumm, downPayment, creditPeriod, handler) {
      this.removeCalculatorOrder();

      const calculator = document.querySelector(`.calculator`);

      this.renderElement(calculator, this.createAutoCalculatorOrderTemplate(creditSumm, downPayment, creditPeriod));

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

  const autoCalculatorView = new AutoCalculatorView(
    {
      createAutoCalculatorResultsTemplate,
      createAutoCalculatorCreditSummTemplate,
      createAutoCalculatorDownPaymentTemplate,
      createAutoCalculatorPaymentValueTemplate,
      createCalculatorPeriodTemplate,
      createCalculatorPeriodValueTemplate,
      createAutoCalculatorSpecialsTemplate,
      createAutoCalculatorUserMessageTemplate,
      createAutoCalculatorOrderTemplate
    },
    {
      renderElement,
      deleteChildrenElements
    },
    popup
  );

  class AutoPresenter extends BasicPresenter {
    constructor(model, view) {
      super(model, view);

      this.autoInsuranceCheckboxHandler = this.autoInsuranceCheckboxHandler.bind(this);
      this.lifeInsuranceCheckboxHandler = this.lifeInsuranceCheckboxHandler.bind(this);
    }

    initSpecials() {
      this.view.renderCalculatorSpecials(this.autoInsuranceCheckboxHandler, this.lifeInsuranceCheckboxHandler);
    }

    autoInsuranceCheckboxHandler(node) {
      if (node.checked) {
        this.calculator.autoInsurance = true;
      } else {
        this.calculator.autoInsurance = false;
      }

      this.calculator.calculateCreditPersentage();
      this.calculator.calculateTotalCreditSumm();
      this.calculator.calculateAnnuityPayment();
      this.calculator.calculateMinimumIncome();

      this.view.renderCalculatorResults(
        this.calculator.totalCreditSumm,
        this.calculator.creditPersentage,
        this.calculator.annuityPayment,
        this.calculator.minimumIncome,
        this.creditResultsButtonHandler
      );
    }

    lifeInsuranceCheckboxHandler(node) {
      if (node.checked) {
        this.calculator.lifeInsurance = true;
      } else {
        this.calculator.lifeInsurance = false;
      }

      this.calculator.calculateCreditPersentage();
      this.calculator.calculateTotalCreditSumm();
      this.calculator.calculateAnnuityPayment();
      this.calculator.calculateMinimumIncome();

      this.view.renderCalculatorResults(
        this.calculator.totalCreditSumm,
        this.calculator.creditPersentage,
        this.calculator.annuityPayment,
        this.calculator.minimumIncome,
        this.creditResultsButtonHandler
      );
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
          <dt class="results__value">${creditSumm.toLocaleString('ru-RU')} рублей </dt>
          <dd class="results__description">Сумма кредита</dd>
        </div>
        <div class="results__wrapper results__wrapper--fix">
          <dt class="results__value">${creditPersentage.toFixed(2).replace('.', ',')}%</dt>
          <dd class="results__description">Процентная ставка</dd>
        </div>
        <div class="results__wrapper">
          <dt class="results__value">${annuityPayment.toLocaleString('ru-RU')} рублей</dt>
          <dd class="results__description">Ежемесячный платеж</dd>
        </div>
        <div class="results__wrapper results__wrapper--fix">
          <dt class="results__value">${minimumIncome.toLocaleString('ru-RU')} рублей</dt>
          <dd class="results__description">Необходимый доход</dd>
        </div>
      </dl>
      <button class="results__apply button"><span>Оформить заявку</span></button>
    </div>`
    );
  }

  function createCreditCalculatorCreditSummTemplate(minimumCreditSumm, maximumCreditSumm, creditSumm) {
    return (
      `<div class="calculator__wrapper-inner" id="stepTwoWrapper">
      <h3 class="calculator__title calculator__title--step-two">Шаг 2. Введите параметры кредита</h3>
      <div class="calculator__section">
        <h4 class="calculator__title-inner">Сумма потребительского кредита</h4>
        <div class="calculator__section-inner" id="section-summ">
          <div class="calculator__field-wrapper">
            <input class="calculator__field" id="creditSumm" type="number" value="${creditSumm}" min="${minimumCreditSumm}" max="${maximumCreditSumm}">
            <span class="calculator__field-mask">${creditSumm.toLocaleString(`ru-RU`)} рублей</span>
          </div>
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
        </div>
        <p class="calculator__legend">От ${minimumCreditSumm.toLocaleString('ru-RU')}  до ${maximumCreditSumm.toLocaleString('ru-RU')} рублей</p>
      </div>
    </div>`
    );
  }

  function createCreditCalculatorSpecialsTemplate() {
    return (
      `<div class="calculator__section" id="specials">
      <h4 class="calculator__title-inner visually-hidden">Специальные условия</h4>
      <ul class="calculator__specials-list">
        <li class="calculator__specials-item">
          <input class="calculator__checkbox" id="salaryProject" type="checkbox" name="salaryProject">
          <label class="calculator__label" for="salaryProject" tabindex="0">Участник зарплатного проекта нашего банка</label>
        </li>
      </ul>
    </div>`
    );
  }

  function createCreditCalculatorOrderTemplate(creditSumm, downPayment, creditPeriod) {
    let years = `лет`;

    if (creditPeriod === 1) {
      years = `год`;
    }

    if (creditPeriod >= 2 && creditPeriod <= 4) {
      years = `года`;
    }

    return (
      `<div class="calculator__form form">
      <h3 class="form__title">Шаг 3. Оформление заявки</h3>
      <form id="calculatorForm" action="https://echo.htmlacademy.ru" method="POST">
        <p class="form__item form__item--readonly">
          <label for="orderNumber">Номер заявки</label>
          <input id="orderNumber" name="orderNumber" type="text" value="№ 0010" tabindex="-1" readonly>
        </p>
        <p class="form__item form__item--readonly">
          <label for="creditPropose">Цель кредита</label>
          <input id="creditPropose" name="creditPropose" type="text" value="Потребительский кредит" tabindex="-1" readonly>
        </p>
        <p class="form__item form__item--readonly">
          <label for="creditSumm">Сумма кредита</label>
          <input id="creditSumm" name="creditSumm" type="text" value="${creditSumm.toLocaleString(`ru-RU`)} рублей" tabindex="-1" readonly>
        </p>
        <p class="form__item form__item--readonly">
          <label for="creditPeriod">Срок кредитования</label>
          <input id="creditPeriod" name="creditPeriod" type="text" value="${creditPeriod} ${years}" tabindex="-1" readonly>
        </p>
        <p class="form__item">
          <label class="visually-hidden" for="userName">Введите ваши ФИО</label>
          <input id="userName" name="userName" type="text" placeholder="ФИО" required autofocus>
        </p>
        <div class="form__wrapper-inner">
          <p class="form__item">
            <label class="visually-hidden" for="userPhone">Введите ваш номер телефона</label>
            <input id="userPhone" name="userPhone" type="number" placeholder="Телефон" required>
          </p>
          <p class="form__item">
            <label class="visually-hidden" for="userEmail">Введите вашу почту</label>
            <input id="userEmail" name="userEmail" type="email" placeholder="E-mail" required>
          </p>
        </div>
        <button class="button form__button" type="submit">
          <span>Отправить</span>
        </button>
      </form>
    </div>`
    );
  }

  class CreditCalculatorView {
    constructor(markups, utils, basicPopup) {
      this.createCreditCalculatorResultsTemplate = markups.createCreditCalculatorResultsTemplate;
      this.createCreditCalculatorCreditSummTemplate = markups.createCreditCalculatorCreditSummTemplate;
      this.createCalculatorPeriodTemplate = markups.createCalculatorPeriodTemplate;
      this.createCalculatorPeriodValueTemplate = markups.createCalculatorPeriodValueTemplate;
      this.createCreditCalculatorSpecialsTemplate = markups.createCreditCalculatorSpecialsTemplate;
      this.createCreditCalculatorOrderTemplate = markups.createCreditCalculatorOrderTemplate;
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

      this.renderElement(stepTwoWrapper, this.createCreditCalculatorSpecialsTemplate());

      const salaryProjectCheckbox = stepTwoWrapper.querySelector(`#salaryProject`);

      salaryProjectCheckbox.addEventListener(`change`, (evt) => {
        handler(evt.currentTarget);
      });
    }

    renderCalculatorOrder(creditSumm, downPayment, creditPeriod, handler) {
      this.removeCalculatorOrder();

      const calculator = document.querySelector(`.calculator`);

      this.renderElement(calculator, this.createCreditCalculatorOrderTemplate(creditSumm, downPayment, creditPeriod));

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

  const creditCalculatorView = new CreditCalculatorView(
    {
      createCreditCalculatorResultsTemplate,
      createCreditCalculatorCreditSummTemplate,
      createCalculatorPeriodTemplate,
      createCalculatorPeriodValueTemplate,
      createCreditCalculatorSpecialsTemplate,
      createCreditCalculatorOrderTemplate
    },
    {
      renderElement,
      deleteChildrenElements
    },
    popup
  );

  class CreditPresenter extends BasicPresenter {
    constructor(model, view) {
      super(model, view);

      this.salaryProjectCheckboxHandler = this.salaryProjectCheckboxHandler.bind(this);
    }

    initSpecials() {
      this.view.renderCalculatorSpecials(this.salaryProjectCheckboxHandler);
    }

    salaryProjectCheckboxHandler(node) {
      if (node.checked) {
        this.calculator.salaryProject = true;
      } else {
        this.calculator.salaryProject = false;
      }

      this.calculator.calculateCreditPersentage();
      this.calculator.calculateTotalCreditSumm();
      this.calculator.calculateAnnuityPayment();
      this.calculator.calculateMinimumIncome();

      this.view.renderCalculatorResults(
        this.calculator.totalCreditSumm,
        this.calculator.creditPersentage,
        this.calculator.annuityPayment,
        this.calculator.minimumIncome,
        this.creditResultsButtonHandler
      );
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
          this.mortgagePresenter.initSpecials();
          break;
        case `auto`:
          this.autoPresenter.init(id);
          this.autoPresenter.initSpecials();
          break;
        case `credit`:
          this.creditPresenter.init(id);
          this.creditPresenter.initSpecials();
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
