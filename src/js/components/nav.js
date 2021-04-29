import $ from './unity';


class Nav {
    element = '';
    create() {
        this.element = document.createElement('nav');
        this.element.classList.add('nav');
        $('.app').insertAdjacentElement('beforeend', this.element);
        this.element.innerHTML = '';
    }

    init() {
        this.create();
        return this.element;
    }
}
const nav = new Nav().init();
export { nav }