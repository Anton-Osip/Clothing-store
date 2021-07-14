import $ from './unity'

class Main {
	productsData = JSON.parse(localStorage.getItem('productsData'))
	element = ''

	drowContactsWindow() {
		$('.main').innerHTML = ''
		$('.main').insertAdjacentHTML(
			'beforeend',
			`
        <section class="contacts">
            <div class="container">
                <h2 class="contacts__title">Contact Us</h2>
                <div class="contacts__wrapper">
                    <div class="contacts__img-box">
                        <img src="/contacts-bg.png" alt="фон">
                    </div>
                    <form class='contacts__form'>
                        <label class="contacts__lable">Your Email Address</label>
                        <input type="email" class="contacts__input input" placeholder="something@website.com">
                        <label class="contacts__lable">Subject</label>
                        <input type="text" class="contacts__input input"
                                placeholder="Question about your article">
                        <label class="contacts__lable">Message</label>
                        <textarea class="contacts__input contacts__input-mes input"
                                placeholder="Your message starts with…"></textarea>
                        <button class="btn contacts__btn">Send a Message</button>
                    </form>
                </div>
            </div>
        </section>
        <section class="start">
            <div class="container">
                <div class="start__wrapper">
                    <div class="start__img-box">
                        <img src="/ouch2.svg" alt="фото">
                    </div>
                    <div class="start__info">
                        <h3 class="start__title">
                                Start your free trial.
                        </h3>
                        <p class="start__description">
                                Get notified about company updates, news and blog posts. We hate spam.
                        </p>
                        <form class="star__form">
                            <input type="text" class="start__input input" placeholder="Enter your email">
                            <button class="btn start__btn">Get Started</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>`
		)
	}

	deliteProduct(event) {
		const productElement = event.target.closest('.container')
		const eventElementId = +productElement.getAttribute('data-id')
		const product = this.productsData.find(item => {
			return item.id == eventElementId
		})
		product.inCart = false
		product.quantity = 0
		this.setHeaderCart()
		this.drowCartWindow()
	}
	drowCartWindow() {
		$('.main').innerHTML = ''
		const cart = []
		this.productsData.forEach(product => {
			product.inCart == true ? cart.push(product) : ''
		})
		if (cart.length === 0) {
			$('.main').insertAdjacentHTML(
				'beforeend',
				`
            <div class='container'>
                <div class = 'free'>
                    <p class='free-text'>Нет товаров</p>
                </div>
            </div>`
			)
		} else {
			cart.forEach(product => {
				$('.main').insertAdjacentHTML(
					'beforeend',
					`
                    <div class="container" data-id='${product.id}'>
                        <div class="basket row " >
                            <div class="basket__img-wrapper col-12 col-lg-1">
                                <img src="${product.image}" alt="${product.title}" class="basket__img">
                            </div>
                            <p class="basket__title col-12 col-lg-6">${product.title}</p>
                            <p class="basket__price col-12 col-lg-2">$ <span> ${product.price}</span></p>
                            <span class='col-12 col-lg-2 basket__buy-text-count'>Количество:<div class='basket__buy-count '>${product.quantity}</div></span>
                            <div class='basket__delite col-lg-1'>&#10006;</div>
                        </div>
                    </div>`
				)
			})
		}
		document.querySelectorAll('.basket__delite').forEach(item => {
			item.addEventListener('click', this.deliteProduct.bind(this))
		})
	}

	watchCart(event) {
		const productElement = event.target.closest('.cart')
		const eventElementId = +productElement.getAttribute('data-id')
		const product = this.productsData.find(item => {
			return item.id == eventElementId
		})
		window.location.hash = `Product/${product.title}`
		this.element.innerHTML = `
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
            </div>`
		$('.show-product__out').addEventListener('click', () => {
			window.location.hash = `Home`
		})
	}

	setHeaderCart() {
		let price = 0
		let count = 0
		for (let elem of this.productsData) {
			if (elem.inCart == true) {
				count += elem.quantity
				price += elem.price * elem.quantity
			}
		}
		$('.header__count').innerHTML = count
		$('.header__shape-price>span').innerHTML = price.toFixed(2)
	}

