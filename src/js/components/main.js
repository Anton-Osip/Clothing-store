import $ from './unity';


class Main {
    constructor(){
        this.productsData =JSON.parse(sessionStorage.getItem('productsData'))
    }
    element = '';
    
    drowContactsWindow(){
        console.log('Contacts');
    }
    drowCartWindow(){
        console.log('cart');
    }
    setHeaderCart(){
        const productsData =JSON.parse(sessionStorage.getItem('productsData'));
        let price = 0;
        let count = 0;
        for(let elem of productsData){
            count+=elem.quantity;
            price+=elem.price*elem.quantity
        }
        $('.header__count').innerHTML = count;
        $('.header__shape-price>span').innerHTML = price;
    }
    cartBuy(event){
        const productElement = event.target.closest('.cart');
        const eventElementId = +productElement.getAttribute('data-id');
        const product = this.productsData.find((item) => { return item.id == eventElementId });
        product.inCart = true;
        product.count++;
        this.drowHomeWindow()
    }
    cartRemove(event){
        const productElement = event.target.closest('.cart');
        const eventElementId = +productElement.getAttribute('data-id');
        const product = this.productsData.find((item) => { return item.id == eventElementId });
        if(product.quantity!=0){ 
            product.quantity--;
            this.drowHomeWindow()
            sessionStorage.setItem('productsData',JSON.stringify(this.productsData));
            this.setHeaderCart()
        }
        
    }
    cartAdd(event){
        const productElement = event.target.closest('.cart');
        const eventElementId = +productElement.getAttribute('data-id');
        const product = this.productsData.find((item) => { return item.id == eventElementId });
            product.quantity++;
            product.inCart = true;
            this.drowHomeWindow()
            sessionStorage.setItem('productsData',JSON.stringify(this.productsData));
            this.setHeaderCart()
    }
    drowHomeWindow(){
        $('.main').innerHTML='';
        $('.main').innerHTML=`  <div class="container">
                                    <div class="row">
                                    </div>
                                </div>`
        this.productsData.forEach((product) => {
        $('.main>.container>.row').insertAdjacentHTML('beforeend', `
        <div class=" col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="cart" data-id='${product.id}'>
                <div class="cart__img-wrapper">
                    <img src="${product.image}" alt="${product.title}" class="cart__img">
                </div>
                <p class="cart__title">${product.title}</p>
                <p class="cart__description">${product.description}</p>
                <p class="cart__price">$ <span> ${product.price}</span></p>
                <div class='cart__buy' data-inCart = '${product.inCart}'>
                    <div class='cart__buy-remove'>&ndash;</div>
                    <div class='cart__buy-count'>${product.quantity}</div>
                    <div class='cart__buy-add'>+</div>
                </div>
                <div class="cart__add">Добавить в карзину</div>
            </div>
        </div>`);
        

        });
        this.setHeaderCart()


        document.querySelectorAll('.cart__add').forEach((item)=>{item.addEventListener('click',this.cartBuy.bind(this))})
        document.querySelectorAll('.cart__buy-remove').forEach((item)=>{item.addEventListener('click',this.cartRemove.bind(this))})
        document.querySelectorAll('.cart__buy-add').forEach((item)=>{item.addEventListener('click',this.cartAdd.bind(this))})
    }
    

    hashchange(){
        if(window.location.hash==='#Home')this.drowHomeWindow()
        if(window.location.hash==='#Cart')this.drowCartWindow()
        if(window.location.hash==='#Contacts')this.drowContactsWindow()
    }
    create() {
        this.element = document.createElement('main');
        this.element.classList.add('main');
        $('.app').insertAdjacentElement('beforeend', this.element);
        this.element.innerHTML = ``;

        if(window.location.hash===''){
            window.location.hash='Home';
        }else{
            this.hashchange()
        }     
        
        window.addEventListener('hashchange',()=>{
            this.hashchange()
        })
    }

    init() {
        this.create();
        return this.element;

        
    }
}
const main = new Main().init();
export { main }

// <div class="container">
    //         <div class="row">
    //         </div>
    //     </div>
    