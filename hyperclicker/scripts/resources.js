import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

export class Resource {
    //passed in constructor
    amt;
    deltaBaseMult;  // For one-time multiplier changes, that never need to be re-calculated
    btnVal;
    btnValBaseMult;  // For one-time multiplier changes, that never need to be re-calculated
    htmlName;
    displayableName;
    gameData;

    //reduce other classes having to calculate delta again
    lastTickDelta;

    //private
    gain;
    lastAmt;
    deltaMultSources;
    btnValMultSources;

    // Display elements
    amtDisplays;
    gainDisplays;
    deltaDisplays;
    btnValDisplays;

    constructor(amt, btnVal, htmlName, displayableName, gameData) {
        this.amt = amt;
        this.deltaBaseMult = 1;
        this.btnVal = btnVal;
        this.btnValBaseMult = 1; 
        this.htmlName = htmlName; // Must be exactly as it appears in HTML, ex. "arcbits"
        this.displayableName = displayableName;
        this.gameData = gameData;

        this.lastTickDelta = 0;

        this.gain = new Array(Constants.AVERAGING_SAMPLES).fill(0);
        this.lastAmt = amt;
        this.deltaMultSources = new Set(); // For volatile multiplier changes, that need to be re-calculated based on game state each tick
        this.btnValMultSources = new Set(); // For volatile multiplier changes, that need to be re-calculated based on game state each tick
    }

    initDisplayElements() {
        this.amtDisplays = document.getElementsByClassName(this.htmlName + "_display");
        this.gainDisplays = document.getElementsByClassName(this.htmlName + "_gain_display");
        this.deltaDisplays = document.getElementsByClassName(this.htmlName + "_delta_display");
        this.btnValDisplays = document.getElementsByClassName(this.htmlName + "_btnval_display");

        this.displayAmt();
        this.displayAverageGain();
        this.displayFinalDelta();
        this.displayFinalBtnVal();
    }

    addDeltaMultSource(sourceName) {
        this.deltaMultSources.add(this.gameData.multipliers.get(sourceName));
    }

    removeDeltaMultSource(sourceName) {
        this.deltaMultSources.delete(this.gameData.multipliers.get(sourceName));
    }

    addBtnValMultSource(sourceName) {
        this.btnValMultSources.add(this.gameData.multipliers.get(sourceName));
    }

    removeBtnValMultSource(sourceName) {
        this.btnValMultSources.delete(this.gameData.multipliers.get(sourceName));
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
        for(let i = 0; i < this.gainDisplays.length; i++) {
            this.gainDisplays[i].innerHTML = Utils.getDisplayableNumber(Math.max(0,this.getAverageGain())) + '/s';
        }
    }

    displayAmt() {
        for(let i = 0; i < this.amtDisplays.length; i++) {
            this.amtDisplays[i].innerHTML = Utils.getDisplayableNumber(this.amt);
        }
    }

    displayFinalDelta() {
        for(let i = 0; i < this.deltaDisplays.length; i++) {
            this.deltaDisplays[i].innerHTML = Utils.getDisplayableNumber(this.getFinalDelta());
        }
    }

    displayFinalBtnVal () {
        for(let i = 0; i < this.btnValDisplays.length; i++) {
            this.btnValDisplays[i].innerHTML = "+" + Utils.getDisplayableNumber(this.getFinalBtnValue());
        }
    }

    // Final multiplier for passive resource gain
    getDeltaTotalMult() {
        let totalMult = 1;
        totalMult *= this.deltaBaseMult;

        this.deltaMultSources.forEach((multSource) => {
            this.deltaMultSources = this.deltaMultSources;
            totalMult *= multSource.getMult();
        });

        return totalMult;
    }

    modifyDeltaBaseMult(mult) {
        this.deltaBaseMult *= mult;
    }

    // Final value for passive resource gain
    getFinalDelta() {
        return this.getProcessDelta() * this.getDeltaTotalMult();
    }

    getBtnValTotalMult() {
        let totalMult = 1;
        totalMult *= this.btnValBaseMult;

        this.btnValMultSources.forEach((multSource) => {
            totalMult *= multSource.getMult();
        });

        return totalMult;
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

    btnClicked() {
        this.modifyAmt(this.getFinalBtnValue());
    }

    getBaseDelta() {
        let totalDelta = 0;

        this.gameData.processes?.get(this.htmlName).forEach?.((process, key, processes) => {
            totalDelta += process.getProductionDelta();
        });

        return totalDelta;
    }

    resourceTick(deltaTime, gameData) {
        this.lastTickDelta = ((deltaTime/1000)*this.getBaseDelta()) * this.getDeltaTotalMult()
        this.modifyAmt(this.lastTickDelta);

        this.displayAmt();
        this.displayFinalBtnVal();
        this.displayFinalDelta();
    }
}

class Cores extends Resource {
    // Display elements
    maxDisplays;
    progressBars;
    usageBars;

    // Additional parameters
    delta;
    maxCores;

    constructor(amt, delta, btnVal, htmlName, displayableName, gameData, maxCores) {
        super(amt, btnVal, htmlName, displayableName, gameData);

        this.delta = delta;
        this.maxCores = maxCores;
    }

