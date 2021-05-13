import $ from './unity';


class App {
    
    element = '';    
    create() {
        this.element = document.createElement('div')
    }
    render() {
        this.element.classList.add('app');
        $('body').appendChild(this.element);
    }
    init() {
        

        this.create();
        this.render();
    }
}
export default new App().init()