export class GameAudio {
    static musicContext;
    static musicGain;

    static sfxContext;
    static sfxGain;

    static musicMuted;
    static sfxMuted;

    static musicVoid;

    static sfxDecrypt;
    static sfxConstruct;
    static sfxLocateFailure;
    static sfxLocateSuccess;
    static sfxUpgrade;
    static sfxInvalid;
    static sfxBuy;
    static sfxSell;
    static sfxSelect;
    static sfxBonus;


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

    }

    // Play SFX

    playSfxDecrypt() {
        // randomize pitch between 0.85x-1.15x
        this.sfxDecrypt.pause();
        this.sfxDecrypt.currentTime = 0;
        this.sfxDecrypt.playbackRate = 0.85 + (Math.random()*0.3);
        this.sfxDecrypt.play();
    }

    playSfxConstruct() {
        // randomize pitch between 0.85x-1.15x
        this.sfxConstruct.pause();
        this.sfxConstruct.currentTime = 0;
        this.sfxConstruct.playbackRate = 0.85 + (Math.random()*0.3);
        this.sfxConstruct.play();
    }

    playSfxLocateFailure() {
        // randomize pitch between 0.85x-1.15x
        this.sfxLocateFailure.pause();
        this.sfxLocateFailure.currentTime = 0;
        this.sfxLocateFailure.playbackRate = 0.85 + (Math.random()*0.3);
        this.sfxLocateFailure.play();
    }

    playSfxLocateSuccess(streak = 0) {
        this.sfxLocateSuccess.pause();
        this.sfxLocateSuccess.currentTime = 0;
        this.sfxLocateSuccess.playbackRate = 1;
        this.sfxLocateSuccess.play();
    }

    playSfxUpgrade() {
        this.sfxUpgrade.play();
    }

    playSfxInvalid() {
        this.sfxInvalid.play();
    }

    playSfxBuy() {
        this.sfxBuy.play();
    }

    playSfxSell() {
        this.sfxSell.play();
    }

    playSfxSelect() {
        this.sfxSelect.play();
    }

    playSfxBonus() {
        this.sfxBonus.play();
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