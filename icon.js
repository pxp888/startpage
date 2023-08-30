var editmode = false;

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

function addStyleTag() {
    const style = document.createElement('style');
    style.id = "customStyleTag";
    style.textContent = `
    .show {
        color: white;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 120px;
        height: 120px;
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
    `;
    document.head.appendChild(style);
}

function cssChange(selector, property, value){
    let sheet = document.getElementById("customStyleTag").sheet;
    let rules=sheet.cssRules;
    let x;
    for (let i=0; i<rules.length; i++) {
        if (rules[i].selectorText == selector) { x = rules[i].style; }
    }
    x.setProperty(property, value);
}

function restoreDataFromLocalstorage() {
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
    }

    let cuts = document.getElementsByClassName("cut");
    while (cuts.length > 0) {cuts[0].remove();}

    let info = document.getElementById("info");
    for (let i = 0; i < names.length; i++) {
        let ndiv = document.createElement("div");
        ndiv.setAttribute("class", "cut");
        let dname = document.createElement("p");
        let durl = document.createElement("p");
        let dicon = document.createElement("p");
        dname.innerHTML = names[i];
        durl.innerHTML = urls[i];
        dicon.innerHTML = icons[i];

        ndiv.appendChild(dname);
        ndiv.appendChild(durl);
        ndiv.appendChild(dicon);

        info.appendChild(ndiv);
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
}

function saveDataToLocalstorage() {
    let cuts = document.getElementsByClassName("cut");
    let names = [];
    let urls = [];
    let icons = [];

    for (let i = 0; i < cuts.length; i++) {
        names.push(cuts[i].children[0].innerHTML);
        urls.push(cuts[i].children[1].innerHTML);
        icons.push(cuts[i].children[2].innerHTML);
    }

    localStorage.setItem("names", JSON.stringify(names));
    localStorage.setItem("urls", JSON.stringify(urls));
    localStorage.setItem("icons", JSON.stringify(icons));

    let bgcolor = document.getElementsByTagName("body")[0].style.backgroundColor;
    let framecolor = document.getElementById("mainlist").style.backgroundColor;
    localStorage.setItem("bgcolor", bgcolor);
    localStorage.setItem("framecolor", framecolor);
}

function displayNormalIcons() {
    
    let targetFrameSize = localStorage.getItem("framesize");
    if (targetFrameSize == null) { targetFrameSize = 1200; }
    document.getElementById("mainlist").style.maxWidth = targetFrameSize + "px";

    let cuts = document.getElementsByClassName("cut");
    let shows = document.getElementsByClassName("show");
    let mainlist = document.getElementById("mainlist");
    
    let plusses = document.getElementsByClassName("plus");
    while (shows.length > 0) {shows[0].remove();}
    while (plusses.length > 0) {plusses[0].remove();}

    for (let i = 0; i < cuts.length; i++) {
        let ndiv = document.createElement("div");
        ndiv.className = "show";
        
        let im = document.createElement("img");
        let x = cuts[i].children[2].innerHTML;
        if (x ==""){ x = "assets/images/blankimage.png";}
        im.src = x;

        let link = document.createElement("a");
        link.innerHTML = cuts[i].children[0].innerHTML;
                
        x = cuts[i].children[1].innerHTML;
        if (x.slice(0, 4) != "http") { x = "http://" + x; }
        link.href = x;

        ndiv.appendChild(im);
        ndiv.appendChild(link);
        mainlist.appendChild(ndiv);
    }
}

