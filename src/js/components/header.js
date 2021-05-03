import $ from './unity';


class Header {
    element = '';
    create() {
        this.element = document.createElement('header');
        this.element.classList.add('header');
        $('.app').insertAdjacentElement('beforeend', this.element);
        this.element.innerHTML = `
        <div class="container header__container">
            <div class="header__logo-wrapper">
                <img src="img/logo.png" alt="Лолотип магазина одежды" class="header__logo">
            </div>
            <div class="header__basket">
                <div class="header__icon">
                    <svg width="23" height="23">
                        <use xlink:href="./img/icons.svg#shape"></use>
                    </svg>
                    <span class="header__count">0</span>
                </div>
                <span class="header__shape-price">$ 88</span>
            </div>
        </div>`;
    }

    init() {
        this.create();
        return this.element;
    }
}
const header = new Header().init();
export { header }