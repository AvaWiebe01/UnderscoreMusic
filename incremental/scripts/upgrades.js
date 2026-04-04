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
    unlockUpgrades;
    gameData;
    buyAction;

    // Display elements
    upgradeElement;
    costDisplay;

    constructor(key, title, description, flavorText, cost, unlockUpgrades, upgradeTypeTag, resource, gameData, buyAction) {
        this.key = key;
        this.title = title;
        this.description = description;
        this.flavorText = flavorText;
        this.cost = cost;
        this.upgradeTypeTag = upgradeTypeTag;
        this.resource = resource;
        this.unlockUpgrades = unlockUpgrades;
        this.gameData = gameData;
        this.buyAction = buyAction;

        this.isBought = false;

        // unlock if this is an initial upgrade
        this.isUnlocked = (Constants.INITIAL_UPGRADES?.get(upgradeTypeTag)?.get(resource.htmlName) ?? []).includes(this.key);
    }

    initDisplayElements() {
        this.upgradeElement = document.querySelector(`main .game .upgrade[upgrade_key="${this.key}"]`);
        this.costDisplay = this.upgradeElement.querySelector(`p.cost`);
    }

    unlock() {
        this.isUnlocked = true;
        this.upgradeElement.classList.remove("not_unlocked");
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

    displayAllFields() {
        this.costDisplay.innerHTML = `${this.isBought ? '[COST_DEDUCTED]' : Utils.getDisplayableNumber(this.cost)} ${this.isBought ? '' : this.resource.displayableName}`;
    }
}

export function initUpgrades(ALL_UPGRADES_INFO = new Map(), resources, gameData) {

    let upgrades = new Map();

    const resourceNames = [...resources.keys()];

    ALL_UPGRADES_INFO.forEach((upgradeType, listTag) => {
        upgrades.set(listTag, new Map());

        resourceNames.forEach((resourceName) => {
            upgrades.get(listTag).set(resourceName, getUpgradeMap(upgradeType.get(resourceName), listTag, resources.get(resourceName), gameData));
        });
    });

    return upgrades;
}

function getUpgradeMap(upgradesInfo = [], upgradeTypeTag = "", resource = new Resource(), gameData = new GameData) {
    let upgradeMap = new Map();

    upgradesInfo.sort((a, b) => a[4] - b[4]); // Sort in ascending order by upgrade cost

    upgradesInfo.forEach((upgrade) => {
        upgradeMap.set(upgrade[0], new Upgrade(upgrade[0], upgrade[1], upgrade[2], upgrade[3], upgrade[4], upgrade[5], upgradeTypeTag, resource, gameData, upgrade[6]))
    });

    return upgradeMap;
}

export function displayUpgrades(upgradeMap, upgradeTypeTag) {
    let upgradesHtml = ""; 

    let upgradeList = document.getElementsByClassName(`${upgradeTypeTag}`)[0];

    upgradeMap.forEach((value, key) => {
        upgradesHtml += `
            <div class="upgrade ${value.isUnlocked ? '' : 'not_unlocked'}" upgrade_key="${key}" resource="${value.resource.htmlName}">
                <div class="upgrade_info_wrapper">
                    <h3>${value.title}</h3>
                    <p class="description">${value.description}</p>
                </div>
                <div class="upgrade_button_wrapper">
                    <p class="cost"> ${value.isBought ? '[COST_DEDUCTED]' : Utils.getDisplayableNumber(value.cost)} ${value.isBought ? '' : value.resource.displayableName}</p>
                    <button class="upgrade_button ${value.isBought ? 'bought' : ''}">${Constants.UPGRADE_BUTTON_CONTENT.get(upgradeTypeTag).get("default")}</button>
                </div>
            </div>`
    });

    upgradeList.innerHTML += upgradesHtml;

    Utils.resizeUpgradeList();

    console.log("Upgrade HTML initialized.");
}