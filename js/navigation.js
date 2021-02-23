const buttons = document.querySelectorAll('.btn');
const links = document.querySelectorAll('.nav__item');
const logo = document.querySelector('.nav__logo');
const shoppingCart = document.querySelector('.shopping-cart');
const shoppingCartBtn = document.querySelector('.nav__shopping-cart');
const allLinks = [...buttons, ...links];

let previousSections = [];

allLinks.forEach(link => {
    link.addEventListener('click', () => {
        moveToNextSection(link);
    })
})

const moveToNextSection = (section) => {
    const nextSectionName = section.dataset.next;
    const currentSectionName = section.dataset.current;
    if (nextSectionName) {
        if (!previousSections.includes(currentSectionName)) {
            previousSections.push(currentSectionName);
        }
        if (!previousSections.includes(nextSectionName)) {
            previousSections.push(nextSectionName)
        }
        closePreviousSections(previousSections);
        openNextSection(nextSectionName);
    }
}

const openNextSection = next => {
    const nextState = document.querySelector(`.${next}`);
    nextState.classList.add(`${next}--open`);
}

const closePreviousSections = previousSections => {
    previousSections.forEach(section => {
        const previousSection = document.querySelector(`.${section}`);
        previousSection.classList.remove(`${section}--open`);
    })
}

const setShoppingCartVisibility = () => {
    shoppingCart.classList.toggle('shopping-cart--open');
}

const hideMenuByClickingOutside = (e) => {
    if (e.target != shoppingCart && e.target != shoppingCartBtn && e.target !== shoppingCartBtn.firstElementChild) {
        shoppingCart.classList.remove('shopping-cart--open');
    }
}

logo.addEventListener('click', () => {
    closePreviousSections(previousSections)
});

shoppingCartBtn.addEventListener('click', setShoppingCartVisibility);

document.body.addEventListener('click', e => {
    hideMenuByClickingOutside(e);
});