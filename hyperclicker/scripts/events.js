import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

// JQuery events
export function initEventHandlers(gameData = new GameData()) {

    $(document).ready(() => {

        // INTRO BUTTON //
        $(".intro_button").click((event) => {
            try {
                const introScreenElement = event.currentTarget.closest(".intro_screen");

                Utils.gameData.audio.playSfxUnlocked();
                Utils.gameData.audio.playSfxStart();

                introScreenElement.classList.add("fade-flash");
                introScreenElement.addEventListener("animationend", () => {
                    introScreenElement.classList.add("hidden");
                    introScreenElement.classList.remove("flash-out"); 
                })
                Utils.seenIntro = true;
            } catch(e) {
                Utils.displayError(e, "The intro button malfunctioned.");
            }
        })

        // OPTIONS BUTTONS //
        $(".option button").click((event) => {
            try {
                Utils.gameData.audio.playSfxSelect();
            } catch(e) {
                Utils.displayError(e, "Options: playing audio failed.");
            }
        })

        $(".notation_button").click((event) => {
            try {
                Utils.updateNotation(parseInt($(event.currentTarget).attr("notation")));
            } catch(e) {
                Utils.displayError(e, "Options: changing notation failed.");
            }
        })

        $(".sticky_resources_button").click((event) => {
            try {
                Utils.toggleStickyResources(event.currentTarget);
            } catch(e) {
                Utils.displayError(e, "Options: toggling sticky resourced failed.");
            }
        })

        $(".large_resource_buttons_button").click((event) => {
            try {
                Utils.toggleLargeResourceButtons(event.currentTarget);
            } catch(e) {
                Utils.displayError(e, "Options: toggling large resource buttons failed.");
            }
        })

        $(".mute_music_button").click((event) => {
            try {
                Utils.gameData.audio.toggleMusic(event.currentTarget);
            } catch(e) {
                Utils.displayError(e, "Options: toggling music failed.");
            }
        })

        $(".mute_sfx_button").click((event) => {
            try {
                Utils.gameData.audio.toggleSfx(event.currentTarget);
            } catch(e) {
                Utils.displayError(e, "Options: toggling sfx failed.");
            }
        })

        $(".mute_story_music_button").click((event) => {
            try {
                Utils.gameData.audio.toggleStoryMusic(event.currentTarget);
            } catch(e) {
                Utils.displayError(e, "Options: toggling story music failed.");
            }
        })

        $(".mute_story_sfx_button").click((event) => {
            try {
                Utils.gameData.audio.toggleStorySfx(event.currentTarget);
            } catch(e) {
                Utils.displayError(e, "Options: toggling story sfx failed.");
            }
        }) 

        $(".save_data_button").click((event) => {
            try {
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
            } catch(e) {
                Utils.displayError(e, "Options: saving data failed.");
            } 
        })

        $(".reset_progress_button").click((event) => {
            try {
                Utils.resetCounter += 1;

                const resetMessage = document.querySelector(".options_panel .options .reset_message");
                resetMessage.innerHTML = `>> ${Constants.RESET_PROGRESS_CLICKS - Utils.resetCounter} <<`;
                resetMessage.classList.remove("hidden");

                if(Utils.resetCounter >= Constants.RESET_PROGRESS_CLICKS) {
                    Utils.resetProgress();
                }
            } catch(e) {
                Utils.displayError(e, "Options: resetting progress failed.");
            }
        })

        $(".reset_progress_button").mouseleave((event) => {
            try {
                Utils.resetCounter = 0;

                const resetMessage = document.querySelector(".options_panel .options .reset_message");
                resetMessage.classList.add("hidden");
            } catch(e) {
                Utils.displayError(e, "Options: leaving reset progress button failed.");
            }
        })

        $(".export_save_button").on("click", (event) => {
            try {
                Utils.copySaveToClipboard();

                const exportMessage = document.querySelector(".export_message");
                exportMessage.classList.remove("fade-out-slow");
                void exportMessage.offsetWidth;
                exportMessage.classList.add("fade-out-slow");
                exportMessage.classList.remove("hidden");
                exportMessage.addEventListener("animationend", () => {
                    exportMessage.classList.remove("fade-out-slow"); 
                    exportMessage.classList.add("hidden");
                })

            } catch(e) {
                Utils.displayError(e, "Options: exporting save failed.");
            }
        })

        $(".import_save_button").on("click", (event) => {
            try {
                const inputField = event.currentTarget.closest(".option").querySelector(".import_input");
                const importMessage = document.querySelector(".import_message");
                var saveFileStr = inputField.value;
                
                try{
                    var saveFileObj = JSON.parse(saveFileStr);
                    if ((saveFileObj == {}) || (typeof saveFileObj.validationField != "number")) {
                        throw new Error("JSON is empty and/or does not contain a validation field.");
                    }

                    Utils.importSave(saveFileStr);

                    importMessage.innerHTML = "Success! Refresh the website.";
                    
                } catch(e) {
                    console.log(e.message);
                    importMessage.innerHTML = "Invalid save data.";
                }

                importMessage.classList.remove("fade-out-slow");
                void importMessage.offsetWidth;
                importMessage.classList.add("fade-out-slow");
                importMessage.classList.remove("hidden");
                importMessage.addEventListener("animationend", () => {
                    importMessage.classList.remove("fade-out-slow"); 
                    importMessage.classList.add("hidden");
                })

            } catch(e) {
                Utils.displayError(e, "Options: importing save failed.");
            }
            
        })

        // RESOURCE BUTTONS //
        $(".resource_button").click((event) => {
            try {
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
            } catch(e) {
                Utils.displayError(e, "A resource button malfunctioned.");
            }
        })
        
        $(".generate_panel").on("mouseenter", (event) => {
            try {
                if(!Utils.largeResourceButtons) {
                    return;
                }

                for (let button of event.currentTarget.getElementsByClassName("resource_button")) {
                    button.style.height = "9rem";
                }
            } catch(e) {
                Utils.displayError(e, "Enlarging the resource buttons failed.");
            }
        })
        .on("mouseleave", (event) => {
            try {
                for (let button of event.currentTarget.getElementsByClassName("resource_button")) {
                    button.style.height = "4.5rem";
                }
            } catch(e) {
                Utils.displayError(e, "Shrinking the resource buttons failed.");
            }
        })
        
        // UPGRADE BUTTONS //
        $(".upgrade_button").click((event) => {
            try {
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
            } catch(e) {
                Utils.displayError(e, "Clicking an upgrade button malfunctioned.");
            }
        })

        $(".upgrade_button").mouseenter((event) => {
            try {
                const upgradeTypeTag = event.currentTarget.closest(".upgrade_list").getAttribute("upgrade_type");
                const parentDiv = event.currentTarget.closest(".upgrade");
                let upgradeKey = parentDiv.getAttribute("upgrade_key");
                let resourceName = parentDiv.getAttribute("resource");
                let upgrade = gameData.upgrades.get(upgradeTypeTag).get(resourceName).get(upgradeKey);
                if(!upgrade.canBuy()) {
                    event.currentTarget.classList.add("cannot_buy");
                    event.currentTarget.innerHTML = `${Constants.UPGRADE_BUTTON_CONTENT.get(upgradeTypeTag).get("cannot_buy")}`;
                }
            } catch(e) {
                Utils.displayError(e, "Mouse hovering an upgrade button caused an issue.");
            }
        })

        $(".upgrade_button").mouseleave((event) => {
            try {
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
            } catch(e) {
                Utils.displayError(e, "Mouse leaving an upgrade button caused an issue.");
            }
        })
        
        // PROCESS BUTTONS //
        $(".process_list").on("click", ".process_button", function(event) {
            try {
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
            } catch(e) {
                Utils.displayError(e, "Clicking a process button malfunctioned.");
            }
        })

        $(".process_list").on("mouseenter", ".process_button", function(event) {
            try {
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
                    process.displayAllFields();

                    if(!process.canSell(1)) {
                        event.currentTarget.classList.add("cannot_buy");
                        process.displayInvalidButton(action);
                    }
                }

                else if(action == "sell_all") {
                    process.displayAllFields();
                    
                    if(!process.canSell(process.numBought)) {
                        event.currentTarget.classList.add("cannot_buy");
                        process.displayInvalidButton(action);
                    }
                }
            } catch(e) {
                Utils.displayError(e, "A process button malfunctioned while updating.");
            }
        })

        $(".process_list").on("mouseleave", ".process_button", function(event) {
            try {
                let processKey = event.currentTarget.getAttribute("process_key");
                let resourceName = event.currentTarget.getAttribute("resource");
                let process = gameData.processes.get(resourceName).get(processKey);
                
                event.currentTarget.classList.remove("cannot_buy");
                process.removeInvalidButton();
            } catch(e) {
                Utils.displayError(e, "Mouse leaving the process button caused an issue.");
            }
        })

        $(".tab_buttons").on("click", "button", function(event) {
            try {
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
            } catch(e) {
                Utils.displayError(e, "Tab button malfunctioned.");
            }                
        })

        // HYPERMOD BUTTONS //
        $(".hypermod_toggle").on("click", function(event) {
            try {
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
            } catch(e) {
                Utils.displayError(e, "The hypermod failed to toggle.");
            } 
        })

    // BONUS BUTTONS //
    $(".bonus_icon").on("click", function(event) {
            Utils.gameData.bonusItem.activateBonus();
            Utils.gameData.audio.playSfxBonus();
    })

        // Events that occur when window is resized (for dynamic UI changes that css can't do)
        let resizeDebounce;
        window.addEventListener("resize", function() {
            try {
                clearTimeout(resizeDebounce);
                resizeDebounce = setTimeout(function () {
                    console.log("resized!");

                    // Calculate and assign upgrade list width
                    Utils.resizeUpgradeList();
                }, 10);
            } catch(e) {
                Utils.displayError(e, "The window resizing event failed.");
            }
        });
    });
}