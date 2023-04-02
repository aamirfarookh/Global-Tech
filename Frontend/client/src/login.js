const baseServerUrl =  `https://lazy-blue-cockroach-sari.cyclic.app/`

let email = document.getElementById("email");
let pass = document.getElementById("pass");
let loginBtn = document.getElementById("lbtn")
let mainSection = document.getElementById("lform")
let alertNotification = document.getElementById("alert-notification");


loginBtn.addEventListener("click",()=>{
           fetchLogin()
})

async function fetchLogin(){
    try {
      let req = await fetch(`${baseServerUrl}/users/login`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            email:email.value,
            password:pass.value
        })
      });
      let res = await req.json();
      if(res.status == 200){
        localStorage.setItem("loginToken",res.token);
        localStorage.setItem("username",res.username)
        
        alertNotification.innerHTML = `<label>
        <input type="checkbox" class="alertCheckbox" autocomplete="off" />
        <div class="alert success">
          <span class="alertClose">X</span>
          <span class="alertText">Login Successful
          <br class="clear"/></span>
        </div>
      </label>`
      setTimeout(() => {
        window.location.href = "store.html"
      }, 2000);
      }
      if(res.status == 404){
        alertNotification.innerHTML = `<label>
        <input type="checkbox" class="alertCheckbox" autocomplete="off" />
        <div class="alert warning">
          <span class="alertClose">X</span>
          <span class="alertText">No user found with this ID. Please register
          <br class="clear"/></span>
        </div>
      </label>`
      }
      if(res.status == 400){
        alertNotification.innerHTML = `<label>
        <input type="checkbox" class="alertCheckbox" autocomplete="off" />
        <div class="alert error">
          <span class="alertClose">X</span>
          <span class="alertText">OOPS! Wrong credentials.
          <br class="clear"/></span>
        </div>
      </label>`
      }
    } catch (error) {
        console.log(error)
    }
}