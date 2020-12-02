import { basicCalculatorView } from '../views/basicCalculatorView';
import { mortgagePresenter } from './mortgagePresenter';
import { autoPresenter } from './autoPresenter';
import { creditPresenter } from './creditPresenter';

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
    switch (id) {
      case `mortgage`:
        this.mortgagePresenter.init(id);
        this.mortgagePresenter.initSpecials();
        break;
      case `auto`:
        this.autoPresenter.init(id);
        this.autoPresenter.initSpecials();
        break;
      case `credit`:
        this.creditPresenter.init(id);
        this.creditPresenter.initSpecials();
        break;
    }
  }
}

export const startingPresenter = new StaringPresenter(
  {
    mortgagePresenter,
    autoPresenter,
    creditPresenter
  },
  basicCalculatorView
);
