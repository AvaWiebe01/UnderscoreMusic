import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

import { GameData } from "./gamedata.js";

export class Process {
    key;
    title;
    description;
    flavorText;
    baseCost;
    baseCostMult;
    numBought;
    cost;
    coreReq;
    baseProduction;
    baseProductionMult;
    buyAmt; // How many processes the buy button will add
    resource; // Must be a Resource object
    gameData;

    // Display elements
    processElement;
    numBoughtDisplay;
    baseGenerationDisplay;
    activeGenerationDisplay;
    buyCoresDisplay;
    buyResourceDisplay;
    sellOneCoresDisplay;
    sellAllCoresDisplay;

    constructor(key, title, description, flavorText, baseCost, coreReq, baseProduction, resource, gameData) {
        this.key = key;
        this.title = title;
        this.description = description;
        this.flavorText = flavorText;
        this.baseCost = baseCost;
        this.baseCostMult = 1;
        this.numBought = 0;
        this.cost = this.calculateCost();
        this.coreReq = coreReq;
        this.baseProduction = baseProduction;
        this.baseProductionMult = 1;
        this.buyAmt = 1;
        this.resource = resource;
        this.gameData = gameData;
    }

    initDisplayElements() {
        this.processElement = document.querySelector(`main .game .process_panel .process_list .process[process_key="${this.key}"]`);
        this.numBoughtDisplay = this.processElement.querySelector("span.num_bought_display");
        this.baseGenerationDisplay = this.processElement.querySelector("span.base_generation_display");
        this.activeGenerationDisplay = this.processElement.querySelector("span.active_generation_display");
        this.buyCoresDisplay = this.processElement.querySelector("span.buy_cores_display");
        this.buyResourceDisplay = this.processElement.querySelector("span.buy_resource_display");
        this.sellOneCoresDisplay = this.processElement.querySelector("span.sell_one_cores_display");
        this.sellAllCoresDisplay = this.processElement.querySelector("span.sell_all_cores_display");
    }

    // Get the price multiplier based on current number of instances
    getCostFactor() {
        return ((1.4)**this.numBought);
    }

    calculateCost() {
        this.cost = this.baseCost * this.baseCostMult * this.getCostFactor();
        return this.cost;
    }

    canBuy(buyAmount) {
        // ONLY WORKS FOR AMOUNT=1 RIGHT NOW - UPDATE AT SOME POINT

        if(buyAmount < 1) { return false; }

        if(!(this.cost <= this.resource.amt)) {
            console.log(this.title + ` cannot be purchased: Not enough ${this.resource.displayableName}!`);
            return false;
        }

        if(!(this.gameData.resources.get("cores").amt >= this.coreReq)) {
            console.log(this.title + " cannot be purchased: Not enough cores!");
            return false;
        }

        return true;
    }

    buy(buyAmount) {
        // ONLY WORKS FOR AMOUNT=1 RIGHT NOW - UPDATE AT SOME POINT

        if (!this.canBuy(buyAmount)) { // Must have enough resources and cores
            return;
        }

        this.resource.amt -= this.cost;
        this.gameData.resources.get("cores").modifyAmt(-(this.coreReq));
        this.numBought += 1;
        this.calculateCost();
        console.log(this.title + " bought!");

        // unlock next process
        if(this.processElement.nextElementSibling) {this.processElement.nextElementSibling.classList.remove("not_unlocked");}
    }

    canSell(sellAmount) {
        if(sellAmount > this.numBought || sellAmount < 1) {
            console.log("Not enough to sell!");
            return false;
        }

        return true;
    }

    sell(sellAmount) {
        if(!this.canSell()) {
            return;
        }

        this.gameData.resources.get("cores").modifyAmt(this.coreReq * sellAmount);
        this.numBought -= sellAmount;
        this.calculateCost();
        console.log("sold " + sellAmount + " " + this.title + "s!");
    }

    modifyBaseProductionMult(multiplier) {
        this.baseProductionMult *= multiplier;
    }

    getProductionDelta() {
        return this.baseProduction * this.baseProductionMult * this.numBought;
    }

    displayActiveProduction() {
        this.activeGenerationDisplay.innerHTML = `${Utils.getDisplayableNumber(this.getProductionDelta() * this.resource.getDeltaTotalMult())} ${this.resource.displayableName}/s`; 
    }

    displayBaseGeneration() {
        this.baseGenerationDisplay.innerHTML = `${Utils.getDisplayableNumber(this.baseProduction * this.baseProductionMult * this.resource.deltaBaseMult)} ${this.resource.displayableName}/s`; 
    }

