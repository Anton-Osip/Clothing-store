import $ from './unity';


class Main {
    productsData =JSON.parse(localStorage.getItem('productsData'))
    element = '';
    
    drowContactsWindow(){
        console.log('Contacts');
    }

    drowCartWindow(){
        $('.main').innerHTML='';
        this.productsData.forEach((product) => {
            if(product.inCart==true){
                $('.main').insertAdjacentHTML('beforeend', `
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
                            <div class="cart__add ">Добавить в карзину</div>
                        </div>`
                );
                
            }        
        });
        this.setHeaderCart()


        document.querySelectorAll('.cart').forEach((item)=>{item.addEventListener('click',this.watchCart.bind(this))})
        document.querySelectorAll('.cart__add').forEach((item)=>{item.addEventListener('click',this.cartBuy.bind(this))})
        document.querySelectorAll('.cart__buy-remove').forEach((item)=>{item.addEventListener('click',this.cartRemove.bind(this))})
        document.querySelectorAll('.cart__buy-add').forEach((item)=>{item.addEventListener('click',this.cartAdd.bind(this))})
    }

    watchCart(event){
        const productElement = event.target.closest('.cart');
        const eventElementId = +productElement.getAttribute('data-id');
        const product = this.productsData.find((item) => { return item.id == eventElementId });
        window.location.hash = `Product/${product.title}`
        this.element.innerHTML=`
            <div class="show-product " data-id='${product.id}'>
                <div class='container'>
                    <div class='row'>
                    <div class="show-product__out">&#10006;</div>
                        <div class="show-product__img-wrapper col-sm-4 col-12">
                            <img src="${product.image}" alt="${product.title}" class="show-product__img">
                        </div>
                        <div class = 'show-product__text col-sm-8 col-12'>
                            <p class="show-product__title">${product.title}</p>
                            <p class="show-product__description">${product.description}</p>
                            <p class="show-product__price">$ <span> ${product.price}</span></p>
                        </div>
                    </div>
                </div>
            </div>`;
        $('.show-product__out').addEventListener('click',()=>{
            window.location.hash = `Home`})
    }

    setHeaderCart(){
        const productsData =JSON.parse(localStorage.getItem('productsData'));
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
        event. stopPropagation()
        const productElement = event.target.closest('.cart');
        const eventElementId = +productElement.getAttribute('data-id');
        const product = this.productsData.find((item) => { return item.id == eventElementId });
        product.inCart = true;
        product.count++;
        this.cartAdd(event)
        this.drowHomeWindow()
    }
    cartRemove(event){
        event. stopPropagation()
        const productElement = event.target.closest('.cart');
        const eventElementId = +productElement.getAttribute('data-id');
        const product = this.productsData.find((item) => { return item.id == eventElementId });
        if(product.quantity!=0){ 
            product.quantity--;
            this.drowHomeWindow()
            localStorage.setItem('productsData',JSON.stringify(this.productsData));
        }
        if(product.quantity==0){
            product.inCart = false;
            this.drowHomeWindow()
        }   
    }
    cartAdd(event){
        event. stopPropagation()
        const productElement = event.target.closest('.cart');
        const eventElementId = +productElement.getAttribute('data-id');
        const product = this.productsData.find((item) => { return item.id == eventElementId });
            product.quantity++;
            product.inCart = true;
            this.drowHomeWindow()
            localStorage.setItem('productsData',JSON.stringify(this.productsData));
            this.setHeaderCart()
    };

    loader(){
        this.element.innerHTML =` <div class="lds-hourglass"></div>`
        setTimeout(()=>{
                this.drowHomeWindow()}
            ,5000)
    }


    drowHomeWindow(){     
        if(localStorage.length==0){
            this.loader()
        }else{ 
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
                        <div class="cart__add ">Добавить в карзину</div>
                    </div>
                </div>`);
            });
            this.setHeaderCart()

            document.querySelectorAll('.cart').forEach((item)=>{item.addEventListener('click',this.watchCart.bind(this))})
            document.querySelectorAll('.cart__add').forEach((item)=>{item.addEventListener('click',this.cartBuy.bind(this))})
            document.querySelectorAll('.cart__buy-remove').forEach((item)=>{item.addEventListener('click',this.cartRemove.bind(this))})
            document.querySelectorAll('.cart__buy-add').forEach((item)=>{item.addEventListener('click',this.cartAdd.bind(this))})
            }
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

    async storage() {
        const response = await fetch('https://fakestoreapi.com/products');
        const result = await response.json();
        result.map((product)=>{
            product.inCart=false;
            product.quantity=0;});
        localStorage.setItem('productsData',JSON.stringify(result));
        this.productsData =JSON.parse(localStorage.getItem('productsData'))

    }

    init() {
        this.create();
        if (localStorage.length == 0 || JSON.parse(localStorage.getItem('products'))<this.productsData ){
            this.storage();
        }
        return this.element;
    }
}
const main = new Main().init();
export { main }