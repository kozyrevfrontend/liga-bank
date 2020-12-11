export function createAutoCalculatorOrderTemplate(creditSumm, downPayment, creditPeriod, orderCount) {
  let years = `лет`;

  if (creditPeriod === 1) {
    years = `год`;
  }

  if (creditPeriod >= 2 && creditPeriod <= 4) {
    years = `года`;
  }

  return (
    `<div class="calculator__form form">
      <h3 class="form__title">Шаг 3. Оформление заявки</h3>
      <form id="calculatorForm" action="https://echo.htmlacademy.ru" method="POST">
        <p class="form__item form__item--readonly">
          <label for="orderNumber">Номер заявки</label>
          <input id="orderNumber" name="orderNumber" type="text" value="№ 00${orderCount}" tabindex="-1" readonly>
        </p>
        <p class="form__item form__item--readonly">
          <label for="creditPropose">Цель кредита</label>
          <input id="creditPropose" name="creditPropose" type="text" value="Автокредит" tabindex="-1" readonly>
        </p>
        <p class="form__item form__item--readonly">
          <label for="creditSumm">Стоимость автомобиля</label>
          <input id="creditSumm" name="creditSumm" type="text" value="${creditSumm.toLocaleString(`ru-RU`)} рублей" tabindex="-1" readonly>
        </p>
        <p class="form__item form__item--readonly">
          <label for="downPayment">Первоначальный взнос</label>
          <input id="downPayment" name="downPayment" type="text" value="${downPayment.toLocaleString(`ru-RU`)} рублей" tabindex="-1" readonly>
        </p>
        <p class="form__item form__item--readonly">
          <label for="creditPeriod">Срок кредитования</label>
          <input id="creditPeriod" name="creditPeriod" type="text" value="${creditPeriod} ${years}" tabindex="-1" readonly>
        </p>
        <p class="form__item">
          <label class="visually-hidden" for="userName">Введите ваши ФИО</label>
          <input id="userName" name="userName" type="text" placeholder="ФИО" required autofocus>
        </p>
        <div class="form__wrapper-inner">
          <p class="form__item">
            <label class="visually-hidden" for="userPhone">Введите ваш номер телефона</label>
            <input id="userPhone" name="userPhone" type="number" placeholder="Телефон" required>
          </p>
          <p class="form__item">
            <label class="visually-hidden" for="userEmail">Введите вашу почту</label>
            <input id="userEmail" name="userEmail" type="email" placeholder="E-mail" required>
          </p>
        </div>
        <button class="button form__button" type="submit">
          <span>Отправить</span>
        </button>
      </form>
    </div>`
  );
}
