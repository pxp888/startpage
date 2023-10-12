// This script is used to dynamically alter the color of the header
// text based on the background color of the body.  


// this adds the custom css to the header
function setHeaderCSS() {
    // change header id to dheader
    const header = document.getElementById("header");
    header.setAttribute("id", "dheader");

    // add custom css for dheader
    const style = document.createElement('style');
    style.id = "headerStyleTag";
    document.head.appendChild(style);
    style.textContent = `
    #dheader {
        color: white;
        opacity: 0.4;
    
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
        height: min-content;
        margin: 0rem;
    }
    
    #dheader:hover {
        animation: 0.5s opacityFadeIn;
        animation-fill-mode: forwards;
    }
    
    #dheader > div {
        display: flex;
        flex-direction: row;
        align-items: baseline;
    }
    
    #dheader .giant {
        font-size: 4rem;
        margin: 0rem;
        margin-left: 1rem;
        color: gainsboro;
    }
    
    #dheader p {
        color: white;
    }

    #dheader a {
        text-decoration: none;
    }
    
    `;
}

// this is a helper function that changes the css values of the header
function headerCssChange(selector, property, value){
    let sheet = document.getElementById("headerStyleTag").sheet;
    let rules=sheet.cssRules;
    let x;
    for (let i=0; i<rules.length; i++) {
        if (rules[i].selectorText == selector) { x = rules[i].style; }
    }
    x.setProperty(property, value);
}

// this alters the color of the header text based on the background color of the body
function updateHeaderColor(color) {
    let bodyBackgroundColor = window.getComputedStyle(document.body).getPropertyValue('background-color');
    let bodyBackgroundColorAverage = bodyBackgroundColor.match(/\d+/g).reduce((a,b) => parseInt(a) + parseInt(b), 0) / 3;
    if (bodyBackgroundColorAverage < 128) {
        headerCssChange("#dheader .giant", "color", "white");
        headerCssChange("#dheader p", "color", "white");
        
    } else {
        headerCssChange("#dheader .giant", "color", "black");
        headerCssChange("#dheader p", "color", "black");
    }
}

// setup functions
setHeaderCSS();

// initial call to updateHeaderColor when page loads
updateHeaderColor();

// event listeners
document.getElementById("backgroundColorPicker").addEventListener("input", updateHeaderColor);


