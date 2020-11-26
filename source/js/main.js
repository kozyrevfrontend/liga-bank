import { menu } from './components/menu';
import { promoSlider } from './components/slider';
import { productsSlider } from './components/slider';
import { mortgageCalculator } from './components/calculator';
import { autoCalculator } from './components/calculator';
import { creditCalculator } from './components/calculator';

menu.init();
promoSlider.init();
productsSlider.init();

mortgageCalculator.init(`mortgage`);

console.dir(mortgageCalculator);

autoCalculator.init(`auto`);

console.dir(autoCalculator);

creditCalculator.init(`credit`);

console.dir(creditCalculator);
