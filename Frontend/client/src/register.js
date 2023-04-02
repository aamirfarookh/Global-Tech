const baseServerUrl = `https://lazy-blue-cockroach-sari.cyclic.app`

let fname = document.getElementById("firstname").value;
let lname = document.getElementById("lastname").value;
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;
let mobile = document.getElementById("phone-number").value;
let dob = document.getElementById("dob").value;
let street = document.getElementById("street").value;
let city = document.getElementById("city").value;
let state = document.getElementById("state").value;
let pincode = document.getElementById("pincode").value;
let country = document.getElementById("country").value;
let form = document.querySelector("form");
let alertNotification = document.getElementById("alert-notification");


form.addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log(fname,lname,email,password,mobile,dob,street,city,state,pincode,country)
    fetchRegistration()
})

let registrationObj = {
    firstName:fname,
    lastName:lname,
    email:email,
    password:password,
    address:{
        street:street,
        city:city,
        state:state,
        zipCode:pincode,
        country:country
    },
    phoneNumber:mobile
}



async function fetchRegistration(){
    try {
        let req = await fetch(`${baseServerUrl}/users/register`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(registrationObj)
        });
        let res = await req.json();
        console.log(res)
        if(res.status == 400){
            alertNotification.innerHTML = `<label>
            <input type="checkbox" class="alertCheckbox" autocomplete="off" />
            <div class="alert error">
              <span class="alertClose">X</span>
              <span class="alertText">Already a user, please login
              <br class="clear"/></span>
            </div>
          </label>`
        }
        if(res.status == 200){
            alertNotification.innerHTML = `<label>
            <input type="checkbox" class="alertCheckbox" autocomplete="off" />
            <div class="alert success">
              <span class="alertClose">X</span>
              <span class="alertText">Registartion Successful
              <br class="clear"/></span>
            </div>
          </label>`
          setTimeout(() => {
            window.location.href = "login.html"
          }, 1500);
        
        }
    } catch (error) {
        console.log(error.message)
        alertNotification.innerHTML = `<label>
            <input type="checkbox" class="alertCheckbox" autocomplete="off" />
            <div class="alert error">
              <span class="alertClose">X</span>
              <span class="alertText"> Internal Server Error!
              <br class="clear"/></span>
            </div>
          </label>`
    }
}



