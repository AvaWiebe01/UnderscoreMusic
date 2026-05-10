import { Constants } from "./constants.js";

export class GameAudio {
    static musicContext;
    static musicGain;

    static sfxContext;
    static sfxGain;

    static musicMuted;
    static sfxMuted;
    static storyMusicMuted;
    static storySfxMuted;

    static musicVoid;

    static sfxDecrypt;
    static sfxConstruct;
    static sfxLocateFailure;
    static sfxLocateSuccess;
    static sfxUpgrade;
    static sfxInvalid;
    static sfxSelect;
    static sfxBonus;
    static sfxUnlocked;
    static sfxStart;


    constructor() {
        this.musicContext = new AudioContext();
        this.musicGain = this.musicContext.createGain();
        this.musicGain.gain.setValueAtTime(Constants.MAX_SFX_GAIN, this.musicContext.currentTime);
        this.musicGain.connect(this.musicContext.destination);

        this.sfxContext = new AudioContext();
        this.sfxGain = this.sfxContext.createGain();
        this.sfxGain.connect(this.sfxContext.destination);

        this.musicMuted = false;
        this.sfxMuted = false;
        this.storyMusicMuted = false;
        this.storySfxMuted = false;

        // init Music

        this.musicVoid = document.getElementById("music_void");
        const musicVoidTrack = this.musicContext.createMediaElementSource(this.musicVoid);
        musicVoidTrack.connect(this.musicGain);

        // init SFX

        this.sfxDecrypt = document.getElementById("sfx_decrypt");
        this.sfxDecrypt.preservesPitch = false;
        const sfxDecryptTrack = this.sfxContext.createMediaElementSource(this.sfxDecrypt);
        sfxDecryptTrack.connect(this.sfxGain);

        this.sfxConstruct = document.getElementById("sfx_construct");
        this.sfxConstruct.preservesPitch = false;
        const sfxConstructTrack = this.sfxContext.createMediaElementSource(this.sfxConstruct);
        sfxConstructTrack.connect(this.sfxGain);

        this.sfxLocateFailure = document.getElementById("sfx_locate_failure");
        this.sfxLocateFailure.preservesPitch = false;
        const sfxLocateFailureTrack = this.sfxContext.createMediaElementSource(this.sfxLocateFailure);
        sfxLocateFailureTrack.connect(this.sfxGain);

        this.sfxLocateSuccess = document.getElementById("sfx_locate_success");
        this.sfxLocateSuccess.preservesPitch = false;
        const sfxLocateSuccessTrack = this.sfxContext.createMediaElementSource(this.sfxLocateSuccess);
        sfxLocateSuccessTrack.connect(this.sfxGain);

        this.sfxUpgrade = document.getElementById("sfx_upgrade");
        this.sfxUpgrade.preservesPitch = false;
        const sfxUpgradeTrack = this.sfxContext.createMediaElementSource(this.sfxUpgrade);
        sfxUpgradeTrack.connect(this.sfxGain);

        this.sfxInvalid = document.getElementById("sfx_invalid");
        this.sfxInvalid.preservesPitch = false;
        const sfxInvalidTrack = this.sfxContext.createMediaElementSource(this.sfxInvalid);
        sfxInvalidTrack.connect(this.sfxGain);

        this.sfxSelect = document.getElementById("sfx_select");
        this.sfxSelect.preservesPitch = false;
        const sfxSelectTrack = this.sfxContext.createMediaElementSource(this.sfxSelect);
        sfxSelectTrack.connect(this.sfxGain);

        this.sfxBonus = document.getElementById("sfx_bonus");
        this.sfxBonus.preservesPitch = false;
        const sfxBonusTrack = this.sfxContext.createMediaElementSource(this.sfxBonus);
        sfxBonusTrack.connect(this.sfxGain);

        this.sfxUnlocked = document.getElementById("sfx_unlocked");
        this.sfxUnlocked.preservesPitch = false;
        const sfxUnlockedTrack = this.sfxContext.createMediaElementSource(this.sfxUnlocked);
        sfxUnlockedTrack.connect(this.sfxGain);

        this.sfxStart = document.getElementById("sfx_start");
        this.sfxStart.preservesPitch = false;
        const sfxStartTrack = this.sfxContext.createMediaElementSource(this.sfxStart);
        sfxStartTrack.connect(this.sfxGain);
    }

    // Play SFX

    playSfxDecrypt() {
        try {
            // randomize pitch between 0.85x-1.15x
            this.sfxDecrypt.pause();
            this.sfxDecrypt.currentTime = 0;
            this.sfxDecrypt.playbackRate = 0.85 + (Math.random()*0.3);
            this.sfxDecrypt.play();
        } catch(e) {
            console.log("Audio failed to play.");
        }
    }

