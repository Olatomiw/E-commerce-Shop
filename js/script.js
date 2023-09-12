// Importing data from data.js and storing it
import { shopProducts } from "./data.js";


let products = shopProducts;
localStorage.setItem("productsData", JSON.stringify(products));
let storedProducts=JSON.parse(localStorage.getItem("productsData"));
let cartItemsContainer = document.getElementById('cart-items');
const productContainer = document.getElementById("product-container");
let cart_holder = document.querySelector(".cart-logo")
let cart = [];

// To add background to the cart logo at the top when users s
window.onscroll = ()=>{myScroll()};
const myScroll= ()=>{
    if(document.documentElement.scrollTop > 20 || document.body.scrollTop > 20){
        document.getElementById("E-logo").className="logo-background" + " logo-cart";
    } 
    else{
        document.getElementById("E-logo").className="logo-cart";
    }
}
// Cart display functonality
cart_holder.addEventListener("click", ()=>{
    cart.length==0? alert("your cart is empty"): document.querySelector(".cart-holder").style.display="block" 
})


// Creating product on the html with js
storedProducts.forEach((product)=>{
    if(product.category == "jewelry"){
        let productDiv = `<div class=product>
        <div class="f-cont">
            <div class="img-cont"><img src=${product.image}></div>
        </div>
        <p>Price: $${product.price}<p>
        <p>${product.name}</p>
        <button class = "addTo CartBtn" data-name="${product.name}" data-image="${product.image}" data-price="${product.price}" data-id="${product.id}" data-quantity ="${product.quantity}"> <span class="IconContainer"> 
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(252, 251, 251)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
      </span>
      <p class="text" data-name="${product.name}" data-image="${product.image}" data-price="${product.price}" data-id="${product.id}" data-quantity ="${product.quantity}">Add to Cart</p></button>
    </div>`;
    productContainer.innerHTML+=productDiv;
    }
    // Adding product to cart
    let addToCartButton = document.querySelectorAll('.CartBtn');
    addToCartButton.forEach((button)=>{
        button.addEventListener('click', function(event) {
            let productName = event.target.dataset.name;
            let productPrice = event.target.dataset.price;
            let productId = event.target.dataset.id;
            let productImg = event.target.dataset.image
            let productQty = event.target.dataset.quantity
            let existingItem = cart.find(function(item) {
            return item.id === productId;
            });
            if (existingItem) {
                alert(`${productName} is already in the cart.`);
            }
            else{
                let productItem = {id:productId, name: productName, price: productPrice, img:productImg, Qty:productQty };
                cart.push(productItem);
            }
            console.log(cart);
            renderCart();
        }) ;   
  });
});
// Rendering of cart functionality
function renderCart() {
        cartItemsContainer.innerHTML = '';
        let productTotal = document.querySelector("#cart-Total")
        let cartItem;
        cart.forEach(function(item, index) {
            cartItem = document.createElement('li');
            cartItem.innerHTML = `
            <div class="cart-list">
                <div class="cart-img">
                    <img src="${item.img}">
                </div>
                <div>
                    <p>${item.name}</p>
                </div> 
                <div class="counter-container">
                    <button class="decrement-button">-</button>
                        <span class="counter">${item.Qty}</span>
                 <button class="increment-button">+</button>
                </div>
                <div>
                <p class="cart-item-price">$${(item.price * item.Qty).toFixed(2)}</p>
                </div>
                <div><button class="delete-item" data-index="${index}">x</button></div>
            </div>`;
            cartItemsContainer.appendChild(cartItem);
            // Accessing the increment and decrement button
            const decrementButton = cartItem.querySelector('.decrement-button');
            const incrementButton = cartItem.querySelector('.increment-button');
            const quantityValue = cartItem.querySelector('.counter');
    
            decrementButton.addEventListener('click', () => {
                    if (item.Qty > 1) {
                      item.Qty--;
                      quantityValue.textContent = item.quantity;
                      renderCart();
                    }
                });
    
            incrementButton.addEventListener('click', () => {
                item.Qty++;
                quantityValue.textContent = item.quantity;
                renderCart();
              })
        });

        // Creating delete function
        let deleteButtons = document.querySelectorAll('.delete-item');
            deleteButtons.forEach((button)=> {
                    button.addEventListener('click', (event)=> {
                    let s_n = event.target.dataset.index;
                    cart.splice(s_n, 1);
                    renderCart();
                    // Set cart display to none when the cart is empty
                    if(cart.length == 0){
                        document.querySelector(".cart-holder").style.display="none"
                    }
                });
            });
        
            //   Number of items in the cart logo at the top of the page
            let cartNum = document.querySelector(".num")
            cartNum.innerHTML=cart.length;
};
