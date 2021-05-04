class Navigation {
    setShoppingCartVisibility() {
        shoppingCart.classList.toggle("shopping-cart--open");
    }

    hideCartByClickingOutside(e) {
        if (
            e.target != shoppingCart &&
            e.target != shoppingCartBtn &&
            e.target !== shoppingCartBtn.firstElementChild
        ) {
            shoppingCart.classList.remove("shopping-cart--open");
        }
    }

    moveToNextSection(nextSection, currentSection, e) {
        if (nextSection) {
            if (!previousSections.includes(currentSection)) {
                previousSections.push(currentSection);
            }
            if (!previousSections.includes(nextSection)) {
                previousSections.push(nextSection);
            }
            this.closePreviousSections(previousSections);
            this.openNextSection(nextSection);
        }
    }

    closePreviousSections(previousSections) {
        previousSections.forEach(section => {
            const previousSection = document.querySelector(`.${section}`);
            previousSection.classList.remove(`${section}--open`);
        });
    }

    openNextSection(next) {
        const nextState = document.querySelector(`.${next}`);
        nextState.classList.add(`${next}--open`);
        if (next === "about") {
            cart.closePopUp();
        }
        if (next === "menu" && cart.items.length) {
            cart.items.forEach(item => cart.createCartItem(item));
            cart.updateCartQuantity();
        }
        if (next === "order") {
            cart.updateCart();
            cart.setTotalPrice();
        }
        if (next === "summary") {
            cartBtn.style.display = "none";
            cart.items = [];
            cart.emptyCart();
            summary.setTime();
        }
    }
}

const nav = new Navigation();