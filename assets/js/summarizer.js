/*==================================================
MENTORA AI SUMMARIZER
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeSummarizer();

});

/*==================================================
INITIALIZE
==================================================*/

function initializeSummarizer(){

    initializeTextarea();

    initializeGenerateButton();

    initializeUpload();

    initializeCopyButton();

    initializeDownloadButton();

    initializeShareButton();

}

/*==================================================
AUTO EXPAND TEXTAREA
==================================================*/

function initializeTextarea(){

    const textarea=document.getElementById("sourceText");

    if(!textarea) return;

    textarea.addEventListener("input",function(){

        this.style.height="auto";

        this.style.height=this.scrollHeight+"px";

    });

}

/*==================================================
GENERATE BUTTON
==================================================*/

function initializeGenerateButton(){

    const button=document.querySelector(".generate-btn");

    if(!button) return;

    button.addEventListener("click",generateSummary);

}

/*==================================================
GENERATE SUMMARY
==================================================*/

function generateSummary(){

    const textarea=document.getElementById("sourceText");

    const text=textarea.value.trim();

    if(text===""){

        alert("Please enter some text.");

        return;

    }

    showLoading();

}

function showLoading(){

    const output=document.querySelector(".summary-output");

    output.innerHTML=`

        <div class="summary-placeholder">

            <div class="typing">

                <span></span>

                <span></span>

                <span></span>

            </div>

            <h3>Generating Summary...</h3>

            <p>Mentora AI is analyzing your content.</p>

        </div>

    `;

    setTimeout(showDemoSummary,1800);

}

function showDemoSummary(){

    const output=document.querySelector(".summary-output");

    output.innerHTML=`

    <div class="result-tags">

        <span class="result-tag">AI Generated</span>

        <span class="result-tag">Study Notes</span>

        <span class="result-tag">5 min Read</span>

    </div>

    <div class="summary-card">

        <h3>

            📄 Summary

        </h3>

        <p>

            Cloud computing is the delivery of computing
            services such as servers, storage, databases,
            networking, software, analytics and intelligence
            over the Internet. It enables organizations to
            reduce infrastructure costs, improve scalability,
            increase flexibility and access computing
            resources whenever required.

        </p>

    </div>

    <div class="summary-card">

        <h3>

            ⭐ Key Points

        </h3>

        <ul>

            <li>Provides on-demand computing resources.</li>

            <li>Reduces hardware investment.</li>

            <li>Improves scalability and flexibility.</li>

            <li>Supports remote access from anywhere.</li>

            <li>Enhances disaster recovery and backup.</li>

        </ul>

    </div>

    <div class="summary-card">

        <h3>

            📚 Study Notes

        </h3>

        <p>

            Remember the three major service models:

        </p>

        <ul>

            <li><strong>IaaS</strong> — Infrastructure as a Service</li>

            <li><strong>PaaS</strong> — Platform as a Service</li>

            <li><strong>SaaS</strong> — Software as a Service</li>

        </ul>

    </div>

    <div class="info-box">

        <i data-lucide="lightbulb"></i>

        <p>

            Once FastAPI and Ollama are connected,
            this summary will be generated from your
            own document instead of this demo content.

        </p>

    </div>

    `;

    if(window.lucide){

        lucide.createIcons();

    }

}

function initializeUpload(){

    const uploadBox=document.querySelector(".upload-box");

    const browseButton=document.querySelector(".browse-btn");

    if(!uploadBox) return;

    const input=document.createElement("input");

    input.type="file";

    input.accept=".pdf,.doc,.docx,.txt";

    input.hidden=true;

    document.body.appendChild(input);

    browseButton.addEventListener("click",(e)=>{

        e.stopPropagation();

        input.click();

    });

    uploadBox.addEventListener("click",()=>{

        input.click();

    });

    uploadBox.addEventListener("dragover",(e)=>{

        e.preventDefault();

        uploadBox.classList.add("dragging");

    });

    uploadBox.addEventListener("dragleave",()=>{

        uploadBox.classList.remove("dragging");

    });

    uploadBox.addEventListener("drop",(e)=>{

        e.preventDefault();

        uploadBox.classList.remove("dragging");

        if(e.dataTransfer.files.length){

            handleFile(e.dataTransfer.files[0]);

        }

    });

    input.addEventListener("change",(e)=>{

        if(e.target.files.length){

            handleFile(e.target.files[0]);

        }

    });

}

function handleFile(file){

    const allowed=[
        "application/pdf",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if(!allowed.includes(file.type)){

        alert("Only PDF, DOC, DOCX and TXT files are supported.");

        return;

    }

    document.querySelector(".upload-box").innerHTML=`

        <div class="upload-icon">

            <i data-lucide="file-check"></i>

        </div>

        <h2>${file.name}</h2>

        <p>${(file.size/1024/1024).toFixed(2)} MB uploaded successfully.</p>

        <button class="browse-btn">Upload Another</button>

    `;

    if(window.lucide){

        lucide.createIcons();

    }

}

function initializeCopyButton(){

    const button=document.querySelector(".copy-btn");

    if(!button) return;

    button.addEventListener("click",()=>{

        const output=document.querySelector(".summary-output");

        navigator.clipboard.writeText(output.innerText);

        const original=button.innerHTML;

        button.innerHTML="✓";

        setTimeout(()=>{

            button.innerHTML=original;

            if(window.lucide){

                lucide.createIcons();

            }

        },1200);

    });

}

function initializeDownloadButton(){

    const button=document.querySelector(".download-btn");

    if(!button) return;

    button.addEventListener("click",()=>{

        const text=document.querySelector(".summary-output").innerText;

        const blob=new Blob([text],{

            type:"text/plain"

        });

        const link=document.createElement("a");

        link.href=URL.createObjectURL(blob);

        link.download="Mentora-Summary.txt";

        link.click();

    });

}


function initializeShareButton(){

    const button=document.querySelector(".share-btn");

    if(!button) return;

    button.addEventListener("click",async()=>{

        const text=document.querySelector(".summary-output").innerText;

        if(navigator.share){

            try{

                await navigator.share({

                    title:"Mentora AI Summary",

                    text:text

                });

            }

            catch(error){

                console.log(error);

            }

        }else{

            alert("Sharing is not supported on this browser.");

        }

    });

}


async function generateSummaryFromAPI(text,style){


}


console.log("Mentora AI Summarizer Loaded Successfully");