export function createCalculatorPeriodValueTemplate(minimumCreditPeriod, maximumCreditPeriod, creditPeriod) {
  let years = `лет`;

  if (creditPeriod === 1 || creditPeriod === 21) {
    years = `год`;
  }

  if (creditPeriod >= 2 && creditPeriod <= 4 || creditPeriod >= 22 && creditPeriod <= 24) {
    years = `года`;
  }

  return (
    `<div class="calculator__field-wrapper">
      <input class="calculator__field" id="period" type="number" value="${creditPeriod}" min="${minimumCreditPeriod}" max="${maximumCreditPeriod}">
      <span class="calculator__field-mask">${creditPeriod} ${years}</span>
    </div>`
  );
}
