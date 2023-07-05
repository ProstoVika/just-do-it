"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.progressBar=void 0;const products_1=require("./classes/products/products"),cartContainer=document.querySelector(".cart-container"),cartList=document.querySelector(".cart-list"),cartTotalValue=document.getElementById("cart-total-value"),cartCountInfo=document.getElementById("cart-count-info");let cartItemID=1;const productDOM=document.querySelector(".products-container");class MainController{constructor(){this.productList=new products_1.ProductList,this.updateView(),c}updateView(){this.productList.renderList(productDOM)}}const mainController=new MainController;let line=document.getElementById("line");const progressBar=()=>{let t=(document.body.scrollTop||document.documentElement.scrollTop)/(document.documentElement.scrollHeight-document.documentElement.clientHeight)*100;line.style.width=t+"%"};exports.progressBar=progressBar,window.addEventListener("scroll",exports.progressBar),window.addEventListener("DOMContentLoaded",(()=>{loadCart(),document.getElementById("cart-btn").addEventListener("click",(()=>{cartContainer.classList.toggle("show-cart-container")})),productDOM.addEventListener("click",purchaseProduct),cartList.addEventListener("click",deleteProduct)}));let getProductInfo=t=>{let e={id:cartItemID,image:t.querySelector(".product-img").src,title:t.querySelector(".product-name").textContent,company:t.querySelector(".company-btn").textContent,price:t.querySelector(".product-price").textContent};cartItemID++,addToCartList(e),saveProductInStorage(e)};const addToCartList=t=>{const e=document.createElement("div");e.classList.add("cart-item"),e.setAttribute("data-id",`${t.id}`),e.innerHTML=`\n        <img src = "${t.image}" alt = "product image">\n       <div class="cart-item-amount">\n             <i class="fa fa-chevron-up" data-id=${t.id}></i>\n               <p class="item-amount">${t.amount}</p>\n             <i class="fa fa-chevron-down" data-id=${t.id}></i>\n        </div> \n        <div class = "cart-item-info">\n            <h3 class = "cart-item-name">${t.title}</h3>\n             <span class = "company-btn">${t.company}</span>\n             <span class = "cart-item-price">$${t.price}</span>\n        </div>\n        \n        <button type = "button" class = "cart-item-del-btn">\n            <i class = "fas fa-times"></i>\n        </button>\n    `,cartList.appendChild(e)},purchaseProduct=t=>{if(t.target.classList.contains("bag-btn")){let e=t.target.parentElement.parentElement;getProductInfo(e)}},updateCartInfo=()=>{let t=findCartInfo();cartCountInfo.textContent=t.productCount,cartTotalValue.textContent=t.total},saveProductInStorage=t=>{let e=getProductFromStorage();e.push(t),localStorage.setItem("cart",JSON.stringify(e)),updateCartInfo()},getProductFromStorage=()=>localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],loadCart=()=>{let t=getProductFromStorage();t.length<1?cartItemID=1:(cartItemID=t[t.length-1].id,cartItemID++),t.forEach((t=>addToCartList(t))),updateCartInfo()};let findCartInfo=()=>{let t=getProductFromStorage();return{total:t.reduce(((t,e)=>t+parseFloat(e.price.substr(0))),0).toFixed(2),productCount:t.length}};const deleteProduct=t=>{let e;"BUTTON"===t.target.tagName?(e=t.target.parentElement,e.remove()):"I"===t.target.tagName&&(e=t.target.parentElement.parentElement,e.remove());let r=getProductFromStorage().filter((t=>t.id!==parseInt(e.dataset.id)));localStorage.setItem("cart",JSON.stringify(r)),updateCartInfo()};