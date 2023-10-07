```
This file adds the functionality for the list view. It changes the CSS 
of the main view area for the list view instead of an icon grid, as well 
as showing relevant controls for each view in the settings menu.
```


// changes the CSS of the main view area for the list view instead of an icon grid.  
function setListCSS() {
    let style = document.getElementById("customStyleTag");
    style.textContent = `
    .show {
        color: white;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 300px;
        height: 60px;
        margin: 0.25rem 2rem;
    }
    
    .show img {
        height: 100%;
        object-fit: contain;
        
        cursor: pointer;
    }
    
    .show a, .show p {
        width: 100%;
        height: 100%;

        color: white;
        font-size: 1.5rem;
        font-weight: 300;
        text-decoration: none;
        margin-left: 2rem;
        
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    
    .show a:hover, .show p:hover {
        font-weight: 400;
        animation: 0.2s fadeIn;
        animation-fill-mode: forwards;
    }
    
    .show .xbut {
        height: 100%;
        object-fit: contain;
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
    
    }
    
    .plusButton:hover {
        background-color: gray;
    }
    `;
    let x = document.getElementsByClassName("listSettingItem");
    for (let i = 0; i < x.length; i++) { x[i].style.display = "none"; }
}

// changes the CSS of the main view area between icon grid and list view.
function changeViewMode(event) {
    let viewmode = localStorage.getItem("viewmode");
    if (viewmode == null) {viewmode = "icon";}

    let x;
    if (viewmode == "icon") {
        localStorage.setItem("viewmode", "list");
        setListCSS();

        //change settings items
        x = document.getElementsByClassName("listSettingItem");
        for (let i = 0; i < x.length; i++) { x[i].style.display = "block"; }
        x = document.getElementsByClassName("iconSettingItem");
        for (let i = 0; i < x.length; i++) { x[i].style.display = "none"; }
        document.getElementById("viewModeButton").textContent = "Icon View";

        //restore list settings
        let width = localStorage.getItem("listItemWidth");
        if (width != null) { cssChange(".show", "width", width + "px"); }
        let height = localStorage.getItem("listItemHeight");
        if (height != null) { 
            cssChange(".show", "height", height + "px"); 
            cssChange(".show a, .show p", "font-size", height * 0.6 + "px");
        }
    } 
    else {
        localStorage.setItem("viewmode", "icon");
        setIconCSS();

        //change settings items
        x = document.getElementsByClassName("listSettingItem");
        for (let i = 0; i < x.length; i++) { x[i].style.display = "none"; }
        x = document.getElementsByClassName("iconSettingItem");
        for (let i = 0; i < x.length; i++) { x[i].style.display = "block"; }
        document.getElementById("viewModeButton").textContent = "List View";

        //restore icon settings
        restoreDataFromLocalstorage();
    }
}

function setListItemWidth(event) {
    let width = event.target.value;
    localStorage.setItem("listItemWidth", width);
    cssChange(".show", "width", width + "px");
}

function setListItemHeight(event) {
    let height = event.target.value;
    localStorage.setItem("listItemHeight", height);
    cssChange(".show", "height", height + "px");
    cssChange(".show a, .show p", "font-size", height * 0.6 + "px");        
}


// check if list view was the last viewmode used, and if so, change to list view.
let viewmode = localStorage.getItem("viewmode");
if (viewmode == "list") { 
    localStorage.setItem("viewmode", "icon");
    changeViewMode();
}
else {
    // hide listview related settings
    let x = document.getElementsByClassName("listSettingItem");
    for (let i = 0; i < x.length; i++) { x[i].style.display = "none"; }
}



document.getElementById("viewModeButton").addEventListener("click", changeViewMode);
document.getElementById("listItemWidth").addEventListener("input", setListItemWidth);
document.getElementById("listItemHeight").addEventListener("input", setListItemHeight);
