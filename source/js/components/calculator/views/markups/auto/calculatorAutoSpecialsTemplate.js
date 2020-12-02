export function createAutoCalculatorSpecialsTemplate() {
  return (
    `<div class="calculator__section" id="specials">
      <h4 class="calculator__title-inner visually-hidden">Специальные условия</h4>
      <ul class="calculator__specials-list">
        <li class="calculator__specials-item">
          <input class="calculator__checkbox" id="autoInsurance" type="checkbox" name="autoInsurance">
          <label class="calculator__label" for="autoInsurance">Оформить КАСКО в нашем банке</label>
        </li>
        <li class="calculator__specials-item">
          <input class="calculator__checkbox" id="lifeInsurance" type="checkbox" name="lifeInsurance">
          <label class="calculator__label" for="lifeInsurance">Оформить Страхование жизни в нашем банке</label>
        </li>
      </ul>
    </div>`
  );
}
