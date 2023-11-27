// This file adds drag and drop background images

// This file calls functions defined in index.js and drag-drop.js

const backDropZone = document.createElement("div");
const noBackButton = document.getElementById("noBackButton");


// set up the drop target
function setupbackDropZone() {
    backDropZone.id = "backDropZone";
    backDropZone.className = "dropZone";
    backDropZone.innerHTML = "Drop image here to set background Image";
    backDropZone.style.top = "60%";
    settingScreen.appendChild(backDropZone);
}


// set up the background image
function setupBackImage() {
    const backImage = document.createElement("div");
    backImage.id = "backImage";
    backImage.style.backgroundImage = "url('')";
    backImage.style.backgroundSize = "cover";
    backImage.style.backgroundPosition = "center";
    backImage.style.backgroundRepeat = "no-repeat";
    backImage.style.width = "100%";
    backImage.style.height = "100%";
    backImage.style.position = "fixed";
    backImage.style.top = "0";
    backImage.style.left = "0";
    backImage.style.zIndex = "-1";
    document.body.appendChild(backImage);

    const backImageAddress = localStorage.getItem("backImage");
    if (backImageAddress != null) {
        backImage.style.backgroundImage = "url('" + backImageAddress + "')";
        noBackButton.style.display = "block";
        backgroundColorPicker.style.display = "None";
    }
    else {
        noBackButton.style.display = "None";
        backgroundColorPicker.style.display = "block";
    }
}


// set background image
function backDrop(event) {
    event.preventDefault();

    const imageUrl = event.dataTransfer.getData("text/html");
    const parser = new DOMParser();
    const doc = parser.parseFromString(imageUrl, "text/html");
    const img = doc.querySelector("img");
    if (img==null) {
        return; }
    const imageAddress = img.src;
    backImage.style.backgroundImage = "url('" + imageAddress + "')";

    localStorage.setItem("backImage", imageAddress);
    noBackButton.style.display = "block";
    backgroundColorPicker.style.display = "None";
}


// clear the background Image
function clearBackImage() {
    backImage.style.backgroundImage = "url('')";
    localStorage.removeItem("backImage");
    noBackButton.style.display = "None";
    backgroundColorPicker.style.display = "block";
}


setupbackDropZone();
setupBackImage();

backDropZone.addEventListener("drop", backDrop);
document.getElementById("noBackButton").addEventListener("click", clearBackImage);