function displayEditIcons() {
    let targetFrameSize = localStorage.getItem("framesize");
    if (targetFrameSize == null) { targetFrameSize = 1200; }
    document.getElementById("mainlist").style.maxWidth = targetFrameSize + "px";

    let cuts = document.getElementsByClassName("cut");
    let mainlist = document.getElementById("mainlist");
    let shows = document.getElementsByClassName("show");

    while (shows.length > 0) {shows[0].remove();}
    
    for (let i=0; i < cuts.length; i++) {
        let ndiv = document.createElement("div");
        ndiv.className = "show";
        
        let im = document.createElement("img");
        let x = cuts[i].children[2].innerHTML;
        if (x ==""){ x = "assets/images/blankimage.png";}
        im.src = x;
        
        let link = document.createElement("p");
        link.innerHTML = cuts[i].children[0].innerHTML;
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

    let plus = document.createElement("img");
    plus.classList.add("show");
    plus.classList.add("plusButton");
    plus.src = "assets/images/plus.png";
    plus.addEventListener("click", addBlankItem);

    mainlist.appendChild(plus);

    document.getElementById("shortcutName").value = "";
    document.getElementById("shortcutURL").value = "";
    document.getElementById("shortcutIcon").value = "";
}

function toggleEditMode() {
    editmode = !editmode;
    let settingScreen = document.getElementById("settingScreen");

    if (editmode){
        displayEditIcons();
        settingScreen.style.display = "block";
        document.getElementById("spacer").style.display = "block";
    }
    else {
        displayNormalIcons();
        settingScreen.style.display = "none";
        document.getElementById("spacer").style.display = "none";
        saveDataToLocalstorage();
    }
}

function selectItem(event) {
    if (event.target==null) { return; }
    let shows = document.getElementsByClassName("show");
    let cuts = document.getElementsByClassName("cut");
    
    let index = getIndex(event.target);
    if (index == -1) { return; }

    for (let i=0; i < shows.length-1; i++) { shows[i].className="show unselected"; }
    shows[index].className="show selected";

    let shortcutName = document.getElementById("shortcutName");
    let shortcutURL = document.getElementById("shortcutURL");
    let shortcutIcon = document.getElementById("shortcutIcon");
    shortcutName.value = cuts[index].children[0].innerHTML;
    shortcutURL.value = cuts[index].children[1].innerHTML;
    shortcutIcon.value = cuts[index].children[2].innerHTML;
}

function addBlankItem() {
    let mainlist = document.getElementById("mainlist");
    let shows = document.getElementsByClassName("show");
    let info = document.getElementById("info");

    for (let i=0; i < shows.length-1; i++) { shows[i].className="show unselected"; }

    let newShow = document.createElement("div");
    newShow.className = "show selected";

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

    let newCut = document.createElement("div");
    newCut.setAttribute("class", "cut");
    let dname = document.createElement("p");
    let durl = document.createElement("p");
    let dicon = document.createElement("p");
    newCut.appendChild(dname);
    newCut.appendChild(durl);
    newCut.appendChild(dicon);
    info.appendChild(newCut);

    document.getElementById("shortcutName").value = newCut.children[0].innerHTML;
    document.getElementById("shortcutURL").value = newCut.children[1].innerHTML;
    document.getElementById("shortcutIcon").value = newCut.children[2].innerHTML;
}

function removeItem(event) {
    let shows = document.getElementsByClassName("show");
    let cuts = document.getElementsByClassName("cut");

    let index = getIndex(event.target);
    if (index == -1) { return; }
    shows[index].remove();
    cuts[index].remove();
}

function nameUpdate(event) {
    let selected = document.getElementsByClassName("selected");
    if (selected.length == 0) {
        alert("No item selected, please click a link to edit");
        return;
    }
    let shows = document.getElementsByClassName("show");
    let cuts = document.getElementsByClassName("cut");
    let index = getIndex(selected[0]);
    if (index == -1) { 
        return; 
    }
    cuts[index].children[0].innerHTML = event.target.value;
    shows[index].children[1].innerHTML = event.target.value;
}

function urlUpdate(event) {
    let selected = document.getElementsByClassName("selected");
    if (selected.length == 0) {
        alert("No item selected, please click a link to edit");
        return;
    }
    let shows = document.getElementsByClassName("show");
    let cuts = document.getElementsByClassName("cut");
    let index = getIndex(selected[0]);
    if (index == -1) { 
        alert("No item selected, please click a link to edit");
        return; 
    }
    cuts[index].children[1].innerHTML = event.target.value;
    let x = cuts[index].children[1].innerHTML;
    if (x.slice(0, 4) != "http") { x = "http://" + x; }
    shows[index].children[2].innerHTML = x;
}

function iconUpdate(event) {
    let selected = document.getElementsByClassName("selected");
    if (selected.length == 0) {
        alert("No item selected, please click a link to edit");
        return;
    }
    let shows = document.getElementsByClassName("show");
    let cuts = document.getElementsByClassName("cut");
    let index = getIndex(selected[0]);
    if (index == -1) { 
        alert("No item selected, please click a link to edit");
        return; 
    }
    cuts[index].children[2].innerHTML = event.target.value;
    shows[index].children[0].src = event.target.value;
}

function moveItemUp(event){
    let shows = document.getElementsByClassName("show");
    let cuts = document.getElementsByClassName("cut");

    let index = getIndex(document.getElementsByClassName("selected")[0]);
    if (index == -1) { return; }
    if ((index == 0)||(index == cuts.length)) { return; }
    cuts[index].parentNode.insertBefore(cuts[index], cuts[index-1]);
    shows[index].parentNode.insertBefore(shows[index], shows[index-1]);
}

function moveItemDown(event){
    let shows = document.getElementsByClassName("show");
    let cuts = document.getElementsByClassName("cut");

    let index = getIndex(document.getElementsByClassName("selected")[0]);
    if (index == -1) { return; }
    if (index == cuts.length-1) { return; }
    cuts[index].parentNode.insertBefore(cuts[index+1], cuts[index]);
    shows[index].parentNode.insertBefore(shows[index+1], shows[index]);
}

function setBackGroundColor(event) {
    let selectedColor = event.target.value;
    document.getElementsByTagName("body")[0].style.backgroundColor = selectedColor;
}

function setFrameColor(event) {
    document.getElementById("mainlist").style.backgroundColor = event.target.value;
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

function checkHeaderShowing() {
    let x = localStorage.getItem("headerhidden");
    if (x == null) { return; }
    if (x == "true") { 
        document.getElementById("header").style.visibility = "hidden";
        document.getElementById("showHeaderButton").innerHTML = "Show Header";
    }
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


addStyleTag();
checkHeaderShowing();
restoreDataFromLocalstorage();
displayNormalIcons();

let settingButton = document.getElementById("settingButton");
settingButton.addEventListener("click", toggleEditMode);

let shortcutName = document.getElementById("shortcutName");
shortcutName.addEventListener("input", nameUpdate);

let shortcutURL = document.getElementById("shortcutURL");
shortcutURL.addEventListener("input", urlUpdate);

let shortcutIcon = document.getElementById("shortcutIcon");
shortcutIcon.addEventListener("input", iconUpdate);

let leftArrow = document.getElementById("leftArrow");
leftArrow.addEventListener("click", moveItemUp);

let rightArrow = document.getElementById("rightArrow");
rightArrow.addEventListener("click", moveItemDown);

let backgroundColorPicker = document.getElementById("backgroundColorPicker");
backgroundColorPicker.addEventListener("input", setBackGroundColor);

let frameColorPicker = document.getElementById("frameColorPicker");
frameColorPicker.addEventListener("input", setFrameColor);

let iconSize = document.getElementById("iconSize");
iconSize.addEventListener("input", setIconSize);

let frameSize = document.getElementById("frameSize");
frameSize.addEventListener("input", setFrameSize);

let downloadButton = document.getElementById("downloadButton");
downloadButton.addEventListener("click", downloadLocalStorage);

let uploadButton = document.getElementById("uploadButton");
uploadButton.addEventListener("change", uploadLocalStorage);

let showHeaderButton = document.getElementById("showHeaderButton");
showHeaderButton.addEventListener("click", toggleHeaderVisibility);

