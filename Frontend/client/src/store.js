const baseServerUrl = `http://localhost:4500`

let container = document.getElementById("product-container");
let categoryFilter = document.getElementById("category-filter");
let sortFilter = document.getElementById("sort-filter");
let searchInput = document.getElementById("search-input")
let searchBtn = document.getElementById("search-btn");
let addtoCart = document.getElementById("addtocart-btn")
let data =null
function makeCard(name,img,desc,price){
    let card = `<div class="card">
        <img src=${img} alt=${name}/>
        <h3>${name.slice(0,20)}</h3>
        <p>${desc.slice(0,100)}...</p>
        <h3>From ₹${price}</h3>
        <div class="link-product">
        <button >Know more</button>
        <button class="link-product-buy" id="addtocart-btn">Add to Bag</button>
        </div>
    </div>`;
    return card;
}

function renderCardList(data){
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
    setInterval(() => {
        let cardList = data.map((ele)=>{
            return makeCard(ele.name,ele.image[5],ele.description,ele.price)
          }).join("");
          container.innerHTML = cardList
    }, 1000);

  
}

let currentPage = 1;
    let totalPages = 1;
    let limit = 6;
    let flag;


// function renderPagination(data) {
//     const total = totalPages;
//     const pages = Math.ceil(total / limit);
  
//     const pagination = document.getElementById('pagination');
//     pagination.innerHTML = '';
  
//     for (let i = 0; i < pages; i++) {
//       const button = document.createElement('button');
//       button.innerText = i + 1;
//       if (page === i + 1) {
//         button.disabled = true;
//       } else {
//         button.addEventListener('click',()=>{
//             page = i+1;
//             fetchProducts();
//         });
//       }
//       pagination.append(button);
//     }
//   }

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
        fetchProducts(currentPage);
      });
      paginationContainer.appendChild(button);
    }
  }




// async function fetchProducts(page){
//     try {
//         let req = await fetch(`${baseServerUrl}/products?page=${page}&limit=${limit}`);
//         let res = await req.json();
//         console.log(res)
//         const products = res.data;
//         const totalProducts = res.total;
//         totalPages = Math.ceil(totalProducts / limit);
//          renderCardList(products)
//          renderPagination()
//     } catch (error) {
//         console.log(error)

//     }
// }

async function fetchProducts(page) {
    try {
      const response = await fetch(`${baseServerUrl}/products?page=${page}&limit=${limit}`);
      const res = await response.json();
      console.log(res)
      const products = res.data;
      const totalProducts = res.total;
      totalPages = Math.ceil(totalProducts / limit);
      renderPagination();
      renderCardList(products);
      
    } catch (error) {
      console.error(error);
    }
  }



window.addEventListener("load",()=>{
 fetchProducts(currentPage)   
})

// function fetchProducts(queryParamString = null) {
//     fetch(`${baseServerUrl}/products${queryParamString ? queryParamString : ""}`)
//       .then((res) => {
//         let totalCount = 13;
//         let totalPages = Math.ceil(totalCount / 3)
//         // console.log(totalCount, totalPages)
//         renderPagination(totalPages);
//         return res.json();
//       })
//       .then((data) => {
//         // console.log(data);
//         renderCardList(data.data);
//       });
//   }

//   function renderPagination(numOfPages) {
//     // console.log('i am invoked ', numOfPages)
  
//     function asListOfButtons() {
//       let arr = [];
//       for (let i = 1; i <=numOfPages; i++) {
//         arr.push(getAsButton(i));
//       }
//       // console.log(arr)
//       return arr.join('');
//     }

//     const paginationWrapper= document.getElementById('pagination');
  
//     paginationWrapper.innerHTML = `
//       <div>  
//         ${asListOfButtons()}  
//       </div>
//     `
  
//     // whenever this line executes, are we sure that the buttons are present on the dom? yes
  
//     let paginationButtons = document.querySelectorAll(".pagination-button");
//     for (let btn of paginationButtons) {
//       btn.addEventListener('click', (e) => {
//         let dataId = e.target.dataset.id;
//         console.log(dataId)
//         fetchProducts(`?limit=3&page=${+dataId}`);
//       })
//     }
//   }
  
//   // id=1
//   // <button class="pagination-button" data-id="1">1</button>
  
//   function getAsButton(pageNumber) {
//     return `<button class="pagination-button" data-id=${pageNumber}>${pageNumber}</button>`
//   }




  

