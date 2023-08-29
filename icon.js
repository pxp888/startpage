var editmode = false;

function restoreDataFromLocalstorage() {
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
    let cuts = document.getElementsByClassName("cut");
    let mainlist = document.getElementById("mainlist");
    
    let shows = document.getElementsByClassName("show");
    while (shows.length > 0) {shows[0].remove();}
    let plusses = document.getElementsByClassName("plus");
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
        if (x.slice(0, 4) != "http") { x = "https://" + x; }
        link.href = x;

        ndiv.appendChild(im);
        ndiv.appendChild(link);
        mainlist.appendChild(ndiv);
    }
}

function displayEditIcons() {
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
}

function toggleEditMode() {
    editmode = !editmode;
    let cuts = document.getElementsByClassName("cut");
    let shows = document.getElementsByClassName("show");

    if (editmode){
        displayEditIcons();
        let settingScreen = document.getElementById("settingScreen");
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
    let index = -1;
    for (let i=0; i < shows.length; i++) {
        if (shows[i].children[1] == event.target) {
            index = i;
            break;
        }
    }
    if (index == -1) { return; }

    for (let i=0; i < shows.length-1; i++) { shows[i].className="show unselected"; }
    shows[index].className="show selected";
}

function addBlankItem() {
    let mainlist = document.getElementById("mainlist");
    let shows = document.getElementsByClassName("show");
    let cuts = document.getElementsByClassName("cut");
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
}

function removeItem(event) {
    let shows = document.getElementsByClassName("show");
    let cuts = document.getElementsByClassName("cut");

    let index = -1;
    for (let i=0; i < shows.length; i++) {
        if (shows[i].children[2] == event.target) {
            index = i;
            break;
        }
    }
    if (index == -1) { return; }
    shows[index].remove();
    cuts[index].remove();
}


restoreDataFromLocalstorage();
displayNormalIcons();

let settingButton = document.getElementById("settingButton");
settingButton.addEventListener("click", toggleEditMode);
