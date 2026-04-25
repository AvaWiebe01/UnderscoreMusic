export class GameAudio {
    static musicContext;
    static musicGain;

    static sfxContext;
    static sfxGain;

    static musicMuted;
    static sfxMuted;

    static musicVoid;
    static sfxDecrypt;

    constructor() {
        this.musicContext = new AudioContext();
        this.musicGain = this.musicContext.createGain();
        this.musicGain.connect(this.musicContext.destination);

        this.sfxContext = new AudioContext();
        this.sfxGain = this.sfxContext.createGain();
        this.sfxGain.connect(this.sfxContext.destination);

        this.musicMuted = false;
        this.sfxMuted = false;

        // init Music

        this.musicVoid = document.getElementById("music_void");
        const musicVoidTrack = this.musicContext.createMediaElementSource(this.musicVoid);
        musicVoidTrack.connect(this.musicGain);

        // init SFX

        this.sfxDecrypt = document.getElementById("sfx_decrypt");
        this.sfxDecrypt.preservesPitch = false;
        const sfxDecryptTrack = this.sfxContext.createMediaElementSource(this.sfxDecrypt);
        sfxDecryptTrack.connect(this.sfxGain);
    }

    // Play SFX
    playSfxDecrypt() {
        // randomize pitch every click between 0.9x-1.1x
        this.sfxDecrypt.playbackRate = 0.85 + (Math.random()*0.3);
        this.sfxDecrypt.play();
    }

    // Play Music

    // Volume controls

    toggleMusic(target) {
        this.musicMuted = !this.musicMuted;
        target.innerHTML = (this.musicMuted) ? "Enable Music" : "Mute Music";

        this.musicGain.gain.setValueAtTime((this.musicMuted ? 0 : 1), this.musicContext.currentTime);
    }

    toggleSfx(target) {
        this.sfxMuted = !this.sfxMuted;
        target.innerHTML = (this.sfxMuted) ? "Enable Sound Effects" : "Mute Sound Effects";

        this.sfxGain.gain.setValueAtTime((this.sfxMuted ? 0 : 1), this.sfxContext.currentTime);
    }
}

export function initAudio() {
    return new GameAudio();
}