
document.addEventListener("DOMContentLoaded", () => {

    initializeProfile();

});

function initializeProfile(){

    initializeEditButton();

    updateAvatar();

}

function initializeEditButton(){

    const button=document.querySelector(".edit-btn");

    const inputs=document.querySelectorAll(".details-card input");

    let editing=false;

    button.addEventListener("click",()=>{

        editing=!editing;

        if(editing){

            inputs.forEach(input=>{

                input.removeAttribute("readonly");

            });

            button.innerHTML=`
                <i data-lucide="save"></i>
                Save Changes
            `;

        }else{

            if(!validateInputs()) return;

            inputs.forEach(input=>{

                input.setAttribute("readonly",true);

            });

            button.innerHTML=`
                <i data-lucide="square-pen"></i>
                Edit Profile
            `;

            updateAvatar();

            saveProfile();

        }

        if(window.lucide){

            lucide.createIcons();

        }

    });

}

function validateInputs(){

    const inputs=document.querySelectorAll(".details-card input");

    for(const input of inputs){

        if(input.value.trim()===""){

            alert("Please complete all fields.");

            input.focus();

            return false;

        }

    }

    return true;

}

function updateAvatar(){

    const name=document.querySelectorAll(".details-card input")[0].value;

    const avatar=document.querySelector(".avatar");

    const initials=name

        .split(" ")

        .map(word=>word[0])

        .join("")

        .substring(0,2)

        .toUpperCase();

    avatar.textContent=initials;

    document.querySelector(".profile-card h2").textContent=name;

}

function saveProfile(){

    const profile={

        name:document.querySelectorAll(".details-card input")[0].value,

        email:document.querySelectorAll(".details-card input")[1].value,

        country:document.querySelectorAll(".details-card input")[2].value,

        role:document.querySelectorAll(".details-card input")[3].value

    };

    localStorage.setItem(

        "mentoraProfile",

        JSON.stringify(profile)

    );

    console.log("Profile saved.");

}

function loadProfile(){

    const data=localStorage.getItem("mentoraProfile");

    if(!data) return;

    const profile=JSON.parse(data);

    const inputs=document.querySelectorAll(".details-card input");

    inputs[0].value=profile.name;

    inputs[1].value=profile.email;

    inputs[2].value=profile.country;

    inputs[3].value=profile.role;

    updateAvatar();

}


async function fetchProfile(){

    /*

    */

}

async function updateProfile(profile){

    /*

    */

}


loadProfile();

console.log("Mentora Profile Loaded Successfully");