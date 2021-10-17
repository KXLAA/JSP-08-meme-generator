const imageFileInput = document.querySelector("#imageFileInput");
const imageLinkInput = document.querySelector('#ImageUrlInput')
const imageLinkSubmit = document.querySelector('.meme-generator__link-btn')
const canvas = document.querySelector("#meme");
const topTextInput = document.querySelector("#topTextInput");
const bottomTextInput = document.querySelector("#bottomTextInput");



let image; //Image Var that changes Based on input -> link or ImageFile

//This Loads Image Data on submit -> When Link is submitted
//Clear Value on Focus
imageLinkInput.addEventListener('focus', () => {
    imageLinkInput.value = ""
})

imageLinkInput.addEventListener('blur', () => {
    if(imageLinkInput.value != "PASTE IMAGE LINK ADDRESS"){
        imageLinkInput.value
    }
})

//Function to get Image source
function getImgLink(event){
    event.preventDefault();
    if(imageLinkInput.value != "PASTE IMAGE LINK ADDRESS" && imageLinkInput.value != ""){
        //Create a new Image Object from Link
        image = new Image();
        image.setAttribute('crossorigin', 'anonymous');
        image.src = event.target['url'].value //Add the link submitted as the src
        //Render Image on HTML canvas on Load
        image.addEventListener('load', () => {
            updateMemeCanvas(canvas,image,topTextInput.value,bottomTextInput.value)
        }, {once : true});
                
        //Update UI elements
        imageLinkInput.style.borderColor = "green";
        imageLinkInput.style.borderStyle = "solid";
    } else{
        //Add toast Notification
    }
}

//Drag & DROP
let dropZoneInput = document.querySelectorAll(".meme-generator__drop-zone--file-input")
dropZoneInput.forEach(inputElement => {
    const dropZoneEl = inputElement.closest(".meme-generator__drop-zone")

    //Add the Feedback that user is hovering
    dropZoneEl.addEventListener("dragover", e => {
        e.preventDefault();
        dropZoneEl.classList.add('meme-generator__drop-zone--over')
    })

    //Remove that Feedback when user aborts or stops hovering
    const fixBorder = ["dragleave", "dragend"]
    fixBorder.forEach(type => {
        dropZoneEl.addEventListener(type, e => {
            dropZoneEl.classList.remove('meme-generator__drop-zone--over')
        })
    })

    //If user Clicks on the Drop Zone
    dropZoneEl.addEventListener("click", e => {
            inputElement.click(); //Simulate a click 
    })
    
    //When an Image is Uploaded
    inputElement.addEventListener("change", e => {
        //If an Image is uploaded -> Create Image Object, add src & Render on canvas
        if(inputElement.files.length){
            const imageDataURL = URL.createObjectURL(inputElement.files[0]) //Select only first Image
            image = new Image();
            image.src = imageDataURL;

            //Render Image on HTML canvas on Load
            image.addEventListener('load', () => {
                updateMemeCanvas(canvas,image,topTextInput.value,bottomTextInput.value)
            }, {once : true});

            //Update UI elements
            document.querySelector('.meme-generator__drop-zone--prompt').textContent = 'IMAGE UPLOADED ✅'
                dropZoneEl.style.borderColor = "green";
                dropZoneEl.style.borderStyle = "solid";
        }
    }) 

    //DRAG & DROP MAIN FUNCTIONALITY
    //If a User Drags On the Drop Zone 
    dropZoneEl.addEventListener("drop", e => {
       e.preventDefault();

        //If an Image is uploaded -> Create Image Object, add src & Render on canvas
       if(e.dataTransfer.files.length){
            inputElement.files = e.dataTransfer.files  //Files are added from the drag Event
            const imageDataURL = URL.createObjectURL(inputElement.files[0])
            image = new Image();
            image.src = imageDataURL;
        
            image.addEventListener('load', () => {
                updateMemeCanvas(canvas,image,topTextInput.value,bottomTextInput.value)
            }, {once : true});

            //Update UI elements
            document.querySelector('.meme-generator__drop-zone--prompt').textContent = 'IMAGE UPLOADED ✅'
            dropZoneEl.style.borderColor = "green";
       }
    })
})


//Change Top Text Value
topTextInput.addEventListener('focus', () => {
    topTextInput.value = ""
})

topTextInput.addEventListener('blur', () => {
    if(topTextInput.value != "TOP TEXT"){
        topTextInput.value
    }
})

topTextInput.addEventListener('change', ()=> {
    updateMemeCanvas(canvas,image,topTextInput.value,bottomTextInput.value);
});

//Change Bottom Text Value
bottomTextInput.addEventListener('focus', () => {
    bottomTextInput.value = ""
})

bottomTextInput.addEventListener('blur', () => {
    if(bottomTextInput.value != "BOTTOM TEXT"){
        bottomTextInput.value
    }
})

bottomTextInput.addEventListener('change', ()=> {
    updateMemeCanvas(canvas,image,topTextInput.value,bottomTextInput.value);
});

//Update HTML Canvas 
function updateMemeCanvas (canvas, image, topText, bottomText){
    const context = canvas.getContext('2d')
    const width = image.width;
    const height = image.height;
    const fontSize = Math.floor(width / 10);
    const yOffset = height / 25;

    //Update canvas Background 
    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0);

    //Prepare Text
    context.strokeStyle = "black";
    context.lineWidth = Math.floor(fontSize / 4);
    context.fillStyle = "White"
    context.textAlign = "center"
    context.lineJoin = "round";
    context.font = `${fontSize}px sans-serif`;

    //Add top text
    context.textBaseline = "top";
    context.strokeText(topText, width/2, yOffset)
    context.fillText(topText, width/2, yOffset)

    //Add bottom text
    context.textBaseline = "bottom";
    context.strokeText(bottomText, width/2, height - yOffset)
    context.fillText(bottomText, width/2, height - yOffset)

    //Download Image
    const download = document.querySelector("#meme-generator__download");
    const imageDownload = canvas.toDataURL("image")
    download.innerHTML = `<a href="${imageDownload}" download="My New Meme" class ="buttons meme-generator__download"id="meme-generator__download">DOWNLOAD</a>`
}

//Reload function
function reload () {
    location.reload();
}

//Light & Dark Toggle
const modeToggles = document.querySelectorAll('.nav__btn')
modeToggles.forEach(modeToggle => {
    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('body--dark')
        document.body.querySelector('.nav__btn--dark').classList.toggle('hidden')
        document.body.querySelector('.nav__btn--light').classList.toggle('hidden')
        
        document.querySelectorAll('.buttons').forEach(button => {
            button.classList.toggle('buttons-dark')
        })

        document.querySelectorAll('.borders').forEach(border => {
            border.classList.toggle('border--dark')
        })
    })
})



