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
        "name" : "product 1",
        "image": "../images/jhumka-img.png",
        "category" : "jewelry",
        "price" : 50,
        "description": "Orginal Gold Jewellery"
    },
    {
        "name" : "Kagan Bangles",
        "image" :"../images/kangan-img.png",
        "category" : "jewelry",
        "price" : 50,
        "description": "Orginal Gold Jewellery"
    },
    {
        "name" : "Necklace",
        "image" : "../images/neklesh-img.png",
        "category" : "jewelry",
        "price" : 50,
        "description": "Orginal Gold Jewellery"
    }
];

localStorage.setItem("productsData", JSON.stringify(products));

let storedProducts=JSON.parse(localStorage.getItem("productsData"));
console.log(storedProducts)

const productContainer = document.getElementById("product-container");
storedProducts.forEach((product)=>{
    if(product.category == "jewelry"){
        let productDiv = `<div class=product><h2>${product.name}</h2><img src=${product.image}>
    <p>Price: $${product.price}<p>
    <p>Description: ${product.description}</p>
    <button>Add to Cart</button></div>`;
    
    // document.createElement("div");
    // productDiv.classList.add("product")
    // productDiv.innerHTML=`<h2>${product.name}</h2>
    // <p>Price: $${product.price}<p>
    // <p>Description: ${product.description}</p>
    // <button>Add to Cart</button>`;

    // productContainer.innerHTML = ;

    productContainer.innerHTML+=productDiv;
    }
});