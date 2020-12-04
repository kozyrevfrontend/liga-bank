export function createCalculatorPeriodTemplate(minimumCreditPeriod, maximumCreditPeriod) {
  let yearsMin = `лет`;

  if (minimumCreditPeriod === 1) {
    yearsMin = `год`;
  }

  if (minimumCreditPeriod >= 2 && minimumCreditPeriod <= 4) {
    yearsMin = `года`;
  }

  let yearMax = `лет`;

  if (maximumCreditPeriod === 1) {
    yearMax = `год`;
  }

  if (maximumCreditPeriod >= 2 && maximumCreditPeriod <= 4) {
    yearMax = `года`;
  }

  return (
    `<div class="calculator__section" id="periodSection">
      <h4 class="calculator__title-inner">Срок кредитования</h4>
      <p class="calculator__section-inner">
        <input class="calculator__range range" id="periodRange" type="range" min="${minimumCreditPeriod}" max="${maximumCreditPeriod}" step="1" value="${minimumCreditPeriod}">
      </p>
      <p class="calculator__legend">
        <span>${minimumCreditPeriod} ${yearsMin}</span>
        <span>${maximumCreditPeriod} ${yearMax}</span>
      </p>
    </div>`
  );
}
