const speechContext = new AudioContext();
const speechGain = speechContext.createGain(); 
speechGain.connect(speechContext.destination);

class Line {
    content;
    speaker;
    speed;
    styling;
    musicTrigger;
    cursor;

    constructor (content = "", speaker = null, speed = 1, styling = null, musicTrigger = null) {
        this.content = content;
        this.speaker = speaker;
        this.speed = speed;
        this.styling = styling;
        this.musicTrigger = musicTrigger;

        this.cursor = 0;
    }
}

const BASE_TEXT_SPEED = 15;

function getStyling(chr, style = "") {
    switch(style ?? "") {
        case "b": chr.classList.add("bold"); break; // bold
        case "i": chr.classList.add("italic"); break; // italic
        case "a": chr.classList.add("accent"); break; // accent color (purple)
        case "p": chr.classList.add("accent2"); break; // accent2 color (pink)
        case "w": chr.classList.add("wave"); break; // wavy
        case "s": chr.classList.add("shake"); break; // shaky
        case "t": chr.classList.add("boldshake"); break; // bold shaky
        case "f": chr.classList.add("fade"); break; // fade in
        case "d": chr.classList.add("drop"); break; // drop in
        case "r": chr.classList.add("rainbow"); break; // rainbow
        case "l": chr.classList.add("little"); break; // small text
    }
}

function getDelay(style = "") {
    switch(style ?? "") {
        case ",": return BASE_TEXT_SPEED * 8;
        case ".": return BASE_TEXT_SPEED * 24;
        case "-": return BASE_TEXT_SPEED * 32;
    }
    
    return null;
}

function displayLine(textbox, line, speakerDisplay, voices) {
    line.cursor = 0;
    return new Promise(resolve => {
        function nextLetter(currentTime) { 

            let nxtChar = document.createElement("span");
            let delay = BASE_TEXT_SPEED / line.speed;

            // Add the speaker class
            line.speaker ? nxtChar.classList.add(line.speaker) : null;
            
            // Add styling info
            switch(line.styling?.[line.cursor] ?? "") {
                case "b": nxtChar.classList.add("bold"); break; // bold
                case "i": nxtChar.classList.add("italic"); break; // italic
                case "a": nxtChar.classList.add("accent"); break; // accent color (purple)
                case "p": nxtChar.classList.add("accent2"); break; // accent2 color (pink)
                case "w": nxtChar.classList.add("wave"); break; // wavy
                case "s": nxtChar.classList.add("shake"); break; // shaky
                case "t": nxtChar.classList.add("boldshake"); break; // bold shaky
                case "f": nxtChar.classList.add("fade"); break; // fade in
                case "d": nxtChar.classList.add("drop"); break; // drop in
                case "r": nxtChar.classList.add("rainbow"); break; // rainbow
                case "l": nxtChar.classList.add("little"); break; // small text
                case ",": delay = BASE_TEXT_SPEED * 8; break;
                case ".": delay = BASE_TEXT_SPEED * 24; break;
                case "-": delay = BASE_TEXT_SPEED * 32; break;
            }

            if(skipped) {
                return;
            }

            // Add the character ascii
            nxtChar.textContent = line.content[line.cursor];

            textbox.appendChild(nxtChar); // Add the final character with styling to DOM

            // play voice
            if((line.cursor % Math.ceil(line.speed * 3) == 0 || line.content[line.cursor] == ".") && line.content[line.cursor] != " ") {
                
                currentVoice = voices?.get(line.speaker);
                
                if(currentVoice) {
                    voices.get(line.speaker).pause();
                    voices.get(line.speaker).play();
                }
            }

            line.cursor++;

            if (line.cursor < line.content.length) { 
                setTimeout(() => {
                    requestAnimationFrame(nextLetter);
                }, delay);
            } else {
                $(document).off("keydown click");
                resolve(); 
            }
        }

        function skipLine() {
            for(var idx = line.cursor; idx < line.content.length; idx += 1) {
                var chr = document.createElement("span");
                getStyling(chr, line.styling?.[idx] ?? "");
                chr.textContent = line.content[idx];
                textbox.appendChild(chr);
            }
            
            $(document).off("keydown click");
            resolve();
            return;
        }  

        let skipped = false;

        // skip line if user clicks during display
        $(document).on("keydown click", function(event) {
            if(event.key === " " || event.type === "click") { // Check for spacebar or mouse click
                skipped = true;
                skipLine();
            }
        });

        speakerDisplay.innerHTML = line.speaker.toUpperCase(); // Change the speaker name before line displays

        requestAnimationFrame(nextLetter);
    });
}

function waitForInput() {
    return new Promise(resolve => {
        $(document).on("keydown click", function(event) {
            if(event.key === " " || event.type === "click") { // Check for spacebar or mouse click
                if (speechContext.state === "suspended") { speechContext.resume(); } // Initiate the speech context
                resolve();
                $(document).off("keydown click");
            }
        });
    });
}

