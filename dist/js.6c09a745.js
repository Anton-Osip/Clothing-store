// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/js/components/unity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const $ = selector => {
  return document.querySelector(selector);
};

var _default = $;
exports.default = _default;
},{}],"../src/js/components/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _unity = _interopRequireDefault(require("./unity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App {
  element = '';

  create() {
    this.element = document.createElement('div');
  }

  render() {
    this.element.classList.add('app');
    (0, _unity.default)('body').appendChild(this.element);
  }

  init() {
    this.create();
    this.render();
  }

}

var _default = new App().init();

exports.default = _default;
},{"./unity":"../src/js/components/unity.js"}],"../src/js/components/header.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.header = void 0;

var _unity = _interopRequireDefault(require("./unity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Header {
  element = '';

  create() {
    this.element = document.createElement('header');
    this.element.classList.add('header');
    (0, _unity.default)('.app').insertAdjacentElement('beforeend', this.element);
    this.element.innerHTML = `
        <div class="container header__container">
            <div class="header__logo-wrapper">
                <img src="img/logo.png" alt="Лолотип магазина одежды" class="header__logo">
            </div>
            <div class="header__basket">
                <div class="header__icon">
                    <svg width="23" height="23">
                        <use xlink:href="./img/icons.svg#shape"></use>
                    </svg>
                    <span class="header__count">0</span>
                </div>
                <span class="header__shape-price">$ <span>0</span></span>
            </div>
        </div>`;
  }

  init() {
    this.create();
    return this.element;
  }

}

const header = new Header().init();
exports.header = header;
},{"./unity":"../src/js/components/unity.js"}],"../src/js/components/nav.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nav = void 0;

var _unity = _interopRequireDefault(require("./unity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Nav {
  element = '';

  create() {
    this.element = document.createElement('nav');
    this.element.classList.add('nav');
    (0, _unity.default)('.app').insertAdjacentElement('beforeend', this.element);
    this.element.innerHTML = `
        <div class="container">
            <span class="nav__arrow-down">&dArr;</span>
            <span class="nav__arrow-up">&uArr;</span>
            <div class="nav__links">
                <a id='home' class="nav__link">Главная страница</a>
                <a id='cart' class="nav__link">Корзина</a>
                <a id='contacts' class="nav__link">Контакты</a>
            </div>
        </div>`;
    (0, _unity.default)('.nav__arrow-down').addEventListener('click', () => {
      this.element.classList.add('nav--active');
    });
    (0, _unity.default)('.nav__arrow-up').addEventListener('click', () => {
      this.element.classList.remove('nav--active');
    });
    (0, _unity.default)('#home').addEventListener('click', () => {
      window.location.hash = 'Home';
    });
    (0, _unity.default)('#cart').addEventListener('click', () => {
      window.location.hash = 'Cart';
    });
    (0, _unity.default)('#contacts').addEventListener('click', () => {
      window.location.hash = 'Contacts';
    });
  }

  init() {
    this.create();
    return this.element;
  }

}

const nav = new Nav().init();
exports.nav = nav;
},{"./unity":"../src/js/components/unity.js"}],"../src/js/components/main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = void 0;

