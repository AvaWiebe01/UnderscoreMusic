import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

import { GameData } from "./gamedata.js";

// Dynamic multiplier - must be re-calculated each frame
export class Multiplier {
    name;
    displayableName;
    mult;
    gameData;

    displayElement;

    constructor(name, displayableName, gameData = new GameData) {
        this.name = name;
        this.displayableName = displayableName;
        this.mult = 1;
        this.gameData = gameData;

        this.displayElements = null;

        // Subclasses must add all necessary events here
    }

    getMult() {
        return this.mult;
    }

    // Called each frame
    multUpdate() {
        throw new Error("getMult and multUpdate must be implemented by subclass.");
    }

    unlock() {
        this.showDisplays();
        
        this.mult = 1; // override if needed
    }

    hideDisplays() {
        for (let elem of this.displayElements ?? []) {
            elem.classList.add("not_unlocked");
        } 
    }

    showDisplays() {
        for (let elem of this.displayElements ?? []) {
            elem.classList.remove("not_unlocked");
        }
    }

    updateDisplays() {
        for (let elem of this.displayElements ?? []) {
            elem.innerHTML = `[${this.displayableName}: ${this.mult.toFixed(1)}x]`
        }
    }

    initDisplayElements() {
        console.log("Implement display elements in subclass if required.");
    }

    toJSON() {
        throw new Error("toJSON must be implemented by subclass.");
    }

    fromJSON() {
        throw new Error("fromJSON and multUpdate must be implemented by subclass.");
    }
}

// multiplier based on clicking arcbit generation
class MultArcMult extends Multiplier {
    decayFactor;

    increaseFactor;

    _multHandler;

    constructor(name, displayableName, gameData = new GameData) {
        super(name, displayableName, gameData);
        this.decayFactor = 1;
        this.increaseFactor = 1;

        this._multHandler = (event) => this.multIncrease(); 

        $(".resource_button[resource='arcbits']").on("click", this._multHandler);
    }

    // any resource button contributes
    activateUniversalMult() {
        $(".resource_button[resource='hyperkeys']").on("click", this._multHandler);
        $(".resource_button[resource='nullpointers']").on("click", this._multHandler);
    }

    deactivateUniversalMult() {
        $(".resource_button[resource='hyperkeys']").off("click", this._multHandler);
        $(".resource_button[resource='nullpointers']").off("click", this._multHandler);
    }

    multIncrease() {
        this.mult += 0.1 * (1/(this.mult**3)) * this.increaseFactor;
    }

    getMult() {
        return this.mult;
    }

    multUpdate() {
        this.decay();
    }

    decay() {
        // decay approaches 0 as mult approaches 1, capped at 1 mult of decay per tick
        // this.mult -= this.decayFactor * (1 / (1 + Math.exp(-(this.mult - 3)))) * (this.mult - 1);

        // slow linear decay
        this.mult -= this.decayFactor * 0.01 / Utils.gameData.deltaTime;

        if(this.mult < 1) {
            this.mult = 1;
        }
    }

    initDisplayElements() {
        this.displayElements = document.getElementsByClassName("arcmult_display");
    }

    toJSON() {
        return {
            mult: this.mult,
        };
    }

    fromJSON(obj) {
        this.mult = obj.mult;
    }
}

// multiplier based on total cores ever generated
class MultUltraboost extends Multiplier {
    totalCoresGenerated;
    perCoreMult;

    constructor(name, displayableName, gameData = new GameData) {
        super(name, displayableName, gameData);

        this.perCoreMult = 0.001;
        this.totalCoresGenerated = 0;
    }

    getMult() {
        this.mult = 1 + (Math.floor(this.totalCoresGenerated) * this.perCoreMult);
        return this.mult;
    }

    unlock() {
        this.showDisplays();
        
        this.totalCoresGenerated = 0; // override if needed
    }

    multUpdate() {
        this.totalCoresGenerated += this.gameData.resources.get("cores").lastTickDelta;
    }

    initDisplayElements() {
        this.displayElements = document.getElementsByClassName("ultraboost_display");
    }

    toJSON() {
        return {
            totalCoresGenerated: this.totalCoresGenerated,
        };
    }

    fromJSON(obj) {
        this.totalCoresGenerated = obj.totalCoresGenerated;
    }
}

// multiplier based on unused cores
class MultProximityComputing extends Multiplier {
    perCoreMult;

    constructor(name, displayableName, gameData = new GameData) {
        super(name, displayableName, gameData);

        this.perCoreMult = 0.01;
    }

