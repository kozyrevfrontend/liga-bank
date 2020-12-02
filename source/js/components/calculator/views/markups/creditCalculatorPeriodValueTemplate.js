export function createCalculatorPeriodValueTemplate(minimumCreditPeriod, maximumCreditPeriod, creditPeriod) {
  return (
    `<input class="calculator__field" id="period" type="number" value="${creditPeriod}" min="${minimumCreditPeriod}" max="${maximumCreditPeriod}">`
  );
}
