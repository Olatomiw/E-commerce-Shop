// let arr = [];
// // arr_input.addEventListener("click", ()=>{
// // })

// function buttonHandle(button){
//     let inputs = document.getElementsByClassName("input")

//     for(i=0; i<inputs.length; i++){
//         if(inputs[i] === button){
//             arr.push(inputs[i].value)
//         };
//     };
//     // arr.push(arr_input.value)
//     console.log(arr)
//     console.log(button);
// }

let products = [
    {
        "id" : 1,
        "name" : "product 1",
        "image": "../images/jhumka-img.png",
        "category" : "jewelry",
        "price" : 50,
        "description": "Orginal Gold Jewellery"
    },
    {
        "id" : 2,
        "name" : "Kagan Bangles",
        "image" :"../images/kangan-img.png",
        "category" : "jewelry",
        "price" : 50,
        "description": "Orginal Gold Jewellery"
    },
    {
        "id" : 3,
        "name" : "Necklace",
        "image" : "../images/neklesh-img.png",
        "category" : "jewelry",
        "price" : 50,
        "description": "Orginal Gold Jewellery"
    }
];

localStorage.setItem("productsData", JSON.stringify(products));

let storedProducts=JSON.parse(localStorage.getItem("productsData"));
// console.log(storedProducts)
var cartItemsContainer = document.getElementById('cart-items');
const productContainer = document.getElementById("product-container");

let cart = [];
console.log("hello")
storedProducts.forEach((product)=>{
    if(product.category == "jewelry"){
        let productDiv = `<div class=product><h2>${product.name}</h2><img src=${product.image}>
    <p>Price: $${product.price}<p>
    <p>Description: ${product.description}</p>
    <button class = "addTo" data-name="${product.name}" data-price="${product.price}" data-id="${product.id}">Add to Cart</button></div>`;
    productContainer.innerHTML+=productDiv;
    }

    let addToCartButton = document.querySelectorAll('.addTo');
    addToCartButton.forEach((button)=>{
        button.addEventListener('click', function(event) {
        // console.log("eek")
        let productName = event.target.dataset.name;
        let productPrice = event.target.dataset.price;
        let productId = event.target.dataset.id;
        let existingItem = cart.find(function(item) {
            return item.id === productId;
          });
          if (existingItem) {
            alert(`${productName} is already in the cart.`);
        }
        else{
            let productItem = {id:productId, name: productName, price: productPrice };
            cart.push(productItem);
        }
        console.log(cart);
        // console.log(productItem.id)
    }) ;   
    // renderCart();
  });
});

function renderCart() {
    cartItemsContainer.innerHTML = '';
    cart.forEach(function(item) {
      var cartItem = document.createElement('li');
      cartItem.textContent = `${item.name} - $${item.price}`;
      cartItemsContainer.appendChild(cartItem);
    });
  }
// chatGpt