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

let DIALOGUE_01 = [
    new Line("...Luna, are you there?", "kyana", 1, "...fffff.fff fff ffffff"),
    new Line("Lunaaaaaaaaaaaaaaaaaaaaaaa~!", "kyana", 1.5, "wwwwwwwwwwwwwwwwwwwwwwwwwwww"),
    new Line("I'm here, dumbass.", "luna", 0.25, "___ wwwww.ssssssss"),
    new Line("Ah, there you are. Enough with that attitude, missy.", "kyana", 1, "__, wwwww ___ ___. _____ ____ ____ iiiiiiiii,______"),
    new Line("Hmph, fine.", "luna", 0.4, "_____,dddd_"),
];

function displayLine(textbox, line = new Line("content not specified.", null, 1, null), speakerDisplay) {
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
                case "p": nxtChar.classList.add("accent"); break; // accent2 color (pink)
                case "w": nxtChar.classList.add("wave"); break; // wavy
                case "s": nxtChar.classList.add("shake"); break; // shaky
                case "f": nxtChar.classList.add("fade"); break; // fade in
                case "d": nxtChar.classList.add("drop"); break; // drop in
                case ",": delay = BASE_TEXT_SPEED * 4; break;
                case ".": delay = BASE_TEXT_SPEED * 8; break;
            }


            // Add the character ascii
            nxtChar.textContent = line.content[line.cursor];

            textbox.appendChild(nxtChar); // Add the final character with styling to DOM

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
                resolve();
                $(document).off("keydown click");
            }
        });
    });
}

window.onload = async function() {
    dialogue = DIALOGUE_01;
    textbox = document.getElementById("text_box");
    speakerDisplay = document.getElementById("speaker_display");

    // Loop through all lines of dialogue
    for(let i = 0; i < dialogue.length; i++) { 

        // Reset displayed line
        textbox.innerHTML = "";

        // Display the current line
        await displayLine(textbox, dialogue[i], speakerDisplay);

        // Wait until click/spacebar to display next line
        await waitForInput();
    }
}
