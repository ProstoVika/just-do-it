import {ProductInterface} from "../inter/interfaces";
import {Cart} from "./cart";

export const productDOM = document.querySelector(".products-container") as Element;

export class ProductList {
    private readonly productDOM: Element;
    private cart : Cart;
    constructor(productDOM: Element, cart: Cart) {
        this.productDOM = productDOM;
        this.cart = cart;
    }

    public getProducts(): ProductInterface[] {
        const productsData = localStorage.getItem("products");
        return productsData ? JSON.parse(productsData) : [];
    }

    public async fetchProducts(): Promise<void> {
        const response: Response = await fetch("./products.json");
        const data = await response.json();
        const cart: string = localStorage.getItem("cart") || "[]";
        localStorage.setItem("products", JSON.stringify(data));
        if (!cart) {
            localStorage.setItem("cart", "[]");
        }
    }
public renderList(items: ProductInterface[]): void {
    this.productDOM.innerHTML = "";
        for (let product of items) {
            const element : HTMLElement = document.createElement('article');
            element.classList.add('product');
            element.innerHTML = `
             <div class="img-container">
                    <img src="${product.image}" class="product-img" alt="" />
                    <button class="bag-btn" data-id="${product.id}">
                        <i class="fa fa-shopping-cart"></i>ADD TO BAG</button>
                </div>
                <div class="product-footer">
                    <h5 class="product-name">${product.title}</h5>
                    <span class="company-btn">${product.company}</span>
                    <span class="product-price">$${product.price}</span>
                </div> `;
            const button : HTMLButtonElement = element.querySelector('.bag-btn') as HTMLButtonElement;
            button.addEventListener('click', (event: Event): void =>{
                event.preventDefault();
                console.log("clicked");
                this.cart.addItem(product);
            })

        if (this.productDOM) {
            this.productDOM.appendChild(element)
        }
        }

}
/*   public  renderList(items: ProductInterface[]): void {
        let out: string = "";
        for (let product of items) {
            out += `
            <article class="product" data-id="${product.id}">
                <div class="img-container">
                    <img src="${product.image}" class="product-img" alt="" />
                    <button class="bag-btn" data-id="${product.id}">
                        <i class="fa fa-shopping-cart"></i>ADD TO BAG</button>
                </div>
                <div class="product-footer">
                    <h5 class="product-name">${product.title}</h5>
                    <span class="company-btn">${product.company}</span>
                    <span class="product-price">$${product.price}</span>
                </div>
            </article>
        `;
        }
        if (this.productDOM) {
            this.productDOM.innerHTML = out;
        }
    }*/

}

export class NewProduct{
    productList: ProductList;
    constructor(productDOM: Element) {
        const cart = new Cart();
        this.productList = new ProductList(productDOM, cart);
    }
}
export const newProduct = new NewProduct(productDOM);