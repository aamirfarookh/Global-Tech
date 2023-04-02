const baseServerUrl = `https://lazy-blue-cockroach-sari.cyclic.app/`
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
let totalBill = 0;
let subTotal = document.getElementById("sub-total");
let tax = document.getElementById("tax");
let discount = document.getElementById("discount");
let grandTotal = document.getElementById("grand-total");
let paymentBtn = document.getElementById("payment-btn");

function makeCard(name,img,price,id,quantity){
    let card = `<div class="card">
        <img src=${img} alt=${name}/>
        <h3>${name.slice(0,20)}</h3>
        <h3>PRICE:- ₹${price}</h3>
        
        <div class="link-product" id="${id}">
        <button id ="decBtn" class="cartBtns">-</button>
        <span id="quantity">${quantity}</span>
        <button id="incBtn" class="cartBtns">+</button>
        <button class="link-product-buy cartBtns" id="remove">REMOVE</button>
        </div>
    </div>`;
    return card;
}

document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("cartBtns")) {
        
      const productDiv = event.target.closest("div");
     
      let id = productDiv.id
      const btns = document.getElementsByClassName("prodid");
      let quantity = productDiv.querySelector("span").textContent
      if(event.target.id == "incBtn"){
         if(quantity>=1){
            quantity= Number(quantity)+1
            
            console.log(id,quantity)
           updateCart(id,+quantity)
         }
      }
      if(event.target.id == "decBtn"){
        if(quantity>1){
           quantity-=1
           console.log(id,+quantity)
          
          updateCart(id,+quantity)
        }
     }
     if(event.target.id == "remove"){
        removeCart(id)
     }
    
      
    }
})


function renderCardList(data){
    cartItems.innerHTML =""
    let quantity = data.quantity
    let cardList = data.products.map((ele,i)=>{
        console.log(quantity[i])
     return makeCard(ele.name,ele.image[5],ele.price,ele._id,quantity[i])
   }).join("");
   cartItems.innerHTML = cardList 
   
}



async function updateCart(id,quantity){
    cartItems.innerHTML = `<div class="dot-spinner">
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
  </div>` 
    try {
        let req = await fetch(`${baseServerUrl}cart/update`,{
            method:"PATCH",
            headers:{
                "content-type":"application/json",
                authorization:localStorage.getItem("loginToken")
            },
            body:JSON.stringify({productId:id,quantity:quantity})
        });
        let res = await req.json();
        console.log(res)
        window.location.href ="cart.html"
    } catch (error) {
        console.log(error)
    }
}

async function removeCart(id){
    cartItems.innerHTML = `<div class="dot-spinner">
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
  </div>` 
    try {
        let req = fetch(`${baseServerUrl}cart/remove/${id}`,{
            method:"DELETE",
            headers:{
                "content-type":"application/json",
                authorization:localStorage.getItem("loginToken")
            }
        });
         let res =await req.json();
         console.log(res)
         window.location.href ="cart.html"
         
    } catch (error) {
       console.log(error) 
    }
}


paymentBtn.addEventListener("click",()=>{
    window.location.href = "checkout.html"
})







async function fetchCart(){
    cartItems.innerHTML = `<div class="dot-spinner">
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
  </div>` 
    try {
        let req = await fetch(`${baseServerUrl}cart`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
                authorization:localStorage.getItem("loginToken")
            }
        });
        let res = await req.json();
        console.log(res)
        renderCardList(res);
        let quantity = res.quantity
        totalBill = res.products.reduce((acc,ele,i)=>{
              return acc + (+(ele.price) * +(quantity[i]))
        },0)
        subTotal.innerText = `₹${totalBill} /-;`
        tax.innerText =  `₹${Math.round((totalBill*10)/100)} /-`;
        grandTotal.innerText = `₹${totalBill + Math.round((totalBill*10)/100)} /-`
    } catch (error) {
        console.log(error)
    }
}


window.addEventListener("load",()=>{
    fetchCart()
})