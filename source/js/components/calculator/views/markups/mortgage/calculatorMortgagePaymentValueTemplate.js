export function createMortgageCalculatorPaymentValueTemplate(minimumDownPayment, downPayment) {
  return (
    `<div class="calculator__field-wrapper">
      <input class="calculator__field" id="downPayment" type="number" value="${downPayment}" min="${minimumDownPayment}">
      <span class="calculator__field-mask">${downPayment.toLocaleString(`ru-RU`)} рублей</span>
    </div>`
  );
}
