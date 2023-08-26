var editmode = false;
var current = null;


function clearSelected() {
    current = null;
    let cuts = document.getElementsByClassName("cut");
    for (let i = 0; i < cuts.length; i++) {
        cuts[i].style.border = "none";
    }
}

function addBlank() {
    let ndiv = document.createElement("div");
    let nlink = document.createElement("a");
    let nim = document.createElement("img");
    let ntext = document.createElement("p");
    let nxim = document.createElement("img");
    
    ndiv.className = "cut blank";
    nlink.href = "#";

    nxim.src = "assets/images/x.webp";
    nxim.className = "xbut";
    nxim.style.visibility = "visible";
    nxim.addEventListener("click", removeShortcut);

    ntext.innerHTML = "New Shortcut";
    ntext.className = "cutname";

    nim.src = "assets/images/plus.png";
    nim.className = "cutimage";
    nim.addEventListener("click", imageclicked);
    
    ndiv.appendChild(nlink);
    ndiv.appendChild(ntext);
    ndiv.appendChild(nxim);
    ndiv.appendChild(nim);

    let mainlist = document.getElementById("mainlist");
    mainlist.appendChild(ndiv);
}

function showEdit() {
    //show the settings screen
    let settingScreen= document.getElementById("settingScreen");    
    settingScreen.style.visibility = "visible";

    //show the x buttons
    let xbuttons = document.getElementsByClassName("xbut");
    for (let i = 0; i < xbuttons.length; i++) {
        xbuttons[i].style.visibility = "visible";
    }

    //disable links for editing
    let ims = document.getElementsByClassName("cutimage");
    for (let i = 0; i < ims.length; i++) {
        let mom = ims[i].parentNode;
        let grandpa = mom.parentNode;
        mom.style.visibility = "hidden";
        grandpa.appendChild(ims[i]);
    }

    //add a blank shortcut
    addBlank();
}

function hideEdit() {
    //hide the settings screen and x buttons
    let settingScreen= document.getElementById("settingScreen");
    let xbuttons = document.getElementsByClassName("xbut");
    settingScreen.style.visibility = "hidden";
    for (let i = 0; i < xbuttons.length; i++) {
        xbuttons[i].style.visibility = "hidden";
    }

    //enable links again
    let ims = document.getElementsByClassName("cutimage");
    for (let i = 0; i < ims.length; i++) {
        let mom = ims[i].parentNode;
        let bro = mom.children[0];
        bro.style.visibility = "visible";
        bro.appendChild(ims[i]);
    }

    //remove blank shortcuts
    let mainlist = document.getElementById("mainlist");
    let blanks = document.getElementsByClassName("cut blank");
    while (blanks.length > 0) {
        mainlist.removeChild(blanks[0]);
    }
    
    clearSelected();
}

function toggleEdit() {
    editmode = !editmode;
    let settingScreen= document.getElementById("settingScreen");
    let xbuttons = document.getElementsByClassName("xbut");

    if (editmode) {
        showEdit();
        }
     else {
        hideEdit();
    }
}

function imageclicked(event) {
    let shortcutIcon = document.getElementById("shortcutIcon");
    let shortcutName = document.getElementById("shortcutName");
    let shortcutURL = document.getElementById("shortcutURL");

    mom = event.target.parentNode;

    if (mom.className == "cut blank") {
        shortcutIcon.value = "";
        shortcutURL.value = "";
        shortcutName.value = mom.children[1].innerHTML;   
    }
    else {
        shortcutIcon.value = event.target.src;     
        shortcutURL.value = mom.children[0].href;
        shortcutName.value = mom.children[1].innerHTML;   
    }

    clearSelected();
    current = mom;
    mom.style.border = "2px solid rgb(255,97,24)";
}

function update(event) {
    if (current == null) {return;}
    let shortcutIcon = document.getElementById("shortcutIcon");
    let shortcutName = document.getElementById("shortcutName");
    let shortcutURL = document.getElementById("shortcutURL");

    if (current.className == "cut blank") {
        current.className = "cut";
    }

    current.children[0].href = shortcutURL.value;
    current.children[1].innerHTML = shortcutName.value;
    current.children[3].src = shortcutIcon.value;
}

function removeShortcut(event) {
    mom = event.target.parentNode;
    mom.remove();
}

function setListeners(){
    let ims = document.getElementsByClassName("cutimage");
    for (let i = 0; i < ims.length; i++) { ims[i].addEventListener("click", imageclicked); }
    
    let xbuttons = document.getElementsByClassName("xbut");
    for (let i = 0; i < xbuttons.length; i++) { xbuttons[i].addEventListener("click", removeShortcut); }
}



let settingButton = document.getElementById("settingButton");
settingButton.addEventListener("click", toggleEdit);

let updatebut = document.getElementById("updateButton");
updatebut.addEventListener("click", update);

let newButton = document.getElementById("newButton");
newButton.addEventListener("click", addBlank);

setListeners();



