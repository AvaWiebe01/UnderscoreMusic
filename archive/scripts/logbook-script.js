var musicContext;
var musicGain;
var dreadResp;
var dreadBuffer;
var musicVol;

$(document).ready(() => {

    $("button").on("click", (event) => {
        const buttonElement = event.currentTarget;
        const documentElement = document.querySelector(".document");

        buttonElement.classList.add("hidden");
        $(".document").slideDown(500);
        
        const currMusic = musicContext.createBufferSource();
        musicGain.gain.setValueAtTime(musicVol, musicContext.currentTime);
        currMusic.buffer = dreadBuffer;
        currMusic.connect(musicGain);
        currMusic.loop = true;
        currMusic.start();
    })

})

window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    musicVol = urlParams.get("musicVol") ?? 1;

    musicContext = new AudioContext();
    musicGain = musicContext.createGain();
    musicGain.connect(musicContext.destination);
    
    dreadResp = await fetch("/archive/music/dread.ogg");
    dreadBuffer = await musicContext.decodeAudioData(await dreadResp.arrayBuffer(), () => {
        
            // remove the loading screen
            const loadingScreen = document.querySelector(".loading_screen");
            loadingScreen.classList.add("hidden");
    });
}