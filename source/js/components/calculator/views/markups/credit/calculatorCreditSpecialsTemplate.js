export function createCreditCalculatorSpecialsTemplate() {
  return (
    `<div class="calculator__section" id="specials">
      <h4 class="calculator__title-inner visually-hidden">Специальные условия</h4>
      <ul class="calculator__specials-list">
        <li class="calculator__specials-item">
          <input class="calculator__checkbox visually-hidden" id="salaryProject" type="checkbox" name="salaryProject">
          <label class="calculator__label" for="salaryProject" tabindex="0">Участник зарплатного проекта нашего банка</label>
        </li>
      </ul>
    </div>`
  );
}
