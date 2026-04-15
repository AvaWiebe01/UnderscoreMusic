import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

// JQuery events
export function initEventHandlers(gameData = new GameData()) {

    $(document).ready(() => {

        // OPTIONS BUTTONS //
        $(".notation_button").click((event) => {
            Utils.updateNotation(parseInt($(event.currentTarget).attr("notation")));
        })

        $(".sticky_resources_button").click((event) => {
            Utils.toggleStickyResources(event.currentTarget);
        })

        // RESOURCE BUTTONS //
        $(".resource_button").click((event) => {
            let resourceName = event.currentTarget.getAttribute("resource");
            //let btnValDisplay = document.getElementsByClassName(resourceName + "_btnval_display")[0];
            event.currentTarget.style.animation = "none";
            //btnValDisplay.style.animation = "none";
            event.currentTarget.offsetHeight; // Force browser to reset animation
            //btnValDisplay.offsetHeight;
            event.currentTarget.style.animation = "click 0.25s";
            //btnValDisplay.style.animation = "shake 0.25s";
            gameData.resources.get(resourceName).btnClicked();
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
                    process.buy();
                    process.displayAllFields();
                }
                else {
                    event.currentTarget.classList.add("shake");
                    event.currentTarget.addEventListener("animationend", () => {
                    event.currentTarget.classList.remove("shake"); 
                    }); 
                }
            }
                
            else if(action == "sell_one") {
                if(process.canSell(1)) {
                    process.sell(1);
                    process.displayAllFields();
                }
                else {
                    event.currentTarget.classList.add("shake");
                    event.currentTarget.addEventListener("animationend", () => {
                    event.currentTarget.classList.remove("shake"); 
                    }); 
                }
            }

            else if(action == "sell_all") {
                if(process.canSell(process.numBought)) {
                    process.sell(process.numBought);
                    process.displayAllFields();
                }
                else {
                    event.currentTarget.classList.add("shake");
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
        $(".hypermod_toggle").on("click", "button", function(event) {
            console.log(`HyperMod Enabled`)
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