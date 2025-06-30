import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

import { GameData } from "./gamedata.js";

// Dynamic multiplier - must be re-calculated each frame
export class Multiplier {
    name;
    mult;
    gameData;

    constructor(name, gameData = new GameData) {
        this.name = name;
        this.mult = 1;
        this.gameData = gameData;

        // Subclasses must add all necessary events here
    }

    getMult() {
        return this.mult;
    }

    // Called each frame
    multUpdate() {
        throw new Error("getMult must be implemented by subclass.");
    }
}

class MultArcMult extends Multiplier {
    decayFactor;
    increaseFactor;

    constructor(name, gameData = new GameData) {
        super(name, gameData);
        this.decayFactor = 1;
        this.increaseFactor = 1;

        $(".resource_button").click((event) => {
            this.mult += this.increaseFactor * 0.2;
        })
    }

    getMult() {
        return this.mult;
    }

    multUpdate() {
        this.decay();
    }

    decay() {
        this.mult -= this.decayFactor * 0.1 * (2**(3*(this.mult-2)) - 0.125); // decay approaches 0 as mult approaches 1
    }
}

export function initMultipliers(gameData = new GameData) {
    let multipliers = new Map([
        ["arcMult", new MultArcMult("arcMult", gameData)],
    ]);

    return multipliers;
}