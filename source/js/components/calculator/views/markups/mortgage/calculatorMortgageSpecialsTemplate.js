export function createMortgageCalculatorSpecialsTemplate() {
  return (
    `<div class="calculator__section" id="specials">
      <h4 class="calculator__title-inner visually-hidden">Специальные условия</h4>
      <ul class="calculator__specials-list">
        <li class="calculator__specials-item">
          <input class="calculator__checkbox" id="maternityCapital" type="checkbox" name="maternityCapital">
          <label class="calculator__label" for="maternityCapital">Использовать материнский капитал</label>
        </li>
      </ul>
    </div>`
  );
}
