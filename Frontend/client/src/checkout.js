const baseServerUrl = `https://lazy-blue-cockroach-sari.cyclic.app/`
let paymentForm = document.getElementById("payment-form");
// cart total section elements
let otpPopup = document.querySelector(".otp-popup")
let otp= Math.floor(Math.random()*9999);
let otpConfirmBtn = document.getElementById("confirm-otp-btn");
let otpInput = document.getElementById("otp-input");

let paymentFormBtn = document.getElementById("payment-btn")



//function to fetch Cart data
// async function addtoOrders(){
//     try {
//     let res = await fetch(`${baseServerUrl}cart/ordered`);
//     let data = await res.json(); 
//     cartData = data
//      totalBill = data.reduce((acc,ele)=>{
//     //   orders.push(ele)
//         amt = ele.price*ele.quantity;
//         return acc + amt
//     },0);
//     // console.log(orders)
//     if(totalBill==0){
//       totalDiv.innerHTML = `<div>
//       <h2>YOUR CART IS EMPTY!!</h2>
//       <button id=postDataBtn>BACK TO HOME<button>
//       <div>`
//       paymentFormBtn.disabled=true;
//       let postOrdersBtn = document.getElementById("postDataBtn");
//       postOrdersBtn.addEventListener("click",()=>{
//       window.location.href ="index.html"
    
//       })
      
//     }else{
//       subTotal.textContent = "₹ " + totalBill +"/-";
//     tax.textContent = "₹ " + Math.round((totalBill*10)/100) +"/-";
//     grandTotal.textContent = "₹ " + (totalBill + Math.round((totalBill*10)/100))+"/-";
//     }
    
//     } catch (error) {
        
//     }
   
   
// }



// calling fetchCartData on window load
// window.addEventListener("load",()=>{
//     fetchCartData()
 
// })



// payment Btn functionality
paymentFormBtn.addEventListener("click",(e)=>{
e.preventDefault();
alert(`Your OTP for this transaction is ${otp}`)
setTimeout(() => {
    paymentForm.innerHTML="";
    otpPopup.classList.add("display-visible")
}, 1500);
paymentForm.innerHTML =  `<div class="lds-facebook"><div></div><div></div><div></div></div>`;
})

// OTP confirm btn functionality
otpConfirmBtn.addEventListener("click",()=>{

if(otpInput.value==otp){
    setTimeout(() => {
       otpPopup.innerHTML=`<div><h1>Your order has been successfully placed</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxRVMCr-Y1JPd_xh4euyjPZ8FQ4KnENw4uh6VpcjPIXg&s" alt="">
        <a href="index.html">BACK TO HOME</a>
        </div>` 
    }, 1000);
    otpPopup.innerHTML=`<div class="lds-facebook"><div></div><div></div><div></div></div>`; 
  
}
else{
    setTimeout(() => {
       otpPopup.innerHTML=`<h1>OOPS!! You have entered a wrong OTP</h1>` 
    }, 2000);
    otpPopup.innerHTML=`<div class="lds-facebook"><div></div><div></div><div></div></div>`;
}

})