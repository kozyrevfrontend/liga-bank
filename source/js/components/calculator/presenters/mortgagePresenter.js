import { BasicPresenter } from './basicPresenter';
import { mortgageCalculator } from '../models/mortgageCalculator';
import { mortgageCalculatorView } from '../views/mortgageCalculatorView';

class MortgagePresenter extends BasicPresenter {
  constructor(model, view) {
    super(model, view);
  }
}

export const mortgagePresenter = new MortgagePresenter(mortgageCalculator, mortgageCalculatorView);
