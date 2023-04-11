import {
    ItemsInterface
} from './inter/interfaces';

const searchInput = document.querySelector('.search-txt') as HTMLInputElement | null;
const allButton = document.getElementById('all');
const redButton = document.getElementById('red');
const whiteButton = document.getElementById('white');
const roseButton = document.getElementById('rose');
const sparklingButton = document.getElementById('sparkling');
const reset = document.querySelector('#reset');
const cartContainer = document.querySelector('.cart-container');
const cartList = document.querySelector('.cart-list');
const cartTotalValue = document.getElementById('cart-total-value');
const cartCountInfo = document.getElementById('cart-count-info');
const slider = document.querySelector('.slider') as HTMLInputElement | null;
let rangeLabel = document.getElementById('range-label');
let cartItemID = 1;

const productDOM = document.querySelector(".products-container");
let products = JSON.parse(localStorage.getItem("products")) || [];

export class ProductList {
    public async fetchProducts(productDOM): Promise<void> {
        const response = await fetch("products.json");
        const data = await response.json();
        const cart = localStorage.getItem("cart") || "[]";
        localStorage.setItem("products", JSON.stringify(data));
        if (!cart) {
            localStorage.setItem("cart", "[]");
        }
        this.renderList(data, productDOM);
    }

    public renderList(items: ItemsInterface[]): void {
        let out = "";
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
            <span class="product-price">${product.price}</span>
          </div>
        </article>
      `;
        }
        productDOM.innerHTML = out;
    }
}
class NewProduct{
    productList: ProductList;
    constructor() {
        const vika : ProductList = new ProductList();
        vika.fetchProducts('');
        this.productList = vika;
    }
}
const  newProduct = new  NewProduct();

class Filter{
    private products: ProductList;
    private searchWord: string;
    private company: string;
    private priceRange: number;

    constructor(
        products: ProductList
    ) {
        this.products = products;
        this.searchWord = '';
        this.company = '';
        this.priceRange = 100;
    }

    setSearchWord(word: string): void {
        this.searchWord = word.trim().toLowerCase();
    }

    setCompany(company: string): void {
        this.company = company;
    }

    setPriceRange(price: number): void {
        this.priceRange = price;
    }

    filterProducts() {
        return this.products.filter((product) => {
            return (
                product.title.includes(this.searchWord) && (this.company ? product.company === this.company : true) && product.price <= this.priceRange
            );
        });
    }
}
const filter = new Filter(products);

const filterRender = (searchWord: string, company: string, priceRange: number): void => {
    filter.setSearchWord(searchWord);
    filter.setCompany(company);
    filter.setPriceRange(priceRange);
    filterRenderProducts();
};

const filterRenderProducts = (): void => {
    const filteredProducts = filter.filterProducts();
    newProduct.productList.renderList(filteredProducts);
};

redButton.addEventListener("click", (): void => {
    filterRender('', 'red', 100);
});

whiteButton.addEventListener("click", (): void => {
    filterRender('', 'white', 100);
});

roseButton.addEventListener("click", (): void => {
    filterRender('', 'rose', 100);
});

sparklingButton.addEventListener("click", (): void => {
    filterRender('', 'sparkling', 100);
});

allButton.addEventListener("click", (): void => {
    filterRender('', '', 100);
});

searchInput.addEventListener("keyup", (e:KeyboardEvent): void => {
    const value = (e.target as HTMLTextAreaElement).value;
    filter.setSearchWord(value);
    filterRenderProducts();
});

slider.addEventListener('input',(): void => {
    const price = parseInt(slider.value);
    rangeLabel.innerText = price + "$";
    filter.setPriceRange(price);
    filterRenderProducts();
});

reset.addEventListener('click', (): void => {
    filter.setSearchWord('');
    filter.setCompany('');
    filter.setPriceRange(100);
    filterRenderProducts();
});

let line = document.getElementById('line');
export const progressBar = (): void => {
    let windowScroll = document.body.scrollTop ||
        document.documentElement.scrollTop;
    let windowHeight = document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    let width_progress_line = windowScroll / windowHeight * 100;
    line.style.width = width_progress_line + '%';
}
window.addEventListener('scroll', progressBar);


window.addEventListener('DOMContentLoaded', (): void => {
    loadCart();
    document.getElementById('cart-btn').addEventListener('click', (): void => {
        cartContainer.classList.toggle('show-cart-container');
    });
    productDOM.addEventListener('click', purchaseProduct);
    cartList.addEventListener('click', deleteProduct);
});

let getProductInfo = (product: HTMLElement): void => {
    let productInfo = {
        id: cartItemID,
        image: product.querySelector ('.product-img').src,
        title: product.querySelector('.product-name').textContent,
        company: product.querySelector('.company-btn').textContent,
        price: product.querySelector('.product-price').textContent
    }
    /*   console.log(productInfo)*/
    cartItemID++;
    addToCartList(productInfo);
    saveProductInStorage(productInfo);
}


const addToCartList = (item: ItemsInterface): void => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', `${item.id}`);
    cartItem.innerHTML = `
        <img src = "${item.image}" alt = "product image">
       <div class="cart-item-amount">
             <i class="fa fa-chevron-up" data-id=${item.id}></i>
               <p class="item-amount">${item.amount}</p>
             <i class="fa fa-chevron-down" data-id=${item.id}></i>
        </div> 
        <div class = "cart-item-info">
            <h3 class = "cart-item-name">${item.title}</h3>
             <span class = "company-btn">${item.company}</span>
             <span class = "cart-item-price">$${item.price}</span>
        </div>
        
        <button type = "button" class = "cart-item-del-btn">
            <i class = "fas fa-times"></i>
        </button>
    `;
    cartList.appendChild(cartItem);
}


const purchaseProduct = (e) => {
    if(e.target.classList.contains('bag-btn')){
        /*console.log(e.target)*/
        let product = e.target.parentElement.parentElement;
        getProductInfo(product);
    }
}

const updateCartInfo = (): void =>{
    let cartInfo = findCartInfo();
    /* console.log(cartInfo)*/
    cartCountInfo.textContent = cartInfo.productCount;
    cartTotalValue.textContent = cartInfo.total;
}

const saveProductInStorage = (item: ItemsInterface): void => {
    let products = getProductFromStorage();
    /* console.log(products)*/
    products.push(item);
    localStorage.setItem('cart', JSON.stringify(products));
    updateCartInfo();
}

const getProductFromStorage = ()=> {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
}

const loadCart = (): void => {
    let products = getProductFromStorage();
    if(products.length < 1){
        cartItemID = 1; // if there is no any product in the local storage
    } else {
        cartItemID = products[products.length - 1].id;
        cartItemID++;
    }
    products.forEach(product => addToCartList(product));
    updateCartInfo();
}


let findCartInfo = () =>{
    let products = getProductFromStorage();
    // console.log(products);
    let total = products.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(0));
        return acc + price;
    }, 0);
   /* console.log(total)*/
    return{
        total: total.toFixed(2),
        productCount: products.length
    }
}

const deleteProduct = (e) => {
    /*console.log(e.target)*/
    let cartItem;
    if(e.target.tagName === "BUTTON"){
        cartItem = e.target.parentElement;
        cartItem.remove();
    } else if(e.target.tagName === "I"){
        cartItem = e.target.parentElement.parentElement;
        cartItem.remove();

    }
    let products = getProductFromStorage();
    let updatedProducts = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });
    localStorage.setItem('cart', JSON.stringify(updatedProducts));
    updateCartInfo(); /////big big
    /* console.log(products);
   console.log(updatedProducts);*/
}




/*
++++++++++++++first filter+++++++++
const filterItems = (): void => {
    const filterFlavor = products.filter(product => {
        return product.title.includes(searchWord) && (company ? product.company === company : true) && ( product.price <= slider.value);
    });
    newProduct.productList.renderList(filterFlavor);
};

searchInput.addEventListener("keyup", (e:KeyboardEvent): void => {
    let value = (e.target as HTMLTextAreaElement).value
    console.log(value, products)
    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase()
        searchWord = value
        filterItems()
    } else {
        searchWord = ''
        filterItems()
        resetFilterValue()
    }
})



slider.addEventListener('input',(): void => {
    rangeLabel.innerText = slider.value + "$";
    filterItems()
})


redButton.addEventListener("click", (): void => {
    company = 'red'
   filterItems()
})

whiteButton.addEventListener("click", (): void => {
    company = 'white'
    filterItems()
})
roseButton.addEventListener("click", (): void => {
    company = 'rose'
    filterItems()
})

sparklingButton.addEventListener("click", (): void => {
    company = 'sparkling'
    filterItems()
})
allButton.addEventListener("click", (): void => {
    company = ''
    filterItems()
})

let resetFilterValue = (): void => {
    searchInput.value = '';
    company = '';
    slider.value = '100';
    rangeLabel.innerText = '100$';
    filterItems()
}
reset.addEventListener('click', resetFilterValue);


*/



/*let getProductInfo = (product: HTMLElement): void => {
    let productId = parseInt(product.getAttribute('data-id'));
    let cartItem = cartList.querySelector(`.cart-item[data-id="${productId}"]`);
    if (cartItem) {
        let itemAmount = cartItem.querySelector('.item-amount');
        itemAmount.textContent = parseInt(itemAmount.textContent) + 1;

    } else {
        let productInfo = {
            id: cartItemID,
            image: product.querySelector('.product-img').src,
            title: product.querySelector('.product-name').textContent,
            company: product.querySelector('.company-btn').textContent,
            price: product.querySelector('.product-price').textContent,
            amount: 1
        }
        cartItemID++;
        addToCartList(productInfo);
        saveProductInStorage(productInfo);
    }
}*/


