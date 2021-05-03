import $ from './unity';


class Main {
    basket = [

    ];
    element = '';

    addProductsToBasket(event) {
        const item = event.target.closest('.card');
        const cardPrice = item.querySelector('.card__price>span').innerHTML;

        this.basket.price += +cardPrice
        this.basket.count++;

    }

    drowWindow() {
        const products = JSON.parse(localStorage.getItem('products'));
        products.forEach((product) => {
            $('.main>.container>.row').insertAdjacentHTML('beforeend', `
            <div class=" col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card" data-id='${product.id}'>
                    <div class="card__img-wrapper">
                        <img src="${product.image}" alt="${product.title}" class="card__img">
                    </div>
                    <p class="card__title">${product.title}</p>
                    <p class="card__description">${product.description}</p>
                    <p class="card__price">$ <span> ${product.price}</span></p>
                    <div class='card__buy'>
                        <div class='card__buy-remove'>&ndash;</div>
                        <div class='card__buy-count'>${this.basket.count}</div>
                        <div class='card__buy-add'>+</div>
                    </div>
                    <div class="card__add">Добавить в карзину</div>
                </div>
            </div>`);


        })
        document.querySelectorAll('.card__add').forEach((elem) => {
            elem.addEventListener('click', this.addProductsToBasket.bind(this))
        })
        document.querySelectorAll('.card__buy-remove').forEach((elem) => {
            elem.addEventListener('click', (event) => {
                if (this.basket.count != 0) {
                    this.basket.count--;
                    event.target.nextElementSibling.innerHTML = this.basket.count;
                    const item = event.target.closest('.card');
                    const cardPrice = item.querySelector('.card__price>span').innerHTML;
                    this.basket.price -= +cardPrice;
                    console.log(this.basket);
                }

            })
        })
        document.querySelectorAll('.card__buy-add').forEach((elem) => {
            elem.addEventListener('click', (event) => {
                this.basket.count++;
                event.target.previousElementSibling.innerHTML = this.basket.count;
                const item = event.target.closest('.card');
                const cardPrice = item.querySelector('.card__price>span').innerHTML;
                this.basket.price += +cardPrice;
                console.log(this.basket);
            })
        })
    }
    create() {
        this.element = document.createElement('main');
        this.element.classList.add('main');
        $('.app').insertAdjacentElement('beforeend', this.element);
        this.element.innerHTML = `<div class="container">
            <div class="row">
            </div>
        </div>`;

        this.drowWindow();
    }

    init() {
        this.create();
        return this.element;
    }
}
const main = new Main().init();
export { main }