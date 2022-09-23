function initialize() {
    
}

function target() {
    let tEl = document.getElementById("target");
    tEl.style.position = "relative";
    tEl.style.left = Math.round(Math.random() * 100) + "%";
    tEl.style.top = Math.round(Math.random() * 100) + "%";
}