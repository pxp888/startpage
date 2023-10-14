// This file adds drag and drop functionality to the icon field in the edit form

// This file calls functions defined in index.js

const imageDropZone = document.createElement("div");
const linkDropZone = document.createElement("div");

// set up the drop target
function setupDropZone() {

    imageDropZone.id = "imageDropZone";
    imageDropZone.className = "dropZone";
    imageDropZone.innerHTML = "Drop image here to set Icon URL";
    imageDropZone.style.top = "45%";
    settingScreen.appendChild(imageDropZone);

    linkDropZone.id = "linkDropZone";
    linkDropZone.className = "dropZone";
    linkDropZone.innerHTML = "Drop link here to set URL";
    linkDropZone.style.top = "15%";
    settingScreen.appendChild(linkDropZone);
}

// this is necessary for drag and drop to work
function handleDragOver(event)
{
    if (!editmode){ return; }
    event.preventDefault();
    imageDropZone.classList.add("active");
    linkDropZone.classList.add("active");
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
}

setupDropZone();

imageDropZone.addEventListener("drop", imageDrop);
linkDropZone.addEventListener("drop", linkDrop);
document.addEventListener("dragover", handleDragOver);
document.addEventListener("mouseout", hideDropZone);
document.addEventListener("drop", hideDropZone);
