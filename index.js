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

        saveData();
    }
}

function restoreData() {
    //get info from localstorage
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
        urls.push("www.twitter.com");
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
        urls.push("www.calendar.google.com");
        icons.push("https://cdn-icons-png.flaticon.com/512/5968/5968499.png");
    }

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

function saveData() {
    let info = document.getElementsByClassName("info");
    let names = [];
    let urls = [];
    let icons = [];

    for (let i = 0; i < info.length; i++) {
        names.push(info[i].children[0].innerHTML);
        urls.push(info[i].children[1].innerHTML);
        icons.push(info[i].children[2].innerHTML);    
    }

    localStorage.setItem("names", JSON.stringify(names));
    localStorage.setItem("urls", JSON.stringify(urls));
    localStorage.setItem("icons", JSON.stringify(icons));
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
        let nlink = document.createElement("a");
        let x = info[i].children[1].innerHTML;
        if (x.slice(0, 4) != "http") { x = "https://" + x; }
        link.href = x;
        nlink.href = x;
        nlink.innerHTML = info[i].children[0].innerHTML;
        nlink.classList.add("name");

        let im = document.createElement("img");
        x = info[i].children[2].innerHTML;
        if (x ==""){ x = "assets/images/blankimage.png";}
        im.src = x;

        show.appendChild(link);
        link.appendChild(im);
        cut.appendChild(show);
        show.appendChild(nlink);
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

        // let nlink = document.createElement("p");
        // nlink.innerHTML = info[i].children[0].innerHTML;
        // nlink.classList.add("name");

        cut.appendChild(show);
        show.appendChild(im);
        show.appendChild(xbut);
        // show.appendChild(nlink);
    }

    let plus = document.createElement("img");
    plus.classList.add("show");
    plus.classList.add("plusButton");
    plus.src = "assets/images/plus.png";
    plus.addEventListener("click", addBlank);

    let mainlist = document.getElementById("mainlist");
    mainlist.appendChild(plus);

    let x = document.getElementById("settingScreen");
    let lines = x.getElementsByTagName("input");
    for (let i = 0; i < lines.length; i++) { lines[i].value = ""; }
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
    let x = document.getElementsByClassName("show");
    x[x.length-2].classList.add("selected");
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

function nameUpdate(event) {
    let x = document.getElementsByClassName("selected");
    if (x.length == 0) { return; }
    let info = x[0].parentNode.children[0];
    info.children[0].innerHTML = event.target.value;
}

function urlUpdate(event) {
    let x = document.getElementsByClassName("selected");
    if (x.length == 0) { return; }
    let info = x[0].parentNode.children[0];
    let n = event.target.value;
    info.children[1].innerHTML = n;


}

function iconUpdate(event) {
    let x = document.getElementsByClassName("selected");
    if (x.length == 0) { return; }
    let info = x[0].parentNode.children[0];
    info.children[2].innerHTML = event.target.value;
    
    x[0].parentNode.children[1].children[0].src = event.target.value;
}



restoreData();
displayNormal();


let settingButton = document.getElementById("settingButton");
settingButton.addEventListener("click", toggleEdit);

let shortcutName = document.getElementById("shortcutName");
shortcutName.addEventListener("input", nameUpdate);

let shortcutURL = document.getElementById("shortcutURL");
shortcutURL.addEventListener("input", urlUpdate);

let shortcutIcon = document.getElementById("shortcutIcon");
shortcutIcon.addEventListener("input", iconUpdate);

