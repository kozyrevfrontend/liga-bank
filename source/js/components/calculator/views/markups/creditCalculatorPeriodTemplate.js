export function createCalculatorPeriodTemplate(minimumCreditPeriod, maximumCreditPeriod) {
  return (
    `<div class="calculator__section" id="periodSection">
      <h4 class="calculator__title-inner">Срок кредитования</h4>
      <p class="calculator__section-inner">
        <input class="calculator__range range" id="periodRange" type="range" min="${minimumCreditPeriod}" max="${maximumCreditPeriod}" step="1" value="${minimumCreditPeriod}">
      </p>
      <p class="calculator__legend">
        <span>${minimumCreditPeriod} лет</span>
        <span>${maximumCreditPeriod} лет</span>
      </p>
    </div>`
  );
}
