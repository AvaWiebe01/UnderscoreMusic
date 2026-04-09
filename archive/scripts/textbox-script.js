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

const BASE_TEXT_SPEED = 15;

const DIALOGUE = new Map([
    [
        "A-CNTRL0",
        [
            new Line(   "HyperI/O Voice Transmission #1A70032E - Central District, 08:49 PM", "system", 2, 
                        "pppppppp ppppp pppppppppppp _________ _ aaaaaaa aaaaaaaa_ ppppp pp"),

            new Line(   "We’re detecting a heat signature around that corner, Kyana. I’d be cautious.", "luna", 1,
                        "_____ _________ _ ____ _________ ______ ____ ______, _____. ___ __ ________."),

            new Line(   "Thanks. Any idea who?", "kyana", 1,
                        "______. ___ ____ ____"),

            new Line(   "Looks like their guns are emitting typical Axiom signals, so it could be anyone.", "luna", 1,
                        "_____ ____ _____ ____ ___ ________ _______ _____ _______, __ __ _____ __ ______."),
            
            new Line(   "That’s okay. I’ll be right back, hold on.", "kyana", 1, "______ ____- ____ __ _____ ____, ____ __."),

            new Line(   "Agh-!", "unknown", 1,
                        "ttttt"),

            new Line(   "Alright Luna, I’ve got them by the neck... and... there we go, their DNA should be sent over now.", "kyana", 1,
                        "_______ ____, ____ ___ ____ __ ___ ____,,, www,,,-_____ __ __, _____ ___ ______ __ ____ ____ ___."),

            new Line(   "*Sigh...* Stop resisting me. If you’re innocent, then I’m not going to hurt you.", "kyana", 1,
                        "wwwwwwwww-____ _________ __. __ ______ ________, ____ ___ ___ _____ __ ____ ___."),

            new Line(   "I’m checking it...", "luna", 1,
                        "___ ________ __,,,"),

            new Line(   "Okay, they’re good to go. Not associated with any of our targets, just some loser that pretends to be a fighter for looks.", "luna", 1,
                        "____, _______ ____ __ __. ___ __________ ____ ___ __ ___ _______, ____ ____ iiiii ____ ________ __ __ _ _______ ___ _____."),

            new Line(   "Sounds kind of like you, hm?", "kyana", 1,
                        "______ ____ __ ____ iii, rrr"),

            new Line(   "Ughh, shut up... and keep moving, or you’re going to fall behind pace. The rest of the team will be reaching the rendezvous in forty-five seconds!", "luna", 1,
                        "dddd- ____ __,,, ___ ____ ______, __ ______ _____ __ ____ ______ ____. ___ ____ __ ___ ____ ____ __ ________ ___ __________ __ __________________!"),

            new Line(   "I’ll be there in thirty, don’t worry.", "kyana", 1,
                        "____ __ _____ __ ______, _____ _____."),

            new Line(   "- END OF RECOVERED DATA -", "system", 2,
                        "p ppp pp ppppppppp pppp p"),
        ]
    ],

    [
        "B-0NYX01",
        [
            new Line("Unused.", "onyx", 1, "_______"),
        ]
    ],

    [
        "C-LEVEL0",
        [
            new Line(   "HyperI/O Camera #3E9EFFF4 Audio Feed - Hyper Beam HQ,  12:41 AM", "system", 2,
                        null),

            new Line(   "Oh, hey Kyana! Didn't expect you to drop by today.", "onyx", 1,
                        "Oh, hey Kyana! Didn't expect you to drop by today."),

            new Line(   "Good afternoon, Nyx. I wasn't expecting it either, but I came to ask you for a favor.", "kyana", 1,
                        "Good afternoon, Nyx. I wasn't expecting it either, but I came to ask you for a favor."),
                        
            new Line(   "As always. What can I do for you?", "onyx", 1,
                        "As always. What can I do for you?"),

            new Line(   "It would be better to talk elsewhere. Can you come to my office, or are you busy with your… ahem, computer stuff?", "kyana", 1,
                        "It would be better to talk elsewhere. Can you come to my office, or are you busy with your… ahem, computer stuff?"),

            new Line(   "I am a *little* busy, but I can always make time for you. Make it quick, though.", "onyx", 1,
                        "I am a *little* busy, but I can always make time for you. Make it quick, though."),

            new Line(   "I'm always quick.", "kyana", 1,
                        "I'm always quick."),

            new Line(   "Well, that's definitely true. Silly me. Let's get going...", "onyx", 1,
                        "Well, that's definitely true. Silly me. Let's get going..."),

            new Line(   "HyperI/O Camera #46FFA910 Audio Feed - Hyper Beam HQ,  12:45 AM", "system", 2,
                        "HyperI/O Camera #46FFA910 Audio Feed - Hyper Beam HQ,  12:45 AM"),

            new Line(   "Okay... so, update on our project.", "kyana", 1,
                        "Okay... so, update on our project."),

            new Line(   "I've been searching through my hyperI/O access, and I think I found something.", "kyana", 1,
                        "I've been searching through my hyperI/O access, and I think I found something."),

            new Line(   "There's some kind of 'restricted level' that the Admins have referred to, and I don't think they were talking about the usual access restrictions that get lifted as you're promoted.", "kyana", 1,
                        "There's some kind of 'restricted level' that the Admins have referred to, and I don't think they were talking about the usual access restrictions that get lifted as you're promoted."),

            new Line(   "I won't say that I doubt it, it would be trivial to obscure parts of the system.", "onyx", 1,
                        "I won't say that I doubt it, it would be trivial to obscure parts of the system."),

            new Line(   "Good, so you're still with me, then.", "kyana", 1,
                        "Good, so you're still with me, then."),

            new Line(   "I need you to develop a program, or something, that I can use to see the hidden layer and check what the Admins are up to.", "kyana", 1,
                        "I need you to develop a program, or something, that I can use to see the hidden layer and check what the Admins are up to."),

            new Line(   "I'm on it, Kyana. I'm just as curious as you are to get to the bottom of this.", "onyx", 1,
                        "I'm on it, Kyana. I'm just as curious as you are to get to the bottom of this."),

            new Line(   "- END OF RECOVERED DATA -", "system", 2,
                        "p ppp pp ppppppppp pppp p"),
        ]
    ],

    [
        "D-MSG010",
        [
            new Line(   "HyperI/O Voice Transmission #1A7F327E - Hyper Beam HQ, 10:22 PM", "system", 2,
                        null),

            new Line(   "*RING… RING… RING… RING…*", "system", 1,
                        "*RING… RING… RING… RING…*"),

            new Line(   "C’mon, pick up already…", "onyx", 1,
                        "C’mon, pick up already…"),

            new Line(   "*BEEP*", "system", 1,
                        "*BEEP*"),

            new Line(   "Oh, you’re not answering…", "onyx", 1,
                        "Oh, you’re not answering…"),

            new Line(   "Well, in that case, don't listen to the rest of this unless you're somewhere private.", "onyx", 1,
                        "Well, in that case, don't listen to the rest of this unless you're somewhere private."),

            new Line(   "...", "onyx", 1,
                        "..."),

            new Line(   "Check your secure drive when you're done with whatever it is that you *do* after operations. I sent a transfer request with the tool you asked for.", "onyx", 1,
                        "Check your secure drive when you're done with whatever it is that you *do* after operations. I sent a transfer request with the tool you asked for."),

            new Line(   "...you can ask me if anything confuses you. I know you're not the most up-to-date with tech.", "onyx", 1,
                        "...you can ask me if anything confuses you. I know you're not the most up-to-date with tech."),

            new Line(   "But there IS a readme, so consult that first, if you please.", "onyx", 1,
                        "But there IS a readme, so consult that first, if you please."),

            new Line(   "Talk later.", "onyx", 1,
                        "Talk later."),

            new Line(   "- END OF RECOVERED DATA -", "system", 2,
                        "p ppp pp ppppppppp pppp p"),
        ]
    ],

    [
        "E-KL32FA",
        [
            new Line(   "New Archon Camera #112D8A39 Audio Feed - Lotus Apartment Complex, 12:37 AM", "system", 2,
                        null),

            new Line(   "Kyana, I’m going to bed~!", "luna", 1,
                        "Kyana, I’m going to bed~!"),

            new Line(   "<silence>", "kyana", 1,
                        "<silence>"),

            new Line(   "I’ll see you in the morning…", "luna", 1,
                        "I’ll see you in the morning…"),

            new Line(   "<louder silence?>", "kyana", 1,
                        "<louder silence?>"),

            new Line(   "Hey, what the hell… say something!!", "luna", 1,
                        "Hey, what the hell… say something!!"),

            new Line(   "<deafening silence>", "kyana", 1,
                        "<deafening silence>"),

            new Line(   "Where’d she run off to…...", "luna", 1,
                        "Where’d she run off to…..."),

            new Line(   "Oh! You *are* in h-", "luna", 1,
                        "Oh! You *are* in h-"),

            new Line(   "Luna, get over here.", "kyana", 1,
                        "Luna, get over here."),

            new Line(   "Huh?", "luna", 1,
                        "Huh?"),

            new Line(   "Just look.", "kyana", 1,
                        "Just look."),

            new Line(   "Alright, fine... why are you acting so weird?", "luna", 1,
                        "Alright, fine... why are you acting so weird?"),

            new Line(   "...what's this?", "luna", 1,
                        "...what's this?"),

            new Line(   "It's the hyperI/O records.", "kyana", 1,
                        "It's the hyperI/O records."),

            new Line(   "I've had a program running to scour the Codex for an entryway. To brute force my way in.", "kyana", 1,
                        "I've had a program running to scour the Codex for an entryway. To brute force my way in."),

            new Line(   "...Nyx wrote it for me. Obviously.", "kyana", 1,
                        "...Nyx wrote it for me. Obviously."),

            new Line(   "I thought you already had access, though.", "luna", 1,
                        "I thought you already had access, though."),

            new Line(   "So did I. Turns out there's another layer.", "kyana", 1,
                        "So did I. Turns out there's another layer."),

            new Line(   "...", "luna", 1,
                        "..."),

            new Line(   "...I don't understand what this is, Kyana. Why are you showing me?", "luna", 1,
                        "...I don't understand what this is, Kyana. Why are you showing me?"),

            new Line(   "Because they're hiding something from me, Luna. And you, too. Everyone.", "kyana", 1,
                        "Because they're hiding something from me, Luna. And you, too. Everyone."),

            new Line(   "You're like, the best Operator we have. Why would Hyper Beam want to hide something from you?", "luna", 1,
                        "You're like, the best Operator we have. Why would Hyper Beam want to hide something from you?"),

            new Line(   "Because they knew that if I was kept informed, I would *do* something, instead of sitting back and waiting.", "kyana", 1,
                        "Because they knew that if I was kept informed, I would *do* something, instead of sitting back and waiting."),

            new Line(   "...I think... that you need to tell me what you found.", "luna", 1,
                        "...I think... that you need to tell me what you found."),

            new Line(   "I will, but you're not going to like it, Luna.", "kyana", 1,
                        "I will, but you're not going to like it, Luna."),

            new Line(   "Sit closer, I need you to pay attention.", "kyana", 1,
                        "Sit closer, I need you to pay attention."),

            new Line(   "Um, okay. Like this?", "luna", 1,
                        "Um, okay. Like this?"),

            new Line(   "Mhm, like that.", "kyana", 1,
                        "Mhm, like that."),

            new Line(   "Anyways. They figured out why the Divergence happened.", "kyana", 1,
                        "Anyways. They figured out why the Divergence happened."),

            new Line(   "What??", "luna", 1,
                        "What??"),

            new Line(   "Months ago. I'm not sure exactly how long. But they solved it.", "kyana", 1,
                        "Months ago. I'm not sure exactly how long. But they solved it."),

            new Line(   "Turns out, those rumors about an object in the outer reaches of the solar system...", "kyana", 1,
                        "Turns out, those rumors about an object in the outer reaches of the solar system..."),

            new Line(   "They weren't rumors after all, I guess. I feel like an idiot for doubting them now.", "kyana", 1,
                        "They weren't rumors after all, I guess. I feel like an idiot for doubting them now."),

            new Line(   "You *are* an idiot sometimes, but you couldn't have known if people were making stuff up like usual...", "luna", 1,
                        "You *are* an idiot sometimes, but you couldn't have known if people were making stuff up like usual..."),

            new Line(   "And why are you acting like this is such an awful thing, anyways? If we know the origin of the Divergence, that's good, isn't it?", "luna", 1,
                        "And why are you acting like this is such an awful thing, anyways? If we know the origin of the Divergence, that's good, isn't it?"),

            new Line(   "You’d think. They studied the object to find out how it caused the whole timeline-splitting phenomenon.", "kyana", 1,
                        "You’d think. They studied the object to find out how it caused the whole timeline-splitting phenomenon."),

            new Line(   "I’ll summarize.", "kyana", 1,
                        "I’ll summarize."),

            new Line(   "It first appeared when-", "kyana", 1,
                        "It first appeared when-"),

            new Line(   "...", "kyana", 1,
                        "..."),

            new Line(   "It can't be that bad, Kyana. Just tell me.", "luna", 1,
                        "It can't be that bad, Kyana. Just tell me."),

            new Line(   "…It first appeared during the Divergence. In the blink of an eye, its existence in our world began.", "kyana", 1,
                        "…It first appeared during the Divergence. In the blink of an eye, its existence in our world began."),

            new Line(   "It emitted a powerful wave to sweep the universe, scanning our entire world. Everything we’ve ever known, ever could know, captured inside its epicenter.", "kyana", 1,
                        "It emitted a powerful wave to sweep the universe, scanning our entire world. Everything we’ve ever known, ever could know, captured inside its epicenter."),

            new Line(   "The universe was split into countless timelines, each one different from the last, the initial parameters varied ever so slightly, but the outcome immeasurably altered.", "kyana", 1,
                        "The universe was split into countless timelines, each one different from the last, the initial parameters varied ever so slightly, but the outcome immeasurably altered."),

            new Line(   "It collected all of this data, processing the incomprehensible scale of it at unbelievable speed.", "kyana", 1,
                        "It collected all of this data, processing the incomprehensible scale of it at unbelievable speed."),

            new Line(   "With the power of nearly unlimited knowledge of all possible branching outcomes, it can control the very world that we’re in right now.", "kyana", 1,
                        "With the power of nearly unlimited knowledge of all possible branching outcomes, it can control the very world that we’re in right now."),

            new Line(   "Every moment in time, every person, able to be manipulated, recreated...", "kyana", 1,
                        "Every moment in time, every person, able to be manipulated, recreated..."),

            new Line(   "or destroyed.", "kyana", 1,
                        "or destroyed."),

            new Line(   "...they’ve named it the Frequency Annihilator.", "kyana", 1,
                        "...they’ve named it the Frequency Annihilator."),

            new Line(   "...", "luna", 1,
                        "..."),

            new Line(   "You’re... are you *sure* that's the truth?", "luna", 1,
                        "You’re... are you *sure* that's the truth?"),

            new Line(   "Yes, Luna. I wouldn’t tell you unless I was a hundred percent confident. You don’t need the extra stress.", "kyana", 1,
                        "Yes, Luna. I wouldn’t tell you unless I was a hundred percent confident. You don’t need the extra stress."),

            new Line(   "Okay...", "luna", 1,
                        "Okay..."),

            new Line(   "I trust you.", "luna", 1,
                        "I trust you."),

            new Line(   "...but I still don’t get *anything*. Who created it? Who controls it? How did it appear from nowhere??", "luna", 1,
                        "...but I still don’t get *anything*. Who created it? Who controls it? How did it appear from nowhere??"),

            new Line(   "And, um, what does it mean for us?", "luna", 1,
                        "And, um, what does it mean for us?"),

            new Line(   "I don't know.", "kyana", 1,
                        "I don't know."),

            new Line(   "...I don’t know...", "kyana", 1,
                        "...I don’t know..."),

            new Line(   "But we have to do something. We can’t let anyone use it. If that’s even possible.", "kyana", 1,
                        "But we have to do something. We can’t let anyone use it. If that’s even possible."),

            new Line(   "We can be certain that LIMIT is going to try to travel to it.", "kyana", 1,
                        "We can be certain that LIMIT is going to try to travel to it."),

            new Line(   "Nobody should be allowed the power to tear apart our universe. It needs to be disabled forever.", "kyana", 1,
                        "Nobody should be allowed the power to tear apart our universe. It needs to be disabled forever."),

            new Line(   "What the hell are *we* supposed to do, Kyana?? We might be unstoppable in New Archon, but do you realize how insane you sound? It’s in space, a million kilometers away. We can’t fucking *do* anything.", "luna", 1,
                        "What the hell are *we* supposed to do, Kyana?? We might be unstoppable in New Archon, but do you realize how insane you sound? It’s in space, a million kilometers away. We can’t fucking *do* anything."),

            new Line(   "...", "kyana", 1,
                        "..."),

            new Line(   "I knew you would say that...", "kyana", 1,
                        "I knew you would say that..."),

            new Line(   "I-I’m sorry, I didn’t mean to sound angry-", "luna", 1,
                        "I-I’m sorry, I didn’t mean to sound angry-"),

            new Line(   "No... no, it’s okay. I get it.", "kyana", 1,
                        "No... no, it’s okay. I get it."),

            new Line(   "This isn’t easy for me either. Honestly, I'm-", "kyana", 1,
                        "This isn’t easy for me either. Honestly, I'm-"),

            new Line(   "I’m scared, Luna. I've never felt this helpless before.", "kyana", 1,
                        "I’m scared, Luna. I've never felt this helpless before."),

            new Line(   "...", "luna", 1,
                        "..."),

            new Line(   "I a-am too...", "luna", 1,
                        "I a-am too..."),

            new Line(   "You’ve never acted like this before... I don’t know what to say...", "luna", 1,
                        "You’ve never acted like this before... I don’t know what to say..."),

            new Line(   "Then come even closer.", "kyana", 1,
                        "Then come even closer."),

            new Line(   "Mhm.", "kyana", 1,
                        "Mhm."),

            new Line(   "No matter what happens, Luna… at least we've had our time together, right?", "kyana", 1,
                        "No matter what happens, Luna… at least we've had our time together, right?"),

            new Line(   "Don’t say that. You’re talking like we’re gonna die…", "luna", 1,
                        "Don’t say that. You’re talking like we’re gonna die…"),

            new Line(   "Well-", "kyana", 1,
                        "Well-"),

            new Line(   "Just remember it, okay?", "kyana", 1,
                        "Just remember it, okay?"),

            new Line(   "I won’t ever forget about you, I promise.", "kyana", 1,
                        "I won’t ever forget about you, I promise."),

            new Line(   "Okay...", "luna", 1,
                        "Okay..."),

            new Line(   "I guess... I promise that I’ll remember you, too.", "luna", 1,
                        "I guess... I promise that I’ll remember you, too."),

            new Line(   "Good.", "kyana", 1,
                        "Good."),

            new Line(   "...", "luna", 1,
                        "..."),

            new Line(   "well, um... what do we do now?", "luna", 1,
                        "well, um... what do we do now?"),

            new Line(   "We sit here and think, Luna. Me in your arms, and you in mine.", "kyana", 1,
                        "We sit here and think, Luna. Me in your arms, and you in mine."),

            new Line(   "We’ll think of something, together.", "kyana", 1,
                        "We’ll think of something, together."),

            new Line(   "- END OF RECOVERED DATA -", "system", 2,
                        "p ppp pp ppppppppp pppp p"),
        ]
    ],

    [
        "F-020NYX",
        [
            new Line("Unused.", "onyx", 1, "_______"),
        ]
    ],

    [
        "G-ADMIN1",
        [
            new Line(   "HyperI/O Camera #34C1D859 Audio Feed - Hyper Beam HQ Admin Office,  6:00 AM", "system", 2,
                        null),

            new Line(   "Good morning, Arin. I think it’s time for us to have a little chat, hm?", "kyana", 1,
                        "Good morning, Arin. I think it’s time for us to have a little chat, hm?"),

            new Line(   "What the... what do you think you're doing??", "arin", 1,
                        "What the... what do you think you're doing??"),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "", "", 1,
                        ""),

            new Line(   "- END OF RECOVERED DATA -", "system", 2,
                        "p ppp pp ppppppppp pppp p"),
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
                case "r": nxtChar.classList.add("rainbow"); break; // rainow
                case ",": delay = BASE_TEXT_SPEED * 16; break;
                case ".": delay = BASE_TEXT_SPEED * 24; break;
                case "-": delay = BASE_TEXT_SPEED * 32; break;
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
                    case "onyx":
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
    const portraitDisplay = document.getElementById("portrait");

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

    const portraitRoot = "/images/archive/";
    const portraits = new Map([ // speaker, portraitFilename
        ["kyana", "kyana-portrait-256.png"],
        ["luna", "luna-portrait-256.png"],
        ["onyx", "nyx-portrait-256.png"],
        ["arin", "arin-portrait-256.png"],
        ["system", "system-portrait-256.png"],
        ["unknown", "unknown-portrait-256.png"],
    ]);

    // Force a click to resume the AudioContext
    await waitForInput();

    // Loop through all lines of dialogue
    for(let i = 0; i < dialogue.length; i++) { 

        // Reset displayed line
        textbox.innerHTML = "";

        // Display speaker portrait
        portraitDisplay.src = `${portraitRoot}${portraits.get(dialogue[i].speaker)}`;

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