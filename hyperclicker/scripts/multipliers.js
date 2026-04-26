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
        throw new Error("getMult and multUpdate must be implemented by subclass.");
    }
}

// multiplier based on clicking arcbit generation fast
class MultArcMult extends Multiplier {
    decayFactor;
    increaseFactor;

    constructor(name, gameData = new GameData) {
        super(name, gameData);
        this.decayFactor = 1;
        this.increaseFactor = 1;

        $(".resource_button[resource='arcbits']").click((event) => {
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

// multiplier based on total cores ever generated
class MultUltraboost extends Multiplier {
    totalCoresGenerated;
    perCoreMult;

    constructor(name, gameData = new GameData) {
        super(name, gameData);

        this.perCoreMult = 0.01;
        this.totalCoresGenerated = 0;
    }

    getMult() {
        this.mult = 1 + (Math.floor(this.totalCoresGenerated) * this.perCoreMult);
        return this.mult;
    }

    multUpdate() {
        this.totalCoresGenerated += this.gameData.resources.get("cores").lastTickDelta;
    }
}

// multiplier based on unused cores
class MultProximityComputing extends Multiplier {
    perCoreMult;

    constructor(name, gameData = new GameData) {
        super(name, gameData);

        this.perCoreMult = 1.05;
    }

    getMult() {
        return this.mult;
    }

    multUpdate() {
        this.mult = Math.floor(this.gameData.resources.get("cores").amt) * this.perCoreMult;
    }
}

// multiplier based on clicking hyperkey generation fast
class MultHyperMult extends Multiplier {
    decayFactor;
    increaseFactor;

    constructor(name, gameData = new GameData) {
        super(name, gameData);
        this.decayFactor = 1;
        this.increaseFactor = 1;

        // less mult is granted the higher the current mult, to balance the longer decay
        $(".resource_button[resource='hyperkeys']").click((event) => {
            this.mult += this.increaseFactor * 0.4 / this.mult;
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
        this.mult -= this.decayFactor * 0.007 * (2**(3*(this.mult-2)) - 0.125); // decay approaches 0 as mult approaches 1
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
}



export function initMultipliers(gameData = new GameData) {
    let multipliers = new Map([

        // arcbit mults
        ["arcMult", new MultArcMult("arcMult", gameData)],
        ["ultraboost", new MultUltraboost("ultraboost", gameData)],
        ["proximityComputing", new MultProximityComputing("proximityComputing", gameData)],

        // hypermod mults
        ["hyperMult", new MultHyperMult("hyperMult", gameData)],
        ["hyperCore", new MultHyperCore("hyperCore", gameData)],
    ]);

    return multipliers;
}