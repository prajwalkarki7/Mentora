
document.addEventListener("DOMContentLoaded", () => {

    initializeLogin();

});

function initializeLogin(){

    togglePassword();

    validateForm();

    rememberUser();

}


function togglePassword(){
    const password = document.getElementById("password");
    const button = document.getElementById("togglePassword");

    if(!password || !button) return;

    button.addEventListener("click", () => {
        if(password.type === "password"){
            password.type = "text";
            button.innerHTML = `<i data-lucide="eye-off"></i>`;
        } else {
            password.type = "password";
            button.innerHTML = `<i data-lucide="eye"></i>`;
        }
        lucide.createIcons(); 
    });
}


function validateForm(){

    const form=document.querySelector("form");

    if(!form) return;

    form.addEventListener("submit",function(e){

        e.preventDefault();

        const email=document.getElementById("email").value.trim();

        const password=document.getElementById("password").value.trim();

        if(email===""){

            alert("Please enter your email.");

            return;

        }

        if(!validateEmail(email)){

            alert("Please enter a valid email.");

            return;

        }

        if(password===""){

            alert("Please enter your password.");

            return;

        }

        loginAnimation();

    });

}

function validateEmail(email){

    const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

function loginAnimation(){

    const button=document.querySelector(".login-button");

    if(!button) return;

    button.disabled=true;

    button.innerHTML=`
        <span class="spinner"></span>
        Logging In...
    `;

    setTimeout(()=>{

        window.location.href="../dashboard/dashboard.html";

    },1500);

}

function rememberUser(){

    const checkbox=document.querySelector('input[type="checkbox"]');

    const email=document.getElementById("email");

    if(!checkbox || !email) return;

    const saved=localStorage.getItem("mentora_email");

    if(saved){

        email.value=saved;

        checkbox.checked=true;

    }

    checkbox.addEventListener("change",()=>{

        if(checkbox.checked){

            localStorage.setItem(

                "mentora_email",

                email.value

            );

        }

        else{

            localStorage.removeItem("mentora_email");

        }

    });

}

document.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        const form=document.querySelector("form");

        if(form){

            form.requestSubmit();

        }

    }

});

console.log("Mentora Login Loaded");