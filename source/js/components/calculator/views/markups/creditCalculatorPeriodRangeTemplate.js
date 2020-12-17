export function createCalculatorPeriodRangeTemplate(minimumCreditPeriod, maximumCreditPeriod, creditPeriod) {
  return (
    `<input class="calculator__range range" id="periodRange" type="range" min="${minimumCreditPeriod}" max="${maximumCreditPeriod}" step="1" value="${creditPeriod}">`
  );
}
