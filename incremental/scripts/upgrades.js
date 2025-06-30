import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

import { GameData } from "./gamedata.js";

export class Upgrade {
    key;
    title;
    description;
    flavorText;
    cost;
    resource; // Must be a Resource object
    gameData;
    buyAction;

    constructor(key, title, description, flavorText, cost, resource, gameData, buyAction) {
        this.key = key;
        this.title = title;
        this.description = description;
        this.flavorText = flavorText;
        this.cost = cost;
        this.resource = resource;
        this.gameData = gameData;
        this.buyAction = buyAction;
        this.isBought= false;
    }

    canBuy() {
        if((this.cost <= this.resource.amt) && !this.isBought) {
            return true;
        }
        console.log(this.title + " cannot be purchased!");
        return false;
    }

    buy() {
        if (!this.canBuy()) {
            console.log(this.title + " cannot be purchased!");
            return;
        }

        this.resource.amt -= this.cost;
        this.buyAction(this.resource);
        this.isBought = true;
        console.log(this.title + " bought!");
    }

    displayUpgrade() {
    let upgradeHtml = `
            <h3>${this.title}</h3>
            <p>${this.description}</p>
            <p class="cost"> ${this.isBought ? '[COST_DEDUCTED]' : Utils.getDisplayableNumber(this.cost)} ${this.isBought ? '' : this.resource.displayableName}</p>
            <button class="upgrade_button ${this.isBought ? 'bought' : ''}">${this.isBought ? '[Updated]' : '[Update]'}</button>`;
    let upgradeWrapper = document.querySelector(`[upgrade_key="${this.key}"]`);
    upgradeWrapper.innerHTML = upgradeHtml;
}
}

export class UnlockCondition {

}

export function initUpgrades(ALL_UPGRADES_INFO = new Map(), resources, gameData) {

    let upgrades = new Map();

    const resourceNames = [...resources.keys()];

    resourceNames.forEach((resourceName) => {
        upgrades.set(resourceName, getUpgradeMap(ALL_UPGRADES_INFO.get(resourceName), resources.get(resourceName), gameData));
    });

    return upgrades;
}

function getUpgradeMap(upgradesInfo = [], resource = new Resource(), gameData = new GameData) {
    let upgradeMap = new Map();

    upgradesInfo.forEach((upgrade) => {
        upgradeMap.set(upgrade[0], new Upgrade(upgrade[0], upgrade[1], upgrade[2], upgrade[3], upgrade[4], resource, gameData, upgrade[5]))
    });

    return upgradeMap;
}

export function displayUpgrades(upgradeMap) {
    let upgradesHtml = ""; 

    let upgradeList = document.getElementsByClassName("upgrade_list")[0];

    upgradeMap.forEach((value, key) => {
        upgradesHtml += `
            <div class="upgrade" upgrade_key="${key}" resource="${value.resource.htmlName}">
                <h3>${value.title}</h3>
                <p>${value.description}</p>
                <p class="cost"> ${value.isBought ? '[COST_DEDUCTED]' : Utils.getDisplayableNumber(value.cost)} ${value.isBought ? '' : value.resource.displayableName}</p>
                <button class="upgrade_button ${value.isBought ? 'bought' : ''}">${value.isBought ? '[Updated]' : '[Update]'}</button>
            </div>`
    });

    upgradeList.innerHTML = upgradesHtml;
}