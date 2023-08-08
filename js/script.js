import { shopProducts } from "./data.js";
let products = shopProducts;
localStorage.setItem("productsData", JSON.stringify(products));
let storedProducts=JSON.parse(localStorage.getItem("productsData"));
// console.log(storedProducts)
var cartItemsContainer = document.getElementById('cart-items');
const productContainer = document.getElementById("product-container");

// To add background to the cart logo at the top when users s
window.onscroll = function(){myScroll()};
function myScroll (){
    if(document.documentElement.scrollTop > 20 || document.body.scrollTop > 20){
        document.getElementById("E-logo").className="logo-background" + " logo-cart";
    } 
    else{
        document.getElementById("E-logo").className="logo-cart";
    }
}
let cart = [];
console.log("hello")
// Creating product on the html with js
storedProducts.forEach((product)=>{
    if(product.category == "jewelry"){
        let productDiv = `<div class=product>
        <h2>${product.name}</h2>
        <div class="img-cont"><img src=${product.image}></div>
        <p>Price: $${product.price}<p>
        <p>Description: ${product.description}</p>
        <button class = "addTo CartBtn" data-name="${product.name}" data-image="${product.image}" data-price="${product.price}" data-id="${product.id}"> <span class="IconContainer"> 
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(252, 251, 251)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
      </span>
      <p class="text" data-name="${product.name}" data-image="${product.image}" data-price="${product.price}" data-id="${product.id}">Add to Cart</p></button>
    </div>`;
    productContainer.innerHTML+=productDiv;
    }
        // Add product to cart
    let addToCartButton = document.querySelectorAll('.CartBtn');
    addToCartButton.forEach((button)=>{
        button.addEventListener('click', function(event) {
        // console.log("eek")
            let productName = event.target.dataset.name;
            let productPrice = event.target.dataset.price;
            let productId = event.target.dataset.id;
            let productImg = event.target.dataset.image
            let existingItem = cart.find(function(item) {
            return item.id === productId;
            });
            if (existingItem) {
                alert(`${productName} is already in the cart.`);
            }
            else{
                let productItem = {id:productId, name: productName, price: productPrice, img:productImg };
                cart.push(productItem);
                console.log(typeof productId)
            }
            console.log(cart);
            renderCart();
        }) ;   
  });
});
// render cart
function renderCart() {
        cartItemsContainer.innerHTML = '';
        var productT = 0
        let productTotal = document.querySelector("#cart-Total")
        cart.forEach(function(item, index) {
            let newPrice = 2 * item.price;
            var cartItem = document.createElement('li');
            cartItem.innerHTML = `<div class="cart-list">
                <div class="cart-img"><img src="${item.img}"></div>
                <div><p>${item.name}</p></div> - <div><p>$${newPrice}</p></div>
                <div><button class="delete-item" data-index="${index}">x</button></div>
            </div>`;
            cartItemsContainer.appendChild(cartItem);
            // total of price
            let toNum = parseFloat(newPrice)
            productT +=toNum;
        });
        productTotal.innerHTML=`Total:$${productT}`;
        // Add event listener to the cart
        let deleteButtons = document.querySelectorAll('.delete-item');
            deleteButtons.forEach(function(button) {
                    button.addEventListener('click', function(event) {
                    let s_n = event.target.dataset.index;
                    cart.splice(s_n, 1);
                    renderCart();
                });
            });
        
            //   Number of items in the cart logo at the top of the page
            let cartNum = document.querySelector(".num")
            cartNum.innerHTML=cart.length;
};