    initDisplayElements() {

        this.amtDisplays = document.getElementsByClassName(this.htmlName + "_display");
        this.gainDisplays = document.getElementsByClassName(this.htmlName + "_gain_display");
        this.deltaDisplays = document.getElementsByClassName(this.htmlName + "_delta_display");
        this.btnValDisplays = document.getElementsByClassName(this.htmlName + "_btnval_display");

        this.maxDisplays = document.getElementsByClassName("cores_max_display");
        this.progressBars = document.getElementsByClassName("cores_progress_bar");
        this.usageBars = document.getElementsByClassName("cores_usage_bar");

        this.displayAmt();
    }

    modifyMaxCores(value) {
        this.maxCores += value;
    }

    getBaseDelta() {
        return this.delta;
    }

    modifyAmt(value) { // Do not go above core limit
        this.amt = ((this.amt + value) <= this.maxCores ? this.amt + value : this.maxCores);
    }

    displayAmt() { // Round down to nearest integer
        for(let i = 0; i < this.amtDisplays.length; i++) {
            this.amtDisplays[i].innerHTML = Utils.getDisplayableNumber(Math.floor(this.amt), false);
        }
        for(let i = 0; i < this.maxDisplays.length; i++) {
            this.maxDisplays[i].innerHTML = Utils.getDisplayableNumber(Math.floor(this.maxCores), false);
        }
        for(let i = 0; i < this.progressBars.length; i++) {
            this.progressBars[i].style.width = `${(this.amt % 1) * 100}%`;
        }
        for(let i = 0; i < this.usageBars.length; i++) {
            this.usageBars[i].style.width = `${Math.min((Math.floor(this.amt) / this.maxCores) * 100, 100)}%`;
        }
    }
}

class NullPointers extends Resource {
    delta;
    successRate;

    streak;
    defaultStreakBase;
    streakBase;

    failureStreak;

    rolls;

    constructor(amt, delta, btnVal, htmlName, displayableName, gameData, successRate) {
        super(amt, btnVal, htmlName, displayableName, gameData);

        this.delta = delta;
        this.successRate = successRate;

        this.streak = 0;
        this.defaultStreakBase = 2;
        this.streakBase = this.defaultStreakBase;

        this.failureStreak = 0;

        this.rolls = 1;
    }

    initDisplayElements() {

        this.amtDisplays = document.getElementsByClassName(this.htmlName + "_display");
        this.gainDisplays = document.getElementsByClassName(this.htmlName + "_gain_display");
        this.deltaDisplays = document.getElementsByClassName(this.htmlName + "_delta_display");
        this.btnValDisplays = document.getElementsByClassName(this.htmlName + "_btnval_display");

        this.displayAmt();
    }

    getBaseDelta() {
        return this.delta;
    }

    getFinalBtnValue() {
        return this.btnVal * this.getBtnValTotalMult() * (this.streakBase**(this.streak));
    }

    modifySuccessRate(value) {
        this.successRate = value;
    }

    modifyDelta(value) {
        this.delta *= value;
    }

    btnClicked() {
        var success = false;

        for (let idx = 1; idx <= this.rolls; idx+=1) {
            const roll = Math.random();
            console.log(`Roll ${idx} of ${this.rolls}: ${roll}; Success if <${this.successRate}`);

            if (roll < this.successRate) {
                success = true;
            }
        }

        console.log(`${(success) ? "Located NullPointers" : "Failure"}`);

        if(success || (this.failureStreak >= 100)) { // guaranteed success after 100 clicks
            Utils.gameData.audio.playSfxLocateSuccess(this.streak);

            console.log(`${(this.failureStreak >= 100) ? "Reason: Failure Streak >= 100" : "Reason: Roll Success"}`);

            this.modifyAmt(this.getFinalBtnValue());
            this.streak += 1;
            this.failureStreak = 0;
        }
        else{
            Utils.gameData.audio.playSfxLocateFailure();

            this.streak = 0;
            this.failureStreak += 1;
        }
    }

    // need to display success rate
    displayFinalBtnVal () {
        for(let i = 0; i < this.btnValDisplays.length; i++) {
            this.btnValDisplays[i].innerHTML = `${(this.successRate * 100).toFixed(2)}% <span class="white">chance for</span> +${Utils.getDisplayableNumber(this.getFinalBtnValue())}`;
        }
    }
}

export function unlockResource(htmlName) {
    document.getElementById(`${htmlName}_display_main`).classList.remove("not_unlocked");
    document.getElementById(`${htmlName}_btn_main`).classList.remove("not_unlocked");
}

export function initResources(RESOURCE_INFO = [], gameData) {
    let resources = new Map();

    RESOURCE_INFO.forEach((info) => {
        resources.set(info[0], new Resource(info[1], info[2], info[0], info[3], gameData));
    });

    resources.set(Constants.CORE_INFO[0], new Cores(Constants.CORE_INFO[1], Constants.CORE_INFO[2], Constants.CORE_INFO[3], Constants.CORE_INFO[0], Constants.CORE_INFO[4], gameData, Constants.CORE_INFO[5]));
    resources.get("cores").initDisplayElements();

    resources.set(Constants.NULLPOINTER_INFO[0], new NullPointers(Constants.NULLPOINTER_INFO[1], Constants.NULLPOINTER_INFO[2], Constants.NULLPOINTER_INFO[3], Constants.NULLPOINTER_INFO[0], Constants.NULLPOINTER_INFO[4], gameData, Constants.NULLPOINTER_INFO[5]));
    resources.get("nullpointers").initDisplayElements();

    return resources;
}