import $ from './unity';


class App {
    element = '';
    storage() {
        const xhr = new XMLHttpRequest;
        xhr.open('GET', 'https://fakestoreapi.com/products', true);
        xhr.send();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState != 4 || xhr.status > 300 || xhr.status < 200) return;
            localStorage.setItem('products', xhr.responseText);
        })
    }
    create() {
        this.element = document.createElement('div')
    }
    render() {
        this.element.classList.add('app');
        $('body').appendChild(this.element);
    }
    init() {
        if (localStorage.length == 0) this.storage();


        this.create();
        this.render();
    }
}
export default new App().init()