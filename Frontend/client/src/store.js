const baseServerUrl = `https://lazy-blue-cockroach-sari.cyclic.app/`

let container = document.getElementById("product-container");
let categoryFilter = document.getElementById("category-filter");
let sortFilter = document.getElementById("sort-filter");
let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn");
let addtoCartBtns = document.getElementsByClassName("addtocart-btn")
let alertNotification = document.getElementById("alert-notification");


function makeCard(name,img,desc,price,id){
    let card = `<div class="card">
        <img src=${img} alt=${name}/>
        <h3 class="prodid">${id}</h3>
        <h3>${name.slice(0,20)}</h3>
        <p id=${id}>${desc.slice(0,60)}...</p>
        <h3>From ₹${price}</h3>
        <div class="link-product">
        <button >Know more</button>
        <button class="link-product-buy addtocart-btn" id="${id}">Add to Bag</button>
        </div>
    </div>`;
    return card;
}

document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("addtocart-btn")) {
    const productDiv = event.target.closest("div");
    const btns = document.getElementsByClassName("prodid");
    addtoCart(event.target.id)
    
  }
});

function renderCardList(data){
     let cardList = data.map((ele)=>{
      return makeCard(ele.name,ele.image[5],ele.description,ele.price,ele._id)
    }).join("");
    container.innerHTML = cardList 
    
}

    let currentPage = 1;
    let totalPages = 1;
    let limit = 3;
    let flag;

    async function fetchProducts(page,search=null,category=null,sort=null) {
      container.innerHTML = `<div class="dot-spinner">
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
        const response = await fetch(`${baseServerUrl}/products?page=${page}&limit=${limit}&category=${category ? category: ""}&sort=${sort ? sort: ""}&search=${search ? search: ""}`);
        const res = await response.json();
        console.log(res)
        const products = res.data;
        const totalProducts = res.total;
        totalPages = Math.ceil(totalProducts / limit);
        renderCardList(products);
        renderPagination();
        // for(let i=0;i<addtoCartBtns.length;i++){
        //   addtoCartBtns[i].addEventListener("click",()=>{
        //       addtoCart(addtoCartBtns[i].id)
        //   })
        // }
      } catch (error) {
        setTimeout(() => {
          alertNotification.innerHTML=`<label>
          <input type="checkbox" class="alertCheckbox" autocomplete="off" />
          <div class="alert error">
            <span class="alertClose">X</span>
            <span class="alertText">Redurecting to home page, server is down. Please check back later!
            <br class="clear"/></span>
          </div>
        </label>`
        console.log(error)
        }, 4000);
        setTimeout(() => {
          window.location.href="index.html"
        }, 8000);
      }
    }
   
    fetchProducts(currentPage)  
    

function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.innerText = i;
      if (i === currentPage) {
        button.classList.add('active');
      }
      button.addEventListener('click', () => {
        flag =true
        currentPage = i;
        fetchProducts(currentPage,searchInput.value,categoryFilter.value,sortFilter.value);
      });
      paginationContainer.appendChild(button);
    }
  }


  searchBtn.addEventListener("click",()=>{
     fetchProducts(1,searchInput.value)
  })

  categoryFilter.addEventListener("change",()=>{
      fetchProducts(currentPage,searchInput.value,categoryFilter.value)
  })

  sortFilter.addEventListener("change",()=>{
    fetchProducts(currentPage,searchInput.value,categoryFilter.value,sortFilter.value)
  })


  async function addtoCart(id){
       try {
        let req = await fetch(`${baseServerUrl}/cart/add`,{
          method:"POST",
          headers:{
            "content-type":"application/json",
            authorization: localStorage.getItem("loginToken")
          },
          body:JSON.stringify({productId:id})
        });
        let res = await req.json();
        console.log(res)
        if(res.status == 403 || res.status == 401){
          alertNotification.innerHTML=`<label>
          <input type="checkbox" class="alertCheckbox" autocomplete="off" />
          <div class="alert error">
            <span class="alertClose">X</span>
            <span class="alertText">Please Login first!
            <br class="clear"/></span>
          </div>
        </label>`
        }
        else if(res.status == 400){
          alertNotification.innerHTML=`<label>
          <input type="checkbox" class="alertCheckbox" autocomplete="off" />
          <div class="alert warning">
            <span class="alertClose">X</span>
            <span class="alertText">Product already in bag!
            <br class="clear"/></span>
          </div>
        </label>`
        }
        else if(res.status==200){
          alertNotification.innerHTML=`<label>
          <input type="checkbox" class="alertCheckbox" autocomplete="off" />
          <div class="alert success">
            <span class="alertClose">X</span>
            <span class="alertText">Product added to bag!
            <br class="clear"/></span>
          </div>
        </label>`
        }
       } catch (error) {
        console.log(error)
        
       }
  }


 




  

