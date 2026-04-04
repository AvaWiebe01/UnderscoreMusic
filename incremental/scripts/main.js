import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

import { GameData } from "./gamedata.js";

import { initEventHandlers } from "./events.js";

import { Process, initProcesses, displayProcesses } from "./processes.js";

import { Resource, initResources } from "./resources.js";

import { Upgrade, initUpgrades, displayUpgrades } from "./upgrades.js";

import { Multiplier, initMultipliers } from "./multipliers.js";

import { Archive, initArchive } from "./archive.js";

// ======== START ======== //
window.onload = function() {

    // Initialize
    let gameData = new GameData();

    // Initialize data structures from Constants
    const resources = initResources(Constants.RESOURCE_INFO, gameData);
    const upgrades = initUpgrades(Constants.ALL_UPGRADES_INFO, resources, gameData);
    const multipliers = initMultipliers(gameData);
    const processes = initProcesses(Constants.ALL_PROCESSES_INFO, resources, gameData);
    const archive = initArchive();

    // Initialize gameData variables
    gameData.addResources(resources);
    gameData.addUpgrades(upgrades);
    gameData.addMultipliers(multipliers);
    gameData.addProcesses(processes);
    gameData.addArchive(archive);
    initEventHandlers(gameData);

    // Initialize HTML and DOM content/references
    gameData.resources.forEach((resource, key) => {
        resource.initDisplayElements();
    });

    gameData.upgrades.forEach((upgradeType, upgradeTypeTag) => {
        upgradeType.forEach((upgradeMap, resourceName) => {
            displayUpgrades(upgradeMap, upgradeTypeTag);
        });
    });

    gameData.upgrades.forEach((upgradeType, upgradeTypeTag) => {
        upgradeType.forEach((upgradeMap, resourceName) => {
            upgradeMap.forEach((upgrade, key) => {
                upgrade.initDisplayElements();
            });
        });
    });

    gameData.processes.forEach((processMap, resourceName) => {
        displayProcesses(processMap);
    });

    gameData.processes.forEach((processMap, resourceName) => {
        processMap.forEach((process, key) => {
            process.initDisplayElements();
        });
    });

    // Update all displays with initial content (non-destructive)
    Utils.addGameData(gameData);
    Utils.refreshAllDisplays();

    // Start the game loop
    requestAnimationFrame((currentTime) => gameTick(currentTime, gameData));
}

// ======== MAIN GAME LOOP ======== //
function gameTick(currentTime, gameData = new GameData()) {

    // Performance metric
    // let startTime, endTime; startTime = window.performance.now() * 1000; 

    let deltaTime = currentTime - gameData.lastTime;

    if (deltaTime >= 1000/Constants.REFRESH_RATE) {

        // Perform all actions that must occur every tick
        gameData.multipliers.forEach((multiplier, key) => {
            multiplier.multUpdate();
        });

        gameData.resources.forEach((resource, key) => {
            resource.resourceTick(deltaTime, gameData);
        });

        gameData.processes.forEach((processMap, key) => {
            processMap.forEach((process, key) => {
                process.displayActiveProduction();
            });
        });

        Utils.visualFxTick();
        
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

    // Performance metric
    // endTime = window.performance.now() * 1000; console.log(`Unit: Microseconds >>> Start: ${startTime} > End: ${endTime} > GENERATION TIME: ${endTime - startTime} > ALLOTTED TIME/FRAME: ${1000000/Constants.REFRESH_RATE} > % OF TIME USED: ${((endTime - startTime) / (1000000/Constants.REFRESH_RATE)) * 100}`);

    requestAnimationFrame((currentTime) => gameTick(currentTime, gameData));
}