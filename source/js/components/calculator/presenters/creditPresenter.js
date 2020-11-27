import { BasicPresenter } from './basicPresenter';
import { creditCalculator } from '../models/creditCalculator';
import { calculatorBasicView } from '../views/calculatorBasicView';

class CreditPresenter extends BasicPresenter {
  constructor(model, basicView) {
    super(model, basicView);
  }
}

export const creditPresenter = new CreditPresenter(creditCalculator, calculatorBasicView);
