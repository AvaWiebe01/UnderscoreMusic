import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

import { GameData } from "./gamedata.js";

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
}

export class HyperMultArch extends HyperMod {
    enable() {
        Utils.gameData.resources.get("arcbits").addDeltaMultSource("hyperMult");
        Utils.gameData.resources.get("arcbits").addBtnValMultSource("hyperMult");
    }

    disable() {
        Utils.gameData.resources.get("arcbits").removeDeltaMultSource("hyperMult");
        Utils.gameData.resources.get("arcbits").removeBtnValMultSource("hyperMult");
    }
}

export class HyperCoreArch extends HyperMod {
    enable() {
        Utils.gameData.resources.get("cores");
    }

    disable() {
        Utils.gameData.resources.get("cores");
    }
}

export function initHyperMods(gameData = new GameData()) {
    var hypermods = new Map([
        ["hyperMultArch", new HyperMultArch("hyperMultArch", "HyperMult", "<strong>Constructing</strong> HyperKeys provides a lengthy temporary multiplier to <strong>decryption</strong> and <strong>process</strong> ArcBit generation.")],
        ["hyperCoreArch", new HyperCoreArch("hyperCoreArch", "HyperCore", "<strong>Core</strong> generation rate is multiplied by your <strong>HyperKey</strong> amount.")],
    ])

    //populate the tab with hidden hypermods to be unlocked
    let archList = document.querySelector(".architecture_list");
    let modsHtml = "";

    hypermods.forEach((mod, tag) => {
        modsHtml += `
        <div class="hypermod">
            <h3>${mod.displayableName}</h3>
            <p class="description">${mod.description}</p>
            <p class="status_display">${mod.enabled ? "<span class='pink'>Installed!</span>" : "Ready for Install."}</p>
            <button class="hypermod_toggle" architecture="${mod.htmlName}">Activate HyperMod</button>
        </div>
        `
    });

    archList.innerHTML += modsHtml;

    let noModsDisplay = document.querySelector(".no_hypermods_display");
    noModsDisplay.innerHTML = "<span class='pink'>No HyperMods unlocked.</span><br>Once a HyperMod is purchased, it will appear here.";

    return hypermods;
}

export function unlockHyperMod(name) {
    mod = Utils.gameData.hypermods.get(name);

    let modElement = document.querySelector(`.hypermod[name='${name}']`);
    modElement.classList.remove("hidden");

    let noModsDisplay = document.querySelector(".no_hypermods_display");
    noModsDisplay.classList.add("hidden");
}