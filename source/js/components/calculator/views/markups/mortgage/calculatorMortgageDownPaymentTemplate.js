export function createMortgageCalculatorDownPaymentTemplate(minimumDownPaymentPersentage) {
  return (
    `<div class="calculator__section" id="downPaymentSection">
      <h4 class="calculator__title-inner">Первоначальный взнос</h4>
      <p class="calculator__section-inner">
        <input class="calculator__range" id="downPaymentRange" type="range" min="${minimumDownPaymentPersentage}" max="100" step="10" value="${minimumDownPaymentPersentage}">
      </p>
      <p class="calculator__legend">${minimumDownPaymentPersentage}%</p>
    </div>`
  );
}
