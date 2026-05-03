import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

import { GameData } from "./gamedata.js";

export class HyperMods {
    mods;
    enabledMods;
    maxEnabled;

    maxEnabledDisplay;
    
    constructor(mods) {
        this.mods = mods;
        this.enabledMods = new Map();
        this.maxEnabled = 1;
    }  

    modifyMaxEnabled(newMax) {
        this.maxEnabled = newMax;
        this.updateDisplays();
    }

    updateDisplays() {
        this.maxEnabledDisplay.innerHTML = `HyperMod Slot Usage: ${this.enabledMods.size}/${this.maxEnabled}`;
    }

    initDisplayElements() {
        this.maxEnabledDisplay = document.querySelector(".architectures_panel .max_enabled_display");

        this.updateDisplays();
    }
}


export class HyperMod {
    htmlName;
    displayableName;
    description;
    enabled;
    
    constructor(htmlName, displayableName, description) {
        this.htmlName = htmlName;
        this.displayableName = displayableName;
        this.description = description;
        this.enabled = false;
    }

    enable() {
        console.log("Implement in subclass");
    }

    disable() {
        console.log("Implement in subclass");
    }

    updateDisplays() {
        const statusDisplay = document.querySelector(`.architectures_panel .architecture_list .hypermod[name="${this.htmlName}"] .status_display`);
        const buttonDisplay = document.querySelector(`.architectures_panel .architecture_list .hypermod[name="${this.htmlName}"] button`);

        statusDisplay.innerHTML = `${this.enabled ? "<span class='pink'>Installed!</span>" : "Ready for Install."}`;
        buttonDisplay.innerHTML = `${this.enabled ? "Deactivate HyperMod" : "Activate HyperMod"}`;
    }

    toJSON() {
        return { 
            enabled: this.enabled,
        }
    }
}

export class HyperMultArch extends HyperMod {
    enable() {
        //Utils.gameData.resources.get("arcbits").addDeltaMultSource("hyperMult");
        //Utils.gameData.resources.get("arcbits").addBtnValMultSource("hyperMult");
        Utils.gameData.multipliers.get("arcMult").activateUniversalMult();
        this.enabled = true;
    }

    disable() {
        //Utils.gameData.resources.get("arcbits").removeDeltaMultSource("hyperMult");
        //Utils.gameData.resources.get("arcbits").removeBtnValMultSource("hyperMult");
        Utils.gameData.multipliers.get("arcMult").deactivateUniversalMult();
        this.enabled = false;
    }
}

export class HyperCoreArch extends HyperMod {
    enable() {
        Utils.gameData.resources.get("cores").addDeltaMultSource("hyperCore");
        Utils.gameData.multipliers.get("hyperCore").showDisplays();
        this.enabled = true;
    }

    disable() {
        Utils.gameData.resources.get("cores").removeDeltaMultSource("hyperCore");
        Utils.gameData.multipliers.get("hyperCore").hideDisplays();
        this.enabled = false;
    }
}

export class KeyMultArch extends HyperMod {
    enable() {
        Utils.gameData.resources.get("hyperkeys").addBtnValMultSource("arcMult");
        document.querySelector(".game .generate_panel div[id='hyperkeys_btn_main'] .arcmult_display").classList.remove("hidden");
        this.enabled = true;
    }

    disable() {
        Utils.gameData.resources.get("hyperkeys").removeBtnValMultSource("arcMult");
        document.querySelector(".game .generate_panel div[id='hyperkeys_btn_main'] .arcmult_display").classList.add("hidden");
        this.enabled = false;
    }
}

export class MalwareDefenseArch extends HyperMod {
    enable() {
        Utils.gameData.bonusItem.effectMultiplier = 2;
        Utils.gameData.bonusItem.cooldownMultiplier = 0.70;
        this.enabled = true;
    }   

    disable() {
        Utils.gameData.bonusItem.effectMultiplier = 1;
        Utils.gameData.bonusItem.cooldownMultiplier = 1;
        this.enabled = false;
    }
}

export class MultiProcessArch extends HyperMod {
    enable() {
        Utils.gameData.resources.get("arcbits").addDeltaMultSource("multiProcess");
        Utils.gameData.multipliers.get("multiProcess").showDisplays();
        this.enabled = true;
    }

    disable() {
        Utils.gameData.resources.get("arcbits").removeDeltaMultSource("multiProcess");
        Utils.gameData.multipliers.get("multiProcess").hideDisplays();
        this.enabled = false;
    }
}

export class RerollArch extends HyperMod {
    enable() {
        const nullptrs = Utils.gameData.resources.get("nullpointers");
        nullptrs.rolls += 1;
        this.enabled = true;
    }   