var _unity = _interopRequireDefault(require("./unity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Main {
  productsData = JSON.parse(localStorage.getItem('productsData'));
  element = '';

  drowContactsWindow() {
    (0, _unity.default)('.main').innerHTML = '';
    (0, _unity.default)('.main').insertAdjacentHTML('beforeend', `
        <section class="contacts">
            <div class="container">
                <h2 class="contacts__title">Contact Us</h2>
                <div class="contacts__wrapper">
                    <div class="contacts__img-box">
                        <img src="./img/contacts-bg.png" alt="фон">
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
                        <img src="./img/ouch2.svg" alt="фото">
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
        </section>`);
  }

  deliteProduct(event) {
    const productElement = event.target.closest('.container');
    const eventElementId = +productElement.getAttribute('data-id');
    const product = this.productsData.find(item => {
      return item.id == eventElementId;
    });
    product.inCart = false;
    product.quantity = 0;
    this.setHeaderCart();
    this.drowCartWindow();
  }

  drowCartWindow() {
    (0, _unity.default)('.main').innerHTML = '';
    const cart = [];
    this.productsData.forEach(product => {
      product.inCart == true ? cart.push(product) : '';
    });

    if (cart.length === 0) {
      (0, _unity.default)('.main').insertAdjacentHTML('beforeend', `
            <div class='container'>
                <div class = 'free'>
                    <p class='free-text'>Нет товаров</p>
                </div>
            </div>`);
    } else {
      cart.forEach(product => {
        (0, _unity.default)('.main').insertAdjacentHTML('beforeend', `
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
                    </div>`);
      });
    }

    document.querySelectorAll('.basket__delite').forEach(item => {
      item.addEventListener('click', this.deliteProduct.bind(this));
    });
  }

  watchCart(event) {
    const productElement = event.target.closest('.cart');
    const eventElementId = +productElement.getAttribute('data-id');
    const product = this.productsData.find(item => {
      return item.id == eventElementId;
    });
    window.location.hash = `Product/${product.title}`;
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
            </div>`;
    (0, _unity.default)('.show-product__out').addEventListener('click', () => {
      window.location.hash = `Home`;
    });
  }

  setHeaderCart() {
    let price = 0;
    let count = 0;

    for (let elem of this.productsData) {
      if (elem.inCart == true) {
        count += elem.quantity;
        price += elem.price * elem.quantity;
      }
    }

    (0, _unity.default)('.header__count').innerHTML = count;
    (0, _unity.default)('.header__shape-price>span').innerHTML = price.toFixed(2);
  }

  cartBuy(event) {
    event.stopPropagation();
    const productElement = event.target.closest('.cart');
    const eventElementId = +productElement.getAttribute('data-id');
    const product = this.productsData.find(item => {
      return item.id == eventElementId;
    });
    product.inCart = true;
    product.count++;
    this.cartAdd(event);
    this.drowHomeWindow();
  }

  cartRemove(event) {
    event.stopPropagation();
    const productElement = event.target.closest('.cart');
    const eventElementId = +productElement.getAttribute('data-id');
    const product = this.productsData.find(item => {
      return item.id == eventElementId;
    });

    if (product.quantity != 0) {
      product.quantity--;
      this.drowHomeWindow();
      localStorage.setItem('productsData', JSON.stringify(this.productsData));
    }

    if (product.quantity == 0) {
      product.inCart = false;
      this.drowHomeWindow();
    }
  }

  cartAdd(event) {
    event.stopPropagation();
    const productElement = event.target.closest('.cart');
    const eventElementId = +productElement.getAttribute('data-id');
    const product = this.productsData.find(item => {
      return item.id == eventElementId;
    });
    product.quantity++;
    product.inCart = true;
    this.drowHomeWindow();
    localStorage.setItem('productsData', JSON.stringify(this.productsData));
    this.setHeaderCart();
  }

  loader() {
    this.element.innerHTML = ` <div class="lds-hourglass"></div>`;
    setTimeout(() => {
      this.drowHomeWindow();
    }, 5000);
  }

  drowHomeWindow() {
    if (localStorage.length == 0) {
      this.loader();
    } else {
      (0, _unity.default)('.main').innerHTML = `  <div class="container">
                                    <div class="row">
                                    </div>
                                </div>`;
      this.productsData.forEach(product => {
        (0, _unity.default)('.main>.container>.row').insertAdjacentHTML('beforeend', `
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
      this.setHeaderCart();
      document.querySelectorAll('.cart').forEach(item => {
        item.addEventListener('click', this.watchCart.bind(this));
      });
      document.querySelectorAll('.cart__add').forEach(item => {
        item.addEventListener('click', this.cartBuy.bind(this));
      });
      document.querySelectorAll('.cart__buy-remove').forEach(item => {
        item.addEventListener('click', this.cartRemove.bind(this));
      });
      document.querySelectorAll('.cart__buy-add').forEach(item => {
        item.addEventListener('click', this.cartAdd.bind(this));
      });
    }
  }

  hashchange() {
    if (window.location.hash === '#Home') this.drowHomeWindow();
    if (window.location.hash === '#Cart') this.drowCartWindow();
    if (window.location.hash === '#Contacts') this.drowContactsWindow();
  }

  create() {
    this.element = document.createElement('main');
    this.element.classList.add('main');
    (0, _unity.default)('.app').insertAdjacentElement('beforeend', this.element);
    this.element.innerHTML = ``;

    if (window.location.hash === '') {
      window.location.hash = 'Home';
    } else {
      this.hashchange();
    }

    window.addEventListener('hashchange', () => {
      this.hashchange();
    });
  }

  async storage() {
    const response = await fetch('https:/fakestoreapi.com/products');
    const result = await response.json();
    result.map(product => {
      product.inCart = false;
      product.quantity = 0;
    });
    localStorage.setItem('productsData', JSON.stringify(result));
    this.productsData = JSON.parse(localStorage.getItem('productsData'));
  }

  init() {
    this.create();

    if (localStorage.length == 0 || JSON.parse(localStorage.getItem('products')) < this.productsData) {
      this.storage();
    }

    return this.element;
  }

}

const main = new Main().init();
exports.main = main;
},{"./unity":"../src/js/components/unity.js"}],"../src/js/components/footer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = void 0;

var _unity = _interopRequireDefault(require("./unity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Footer {
  element = '';

  create() {
    this.element = document.createElement('footer');
    this.element.classList.add('footer');
    (0, _unity.default)('.app').insertAdjacentElement('beforeend', this.element);
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
exports.footer = footer;
},{"./unity":"../src/js/components/unity.js"}],"../src/js/index.js":[function(require,module,exports) {
"use strict";

var _unity = _interopRequireDefault(require("./components/unity"));

var _app = _interopRequireDefault(require("./components/app.js"));

var _header = _interopRequireDefault(require("./components/header.js"));

var _nav = _interopRequireDefault(require("./components/nav.js"));

var _main = _interopRequireDefault(require("./components/main.js"));

var _footer = _interopRequireDefault(require("./components/footer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./components/unity":"../src/js/components/unity.js","./components/app.js":"../src/js/components/app.js","./components/header.js":"../src/js/components/header.js","./components/nav.js":"../src/js/components/nav.js","./components/main.js":"../src/js/components/main.js","./components/footer.js":"../src/js/components/footer.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55281" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/js/index.js"], null)
//# sourceMappingURL=/js.6c09a745.js.map