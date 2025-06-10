import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

import { initEventHandlers } from "./events.js";

import {  } from "./processes.js";

import { Resource, initResources } from "./resources.js";

import { Upgrade, UnlockCondition, initUpgrades, displayUpgrades } from "./upgrades.js";


export class GameData {
    resources;
    upgrades;

    lastTime;
    extraTimer;

    constructor(resources, upgrades) {
        this.resources = resources;
        this.upgrades = upgrades;

        this.lastTime = performance.now(); // To calculate deltaTime
        this.extraTimer = 0;
    }
}

// ======== START ======== //
window.onload = function() {

    // Initialize
    //const CONSTS = new Constants();
    //const utils = new Utils();
    const resources = initResources(Constants.RESOURCE_INFO);
    const upgrades = initUpgrades(Constants.ALL_UPGRADES_INFO, resources);

    let gameData = new GameData(resources, upgrades);
    initEventHandlers(gameData);

    //arcBits = new ArcBits(0, 0, 0.00000001, "arcbits", "ArcBits");

    // Make sure all displays are active at the start
    gameData.resources.forEach((resource, key) => {
        resource.displayAmt();
        resource.displayAverageGain();
        resource.displayFinalBtnVal();
    });

    gameData.upgrades.forEach((upgradeMap, key) => {
        displayUpgrades(upgradeMap);
    });

    // Start the game loop
    requestAnimationFrame((currentTime) => gameTick(currentTime, gameData));
}

// ======== MAIN GAME LOOP ======== //
function gameTick(currentTime, gameData = new GameData()) {
    let deltaTime = currentTime - gameData.lastTime;

    if (deltaTime >= 1000/Constants.REFRESH_RATE) {
        
        // Perform all actions that must occur every tick
        gameData.resources.forEach((resource, key) => {
            resource.resourceTick(deltaTime, gameData);
        });
        
        gameData.extraTimer += deltaTime;
        gameData.lastTime = currentTime;
    }

    
    if (gameData.extraTimer >= Constants.AVERAGING_TIME/Constants.AVERAGING_SAMPLES) {

        gameData.resources.forEach((resource, key) => {
            resource.calculateGain();
            resource.displayAverageGain();
        });

        gameData.extraTimer -= Constants.AVERAGING_TIME/Constants.AVERAGING_SAMPLES; // Reset the counter but keep leftover time
    }


    requestAnimationFrame((currentTime) => gameTick(currentTime, gameData));
}