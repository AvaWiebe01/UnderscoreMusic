import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

// JQuery events
export function initEventHandlers(gameData = new GameData()) {

    $(document).ready(() => {
        $(".notation_button").click((event) => {
            Utils.updateNotation = parseInt($(event.currentTarget).attr("notation"));
        })

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
    });
}