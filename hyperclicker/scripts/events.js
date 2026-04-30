import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

// JQuery events
export function initEventHandlers(gameData = new GameData()) {

    $(document).ready(() => {

        // OPTIONS BUTTONS //
        $(".option button").click((event) => {
            Utils.gameData.audio.playSfxSelect();
        })

        $(".notation_button").click((event) => {
            Utils.updateNotation(parseInt($(event.currentTarget).attr("notation")));
        })

        $(".sticky_resources_button").click((event) => {
            Utils.toggleStickyResources(event.currentTarget);
        })

        $(".mute_music_button").click((event) => {
            Utils.gameData.audio.toggleMusic(event.currentTarget);
        })

        $(".mute_sfx_button").click((event) => {
            Utils.gameData.audio.toggleSfx(event.currentTarget);
        })

        $(".save_data_button").click((event) => {
            Utils.save();

            // save message animation
            const saveMessage = document.querySelector(".options_panel .options .saved_message");
            saveMessage.classList.remove("fade-out-slow");
            void saveMessage.offsetWidth;
            saveMessage.classList.add("fade-out-slow");
            saveMessage.classList.remove("hidden");
            saveMessage.addEventListener("animationend", () => {
                saveMessage.classList.remove("fade-out-slow"); 
                saveMessage.classList.add("hidden");
            })
        })

        // RESOURCE BUTTONS //
        $(".resource_button").click((event) => {
            let resourceName = event.currentTarget.getAttribute("resource");
            event.currentTarget.style.animation = "none";
            event.currentTarget.offsetHeight; // Force browser to reset animation
            event.currentTarget.style.animation = "click 0.25s";

            gameData.resources.get(resourceName).btnClicked();

            // trigger audio
            switch(resourceName) {
                case 'arcbits':
                    Utils.gameData.audio.playSfxDecrypt();
                    break;
                case 'hyperkeys':
                    Utils.gameData.audio.playSfxConstruct();
                    break;
                case 'nullpointers':
                    // within nullpointer class
                    break;
            }
        })
        
        // UPGRADE BUTTONS //
        $(".upgrade_button").click((event) => {
            const upgradeTypeTag = event.currentTarget.closest(".upgrade_list").getAttribute("upgrade_type");
            const parentDiv = event.currentTarget.closest(".upgrade");
            let upgradeKey = parentDiv.getAttribute("upgrade_key");
            let resourceName = parentDiv.getAttribute("resource");
            let upgrade = gameData.upgrades.get(upgradeTypeTag).get(resourceName).get(upgradeKey);
            if(upgrade.canBuy()) {
                upgrade.buy();
                event.currentTarget.innerHTML = `${Constants.UPGRADE_BUTTON_CONTENT.get(upgradeTypeTag).get("purchased")}`;
                event.currentTarget.classList.add("bought");

                Utils.gameData.audio.playSfxUpgrade();

                // add upgrade to purchased list (newest at the top)
                let purchasedUpgradeList = document.querySelector(`.purchased_upgrade_list[upgrade_type="${upgradeTypeTag}"]`);
                if(purchasedUpgradeList) {
                    purchasedUpgradeList.innerHTML = `
                        <div class="purchased_upgrade">
                            <h3>${upgrade.title}</h3>
                            <span class="description">${upgrade.description}</span>
                        </div>
                    ` + purchasedUpgradeList.innerHTML;
                }

                // Remove upgrade from UI  
                parentDiv.classList.add("fade-out");
                parentDiv.addEventListener("animationend", () => {
                    parentDiv.classList.remove("fade-out"); 
                    parentDiv.classList.add("hidden");
                    
                    // unlock subsequent upgrades
                    if (upgrade.unlockUpgrades.length != 0) {
                        Utils.gameData.audio.playSfxUnlocked();
                    }

                    for (const unlockUpgradeKey of upgrade.unlockUpgrades) {
                        upgrade.gameData.upgrades?.get(upgrade.upgradeTypeTag)?.get(upgrade.resource.htmlName)?.get(unlockUpgradeKey).unlock();

                        const unlockedDiv = event.currentTarget.closest(".upgrade_list").querySelector(`[upgrade_key="${unlockUpgradeKey}"]`)
                        unlockedDiv.classList.add("appear");

                        unlockedDiv.addEventListener("animationend", () => {
                            unlockedDiv.classList.remove("appear");
                        });
                    }
                }); 
            }
            else {
                event.currentTarget.classList.add("shake");
                Utils.gameData.audio.playSfxInvalid();

                event.currentTarget.addEventListener("animationend", () => {
                event.currentTarget.classList.remove("shake"); 
                }); 
            }
        })

        $(".upgrade_button").mouseenter((event) => {
            const upgradeTypeTag = event.currentTarget.closest(".upgrade_list").getAttribute("upgrade_type");
            const parentDiv = event.currentTarget.closest(".upgrade");
            let upgradeKey = parentDiv.getAttribute("upgrade_key");
            let resourceName = parentDiv.getAttribute("resource");
            let upgrade = gameData.upgrades.get(upgradeTypeTag).get(resourceName).get(upgradeKey);
            if(!upgrade.canBuy()) {
                event.currentTarget.classList.add("cannot_buy");
                event.currentTarget.innerHTML = `${Constants.UPGRADE_BUTTON_CONTENT.get(upgradeTypeTag).get("cannot_buy")}`;
            }
        })

        $(".upgrade_button").mouseleave((event) => {
            const upgradeTypeTag = event.currentTarget.closest(".upgrade_list").getAttribute("upgrade_type");
            const parentDiv = event.currentTarget.closest(".upgrade");
            let upgradeKey = parentDiv.getAttribute("upgrade_key");
            let resourceName = parentDiv.getAttribute("resource");
            let upgrade = gameData.upgrades.get(upgradeTypeTag).get(resourceName).get(upgradeKey);
            if(upgrade.isBought) {
                event.currentTarget.innerHTML = `${Constants.UPGRADE_BUTTON_CONTENT.get(upgradeTypeTag).get("purchased")}`;
            }
            else {
                event.currentTarget.innerHTML = `${Constants.UPGRADE_BUTTON_CONTENT.get(upgradeTypeTag).get("default")}`;
                event.currentTarget.classList.remove("cannot_buy");
            }
        })
        
        // PROCESS BUTTONS //
        $(".process_list").on("click", ".process_button", function(event) {
            let processKey = event.currentTarget.getAttribute("process_key");
            let resourceName = event.currentTarget.getAttribute("resource");
            let action = event.currentTarget.getAttribute("action");
            let process = gameData.processes.get(resourceName).get(processKey);

            if(action == "buy") {
                if(process.canBuy(process.buyAmt)) {
                    Utils.gameData.audio.playSfxDecrypt();

                    process.buy();
                    process.displayAllFields();
                }
                else {
                    event.currentTarget.classList.add("shake");
                    Utils.gameData.audio.playSfxInvalid();

                    event.currentTarget.addEventListener("animationend", () => {
                    event.currentTarget.classList.remove("shake"); 
                    }); 
                }
            }
                
            else if(action == "sell_one") {
                if(process.canSell(1)) {
                    Utils.gameData.audio.playSfxConstruct();

                    process.sell(1);
                    process.displayAllFields();
                }
                else {
                    event.currentTarget.classList.add("shake");
                    Utils.gameData.audio.playSfxInvalid();

                    event.currentTarget.addEventListener("animationend", () => {
                    event.currentTarget.classList.remove("shake"); 
                    }); 
                }
            }

            else if(action == "sell_all") {
                if(process.canSell(process.numBought)) {
                    Utils.gameData.audio.playSfxConstruct();

                    process.sell(process.numBought);
                    process.displayAllFields();
                }
                else {
                    event.currentTarget.classList.add("shake");
                    Utils.gameData.audio.playSfxInvalid();

                    event.currentTarget.addEventListener("animationend", () => {
                    event.currentTarget.classList.remove("shake"); 
                    }); 
                }
            }
        })

        $(".process_list").on("mouseenter", ".process_button", function(event) {
            let processKey = event.currentTarget.getAttribute("process_key");
            let resourceName = event.currentTarget.getAttribute("resource");
            let action = event.currentTarget.getAttribute("action");
            let process = gameData.processes.get(resourceName).get(processKey);

            if(action == "buy") {
                if(!process.canBuy(process.buyAmt)) {
                    event.currentTarget.classList.add("cannot_buy");
                    process.displayInvalidButton(action);
                }   
            }
                
            else if(action == "sell_one") {
                if(!process.canSell(1)) {
                    event.currentTarget.classList.add("cannot_buy");
                    process.displayInvalidButton(action);
                }
            }

            else if(action == "sell_all") {
                if(!process.canSell(process.numBought)) {
                    event.currentTarget.classList.add("cannot_buy");
                    process.displayInvalidButton(action);
                }
            }
        })

        $(".process_list").on("mouseleave", ".process_button", function(event) {
            let processKey = event.currentTarget.getAttribute("process_key");
            let resourceName = event.currentTarget.getAttribute("resource");
            let process = gameData.processes.get(resourceName).get(processKey);
            
            event.currentTarget.classList.remove("cannot_buy");
            process.removeInvalidButton();
        })

        $(".tab_buttons").on("click", "button", function(event) {
            Utils.gameData.audio.playSfxSelect();

            // Tab display
            document.querySelectorAll(".tab").forEach((tabElement) => {
                tabElement.classList.remove("active_tab");
                tabElement.classList.add("inactive_tab");
            })

            let activeTab = document.querySelector(`.${event.currentTarget.getAttribute("tab")}`);
            activeTab.classList.remove("inactive_tab");
            activeTab.classList.add("active_tab");

            // Button display
            document.querySelectorAll(".tab_buttons button").forEach((tabButtonElement) => {
                tabButtonElement.classList.remove("selected");
            })
            event.currentTarget.classList.add("selected")

            Utils.resizeUpgradeList();
        })

        // HYPERMOD BUTTONS //
        $(".hypermod_toggle").on("click", function(event) {
            Utils.gameData.audio.playSfxSelect();

            const target = event.currentTarget;
            const hypermodElement = target.closest(".hypermod");

            const hypermod = Utils.gameData.hypermods.mods.get(target.getAttribute("architecture"));
            const enabledMods = Utils.gameData.hypermods.enabledMods;
            const maxEnabled = Utils.gameData.hypermods.maxEnabled;

            if (hypermod.enabled) {
                hypermod.disable();
                enabledMods.delete(hypermod.htmlName);
                hypermodElement.classList.remove("enabled");
            }
            else {
                // disable the oldest enabled hypermod to make room
                if(enabledMods.size >= maxEnabled) {
                    const toDisable = enabledMods.entries().next().value;
                    const toDisableElement = document.querySelector(`.architectures_panel .architecture_list .hypermod.enabled[name="${toDisable[0]}"]`);
                    enabledMods.delete(toDisable[0]);
                    toDisable[1].disable();
                    toDisable[1].updateDisplays();
                    toDisableElement.classList.remove("enabled");
                }

                hypermod.enable();
                enabledMods.set(hypermod.htmlName, hypermod);
                hypermodElement.classList.add("enabled");
            }

            hypermod.updateDisplays();
            Utils.gameData.hypermods.updateDisplays();
        })

    // BONUS BUTTONS //
    $(".bonus_icon").on("click", function(event) {
        Utils.gameData.bonusItem.activateBonus();
        Utils.gameData.audio.playSfxBonus();
    })

        // Events that occur when window is resized (for dynamic UI changes that css can't do)
        let resizeDebounce;
        window.addEventListener("resize", function() {
            clearTimeout(resizeDebounce);
            resizeDebounce = setTimeout(function () {
                console.log("resized!");

                // Calculate and assign upgrade list width
                Utils.resizeUpgradeList();
            }, 10);
        });
    });
}