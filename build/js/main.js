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
      this.addNavigationButtonClickListeners();

      this.addSwipeListener();

      if (!this.currentConfig.navigation) {
        this.disableNavigationButtons();
      }

      if (this.currentConfig.slideShow) {
        this.activateSlideShow();
      }

      if (!this.currentConfig.swipe) {
        this.disableSwipe();
      }

      window.addEventListener(`resize`, () => {
        this.slideWidth = this.setSlideWidth();

        this.setSliderTransition(this.currentSlide);

        this.currentConfig = this.findSuitableCfg();

        this.enableNavigationButtons();

        this.enableSwipe();

        if (!this.currentConfig.navigation) {
          this.disableNavigationButtons();
        }

        if (!this.currentConfig.swipe) {
          this.disableSwipe();
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

    setActiveClass(nameSpace) {
      let currentActive = this.sliderContainer.querySelector(`.slider-item--active`);
      currentActive.classList.remove(`slider-item--active`);

      this.sliderItems[this.currentSlide].classList.add(`slider-item--active`);

      let currentDot = this.sliderNavigation.querySelector(`.${nameSpace}__nav-btn--active`);
      currentDot.classList.remove(`${nameSpace}__nav-btn--active`);

      this.sliderNavigationButtons[this.currentSlide].classList.add(`${nameSpace}__nav-btn--active`);
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

    disableSwipe() {
      this.sliderContainer.style.pointerEvents = `none`;
    }

    enableSwipe() {
      this.sliderContainer.style.pointerEvents = `auto`;
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
    }
  };

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

    calculateAnnuityPayment() {
      const creditPeriodInMonth = this.creditPeriod * 12;
      const monthlyCreditPersentage = this.creditPersentage / 100 / 12;

      this.annuityPayment = Math.floor(this.totalCreditSumm * (monthlyCreditPersentage + (monthlyCreditPersentage / (Math.pow((1 + monthlyCreditPersentage), creditPeriodInMonth) - 1))));
    }

    calculateMinimumIncome() {
      this.minimumIncome = Math.floor((this.annuityPayment / this.minimumIncomeRatio));
    }
  }

  class MortgageCalculator extends Calculator {
    constructor(data) {
      super(data);

      this.maternityCapital = false;

      this.minimumDownPaymentPersentage = null;
      this.minimumDownPayment = null;
      this.downPaymentPersentage = null;
      this.downPayment = null;
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

    calculateCreditPersentage() {
      this.creditPersentage = (this.downPaymentPersentage < this.currentData.basicPersent) ? this.currentData.creditPersentage.basic : this.currentData.creditPersentage.special;
    }

    calculateTotalCreditSumm() {
      if (this.currentData.maternityCapital) {
        this.totalCreditSumm = this.creditSumm - this.downPayment - this.currentData.maternityCapital;
      } else {
        this.totalCreditSumm = this.creditSumm - this.downPayment;
      }
    }
  }

  const mortgageCalculator = new MortgageCalculator(creditProgramsData);

  menu.init();
  promoSlider.init();
  productsSlider.init();

  mortgageCalculator.setCurrentData(`mortgage`);
  mortgageCalculator.setCreditSumm(mortgageCalculator.currentData.creditSumm.min);
  mortgageCalculator.setMinimumCreditSumm();
  mortgageCalculator.setMaximumCreditSumm();
  mortgageCalculator.setMinimumCreditPeriod();
  mortgageCalculator.setMaximumCreditPeriod();
  mortgageCalculator.setMinimumDownPaymentPersentage();
  mortgageCalculator.setMinimumDownPayment();
  mortgageCalculator.setCreditPeriod(mortgageCalculator.minimumCreditPeriod);
  mortgageCalculator.setMinimumDownPaymentPersentage();
  mortgageCalculator.calculateDownPayment(16);
  mortgageCalculator.calculateDownPaymentPersentage();
  mortgageCalculator.calculateCreditPersentage();
  mortgageCalculator.calculateTotalCreditSumm();
  mortgageCalculator.calculateAnnuityPayment();
  mortgageCalculator.calculateMinimumIncome();
  console.dir(mortgageCalculator);

}());

//# sourceMappingURL=main.js.map
