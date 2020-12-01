export class BasicPresenter {
  constructor(model, view) {
    this.calculator = model;
    this.view = view;

    this.creditSummInputHandler = this.creditSummInputHandler.bind(this);
    this.downPaymentInputHandler = this.downPaymentInputHandler.bind(this);
    this.downPaymentRangeHandler = this.downPaymentRangeHandler.bind(this);
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
  }

  creditSummInputHandler(value) {
    this.calculator.setCreditSumm(value);

    if (this.calculator.minimumDownPaymentPersentage) {
      this.calculator.setMinimumDownPayment();
      this.calculator.calculateDownPayment(this.calculator.minimumDownPaymentPersentage);
      this.calculator.calculateDownPaymentPersentage();

      this.view.renderCalculatorDownPayment(
        this.calculator.minimumDownPaymentPersentage,
        this.calculator.minimumDownPayment,
        this.calculator.downPayment,
        this.downPaymentInputHandler,
        this.downPaymentRangeHandler
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

    this.view.renderCalculatorResults(
      this.calculator.totalCreditSumm.toLocaleString('ru-RU'),
      this.calculator.creditPersentage.toFixed(2).toLocaleString('ru-RU'),
      this.calculator.annuityPayment.toLocaleString('ru-RU'),
      this.calculator.minimumIncome.toLocaleString('ru-RU')
    );
  }

  downPaymentRangeHandler(value) {
    this.calculator.downPaymentPersentage = value;
    this.calculator.calculateDownPayment(value);

    this.view.renderCalculatorPaymentValue(this.calculator.minimumDownPayment, this.calculator.downPayment, this.downPaymentInputHandler);

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
