import { Constants } from "./constants.js";

import { Process, displayProcesses } from "./processes.js";

import { Upgrade, displayUpgrades } from "./upgrades.js";

import { saveGame, loadGame, resetProgress } from "./save.js";

export class Utils {
    static gameData;

    static notationType = 0; // 0 = default, 1 = abbreviated, 2 = engineering, 3 = exponential, 4 = standard decimal, 5 = Abbreviated data size, 6 = data size
    static stickyResources = true;
    static largeResourceButtons = false;

    static seenIntro = false; // if the introduction message has been seen before

    static fxCounter = 0;

    static resetCounter = 0; // confirm before resetting save data

    static purchasedUpgrades = []; // ordered list of all upgrades purchased

    // Visual FX elements
    static obfuscatedElements = document.getElementsByClassName("obfuscated");
    static upgradeLists = document.getElementsByClassName("upgrade_list");

    constructor() {

    }

    static addGameData(gameData) {
        this.gameData = gameData;
    }

    static getDisplayableNumber(num, hasDecimals = true, notation = this.notationType) {
        let suffix = "";
        switch(notation) {
            case 0:
                suffix = " " + Constants.DEFAULT_SUFFIXES[num >= 1000 ? Math.floor(Math.log10(num)/3) : 0];
                break;
            case 1:
                suffix = " " + Constants.ABBREVIATED_SUFFIXES[num >= 1000 ? Math.floor(Math.log10(num)/3) : 0];
                break;
            case 2:
                suffix = num < 1000 ? "" : " x 10^" + Math.floor(Math.log10(num)/3)*3;
                break;
            case 3:
                suffix = num < 1000 ? "" : "e+" + Math.floor(Math.log10(num)/3)*3;
                break;
            case 4: // fuck it, don't shorten it at all
                return num.toFixed((num < 1000) ? 5 : 0);
            case 5:
                suffix = " " + Constants.DATA_SIZE_ABBREVIATED_SUFFIXES[num >= 1000 ? Math.floor(Math.log10(num)/3) : 0];
                break;
            case 6:
                suffix = " " + Constants.DATA_SIZE_SUFFIXES[num >= 1000 ? Math.floor(Math.log10(num)/3) : 0];
                break;

        }
        
        let decimalCount = Math.min(num > 0.000000000001 ? Math.max(-Math.log10(num) + 2.99999, 3) : 0, 5);

        if(num >= 1000) {
            return (num/(10**(Math.floor(Math.log10(num)/3)*3))).toFixed(decimalCount) + '<span class="suffix">' + suffix + '</span>';
        }
        else {
            return num.toFixed(hasDecimals ? decimalCount : 0);
        }
    }

    static updateNotation(newNotation) {
        this.notationType = newNotation

        // Refresh displays
        this.refreshAllDisplays();
    }

    static toggleStickyResources(target) {
        this.stickyResources = !this.stickyResources;
        if(this.stickyResources) { 
            document.getElementsByClassName("resource_panel")[0].style.position = "sticky";
            document.getElementsByClassName("resource_panel")[0].style.top = "1rem";
            target.innerHTML = "Disable";
        }
        else {
            document.getElementsByClassName("resource_panel")[0].style.position = "relative";
            document.getElementsByClassName("resource_panel")[0].style.top = "0";
            target.innerHTML = "Enable";
        }
    }

    // Adjust width of upgrade list so it's centered
    static resizeUpgradeList() {
        const upgradeWidth = 27.125;
        const gapWidth = 0.5;
        let fullUpgradeWidth = upgradeWidth + gapWidth;

        for(const upgradeList of this.upgradeLists) {
            let upgradePanelWidth = (upgradeList.closest(".panel").clientWidth) / 16;

            let horizUpgrades = Math.floor((upgradePanelWidth + gapWidth) / fullUpgradeWidth);

            let finalListWidth = (fullUpgradeWidth * horizUpgrades) - gapWidth;

            upgradeList.style.width = `calc(${finalListWidth}rem)`;
        }
    }

    static toggleLargeResourceButtons(target) {
        this.largeResourceButtons = !this.largeResourceButtons;
        target.innerHTML = (this.largeResourceButtons) ? "Disable" : "Enable";
    }

    // Visual Fx that must be updated every frame
    static visualFxTick() {

        // Obfuscated elements
        if(!(this.fxCounter%3)) {
            for(const element of this.obfuscatedElements) {
                let obfuscation_length = element.textContent.length;

                let randomString ="";
                for(let i=0; i<obfuscation_length; i++) {
                    randomString += Constants.OBFUSCATION_CHARS.charAt(Math.floor(Math.random() * Constants.OBFUSCATION_CHARS.length));
                }
                element.innerHTML = randomString;
            }
        }

        (this.fxCounter >= Constants.REFRESH_RATE) ? this.fxCounter=0 : this.fxCounter++;
    }

    static refreshAllDisplays() {
        // Refresh displays in a non-destructive way (no lost references)
        this.gameData.upgrades.forEach((upgradeType, upgradeTypeTag) => {
            upgradeType.forEach((upgradeMap, resourceName) => {
                upgradeMap.forEach((upgrade, key) => {
                    upgrade.displayAllFields();
                });
            });
        });

        this.gameData.processes.forEach((processMap, resourceName) => {
            processMap.forEach((process, key) => {
                process.displayAllFields();
            });
        });

        this.gameData.hypermods.mods.forEach((hypermod, key) => {
            hypermod.updateDisplays();
        })
        Utils.gameData.hypermods.updateDisplays();
    }

    static unlockTab(tabValue) {
        document.querySelector(`.tab_buttons button[tab="${tabValue}"]`).classList.remove("locked_tab");
    }

    static unlockUpgrade(upgradeTypeTag, resourceName, key) {
        const upgrade = this.gameData.upgrades.get(upgradeTypeTag).get(resourceName).get(key);

        if (!upgrade.isUnlocked) {
            upgrade.unlock();

            const unlockedDiv = upgrade.upgradeElement;
            unlockedDiv.classList.add("appear");

            unlockedDiv.addEventListener("animationend", () => {
                unlockedDiv.classList.remove("appear");
            });
        }

    }

    static save() {
        saveGame(this.gameData);
    }

    static resetProgress() {
        resetProgress();
    }
}