    disable() {
        const nullptrs = Utils.gameData.resources.get("nullpointers");
        nullptrs.rolls -= 1;
        this.enabled = false;
    }
}

export class StreakArch extends HyperMod {
    enable() {
        const nullptrs = Utils.gameData.resources.get("nullpointers");
        nullptrs.streakBase += 1;
        this.enabled = true;
    }

    disable() {
        const nullptrs = Utils.gameData.resources.get("nullpointers");
        nullptrs.streakBase -= 1;
        this.enabled = false;
    }
}

export class NetworkGenerationArch extends HyperMod {
    enable() {
        Utils.gameData.resources.get("cores").addDeltaMultSource("networkGeneration");
        Utils.gameData.multipliers.get("networkGeneration").showDisplays();
        this.enabled = true;
    }

    disable() {
        Utils.gameData.resources.get("cores").addDeltaMultSource("networkGeneration");
        Utils.gameData.multipliers.get("networkGeneration").hideDisplays();
        this.enabled = false;
    } 
}

export class CpuBleedArch extends HyperMod {
    fractionOfDelta = 0.01;

    enable() {
        Utils.gameData.resources.get("arcbits").btnValFractionOfDelta += this.fractionOfDelta;
        this.enabled = true;
    }

    disable() {
        Utils.gameData.resources.get("arcbits").btnValFractionOfDelta -= this.fractionOfDelta;
        this.enabled = false;
    } 
}

export function initHyperMods(gameData = new GameData()) {
    var mods = new Map([
        ["hyperMultArch", new HyperMultArch("hyperMultArch", "HyperMult", "<strong>All</strong> resource buttons contribute to <strong>ArcMult</strong>.")],
        ["keyMultArch", new KeyMultArch("keyMultArch", "KeyMult", "<strong>ArcMult</strong> also provides a multiplier to <strong>construction</strong> HyperKey generation.")],
        ["cpuBleedArch", new CpuBleedArch("cpuBleedArch", "CPU Bleed", "ArcBit <strong>Decryption</strong> yields <strong>+1%</strong> of active <strong>process</strong> ArcBit generation.")],
        ["networkGenerationArch", new NetworkGenerationArch("networkGenerationArch", "Network Generation", "Each instance of <strong>Link Crawler</strong> increases core generation rate by <strong>5%</strong>.")],
        ["hyperCoreArch", new HyperCoreArch("hyperCoreArch", "HyperCore", "<strong>Core</strong> generation rate is multiplied by sqrt[current <strong>HyperKey</strong> amount].")],
        ["malwareDefenseArch", new MalwareDefenseArch("malwareDefenseArch", "Malware Defense", "Removing a <strong>virus</strong> generates <strong>2x</strong> stronger effects. Detect viruses <strong>30%</strong> faster.")],
        ["multiProcessArch", new MultiProcessArch("multiProcessArch", "Multi-Process", `<strong>Process</strong> ArcBit generation is multiplied by the lowest <strong>number of instances</strong> of all programs [excluding 0].`)],
        ["rerollArch", new RerollArch("rerollArch", "Reroll+", "Each attempt to <strong>Locate</strong> NullPointers rolls the probability 1 additional time for a positive outcome.")],
        ["streakArch", new StreakArch("streakArch", "Streak+", "NullPointer <strong>streak</strong> multiplier is increased by <strong>1</strong>.")],
    ])

    const hypermods = new HyperMods(mods);

    //populate the tab with hidden hypermods to be unlocked
    const archList = document.querySelector(".architecture_list");
    var modsHtml = "";

    mods.forEach((mod, tag) => {
        modsHtml += `
        <div class="hypermod hidden" name="${mod.htmlName}">
            <h3>${mod.displayableName}</h3>
            <p class="description">${mod.description}</p>
            <p class="status_display">${mod.enabled ? "<span class='pink'>Installed!</span>" : "Ready for Install."}</p>
            <button class="hypermod_toggle" architecture="${mod.htmlName}">${mod.enabled ? "Deactivate HyperMod" : "Activate HyperMod"}</button>
        </div>
        `
    });

    archList.innerHTML += modsHtml;

    let noModsDisplay = document.querySelector(".no_hypermods_display");
    noModsDisplay.innerHTML = "<span class='pink'>No HyperMods unlocked.</span><br>Once a HyperMod is purchased, it will appear here.";

    return hypermods;
}

export function unlockHyperMod(name) {
    const mod = Utils.gameData.hypermods.mods.get(name);

    const modElement = document.querySelector(`.hypermod[name='${name}']`);
    modElement.classList.remove("hidden");

    const noModsDisplay = document.querySelector(".no_hypermods_display");
    noModsDisplay.classList.add("hidden");
}