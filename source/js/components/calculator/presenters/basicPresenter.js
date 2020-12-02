export class BasicPresenter {
  constructor(model, view) {
    this.calculator = model;
    this.view = view;

    this.creditSummInputHandler = this.creditSummInputHandler.bind(this);
    this.downPaymentInputHandler = this.downPaymentInputHandler.bind(this);
    this.downPaymentRangeHandler = this.downPaymentRangeHandler.bind(this);
    this.periodInputHandler = this.periodInputHandler.bind(this);
    this.periodRangeHandler = this.periodRangeHandler.bind(this);
  }

  init(id) {
    this.calculator.init(id);

    console.dir(this.calculator);

    this.view.renderCalculatorResults(
      this.calculator.totalCreditSumm.toLocaleString('ru-RU'),
      this.calculator.creditPersentage.toFixed(2).toLocaleString('ru-RU'),
      this.calculator.annuityPayment.toLocaleString('ru-RU'),
      this.calculator.minimumIncome.toLocaleString('ru-RU')
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
      this.calculator.totalCreditSumm.toLocaleString('ru-RU'),
      this.calculator.creditPersentage.toFixed(2).toLocaleString('ru-RU'),
      this.calculator.annuityPayment.toLocaleString('ru-RU'),
      this.calculator.minimumIncome.toLocaleString('ru-RU')
    );
  }

  downPaymentInputHandler(value) {
    this.calculator.downPayment = value;
    this.calculator.calculateDownPaymentPersentage();

    this.calculator.calculateCreditPersentage();
    this.calculator.calculateTotalCreditSumm();
    this.calculator.calculateAnnuityPayment();
    this.calculator.calculateMinimumIncome();

    if (this.calculator.minimumTotalCreditSumm) {
      if (this.calculator.totalCreditSumm < this.calculator.minimumTotalCreditSumm) {
        this.view.renderCalculatorUserMessage(this.calculator.minimumTotalCreditSumm);
      } else {
        this.view.renderCalculatorResults(
          this.calculator.totalCreditSumm.toLocaleString('ru-RU'),
          this.calculator.creditPersentage.toFixed(2).toLocaleString('ru-RU'),
          this.calculator.annuityPayment.toLocaleString('ru-RU'),
          this.calculator.minimumIncome.toLocaleString('ru-RU')
        );
      }
    }
  }

  downPaymentRangeHandler(value) {
    this.calculator.downPaymentPersentage = value;
    this.calculator.calculateDownPayment(value);

    this.view.renderCalculatorPaymentValue(this.calculator.minimumDownPayment, this.calculator.downPayment, this.downPaymentInputHandler);

    this.calculator.calculateCreditPersentage();
    this.calculator.calculateTotalCreditSumm();
    this.calculator.calculateAnnuityPayment();
    this.calculator.calculateMinimumIncome();

    if (this.calculator.minimumTotalCreditSumm) {
      if (this.calculator.totalCreditSumm < this.calculator.minimumTotalCreditSumm) {
        this.view.renderCalculatorUserMessage(this.calculator.minimumTotalCreditSumm);
      } else {
        this.view.renderCalculatorResults(
          this.calculator.totalCreditSumm.toLocaleString('ru-RU'),
          this.calculator.creditPersentage.toFixed(2).toLocaleString('ru-RU'),
          this.calculator.annuityPayment.toLocaleString('ru-RU'),
          this.calculator.minimumIncome.toLocaleString('ru-RU')
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
      this.calculator.totalCreditSumm.toLocaleString('ru-RU'),
      this.calculator.creditPersentage.toFixed(2).toLocaleString('ru-RU'),
      this.calculator.annuityPayment.toLocaleString('ru-RU'),
      this.calculator.minimumIncome.toLocaleString('ru-RU')
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
      this.calculator.totalCreditSumm.toLocaleString('ru-RU'),
      this.calculator.creditPersentage.toFixed(2).toLocaleString('ru-RU'),
      this.calculator.annuityPayment.toLocaleString('ru-RU'),
      this.calculator.minimumIncome.toLocaleString('ru-RU')
    );
  }
}