    displayAllFields() {
        this.calculateCost();
        
        this.numBoughtDisplay.innerHTML = `${Utils.getDisplayableNumber(this.numBought, false)}`; 
        this.baseGenerationDisplay.innerHTML = `${Utils.getDisplayableNumber(this.baseProduction * this.baseProductionMult * this.resource.deltaBaseMult)} ${this.resource.displayableName}/s`; 
        this.activeGenerationDisplay.innerHTML = `${Utils.getDisplayableNumber(this.getProductionDelta() * this.resource.getDeltaTotalMult())} ${this.resource.displayableName}/s`; 
        this.buyCoresDisplay.innerHTML = `-${Utils.getDisplayableNumber(this.coreReq, false)} Cores`; 
        this.buyResourceDisplay.innerHTML = `-${Utils.getDisplayableNumber(this.cost)} ${this.resource.displayableName}`; 
        this.sellOneCoresDisplay.innerHTML = `+${Utils.getDisplayableNumber((this.numBought ? this.coreReq : 0), false)} Cores`; 
        this.sellAllCoresDisplay.innerHTML = `+${Utils.getDisplayableNumber(this.coreReq * this.numBought, false)} Cores`; 
    }

    displayInvalidButton(action) {
        switch(action) {
            case "buy":
                this.buyCoresDisplay.innerHTML = `[INVALID]`;
                this.buyResourceDisplay.innerHTML = ``;
                break;
            case "sell_one":
                this.sellOneCoresDisplay.innerHTML = `[INVALID]`; 
                break;
            case "sell_all":
                this.sellAllCoresDisplay.innerHTML = `[INVALID]`; 
                break;
        }
    }

    removeInvalidButton() {
        this.buyCoresDisplay.innerHTML = `-${Utils.getDisplayableNumber(this.coreReq, false)} Cores`; 
        this.buyResourceDisplay.innerHTML = `-${Utils.getDisplayableNumber(this.cost)} ${this.resource.displayableName}`; 
        this.sellOneCoresDisplay.innerHTML = `+${Utils.getDisplayableNumber((this.numBought ? this.coreReq : 0), false)} Cores`; 
        this.sellAllCoresDisplay.innerHTML = `+${Utils.getDisplayableNumber(this.coreReq * this.numBought, false)} Cores`; 
    }

    toJSON() {
        return {
            key: this.key,
            numBought: this.numBought,
            baseProductionMult: this.baseProductionMult,
        };
    }
}

function getProcessMap(processesInfo = [], resource = new Resource(), gameData = new GameData) {
    let processMap = new Map();

    processesInfo.forEach((process) => {
        processMap.set(process[0], new Process(process[0], process[1], process[2], process[3], process[4], process[5], process[6], resource, gameData))
    });

    return processMap;
}

export function displayProcesses(processMap) {
    let processesHtml = ""; 

    let processList = document.getElementsByClassName("process_list")[0];

    var idx = 0;

    processMap.forEach((value, key) => {
        processesHtml += `
            <div class="process ${(idx < Constants.NUM_INITIAL_PROCESSES) ? "" : "not_unlocked"}" process_key="${key}" resource="${value.resource.htmlName}">
                <div class="process_info">
                    <h3>${value.title}</h3>
                    <p class="description">${value.description}</p>
                    <p><span class="pink">Active Instances:</span> <span class="num_bought_display">${Utils.getDisplayableNumber(value.numBought)}</span></p>
                    <p><span class="pink">Instance Base Generation:</span> <span class="base_generation_display">${Utils.getDisplayableNumber(value.baseProduction * value.baseProductionMult * value.resource.deltaBaseMult)} ${value.resource.displayableName}/s</span></p>
                    <p><span class="pink">Active Generation:</span> <span class="active_generation_display">${Utils.getDisplayableNumber(value.numBought * value.getProductionDelta() * value.resource.getDeltaTotalMult())} ArcBits/s</span></p>
                </div>
                <div class="process_buttons">
                    <button class="process_button" action="buy" process_key="${key}" resource="${value.resource.htmlName}">
                        <span class="button_title">New Instance</span><br>
                        <span class="buy_cores_display button_info">-${Utils.getDisplayableNumber(value.coreReq, false)} Cores</span><br>
                        <span class="buy_resource_display button_info">-${Utils.getDisplayableNumber(value.cost)} ${value.resource.displayableName}</span>
                    </button>
                    <button class="process_button" action="sell_one" process_key="${key}" resource="${value.resource.htmlName}">
                        <span class="button_title">Terminate One</span><br>
                        <span class="sell_one_cores_display button_info">+${Utils.getDisplayableNumber((value.numBought ? value.coreReq : 0), false)} Cores</span>
                    </button>
                    <button class="process_button" action="sell_all" process_key="${key}" resource="${value.resource.htmlName}">
                        <span class="button_title">Terminate All</span><br>
                        <span class="sell_all_cores_display button_info">+${Utils.getDisplayableNumber(value.coreReq * value.numBought, false)} Cores</span>
                    </button>
                </div>
            </div>`

        idx+=1;
    });

    processList.innerHTML += processesHtml;

    console.log("Process HTML initialized.");
}

export function initProcesses(ALL_PROCESSES_INFO = new Map(), resources, gameData) {
    let processes = new Map();

    const resourceNames = [...resources.keys()];
    //const resourceNames = ["arcBits"];

    resourceNames.forEach((resourceName) => {
        processes.set(resourceName, getProcessMap(ALL_PROCESSES_INFO.get(resourceName), resources.get(resourceName), gameData));
    });

    return processes;
}