export class BasicPresenter {
  constructor(model, view) {
    this.calculator = model;
    this.view = view;
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
  }
}
