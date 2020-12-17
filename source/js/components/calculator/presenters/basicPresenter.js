export class BasicPresenter {
  constructor(model, view) {
    this.calculator = model;
    this.view = view;

    this.creditResultsButtonHandler = this.creditResultsButtonHandler.bind(this);
    this.creditSummInputHandler = this.creditSummInputHandler.bind(this);
    this.downPaymentInputHandler = this.downPaymentInputHandler.bind(this);
    this.downPaymentRangeHandler = this.downPaymentRangeHandler.bind(this);
    this.periodInputHandler = this.periodInputHandler.bind(this);
    this.periodRangeHandler = this.periodRangeHandler.bind(this);
    this.orderFormSubmitHandler = this.orderFormSubmitHandler.bind(this);
  }

  init(id) {
    this.calculator.init(id);

    this.view.removeCalculatorOrder();

    this.view.renderCalculatorResults(
      this.calculator.totalCreditSumm,
      this.calculator.creditPersentage,
      this.calculator.annuityPayment,
      this.calculator.minimumIncome,
      this.creditResultsButtonHandler
    );

    this.view.renderCalculatorCreditSumm(
      this.calculator.minimumCreditSumm,
      this.calculator.maximumCreditSumm,
      this.calculator.creditSumm,
      this.creditSummInputHandler
    );

    if (this.calculator.minimumDownPaymentPersentage) {
      this.view.renderCalculatorDownPayment(
        this.calculator.minimumDownPaymentPersentage,
        this.calculator.minimumDownPayment,
        this.calculator.downPayment,
        this.downPaymentInputHandler,
        this.downPaymentRangeHandler
      );
    }

    this.view.renderCalculatorPeriod(
      this.calculator.minimumCreditPeriod,
      this.calculator.maximumCreditPeriod,
      this.calculator.creditPeriod,
      this.periodInputHandler,
      this.periodRangeHandler
    );
  }

  creditResultsButtonHandler() {
    this.view.renderCalculatorOrder(
      this.calculator.creditSumm,
      this.calculator.downPayment,
      this.calculator.creditPeriod,
      parseInt(localStorage.orders, 10) + 1,
      this.orderFormSubmitHandler
    );
  }

  creditSummInputHandler(value) {
    this.calculator.setCreditSumm(value);

    if (this.calculator.minimumDownPaymentPersentage) {
      this.calculator.setMinimumDownPayment();
      this.calculator.calculateDownPayment(this.calculator.downPaymentPersentage);
      this.calculator.calculateDownPaymentPersentage();

      this.view.renderCalculatorPaymentValue(
        this.calculator.minimumDownPayment,
        this.calculator.downPayment,
        this.downPaymentInputHandler
      );
    }

    this.calculator.calculateCreditPersentage();
    this.calculator.calculateTotalCreditSumm();
    this.calculator.calculateAnnuityPayment();
    this.calculator.calculateMinimumIncome();

    this.view.renderCalculatorResults(
      this.calculator.totalCreditSumm,
      this.calculator.creditPersentage,
      this.calculator.annuityPayment,
      this.calculator.minimumIncome,
      this.creditResultsButtonHandler
    );
  }

  downPaymentInputHandler(value) {
    this.calculator.downPayment = value;
    this.calculator.calculateDownPaymentPersentage();

    this.view.renderCalculatorPaymentLegend(this.calculator.downPaymentPersentage);

    this.calculator.calculateCreditPersentage();
    this.calculator.calculateTotalCreditSumm();
    this.calculator.calculateAnnuityPayment();
    this.calculator.calculateMinimumIncome();

    if (this.calculator.minimumTotalCreditSumm) {
      if (this.calculator.totalCreditSumm < this.calculator.minimumTotalCreditSumm) {
        this.view.renderCalculatorUserMessage(this.calculator.minimumTotalCreditSumm);
      } else {
        this.view.renderCalculatorResults(
          this.calculator.totalCreditSumm,
          this.calculator.creditPersentage,
          this.calculator.annuityPayment,
          this.calculator.minimumIncome,
          this.creditResultsButtonHandler
        );
      }
    }
  }

  downPaymentRangeHandler(value) {
    this.calculator.downPaymentPersentage = value;
    this.calculator.calculateDownPayment(value);

    this.view.renderCalculatorPaymentValue(this.calculator.minimumDownPayment, this.calculator.downPayment, this.downPaymentInputHandler);

    this.view.renderCalculatorPaymentLegend(this.calculator.downPaymentPersentage);

    this.calculator.calculateCreditPersentage();
    this.calculator.calculateTotalCreditSumm();
    this.calculator.calculateAnnuityPayment();
    this.calculator.calculateMinimumIncome();

    if (this.calculator.minimumTotalCreditSumm) {
      if (this.calculator.totalCreditSumm < this.calculator.minimumTotalCreditSumm) {
        this.view.renderCalculatorUserMessage(this.calculator.minimumTotalCreditSumm);
      } else {
        this.view.renderCalculatorResults(
          this.calculator.totalCreditSumm,
          this.calculator.creditPersentage,
          this.calculator.annuityPayment,
          this.calculator.minimumIncome,
          this.creditResultsButtonHandler
        );
      }
    }
  }

  periodInputHandler(value) {
    this.calculator.creditPeriod = value;

    this.calculator.calculateCreditPersentage();
    this.calculator.calculateTotalCreditSumm();
    this.calculator.calculateAnnuityPayment();
    this.calculator.calculateMinimumIncome();

    this.view.renderCalculatorResults(
      this.calculator.totalCreditSumm,
      this.calculator.creditPersentage,
      this.calculator.annuityPayment,
      this.calculator.minimumIncome,
      this.creditResultsButtonHandler
    );
  }

  periodRangeHandler(value) {
    this.calculator.creditPeriod = value;

    this.view.renderCalculatorPeriodValue(this.calculator.minimumCreditPeriod, this.calculator.maximumCreditPeriod, this.calculator.creditPeriod, this.downPaymentInputHandler);

    this.calculator.calculateCreditPersentage();
    this.calculator.calculateTotalCreditSumm();
    this.calculator.calculateAnnuityPayment();
    this.calculator.calculateMinimumIncome();

    this.view.renderCalculatorResults(
      this.calculator.totalCreditSumm,
      this.calculator.creditPersentage,
      this.calculator.annuityPayment,
      this.calculator.minimumIncome,
      this.creditResultsButtonHandler
    );
  }

  orderFormSubmitHandler() {
    this.view.popup.renderPopupCalculatorSuccess();
    localStorage.orders = parseInt(localStorage.orders, 10) + 1;
  }
}
