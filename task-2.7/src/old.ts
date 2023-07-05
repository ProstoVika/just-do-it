

/*
import {ItemsInterface, ProductClass} from "../inter/interfaces";

export class ShoppingCart {
    private readonly cartContainer: HTMLElement | null;
    private readonly productsContainer: HTMLElement | null;
    private readonly cartList: HTMLElement | null;
    private cartTotalValue: HTMLElement;
    private cartCountInfo: HTMLElement;
    private cartItemID: number;
    private cart: ItemsInterface[];
    private line: HTMLElement;

    constructor() {
        this.cartContainer = document.querySelector('.cart-container');
        this.productsContainer = document.querySelector('.products-container');
        this.cartList = document.querySelector('.cart-list');
        this.cartTotalValue = document.getElementById('cart-total-value')!;
        this.cartCountInfo = document.getElementById('cart-count-info')!;
        this.cartItemID = 1;
        this.cart = [];
        this.line = document.getElementById('line')!;

        window.addEventListener('scroll', () => this.progressBar());
        this.eventListeners();
        this.loadCart();
    }

    private eventListeners(): void {
        window.addEventListener('DOMContentLoaded', () => {
            this.loadCart();
        });

        const cartButton = document.getElementById('cart-btn');
        if (cartButton) {
            cartButton.addEventListener('click', () => {
                if (this.cartContainer) {
                    this.cartContainer.classList.toggle('show-cart-container');
                }
            });

            if (this.productsContainer) {
                this.productsContainer.addEventListener('click', (e) => this.purchaseProduct(e));
            }
            if (this.cartList) {
                this.cartList.addEventListener('click', (e) => this.deleteProduct(e));/////мені потрібно це, бо я так видаляю продукт з кошика
            }
        }
    }

    private progressBar(): void {
        let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let width_progress_line = (windowScroll / windowHeight) * 100;
        this.line.style.width = String(width_progress_line) + '%';
    }

    private purchaseProduct(e: Event): void {
        const target = e.target as HTMLElement;
        if (target.classList.contains('bag-btn')) {
            const product = target.parentElement!.parentElement!;
            this.getProductInfo(product);
        }
    }

    private updateCartInfo(): void {

        const cartInfo = this.findCartInfo();
        this.cartCountInfo.textContent = cartInfo.productCount.toString();
        this.cartTotalValue.textContent = `${cartInfo.total}`;
    }

    private getProductById(productId: number): ItemsInterface | undefined { //////////додаю новий метод по пошуку id
        return this.cart.find(item => item.id === productId);
    }

    private getProductInfo = (product: HTMLElement): void => {
        const productImg = product.querySelector('.product-img') as HTMLImageElement;
        const productIdAgain = product.dataset.id;
        if (typeof productIdAgain === 'string') {      ////перевірю чи є це рядочком,  по суті зробила лише щоб помилка зникла
            const productId = parseInt(productIdAgain);
            if (!isNaN(productId)) {                  ////перевірю чи є id числом
                const existingProduct = this.getProductById(productId);
                if (existingProduct) {                  /////////якщо фляшку знаходить то збільшуємо в кошику на 1
                    existingProduct.amount += 1;
                    this.updateCartInfo();
                } else {                           //////якщо не знах прод то отримуємо інформ про нього .....??????
                    const productName = product.querySelector('.product-name')?.textContent;
                    const companyBtnText = product.querySelector('.company-btn')?.textContent;
                    const productPriceText = product.querySelector('.product-price')?.textContent;

                    if (productName && companyBtnText && productPriceText) {
                        const productInfo = new ProductClass(     ///////////створила новий об'єкт ProductClass з відповідною інформ продуктів
                            productId,
                            productImg.src,
                            productName,
                            companyBtnText,
                            parseFloat(productPriceText),
                            1
                        );
                        this.addToCartList(productInfo);             /////////////+ в кошик
                        this.saveProductInStorage(productInfo);      /////////////+ в локал стор
                    }
                }
            }
        }
    }

    private addToCartList(product: ItemsInterface): void {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.setAttribute('data-id', product.id.toString());
        cartItem.innerHTML = `
        <img src="${product.image}" alt="product image">
        <div class="cart-item-info">
            <h3 class="cart-item-name">${product.title}</h3>
            <span class="company-btn">${product.company}</span>
            <span class="cart-item-price">$${product.price}</span>
        </div>
        <div>
           <i class="fa fa-chevron-up" data-id=${product.id}></i>
            <p class="item-amount">${product.amount}</p>
            <i class="fa fa-chevron-down" data-id=${product.id}></i>
        </div>
        <button type="button" class="cart-item-del-btn">
            <i class="fas fa-times">remove</i>
        </button>
    `;
        const topButton: HTMLElement = cartItem.querySelector('.fa-chevron-up') as HTMLElement;
        topButton.addEventListener('click', () => {
            this.plusProductAmount(product.id);
            this.updateCartItemAmount(cartItem, product.amount);
            this.updateCartInfo();
        });

        const bottomButton: HTMLElement = cartItem.querySelector('.fa-chevron-down') as HTMLElement;
        bottomButton.addEventListener('click', () => {
            this.minusProductAmount(product.id);
            this.updateCartItemAmount(cartItem, product.amount);
            this.updateCartInfo();
        });
        if (this.cartList) {
            this.cartList.appendChild(cartItem);
        }
            }

    private plusProductAmount(productId: number): void {
        const product = this.getProductById(productId);
        if (product) {
            product.amount += 1;
            this.updateCartItemAmount(productId, product.amount);
        }
    }

    private minusProductAmount(productId: number): void {
        const product = this.getProductById(productId);
        if (product && product.amount > 1) {
            product.amount -= 1;
            this.updateCartItemAmount(productId, product.amount);
        }
    }
    private updateCartItemAmount(productId: number, quantity: number): void {
        const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
        const itemQuantity = cartItem?.querySelector('.item-amount');
        if (itemQuantity) {
            itemQuantity.textContent = quantity.toString();
        }
    }
    private saveProductInStorage(item: ItemsInterface) {
        this.cart.push(item);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartInfo();
    }

    private getProductFromStorage(): ItemsInterface[] {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    }

    private loadCart(): void {
        let products = this.getProductFromStorage();
        if (products.length < 1) {
            this.cartItemID = 1;
        } else {
            this.cartItemID = products[products.length - 1].id;
            this.cartItemID++;
        }

        products.forEach((product) => this.addToCartList(product));
        this.updateCartInfo();
    }

    private findCartInfo() {
        const products = this.getProductFromStorage();
        let total = products.reduce((acc, product) => {
            const price = parseFloat(product.price.toString());
            const quantity = product.amount;
            return acc + price * quantity;
        }, 0);
        return {
            total: total.toFixed(2),
            productCount: products.length,
        };
    }
    private deleteProduct(e: Event) {
        let cartItem: HTMLElement | null;
      /!*  if ((e.target as HTMLElement).tagName === 'BUTTON') {
            cartItem = (e.target as HTMLElement).parentElement;
            cartItem?.remove();
        } else if ((e.target as HTMLElement).tagName === 'I') {
            cartItem = (e.target as HTMLElement).parentElement!.parentElement;
            if (cartItem) {
                cartItem.remove();
            }
        }*!/


        if ((e.target as HTMLElement).classList.contains('cart-item-del-btn')) {
            cartItem = (e.target as HTMLElement).parentElement;
            cartItem?.remove();
        } else if ((e.target as HTMLElement).classList.contains('fa-times')) {
            cartItem = (e.target as HTMLElement).parentElement!.parentElement;
            if (cartItem) {
                cartItem.remove();
            }
        }
        let products = this.getProductFromStorage();
        let updatedProducts = products.filter((product) => {
            return cartItem && cartItem.dataset.id && product.id !== parseInt(cartItem.dataset.id);
        });
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
        this.cart = updatedProducts;                                        ////////обновила масив після видалення і це суттєво змінило содну проблемку

        this.updateCartInfo();
    }
}

*/






