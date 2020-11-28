import { BasicPresenter } from './basicPresenter';
import { autoCalculator } from '../models/autoCalculator';
import { autoCalculatorView } from '../views/autoCalculatorView';

class AutoPresenter extends BasicPresenter {
  constructor(model, view) {
    super(model, view);
  }
}

export const autoPresenter = new AutoPresenter(autoCalculator, autoCalculatorView);
