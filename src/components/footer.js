import $ from './unity';


class Footer {
    element = '';
    create() {
        this.element = document.createElement('footer');
        this.element.classList.add('footer');
        $('.app').insertAdjacentElement('beforeend', this.element);
        this.element.innerHTML = `
        <div class="container">
            <div class="footer__cope">@Далеко-далеко за словесными горами в стране.</div>
        </div>`;
    }

    init() {
        this.create();
        return this.element;
    }
}
const footer = new Footer().init();
export { footer }