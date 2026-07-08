
document.addEventListener("DOMContentLoaded", () => {

    initializeRegister();

});

function initializeRegister(){

    togglePasswords();

    validateRegisterForm();

    passwordStrength();

}
function togglePasswords(){

    const password=document.getElementById("password");
    const confirm=document.getElementById("confirmPassword");

    const togglePassword=document.getElementById("togglePassword");
    const toggleConfirm=document.getElementById("toggleConfirmPassword");

    if(togglePassword){

        togglePassword.addEventListener("click",()=>{

            if(password.type==="password"){

                password.type="text";
                togglePassword.innerHTML=`<i data-lucide="eye-off"></i>`;

            }else{

                password.type="password";
                togglePassword.innerHTML=`<i data-lucide="eye"></i>`;

            }
            
            lucide.createIcons();

        });

    }

    if(toggleConfirm){

        toggleConfirm.addEventListener("click",()=>{

            if(confirm.type==="password"){

                confirm.type="text";
                toggleConfirm.innerHTML=`<i data-lucide="eye-off"></i>`;

            }else{

                confirm.type="password";
                toggleConfirm.innerHTML=`<i data-lucide="eye"></i>`;

            }
            
            lucide.createIcons();

        });

    }

}

function validateRegisterForm(){

    const form=document.querySelector("form");

    if(!form) return;

    form.addEventListener("submit",function(e){

        e.preventDefault();

        const name=document.getElementById("fullname").value.trim();
        const email=document.getElementById("email").value.trim();
        const password=document.getElementById("password").value;
        const confirm=document.getElementById("confirmPassword").value;

        const terms=document.querySelector(".terms input[type='checkbox']");

        if(fullname===""){

            alert("Please enter your full name.");
            return;

        }

        if(!validateEmail(email)){

            alert("Please enter a valid email.");
            return;

        }

        if(password.length<8){

            alert("Password must be at least 8 characters.");
            return;

        }

        if(password!==confirm){

            alert("Passwords do not match.");
            return;

        }

        if(!terms.checked){

            alert("Please accept Terms & Conditions.");
            return;

        }

        registerAnimation();

    });

}

function validateEmail(email){

    const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

function passwordStrength(){

    const password=document.getElementById("password");
    const indicator=document.getElementById("passwordStrength");

    if(!password || !indicator) return;

    password.addEventListener("input",()=>{

        const value=password.value;

        let strength="Weak";
        let color="#ef4444";

        if(value.length>=8){

            strength="Medium";
            color="#f59e0b";

        }

        if(
            value.length>=10 &&
            /[A-Z]/.test(value) &&
            /[0-9]/.test(value) &&
            /[^A-Za-z0-9]/.test(value)
        ){

            strength="Strong";
            color="#22c55e";

        }

        indicator.textContent="Password Strength : "+strength;
        indicator.style.color=color;

    });

}

function registerAnimation(){

    const button=document.querySelector(".register-button");

    if(!button) return;

    button.disabled=true;

    button.innerHTML=`
        <span class="spinner"></span>
        Creating Account...
    `;

    setTimeout(()=>{

        alert("🎉 Account Created Successfully!");

        window.location.href="login.html";

    },1800);

}

document.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        const form=document.querySelector("form");

        if(form){

            form.requestSubmit();

        }

    }

});

console.log("Mentora Register Loaded");