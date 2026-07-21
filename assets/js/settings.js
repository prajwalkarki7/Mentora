
document.addEventListener("DOMContentLoaded", () => {

    initializeSettings();

});


function initializeSettings(){

    loadSettings();

    initializeSaveButton();

    initializeDangerButtons();

    initializeTheme();

}

function initializeSaveButton(){

    const button=document.querySelector(".save-btn");

    if(!button) return;

    button.addEventListener("click",saveSettings);

}

function saveSettings(){

    const settings={

        name:document.getElementById("name").value,

        email:document.getElementById("email").value,

        password:document.getElementById("password").value,

        theme:document.getElementById("theme").value,

        response:document.getElementById("response").value,

        summary:document.getElementById("summary").value

    };

    localStorage.setItem(

        "mentoraSettings",

        JSON.stringify(settings)

    );

    alert("Settings saved successfully!");

}

function loadSettings(){

    const saved=localStorage.getItem("mentoraSettings");

    if(!saved) return;

    const settings=JSON.parse(saved);

    document.getElementById("name").value=settings.name || "";

    document.getElementById("email").value=settings.email || "";

    document.getElementById("password").value=settings.password || "";

    document.getElementById("theme").value=settings.theme || "dark";

    document.getElementById("response").value=settings.response || "Medium";

    document.getElementById("summary").value=settings.summary || "Paragraph";

}


function initializeTheme(){

    const selector=document.getElementById("theme");

    if(!selector) return;

    selector.addEventListener("change",()=>{

        const theme=selector.value;

        if(theme==="light"){

            document.body.classList.add("light-mode");

        }

        else{

            document.body.classList.remove("light-mode");

        }

    });

}

document.getElementById("clearHistory").addEventListener("click",()=>{

    if(confirm("Clear all history?")){

        localStorage.removeItem("mentoraHistory");

        alert("History cleared.");

    }

});

document.getElementById("clearPDF").addEventListener("click",()=>{

    if(confirm("Delete all uploaded PDFs?")){

        localStorage.removeItem("mentoraPDFs");

        alert("Uploaded PDFs removed.");

    }

});

async function fetchSettings(){

    /*   

    */

}

async function updateSettings(settings){

    /*
    

    */

}


console.log("Mentora Settings Loaded Successfully");