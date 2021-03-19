class ShoppingCart {
    constructor() {
        this.items = [];
        this.totalPrice = 0;
    }

    addItem(item) {
        if (this.isItemInShoppingCart(item)) {
            sameItems = this.items.filter(({ name }) => name === item.name);
        }
        this.createCartItem(item);
        this.updateCartQuantity();
    }

    isItemInShoppingCart(item) {
        let duplicatedItem = this.items.find(({ name }) => name == item.name)
        duplicatedItem ? duplicatedItem = true : duplicatedItem = false;
        return duplicatedItem;
    }

    createCartItem(item) {
        this.createItemInOrderList(item);
        this.createItemInCart(item);
    }

    createItemInCart(product) {
        let itemAlreadyInList = document.getElementById(`${product.name}`);
        if (itemAlreadyInList) {
            itemAlreadyInList.innerHTML = `<p class="shopping-cart__name">${product.name}</p>
            <div class="shopping-cart__price-box">
                <p class="shopping-cart__quantity">x${this.getItemsAmount(product.name)}</p>
                <p class="shopping-cart__price">${(product.price * this.getItemsAmount(product.name)).toFixed(2)}</p>
            </div>`;
        } else {
            cartBtn.style.display = 'block';
            shoppingCartInfo.style.display = 'none';
            const cartItem = document.createElement('li');
            cartItem.classList.add('shopping-cart__item');
            cartItem.setAttribute('id', `${product.name}`)
            cartItem.innerHTML = `<p class="shopping-cart__name">${product.name}</p>
            <div class="shopping-cart__price-box">
                <p class="shopping-cart__quantity">x${this.getItemsAmount(product.name)}</p>
                <p class="shopping-cart__price">${(product.price * this.getItemsAmount(product.name)).toFixed(2)}</p>
            </div>`;
            shoppingCartList.appendChild(cartItem);
        }
    }

    createItemInOrderList(item) {
        const isInList = document.querySelector(`[data-item='${item.name}']`);
        if (!isInList) {
            const listItem = document.createElement('li');
            listItem.classList.add('order__item');
            listItem.setAttribute('data-item', `${item.name}`);
            listItem.innerHTML = ` <div class="order__product-box">
        <div class="order__product">
            <div class="order__photo-box"><img src="img/menu-${item.name}.jpg" alt="${item.name}" class="order__photo"></div>
            <p class="order__name">${item.name}</p>
        </div>
        <div class="order__price-box">
            <p class="order__quantity">x${this.getItemsAmount(item.name)}</p>
            <p class="order__price">${(item.price * item.quantity).toFixed(2)}zł</p>
            <p class="order__ingredients">${this.hasIngredients(item)}
           </p>
        </div>
    </div>
    <div class="order__btn-container">
            ${this.checkMeal(item.name)}
       <button class="btn order__btn">Usuń</button>
    </div>`;
            orderList.appendChild(listItem);
        }
    }

    getItemsAmount(itemName) {
        let itemsAmount = this.items.filter(({ name }) => name == itemName).length;
        return itemsAmount;
    }

    removeItem(e) {
        if (e.target.textContent === 'Usuń') {
            let itemToRemoveIndex = this.items.indexOf(currentItem);
            this.items.splice(itemToRemoveIndex, 1);
            this.updateCartQuantity();
            this.updateCart();
            if (cart.items.length > 0) {
                this.setTotalPrice();
            } else {
                nav.closePreviousSections(previousSections);
                nav.openNextSection('menu');
                cartBtn.style.display = 'none';
            }
        }
    }

    updateCart() {
        this.emptyCart();
        this.items.forEach(item => {
            this.createCartItem(item);
        })
    }

    setTotalPrice() {
        const price = document.querySelector('.order__summary-price');
        price.textContent = this.getTotalPrice();
    }

    updateCartQuantity() {
        const totalQuantity = this.items.reduce((acc, { quantity }) => acc + quantity, 0);
        shoppingCartQuantity.textContent = totalQuantity;
    }

    getTotalPrice() {
        const totalPrice = this.items.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
        this.totalPrice = parseFloat(totalPrice.toFixed(2)) + this.getAllIngredientsPrice(this.items);
        return this.totalPrice.toFixed(2);
    }

    emptyCart() {
        shoppingCartQuantity.textContent = '';
        shoppingCartList.textContent = '';
        shoppingCartInfo.style.display = 'block';
        orderList.innerHTML = "";
        dotsBox.textContent = ''
    }

    openIngredientsSection(e) {
        nav.closePreviousSections(previousSections);
        nav.openNextSection(e.target.dataset.next);
        this.updateIngredientsPrice(currentItem);
        this.checkItemQuantity(currentItem);
        this.setInputsQuantity();
    }

    hasIngredients(item) {
        let ingredientsPrice = parseFloat(this.getIngredientsPriceFromSingleItem(item));
        if (ingredientsPrice > 0) {
            return `+dodatki: ${this.isMoreSameItems(item) ? this.getAllIngredientsPrice(sameItems).toFixed(2) :
                this.getIngredienstPriceFromSingleItem(item)}zł`
        } else {
            return '';
        }
    }

    isMoreSameItems(item) {
        const items = this.items.filter(({ name }) => name == item.name);
        sameItems = items;
        let isMore;
        items.length > 1 ? isMore = true : isMore = false;
        return isMore;
    }

    checkMeal(name) {
        if (name == 'Nachos' || name == 'Chips') {
            return '';
        } else {
            return `<button data-current="order" data-next="ingredients" class="btn order__btn" dataset-name="${name}">Dodaj składniki</button>`
        }
    }

    showPopup() {
        popup.classList.add('popup--open');
    }

    closePopUp() {
        popup.classList.remove('popup--open');
    }

    editItem(e) {
        if (e.target.textContent === 'Dodaj składniki') {
            this.openIngredientsSection(e);
        }
    }

    setInputsQuantity() {
        currentItem.ingredients.forEach(ingredient => {
            ingredientsInputs.forEach(input => {
                if (input.name == ingredient.name) {
                    input.value = ingredient.quantity;
                }
            })
        })
    }

    updateIngredientsPrice(item) {
        ingredientPrice.textContent = this.getIngredientsPriceFromSingleItem(item);
    }

    getIngredientsPriceFromSingleItem(item) {
        let ingredientPrice = item.ingredients.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
        return ingredientPrice.toFixed(2);
    }

    checkItemQuantity(item) {
        sameItems = this.items.filter(({ name }) => name == item.name);
        sameItemsQuantity = sameItems.length;
        dotsBox.textContent = '';
        arrowBox.style.display = 'none';
        if (sameItemsQuantity > 1) {
            this.showArrows();
            this.showDots(sameItemsQuantity);
            this.setFirstItemAsCurrent(sameItems);
            this.updateIngredientsPrice(currentItem);
        }
    }

    showArrows() {
        arrowBox.style.display = 'flex';
    }

    showDots() {
        dotsBox.innerHTML = '<p class="ingredients__dots-label">Burgery:</p> ';
        dotsBox.style.display = 'flex';
        for (let i = 0; i < sameItemsQuantity; i++) {
            const dot = document.createElement('div');
            dot.classList.add('ingredients__dots');
            dotsBox.appendChild(dot);
        }
    }

    setFirstItemAsCurrent(items) {
        currentItem = items[0];
        dots[0].classList.add('ingredients__dots--current');
    }

    changeCurrentItem(event) {
        if (event.target.closest('button').classList.contains('ingredients__arrow--right')) {
            index++;
            currentItem = sameItems[index];
            if (index >= sameItems.length) {
                index = 0;
                currentItem = sameItems[index];
                dots[sameItems.length - 1].classList.remove('ingredients__dots--current');
                dots[0].classList.add('ingredients__dots--current');
                this.setInputsQuantity();
                this.updateIngredientsPrice(currentItem);
            } else {
                currentItem = sameItems[index];
                dots[index - 1].classList.remove('ingredients__dots--current');
                dots[index].classList.add('ingredients__dots--current');
                this.setInputsQuantity();
                this.updateIngredientsPrice(currentItem);
            }
        } else {
            index--;
            currentItem = sameItems[index];
            if (index < 0) {
                index = sameItems.length - 1;
                currentItem = sameItems[index];
                dots[0].classList.remove('ingredients__dots--current');
                dots[sameItems.length - 1].classList.add('ingredients__dots--current');
                this.setInputsQuantity();
                this.updateIngredientsPrice(currentItem);
            } else {
                currentItem = sameItems[index];
                dots[index + 1].classList.remove('ingredients__dots--current');
                dots[index].classList.add('ingredients__dots--current');
                this.setInputsQuantity();
                this.updateIngredientsPrice(currentItem);
            }
        }
    }

    getAllIngredientsPrice(ingredients) {
        let ingredientPrice;
        let ingredientPrices = [];
        ingredients.forEach(item => {
            ingredientPrice = item.ingredients.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
            ingredientPrices.push(ingredientPrice)
        })
        return ingredientPrices.reduce((a, b) => a + b);
    }

    changeQuantity(btn) {
        const parent = btn.parentElement;
        const section = btn.name;
        let quantity = parent.querySelector(`.${section}__quantity`);
        if (btn.textContent == '+') {
            quantity.value++;
        } else {
            quantity.value--
        }
        if (section == 'menu')
            if (quantity.value < 1) {
                quantity.value = 1
            }
        if (section == 'ingredients') {
            if (quantity.value < 0) {
                quantity.value = 0
            }
            this.addIngredients(currentItem);
        }
    }

    setCurrentItem(e) {
        let currentItemName = e.target.closest('li').dataset.item;
        this.items.forEach(item => {
            if (item.name == currentItemName) {
                currentItem = item;
            }
        })
    }

    addIngredients(item) {
        ingredientsInputs.forEach(({ value, name }) => {
            let ingredientQuantity = value;
            let ingredientName = name;
            item.ingredients.forEach(item => {
                if (item.name == ingredientName) {
                    item.quantity = parseInt(ingredientQuantity);
                }
            })
        })
        this.updateIngredientsPrice(item);
    }
}
const cart = new ShoppingCart();