/*
==========================================================
RAMINDSGN
Growth Blueprint Application
==========================================================
*/

/*=========================================================
EMAILJS
=========================================================*/

emailjs.init({
    publicKey: "cudv0Ts_1C46XxY8W"
});

/*=========================================================
APPLICATION STATE
=========================================================*/

const STORAGE_KEY = "ramin_growth_blueprint";

let currentStep = 0;

const form = document.getElementById("applicationForm");
const container = document.getElementById("formContainer");

const previousButton = document.getElementById("previousBtn");
const nextButton = document.getElementById("nextBtn");
const submitButton = document.getElementById("submitBtn");

const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");
const stepCounter = document.getElementById("stepCounter");

const successScreen = document.getElementById("successScreen");

/*=========================================================
QUESTION DATA
=========================================================*/

const sections = [

{

title:"Contact Information",

description:
"Tell us about yourself and your business.",

fields:[

{
type:"text",
label:"Full Name",
name:"full_name",
required:true
},

{
type:"text",
label:"Business Name",
name:"business_name",
required:true
},

{
type:"text",
label:"Job Title",
name:"job_title",
required:true
},

{
type:"email",
label:"Email Address",
name:"email",
required:true
},

{
type:"tel",
label:"Phone Number (Optional)",
name:"phone"
},

{
type:"text",
label:"City",
name:"city",
required:true
},

{
type:"text",
label:"Country",
name:"country",
required:true
},

{
type:"url",
label:"Website (Optional)",
name:"website"
}

]

}

];

/*=========================================================
ELEMENT HELPER
=========================================================*/

function element(tag,className){

    const el=document.createElement(tag);

    if(className){

        el.className=className;

    }

    return el;

}

/*=========================================================
CREATE FIELD
=========================================================*/

function createField(field){

    const wrapper=element("div","field-group");

    const label=element("label");

    label.textContent=field.label;

    wrapper.appendChild(label);

    let input;

    switch(field.type){

        case "textarea":

            input=document.createElement("textarea");

        break;

        case "select":

            input=document.createElement("select");

            const placeholder=document.createElement("option");

            placeholder.value="";

            placeholder.textContent="Select";

            input.appendChild(placeholder);

            field.options.forEach(option=>{

                const item=document.createElement("option");

                item.value=option;

                item.textContent=option;

                input.appendChild(item);

            });

        break;

        case "radio":

            input=createRadioGroup(field);

        break;

        case "checkbox-group":

            input=createCheckboxGroup(field);

        break;

        case "rating":

            input=createRating(field);

        break;

        case "file":

            input=createFileUpload(field);

        break;

        default:

            input=document.createElement("input");

            input.type=field.type;

    }

    if(
        field.type!=="radio" &&
        field.type!=="checkbox-group" &&
        field.type!=="rating" &&
        field.type!=="file"
    ){

        input.name=field.name;

        input.placeholder=field.label;

        if(field.required){

            input.required=true;

        }

    }

    wrapper.appendChild(input);

    return wrapper;

}

/*=========================================================
RADIO GROUP
=========================================================*/

function createRadioGroup(field){

    const wrapper=element("div","option-grid");

    field.options.forEach(option=>{

        const label=element("label","option");

        const input=document.createElement("input");

        input.type="radio";

        input.name=field.name;

        input.value=option;

        if(field.required){

            input.required=true;

        }

        const text=element("span");

        text.textContent=option;

        label.appendChild(input);

        label.appendChild(text);

        wrapper.appendChild(label);

    });

    return wrapper;

}

/*=========================================================
CHECKBOX GROUP
=========================================================*/

function createCheckboxGroup(field){

    const wrapper=element("div","option-grid");

    field.options.forEach(option=>{

        const label=element("label","option");

        const input=document.createElement("input");

        input.type="checkbox";

        input.name=field.name;

        input.value=option;

        const text=element("span");

        text.textContent=option;

        label.appendChild(input);

        label.appendChild(text);

        wrapper.appendChild(label);

    });

    return wrapper;

}

/*=========================================================
RATING
=========================================================*/

function createRating(field){

    const select=document.createElement("select");

    select.name=field.name;

    if(field.required){

        select.required=true;

    }

    const placeholder=document.createElement("option");

    placeholder.value="";

    placeholder.textContent="Select Rating";

    select.appendChild(placeholder);

    for(let i=1;i<=10;i++){

        const option=document.createElement("option");

        option.value=i;

        option.textContent=i;

        select.appendChild(option);

    }

    return select;

}

/*=========================================================
FILE UPLOAD
=========================================================*/

