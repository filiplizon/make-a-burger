class Item {
    constructor(name, price, imgSrc) {
        this.name = name;
        this.price = price;
        this.quantity = 1;
        this.imgSrc = imgSrc;
        this.ingredients = [{
                name: 'tomato',
                quantity: 0,
                price: 1.99
            },
            {
                name: 'cucumber',
                quantity: 0,
                price: 1.99
            },
            {
                name: 'pickles',
                quantity: 0,
                price: 1.99
            },
            {
                name: 'pepper',
                quantity: 0,
                price: 1.99
            },
            {
                name: 'bacon',
                quantity: 0,
                price: 2.99
            },
            {
                name: 'cheese',
                quantity: 0,
                price: 2.99
            }
        ]
    }

    createItem(name, price) {
        const quantity = document.querySelector(`[name='${name}']`);
        quantityValue = parseFloat(quantity.value);
        for (let i = 0; i < quantityValue; i++) {
            newItem = new Item(name, price);
            cart.items.push(newItem);
        }
        quantity.value = 1;
    }
}

const item = new Item();