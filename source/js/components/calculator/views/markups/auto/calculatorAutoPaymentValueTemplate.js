export function createAutoCalculatorPaymentValueTemplate(minimumDownPayment, downPayment) {
  return (
    `<input class="calculator__field" id="downPayment" type="number" value="${downPayment}" min="${minimumDownPayment}">`
  );
}
