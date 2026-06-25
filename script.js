const display = document.getElementById("display");

function append(value){
    display.value += value;
}

function clearDisplay(){
    display.value = "";
}

function backspace(){
    display.value = display.value.slice(0,-1);
}

function calculate(){
    try{
        display.value = eval(display.value);
    }
    catch{
        display.value = "Error";
    }
}

const colorPickers = document.querySelectorAll("[data-var]");


colorPickers.forEach(picker => {

    picker.addEventListener("input", () => {

        const variable = picker.dataset.var;
        const value = picker.value;

        console.log("Changed:", variable, value);

        document.documentElement.style.setProperty(variable, value);

        // optional save
        localStorage.setItem(variable, value);
    });

});

function loadTheme(){

    colorPickers.forEach(picker => {

        const variable = picker.dataset.var;
        const savedColor = localStorage.getItem(variable);

        if(savedColor){
            picker.value = savedColor;

            document.documentElement.style.setProperty(
                variable,
                savedColor
            );
        }
    });
}

// run on startup
loadTheme();
self.addEventListener("install", () => {
    console.log("Service Worker Installed");
});

self.addEventListener("fetch", event => {
    event.respondWith(fetch(event.request));
});
function toggleSettings(){
    const panel = document.getElementById("themePanel");
    panel.classList.toggle("hidden");
}
