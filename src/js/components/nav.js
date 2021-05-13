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
                <a id='cart' class="nav__link">Карзина</a>
                <a id='contacts' class="nav__link">Контакты</a>
            </div>
        </div>`;

        $('.nav__arrow-down').addEventListener('click', (() => { this.element.classList.add('nav--active') }))
        $('.nav__arrow-up').addEventListener('click', (() => { this.element.classList.remove('nav--active') }))
        $('#home').addEventListener('click', (() => { window.location.hash='Home' }))
        $('#cart').addEventListener('click', (() => { window.location.hash='Cart' }))
        $('#contacts').addEventListener('click', (() => { window.location.hash='Contacts' }))

    }

    init() {
        this.create();
        return this.element;
    }
}
const nav = new Nav().init();
export { nav }