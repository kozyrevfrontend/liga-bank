import { BasicPresenter } from './basicPresenter';
import { creditCalculator } from '../models/creditCalculator';
import { creditCalculatorView } from '../views/creditCalculatorView';

class CreditPresenter extends BasicPresenter {
  constructor(model, view) {
    super(model, view);
  }
}

export const creditPresenter = new CreditPresenter(creditCalculator, creditCalculatorView);
