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

const DIALOGUE = new Map([
    [
        "A-CNTRL0",
        [
            new Line(   "HyperI/O Voice Transmission #1A70032E - Central District, 08:49 PM", "system", 2, 
                        "pppppppp ppppp pppppppppppp _________ , aaaaaaa aaaaaaaa, ppppp pp",
                        "neutral"),

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
                        "p ppp pp ppppppppp pppp p",
                        "stop"),
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
            new Line(   "HyperI/O Camera #3E9EFFF4 Audio Feed - Hyper Beam HQ, 12:41 AM", "system", 2,
                        "pppppppp pppppp _________ ppppp pppp , aaaaa aaaa aa, ppppp pp",
                        "neutral"),

            new Line(   "Oh, hey Kyana! Didn't expect you to drop by today.", "onyx", 1,
                        "__, ___ _____. ______ ______ ___ __ ____ __ _____."),

            new Line(   "Good afternoon, Nyx. I wasn't expecting it either, but I came to ask you for a favor.", "kyana", 1,
                        "____ _________, ___. _ ______ _________ __ ______, ___ _ ____ __ ___ ___ ___ _ _____."),
                        
            new Line(   "As always. What can I do for you?", "onyx", 1,
                        "__ ______. ____ ___ _ __ ___ ___."),

            new Line(   "It would be better to talk elsewhere. Can you come to my office, or are you busy with your... ahem, computer stuff?", "kyana", 1,
                        "__ _____ __ ______ __ ____ _________. ___ ___ ____ __ __ ______, __ ___ ___ ____ ____ ____,,, iiii, wwwwwwww wwwww."),

            new Line(   "I am a little busy, but I can always make time for you. Make it quick, though.", "onyx", 1,
                        "_ __ _ iiiiii ____, ___ _ ___ ______ ____ ____ ___ ___. ____ __ _____, ______."),

            new Line(   "I'm always quick.", "kyana", 1,
                        "___ bbbbbb _____."),

            new Line(   "Well, that's definitely true. Silly me. Let's get going...", "onyx", 1,
                        "____, ______ __________ ____. _____ __. _____ ___ _____,,,"),

            new Line(   "HyperI/O Camera #46FFA910 Audio Feed - Hyper Beam HQ, 12:45 AM", "system", 2,
                        "pppppppp pppppp _________ ppppp pppp , aaaaa aaaa aa, ppppp pp"),

            new Line(   "Okay... so, update on our project.", "kyana", 1,
                        "____,,, __, ______ __ ___ _______."),

            new Line(   "I've been searching through my hyperI/O access, and I think I found something.", "kyana", 1,
                        "____ ____ _________ _______ __ ________ ______, ___ _ iiiii _ _____ _________."),

            new Line(   "There's some kind of 'restricted level' that the Admins have referred to, and I don't think they were talking about the usual access restrictions that get lifted as you're promoted.", "kyana", 1,
                        "_______ ____ ____ __ ___________ ______ ____ ___ ______ ____ ________ __, ___ _ _____ _____ ____ ____ _______ _____ ___ _____ ______ ____________ ____ ___ ______ __ ______ ________."),

            new Line(   "I won't say that I doubt it... it would be trivial to obscure parts of the system.", "onyx", 1,
                        "_ _____ ___ ____ _ _____ __,,, __ _____ __ _______ __ _______ _____ __ ___ ______."),

            new Line(   "Good, so you're still with me, then.", "kyana", 1,
                        "____, __ ______ _____ ____ __, ____."),

            new Line(   "I need you to develop a program, or something, that I can use to see the hidden layer and check what the Admins are up to.", "kyana", 1,
                        "_ ____ ___ __ _______ _ _______, __ iiiiiiiii, ____ _ ___ ___ __ ___ ___ ______ _____ ___ _____ ____ ___ ______ ___ __ __."),

            new Line(   "I'm on it, Kyana. I'm just as curious as you are to get to the bottom of this.", "onyx", 1,
                        "___ __ __, _____. ___ ____ __ _______ __ ___ ___ __ ___ __ ___ ______ __ ____."),

            new Line(   "- END OF RECOVERED DATA -", "system", 2,
                        "p ppp pp ppppppppp pppp p"),
        ]
    ],

    [
        "D-MSG010",
        [
            new Line(   "HyperI/O Voice Transmission #1A7F327E - Hyper Beam HQ, 10:22 PM", "system", 2,
                        "pppppppp ppppp pppppppppppp _________ , aaaaa aaaa aa, ppppp pp"),

            new Line(   "RING... RING... RING... RING...", "system", 0.5,
                        "rrrrrrr.rrrrrrr.rrrrrrr.rrrrrrr"),

            new Line(   "C’mon, pick up already...", "onyx", 1,
                        "_____, ____ __ _______,,,"),

            new Line(   "BEEP!", "system", 1,
                        "sssss"),

            new Line(   "Oh, you’re not answering...", "onyx", 1,
                        "__, ______ ___ _________,,,"),

            new Line(   "Well, in that case, don't listen to the rest of this unless you're somewhere private.", "onyx", 1,
                        "____, __ ____ ____, _____ ______ __ ___ ____ __ ____ ______ _____ __________ _______."),

            new Line(   "...", "onyx", 1,
                        ",,,"),

            new Line(   "Check your secure drive when you're done with whatever it is that you do after operations. I sent a transfer request with the tool you asked for.", "onyx", 1,
                        "_____ ____ ______ _____ ____ ______ ____ ____ ________ __ __ ____ ___ ii _____ __________. _ ____ _ ________ _______ ____ ___ ____ ___ _____ ___."),

            new Line(   "...you can ask me if anything confuses you. I know you're not the most... up-to-date with tech.", "onyx", 1,
                        ",,,___ ___ ___ __ __ ________ ________ ___. _ ____ ______ ___ ___ ____,,, iiiiiiiiii ____ ____."),

            new Line(   "But there is a readme, so consult that first, if you please.", "onyx", 1,
                        "___ _____ bb _ ______, __ _______ ____ _____, __ ___ ______."),

            new Line(   "Talk later.", "onyx", 1,
                        "____ _____."),

            new Line(   "- END OF RECOVERED DATA -", "system", 2,
                        "p ppp pp ppppppppp pppp p"),
        ]
    ],

    [
        "E-KL32FA",
        [
            new Line(   "New Archon Camera #112D8A39 Audio Feed - Lotus Apartment Complex, 12:37 AM", "system", 2,
                        "ppp pppppp pppppp _________ ppppp pppp , aaaaa aaaaaaaaa aaaaaaa, ppppp pp",
                        "ambient"),

            new Line(   "Kyana, I’m going to bed~!", "luna", 1,
                        "_____, ___ _____ __ ____."),

            new Line(   "<silence>", "kyana", 0.5,
                        "fffffffff"),

            new Line(   "I’ll see you in the morning...", "luna", 1,
                        "____ ___ ___ __ ___ _______,,,"),

            new Line(   "<louder silence?>", "kyana", 0.5,
                        "fffffff fffffffff"),

            new Line(   "Hey, what the hell... say something!", "luna", 1,
                        "___, ____ ___ ____,,, ___ wwwwwwwwww"),

            new Line(   "<deafening silence>", "kyana", 0.5,
                        "ffffffffff ffffffff"),

            new Line(   "Where’d she run off to...", "luna", 1,
                        "_______ ___ ___ ___ __,,,"),

            new Line(   "Oh! You are in h-", "luna", 1,
                        "__. ___ iii __ __"),

            new Line(   "Luna, get over here.", "kyana", 1,
                        "____, ___ ____ ____."),

            new Line(   "Huh?", "luna", 1,
                        "___."),

            new Line(   "Just look.", "kyana", 1,
                        "____ ____."),

            new Line(   "Alright, fine... why are you acting so weird?", "luna", 1,
                        "_______, ____,,, ___ ___ ___ ______ __ _____."),

            new Line(   "...what's this?", "luna", 1,
                        ",,,______ ____."),

            new Line(   "It's the hyperI/O records.", "kyana", 1,
                        "____ ___ ________ _______."),

            new Line(   "I've had a program running to scour the code for an entryway. To brute force my way in.", "kyana", 1,
                        "____ ___ _ _______ _______ __ _____ ___ ____ ___ __ ________. __ _____ _____ __ ___ __."),

            new Line(   "...Nyx wrote it for me. Obviously.", "kyana", 1,
                        ",,,___ _____ __ ___ __. _________."),

            new Line(   "I thought you already had access, though.", "luna", 1,
                        "_ _______ ___ iiiiiii ___ ______, ______."),

            new Line(   "So did I. Turns out there's another layer.", "kyana", 1,
                        "__ ___ _. _____ ___ _______ _______ _____."),

            new Line(   "...", "luna", 1,
                        ",,,"),

            new Line(   "I don't understand what this is, Kyana. Why are you showing me?", "luna", 1,
                        "_ _____ __________ ____ ____ __, _____. ___ ___ ___ _______ __."),

            new Line(   "Because they're hiding something from me, Luna. And you, too. Everyone.", "kyana", 1,
                        "_______ _______ ______ _________ ____ __, ____. ___ ___, ___. ________."),

            new Line(   "You're like, the best Operator we have. Why would Hyper Beam want to hide something from you?", "luna", 1,
                        "______ ____, ___ ____ ________ __ ____. ___ _____ _____ ____ ____ __ ____ _________ ____ ___."),

            new Line(   "Because they knew that if I was kept informed, I would do something, instead of sitting back and waiting.", "kyana", 1,
                        "_______ ____ ____ ____ __ _ ___ ____ ________, _ _____ bb _________, _______ __ _______ ____ ___ _______."),

            new Line(   "...I think... that you need to tell me what you found.", "luna", 1,
                        ",,,_ _____,,, ____ ___ ____ __ ____ __ ____ ___ _____."),

            new Line(   "I will, but you're not going to like it, Luna.", "kyana", 1,
                        "_ ____, ___ ______ ___ _____ __ ____ __, ____."),

            new Line(   "Sit closer, I need you to pay attention.", "kyana", 1,
                        "___ ______, _ ____ ___ __ ___ _________."),

            new Line(   "Um, okay. Like this?", "luna", 1,
                        "__, ____. ____ ____."),

            new Line(   "Mhm, like that.", "kyana", 1,
                        "fff. ffff ffff."),

            new Line(   "Anyways. They figured out why the Divergence happened.", "kyana", 1,
                        "_______. ____ _______ ___ ___ ___ __________ ________."),

            new Line(   "What??", "luna", 1,
                        "iiiiii"),

            new Line(   "Months ago. I'm not sure exactly how long. But they solved it.", "kyana", 1,
                        "______ ___. ___ ___ ____ iiiiiii ___ ____. ___ ____ ______ __."),

            new Line(   "Turns out, those rumors about an object in the outer reaches of the solar system...", "kyana", 1,
                        "_____ ___, _____ ______ _____ __ ______ __ ___ _____ _______ __ ___ _____ ______,,,"),

            new Line(   "They weren't rumors after all, I guess. I feel like an idiot for doubting them now.", "kyana", 1,
                        "____ _______ ______ _____ ___, _ _____. _ ____ ____ __ _____ ___ ________ ____ ___."),

            new Line(   "You are an idiot sometimes, but you couldn't have known if people were making stuff up like usual...", "luna", 1,
                        "___ www __ _____ _________, ___ ___ ________ ____ _____ __ ______ ____ ______ _____ __ ____ _____,,,"),

            new Line(   "And why are you acting like this is such an awful thing, anyways? If we know the origin of the Divergence, that's good, isn't it?", "luna", 1,
                        "___ ___ ___ ___ ______ ____ ____ __ ____ __ _____ _____, _______. __ __ ____ ___ ______ __ ___ __________, ______ iiii, _____ __."),

            new Line(   "You’d think. They studied the object to find out how it caused the whole timeline-splitting phenomenon.", "kyana", 1,
                        "_____ _____. ____ _______ ___ ______ __ ____ ___ ___ __ ______ ___ _____ __________________ __________."),

            new Line(   "I’ll summarize.", "kyana", 1,
                        "____ _________."),

            new Line(   "It first appeared when-", "kyana", 1,
                        "__ _____ ________ _____"),

            new Line(   "...", "kyana", 1,
                        ",,,"),

            new Line(   "It can't be that bad, Kyana. Just tell me.", "luna", 1,
                        "__ _____ __ ____ ___, _____. ____ ____ __."),

            new Line(   "...It first appeared during the Divergence. In the blink of an eye, its existence in our world began.", "kyana", 1,
                        ",,,__ _____ ________ ______ ___ __________. __ ___ _____ __ __ ___, ___ _________ __ ___ _____ _____."),

            new Line(   "It emitted a powerful wave to sweep the universe, scanning our entire world. Everything we’ve ever known, ever could know, captured inside its epicenter.", "kyana", 1,
                        "__ _______ _ ________ ____ __ _____ ___ ________, ________ ___ ______ _____. __________ _____ ____ _____, ____ iiiii ____, ________ ______ ___ _________."),

            new Line(   "The universe was split into countless timelines, each one different from the last, the initial parameters varied ever so slightly, but the outcome immeasurably altered.", "kyana", 1,
                        "___ ________ ___ _____ ____ _________ _________, ____ ___ _________ ____ ___ ____, ___ _______ __________ ______ ____ __ ________, ___ ___ _______ ____________ _______."),

            new Line(   "It collected all of this data, processing the incomprehensible scale of it at unbelievable speed.", "kyana", 1,
                        "__ _________ ___ __ ____ ____, __________ ___ ________________ _____ __ __ __ ____________ _____."),

            new Line(   "With the power of nearly unlimited knowledge of all possible branching outcomes, it can control the very world that we’re in right now.", "kyana", 1,
                        "____ ___ _____ __ ______ _________ _________ __ ___ ________ _________ ________, __ ___ _______ ___ ____ _____ ____ _____ __ _____ ___."),

            new Line(   "Every moment in time, every person, able to be manipulated, recreated...", "kyana", 1,
                        "_____ ______ __ ____, _____ ______, ____ __ __ ___________, _________,,,"),

            new Line(   "or destroyed.", "kyana", 0.25,
                        "__ _________."),

            new Line(   "...they’ve named it the Frequency Annihilator.", "kyana", 1,
                        ",,,_______ _____ __ ___ _________ ___________."),

            new Line(   "...", "luna", 1,
                        ",,,"),

            new Line(   "You’re... are you sure that's the truth?", "luna", 1,
                        "______,,, ___ ___ iiii ______ ___ _____."),

            new Line(   "I'm sure. I wouldn’t tell you unless I was a hundred percent confident. You don’t need the extra stress.", "kyana", 1,
                        "___ ____. _ ________ ____ ___ ______ _ ___ _ _______ _______ _________. ___ _____ ____ ___ _____ ______."),

            new Line(   "Okay...", "luna", 1,
                        "____,,,"),

            new Line(   "I trust you.", "luna", 1,
                        "_ _____ ___."),

            new Line(   "...but I still don’t get anything. Who created it? Who controls it? How did it appear from nowhere??", "luna", 1,
                        "fff___ _ _____ _____ ___ iiiiiiii. ___ _______ __. ___ iiiiiiii __. ___ ___ __ ______ ____ sssssssss"),

            new Line(   "And what does it mean for us??", "luna", 1,
                        "___ ____ ____ __ ____ ___ ssss"),

            new Line(   "I don't know.", "kyana", 1,
                        "_ _____ ____."),

            new Line(   "...I don’t know...", "kyana", 0.5,
                        "ffff fffff fffffff",
                        "stop"),

            new Line(   "But we have to do something. We can’t let anyone use it. If that’s even possible.", "kyana", 1,
                        "___ __ ____ __ __ _________. __ _____ ___ ______ ___ __. __ ______ ____ ________."),

            new Line(   "We can be certain that LIMIT is going to try to travel to it.", "kyana", 1,
                        "__ ___ __ _______ ____ _____ __ _____ __ ___ __ ______ __ __."),

            new Line(   "Nobody should be allowed the power to tear apart our universe. It needs to be disabled forever.", "kyana", 1,
                        "iiiiii ______ __ _______ ___ _____ __ ____ _____ ___ ________. __ _____ __ __ ________ _______."),

            new Line(   "What the hell are we supposed to do, Kyana? We might be unstoppable in New Archon, but do you realize how insane you sound? It’s in space, a million kilometers away. We can’t fucking do anything.", "luna", 1,
                        "____ ___ ssss ___ bb ________ __ __, _____. __ _____ __ ___________ __ ___ ______, ___ __ ___ _______ ___ ssssss ___ _____. ____ __ _____, _ _______ __________ ____. __ _____ _______ bb ________."),

            new Line(   "...", "kyana", 0.5,
                        ",,,"),

            new Line(   "I knew you would say that...", "kyana", 1,
                        "f ffff fff fffff fff ffff,,,"),

            new Line(   "I-I’m sorry, I didn’t mean to sound angry-", "luna", 1,
                        "_,___ _____, _ ______ ____ __ _____ _____."),

            new Line(   "...no. No, it’s okay. I get it.", "kyana", 1,
                        ",,,__. __, ____ ____. _ ___ __."),

            new Line(   "This isn’t easy for me either. Honestly, I'm-", "kyana", 1,
                        "____ _____ ____ ___ __ ______. ________, ___."),

            new Line(   "I’m scared, Luna. I've never felt this helpless before.", "kyana", 1,
                        "___ ______, ____. ____ _____ ____ ____ ________ ______."),

            new Line(   "...", "luna", 1,
                        ",,,"),

            new Line(   "I am, too.", "luna", 1,
                        "f ff, fff."),

            new Line(   "You’ve never acted like this before... I don’t know what to say...", "luna", 1,
                        "______ _____ _____ ____ ____ ______,,, _ _____ ____ ____ __ ___,,,"),

            new Line(   "Then come even closer.", "kyana", 1,
                        "____ ____ ____ ______."),

            new Line(   "Mhm.", "kyana", 1,
                        "fff."),

            new Line(   "No matter what happens, Luna... at least we've had our time together, right?", "kyana", 1,
                        "__ ______ ____ _______, ____,,, __ _____ _____ ___ ___ ____ ________, _____."),

            new Line(   "Don’t say that. You’re talking like we’re gonna die...", "luna", 1,
                        "_____ iii ____. ______ _______ ____ _____ _____ iii,,,"),

            new Line(   "Well-", "kyana", 1,
                        "____."),

            new Line(   "Just remember it, okay?", "kyana", 1,
                        "____ ________ __, ____."),

            new Line(   "I won’t ever forget about you, I promise.", "kyana", 1,
                        "_ _____ ____ ______ _____ ___, _ _______."),

            new Line(   "...", "luna", 1,
                        ",,,"),

            new Line(   "I guess... I promise that I’ll remember you, too.", "luna", 1,
                        "_ _____,,, _ _______ ____ ____ ________ ___, ___."),

            new Line(   "Good.", "kyana", 1,
                        "____."),

            new Line(   "...", "luna", 1,
                        ",,,"),

            new Line(   "Well, um... what do we do now?", "luna", 1,
                        "____, __,,, ____ __ __ __ ___."),

            new Line(   "We sit here and think, Luna. Me in your arms, and you in mine.", "kyana", 1,
                        "__ ___ ____ ___ _____, ____. __ __ ____ ____, ___ ___ __ ____."),

            new Line(   "We’ll think of something together.", "kyana", 1,
                        "_____ _____ __ _________ ________."),

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
            new Line(   "HyperI/O Camera #34C1D859 Audio Feed - Hyper Beam HQ Admin Office, 6:00 AM", "system", 2,
                        "pppppppp pppppp _________ ppppp pppp , aaaaa aaaa aa aaaaa aaaaaa, pppp pp",
                        "dread"),

            new Line(   "Good morning, Arin. I think it’s time for us to have a little chat, hm?", "kyana", 1,
                        "____ _______, ____. _ _____ ____ ____ ___ __ __ ____ _ ______ iiii, www"),

            new Line(   "What the... what do you think you're doing?", "arin", 1,
                        "____ ___,,, ssss __ ___ _____ ______ sssss."),

            new Line(   "Sit down and shut up, or I'll slit your throat.", "kyana", 1,
                        "___ ____ ___ bbbb bb, __ ____ ____ ____ ______."),

            new Line(   "...c-calm down, Kyana. You don't need to do that.", "arin", 1,
                        ",,,_,____ ____, _____. ___ _____ ____ __ __ ____."),

            new Line(   "I'll talk with you.", "arin", 1,
                        "____ ____ ____ ___."),

            new Line(   "You've been lying to me, and I can prove it.", "kyana", 1,
                        "______ ____ _____ __ __, ___ _ ___ _____ __."),

            new Line(   "I don’t know what you’re talking about. I haven’t lied to you.", "arin", 1,
                        "_ _____ ____ ____ ______ _______ _____. _ _______ ____ __ ___."),

            new Line(   "God, stop pretending. Do I need to force it out of you?", "kyana", 1,
                        "iii, ____ __________. __ _ ____ __ bbbbb __ ___ __ ___."),

            new Line(   "...say what you mean, Kyana. What do you think I’ve lied about?", "arin", 1,
                        ",,,___ ____ ___ ____, _____. ____ __ ___ _____ ____ ____ _____."),

            new Line(   "You’ve been hiding the Frequency Annihilator.", "kyana", 1,
                        "______ ____ ______ ___ _________ ___________."),

            new Line(   "...", "arin", 1,
                        ",,,"),

            new Line(   "Ah.", "arin", 1,
                        "iii"),

            new Line(   "Start talking. Explain why you’ve been doing fuck all, when we could have been working together to stop it.", "kyana", 1,
                        "_____ _______. _______ ___ ______ ____ _____ wwww www, ____ __ _____ ____ ____ _______ ________ __ ____ __."),

            new Line(   "Look at yourself, Kyana. If you’re this upset about it, what do you think would have happened if we’d told you sooner?", "arin", 1,
                        "iiii __ ________, _____. __ ______ iiii _____ _____ __, ____ __ ___ _____ _____ ____ ________ __ ____ ____ ___ ______."),

            new Line(   "I would have protected everyone, like we’re supposed to be doing. Oh, my apologies. Is Hyper Beam not in that business any more?", "kyana", 1,
                        "_ _____ ____ iiiiiiiii ________, ____ _____ iiiiiiii __ __ _____. __, ww wwwwwwwww. __ _____ ____ ___ __ ____ ________ ___ ____."),

            new Line(   "You would have recklessly insisted that we make an offense, when we’re nowhere near prepared, and put all of us into even more danger.", "arin", 1,
                        "___ _____ ____ __________ ________ ____ __ ____ __ _______, ____ _____ _______ ____ ________, ___ ___ ___ __ __ ____ ____ iiii ______."),

            new Line(   "As opposed to sitting on my ass and withholding information from the people who will actually put in effort? No, I’d rather do something about it.", "kyana", 1,
                        "__ _______ __ _______ __ __ ___ ___ ___________ ___________ ____ ___ ______ ___ ____ iiiiiiii ___ __ ______. __, ___ ______ __ _________ _____ __."),

            new Line(   "I see that we made the right decision, then. You’re just as much of a liability as we expected.", "arin", 1,
                        "_ ___ ____ __ ____ ___ _____ ________, ____. ______ ____ __ ____ __ _ _________ __ __ ________."),

            new Line(   "Watch your tongue, Arin. Give me one reason why I shouldn’t kill you right now. Maybe I could actually use Hyper Beam’s resources properly.", "kyana", 1,
                        "_____ ____ ______, ____. ____ __ bbb ______ ___ _ _________ ____ ___ _____ ___. _____ _ _____ ________ ___ _____ ______ _________ ________."),

            new Line(   "If you’d done more research, you’d have known that we’ve been allocating plenty of resources to neutralizing the Annihilator.", "arin", 1,
                        "__ _____ ____ ____ ________, _____ ____ _____ ____ _____ ____ __________ wwwwww __ _________ __ ____________ ___ ___________."),

            new Line(   "Do tell.", "kyana", 1,
                        "__ ____."),

            new Line(   "We launched a team to develop an interstellar vehicle, and made significant progress. We’re studying the Annihilator and testing prototypes for a device that will disable it. And we’re drafting plans for an assault on it, should LIMIT make a move.", "arin", 1,
                        "__ ________ _ ____ __ _______ __ ____________ _______, ___ ____ ___________ ________. _____ ________ ___ ___________ ___ _______ __________ ___ _ ______ ____ ____ _______ __. ___ _____ ________ _____ ___ __ _______ __ __, ______ _____ ____ _ ____."),

            new Line(   "I don’t believe you. You could be lying again, for all I know.", "kyana", 1,
                        "_ _____ _______ ___. ___ _____ __ _____ _____, ___ ___ _ ____."),

            new Line(   "This is why we never told you. You demand knowledge that you and everyone else would be better off without. You’re far beyond your clearance, and yet you’re still demanding more.", "arin", 1,
                        "iiii __ ___ __ _____ ____ ___. ___ ______ _________ ____ ___ ___ ________ ____ _____ __ ______ ___ _______. ______ bbb ______ ____ _________, ___ ___ ______ _____ _________ ____."),

            new Line(   "I’m not sure what kind of imbeciles you have making confidentiality decisions, but you’d absolutely be “better off” with your top operator knowing about a critical threat as far in advance as possible. You were ignorant to hide it from me.", "kyana", 1,
                        "___ ___ ____ ____ ____ __ _________ ___ ____ ______ _______________ _________, ___ _____ __________ __ _iiiiiiiiii_ ____ ____ ___ ________ _______ _____ _ ________ ______ __ ___ __ _______ __ ________. ___ ____ ________ __ ____ __ ____ __."),

            new Line(   "Whatever, Kyana. It doesn’t matter anymore, does it?", "arin", 1,
                        "________, _____. __ _______ ______ _______, ____ __."),

            new Line(   "I can show you the progress, if you want to see it so badly.", "arin", 1,
                        "_ ___ ____ ___ ___ ________, __ ___ ____ __ ___ __ ii _____."),

            new Line(   "Fine. And you’re going to include me in those assault plans. You need me, and you know it.", "kyana", 1,
                        "____. ___ ______ _____ __ _______ __ __ _____ _______ _____. ___ ____ __, ___ ___ ____ __."),

            new Line(   "Yes, we do.", "arin", 1,
                        "___. __ __."),

            new Line(   "- END OF RECOVERED DATA -", "system", 2,
                        "p ppp pp ppppppppp pppp p"),
        ]
    ],

    // hidden archives
    [
        "!-LMTLOG",
        [
            new Line(   "New Archon Camera #00348EEA Audio Feed - Beaver Warehouses, 11:38 PM", "system", 2,
                        "ppp pppppp pppppp _________ ppppp pppp , aaaaaa aaaaaaaaaa, ppppp pp",
                        "dread"),

            new Line(   "I assume you heard the news, sir?", "unknown", 1,
                        "p pppppp ppp ppppp ppp ppppp,pppp"),

            new Line(   "I did.", "unknown", 1,
                        "a aaaa"),

            new Line(   "Wrenn just doesn't know how to keep her nose out of something, does she?", "unknown", 1,
                        "aaaaa aaaa aaaaaaa aaaa aaa aa aaaa aaa aaaa aaa aa aaaaaaaaaa,aaaa aaaa"),

            new Line(   "She won't be a problem for much longer. Red team is staging a little operation of our own.", "unknown", 1,
                        "ppp ppppp pp p ppppppp ppp pppp ppppppp.ppp pppp pp ppppppp p pppppp ppppppppp pp ppp pppp"),

            new Line(   "Good. And the vehicle development?", "unknown", 1,
                        "aaaaa.aaa aaa aaaaaaa aaaaaaaaaaaa"),

            new Line(   "Slow but steady, sir. They're projecting completion in five to seven months.", "unknown", 1,
                        "pppp ppp ppppppp,pppp.ppppppp pppppppppp pppppppppp pp pppp pp ppppp ppppppp"),

            new Line(   "Tell them they're getting shot if it's not done in four. HB's engineers are fast.", "unknown", 1,
                        "aaaa aaaa aaaaaaa aaaaaaa aaaa aa aaaa aaa aaaa aa aaaaa.aaaa aaaaaaaaa aaa aaaaa"),

            new Line(   "Understood, sir.", "unknown", 1,
                        "ppppppppppp,pppp"),

            new Line(   "- END OF RECOVERED DATA -", "system", 2,
                        "p ppp pp ppppppppp pppp p"),
        ]
    ],

    [
        "!-LXAN01",
        [
            new Line(   "HyperI/O Camera #99A20001 Audio Feed - Hyper Beam HQ Dining Hall, 12:24 PM", "system", 2,
                        "pppppppp pppppp _________ ppppp pppp , aaaaa aaaa aa aaaaaa aaaa, ppppp pp",
                        "neutral"),

            new Line(   "Yo, what's up?", "lexia", 1,
                        "__, ______ __?"),

            new Line(   "Hey Lex!", "onyx", 1,
                        "___, ___!"),

            new Line(   "Hi, Lexia.", "kyana", 1,
                        "___, ____"),

            new Line(   "You came at a good time, actually.", "kyana", 1,
                        "___ ____ __ _ ____ ____, _________"),

            new Line(   "Oh?", "lexia", 1,
                        "__?"),

            new Line(   "Yeah, Kyana and I were just talking about you...", "onyx", 1,
                        "____, _____ ___ _ ____ ____ _______ _____ ___,,,"),

            new Line(   "...good things, I hope?", "lexia", 1,
                        "_______ ______, _ ____?"),

            new Line(   "Yes yes, don't worry. We just want your help with something.", "onyx", 1,
                        "___ ___, _____ _____. __ ____ ____ ____ ____ ____ __________"),

            new Line(   "You free to meet at her apartment after work today? Luna and I will be there, too.", "onyx", 1,
                        "___ ____ __ ____ __ ___ _________ _____ ____ _____. ____ ___ _ ____ __ _____, ____"),

            new Line(   "I mean... what is this all about...?", "lexia", 1,
                        "_ ____,,, ____ __ ____ ___ _________"),

            new Line(   "Kyana found out tha-", "onyx", 1,
                        "_____ _____ ___ ____"),

            new Line(   "I'll explain more later. We need another skilled proxy, and that's you.", "kyana", 1,
                        "____ _______ ____ iiiii. __ ____ _______ _______ _____, ___ ______ ____"),

            new Line(   "How cryptic. But sure, I can be there.", "lexia", 1,
                        "___ _______. ___ ____, _ ___ __ ______"),

            new Line(   "Perfect!", "onyx", 1,
                        "_______!"),

            new Line(   "I told you she'd say yes to me.", "kyana", 1,
                        "_ wwww ___ _____ ___ ___ __ ___"),

            new Line(   "...huh?", "lexia", 1,
                        ",,,___?"),

            new Line(   "Nothing. Wanna have lunch with us?", "onyx", 1,
                        "iiiiiii. _____ ____ _____ ____ __?"),
                        
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
                case "r": nxtChar.classList.add("rainbow"); break; // rainbow
                case "l": nxtChar.classList.add("little"); break; // small text
                case ",": delay = BASE_TEXT_SPEED * 8; break;
                case ".": delay = BASE_TEXT_SPEED * 24; break;
                case "-": delay = BASE_TEXT_SPEED * 32; break;
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
    const arrowDisplay = document.getElementById("arrow");

    const urlParams = new URLSearchParams(window.location.search);
    const musicVol = urlParams.get("musicVol") ?? 1;
    const sfxVol = urlParams.get("sfxVol") ?? 1;

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

    const ambientResp = await fetch("/archive/music/dread.ogg");
    ambientBuffer = await musicContext.decodeAudioData(await ambientResp.arrayBuffer());
    const dreadResp = await fetch("/archive/music/dread.ogg");
    dreadBuffer = await musicContext.decodeAudioData(await dreadResp.arrayBuffer());
    const neutralResp = await fetch("/archive/music/dread.ogg");
    neutralBuffer = await musicContext.decodeAudioData(await neutralResp.arrayBuffer());

    const music = new Map([
        ["ambient", ambientBuffer],     // Name: Zone: Void
        ["dread", dreadBuffer],         // Name: Abandoned World
        ["neutral", neutralBuffer],     // Name: 
    ]);

    var currentMusic = null;

    // set audio volumes from URL
    speechGain.gain.setValueAtTime(sfxVol, speechContext.currentTime);
    musicGain.gain.setValueAtTime(musicVol, musicContext.currentTime);

    // Force a click to resume the AudioContext
    await waitForInput();

    // Loop through all lines of dialogue
    for(let i = 0; i < dialogue.length; i++) { 

        // Reset displayed line
        textbox.innerHTML = "";

        // Display speaker portrait
        portraitDisplay.src = `${portraitRoot}${portraits.get(dialogue[i].speaker)}`;

        // Trigger music
        trigger = dialogue[i].musicTrigger;
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
        await displayLine(textbox, dialogue[i], speakerDisplay, voices);

        // show the arrow icon unless this is the last dialogue
        if (i != (dialogue.length-1)) {
            arrowDisplay.classList.remove("hidden");
        }

        // Wait until click/spacebar to display next line
        await waitForInput();

        // remove the arrow icon
        arrowDisplay.classList.add("hidden");
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