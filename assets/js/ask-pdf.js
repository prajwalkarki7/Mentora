
document.addEventListener("DOMContentLoaded", () => {

    initializeAskPDF();

});

function initializeAskPDF(){

    initializeTextarea();

    initializeSendButton();

    initializeSuggestions();

    initializeUpload();

    initializeClearChat();

    scrollToBottom();

}

function initializeTextarea(){

    const textarea=document.querySelector(".chat-input textarea");

    if(!textarea) return;

    textarea.addEventListener("input",function(){

        this.style.height="auto";

        this.style.height=this.scrollHeight+"px";

    });

}

function initializeSendButton(){

    const button=document.querySelector(".send-btn");

    const textarea=document.querySelector(".chat-input textarea");

    if(!button || !textarea) return;

    button.addEventListener("click",sendQuestion);

    textarea.addEventListener("keydown",function(e){

        if(e.key==="Enter" && !e.shiftKey){

            e.preventDefault();

            sendQuestion();

        }

    });

}


function sendQuestion(){

    const textarea=document.querySelector(".chat-input textarea");

    const question=textarea.value.trim();

    if(question==="") return;

    addUserQuestion(question);

    textarea.value="";

    textarea.style.height="auto";

    showTyping();

}

function addUserQuestion(text){

    const messages=document.querySelector(".messages");

    const html=`

    <div class="message user">

        <div class="bubble">

            <strong>You</strong>

            <p>${escapeHTML(text)}</p>

        </div>

        <div class="avatar user-avatar">

            P

        </div>

    </div>

    `;

    messages.insertAdjacentHTML("beforeend",html);

    scrollToBottom();

}


function showTyping(){

    const messages=document.querySelector(".messages");

    const html=`

    <div class="message ai typing-message">

        <div class="avatar ai-avatar">

            <i data-lucide="bot"></i>

        </div>

        <div class="bubble">

            <div class="typing">

                <span></span>

                <span></span>

                <span></span>

            </div>

        </div>

    </div>

    `;

    messages.insertAdjacentHTML("beforeend",html);

    if(window.lucide){

        lucide.createIcons();

    }

    scrollToBottom();

    setTimeout(generateAnswer,1800);

}


function generateAnswer(){

    const typing=document.querySelector(".typing-message");

    if(typing){

        typing.remove();

    }

    const response=`

According to the uploaded PDF:

Virtualization is a technology that allows one physical computer to run multiple virtual machines simultaneously.

Key points:

• Better hardware utilization

• Cost reduction

• Easy backup & recovery

• Scalability

• Improved security

When FastAPI + ChromaDB + Ollama are connected, this answer will be generated directly from your uploaded PDF.

`;

    addAIResponse(response);

}


function addAIResponse(text){

    const messages=document.querySelector(".messages");

    const html=`

    <div class="message ai">

        <div class="avatar ai-avatar">

            <i data-lucide="bot"></i>

        </div>

        <div class="bubble">

            <strong>Mentora AI</strong>

            <p>${formatText(text)}</p>

        </div>

    </div>

    `;

    messages.insertAdjacentHTML("beforeend",html);

    if(window.lucide){

        lucide.createIcons();

    }

    scrollToBottom();

}


function initializeSuggestions(){

    const suggestions=document.querySelectorAll(".suggestion-card");

    const textarea=document.querySelector(".chat-input textarea");

    suggestions.forEach(card=>{

        card.addEventListener("click",()=>{

            textarea.value=card.innerText.trim();

            textarea.focus();

            textarea.style.height="auto";

            textarea.style.height=textarea.scrollHeight+"px";

        });

    });

}


function initializeClearChat(){

    const button=document.querySelector(".clear-chat");

    if(!button) return;

    button.addEventListener("click",()=>{

        if(confirm("Clear conversation?")){

            location.reload();

        }

    });

}

function initializeUpload(){

    const uploadCard=document.querySelector(".upload-card");

    const browseButton=document.querySelector(".upload-card button");

    if(!uploadCard) return;

    const input=document.createElement("input");

    input.type="file";

    input.accept=".pdf";

    input.hidden=true;

    document.body.appendChild(input);

    browseButton.addEventListener("click",()=>{

        input.click();

    });

    uploadCard.addEventListener("click",()=>{

        input.click();

    });

    uploadCard.addEventListener("dragover",(e)=>{

        e.preventDefault();

        uploadCard.classList.add("dragging");

    });

    uploadCard.addEventListener("dragleave",()=>{

        uploadCard.classList.remove("dragging");

    });

    uploadCard.addEventListener("drop",(e)=>{

        e.preventDefault();

        uploadCard.classList.remove("dragging");

        const file=e.dataTransfer.files[0];

        if(file){

            handlePDF(file);

        }

    });

    input.addEventListener("change",(e)=>{

        if(e.target.files.length){

            handlePDF(e.target.files[0]);

        }

    });

}

function handlePDF(file){

    if(file.type!=="application/pdf"){

        alert("Please upload a PDF file.");

        return;

    }

    simulateUpload(file);

}

function simulateUpload(file){

    const uploadCard=document.querySelector(".upload-card");

    let progress=0;

    uploadCard.innerHTML=`

        <div class="upload-icon">

            <i data-lucide="loader-circle"></i>

        </div>

        <h2>Uploading...</h2>

        <p id="progressText">0%</p>

    `;

    lucide.createIcons();

    const interval=setInterval(()=>{

        progress+=5;

        document.getElementById("progressText").textContent=progress+"%";

        if(progress>=100){

            clearInterval(interval);

            addPDF(file);

        }

    },80);

}

function addPDF(file){

    const list=document.querySelector(".pdf-list");

    const item=document.createElement("div");

    item.className="pdf-item active";

    item.innerHTML=`

        <div class="pdf-icon">

            <i data-lucide="file-text"></i>

        </div>

        <div class="pdf-info">

            <h3>${file.name}</h3>

            <span>${(file.size/1024/1024).toFixed(2)} MB</span>

        </div>

        <button>Open</button>

    `;

    list.prepend(item);

    resetUploadCard();

    lucide.createIcons();

}

function resetUploadCard(){

    document.querySelector(".upload-card").innerHTML=`

        <div class="upload-icon">

            <i data-lucide="file-up"></i>

        </div>

        <h2>Upload Complete</h2>

        <p>Your PDF is ready for AI analysis.</p>

        <button>Upload Another PDF</button>

    `;

    lucide.createIcons();

}

function scrollToBottom(){

    const messages=document.querySelector(".messages");

    if(messages){

        messages.scrollTop=messages.scrollHeight;

    }

}


function formatText(text){

    return escapeHTML(text).replace(/\n/g,"<br>");

}

function escapeHTML(text){

    const div=document.createElement("div");

    div.innerText=text;

    return div.innerHTML;

}

async function uploadPDF(file){

    /*
    
    */

}

async function askPDF(question){

    /*
    
    */

}

console.log("Mentora Ask PDF Loaded Successfully");