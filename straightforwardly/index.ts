import {
    getProductInfoInterface,
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
const productsContainer= document.querySelector('.products-container');
const cartList = document.querySelector('.cart-list');
const cartTotalValue = document.getElementById('cart-total-value');
const cartCountInfo = document.getElementById('cart-count-info');
let cartItemID = 1;

let searchWord = ''
let company = ''

let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"));


fetch("products.json")

    .then(response => response.json())

    .then(data => {
        localStorage.setItem("products", JSON.stringify(data));
        console.log(localStorage.getItem("cart"));
        if (!localStorage.getItem("cart")) {
            localStorage.setItem("cart", "[]");
        }
        renderList(products)
    })


const renderList = (items: ItemsInterface[]): void => {
    let placeholder = document.querySelector(".products-container");
    let out = "";
    for (let product of items) {
        out += `
        <article class="product" data-id="${product.id}">
          <div class="img-container">
          <img src="${product.image}" class="product-img" alt="" />
           <button class="bag-btn" data-id=${product.id}>
              <i class="fa fa-shopping-cart"></i>ADD TO BAG</button>
           </div>
          <div class="product-footer">
            <h5 class="product-name">${product.title}</h5>
             <span class = "company-btn">${product.company}</span>
            <span class="product-price">${product.price}</span>
          </div>
        </article>
      `;
    }
    placeholder.innerHTML = out;
}

const filterItems = (): void => {
    const filterFlavor = products.filter(product => {
        return product.title.includes(searchWord) && (company ? product.company === company : true) && ( product.price <= slider.value);
    })
    renderList(filterFlavor)
}

    searchInput.addEventListener("keyup", (e:KeyboardEvent): void => {
    let value = (e.target as HTMLTextAreaElement).value
    /*console.log(value, products)*/
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

const slider = document.querySelector('.slider') as HTMLInputElement | null;
let rangeLabel = document.getElementById('range-label');
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


   window.addEventListener('DOMContentLoaded', (): void =>{
       loadCart();

    document.getElementById('cart-btn').addEventListener('click', (): void => {
        cartContainer.classList.toggle('show-cart-container');
    });
   productsContainer.addEventListener('click', purchaseProduct);
   cartList.addEventListener('click', deleteProduct);

   });

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
    console.log(total)
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


// REMOVING A PRODUCT FROM THE CART
 function removeItemFromCart(productId){

     localStorage.setItem("cart", JSON.stringify(temp));
}
 removeItemFromCart(3);

 // UPDATING THE PRODUCTS QUANTITY.
 function updateQuantity(productId, quantity){
     for(let product of cart){
        if(product.id == productId){
            product.quantity = quantity;
             product.price = product.price * quantity;
         }
     }
     localStorage.setItem("cart", JSON.stringify(cart));
 }
  updateQuantity(1, 8);


// // GET THE CART'S TOTAL SUM
 function getTotal(){
     let temp = cart.map(function(item){
         return parseInt(item.price);
     })

     let sum = temp.reduce(function(prev, next){
         return prev + next;
    }, 0);
     console.log(sum);
 }
  getTotal();


*/

/*
function addItemToCart(productId) {



   let product = products.find(function (product) {
        return product.id == productId;
     });

     if (cart.length == 0) {
        cart.push(product);
    } else {
         let res = cart.find(element => element.id == productId);
         if (res === undefined) {
             cart.push(product);
         }
     }

    localStorage.setItem("cart", JSON.stringify(cart));
 }

 addItemToCart('');

*/

//
//
//
// // ADDING A PRODUCT IN THE CART
// function addItemToCart(productId) {
//
//
//
//     let product = products.find(function (product) {
//         return product.id == productId;
//     });
//
//     if (cart.length == 0) {
//         cart.push(product);
//     } else {
//         let res = cart.find(element => element.id == productId);
//         if (res === undefined) {
//             cart.push(product);
//         }
//     }
//
//     localStorage.setItem("cart", JSON.stringify(cart));
// }
//
// addItemToCart('');
//
//
//
//
// // REMOVING A PRODUCT FROM THE CART
// function removeItemFromCart(productId){
//
//     let temp = cart.filter(item => item.id != productId);
//     localStorage.setItem("cart", JSON.stringify(temp));
// }
// removeItemFromCart(3);
//
//
// // UPDATING THE PRODUCTS QUANTITY.
// function updateQuantity(productId, quantity){
//     for(let product of cart){
//         if(product.id == productId){
//             product.quantity = quantity;
//             product.price = product.price * quantity;
//         }
//     }
//     localStorage.setItem("cart", JSON.stringify(cart));
// }
//  updateQuantity(1, 8);
//
//
// // GET THE CART'S TOTAL SUM
// function getTotal(){
//     let temp = cart.map(function(item){
//         return parseInt(item.price);
//     })
//
//     let sum = temp.reduce(function(prev, next){
//         return prev + next;
//     }, 0);
//     console.log(sum);
// }
//  getTotal();
//
//
//
//

