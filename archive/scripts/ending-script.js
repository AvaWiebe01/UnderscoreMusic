var musicContext;
var ambientResp;
var ambientBuffer;
var musicVol;
var musicGain;

$(document).ready(() => {

    $("button[class='reveal_doc']").on("click", (event) => {
        const buttonElement = event.currentTarget;
        const docElement = document.querySelector(".doc");
        const titleElement = document.getElementById("credits-title");

        buttonElement.classList.add("hidden");
        $(".doc_wrapper").slideDown(500);
        
        const creditsMusic = musicContext.createBufferSource();
        musicGain.gain.setValueAtTime(musicVol, musicContext.currentTime);
        creditsMusic.buffer = ambientBuffer;
        creditsMusic.connect(musicGain);
        creditsMusic.loop = true;
        creditsMusic.start();
    })

    $("button[class='reveal_credits']").on("click", (event) => {
        const buttonElement = event.currentTarget;
        const creditsElement = document.querySelector(".credits");
        const titleElement = document.getElementById("credits-title");

        buttonElement.classList.add("hidden");
        $(".credits").slideDown(500, () => {
            titleElement.scrollIntoView({
                behavior:"smooth",
                block:"start",
            })
        });
    })

})

window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    musicVol = urlParams.get("musicVol") ?? 1;
    
    musicContext = new AudioContext();
    musicGain = musicContext.createGain();
    musicGain.connect(musicContext.destination);
    
    ambientResp = await fetch("/archive/music/ambient.ogg");
    ambientBuffer = await musicContext.decodeAudioData(await ambientResp.arrayBuffer(), () => {
        // remove the loading screen
        const loadingScreen = document.querySelector(".loading_screen");
        loadingScreen.classList.add("hidden");
    });
}
