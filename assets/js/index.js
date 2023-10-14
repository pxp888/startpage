let editmode = false;

// GLOBAL VARIABLES for DOM elements
const header = document.getElementById("header");
const mainlist = document.getElementById("mainlist");
const settingButton = document.getElementById("settingButton");
const shortcutName = document.getElementById("shortcutName");
const shortcutURL = document.getElementById("shortcutURL");
const shortcutIcon = document.getElementById("shortcutIcon");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const backgroundColorPicker = document.getElementById("backgroundColorPicker");
const frameColorPicker = document.getElementById("frameColorPicker");
const iconSize = document.getElementById("iconSize");
const frameSize = document.getElementById("frameSize");
const iconMargin = document.getElementById("iconMargin");
const downloadButton = document.getElementById("downloadButton");
const uploadButton = document.getElementById("uploadButton");
const showHeaderButton = document.getElementById("showHeaderButton");
const restoreDefaultsButton = document.getElementById("restoreDefaultsButton");
const helpPageButton = document.getElementById("helpPageButton");
const settingScreen = document.getElementById("settingScreen");


// ###########################  HELPER FUNCTIONS  ###########################

// Returns the index of the element in its group
function getIndex(x){
    while (x.classList.length == 0) { x=x.parentNode; }
    let group = document.getElementsByClassName(x.classList[0]);
    let index = -1;
    for (let i=0; i < group.length; i++) {
        if (group[i] == x) {
            index = i;
            break;
        }
    }
    return index;
}

// get shortcut data from localstorage
function getInfo() {
    let names = JSON.parse(localStorage.getItem("names"));
    let icons = JSON.parse(localStorage.getItem("icons"));
    let urls = JSON.parse(localStorage.getItem("urls"));
    return {names: names, icons: icons, urls: urls};
}

// write shortcut data to localstorage
function setInfo(names, icons, urls) {
    localStorage.setItem("names", JSON.stringify(names));
    localStorage.setItem("icons", JSON.stringify(icons));
    localStorage.setItem("urls", JSON.stringify(urls));
}

// Changes the CSS of a selector
function cssChange(selector, property, value){
    let sheet = document.getElementById("customStyleTag").sheet;
    let rules=sheet.cssRules;
    let x;
    for (let i=0; i<rules.length; i++) {
        if (rules[i].selectorText == selector) { x = rules[i].style; }
    }
    x.setProperty(property, value);
}

// Returns the length of the longest word in a string
function findLongestWordLength(str) {
    const words = str.split(" ");
    let longestWordLength = 0;
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > longestWordLength) {
        longestWordLength = words[i].length;
        }
    }
    return longestWordLength;
}

