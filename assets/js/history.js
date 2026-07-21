
document.addEventListener("DOMContentLoaded", () => {

    initializeHistory();

});

function initializeHistory(){

    initializeFilters();

    initializeSearch();

    initializeDeleteButtons();

    initializeOpenButtons();

}

function initializeFilters(){

    const buttons=document.querySelectorAll(".filter-btn");

    const cards=document.querySelectorAll(".history-card");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            buttons.forEach(btn=>btn.classList.remove("active"));

            button.classList.add("active");

            const filter=button.textContent.trim().toLowerCase();

            cards.forEach(card=>{

                if(filter==="all"){

                    card.style.display="flex";

                    return;

                }

                if(filter==="ai tutor"){

                    card.style.display=card.classList.contains("tutor") ? "flex":"none";

                    return;

                }

                if(filter==="ask pdf"){

                    card.style.display=card.classList.contains("pdf") ? "flex":"none";

                    return;

                }

                if(filter==="summaries"){

                    card.style.display=card.classList.contains("summary") ? "flex":"none";

                }

            });

        });

    });

}

function initializeSearch(){

    const input=document.querySelector(".search-box input");

    const cards=document.querySelectorAll(".history-card");

    if(!input) return;

    input.addEventListener("keyup",()=>{

        const keyword=input.value.toLowerCase();

        cards.forEach(card=>{

            const title=card.querySelector("h3").textContent.toLowerCase();

            card.style.display=title.includes(keyword) ? "flex":"none";

        });

    });

}

function initializeOpenButtons(){

    const buttons=document.querySelectorAll(".history-actions button:first-child");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            const title=button
                .closest(".history-card")
                .querySelector("h3")
                .textContent;

            alert("Opening:\n\n"+title);

            /*
            Later

            window.location.href="tutor.html?id=123";

            or

            fetch("/history/12")
            */

        });

    });

}

function initializeDeleteButtons(){

    const buttons=document.querySelectorAll(".history-actions button:last-child");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            const card=button.closest(".history-card");

            const title=card.querySelector("h3").textContent;

            if(confirm(`Delete "${title}" ?`)){

                card.style.opacity="0";

                card.style.transform="translateX(50px)";

                setTimeout(()=>{

                    card.remove();

                    checkEmpty();

                },300);

            }

        });

    });

}

function checkEmpty(){

    const list=document.querySelectorAll(".history-card");

    if(list.length>0) return;

    const content=document.querySelector(".content");

    const empty=document.createElement("div");

    empty.className="empty-state";

    empty.innerHTML=`

        <div class="empty-icon">

            📂

        </div>

        <h2>No History Found</h2>

        <p>

            Your AI Tutor chats, PDFs and Summaries
            will appear here.

        </p>

    `;

    content.appendChild(empty);

}

async function loadHistory(){

    /*


    */

}

async function deleteHistory(id){

    /*


    */

}


console.log("Mentora History Loaded Successfully");