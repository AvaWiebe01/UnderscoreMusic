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
                // Animation for failure
            }
        })
    });
}