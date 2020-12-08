export function createMortgageCalculatorCreditSummTemplate(minimumCreditSumm, maximumCreditSumm, creditSumm) {
  return (
    `<div class="calculator__wrapper-inner" id="stepTwoWrapper">
      <h3 class="calculator__title calculator__title--step-two">Шаг 2. Введите параметры кредита</h3>
      <div class="calculator__section">
        <h4 class="calculator__title-inner">Стоимость недвижимости</h4>
        <div class="calculator__section-inner" id="section-summ">
          <div class="calculator__field-wrapper">
            <input class="calculator__field" id="creditSumm" type="number" value="${creditSumm}" min="${minimumCreditSumm}" max="${maximumCreditSumm}">
            <span class="calculator__field-mask">${creditSumm.toLocaleString(`ru-RU`)} рублей</span>
          </div>
          <button class="calculator__button calculator__button--decrease" aria-label="Уменьшить стоимость автомобиля">
            <svg width="16" height="2">
              <use href="img/sprite_auto.svg#icon-minus"></use>
            </svg>
          </button>
          <button class="calculator__button calculator__button--increase" aria-label="Увеличить стоимость автомобиля">
            <svg width="16" height="16">
              <use href="img/sprite_auto.svg#icon-plus"></use>
            </svg>
          </button>
        </div>
        <p class="calculator__legend">От ${minimumCreditSumm.toLocaleString('ru-RU')}  до ${maximumCreditSumm.toLocaleString('ru-RU')} рублей</p>
      </div>
    </div>`
  );
}
