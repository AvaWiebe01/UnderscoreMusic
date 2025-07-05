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
            const parentDiv = event.currentTarget.closest("div");
            let upgradeKey = parentDiv.getAttribute("upgrade_key");
            let resourceName = parentDiv.getAttribute("resource");
            let upgrade = gameData.upgrades.get(resourceName).get(upgradeKey);
            if(upgrade.canBuy()) {
                upgrade.buy();
                upgrade.displayUpgrade(upgradeKey, gameData.upgrades.get(resourceName));
                // Remove upgrade from UI
                parentDiv.classList.add("fade-out");
                parentDiv.addEventListener("animationend", () => {
                parentDiv.classList.remove("fade-out"); 
                parentDiv.classList.add("hidden"); 
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
            const parentDiv = event.currentTarget.closest("div");
            let upgradeKey = parentDiv.getAttribute("upgrade_key");
            let resourceName = parentDiv.getAttribute("resource");
            let upgrade = gameData.upgrades.get(resourceName).get(upgradeKey);
            if(!upgrade.canBuy()) {
                event.currentTarget.classList.add("cannot_buy");
                event.currentTarget.innerHTML = "[Invalid]";
            }
        })

        $(".upgrade_button").mouseleave((event) => {
            event.currentTarget.classList.remove("cannot_buy");
            event.currentTarget.innerHTML = "[Update]";
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
    });
}