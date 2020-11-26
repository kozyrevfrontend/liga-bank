import { menu } from './components/menu';
import { promoSlider } from './components/slider';
import { productsSlider } from './components/slider';
import { mortgageCalculator } from './components/calculator';

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

