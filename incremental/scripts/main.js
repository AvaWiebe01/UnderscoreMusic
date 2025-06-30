import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

import { GameData } from "./gamedata.js";

import { initEventHandlers } from "./events.js";

import {  } from "./processes.js";

import { Resource, initResources } from "./resources.js";

import { Upgrade, UnlockCondition, initUpgrades, displayUpgrades } from "./upgrades.js";

import { Multiplier, initMultipliers } from "./multipliers.js";

// ======== START ======== //
window.onload = function() {

    // Initialize
    let gameData = new GameData();

    const resources = initResources(Constants.RESOURCE_INFO, gameData);
    const upgrades = initUpgrades(Constants.ALL_UPGRADES_INFO, resources, gameData);
    const multipliers = initMultipliers(gameData);

    gameData.addResources(resources);
    gameData.addUpgrades(upgrades);
    gameData.addMultipliers(multipliers);
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
        gameData.multipliers.forEach((multiplier, key) => {
            multiplier.multUpdate();
        });

        gameData.resources.forEach((resource, key) => {
            resource.resourceTick(deltaTime, gameData);
        });
        
        gameData.extraTimer += deltaTime;
        gameData.lastTime = currentTime;
    }

    
    if (gameData.extraTimer >= Constants.AVERAGING_TIME/Constants.AVERAGING_SAMPLES) {

        // Perform all actions that must occur every 1 second
        gameData.resources.forEach((resource, key) => {
            resource.calculateGain();
            resource.displayAverageGain();
        });

        gameData.extraTimer -= Constants.AVERAGING_TIME/Constants.AVERAGING_SAMPLES; // Reset the counter but keep leftover time
    }


    requestAnimationFrame((currentTime) => gameTick(currentTime, gameData));
}