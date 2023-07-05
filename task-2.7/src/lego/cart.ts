import {CartItemsClass, CartItemsInterface, ProductInterface} from "../inter/interfaces";

export class Cart {
    private items: CartItemsInterface[] = [];
    private cartData: string = '';
    readonly cartContainer: HTMLElement | null;

    constructor() {
        this.cartContainer = document.querySelector('.cart-container');
        this.initListeners();
    }

    private initListeners(): void {
        document.addEventListener('DOMContentLoaded', (): void => {
            const cartButton = document.getElementById('cart-btn');
            if (cartButton) {
                cartButton.addEventListener('click', () => {
                    if (this.cartContainer) {
                        this.cartContainer.classList.toggle('show-cart-container');
                        console.log('It works?');
                    }
                });
            }
        });
    }

    public getTotalItemsCount(): number {
        return this.items.length;
    }

    public clearCart(): void {
        this.items = [];
        this.displayCartItems(); /////////=====
    }

    public removeItem(item: CartItemsInterface): void {
        const elementId = `item-${item.id}`; // Идентификатор элемента в формате "item-{id}"
        const cartElement = document.getElementById(elementId);
        if (cartElement) {
            cartElement.remove();
        }

        const index = this.items.findIndex((i) => i.id === item.id);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.updateTotalPrice();
        }
    }

    public changeItemQuantity(item: CartItemsInterface, quantity: number): void {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            if (quantity > 0) {
                const previousQuantity = item.quantity;
                item.quantity = quantity;
                const elementId = `item-${item.id}`;
                const quantityElement = document.getElementById(elementId)?.querySelector('.item-quantity');
                if (quantityElement) {
                    quantityElement.textContent = String(quantity);
                }

                const totalPriceElement = document.getElementById('total-price');
                if (totalPriceElement) {
                    const totalPrice = parseFloat(totalPriceElement.textContent || '0');
                    const priceDifference = (item.product.price * (quantity - previousQuantity));
                    totalPriceElement.textContent = (totalPrice + priceDifference).toFixed(2);
                }
                this.updateTotalPrice();
            } else {
                console.log('Значення кількості повинно бути більше 0');
            }
        }
    }

    public displayCartItems(): void {
        const cartCountInfo = document.getElementById('cart-count-info');

        if (cartCountInfo !== null && this.cartContainer) {
            this.cartContainer.innerHTML = '';
            const totalPriceElement = document.getElementById('total-price');
            if (totalPriceElement) {
                totalPriceElement.textContent = this.calculateTotalPrice().toFixed(2);
            }
            for (let item of this.items) {
                const cartElement = document.createElement('article');
                cartElement.id = `item-${item.id}`;
                cartElement.classList.add('item');
                cartElement.innerHTML = `
         <img src="${item.product.image}" alt="product image">
        <div class="cart-item-info">
            <h3 class="cart-item-name">${item.product.title}</h3>
            <span class="company-btn">${item.product.company}</span>
            <span class="cart-item-price">${item.product.price}</span>
        </div>
        <div>
           <i class="fa fa-chevron-up" data-id=${item.id}></i>
            <p class="item-quantity">${item.quantity}</p>
            <i class="fa fa-chevron-down" data-id=${item.id}></i>
        </div>
        
        <button type="button" class="cart-item-del-btn">
            <i class="fas fa-times">remove</i>        
        </button>  `;
                const removeButton = cartElement.querySelector('.cart-item-del-btn') as HTMLButtonElement;////додала прослуховувач подій, при натис на кнопку метод ремувІтем викликається
                if (removeButton) {
                    removeButton.addEventListener('click', () => {
                        this.removeItem(item);
                    });
                }
                const topButton = cartElement.querySelector(".fa-chevron-up") as HTMLElement;
                const bottomButton = cartElement.querySelector(".fa-chevron-down") as HTMLElement;

                if (topButton && bottomButton) {
                    topButton.addEventListener("click", () => {
                        this.changeItemQuantity(item, item.quantity + 1);
                        console.log(` є `);
                    });

                    bottomButton.addEventListener("click", () => {
                        if (item.quantity > 1) {
                            this.changeItemQuantity(item, item.quantity - 1);
                            console.log(`є `);
                        }
                    });
                }
                this.cartContainer.appendChild(cartElement);
            }
            cartCountInfo.textContent = String(this.getTotalItemsCount());
            this.updateTotalPrice();

        }
    }

    public addItem(item: ProductInterface): void {
        const existingItem: CartItemsInterface | undefined = this.items.find((i) => i.product === item);  //щоб не було клонів
        if (existingItem) {
            existingItem.quantity++;
        } else {
            const newItem: CartItemsClass = new CartItemsClass(
                new Date().getTime(),
                item,
                1,
            );
            this.items.push(newItem);
        }

        const totalPrice = this.calculateTotalPrice();
        console.log('Total Price:', totalPrice); // заг сума є

        this.displayCartItems();

    }

    public calculateTotalPrice(): number {
        let totalPrice = 0;
        for (const item of this.items) {
            totalPrice += item.product.price * item.quantity;
        }
        return totalPrice;
    }

    private updateTotalPrice(): void {
        const totalPriceElement = document.getElementById("total-price");
        if (totalPriceElement) {
            const totalPrice = this.calculateTotalPrice().toFixed(2);
            console.log(totalPrice);
            totalPriceElement.textContent = totalPrice;
        }
    }

    public getItems(): CartItemsInterface[] {                     //////////створила метод, а він поверне масив вибраних товарів
        return this.items;
    }

    public saveCart(): void {
        this.cartData = JSON.stringify(this.items);
    }

    public getCartData(): string {
        return this.cartData;
    }

    public loadCart(cartData: string): void {          //////////створила метод, а він загрузить їх також відновить напевно
        this.items = JSON.parse(cartData);
        this.displayCartItems();
    }
}

export const cart = new Cart();