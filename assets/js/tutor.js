
document.addEventListener("DOMContentLoaded", () => {

    initializeTutor();

});

function initializeTutor(){

    initializeTextarea();

    initializeSendButton();

    initializeSuggestedPrompts();

    initializeNewChat();

    initializeCopyButtons();

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

    const textarea=document.querySelector(".chat-input textarea");

    const button=document.querySelector(".send-btn");

    if(!textarea || !button) return;

    button.addEventListener("click",sendMessage);

    textarea.addEventListener("keydown",function(e){

        if(e.key==="Enter" && !e.shiftKey){

            e.preventDefault();

            sendMessage();

        }

    });

}

function sendMessage(){

    const textarea=document.querySelector(".chat-input textarea");

    if(!textarea) return;

    const message=textarea.value.trim();

    if(message==="") return;

    addUserMessage(message);

    textarea.value="";

    textarea.style.height="auto";

    showTyping();

}

function addUserMessage(message){

    const messages=document.querySelector(".messages");

    if(!messages) return;

    const time=getCurrentTime();

    const html=`

    <div class="message user">

        <div class="bubble">

            <div class="message-header">

                <strong>You</strong>

                <span>${time}</span>

            </div>

            <p>${escapeHTML(message)}</p>

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

    setTimeout(generateDemoResponse,1800);

}

function generateDemoResponse(){

    const typing=document.querySelector(".typing-message");

    if(typing){

        typing.remove();

    }

    const response=`

Artificial Intelligence helps computers perform tasks that normally require human intelligence.

Some examples include:

• Answering questions

• Image recognition

• Language translation

• Code generation

• Personalized tutoring

Once the FastAPI backend is connected, this response will come directly from your Ollama model instead of this demo text.

`;

    addAIMessage(response);

}

function addAIMessage(text){

    const messages=document.querySelector(".messages");

    const time=getCurrentTime();

    const html=`

    <div class="message ai">

        <div class="avatar ai-avatar">

            <i data-lucide="bot"></i>

        </div>

        <div class="bubble">

            <div class="message-header">

                <strong>Mentora AI</strong>

                <span>${time}</span>

            </div>

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

function initializeSuggestedPrompts(){

    const prompts=document.querySelectorAll(".prompt-card");

    const textarea=document.querySelector(".chat-input textarea");

    prompts.forEach(prompt=>{

        prompt.addEventListener("click",()=>{

            textarea.value=prompt.textContent.trim();

            textarea.focus();

            textarea.style.height="auto";

            textarea.style.height=textarea.scrollHeight+"px";

        });

    });

}

function initializeNewChat(){

    const button=document.querySelector(".new-chat");

    if(!button) return;

    button.addEventListener("click",()=>{

        if(confirm("Start a new conversation?")){

            location.reload();

        }

    });

}

function initializeCopyButtons(){

    document.addEventListener("click",(e)=>{

        const button=e.target.closest(".copy-code");

        if(!button) return;

        const code=button.closest(".code-message")
                         .querySelector("code")
                         .innerText;

        navigator.clipboard.writeText(code);

        const icon=button.innerHTML;

        button.innerHTML="✓";

        setTimeout(()=>{

            button.innerHTML=icon;

            if(window.lucide){

                lucide.createIcons();

            }

        },1200);

    });

}

function scrollToBottom(){

    const messages=document.querySelector(".messages");

    if(!messages) return;

    messages.scrollTop=messages.scrollHeight;

}

function getCurrentTime(){

    return new Date().toLocaleTimeString([],{

        hour:"2-digit",

        minute:"2-digit"

    });

}

function escapeHTML(text){

    const div=document.createElement("div");

    div.innerText=text;

    return div.innerHTML;

}

function formatText(text){

    return escapeHTML(text)

        .replace(/\n/g,"<br>");

}

async function sendToAI(message){

    /*
    ==================================================

    LATER REPLACE THIS FUNCTION ONLY

    Example:

    const response = await fetch("/api/chat",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            message:message
        })

    });

    const data=await response.json();

    addAIMessage(data.response);

    ==================================================
    */

    console.log("Backend message:",message);

}

const mic=document.querySelector(".tool-btn:nth-child(2)");

if(mic){

    mic.addEventListener("click",()=>{

        alert("Voice input will be available after backend integration.");

    });

}


const upload=document.querySelector(".tool-btn:nth-child(1)");

if(upload){

    upload.addEventListener("click",()=>{

        alert("PDF upload will be connected in the Ask PDF module.");

    });

}


console.log("Mentora AI Tutor Loaded Successfully");