	cartBuy(event) {
		event.stopPropagation()
		const productElement = event.target.closest('.cart')
		const eventElementId = +productElement.getAttribute('data-id')
		const product = this.productsData.find(item => {
			return item.id == eventElementId
		})
		product.inCart = true
		product.count++
		this.cartAdd(event)
		this.drowHomeWindow()
	}
	cartRemove(event) {
		event.stopPropagation()
		const productElement = event.target.closest('.cart')
		const eventElementId = +productElement.getAttribute('data-id')
		const product = this.productsData.find(item => {
			return item.id == eventElementId
		})
		if (product.quantity >= 1) {
			product.quantity--

			localStorage.setItem(
				'productsData',
				JSON.stringify(this.productsData)
			)
			this.drowHomeWindow()
		}
		if (product.quantity === 0) {
			product.inCart = false
			localStorage.setItem(
				'productsData',
				JSON.stringify(this.productsData)
			)
			this.drowHomeWindow()
		}
	}
	cartAdd(event) {
		event.stopPropagation()
		const productElement = event.target.closest('.cart')
		const eventElementId = +productElement.getAttribute('data-id')
		const product = this.productsData.find(item => {
			return item.id == eventElementId
		})
		product.quantity++
		product.inCart = true
		localStorage.setItem('productsData', JSON.stringify(this.productsData))
		this.drowHomeWindow()

		this.setHeaderCart()
	}

	loader() {
		this.element.innerHTML = ` <div class="lds-hourglass"></div>`
		setTimeout(() => {
			this.drowHomeWindow()
		}, 5000)
	}

	drowHomeWindow() {
		if (localStorage.length == 0) {
			this.loader()
		} else {
			this.productsData = JSON.parse(localStorage.getItem('productsData'))
			$('.main').innerHTML = `  <div class="container">
                                    <div class="row">
                                    </div>
                                </div>`
			this.productsData.forEach(product => {
				$('.main>.container>.row').insertAdjacentHTML(
					'beforeend',
					`
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
                </div>`
				)
			})
			this.setHeaderCart()

			document.querySelectorAll('.cart').forEach(item => {
				item.addEventListener('click', this.watchCart.bind(this))
			})
			document.querySelectorAll('.cart__add').forEach(item => {
				item.addEventListener('click', this.cartBuy.bind(this))
			})
			document.querySelectorAll('.cart__buy-remove').forEach(item => {
				item.addEventListener('click', this.cartRemove.bind(this))
			})
			document.querySelectorAll('.cart__buy-add').forEach(item => {
				item.addEventListener('click', this.cartAdd.bind(this))
			})
		}
	}

	hashchange() {
		if (window.location.hash === '#Home') this.drowHomeWindow()
		if (window.location.hash === '#Cart') this.drowCartWindow()
		if (window.location.hash === '#Contacts') this.drowContactsWindow()
	}
	create() {
		this.element = document.createElement('main')
		this.element.classList.add('main')
		$('.app').insertAdjacentElement('beforeend', this.element)
		this.element.innerHTML = ``

		if (window.location.hash === '') {
			window.location.hash = 'Home'
		} else {
			this.hashchange()
		}

		window.addEventListener('hashchange', () => {
			this.hashchange()
		})
	}

	// async storage() {
	// 	const response = await fetch('https:/fakestoreapi.com/products')
	// 	const result = await response.json()
	// 	result.map(product => {
	// 		product.inCart = false
	// 		product.quantity = 0
	// 	})
	// 	localStorage.setItem('productsData', JSON.stringify(result))
	// 	this.productsData = JSON.parse(localStorage.getItem('productsData'))
	// }

	init() {
		this.create()
		if (
			localStorage.length == 0 ||
			JSON.parse(localStorage.getItem('products')) < this.productsData
		) {
			this.productsData = JSON.parse(localStorage.getItem('productsData'))
		}
		return this.element
	}
}
const main = new Main().init()
export { main }