// swap two elements in an array
function swapItems(array, index1, index2) {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

// show the help page
function helpPage() {
    window.open("help.html", "_blank");
}

// warns user if editing is happening with no icon selected
function selectCheck(event) {
    let selected = document.getElementsByClassName("selected");
    if (selected.length == 0) {
        alert("No item selected, please click a link to edit");
        document.activeElement.blur();
        return false;
    }
    return true;
}


// ###########################  PAGE SETUP FUNCTIONS ###########################

// add a style tag to the head of the document with the CSS for the icons
function addStyleTag() {
    const style = document.createElement('style');
    style.id = "customStyleTag";
    document.head.appendChild(style);
    setIconCSS();
}

// checks if the header should be hidden
function checkHeaderShowing() {
    let x = localStorage.getItem("headerhidden");
    if (x == null) { return; }
    if (x == "true") {
        header.style.visibility = "hidden";
        showHeaderButton.innerHTML = "Show Header";
    }
}

// return a default data object
function getDefaultData() {
    return {
        names : [
            "Google",
            "Youtube",
            "Gmail",
            "Instagram",
            "Spotify",
            "Facebook",
            "Twitter",
            "Google Drive",
            "BBC",
            "Netflix",
            "Amazon",
            "Reddit",
            "Wikipedia",
            "Github",
            "LinkedIn",
            "Booking.com",
            "Google Photos",
            "Google Calendar"
        ],
        urls : [
            "www.google.com",
            "www.youtube.com",
            "www.gmail.com",
            "www.instagram.com",
            "www.spotify.com",
            "www.facebook.com",
            "https://twitter.com/",
            "www.drive.google.com",
            "www.bbc.com",
            "www.netflix.com",
            "www.amazon.com",
            "www.reddit.com",
            "www.wikipedia.org",
            "www.github.com",
            "www.linkedin.com",
            "www.booking.com",
            "www.photos.google.com",
            "https://calendar.google.com/calendar/"
        ],
        icons : [
            "https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png",
            "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
            "https://cdn-icons-png.flaticon.com/512/732/732200.png",
            "https://cdn-icons-png.flaticon.com/512/174/174855.png",
            "https://cdn-icons-png.flaticon.com/512/174/174872.png",
            "https://cdn-icons-png.flaticon.com/512/733/733547.png",
            "https://cdn-icons-png.flaticon.com/512/733/733579.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/1147px-Google_Drive_icon_%282020%29.svg.png",
            "https://cdn.icon-icons.com/icons2/70/PNG/512/bbc_news_14062.png",
            "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png",
            "https://cdn-icons-png.flaticon.com/512/732/732177.png",
            "https://cdn-icons-png.flaticon.com/512/2111/2111589.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Wikipedia%27s_W.svg/1024px-Wikipedia%27s_W.svg.png",
            "https://cdn-icons-png.flaticon.com/512/733/733553.png",
            "https://cdn-icons-png.flaticon.com/512/174/174857.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Booking.com_Icon_2022.svg/1200px-Booking.com_Icon_2022.svg.png",
            "https://cdn-icons-png.flaticon.com/512/2991/2991131.png",
            "https://cdn-icons-png.flaticon.com/512/5968/5968499.png"
        ],

        bgcolor: "#3d3d43",
        framecolor: "#1f1f1f",
        iconsize: 182,
        framesize: 1200,
        iconMargin: 5
    };
}

// restores the data from localstorage, or sets defaults if there is no data
function restoreDataFromLocalstorage() {
    const defaultData = getDefaultData();

    // if there is no data in localstorage, set it to the default data
    const names = JSON.parse(localStorage.getItem("names")) || defaultData.names;
    const icons = JSON.parse(localStorage.getItem("icons")) || defaultData.icons;
    const urls = JSON.parse(localStorage.getItem("urls")) || defaultData.urls;
    setInfo(names, icons, urls);

    // apply appearance settings
    const bgcolor = localStorage.getItem("bgcolor") || defaultData.bgcolor;
    document.getElementsByTagName("body")[0].style.backgroundColor = bgcolor;
    backgroundColorPicker.value = bgcolor;

    const framecolor = localStorage.getItem("framecolor") || defaultData.framecolor;
    mainlist.style.backgroundColor = framecolor;
    frameColorPicker.value = framecolor;

    const iconsize = localStorage.getItem("iconsize") || defaultData.iconsize;
    cssChange(".show", "width", iconsize + "px");
    cssChange(".show", "height", iconsize + "px");
    cssChange(".show a, .show p", "font-size", iconsize/8 + "px");

    const framesizeValue = localStorage.getItem("framesize") || defaultData.framesize;
    mainlist.style.maxWidth = framesizeValue + "px";
    frameSize.value = framesizeValue;

    const iconMarginValue = localStorage.getItem("iconMargin") || defaultData.iconMargin;
    cssChange(".show", "margin", iconMarginValue + "px");
    iconMargin.value = iconMarginValue;
}

// sets the CSS for the icon view
// this is defined here so CSS can be changed dynamically for these items.
function setIconCSS() {
    let style = document.getElementById("customStyleTag");
    style.textContent = `
    .show {
        color: white;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;

        width: 182px;
        height: 182px;
    }

    .show img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        cursor: pointer;
    }

    .show a, .show p {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;

        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        font-size: 1.5rem;
        font-weight: 400;
        text-decoration: none;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        opacity: 0;
    }

    .show a:hover, .show p:hover {
        opacity: 1;
        animation: 0.2s fadeIn;
        animation-fill-mode: forwards;
    }

    .show .xbut {
        width: 25%;
        height: 25%;
        position: absolute;
        top: 0;
        right: 0;
        background-color: gray;
        opacity: 0.3;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .xbut:hover {
        background-color: rgb(255, 97, 24);
        opacity: 1;
    }

    .selected {
        border: 3px solid rgb(255, 97, 24);
    }

    .unselected {
        opacity: 0.5;
    }

    .plusButton {
        width: 182px;
        height: 182px;
    }

    .plusButton:hover {
        background-color: gray;
    }

    #settingScreen {
        bottom: -100%;
    }
    `;
}

// shows the settings pane and editing controls, or hides them
function toggleEditMode() {
    editmode = !editmode;
    if (editmode){
        displayEditIcons();
        cssChange("#settingScreen", "bottom", "0");
        settingScreen.classList.remove("panel-slide-down");
        settingScreen.classList.add("panel-slide-up");
    }
    else {
        displayNormalIcons();
        cssChange("#settingScreen", "bottom", "-100%");
        settingScreen.classList.remove("panel-slide-up");
        settingScreen.classList.add("panel-slide-down");
    }
}

// displays the icons with the editing controls
function displayNormalIcons() {
    // set the frame width
    let targetFrameSize = localStorage.getItem("framesize");
    if (targetFrameSize == null) { targetFrameSize = 1200; }
    mainlist.style.maxWidth = targetFrameSize + "px";

    let {names, icons, urls} = getInfo();

    let shows = document.getElementsByClassName("show");

    // remove existing icons
    while (shows.length > 0) {shows[0].remove();}

    // create new icons from shortcut data
    for (let i = 0; i < names.length; i++) {
        let ndiv = document.createElement("div");
        ndiv.className = "show";

        let im = document.createElement("img");
        let x = icons[i];
        if (x ==""){ x = "assets/images/blankimage.png";}
        im.src = x;

        let link = document.createElement("a");
        link.innerHTML = names[i];

        x = urls[i];
        if (x.slice(0, 4) != "http") { x = "http://" + x; }
        link.href = x;
        link.target = "_blank";

        ndiv.appendChild(im);
        ndiv.appendChild(link);
        mainlist.appendChild(ndiv);
    }
}

// displays the icons with the editing controls,
function displayEditIcons() {
    // set the frame width
    let targetFrameSize = localStorage.getItem("framesize");
    if (targetFrameSize == null) { targetFrameSize = 1200; }
    mainlist.style.maxWidth = targetFrameSize + "px";

    let {names, icons} = getInfo();

    let shows = document.getElementsByClassName("show");

    // remove existing icons
    while (shows.length > 0) {shows[0].remove();}

    // create new icons from shortcut data
    for (let i=0; i < names.length; i++) {
        let ndiv = document.createElement("div");
        ndiv.className = "show";

        let im = document.createElement("img");
        let x = icons[i];
        if (x ==""){ x = "assets/images/blankimage.png";}
        im.src = x;

        let link = document.createElement("p");
        link.innerHTML = names[i];
        link.addEventListener("click", selectItem);

        let xbut = document.createElement("img");
        xbut.classList.add("xbut");
        xbut.src = "assets/images/x.webp";
        xbut.addEventListener("click", removeItem);

        ndiv.appendChild(im);
        ndiv.appendChild(link);
        ndiv.appendChild(xbut);
        mainlist.appendChild(ndiv);
    }

    // add the plus button, which creates new shortcuts
    let plus = document.createElement("img");
    plus.className = "plusButton";
    plus.src = "assets/images/plus.png";
    plus.addEventListener("click", addBlankItem);
    let pdiv = document.createElement("div");
    pdiv.className = "show";
    pdiv.appendChild(plus);

    mainlist.appendChild(pdiv);

    // clear the editing fields
    shortcutName.value = "";
    shortcutURL.value = "";
    shortcutIcon.value = "";

}

// set up the page - run this when loading the page
function setupPage() {
    addStyleTag();
    checkHeaderShowing();
    restoreDataFromLocalstorage();
    displayNormalIcons();
    addHiddenFileInputButton();
}


// ###########################  SHORTCUT EDITING FUNCTIONS  ###########################

// update CSS for a selected shortcut, and update the editing fields
function selectItem(event) {
    if (event.target==null) { return; }
    let shows = document.getElementsByClassName("show");

    let {names, icons, urls} = getInfo();

    let index = getIndex(event.target);
    if (index == -1) { return; }

    // update CSS
    for (let i=0; i < shows.length-1; i++) { shows[i].className="show unselected"; }
    shows[index].className="show selected";

    // update editing fields
    shortcutName.value = names[index];
    shortcutURL.value = urls[index];
    shortcutIcon.value = icons[index];
}

// create new shortcut
function addBlankItem() {
    let shows = document.getElementsByClassName("show");

    //deselect all other shortcuts
    for (let i=0; i < shows.length-1; i++) { shows[i].className="show unselected"; }

    //create new shortcut, and mark it selected
    let newShow = document.createElement("div");
    newShow.className = "show selected";

    //apply default blank image icon
    let im = document.createElement("img");
    im.src = "assets/images/blankimage.png";

    let link = document.createElement("p");
    link.innerHTML = "New Link";
    link.addEventListener("click", selectItem);

    let xbut = document.createElement("img");
    xbut.classList.add("xbut");
    xbut.src = "assets/images/x.webp";
    xbut.addEventListener("click", removeItem);

    newShow.appendChild(im);
    newShow.appendChild(link);
    newShow.appendChild(xbut);
    mainlist.insertBefore(newShow, shows[shows.length-1]);

    //update editing fields
    shortcutName.value = "";
    shortcutURL.value = "";
    shortcutIcon.value = "";

    //add new blank data to localstorage
    let {names, icons, urls} = getInfo();

    names.push("");
    icons.push("");
    urls.push("");
    setInfo(names, icons, urls);
}

// remove shortcut
function removeItem(event) {
    let shows = document.getElementsByClassName("show");

    let index = getIndex(event.target);
    if (index == -1) { return; }
    shows[index].remove();

    //remove data from localstorage
    let {names, icons, urls} = getInfo();
    names.splice(index, 1);
    icons.splice(index, 1);
    urls.splice(index, 1);
    setInfo(names, icons, urls);
}

function moveItemUp(event) {
    let shows = document.getElementsByClassName("show");
    let selected = document.getElementsByClassName("selected");
    if (selected.length == 0) {
        alert("No item selected, please click a link to edit");
        return;
    }
    let index = getIndex(selected[0]);
    if ((index == 0) || (index == shows.length)) {
        return;
    }
    shows[index].parentNode.insertBefore(shows[index], shows[index - 1]);
    let {names, icons, urls} = getInfo();
    swapItems(names, index, index - 1);
    swapItems(icons, index, index - 1);
    swapItems(urls, index, index - 1);
    setInfo(names, icons, urls);
}

function moveItemDown(event) {
    let shows = document.getElementsByClassName("show");
    let selected = document.getElementsByClassName("selected");
    if (selected.length == 0) {
        alert("No item selected, please click a link to edit");
        return;
    }
    let index = getIndex(selected[0]);
    if (index == shows.length - 2) {
        return;
    }
    shows[index].parentNode.insertBefore(shows[index + 1], shows[index]);
    let {names, icons, urls} = getInfo();
    swapItems(names, index, index + 1);
    swapItems(icons, index, index + 1);
    swapItems(urls, index, index + 1);
    setInfo(names, icons, urls);
}

// update the name of the selected shortcut
function nameFieldUpdate(event) {
    let selected = document.getElementsByClassName("selected");
    if (selected.length == 0) { return; }
    let shows = document.getElementsByClassName("show");
    let index = getIndex(selected[0]);
    if (index == -1) { return; }
    shows[index].children[1].innerHTML = event.target.value;

    if (findLongestWordLength(event.target.value) > 16) {
        alert("Long words may not display correctly");
    }
    if (event.target.value.length > 50) {
        alert("Long names may not display correctly");
    }

    //update local store
    let names = JSON.parse(localStorage.getItem("names"));
    names[index] = event.target.value;
    localStorage.setItem("names", JSON.stringify(names));
}

// update the URL of the selected shortcut
function urlFieldUpdate(event) {
    let selected = document.getElementsByClassName("selected");
    if (selected.length == 0) { return; }
    let shows = document.getElementsByClassName("show");
    let index = getIndex(selected[0]);
    if (index == -1) { return; }

    let x = event.target.value;
    // try to fix common URL mistakes
    if (x.slice(0, 4) != "http") {
        if (x.slice(0, 3) == "www")
            { x = "http://" + x; }
        else {
            x = "http://www." + x;
        }
    }

    // validate URL
    try {
        x = new URL(x);
    } catch (error) {
        alert("Invalid URL");
        return;
    }
    x = x.toString();
    event.target.value = x;

    shows[index].children[1].href = x;
    shows[index].children[1].target = "_blank";

    //update local store
    let urls = JSON.parse(localStorage.getItem("urls"));
    urls[index] = event.target.value;
    localStorage.setItem("urls", JSON.stringify(urls));
}

// update the icon URL of the selected shortcut
function iconFieldUpdate(event) {
    let selected = document.getElementsByClassName("selected");
    if (selected.length == 0) { return; }
    let shows = document.getElementsByClassName("show");
    let index = getIndex(selected[0]);
    if (index == -1) { return; }
    shows[index].children[0].src = event.target.value;

    //update local store
    let icons = JSON.parse(localStorage.getItem("icons"));
    icons[index] = event.target.value;
    localStorage.setItem("icons", JSON.stringify(icons));
}


// ###########################  PAGE CUSTOMIZATION FUNCTIONS  ###########################

function setBackGroundColor(event) {
    let selectedColor = event.target.value;
    document.getElementsByTagName("body")[0].style.backgroundColor = selectedColor;

    //save to localstorage
    localStorage.setItem("bgcolor", selectedColor);
}

// the frame is the box surrounding the icon grid, this sets the color.
function setFrameColor(event) {
    mainlist.style.backgroundColor = event.target.value;

    //save to localstorage
    localStorage.setItem("framecolor", event.target.value);
}

// sets the size of individual icons
function setIconSize(event) {
    let targetIconSize = event.target.value;
    if ((targetIconSize < 50)||(targetIconSize > 1000)) { return; }
    localStorage.setItem("iconsize", targetIconSize);

    cssChange(".show", "width", targetIconSize + "px");
    cssChange(".show", "height", targetIconSize + "px");
    cssChange(".show a, .show p", "font-size", targetIconSize/8 + "px");
}

// sets the padding around icons
function setIconMargin(event) {
    let targetIconMargin = event.target.value;
    if ((targetIconMargin < 0)||(targetIconMargin > 50)) { return; }
    localStorage.setItem("iconMargin", targetIconMargin);

    cssChange(".show", "margin", targetIconMargin + "px");
}

// sets the size of the frame surrounding the icon grid
function setFrameSize(event) {
    let targetFrameSize = event.target.value;
    if ((targetFrameSize < 400)||(targetFrameSize > 2000)) { return; }
    localStorage.setItem("framesize", targetFrameSize);

    mainlist.style.maxWidth = targetFrameSize + "px";
}

// toggles the header visibility
function toggleHeaderVisibility(){
    let x = header.style.visibility;
    if (x == "hidden") {
        header.style.visibility = "visible";
        localStorage.setItem("headerhidden", "false");
        showHeaderButton.innerHTML = "Hide Header";
    }
    else {
        header.style.visibility = "hidden";
        localStorage.setItem("headerhidden", "true");
        showHeaderButton.innerHTML = "Show Header";
    }
}


// ###########################  DATA EXPORT/IMPORT FUNCTIONS  ###########################

function downloadLocalStorage() {
    const localStorageData = JSON.stringify(localStorage);

    const blob = new Blob([localStorageData], { type: 'application/json' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'simpleStartpage.json';
    downloadLink.textContent = 'Download Backup';

    document.body.appendChild(downloadLink);
    downloadLink.click();

    URL.revokeObjectURL(downloadLink.href);
}

function uploadLocalStorage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const localStorageData = event.target.result;
        localStorage.clear();
        Object.entries(JSON.parse(localStorageData)).forEach(([key, value]) => {
            localStorage.setItem(key, value);
        });
        window.location.reload();
    };
    reader.readAsText(file);
    restoreDataFromLocalstorage();
}

function restoreDefaults(event) {
    if (confirm("Are you sure you want to restore defaults? This will delete all your shortcuts and settings."))
    {
        localStorage.clear();
        window.location.reload();
    }
    else { return; }
}

// create a button to add a hidden file input
function addHiddenFileInputButton() {
    let fileInput = document.createElement("input");
    fileInput.id = "hiddenFileInput";
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.style.display = "none";
    fileInput.addEventListener("change", uploadLocalStorage);
    uploadButton.appendChild(fileInput);
}

// when the upload button is pressed, click the hidden file input
function uploadButtonPressed(event) {
    document.getElementById("hiddenFileInput").click();
}


// RUN PAGE SETUP
setupPage();

// ###########################  EVENT LISTENERS  ###########################
settingButton.addEventListener("click", toggleEditMode);
shortcutName.addEventListener("input",selectCheck);
shortcutURL.addEventListener("input",selectCheck);
shortcutIcon.addEventListener("input",selectCheck);
shortcutName.addEventListener("blur", nameFieldUpdate);
shortcutURL.addEventListener("blur", urlFieldUpdate);
shortcutIcon.addEventListener("blur", iconFieldUpdate);
leftArrow.addEventListener("click", moveItemUp);
rightArrow.addEventListener("click", moveItemDown);
backgroundColorPicker.addEventListener("input", setBackGroundColor);
frameColorPicker.addEventListener("input", setFrameColor);
iconSize.addEventListener("input", setIconSize);
frameSize.addEventListener("input", setFrameSize);
downloadButton.addEventListener("click", downloadLocalStorage);
uploadButton.addEventListener("click", uploadButtonPressed);
showHeaderButton.addEventListener("click", toggleHeaderVisibility);
restoreDefaultsButton.addEventListener("click", restoreDefaults);
iconMargin.addEventListener("input", setIconMargin);
helpPageButton.addEventListener("click", helpPage);

