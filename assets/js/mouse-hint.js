// This file adds hints shown to the user when input fields are hovered over.  

// Note - functions defined in index.js are called here.


// this is the mouse hint element that appears when you hover over the input fields
let hint = document.createElement('div');

// sets up the hint element
function setupMouseHint() {
    hint.id = 'mousehint';
    hint.textContent = 'Mouse hint';
    hint.style.position = 'absolute';
    hint.style.top = '0';
    hint.style.left = '0';
    hint.style.width = 'auto';
    hint.style.height = 'auto';
    hint.style.padding = '5px';
    hint.style.borderRadius = '5px';
    hint.style.backgroundColor = 'white';
    hint.style.color = 'black';
    hint.style.opacity = 0;
    hint.style.transition = 'opacity 0.3s ease-in-out';
    settingScreen.appendChild(hint);
}

// Show the hint element over the Icon URL input field
function showIconMouseHint(event) {
    hint.textContent = 'Hint: You can drag images from other websites to set the Icon URL.';
    hint.style.opacity = 1;
    hint.style.left = event.clientX + 30 + 'px';
    const rect = settingScreen.getBoundingClientRect();
    hint.style.top = event.clientY - rect.top + 'px';
}

// Show the hint element over the Shortcut Name input field
function showNameMouseHint(event) {
    hint.textContent = 'This is whatever you want to call your shortcut.';
    hint.style.opacity = 1;
    hint.style.left = event.clientX + 30 + 'px';
    const rect = settingScreen.getBoundingClientRect();
    hint.style.top = event.clientY - rect.top + 'px';
}

// Show the hint element over the Shortcut URL input field
function showUrlMouseHint(event) {
    hint.textContent = 'This is the URL that the shortcut will open.';
    hint.style.opacity = 1;
    hint.style.left = event.clientX + 30 + 'px';
    const rect = settingScreen.getBoundingClientRect();
    hint.style.top = event.clientY - rect.top + 'px';
}

// Hide the hint element
function hideMouseHint(event) {
    hint.style.opacity = 0;
}

setupMouseHint();

shortcutIcon.addEventListener('mouseover', showIconMouseHint);
shortcutIcon.addEventListener('mouseout', hideMouseHint);

shortcutName.addEventListener('mouseover', showNameMouseHint);
shortcutName.addEventListener('mouseout', hideMouseHint);

shortcutURL.addEventListener('mouseover', showUrlMouseHint);
shortcutURL.addEventListener('mouseout', hideMouseHint);

