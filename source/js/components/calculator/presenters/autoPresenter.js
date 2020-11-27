import { BasicPresenter } from './basicPresenter';
import { autoCalculator } from '../models/autoCalculator';
import { calculatorBasicView } from '../views/calculatorBasicView';

class AutoPresenter extends BasicPresenter {
  constructor(model, basicView) {
    super(model, basicView);
  }
}

export const autoPresenter = new AutoPresenter(autoCalculator, calculatorBasicView);
