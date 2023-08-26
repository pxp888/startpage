var editMode = false;


function clearCurrent() {
    let cur = document.getElementsByClassName("current");
    while (cur.length > 0) {
        cur[0].classList.remove("current");
    }
    let shortcutName = document.getElementById("shortcutName");
    let shortcutURL = document.getElementById("shortcutURL");
    let shortcutIcon = document.getElementById("shortcutIcon");
    shortcutName.value = "";
    shortcutURL.value = "";
    shortcutIcon.value = "";
}

function setLines() {
    let cur = document.getElementsByClassName("current")[0];
    if (cur == null) {return;}
    let shortcutName = document.getElementById("shortcutName");
    let shortcutURL = document.getElementById("shortcutURL");
    let shortcutIcon = document.getElementById("shortcutIcon");

    let name = cur.getElementsByClassName("cutname")[0].innerHTML;
    shortcutName.value = name;

    let url = cur.getElementsByClassName("cutlink")[0].href;
    if (url=="javascript:void(0)") {url = "";}
    shortcutURL.value = url;

    let icon = cur.getElementsByClassName("cutimage")[0].src;
    if (icon.includes("file:///")) {icon = "";}
    shortcutIcon.value = icon;

}

function setCurrent(event) {
    clearCurrent();
    event.target.parentNode.classList.add("current");
    setLines();
}

function removeCut(event) {
    mom = event.target.parentNode;
    mom.remove();
    clearCurrent();
}

function addBlank(event) {
    clearCurrent();

    let mainlist = document.getElementById("mainlist");

    let ndiv = document.createElement("div");
    let nlink = document.createElement("a");
    let nim = document.createElement("img");
    let nlab = document.createElement("p");
    let nxbut = document.createElement("img");

    ndiv.className = "cut current";

    nlink.className = "cutlink";
    nlink.href = "javascript:void(0)";
    
    nim.className = "cutimage";
    nim.src = "assets/images/blankimage.png";
    nim.addEventListener("click", setCurrent);

    nlab.className = "cutname";
    nlab.innerHTML = "New Shortcut";

    nxbut.className = "xbut";
    nxbut.src = "assets/images/x.webp";
    nxbut.style.visibility = "visible";
    nxbut.addEventListener("click", removeCut);

    ndiv.appendChild(nlink);
    ndiv.appendChild(nlab);
    ndiv.appendChild(nxbut);
    ndiv.appendChild(nim);

    mainlist.insertBefore(ndiv, mainlist.lastChild);
    setLines();
}


function toggleEdit() {
    editMode = !editMode;

    if (editMode) {
        //show settings 
        document.getElementById("settingScreen").style.visibility = "visible";

        //disable links
        let ims = document.getElementsByClassName("cutimage");
        for (let i = 0; i < ims.length; i++) {
            ims[i].parentNode.parentNode.appendChild(ims[i]);
        }

        //show x buttons
        let xbtns = document.getElementsByClassName("xbut");
        for (let i = 0; i < xbtns.length; i++) {
            xbtns[i].style.visibility = "visible";
        }

        //add plus button
        let plus = document.createElement("img");
        plus.src = "assets/images/plus.png";
        plus.className = "plusButton";
        plus.addEventListener("click", addBlank);
        
        mainlist.appendChild(plus);

    }
    else {
        //hide settings
        document.getElementById("settingScreen").style.visibility = "hidden";

        //enable links
        let ims = document.getElementsByClassName("cutimage");
        let links = document.getElementsByClassName("cutlink");
        for (let i = 0; i < ims.length; i++) {
            links[i].appendChild(ims[i]);
        }

        //hide x buttons
        let xbtns = document.getElementsByClassName("xbut");
        for (let i = 0; i < xbtns.length; i++) {
            xbtns[i].style.visibility = "hidden";
        }

        //remove plus button
        let pubs = document.getElementsByClassName("plusButton");
        while (pubs.length > 0) {
            pubs[0].parentNode.removeChild(pubs[0]);
        }

        clearCurrent();
    }
}

function updateName(event) {
    let cur = document.getElementsByClassName("current")[0];
    if (cur == null) {return;}
    let shortcutName = document.getElementById("shortcutName");
    cur.getElementsByClassName("cutname")[0].innerHTML = shortcutName.value;
}

function updateURL(event) {
    let cur = document.getElementsByClassName("current")[0];
    if (cur == null) {return;}
    let shortcutURL = document.getElementById("shortcutURL");
    let t = shortcutURL.value;
    t = "https://" + shortcutURL.value;
    console.log(t);
    cur.getElementsByClassName("cutlink")[0].href = t;
}

function updateIcon(event) {
    let cur = document.getElementsByClassName("current")[0];
    if (cur == null) {return;}
    let shortcutIcon = document.getElementById("shortcutIcon");
    cur.getElementsByClassName("cutimage")[0].src = shortcutIcon.value;
}


//connect buttons to functions
let cutims = document.getElementsByClassName("cutimage");
for (let i = 0; i < cutims.length; i++) {
    cutims[i].addEventListener("click", setCurrent);
}

let xbtns = document.getElementsByClassName("xbut");
for (let i = 0; i < xbtns.length; i++) {
    xbtns[i].addEventListener("click", removeCut);
}

let settingButton = document.getElementById("settingButton");
settingButton.addEventListener("click", toggleEdit);

let shortcutName = document.getElementById("shortcutName");
shortcutName.addEventListener("input", updateName);

let shortcutURL = document.getElementById("shortcutURL");
shortcutURL.addEventListener("input", updateURL);

let shortcutIcon = document.getElementById("shortcutIcon");
shortcutIcon.addEventListener("input", updateIcon);
