export function createAutoCalculatorSpecialsTemplate() {
  return (
    `<div class="calculator__section calculator__section--specials" id="specials">
      <h4 class="calculator__title-inner visually-hidden">Специальные условия</h4>
      <ul class="calculator__specials-list">
        <li class="calculator__specials-item">
          <input class="calculator__checkbox visually-hidden" id="autoInsurance" type="checkbox" name="autoInsurance">
          <label class="calculator__label" for="autoInsurance" tabindex="0">Оформить КАСКО в нашем банке</label>
        </li>
        <li class="calculator__specials-item">
          <input class="calculator__checkbox visually-hidden" id="lifeInsurance" type="checkbox" name="lifeInsurance">
          <label class="calculator__label" for="lifeInsurance" tabindex="0">Оформить Страхование жизни в нашем банке</label>
        </li>
      </ul>
    </div>`
  );
}
