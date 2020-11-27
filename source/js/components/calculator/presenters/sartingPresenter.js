import { mortgagePresenter } from './mortgagePresenter';
import { autoPresenter } from './autoPresenter';
import { creditPresenter } from './creditPresenter';
import { calculatorBasicView } from '../views/calculatorBasicView';

class StaringPresenter {
  constructor(presenters, basicView) {
    this.mortgagePresenter = presenters.mortgagePresenter;
    this.autoPresenter = presenters.autoPresenter;
    this.creditPresenter = presenters.creditPresenter;
    this.basicView = basicView;

    this.creditOptionsClickHandler = this.creditOptionsClickHandler.bind(this);
  }

  init() {
    this.basicView.addCreditPurposeClickListener();
    this.basicView.addCreditOptionsClickListeners(this.creditOptionsClickHandler);
  }

  creditOptionsClickHandler(id) {
    let model = null;

    switch (id) {
      case `mortgage`:
        model = this.mortgagePresenter.calculator;
        model.init(id);
        console.dir(model);
        break;
      case `auto`:
        model = this.autoPresenter.calculator;
        model.init(id);
        console.dir(model);
        break;
      case `credit`:
        model = this.creditPresenter.calculator;
        model.init(id);
        console.dir(model);
        break;
    }

    this.basicView.renderCalculatorResults(
      model.totalCreditSumm.toLocaleString('ru-RU'),
      model.creditPersentage.toFixed(2).toLocaleString('ru-RU'),
      model.annuityPayment.toLocaleString('ru-RU'),
      model.minimumIncome.toLocaleString('ru-RU'));
  }
}

export const startingPresenter = new StaringPresenter(
  {
    mortgagePresenter,
    autoPresenter,
    creditPresenter
  },
  calculatorBasicView
);
