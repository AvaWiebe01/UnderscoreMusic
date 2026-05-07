var musicContext;
var ambientResp;
var ambientBuffer;

$(document).ready(() => {

    $("button").on("click", (event) => {
        const buttonElement = event.currentTarget;
        const creditsElement = document.querySelector(".credits");
        const titleElement = document.getElementById("credits-title");

        buttonElement.classList.add("hidden");
        creditsElement.classList.remove("hidden");
        titleElement.scrollIntoView({
            behavior:"smooth",
            block:"start",
        })
        
        const creditsMusic = musicContext.createBufferSource();
        creditsMusic.buffer = ambientBuffer;
        creditsMusic.connect(musicContext.destination);
        creditsMusic.loop = true;
        creditsMusic.start();
    })

})

window.onload = async function() {
    musicContext = new AudioContext();
    ambientResp = await fetch("/archive/music/ambient.ogg");
    ambientBuffer = await musicContext.decodeAudioData(await ambientResp.arrayBuffer());
}
