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
}

export class HyperMultArch extends HyperMod {
    enable() {
        Utils.gameData.resources.get("arcbits").addDeltaMultSource("hyperMult");
        Utils.gameData.resources.get("arcbits").addBtnValMultSource("hyperMult");
        this.enabled = true;
    }

    disable() {
        Utils.gameData.resources.get("arcbits").removeDeltaMultSource("hyperMult");
        Utils.gameData.resources.get("arcbits").removeBtnValMultSource("hyperMult");
        this.enabled = false;
    }
}

export class HyperCoreArch extends HyperMod {
    enable() {
        Utils.gameData.resources.get("cores").addDeltaMultSource("hyperCore");
        this.enabled = true;
    }

    disable() {
        Utils.gameData.resources.get("cores").removeDeltaMultSource("hyperCore");
        this.enabled = false;
    }
}

export function initHyperMods(gameData = new GameData()) {
    var mods = new Map([
        ["hyperMultArch", new HyperMultArch("hyperMultArch", "HyperMult", "<strong>Constructing</strong> HyperKeys provides a lengthy temporary multiplier to <strong>decryption</strong> and <strong>process</strong> ArcBit generation.")],
        ["hyperCoreArch", new HyperCoreArch("hyperCoreArch", "HyperCore", "<strong>Core</strong> generation rate is multiplied by your <strong>HyperKey</strong> amount.")],
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