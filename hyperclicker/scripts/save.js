import { Constants } from "./constants.js";
import { Utils } from "./utils.js";
import { GameData } from "./gamedata.js";

export function saveGame() {

    const gameData = Utils.gameData;

    var resourcesObj = {};
    var processesObj = {};
    var upgradesObj = {};
    var hypermodsObj = {};

    gameData.resources.forEach((resource, resourceName) => {
        resourcesObj[resourceName] = resource.toJSON();
    });

    gameData.processes.forEach((processMap, resourceName) => {
        processesObj[resourceName] = {};

        processMap.forEach((process, processName) => {
            processesObj[resourceName][processName] = process.toJSON();
        });
    });

    upgradesObj = Utils.purchasedUpgrades;

    gameData.hypermods.mods.forEach((hypermod, hypermodName) => {
        hypermodsObj[hypermodName] = hypermod.toJSON();
    });

    const saveFile = {
        resources: resourcesObj,

        processes: processesObj,

        upgrades: upgradesObj,

        hypermods: hypermodsObj,

        options: {
            notationType: Utils.notationType,
            stickyResources: Utils.stickyResources,
            musicMuted: Utils.gameData.audio.musicMuted,
            sfxMuted: Utils.gameData.audio.sfxMuted,
            storyMusicMuted: Utils.gameData.audio.storyMusicMuted,
            storySfxMuted: Utils.gameData.audio.storySfxMuted,
        },

        validationField: Math.random(),
    }

    console.log(`Save validation #: ${saveFile.validationField}`);

    const saveFileStr = JSON.stringify(saveFile);
    localStorage.setItem("playerSave", saveFileStr);
}

export function loadGame() {

    const gameData = Utils.gameData;
    
    const saveFile = JSON.parse(localStorage.getItem("playerSave"));

    // restore all upgrades
    for (let upgd of saveFile.upgrades) {
        const upgradeObject = gameData.upgrades.get(upgd.upgradeTypeTag).get(upgd.resourceName).get(upgd.key);
        upgradeObject.buy(true);
        upgradeObject.upgradeElement.classList.add("hidden");

        // make unlocked upgrades visible
        for (const unlockUpgradeKey of upgradeObject.unlockUpgrades) {
            Utils.gameData.upgrades?.get(upgd.upgradeTypeTag)?.get(upgd.resourceName)?.get(unlockUpgradeKey).unlock();
        }
    }

    // restore all processes
    gameData.processes.forEach((processMap, resourceName) => {
        processMap.forEach((process, processName) => {
            process.numBought = saveFile.processes[process.resource.htmlName][processName].numBought;
            process.baseProductionMult = saveFile.processes[process.resource.htmlName][processName].baseProductionMult;
        });
    });

    // restore all hypermods
    gameData.hypermods.mods.forEach((hypermod, hypermodName) => {
        hypermod.enabled = saveFile.hypermods[hypermodName].enabled;

        if(hypermod.enabled) {
            gameData.hypermods.enabledMods.set(hypermodName, hypermod);
            document.querySelector(`.architecture_list .hypermod[name="${hypermodName}"]`).classList.add("enabled");
        }
    });

    // restore all resources
    gameData.resources.forEach((resource, resourceName) => {
        resource.amt = saveFile.resources[resourceName].amt;
        resource.deltaBaseMult = saveFile.resources[resourceName].deltaBaseMult;
        resource.btnValBaseMult = saveFile.resources[resourceName].btnValBaseMult;
    });

    // restore all options
    Utils.notationType = saveFile.options.notationType;
    if (!saveFile.options.stickyResources) {Utils.toggleStickyResources();}
    gameData.audio.musicMuted = saveFile.options.musicMuted;
    gameData.audio.sfxMuted = saveFile.options.sfxMuted;
    gameData.audio.storyMusicMuted = saveFile.options.storyMusicMuted;
    gameData.audio.storySfxMuted = saveFile.options.storySfxMuted;

    // update displays
    Utils.refreshAllDisplays();

    console.log(`Load validation #: ${saveFile.validationField}`);
}

export function resetProgress() {
    localStorage.removeItem("playerSave");
    
    window.location.reload();
}