import $ from './unity';


class Nav {
    element = '';
    create() {
        this.element = document.createElement('nav');
        this.element.classList.add('nav');
        $('.app').insertAdjacentElement('beforeend', this.element);
        this.element.innerHTML = `
        <div class="container">
            <span class="nav__arrow-down">&dArr;</span>
            <span class="nav__arrow-up">&uArr;</span>
            <div class="nav__links">
                <a id='home' class="nav__link">Главная страница</a>
                <a id='basket' class="nav__link">Корзина</a>
                <a id='contacts' class="nav__link">Контакты</a>
            </div>
        </div>`;

        $('.nav__arrow-down').addEventListener('click', (() => { this.element.classList.add('nav--active') }))
        $('.nav__arrow-up').addEventListener('click', (() => { this.element.classList.remove('nav--active') }))
    }

    init() {
        this.create();
        return this.element;
    }
}
const nav = new Nav().init();
export { nav }