export class BasicPresenter {
  constructor(model, view) {
    this.calculator = model;
    this.view = view;

    this.creditSummInputHandler = this.creditSummInputHandler.bind(this);
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
  }

  creditSummInputHandler(value) {
    this.calculator.setCreditSumm(value);

    if (this.calculator.minimumDownPaymentPersentage) {
      this.calculator.setMinimumDownPayment();
      this.calculator.calculateDownPayment(this.calculator.minimumDownPaymentPersentage);
      this.calculator.calculateDownPaymentPersentage();
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
}