// ======== MAIN ======== //
window.onload = async function() {
    const textbox = document.getElementById("text_box");
    const speakerDisplay = document.getElementById("speaker_display");
    const portraitDisplay = document.getElementById("portrait");
    const arrowDisplay = document.getElementById("arrow");

    const urlParams = new URLSearchParams(window.location.search);
    const musicVol = urlParams.get("musicVol") ?? 1;
    const sfxVol = urlParams.get("sfxVol") ?? 1;
    var lineFile = urlParams.get("content") ?? "!invalid";
    
    const validFiles = ["alpha", "beta", "delta", "epsilon", "tau", "zeta", "omega"]
    if (!validFiles.includes(lineFile)) {lineFile = "!invalid"}

    const kyanaSpeech = document.getElementById("kyana_speech");
    const lunaSpeech = document.getElementById("luna_speech");
    const nyxSpeech = document.getElementById("nyx_speech");
    const arinSpeech = document.getElementById("arin_speech");
    const lexiaSpeech = document.getElementById("lexia_speech");
    const systemSpeech = document.getElementById("system_speech");
    const unknownSpeech = document.getElementById("unknown_speech");

    const kyanaTrack = speechContext.createMediaElementSource(kyanaSpeech);
    const lunaTrack = speechContext.createMediaElementSource(lunaSpeech);
    const nyxTrack = speechContext.createMediaElementSource(nyxSpeech);
    const arinTrack = speechContext.createMediaElementSource(arinSpeech);
    const lexiaTrack = speechContext.createMediaElementSource(lexiaSpeech);
    const systemTrack = speechContext.createMediaElementSource(systemSpeech);
    const unknownTrack = speechContext.createMediaElementSource(unknownSpeech);

    kyanaTrack.connect(speechGain);
    lunaTrack.connect(speechGain);
    nyxTrack.connect(speechGain);
    arinTrack.connect(speechGain);
    lexiaTrack.connect(speechGain);
    systemTrack.connect(speechGain);
    unknownTrack.connect(speechGain);

    const voices = new Map([
        ["kyana", kyanaSpeech],
        ["luna", lunaSpeech],
        ["onyx", nyxSpeech],
        ["arin", arinSpeech],
        ["lexia", lexiaSpeech],
        ["system", systemSpeech],
        ["unknown", unknownSpeech],
    ]);

    const portraitRoot = "/images/archive/";
    const portraits = new Map([ // speaker, portraitFilename
        ["kyana", "kyana-portrait-256.png"],
        ["luna", "luna-portrait-256.png"],
        ["onyx", "nyx-portrait-256.png"],
        ["arin", "arin-portrait-256.png"],
        ["lexia", "lexia-portrait-256.png"],
        ["system", "system-portrait-256.png"],
        ["unknown", "unknown-portrait-256.png"],
    ]);

    const musicContext = new AudioContext();
    const musicGain = musicContext.createGain();
    musicGain.connect(musicContext.destination);

    const ambientResp = await fetch("/archive/music/ambient.ogg");
    ambientBuffer = await musicContext.decodeAudioData(await ambientResp.arrayBuffer());
    const dreadResp = await fetch("/archive/music/dread.ogg");
    dreadBuffer = await musicContext.decodeAudioData(await dreadResp.arrayBuffer());
    const neutralResp = await fetch("/archive/music/neutral.ogg");
    neutralBuffer = await musicContext.decodeAudioData(await neutralResp.arrayBuffer());

    const music = new Map([
        ["ambient", ambientBuffer],     // Name: Zone: Void
        ["dread", dreadBuffer],         // Name: Abandoned World
        ["neutral", neutralBuffer],     // Name: Curiosity
    ]);

    var currentMusic = null;

    // set audio volumes from URL
    speechGain.gain.setValueAtTime(sfxVol, speechContext.currentTime);
    musicGain.gain.setValueAtTime(musicVol, musicContext.currentTime);

    var contentObj = {};
    var dialogue;

    await fetch(`/arcterminal/content/${lineFile}.yaml`)
    .then(async (response) => response.text())
    .then(async (data) => {
        contentObj = jsyaml.load(data);
        dialogue = contentObj["dialogue"];
        console.log(dialogue);
        console.log("YAML loaded.");
        
        // remove the loading screen
        const loadingScreen = document.querySelector(".loading_screen");
        loadingScreen.classList.add("hidden");

        // Force a click to resume the AudioContext
        await waitForInput();

        // Loop through all lines of dialogue
        for(let i = 0; i < dialogue.length; i++) { 

            line = dialogue[i];

            // Reset displayed line
            textbox.innerHTML = "";

            // Display speaker portrait
            portraitDisplay.src = `${portraitRoot}${portraits.get(line.speaker)}`;

            // Trigger music
            trigger = line?.musicTrigger ?? null;
            if(trigger) {
                currentMusic?.stop();
                
                // only play another track if we don't want music to be stopped
                if(trigger != "stop") {
                    currentMusic = musicContext.createBufferSource();
                    currentMusic.buffer = music.get(trigger);
                    currentMusic.connect(musicGain);
                    currentMusic.loop = true;
                    currentMusic.start();
                }
            }

            // Display the current line
            await displayLine(textbox, line, speakerDisplay, voices);

            // show the arrow icon unless this is the last dialogue
            if (i != (dialogue.length-1)) {
                arrowDisplay.classList.remove("hidden");
            }

            // Wait until click/spacebar to display next line
            await waitForInput();

            // remove the arrow icon
            arrowDisplay.classList.add("hidden");
        }

    })


}

/* test dialogue
new Line("...Luna, are you there?", "kyana", 1, "...fffff.fff fff ffffff"),
new Line("Lunaaaaaaaaaaaaaaaaaaaaaaa~!", "kyana", 1.5, "rrrrrrrrrrrrrrrrrrrrrrrrrrrr"),
new Line("I'm here, dumbass.", "luna", 0.25, "___ wwwww.ssssssss"),
new Line("Ah, there you are. Enough with that attitude, missy.", "kyana", 1, "__, wwwww ___ ___. _____ ____ ____ iiiiiiiii,______"),
new Line("Hmph, fine.", "luna", 0.4, "_____.dddd_"),
new Line(".....", "kyana", 1, "....."),
new Line("Why is your phone destroyed?", "kyana", 0.65, "www __ ____ ppppp-dddddddddd"),
new Line("DON'T. ASK.", "luna", 0.4, "tttttt-tttt"),
new Line("Okay.......", "kyana", 0.2, "ffffffffffffff"),
*/