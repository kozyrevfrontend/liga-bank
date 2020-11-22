class Slider {
  constructor(domNode, config) {
    this.config = config;
    this.sliderContainer = domNode.querySelector(`.slider-container`);
    this.sliderNavigation = domNode.querySelector(`.slider-navigation`);
    this.sliderItems = this.sliderContainer.querySelectorAll(`.slider-item`);
    this.sliderDots = this.sliderNavigation.querySelectorAll(`.slider-dot`);

    this.slideCount = this.sliderItems.length;
    this.slideWidth = window.innerWidth;
    this.currentSlide = 0;

    this.changeSlide = this.changeSlide.bind(this);
  }

  init() {
    if (this.config.navigation) {
      for (let i = 0; i < this.sliderDots.length; i++) {
        this.dotHandler(this.sliderDots[i], i);
      }
    }

    window.addEventListener(`resize`, () => {
      this.slideWidth = window.innerWidth;
      this.sliderContainer.style.transform = `translateX(-` + this.slideWidth * this.currentSlide + `px)`;
    });

    window.setInterval(this.changeSlide, 4000);

    this.swipe(this.sliderContainer);

    this.sliderContainer.addEventListener('swipe', (evt) => {
      if (evt.detail.direction === 'left') {
        this.moveRight();
      } else if (evt.detail.direction === 'right') {
        this.moveLeft();
      }
    });
  }

  goToSlide(slideNumber) {
    this.sliderContainer.style.transform = `translateX(-` + this.slideWidth * slideNumber + `px)`;

    this.currentSlide = slideNumber;

    this.setActiveClass();
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


  changeSlide() {
    if (this.currentSlide >= this.slideCount - 1) {
      this.goToSlide(0);

      this.currentSlide = 0;

      return;
    }

    this.currentSlide++;

    this.goToSlide(this.currentSlide);
  }

  setActiveClass() {
    let currentActive = this.sliderContainer.querySelector(`.slider-item--active`);
    currentActive.classList.remove(`slider-item--active`);

    this.sliderItems[this.currentSlide].classList.add(`slider-item--active`);

    let currentDot = this.sliderNavigation.querySelector(`.dot--promo-active`);
    currentDot.classList.remove(`dot--promo-active`);

    this.sliderDots[this.currentSlide].classList.add(`dot--promo-active`);
  }

  dotHandler(node, int) {
    node.addEventListener(`click`, () => {
      this.goToSlide(int);
    });
  }
}

export const promoSlider = new Slider(document.querySelector(`.promo`), {navigation: true});
