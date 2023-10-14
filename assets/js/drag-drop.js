// This file adds drag and drop functionality to the icon field in the edit form

// This file calls functions defined in index.js

const dropZone = document.createElement("div");

// set up the drop target
function setupDropZone() {

    dropZone.id = "dropZone";
    dropZone.className = "dropZone";
    dropZone.innerHTML = "Drop image here to set Icon URL";
    settingScreen.appendChild(dropZone);
}

// this is necessary for drag and drop to work
function handleDragOver(event)
{
    if (!editmode){ return; }
    event.preventDefault();
    dropZone.classList.add("active");
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

function hideDropZone(event) {
    dropZone.classList.remove("active");
}

setupDropZone();

dropZone.addEventListener("drop", imageDrop);
document.addEventListener("dragover", handleDragOver);
document.addEventListener("mouseout", hideDropZone);
document.addEventListener("drop", hideDropZone);