function createFileUpload(field){

    const wrapper=element("label","upload-area");

    wrapper.textContent=
    "Click to upload files";

    const input=document.createElement("input");

    input.type="file";

    input.name=field.name;

    input.multiple=true;

    wrapper.appendChild(input);

    input.addEventListener("change",()=>{

        if(input.files.length===0)return;

        wrapper.textContent=
        `${input.files.length} file(s) selected`;

        wrapper.appendChild(input);

    });

    return wrapper;

}

/*=========================================================
RENDER STEP
=========================================================*/

function renderStep(){

    container.innerHTML="";

    const section=sections[currentStep];

    const page=element("section","form-section active");

    const title=element("h2","form-title");

    title.textContent=section.title;

    page.appendChild(title);

    if(section.description){

        const description=element("p","field-description");

        description.textContent=
        section.description;

        page.appendChild(description);

    }

    section.fields.forEach(field=>{

        page.appendChild(

            createField(field)

        );

    });

    container.appendChild(page);

}/*=========================================================
SAVE FORM
=========================================================*/

function saveForm(){

    const data={};

    form.querySelectorAll("input, textarea, select").forEach(input=>{

        if(input.type==="radio"){

            if(input.checked){

                data[input.name]=input.value;

            }

            return;

        }

        if(input.type==="checkbox"){

            if(!data[input.name]){

                data[input.name]=[];

            }

            if(input.checked){

                data[input.name].push(input.value);

            }

            return;

        }

        if(input.type==="file"){

            return;

        }

        data[input.name]=input.value;

    });

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );

}

/*=========================================================
RESTORE FORM
=========================================================*/

function restoreForm(){

    const saved=

    JSON.parse(

        localStorage.getItem(STORAGE_KEY)

    );

    if(!saved) return;

    form.querySelectorAll("input, textarea, select").forEach(input=>{

        if(!(input.name in saved)) return;

        if(input.type==="radio"){

            input.checked=

            input.value===saved[input.name];

            return;

        }

        if(input.type==="checkbox"){

            input.checked=

            saved[input.name].includes(input.value);

            return;

        }

        if(input.type==="file"){

            return;

        }

        input.value=saved[input.name];

    });

}

/*=========================================================
PROGRESS
=========================================================*/

function updateProgress(){

    const progress=

    ((currentStep+1)/sections.length)*100;

    progressFill.style.width=

    progress+"%";

    progressPercent.textContent=

    Math.round(progress)+"%";

    stepCounter.textContent=

    sections[currentStep].title;

}

/*=========================================================
BUTTONS
=========================================================*/

function updateButtons(){

    previousButton.style.display=

    currentStep===0

    ? "none"

    : "inline-flex";

    const last=

    currentStep===sections.length-1;

    nextButton.style.display=

    last

    ? "none"

    : "inline-flex";

    submitButton.style.display=

    last

    ? "inline-flex"

    : "none";

}

/*=========================================================
VALIDATION
=========================================================*/

function validateStep(){

    const section = sections[currentStep];

    let valid = true;

    section.fields.forEach(field=>{

        if(!field.required) return;

        if(field.type==="checkbox-group"){

            const checked =
            form.querySelectorAll(
                `input[name="${field.name}"]:checked`
            );

            if(checked.length===0){

                valid=false;

            }

            return;

        }

        if(field.type==="radio"){

            const checked =
            form.querySelector(
                `input[name="${field.name}"]:checked`
            );

            if(!checked){

                valid=false;

            }

            return;

        }

        const input =
        form.querySelector(
            `[name="${field.name}"]`
        );

        if(!input) return;

        if(input.value.trim()===""){

            input.focus();

            input.style.borderColor="white";

            setTimeout(()=>{

                input.style.borderColor="";

            },1200);

            valid=false;

        }

    });

    return valid;

}

/*=========================================================
NEXT
=========================================================*/

nextButton.addEventListener("click",()=>{

    if(!validateStep()){

        alert(
            "Please complete all required fields."
        );

        return;

    }

    saveForm();

    currentStep++;

    renderStep();

    restoreForm();

    updateProgress();

    updateButtons();

});

/*=========================================================
PREVIOUS
=========================================================*/

previousButton.addEventListener("click",()=>{

    saveForm();

    currentStep--;

    renderStep();

    restoreForm();

    updateProgress();

    updateButtons();

});
A
/*=========================================================
AUTOSAVE
=========================================================*/

form.addEventListener("input",()=>{

    saveForm();

});

/*=========================================================
INITIAL LOAD
=========================================================*/

renderStep();

restoreForm();

updateProgress();

updateButtons();

