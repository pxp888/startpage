var editmode = false;


function toggleEdit() {
    let mainlist = document.getElementById("mainlist");

    editmode = !editmode;
    if (editmode) {
        displayEdit();
        let settingScreen = document.getElementById("settingScreen");
        settingScreen.style.visibility = "visible";

    } else {
        displayNormal();
        let settingScreen = document.getElementById("settingScreen");

        settingScreen.style.visibility = "hidden";

        let plus = document.getElementsByClassName("plusButton");
        while (plus.length > 0) { plus[0].remove(); }
    }
}


function xPressed(event) {
    let x = event.target;
    while (x.className != "cut") { x = x.parentNode; }
    x.remove();
}

function selectItem(event) {
    let shows = document.getElementsByClassName("show");
    for (let i = 0; i < shows.length; i++) { shows[i].className = "show"; }

    let x = event.target;
    while (x.className != "show") { x = x.parentNode; }
    x.classList.add("selected");

    let info = x.parentNode.children[0];
    let shortcutName = document.getElementById("shortcutName");
    let shortcutURL = document.getElementById("shortcutURL");
    let shortcutIcon = document.getElementById("shortcutIcon");
    shortcutName.value = info.children[0].innerHTML;
    shortcutURL.value = info.children[1].innerHTML;
    shortcutIcon.value = info.children[2].innerHTML;
}

function addBlank() {
    let mainlist = document.getElementById("mainlist");
    
    let ndiv = document.createElement("div");
    ndiv.classList.add("cut");

    let info = document.createElement("div");
    info.classList.add("info");
    let dname = document.createElement("p");
    let durl = document.createElement("p");
    let dicon = document.createElement("p");
    info.appendChild(dname);
    info.appendChild(durl);
    info.appendChild(dicon);

    ndiv.appendChild(info);
    mainlist.appendChild(ndiv);

    displayEdit();
}

function restoreData() {
    //get info from localstorage
    let names = JSON.parse(localStorage.getItem("names"));
    let icons = JSON.parse(localStorage.getItem("icons"));
    let urls = JSON.parse(localStorage.getItem("urls"));

    let mainlist = document.getElementById("mainlist");

    //create shortcut for each info item
    for (let i=0; i<names.length; i++) {
        let ndiv = document.createElement("div");
        ndiv.classList.add("cut");

        let info = document.createElement("div");
        info.classList.add("info");
        let dname = document.createElement("p");
        let durl = document.createElement("p");
        let dicon = document.createElement("p");
        dname.innerHTML = names[i];
        durl.innerHTML = urls[i];
        dicon.innerHTML = icons[i];
        info.appendChild(dname);
        info.appendChild(durl);
        info.appendChild(dicon);

        ndiv.appendChild(info);
        mainlist.appendChild(ndiv);
    }
}

function displayNormal() {
    items = document.getElementsByClassName("show");
    while (items.length > 0) { items[0].remove(); }

    let info = document.getElementsByClassName("info");
    
    for (let i = 0; i < info.length; i++) { 
        let cut = info[i].parentNode;
        let show = document.createElement("div");
        show.className = "show";

        let link = document.createElement("a");
        link.href = info[i].children[1].innerHTML;

        let im = document.createElement("img");
        let x = info[i].children[2].innerHTML;
        if (x ==""){ x = "assets/images/blankimage.png";}
        im.src = x;

        show.appendChild(link);
        link.appendChild(im);
        cut.appendChild(show);
    }
}

function displayEdit() {
    items = document.getElementsByClassName("show");
    while (items.length > 0) { items[0].remove(); }
    
    let info = document.getElementsByClassName("info");
    for (let i = 0; i < info.length; i++) { 
        let cut = info[i].parentNode;
        let show = document.createElement("div");
        show.className = "show";

        let im = document.createElement("img");
        let x = info[i].children[2].innerHTML;
        if (x ==""){ x = "assets/images/blankimage.png";}
        im.src = x;
        im.addEventListener("click", selectItem);
        
        let xbut = document.createElement("img");
        xbut.classList.add("xbut");
        xbut.src = "assets/images/x.webp";
        xbut.addEventListener("click", xPressed);

        cut.appendChild(show);
        show.appendChild(im);
        show.appendChild(xbut);
    }

    let plus = document.createElement("img");
    plus.classList.add("show");
    plus.classList.add("plusButton");
    plus.src = "assets/images/plus.png";
    plus.addEventListener("click", addBlank);

    let mainlist = document.getElementById("mainlist");
    mainlist.appendChild(plus);

}



restoreData();
displayNormal();


let settingButton = document.getElementById("settingButton");
settingButton.addEventListener("click", toggleEdit);