import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

export class BonusItem {
    static bonusElement;
    static iconElement;
    static textElement;
    static durationElement; 

    static cooldown;
    static timeUntilAppear;
    static xpos;
    static ypos;

    static currentEffect;
    static effectDuration;

    static effectMultiplier;

    static firstClick;

    constructor() {
        this.cooldown = Constants.BONUS_COOLDOWN;
        this.timeUntilAppear = this.cooldown;
        this.xpos = 0;
        this.ypos = 0;

        this.effects = {
            "processBoost":
            {   
                strength:10,
                duration:25,
                targets:["process"],
                desc:"process generation for 25 seconds!",
            },

            "buttonBoost":
            {
                strength:8,
                duration:30,
                targets:["button"],
                desc:"manual resource generation for 30 seconds!",
            },

            "coreBoost":
            {
                strength:6,
                duration:20,
                targets:["core"],
                desc:"core generation for 20 seconds!",
            },

            "rareBoost":
            {
                strength:32,
                duration:32,
                targets:["process", "core", "button"],
                desc:"process, core, and manual resource generation for 32 seconds!",
            },
        }

        this.currentEffect = null;
        this.effectDuration = 0;

        this.effectMultiplier = 1;

        this.firstClick = true;
    }

    bonusTick() {
        this.timeUntilAppear -= 1;

        if (this.timeUntilAppear <= 0) {
            this.bonusAppear();
            this.timeUntilAppear = 999999999;
        }

        if(this.currentEffect) { 
            this.effectDuration -= 1;

            this.durationElement.innerHTML = `${this.effectDuration}`;

            if(this.effectDuration <= 0) {
                this.endEffect();
            }
        }
    }

    bonusAppear() {
        this.xpos = Math.random() * 50;
        this.ypos = Math.random() * 100;

        this.bonusElement.style.left = `calc(25% + ${this.xpos}%)`;
        this.bonusElement.style.top = `calc(${this.ypos}% - 50px)`;

        this.bonusElement.style.display = "flex";
        this.iconElement.style.display = "block";
        this.textElement.style.display = "none";

        this.iconElement.classList.add("fade-out-bonus");
        this.iconElement.addEventListener("animationend", () => {
            this.iconElement.classList.remove("fade-out-bonus");
            this.iconElement.style.display = "none";

            this.timeUntilAppear = this.cooldown;
        });

        console.log("Bonus spawned!");
    }

    activateBonus() {
        this.iconElement.style.display = "none";

        var keys = Object.keys(this.effects);
        var selected = keys[keys.length * Math.random() << 0];
        var selectedEffect = this.effects[selected];

        console.log(`Activating ${selected}!`);

        this.currentEffect = {strength:(selectedEffect.strength*this.effectMultiplier), duration:selectedEffect.duration, targets:selectedEffect.targets, desc:selectedEffect.desc};

        this.startEffect(this.currentEffect);

        this.textElement.innerHTML = `<span class="title">&gt;&gt;&gt; Virus Removed &lt;&lt;&lt;</span><br>${selectedEffect.strength * this.effectMultiplier}x ${selectedEffect.desc}`;
        this.textElement.style.display = "block";
        this.bonusElement.style.left = `calc(25% + ${this.xpos}% - ${this.textElement.offsetWidth/2}px + 25px)`;
        this.bonusElement.style.top = `calc(${this.ypos}% - 50px)`;
        
        this.timeUntilAppear = this.cooldown;

        this.textElement.classList.add("fade-out-notification");
        this.textElement.addEventListener("animationend", () => {
            this.textElement.classList.remove("fade-out-notification");
            this.textElement.style.display = "none";
        });

        // unlock bonus upgrade path for first click
        if (this.firstClick) {
            Utils.unlockUpgrade("normal_upgrades_list", "arcbits", "bonusCooldown1");
            this.firstClick = false;
        }
    }

    startEffect(effect) {

        // cancel all ongoing effects
        this.currentEffect = {strength:1, duration:1, targets:["process", "core", "button"], desc:""};
        this.endEffect();

        // start the selected effect
        this.currentEffect = effect;

        this.currentEffect.targets.forEach((target) => {
            switch (target) {
                case "button":
                    Utils.gameData.resources.get("arcbits").addBtnValMultSource("bonusItem");
                    Utils.gameData.resources.get("hyperkeys").addBtnValMultSource("bonusItem");
                    Utils.gameData.resources.get("nullpointers").addBtnValMultSource("bonusItem");
                    break;
                case "process":
                    Utils.gameData.resources.get("arcbits").addDeltaMultSource("bonusItem");
                    break;
                case "core":
                    Utils.gameData.resources.get("cores").addDeltaMultSource("bonusItem");
                    break;
            }
        });

        this.effectDuration = this.currentEffect.duration;

        this.durationElement.style.display = "flex";
        this.durationElement.innerHTML = this.effectDuration;
        this.durationElement.setAttribute("title", `${this.currentEffect.strength * this.effectMultiplier}x ${this.currentEffect.desc}`);
    }

    endEffect() {
        this.currentEffect.targets.forEach((target) => {
            switch (target) {
                case "button":
                    Utils.gameData.resources.get("arcbits").removeBtnValMultSource("bonusItem");
                    Utils.gameData.resources.get("hyperkeys").removeBtnValMultSource("bonusItem");
                    Utils.gameData.resources.get("nullpointers").removeBtnValMultSource("bonusItem");
                    break;
                case "process":
                    Utils.gameData.resources.get("arcbits").removeDeltaMultSource("bonusItem");
                    break;
                case "core":
                    Utils.gameData.resources.get("cores").removeDeltaMultSource("bonusItem");
                    break;
            }
        });

        this.currentEffect = null;

        this.durationElement.style.display = "none";
        this.durationElement.innerHTML = "";
        this.durationElement.setAttribute("title", "");
    }

    initDisplayElements() {
        this.bonusElement = document.querySelector(".game .bonus_item");
        this.iconElement = this.bonusElement.querySelector(".bonus_icon");
        this.textElement = this.bonusElement.querySelector(".bonus_text");
        this.durationElement = document.querySelector(".game .bonus_duration");
    }
}