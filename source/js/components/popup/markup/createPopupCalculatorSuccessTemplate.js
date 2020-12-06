export function createPopupCalculatorSuccessTemplate() {
  return (
    `<div class="popup-success">
      <div class="popup-success__wrapper">
        <p class="popup-success__title">Спасибо за обращение в наш банк.</p>
        <p class="popup-success__message">Наш менеджер скоро свяжется с вами
        по указанному номеру телефона.</p>
        <button class="popup-success__close" aria-label="Закрыть попап">
          <svg width="16" height="16">
            <use href="img/sprite_auto.svg#icon-cross"></use>
          </svg>
        </button>
      </div>
    </div>`
  );
}
