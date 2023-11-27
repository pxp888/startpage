// This file adds drag and drop functionality to the icon field in the edit form

// This file calls functions defined in index.js

const imageDropZone = document.createElement("div");
const linkDropZone = document.createElement("div");
const backDropZone = document.createElement("div");
const noBackButton = document.getElementById("noBackButton");


// set up the drop target
function setupDropZone() {

    linkDropZone.id = "linkDropZone";
    linkDropZone.className = "dropZone";
    linkDropZone.innerHTML = "Drop link here to set URL";
    linkDropZone.style.top = "10%";
    settingScreen.appendChild(linkDropZone);

    imageDropZone.id = "imageDropZone";
    imageDropZone.className = "dropZone";
    imageDropZone.innerHTML = "Drop image here to set Icon URL";
    imageDropZone.style.top = "35%";
    settingScreen.appendChild(imageDropZone);

    backDropZone.id = "backDropZone";
    backDropZone.className = "dropZone";
    backDropZone.innerHTML = "Drop link here to set background Image";
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


// this is necessary for drag and drop to work
function handleDragOver(event)
{
    if (!editmode){ return; }
    event.preventDefault();
    imageDropZone.classList.add("active");
    linkDropZone.classList.add("active");
    backDropZone.classList.add("active");
}


// set icon URL from dropped images
function imageDrop(event) {
    event.preventDefault();
    if (!selectCheck()) { return; }

    const imageUrl = event.dataTransfer.getData("text/html");
    const parser = new DOMParser();
    const doc = parser.parseFromString(imageUrl, "text/html");
    const img = doc.querySelector("img");
    if (img==null) {
        return; }
    const imageAddress = img.src;
    shortcutIcon.value = imageAddress;
    iconFieldUpdate({target: shortcutIcon});
}


// set URL field from dropped links
function linkDrop(event) {
    event.preventDefault();
    if (!selectCheck()) { return; }

    const link = event.dataTransfer.getData("text/uri-list");
    if (isValidURL(link)){
        shortcutURL.value = link;
        urlFieldUpdate({target: shortcutURL});
        return;
    }

    const plainText = event.dataTransfer.getData("text/plain");
    if (isValidURL(plainText)){
        shortcutURL.value = plainText;
        urlFieldUpdate({target: shortcutURL});
        return;
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


function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}


function hideDropZone(event) {
    imageDropZone.classList.remove("active");
    linkDropZone.classList.remove("active");
    backDropZone.classList.remove("active");
}


setupDropZone();
setupBackImage();

imageDropZone.addEventListener("drop", imageDrop);
linkDropZone.addEventListener("drop", linkDrop);
backDropZone.addEventListener("drop", backDrop);
document.addEventListener("dragover", handleDragOver);
document.addEventListener("mouseout", hideDropZone);
document.addEventListener("drop", hideDropZone);
document.getElementById("noBackButton").addEventListener("click", clearBackImage);
