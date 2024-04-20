
let timer;
let timeout;
let sliderTag;
window.addEventListener("load", loadManager);
window.addEventListener("focus", windowFocusHandler);
window.addEventListener("blur", windowBlurHandler);

function loadManager() {
    sliderTag = document.querySelector("div.slider");
    sliderTag.addEventListener("mouseover", mouseOverHandler);
    sliderTag.addEventListener("mouseout", mouseOutHandler);
    timer = setInterval(slideHandler, 3000);
    setClickListener();

}

function windowFocusHandler() {
    timer = setInterval(slideHandler, 3000);
    timeout= setTimeout(setClickListener, 1000);
}

function windowBlurHandler() {
    if (timer) {
        clearInterval(timer);
    }
    if (timeout) {
        clearTimeout(timeout);
    }
}

function sliderTagClickHandler() {
    if (timeout) {
        clearTimeout(timeout);
    }
    //rimuove il click listener per evitare click troppo ravvicinati
    sliderTag.removeEventListener("click", sliderTagClickHandler);
    slideHandler();
    //reinserisco il click listener ma dopo la transition che è di 1.5 sec
    timeout = setTimeout(setClickListener, 1500);
}

function slideHandler() {
    let actualVisibleImg = document.querySelector("div.slider img.visible");
    let actualNextImg = document.querySelector("div.slider img.next");
    let nextImg = document.querySelector("div.slider img.next + img");
    if (nextImg === null) {
        nextImg = document.querySelector("div.slider img:first-child");
    }
    actualVisibleImg.classList.remove("visible");
    actualNextImg.classList.replace("next", "visible");
    nextImg.classList.add("next");
}

function mouseOverHandler() {
    clearInterval(timer);
}

function mouseOutHandler() {
    timer = setInterval(slideHandler, 3000);
}

function setClickListener() {
    sliderTag.addEventListener("click", sliderTagClickHandler);
}