    getMult() {
        return this.mult;
    }

    multUpdate() {
        this.mult = (Math.floor(this.gameData.resources.get("cores").amt) * this.perCoreMult) + 1;
    }

    initDisplayElements() {
        this.displayElements = document.getElementsByClassName("proximity_computing_display");
    }

    toJSON() {
        return {
            
        };
    }

    fromJSON(obj) {

    }
}

// multiplier based on clicking hyperkey generation fast
class MultHyperMult extends Multiplier {
    decayFactor;
    increaseFactor;

    constructor(name, displayableName, gameData = new GameData) {
        super(name, displayableName, gameData);
        this.decayFactor = 1;
        this.increaseFactor = 1;

        // less mult is granted the higher the current mult, to balance the longer decay
        $(".resource_button[resource='hyperkeys']").click((event) => {
            this.mult += this.increaseFactor / this.mult;
        })
    }

    getMult() {
        return this.mult;
    }

    multUpdate() {
        this.decay();
    }

    // this multiplier lasts much longer than arcMult
    decay() {
        this.mult -= this.decayFactor * (0.4 / (1 + Math.exp(-(this.mult - 9)))) * (this.mult - 1); // decay approaches 0 as mult approaches 1, capped at 1 mult of decay per tick
        if(this.mult < 1) {
            this.mult = 1;
        }
    }
    
    toJSON() {
        return {
            mult: this.mult,
        };
    }

    fromJSON(obj) {
        this.mult = obj.mult;
    }
}

// multiplier based on current HyperKey amount
class MultHyperCore extends Multiplier {
    getMult() {
        return this.mult;
    }

    multUpdate() {
        this.mult = Utils.gameData.resources.get("hyperkeys").amt;
    }

    initDisplayElements() {
        this.displayElements = document.getElementsByClassName("hypercore_display");
    }

    toJSON() {
        return {

        };
    }

    fromJSON(obj) {

    }
}

// multiplier based on current libkCrawler instances
class MultNetworkGeneration extends Multiplier {
    multPerInstance = 0.05;
        
    getMult() {
        return this.mult;
    }

    multUpdate() {
        this.mult = (Utils.gameData.processes.get("arcbits").get("linkCrawler").numBought * this.multPerInstance) + 1;
    }

    initDisplayElements() {
        this.displayElements = document.getElementsByClassName("network_generation_display");
    }

    toJSON() {
        return {

        };
    }

    fromJSON(obj) {

    }
}

// multiplier based on lowest instance process amount
class MultMultiProcess extends Multiplier {

    getMult() {
        return this.mult;
    }

    multUpdate() {
        var lowest = 999_999_999_999_999_999_999;
        var allZero = true;

        Utils.gameData.processes.get("arcbits").forEach((process, key) => {
            if((process.numBought < lowest) && (process.numBought != 0)) {
                lowest = process.numBought;
                allZero = false;
            }
        });

        this.mult = (allZero) ? 1 : lowest;
    }

    initDisplayElements() {
        this.displayElements = document.getElementsByClassName("multi_process_display");
    }

    toJSON() {
        return {

        };
    }

    fromJSON(obj) {
        
    }
}

// multiplier for Bonus Item
class MultBonusItem extends Multiplier {
    getMult() {
        return this.mult;
    }

    multUpdate() {
        this.mult = Utils.gameData.bonusItem?.currentEffect?.strength ?? 1;
    }

    toJSON() {
        return {

        };
    }

    fromJSON() {
        
    }
}


export function initMultipliers(gameData = new GameData) {
    let multipliers = new Map([

        // arcbit mults
        ["arcMult", new MultArcMult("arcMult", "ArcMult", gameData)],
        ["ultraboost", new MultUltraboost("ultraboost", "Ultraboost", gameData)],
        ["proximityComputing", new MultProximityComputing("proximityComputing", "Proximity Computing", gameData)],

        // hypermod mults
        ["hyperMult", new MultHyperMult("hyperMult", "HyperMult", gameData)],
        ["hyperCore", new MultHyperCore("hyperCore", "HyperCore", gameData)],
        ["multiProcess", new MultMultiProcess("multiProcess", "Multi-Process", gameData)],
        ["networkGeneration", new MultNetworkGeneration("networkGeneration", "Network Generation", gameData)],

        // bonus mult
        ["bonusItem", new MultBonusItem("bonusItem", gameData)],
    ]);

    return multipliers;
}