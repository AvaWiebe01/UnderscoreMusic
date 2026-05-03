import { Constants } from "./constants.js";
import { Utils } from "./utils.js";
import { GameData } from "./gamedata.js";

export function saveGame() {

    const gameData = Utils.gameData;

    var resourcesObj = {};
    var processesObj = {};
    var upgradesObj = {};
    var multipliersObj = {};
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

    gameData.multipliers.forEach((multiplier, multiplierName) => {
        multipliersObj[multiplierName] = multiplier.toJSON();
    });

    gameData.hypermods.mods.forEach((hypermod, hypermodName) => {
        hypermodsObj[hypermodName] = hypermod.toJSON();
    });

    const saveFile = {
        resources: resourcesObj,

        processes: processesObj,

        upgrades: upgradesObj,

        multipliers: multipliersObj,

        hypermods: hypermodsObj,

        options: {
            notationType: Utils.notationType,

            stickyResources: Utils.stickyResources,

            largeResourceButtons: Utils.largeResourceButtons,

            musicMuted: Utils.gameData.audio.musicMuted,
            sfxMuted: Utils.gameData.audio.sfxMuted,
            storyMusicMuted: Utils.gameData.audio.storyMusicMuted,
            storySfxMuted: Utils.gameData.audio.storySfxMuted,

            seenIntro: Utils.seenIntro,
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
    for (let upgd of saveFile.upgrades ?? []) {
        const upgradeObject = gameData.upgrades.get(upgd.upgradeTypeTag).get(upgd.resourceName).get(upgd.key);
        upgradeObject.buy(true);
        upgradeObject.upgradeElement.classList.add("hidden");

        // make unlocked upgrades visible
        for (const unlockUpgradeKey of upgradeObject.unlockUpgrades) {
            Utils.gameData.upgrades?.get(upgd.upgradeTypeTag)?.get(upgd.resourceName)?.get(unlockUpgradeKey)?.unlock();
        }

        // add to unlocked upgrades list
        let purchasedUpgradeList = document.querySelector(`.purchased_upgrade_list[upgrade_type="${upgd.upgradeTypeTag}"]`);
        if(purchasedUpgradeList) {
            purchasedUpgradeList.innerHTML = `
                <div class="purchased_upgrade">
                    <h3>${upgradeObject.title}</h3>
                    <span class="description">${upgradeObject.description}</span>
                </div>
            ` + purchasedUpgradeList.innerHTML;
        }
    }

    // restore all processes
    gameData.processes.forEach((processMap, resourceName) => {
        processMap.forEach((process, processName) => {
            process.numBought = saveFile.processes?.[process.resource.htmlName][processName].numBought;
            process.baseProductionMult = saveFile.processes?.[process.resource.htmlName][processName].baseProductionMult;

            // unlock next and all previous processes
            if(process.numBought > 0) {
                var elem = process.processElement.nextElementSibling ?? process.processElement;

                while (elem ?? false) {
                    elem.classList.remove("not_unlocked");
                    elem = elem.previousElementSibling ?? false;
                }
            }
        });
    });

    // restore all multipliers
    gameData.multipliers.forEach((multiplier, multiplierName) => {
        if(saveFile.multipliers?.[multiplierName] ?? false) {multiplier.fromJSON(saveFile.multipliers[multiplierName])};
    });

    // restore all hypermods
    gameData.hypermods.mods.forEach((hypermod, hypermodName) => {
        if(saveFile.hypermods?.[hypermodName]?.enabled ?? false) {
            hypermod.enable();
            gameData.hypermods.enabledMods.set(hypermodName, hypermod);
            document.querySelector(`.architecture_list .hypermod[name="${hypermodName}"]`).classList.add("enabled");
        }
    });

    // restore all resources
    gameData.resources.forEach((resource, resourceName) => {

        if (saveFile?.resources?.[resourceName] ?? false) {resource.amt = saveFile.resources[resourceName].amt;}
        //resource.deltaBaseMult = saveFile.resources?.[resourceName].deltaBaseMult;
        //resource.btnValBaseMult = saveFile.resources?.[resourceName].btnValBaseMult;
    });

    // restore all options
    Utils.notationType = saveFile.options.notationType ?? 0;
    if (!(saveFile.options.stickyResources ?? true)) {Utils.toggleStickyResources(document.querySelector(".options .option .sticky_resources_button"));}
    if ((saveFile.options.largeResourceButtons ?? false)) {Utils.toggleLargeResourceButtons(document.querySelector(".options .option .large_resource_buttons_button"));}
    gameData.audio.musicMuted = saveFile.options?.musicMuted ?? false;
    gameData.audio.sfxMuted = saveFile.options?.sfxMuted ?? false;
    gameData.audio.storyMusicMuted = saveFile.options?.storyMusicMuted ?? false;
    gameData.audio.storySfxMuted = saveFile.options?.storySfxMuted ?? false;
    Utils.seenIntro = saveFile.options.seenIntro ?? false;


    // update displays
    Utils.refreshAllDisplays();

    console.log(`Load validation #: ${saveFile.validationField}`);
}

export function resetProgress() {
    localStorage.removeItem("playerSave");
    
    window.location.reload();
}