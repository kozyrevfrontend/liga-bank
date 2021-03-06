export function createMortgageCalculatorSpecialsTemplate() {
  return (
    `<div class="calculator__section calculator__section--specials" id="specials">
      <h4 class="calculator__title-inner visually-hidden">Специальные условия</h4>
      <ul class="calculator__specials-list">
        <li class="calculator__specials-item">
          <input class="calculator__checkbox visually-hidden" id="maternityCapital" type="checkbox" name="maternityCapital">
          <label class="calculator__label" for="maternityCapital" tabindex="0">Использовать материнский капитал</label>
        </li>
      </ul>
    </div>`
  );
}
