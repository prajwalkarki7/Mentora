
document.addEventListener("DOMContentLoaded", () => {

    if (window.lucide) {
        lucide.createIcons();
    }

    initializeDashboard();

});

function initializeDashboard() {

    animateStatistics();

    initializeSearch();

    initializeButtons();

    initializeSidebar();

    initializeFloatingAI();

}

function animateStatistics() {

    const numbers = document.querySelectorAll(".stat-number");

    numbers.forEach(number => {

        const text = number.textContent.trim();

        if (text.includes("h")) return;

        const target = parseInt(text);

        if (isNaN(target)) return;

        let current = 0;

        const speed = Math.max(10, Math.floor(1200 / target));

        const counter = setInterval(() => {

            current++;

            number.textContent = current;

            if (current >= target) {

                clearInterval(counter);

                number.textContent = target;

            }

        }, speed);

    });

}

function initializeSearch() {

    const input = document.querySelector(".search-box input");

    if (!input) return;

    input.addEventListener("keydown", function(e){

        if(e.key==="Enter"){

            console.log("Searching:",this.value);

        }

    });

}

function initializeButtons() {

    document.querySelectorAll(".primary-btn,.secondary-btn,.resume-btn,.action-card button,.pdf-item button")
    .forEach(button=>{

        button.addEventListener("click",function(){

            console.log(this.innerText);

        });

    });

}

function initializeSidebar(){

    const sidebar=document.querySelector(".sidebar");

    if(!sidebar) return;

    document.addEventListener("keydown",function(e){

        if(e.key==="Escape"){

            sidebar.classList.remove("active");

        }

    });

}

function initializeFloatingAI(){

    const button=document.querySelector(".floating-ai");

    if(!button) return;

    button.addEventListener("click",()=>{

        console.log("Open AI Assistant");

    });

}

const notification=document.querySelector(".icon-btn");

if(notification){

notification.addEventListener("click",()=>{

notification.classList.add("active");

setTimeout(()=>{

notification.classList.remove("active");

},300);

});

}

const profile=document.querySelector(".profile-btn");

if(profile){

profile.addEventListener("click",()=>{

console.log("Profile");

});

}

document.querySelectorAll(".action-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-10px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px)";

});

});

document.querySelectorAll(".pdf-item").forEach(pdf=>{

pdf.addEventListener("click",()=>{

console.log("Open PDF");

});

});

document.querySelectorAll(".chat-item").forEach(chat=>{

chat.addEventListener("click",()=>{

console.log("Open Chat");

});

});

window.addEventListener("scroll",()=>{

const topbar=document.querySelector(".topbar");

if(!topbar) return;

if(window.scrollY>20){

topbar.style.transform="translateY(-2px)";

}

else{

topbar.style.transform="translateY(0px)";

}

});

const dashboard={

pdfs:12,

chats:148,

summaries:37,

studyHours:28

};

console.log("Mentora Dashboard Loaded");

console.table(dashboard);