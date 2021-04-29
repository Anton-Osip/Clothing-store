import $ from './unity';


class Main {
    element = '';
    create() {
        this.element = document.createElement('main');
        this.element.classList.add('main');
        $('.app').insertAdjacentElement('beforeend', this.element);
        this.element.innerHTML = '';
    }

    init() {
        this.create();
        return this.element;
    }
}
const main = new Main().init();
export { main }