import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

import { GameData } from "./gamedata.js";

export function saveGame(gameData = new GameData()) {

    const saveFile = {
        
        "validationField": Math.random(),
    }

    console.log(`Save validation #: ${saveFile.validationField}`);

    const saveFileStr = JSON.stringify(saveFile);
    localStorage.setItem("playerSave", saveFileStr);
}

export function loadGame(gameData = new GameData()) {
    const saveFile = JSON.parse(localStorage.getItem("playerSave"));

    console.log(`Load validation #: ${saveFile.validationField}`);
}