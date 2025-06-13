import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

export class Resource {
    //passed in constructor
    amt;
    delta;
    deltaBaseMult;  // For one-time multiplier changes, that never need to be re-calculated
    btnVal;
    btnValBaseMult;  // For one-time multiplier changes, that never need to be re-calculated
    htmlName;
    displayableName;

    //private
    gain;
    lastAmt;
    deltaMultSources;
    btnValmultSources;

    constructor(amt, delta, btnVal, htmlName, displayableName) {
        this.amt = amt;
        this.delta = delta;
        this.deltaBaseMult = 1;
        this.btnVal = btnVal;
        this.btnValBaseMult = 1; 
        this.htmlName = htmlName; // Must be exactly as it appears in HTML, ex. "arcbits"
        this.displayableName = displayableName;

        this.gain = new Array(Constants.AVERAGING_SAMPLES).fill(0);
        this.lastAmt = amt;
        this.deltaMultSources = new Set(); // For volatile multiplier changes, that need to be re-calculated based on game state each tick
        this.btnValMultSources = new Set(); // For volatile multiplier changes, that need to be re-calculated based on game state each tick

        // Initialize Displays
        this.displayAmt();
        this.displayAverageGain();
        this.displayFinalDelta();
        this.displayFinalBtnVal();
    }

    addDeltaMultSource(sourceName) {
        deltaMultSources.add(sourceName);
    }

    addBtnValMultSource(sourceName) {
        btnValMultSources.add(sourceName);
    }

    calculateGain() {
        for(let i = this.gain.length - 1; i > 0; i--) {this.gain[i] = this.gain[i-1];}
        this.gain[0] = this.amt - this.lastAmt;
        this.lastAmt = this.amt;
    }

    getAverageGain() {
        return this.gain.reduce((sum, curr) => sum + curr, 0);
    }

    displayAverageGain() {
        const gainDisplays = document.getElementsByClassName(this.htmlName + "_gain_display");
        for(let i = 0; i < gainDisplays.length; i++) {
            gainDisplays[i].innerHTML = Utils.getDisplayableNumber(this.getAverageGain()) + '/s';
        }
    }

    displayAmt() {
        const amtDisplays = document.getElementsByClassName(this.htmlName + "_display");
        for(let i = 0; i < amtDisplays.length; i++) {
            amtDisplays[i].innerHTML = Utils.getDisplayableNumber(this.amt);
        }
    }

    displayFinalDelta() {
        const deltaDisplays = document.getElementsByClassName(this.htmlName + "_delta_display");
        for(let i = 0; i < deltaDisplays.length; i++) {
            deltaDisplays[i].innerHTML = Utils.getDisplayableNumber(this.getFinalDelta());
        }
    }

    displayFinalBtnVal () {
        const btnValDisplays = document.getElementsByClassName(this.htmlName + "_btnval_display");
        for(let i = 0; i < btnValDisplays.length; i++) {
            btnValDisplays[i].innerHTML = "+" + Utils.getDisplayableNumber(this.getFinalBtnValue());
        }
    }

    getDeltaTotalMult() {
        let totalMult = 1;
        totalMult *= this.deltaBaseMult;

        deltaMultSources.forEach(() => {
            
        });

        return totalMult;
    }

    modifyDeltaBaseMult(mult) {
        this.deltaBaseMult *= mult;
    }

    getFinalDelta() {
        return this.delta * this.getDeltaTotalMult();
    }

    getBtnValTotalMult() {
        return this.btnValBaseMult;
    }

    modifyBtnValBaseMult(mult) {
        this.btnValBaseMult *= mult;
        this.displayFinalBtnVal();
    }

    getFinalBtnValue() {
        return this.btnVal * this.getBtnValTotalMult();
    }

    modifyBtnValue(value) {
        this.btnVal += value;
        this.displayFinalBtnVal();
    }

    modifyAmt(value) {
        this.amt += value;
    }

    modifyDelta(value) {
        this.delta += value;
    }

    btnClicked() {
        this.modifyAmt(this.getFinalBtnValue());
    }

    resourceTick(deltaTime, gameData) {

        this.modifyAmt(((deltaTime/1000)*this.delta) * this.getDeltaTotalMult(gameData));
        this.displayAmt();
    }
}

export function initResources(RESOURCE_INFO = []) {
    let resources = new Map();

    RESOURCE_INFO.forEach((info) => {
        resources.set(info[0], new Resource(info[1], info[2], info[3], info[0], info[4]));
    });

    return resources;
}