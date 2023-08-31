var editmode = false;

// HELPER FUNCTIONS

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

// PAGE SETUP FUNCTIONS

// adds a style tag to the head of the document with the CSS for the icons
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
        document.getElementById("header").style.visibility = "hidden";
        document.getElementById("showHeaderButton").innerHTML = "Show Header";
    }
}

// restores the data from localstorage, or sets defaults if there is no data
function restoreDataFromLocalstorage() {
    // create shortcut data
    let names = JSON.parse(localStorage.getItem("names"));
    let icons = JSON.parse(localStorage.getItem("icons"));
    let urls = JSON.parse(localStorage.getItem("urls"));

    if (names == null || names.length == 0) {
        names = []; 
        icons = [];
        urls = [];
        names.push("Google");
        urls.push("www.google.com");
        icons.push("https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png");
        names.push("Youtube");
        urls.push("www.youtube.com");
        icons.push("https://cdn-icons-png.flaticon.com/512/1384/1384060.png");
        names.push("Gmail");
        urls.push("www.gmail.com");
        icons.push("https://cdn-icons-png.flaticon.com/512/732/732200.png");
        names.push("Instagram");
        urls.push("www.instagram.com");
        icons.push("https://cdn-icons-png.flaticon.com/512/174/174855.png");
        names.push("Spotify");
        urls.push("www.spotify.com");
        icons.push("https://cdn-icons-png.flaticon.com/512/174/174872.png");
        names.push("Facebook");
        urls.push("www.facebook.com");
        icons.push("https://cdn-icons-png.flaticon.com/512/733/733547.png");
        names.push("Twitter");
        urls.push("https://twitter.com/");
        icons.push("https://cdn-icons-png.flaticon.com/512/733/733579.png");
        names.push("Google Drive");
        urls.push("www.drive.google.com");
        icons.push("https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/1147px-Google_Drive_icon_%282020%29.svg.png");
        names.push("BBC");
        urls.push("www.bbc.com");
        icons.push("https://cdn.icon-icons.com/icons2/70/PNG/512/bbc_news_14062.png");
        names.push("Netflix");
        urls.push("www.netflix.com");
        icons.push("https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png");
        names.push("Amazon");
        urls.push("www.amazon.com");
        icons.push("https://cdn-icons-png.flaticon.com/512/732/732177.png");
        names.push("Reddit");
        urls.push("www.reddit.com");
        icons.push("https://cdn-icons-png.flaticon.com/512/2111/2111589.png");
        names.push("Wikipedia");
        urls.push("www.wikipedia.org");
        icons.push("https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Wikipedia%27s_W.svg/1024px-Wikipedia%27s_W.svg.png");
        names.push("Github");
        urls.push("www.github.com");
        icons.push("https://cdn-icons-png.flaticon.com/512/733/733553.png");
        names.push("LinkedIn");
        urls.push("www.linkedin.com");
        icons.push("https://cdn-icons-png.flaticon.com/512/174/174857.png");
        names.push("Booking.com");
        urls.push("www.booking.com");
        icons.push("https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Booking.com_Icon_2022.svg/1200px-Booking.com_Icon_2022.svg.png");
        names.push("Google Photos");
        urls.push("www.photos.google.com");
        icons.push("https://cdn-icons-png.flaticon.com/512/2991/2991131.png");
        names.push("Google Calendar");
        urls.push("https://calendar.google.com/calendar/r?pli=1");
        icons.push("https://cdn-icons-png.flaticon.com/512/5968/5968499.png");

        localStorage.setItem("names", JSON.stringify(names));
        localStorage.setItem("urls", JSON.stringify(urls));
        localStorage.setItem("icons", JSON.stringify(icons));
    }

    //set background color
    let bgcolor = localStorage.getItem("bgcolor");
    if (bgcolor != null) { 
        document.getElementsByTagName("body")[0].style.backgroundColor = bgcolor; 
        document.getElementById("backgroundColorPicker").value = bgcolor;
    }
    
    //set frame color
    let framecolor = localStorage.getItem("framecolor");
    if (framecolor != null) { 
        document.getElementById("mainlist").style.backgroundColor = framecolor; 
        document.getElementById("frameColorPicker").value = framecolor;
    }

    //set icon size
    let targetIconSize = localStorage.getItem("iconsize");
    if (targetIconSize != null) {
        cssChange(".show", "width", targetIconSize + "px");
        cssChange(".show", "height", targetIconSize + "px");
        cssChange(".show a, .show p", "font-size", targetIconSize/8 + "px");
    }

    //set frame size
    let targetFrameSize = localStorage.getItem("framesize");
    if (targetFrameSize != null) {
        document.getElementById("mainlist").style.maxWidth = targetFrameSize + "px";
        document.getElementById("frameSize").value = targetFrameSize;
    }
}

