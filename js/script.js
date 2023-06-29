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
    },
    {
        "id" : 4,
        "name" : "Necklace",
        "image" : "../images/computer-img.png",
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
        let productDiv = `<div class=product><h2>${product.name}</h2><div class="img-cont"><img src=${product.image}></div>
    <p>Price: $${product.price}<p>
    <p>Description: ${product.description}</p>
    <button class = "addTo" data-name="${product.name}" data-image="${product.image}" data-price="${product.price}" data-id="${product.id}">Add to Cart</button></div>`;
    productContainer.innerHTML+=productDiv;
    }

    let addToCartButton = document.querySelectorAll('.addTo');
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
            var cartItem = document.createElement('li');
            cartItem.innerHTML = `<div class="cart-list"><div class="cart-img"><img src="${item.img}"></div><p>${item.name}</p> - <p>$${item.price}</p><button class="delete-item" data-index="${index}">x</button></div>`;
            cartItemsContainer.appendChild(cartItem);
            // total of price
            let toNum = parseFloat(item.price)
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
                    console.log(s_n)
                });
            });
        
            //   Number of items in the cart logo at the top of the page
            let cartNum = document.querySelector(".num")
            cartNum.innerHTML=cart.length;
};