    playSfxConstruct() {
        try {
            // randomize pitch between 0.85x-1.15x
            this.sfxConstruct.pause();
            this.sfxConstruct.currentTime = 0;
            this.sfxConstruct.playbackRate = 0.85 + (Math.random()*0.3);
            this.sfxConstruct.play();
        } catch(e) {
            console.log("Audio failed to play.");
        }         
    }

    playSfxLocateFailure() {
        try {
            // randomize pitch between 0.85x-1.15x
            this.sfxLocateFailure.pause();
            this.sfxLocateFailure.currentTime = 0;
            this.sfxLocateFailure.playbackRate = 0.85 + (Math.random()*0.3);
            this.sfxLocateFailure.play();
        } catch(e) {
            console.log("Audio failed to play.");
        }      
    }

    playSfxLocateSuccess(streak = 0) {
        try {
            this.sfxLocateSuccess.pause();
            this.sfxLocateSuccess.currentTime = 0;
            this.sfxLocateSuccess.playbackRate = 1;
            this.sfxLocateSuccess.play();
        } catch(e) {
            console.log("Audio failed to play.");
        }  
    }

    playSfxUpgrade() {
        try {
            this.sfxUpgrade.pause();
            this.sfxUpgrade.currentTime = 0;
            this.sfxUpgrade.playbackRate = 1;
            this.sfxUpgrade.play();
        } catch(e) {
            console.log("Audio failed to play.");
        } 
    }

    playSfxInvalid() {
        try {
            // randomize pitch between 0.9x-1.11x
            this.sfxInvalid.pause();
            this.sfxInvalid.currentTime = 0;
            this.sfxInvalid.playbackRate = 0.9 + (Math.random()*0.2);
            this.sfxInvalid.play();
        } catch(e) {
            console.log("Audio failed to play.");
        }     
    }

    playSfxSelect() {
        try {
            // randomize pitch between 0.9x-1.1x
            this.sfxSelect.pause();
            this.sfxSelect.currentTime = 0;
            this.sfxSelect.playbackRate = 0.9 + (Math.random()*0.2);
            this.sfxSelect.play();
        } catch(e) {
            console.log("Audio failed to play.");
        }
    }

    playSfxBonus() {
        try {
            this.sfxBonus.pause();
            this.sfxBonus.currentTime = 0;
            this.sfxBonus.playbackRate = 1;
            this.sfxBonus.play();
        } catch(e) {
            console.log("Audio failed to play.");
        }  
    }

    playSfxUnlocked() {
        try {
            this.sfxUnlocked.pause();
            this.sfxUnlocked.currentTime = 0;
            this.sfxUnlocked.playbackRate = 1;
            this.sfxUnlocked.play();
        } catch(e) {
            console.log("Audio failed to play.");
        }   
    }

    playSfxStart() {
        try {
            this.sfxStart.pause();
            this.sfxStart.currentTime = 0;
            this.sfxStart.playbackRate = 1;
            this.sfxStart.play();
        } catch(e) {
            console.log("Audio failed to play.");
        }   
    }


    // Play Music

    // Volume controls

    toggleMusic(target) {
        this.musicMuted = !this.musicMuted;
        target.innerHTML = (this.musicMuted) ? "Enable Music" : "Mute Music";

        this.musicGain.gain.setValueAtTime((this.musicMuted ? 0 : Constants.MAX_MUSIC_GAIN), this.musicContext.currentTime);
    }

    toggleSfx(target) {
        this.sfxMuted = !this.sfxMuted;
        target.innerHTML = (this.sfxMuted) ? "Enable Sound Effects" : "Mute Sound Effects";

        this.sfxGain.gain.setValueAtTime((this.sfxMuted ? 0 : Constants.MAX_SFX_GAIN), this.sfxContext.currentTime);
    }

    toggleStoryMusic(target) {
        this.storyMusicMuted = !this.storyMusicMuted;
        target.innerHTML = (this.storyMusicMuted) ? "Enable Music" : "Mute Music";
        
        // change URL parameters
        const links = document.getElementsByClassName("fragment_link");
        for (let link of links) {
            const url = new URL(link.getAttribute("href"), window.location.href);
            const params = url.searchParams;
            params.set(`musicVol`, `${(this.storyMusicMuted ? 0 : Constants.MAX_STORY_MUSIC_GAIN)}`);
            url.search = params.toString();
            link.setAttribute("href", url.href);
        }
    }

    toggleStorySfx(target) {
        this.storySfxMuted = !this.storySfxMuted;
        target.innerHTML = (this.storySfxMuted) ? "Enable Sound Effects" : "Mute Sound Effects";

        // change URL parameters
        const links = document.getElementsByClassName("fragment_link");
        for (let link of links) {
            const url = new URL(link.getAttribute("href"), window.location.href);
            const params = url.searchParams;
            params.set(`sfxVol`, `${(this.storySfxMuted ? 0 : Constants.MAX_STORY_SFX_GAIN)}`);
            url.search = params.toString();
            link.setAttribute("href", url.href);
        }
    }
}

export function initAudio() {
    return new GameAudio();
}