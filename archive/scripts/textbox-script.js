const speechContext = new AudioContext();

class Line {
    content;
    speaker;
    styling;
    speed;
    cursor;

    constructor (content = "", speaker = null, speed = 1, styling = null) {
        this.content = content;
        this.speaker = speaker;
        this.styling = styling;
        this.speed = speed;

        this.cursor = 0;
    }
}

const BASE_TEXT_SPEED = 25;

const DIALOGUE = new Map([
    [
        "A-CNTRL0",
        [
            new Line("HyperI/O Voice Transmission #1A70032E - Central District, 08:49 PM", "system", 2, null),
        ]
    ],

    [
        "B-0NYX01",
        [
            new Line("Unused.", "nyx", 1, "_______"),
        ]
    ],

    [
        "C-LEVEL0",
        [
            new Line("HyperI/O Camera #3E9EFFF4 Audio Feed - Hyper Beam HQ,  12:41 AM", "system", 2, null),
        ]
    ],

    [
        "D-MSG010",
        [
            new Line("HyperI/O Voice Transmission #1A7F327E - Hyper Beam HQ, 10:22 PM", "system", 2, null),
        ]
    ],

    [
        "E-KL32FA",
        [
            new Line("New Archon Camera #112D8A39 Audio Feed - Lotus Apartment Complex, 12:37 AM", "system", 2, null),
        ]
    ],

    [
        "F-020NYX",
        [
            new Line("Unused.", "nyx", 1, "_______"),
        ]
    ],

    [
        "G-ADMIN1",
        [
            new Line("HyperI/O Camera #34C1D859 Audio Feed - Hyper Beam HQ Admin Office,  6:00 AM", "system", 2, null),
        ]
    ],
]);

function displayLine(textbox, line = new Line("content not specified.", null, 1, null), speakerDisplay, voices) {
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
                case "r": nxtChar.classList.add("rainbow"); break; // massive
                case ",": delay = BASE_TEXT_SPEED * 4; break;
                case ".": delay = BASE_TEXT_SPEED * 8; break;
                case "-": delay = BASE_TEXT_SPEED * 16; break;
            }

            // Add the character ascii
            nxtChar.textContent = line.content[line.cursor];

            textbox.appendChild(nxtChar); // Add the final character with styling to DOM

            // play voice
            if((line.cursor % Math.ceil(line.speed * 3) == 0 || line.content[line.cursor] == ".") && line.content[line.cursor] != " ") {
                switch(line.speaker) {
                    case "kyana":
                        voices[0].pause();
                        voices[0].play();
                        break;
                    case "luna":
                        voices[1].pause();
                        voices[1].play();
                        break;
                    case "nyx":
                        voices[2].pause();
                        voices[2].play();
                        break;
                }
            }

            line.cursor++;

            if (line.cursor < line.content.length) { 
                setTimeout(() => {
                    requestAnimationFrame(nextLetter);
                }, delay);
            } else {
                resolve(); 
            }
        }

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

window.onload = async function() {
    const textbox = document.getElementById("text_box");
    const dialogue = DIALOGUE.get(textbox.getAttribute("fragment_name"));
    const speakerDisplay = document.getElementById("speaker_display");

    const kyanaSpeech = document.getElementById("kyana_speech");
    const lunaSpeech = document.getElementById("luna_speech");
    const nyxSpeech = document.getElementById("nyx_speech");
    const kyanaTrack = speechContext.createMediaElementSource(kyanaSpeech);
    const lunaTrack = speechContext.createMediaElementSource(lunaSpeech);
    const nyxTrack = speechContext.createMediaElementSource(nyxSpeech);
    kyanaTrack.connect(speechContext.destination);
    lunaTrack.connect(speechContext.destination);
    nyxTrack.connect(speechContext.destination);

    const voices = [kyanaSpeech, lunaSpeech, nyxSpeech];

    // Force a click to resume the AudioContext
    await waitForInput();

    // Loop through all lines of dialogue
    for(let i = 0; i < dialogue.length; i++) { 

        // Reset displayed line
        textbox.innerHTML = "";

        // Display the current line
        await displayLine(textbox, dialogue[i], speakerDisplay, voices);

        // Wait until click/spacebar to display next line
        await waitForInput();
    }
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