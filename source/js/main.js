import { menu } from './components/menu';
import { promoSlider } from './components/slider';
import { productsSlider } from './components/slider';
import { mortgageCalculator } from './components/calculator/models/calculator';
import { autoCalculator } from './components/calculator/models/calculator';
import { creditCalculator } from './components/calculator/models/calculator';

menu.init();
promoSlider.init();
productsSlider.init();

const initCalculator = (id) => {
  switch (id) {
    case `mortgage`:
      mortgageCalculator.init(id);
      console.dir(mortgageCalculator);
      break;
    case `auto`:
      autoCalculator.init(id);
      console.dir(autoCalculator);
      break;
    case `credit`:
      creditCalculator.init(id);
      console.dir(creditCalculator);
      break;
  }
};

// mortgageCalculator.init(`mortgage`);
// console.dir(mortgageCalculator);

// autoCalculator.init(`auto`);
// console.dir(autoCalculator);

// creditCalculator.init(`credit`);
// console.dir(creditCalculator);

const creditPurposeField = document.querySelector(`#creditPurpose`);
const creditPurposeFieldValue = creditPurposeField.querySelector(`span`);
const creditOptionsList = document.querySelector(`.calculator__options-list`);
const creditOptionsItems = creditOptionsList.querySelectorAll(`.calculator__options-item button`);

creditPurposeField.addEventListener(`click`, () => {
  creditOptionsList.classList.toggle(`calculator__options-list--expanded`);
  creditPurposeField.classList.toggle(`calculator__field--expanded`);
});

const creditOptionsItemsClickHandler = (item) => {
  item.addEventListener(`click`, (evt) => {
    creditPurposeFieldValue.textContent = evt.currentTarget.innerText;
    creditOptionsList.classList.toggle(`calculator__options-list--expanded`);
    creditPurposeField.classList.toggle(`calculator__field--expanded`);
    initCalculator(evt.currentTarget.id);
  });
};

creditOptionsItems.forEach((item) => {
  creditOptionsItemsClickHandler(item);
});
