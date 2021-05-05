import $ from './unity';


class App {
    
    element = '';

    async storage() {
        const response = await fetch('https://fakestoreapi.com/products');
        const result = await response.json();
        await result.map((product)=>{
            product.inCart=false;
            product.quantity=0;});
        localStorage.setItem('productsData',JSON.stringify(result));
        sessionStorage.setItem('productsData',JSON.stringify(result));
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