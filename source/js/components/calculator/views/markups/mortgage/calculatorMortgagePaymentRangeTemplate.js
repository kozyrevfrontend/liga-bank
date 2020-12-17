export function createMortgageCalculatorPaymentRangeTemplate(minimumDownPaymentPersentage, downPaymentPersentage) {
  return (
    `<input class="calculator__range range" id="downPaymentRange" type="range" min="${minimumDownPaymentPersentage}" max="100" step="10" value="${downPaymentPersentage}">`
  );
}
