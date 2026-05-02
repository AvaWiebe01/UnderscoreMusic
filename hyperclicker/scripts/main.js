import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

import { GameData } from "./gamedata.js";

import { initEventHandlers } from "./events.js";

import { Process, initProcesses, displayProcesses } from "./processes.js";

import { Resource, initResources } from "./resources.js";

import { Upgrade, initUpgrades, displayUpgrades } from "./upgrades.js";

import { Multiplier, initMultipliers } from "./multipliers.js";

import { HyperMod, initHyperMods } from "./hypermods.js";

import { Archive, initArchive } from "./archive.js";

import { saveGame, loadGame } from "./save.js";

import { initAudio, GameAudio } from "./audio.js";

import { BonusItem } from "./bonusitem.js";

// ======== START ======== //
window.onload = function() {

    // Initialize
    let gameData = new GameData();

    // Initialize data structures from Constants
    const resources = initResources(Constants.RESOURCE_INFO, gameData);
    const upgrades = initUpgrades(Constants.ALL_UPGRADES_INFO, resources, gameData);
    const multipliers = initMultipliers(gameData);
    const processes = initProcesses(Constants.ALL_PROCESSES_INFO, resources, gameData);
    const hypermods = initHyperMods(gameData);
    const archive = initArchive();
    const audio = initAudio();
    const bonusItem = new BonusItem();

    // Initialize gameData variables
    gameData.addResources(resources);
    gameData.addUpgrades(upgrades);
    gameData.addMultipliers(multipliers);
    gameData.addProcesses(processes);
    gameData.addHyperMods(hypermods);
    gameData.addArchive(archive);
    gameData.addAudio(audio);
    gameData.addBonusItem(bonusItem);
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

    gameData.multipliers.forEach((multiplier, key) => {
        multiplier.initDisplayElements();
    });

    gameData.hypermods.initDisplayElements();

    gameData.bonusItem.initDisplayElements();

    // Update all displays with initial content (non-destructive)
    Utils.addGameData(gameData);
    Utils.refreshAllDisplays();

    // if the player has a save file in localStorage, load it
    if (localStorage.getItem("playerSave") !== null) {loadGame(gameData);}

    // remove the loading screen
    const loadingScreen = document.querySelector(".loading_screen");
    const title = document.querySelector("main h1");
    loadingScreen.classList.add("hidden");
    title.classList.add("animate");

    // Start the game loop
    requestAnimationFrame((currentTime) => gameTick(currentTime, gameData));
}

// ======== MAIN GAME LOOP ======== //
function gameTick(currentTime, gameData = new GameData()) {

    // Performance metric
    //let startTime, endTime; startTime = window.performance.now() * 1000; 

    let deltaTime = currentTime - gameData.lastTime;
    gameData.deltaTime = deltaTime;

    if (deltaTime >= 1000/Constants.REFRESH_RATE) {

        // Perform all actions that must occur every tick
        gameData.multipliers.forEach((multiplier, key) => {
            multiplier.multUpdate();
            multiplier.updateDisplays();
        });

        gameData.resources.forEach((resource, key) => {
            resource.resourceTick(deltaTime, gameData);
        });

        gameData.processes.forEach((processMap, key) => {
            processMap.forEach((process, key) => {
                process.displayActiveProduction();
                process.displayBaseGeneration();
            });
        });

        Utils.visualFxTick();
        
        gameData.extraTimer += deltaTime;
        gameData.bonusTimer += deltaTime;
        
        gameData.lastTime = currentTime;

        // autosave
        if (gameData.autoSaveTimer >= Constants.AUTOSAVE_TICKS) {saveGame(gameData); gameData.autoSaveTimer=0}
        gameData.autoSaveTimer++;
    }
    
    if (gameData.extraTimer >= Constants.AVERAGING_TIME/Constants.AVERAGING_SAMPLES) {
        gameData.resources.forEach((resource, key) => {
            resource.calculateGain();
            resource.displayAverageGain();
        });

        gameData.extraTimer -= Constants.AVERAGING_TIME/Constants.AVERAGING_SAMPLES; // Reset the counter but keep leftover time
    }

    // perform all actions that must occur every 1 second
    if (gameData.bonusTimer >= 1000) {

        gameData.bonusItem.bonusTick();
        gameData.bonusTimer -= 1000; // reset counter but keep leftover time
    }

    // Performance metric
    //endTime = window.performance.now() * 1000; console.log(`Unit: Microseconds >>> Start: ${startTime} > End: ${endTime} > GENERATION TIME: ${endTime - startTime} > ALLOTTED TIME/FRAME: ${1000000/Constants.REFRESH_RATE} > % OF TIME USED: ${((endTime - startTime) / (1000000/Constants.REFRESH_RATE)) * 100}`);

    requestAnimationFrame((currentTime) => gameTick(currentTime, gameData));
}