// sets the CSS for the icon view
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
    `;
}

// shows the settings pane and editing controls, or hides them
function toggleEditMode() {
    editmode = !editmode;
    let settingScreen = document.getElementById("settingScreen");

    if (editmode){
        displayEditIcons();
        settingScreen.style.display = "block";
        document.getElementById("spacer").style.display = "block";
        
        //set the spacer element to the same height as the settingScreen
        let x = settingScreen.getBoundingClientRect();
        document.getElementById("spacer").style.height = x.height + "px";
    }
    else {
        displayNormalIcons();
        settingScreen.style.display = "none";
        document.getElementById("spacer").style.display = "none";
    }
}

// displays the icons with the editing controls
function displayNormalIcons() {
    // set the frame width
    let targetFrameSize = localStorage.getItem("framesize");
    if (targetFrameSize == null) { targetFrameSize = 1200; }
    document.getElementById("mainlist").style.maxWidth = targetFrameSize + "px";

    let names = JSON.parse(localStorage.getItem("names"));
    let icons = JSON.parse(localStorage.getItem("icons"));
    let urls = JSON.parse(localStorage.getItem("urls"));

    let shows = document.getElementsByClassName("show");
    let mainlist = document.getElementById("mainlist");
    
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
    document.getElementById("mainlist").style.maxWidth = targetFrameSize + "px";

    let names = JSON.parse(localStorage.getItem("names"));
    let icons = JSON.parse(localStorage.getItem("icons"));

    let mainlist = document.getElementById("mainlist");
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
    document.getElementById("shortcutName").value = "";
    document.getElementById("shortcutURL").value = "";
    document.getElementById("shortcutIcon").value = "";
}

// SHORTCUT EDITING FUNCTIONS

// update CSS for a selected shortcut, and update the editing fields
function selectItem(event) {
    if (event.target==null) { return; }
    let shows = document.getElementsByClassName("show");
    let names = JSON.parse(localStorage.getItem("names"));
    let icons = JSON.parse(localStorage.getItem("icons"));
    let urls = JSON.parse(localStorage.getItem("urls"));

    let index = getIndex(event.target);
    if (index == -1) { return; }

    // update CSS
    for (let i=0; i < shows.length-1; i++) { shows[i].className="show unselected"; }
    shows[index].className="show selected";

    // update editing fields
    document.getElementById("shortcutName").value = names[index];
    document.getElementById("shortcutURL").value = urls[index];
    document.getElementById("shortcutIcon").value = icons[index];
}

// create new shortcut
function addBlankItem() {
    let mainlist = document.getElementById("mainlist");
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
    document.getElementById("shortcutName").value = "";
    document.getElementById("shortcutURL").value = "";
    document.getElementById("shortcutIcon").value = "";

    //add new blank data to localstorage
    let names = JSON.parse(localStorage.getItem("names"));
    let icons = JSON.parse(localStorage.getItem("icons"));
    let urls = JSON.parse(localStorage.getItem("urls"));
    names.push("");
    icons.push("");
    urls.push("");
    localStorage.setItem("names", JSON.stringify(names));
    localStorage.setItem("icons", JSON.stringify(icons));
    localStorage.setItem("urls", JSON.stringify(urls));
}

// remove shortcut
function removeItem(event) {
    let shows = document.getElementsByClassName("show");

    let index = getIndex(event.target);
    if (index == -1) { return; }
    shows[index].remove();

    //remove data from localstorage
    let names = JSON.parse(localStorage.getItem("names"));
    let icons = JSON.parse(localStorage.getItem("icons"));
    let urls = JSON.parse(localStorage.getItem("urls"));
    names.splice(index, 1);
    icons.splice(index, 1);
    urls.splice(index, 1);
    localStorage.setItem("names", JSON.stringify(names));
    localStorage.setItem("icons", JSON.stringify(icons));
    localStorage.setItem("urls", JSON.stringify(urls));
}

function moveItemUp(event){
    let shows = document.getElementsByClassName("show");

    let index = getIndex(document.getElementsByClassName("selected")[0]);
    if (index == -1) { 
        alert("No item selected, please click a link to edit");
        return; 
    }
    if ((index == 0)||(index == shows.length)) { return; }
    shows[index].parentNode.insertBefore(shows[index], shows[index-1]);

    //update local store
    let names = JSON.parse(localStorage.getItem("names"));
    let icons = JSON.parse(localStorage.getItem("icons"));
    let urls = JSON.parse(localStorage.getItem("urls"));
    let temp = names[index];
    names[index] = names[index-1];
    names[index-1] = temp;
    temp = icons[index];
    icons[index] = icons[index-1];
    icons[index-1] = temp;
    temp = urls[index];
    urls[index] = urls[index-1];
    urls[index-1] = temp;
    localStorage.setItem("names", JSON.stringify(names));
    localStorage.setItem("icons", JSON.stringify(icons));
    localStorage.setItem("urls", JSON.stringify(urls));
}

function moveItemDown(event){
    let shows = document.getElementsByClassName("show");

    let index = getIndex(document.getElementsByClassName("selected")[0]);
    if (index == -1) { 
        alert("No item selected, please click a link to edit");
        return; 
    }
    if (index == shows.length-2) { return; }
    shows[index].parentNode.insertBefore(shows[index+1], shows[index]);

    //update local store
    let names = JSON.parse(localStorage.getItem("names"));
    let icons = JSON.parse(localStorage.getItem("icons"));
    let urls = JSON.parse(localStorage.getItem("urls"));
    let temp = names[index];
    names[index] = names[index+1];
    names[index+1] = temp;
    temp = icons[index];
    icons[index] = icons[index+1];
    icons[index+1] = temp;
    temp = urls[index];
    urls[index] = urls[index+1];
    urls[index+1] = temp;
    localStorage.setItem("names", JSON.stringify(names));
    localStorage.setItem("icons", JSON.stringify(icons));
    localStorage.setItem("urls", JSON.stringify(urls));
}

// update the name of the selected shortcut
function nameFieldUpdate(event) {
    let selected = document.getElementsByClassName("selected");
    if (selected.length == 0) {
        alert("No item selected, please click a link to edit");
        return;
    }
    let shows = document.getElementsByClassName("show");
    let index = getIndex(selected[0]);
    if (index == -1) { 
        return; 
    }
    shows[index].children[1].innerHTML = event.target.value;

    //update local store
    let names = JSON.parse(localStorage.getItem("names"));
    names[index] = event.target.value;
    localStorage.setItem("names", JSON.stringify(names));
}

// update the URL of the selected shortcut
function urlFieldUpdate(event) {
    let selected = document.getElementsByClassName("selected");
    if (selected.length == 0) {
        alert("No item selected, please click a link to edit");
        return;
    }
    let shows = document.getElementsByClassName("show");
    let index = getIndex(selected[0]);
    if (index == -1) { 
        alert("No item selected, please click a link to edit");
        return; 
    }

    let x = event.target.value;
    if (x.slice(0, 4) != "http") { x = "http://" + x; }
    shows[index].children[1].innerHTML = event.target.value;
    shows[index].children[1].href = x;

    //update local store
    let urls = JSON.parse(localStorage.getItem("urls"));
    urls[index] = event.target.value;
    localStorage.setItem("urls", JSON.stringify(urls));
}

// update the icon URL of the selected shortcut
function iconFieldUpdate(event) {
    let selected = document.getElementsByClassName("selected");
    if (selected.length == 0) {
        alert("No item selected, please click a link to edit");
        return;
    }
    let shows = document.getElementsByClassName("show");
    let index = getIndex(selected[0]);
    if (index == -1) { 
        alert("No item selected, please click a link to edit");
        return; 
    }
    shows[index].children[0].src = event.target.value;

    //update local store
    let icons = JSON.parse(localStorage.getItem("icons"));
    icons[index] = event.target.value;
    localStorage.setItem("icons", JSON.stringify(icons));
}

// PAGE CUSTOMIZATION FUNCTIONS

function setBackGroundColor(event) {
    let selectedColor = event.target.value;
    document.getElementsByTagName("body")[0].style.backgroundColor = selectedColor;

    //save to localstorage
    localStorage.setItem("bgcolor", selectedColor);
}

function setFrameColor(event) {
    document.getElementById("mainlist").style.backgroundColor = event.target.value;

    //save to localstorage
    localStorage.setItem("framecolor", event.target.value);
}

function setIconSize(event) {
    let targetIconSize = event.target.value;
    if ((targetIconSize < 50)||(targetIconSize > 1000)) { return; }
    localStorage.setItem("iconsize", targetIconSize);

    cssChange(".show", "width", targetIconSize + "px");
    cssChange(".show", "height", targetIconSize + "px");
    cssChange(".show a, .show p", "font-size", targetIconSize/8 + "px");
}

function setFrameSize(event) {
    let targetFrameSize = event.target.value;
    if ((targetFrameSize < 400)||(targetFrameSize > 2000)) { return; }
    localStorage.setItem("framesize", targetFrameSize);

    let mainlist = document.getElementById("mainlist");
    mainlist.style.maxWidth = targetFrameSize + "px";
}

function toggleHeaderVisibility(){
    let x = document.getElementById("header").style.visibility;
    if (x == "hidden") { 
        document.getElementById("header").style.visibility = "visible";
        localStorage.setItem("headerhidden", "false");
        document.getElementById("showHeaderButton").innerHTML = "Hide Header";
    }
    else { 
        document.getElementById("header").style.visibility = "hidden";
        localStorage.setItem("headerhidden", "true");
        document.getElementById("showHeaderButton").innerHTML = "Show Header";
    }
}

// DATA EXPORT/IMPORT FUNCTIONS

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


// EVENT LISTENERS
document.getElementById("settingButton").addEventListener("click", toggleEditMode);
document.getElementById("shortcutName").addEventListener("input", nameFieldUpdate);
document.getElementById("shortcutURL").addEventListener("input", urlFieldUpdate);
document.getElementById("shortcutIcon").addEventListener("input", iconFieldUpdate);
document.getElementById("leftArrow").addEventListener("click", moveItemUp);
document.getElementById("rightArrow").addEventListener("click", moveItemDown);
document.getElementById("backgroundColorPicker").addEventListener("input", setBackGroundColor);
document.getElementById("frameColorPicker").addEventListener("input", setFrameColor);
document.getElementById("iconSize").addEventListener("input", setIconSize);
document.getElementById("frameSize").addEventListener("input", setFrameSize);
document.getElementById("downloadButton").addEventListener("click", downloadLocalStorage);
document.getElementById("uploadButton").addEventListener("change", uploadLocalStorage);
document.getElementById("showHeaderButton").addEventListener("click", toggleHeaderVisibility);


addStyleTag();
checkHeaderShowing();
restoreDataFromLocalstorage();
displayNormalIcons();
