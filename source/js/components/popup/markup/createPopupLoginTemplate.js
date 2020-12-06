export function createPopupLoginTemplate() {
  return (
    `<div class="popup-login">
    <div class="popup-login__wrapper">
      <div class="popup-login__logo">
        <a class="popup-login__logo-link">
          <picture>
            <source type="image/webp" srcset="img/logo-login@1x.webp 1x, img/logo-login@2x.webp 2x">
            <img class="popup-login__logo-img" src="img/logo-login@1x.png" srcset="img/logo-login@2x.png 2x" width="151" height="31" alt="Лига Банк">
          </picture>
        </a>
      </div>
      <form class="popup-login__form" id="loginForm" action="https://echo.htmlacademy.ru" method="POST">
        <p class="popup-login__form-item popup-login__form-item--login">
          <label for="login">Логин</label>
          <input id="login" name="login" type="text" autofocus>
        </p>
        <p class="popup-login__form-item popup-login__form-item--password">
          <label for="password">Пароль</label>
          <input id="password" name="password" type="password">
          <svg width="22" height="12">
            <use href="img/sprite_auto.svg#icon-eye"></use>
          </svg>
        </p>
        <a class="popup-login__form-link" href="#">Забыли пароль?</a>
        <button class="popup-login__form-button button">
          <span>Войти</span>
        </button>
      </form>
      <button class="popup-login__close" aria-label="Закрыть попап">
        <svg width="16" height="16">
          <use href="img/sprite_auto.svg#icon-cross"></use>
        </svg>
      </button>
    </div>
  </div>`
  );
}
