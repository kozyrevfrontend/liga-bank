import { BasicPresenter } from './basicPresenter';
import { mortgageCalculator } from '../models/mortgageCalculator';
import { calculatorBasicView } from '../views/calculatorBasicView';

class MortgagePresenter extends BasicPresenter {
  constructor(model, basicView) {
    super(model, basicView);
  }
}

export const mortgagePresenter = new MortgagePresenter(mortgageCalculator, calculatorBasicView);
