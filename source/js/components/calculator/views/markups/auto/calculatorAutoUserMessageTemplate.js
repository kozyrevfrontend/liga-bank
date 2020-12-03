export function createAutoCalculatorUserMessageTemplate(minimumTotalCreditSumm) {
  return (
    `<div class="calculator__results user-message">
      <p class="user-message__message">Наш банк не выдаёт автокредиты меньше ${minimumTotalCreditSumm.toLocaleString('ru-RU')} рублей.</p>
      <p class="user-message__proposal">Попробуйте использовать другие параметры для расчёта.</p>
    </div>`
  );
}
