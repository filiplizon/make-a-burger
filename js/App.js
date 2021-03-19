class App {

    prepareDOMElements() {
        shoppingCartList = document.querySelector('.shopping-cart__list');
        shoppingCartInfo = document.querySelector('.shopping-cart__info');
        cartBtn = document.querySelector('.shopping-cart__btn');
        shoppingCartQuantity = document.querySelector('.nav__shopping-cart-quantity');
        addToCartBtns = document.querySelectorAll('.menu__btn');
        allButtons = document.querySelectorAll('.btn');
        logo = document.querySelector('.nav__logo');
        shoppingCart = document.querySelector('.shopping-cart')
        shoppingCartBtn = document.querySelector('.nav__shopping-cart');
        popup = document.querySelector('.popup');
        closePopupBtn = document.querySelector('.popup__btn');
        orderList = document.querySelector('.order__list');
        quantityBtns = [...document.querySelectorAll('.menu__quantity-btn'), ...document.querySelectorAll('.ingredients__quantity-btn')];
        dotsBox = document.querySelector('.ingredients__dots-container');
        dots = document.getElementsByClassName('ingredients__dots');
        arrowBox = document.querySelector('.ingredients__arrows-box');
        ingredientsInputs = document.querySelectorAll('.ingredients__quantity');
        ingredientPrice = document.querySelector('.ingredients__total-price');
        deliveryTimeSpan = document.querySelector('.summary__delivery-time');
        exitBtn = document.querySelector('.summary__btn');
    }

    prepareDOMEvents() {

        allButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                let nextSectionName = e.target.dataset.next;
                let currentSectionName = e.target.dataset.current;
                if (e.target.dataset.next == "order") {
                    if (cart.items.length == 0) {
                        e.preventDefault();
                        cart.showPopup();
                    } else { nav.moveToNextSection(nextSectionName, currentSectionName); }
                } else { nav.moveToNextSection(nextSectionName, currentSectionName); }
            })
        })

        logo.addEventListener('click', () => {
            nav.closePreviousSections(previousSections);
        });

        shoppingCartBtn.addEventListener('click', nav.setShoppingCartVisibility);

        document.body.addEventListener('click', e => {
            nav.hideCartByClickingOutside(e);
        });

        quantityBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                cart.changeQuantity(btn);
            })
        })

        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                item.createItem(btn.value, parseFloat(btn.dataset.price));
                cart.addItem(newItem, quantityValue);
            })
        })

        closePopupBtn.addEventListener('click', () => {
            cart.closePopUp();
        })

        orderList.addEventListener('click', e => {
            cart.setCurrentItem(e);
            cart.removeItem(e);
            cart.editItem(e);
        })

        arrowBox.addEventListener('click', (e) => {
            cart.changeCurrentItem(e);
        })

        exitBtn.addEventListener('click', () => {
            clearInterval(counting);
        })
    }

    main() {
        this.prepareDOMElements();
        this.prepareDOMEvents();
    }
}

const app = new App();

document.addEventListener('DOMContentLoaded', () => { app.main() });