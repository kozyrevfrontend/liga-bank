export function createCreditCalculatorResultsTemplate(creditSumm, creditPersentage, annuityPayment, minimumIncome) {
  return (
    `<div class="calculator__results results">
      <h3 class="results__title">Наше предложение</h3>
      <dl class="results__board">
        <div class="results__wrapper">
          <dt class="results__value">${creditSumm} рублей </dt>
          <dd class="results__description">Сумма кредита</dd>
        </div>
        <div class="results__wrapper results__wrapper--fix">
          <dt class="results__value">${creditPersentage}%</dt>
          <dd class="results__description">Процентная ставка</dd>
        </div>
        <div class="results__wrapper">
          <dt class="results__value">${annuityPayment} рублей</dt>
          <dd class="results__description">Ежемесячный платеж</dd>
        </div>
        <div class="results__wrapper results__wrapper--fix">
          <dt class="results__value">${minimumIncome} рублей</dt>
          <dd class="results__description">Необходимый доход</dd>
        </div>
      </dl>
      <button class="results__apply button"><span>Оформить заявку</span></button>
    </div>`
  );
}
