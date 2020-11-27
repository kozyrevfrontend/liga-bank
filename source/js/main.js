import { menu } from './components/menu';
import { promoSlider } from './components/slider';
import { productsSlider } from './components/slider';
import { startingPresenter } from './components/calculator/presenters/sartingPresenter';

menu.init();
promoSlider.init();
productsSlider.init();
startingPresenter.init();

// const initCalculator = (id) => {
//   switch (id) {
//     case `mortgage`:
//       mortgageCalculator.init(id);
//       console.dir(mortgageCalculator);
//       break;
//     case `auto`:
//       autoCalculator.init(id);
//       console.dir(autoCalculator);
//       break;
//     case `credit`:
//       creditCalculator.init(id);
//       console.dir(creditCalculator);
//       break;
//   }
// };

// const creditPurposeField = document.querySelector(`#creditPurpose`);
// const creditPurposeFieldValue = creditPurposeField.querySelector(`span`);
// const creditOptionsList = document.querySelector(`.calculator__options-list`);
// const creditOptionsItems = creditOptionsList.querySelectorAll(`.calculator__options-item button`);

// creditPurposeField.addEventListener(`click`, () => {
//   creditOptionsList.classList.toggle(`calculator__options-list--expanded`);
//   creditPurposeField.classList.toggle(`calculator__field--expanded`);
// });

// const creditOptionsItemsClickHandler = (item) => {
//   item.addEventListener(`click`, (evt) => {
//     creditPurposeFieldValue.textContent = evt.currentTarget.innerText;
//     creditOptionsList.classList.toggle(`calculator__options-list--expanded`);
//     creditPurposeField.classList.toggle(`calculator__field--expanded`);
//     initCalculator(evt.currentTarget.id);
//   });
// };

// creditOptionsItems.forEach((item) => {
//   creditOptionsItemsClickHandler(item);
// });
