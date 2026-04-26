import { Constants } from "./constants.js";
import { Utils } from "./utils.js";

export class Archive {
    unlockedFragmentsDisplay;
    noFragmentsDisplay;

    constructor() {

    }

    unlockFragment(fragmentKey) {
        let fragmentElement = document.querySelector(`main .game .archive_panel .fragment[fragment_key="${fragmentKey}"]`);
        fragmentElement.classList.remove("not_unlocked");
        this.noFragmentsDisplay.classList.add("hidden");

        // gameplay incentive for recovering
        Utils.gameData.resources.get("arcbits").modifyBtnValBaseMult(2);
        Utils.gameData.resources.get("arcbits").modifyDeltaBaseMult(2);
    }

    initDisplayElements() {
        this.unlockedFragmentsDisplay = document.getElementsByClassName("unlocked_fragments_list")[0];
        this.noFragmentsDisplay = document.getElementsByClassName("no_fragments_display")[0];
        let archiveHtml = "";

        Constants.FRAGMENTS_INFO.forEach((fragmentInfo, key) => {
            archiveHtml += `
                <div class="fragment not_unlocked" fragment_key="${key}">
                    <h3>${fragmentInfo[0]}</h3>
                    <span class="fragment_description">${fragmentInfo[1]}</span>
                    <a class="fragment_link" href="${fragmentInfo[2]}" target="_blank">[View ${fragmentInfo[0]}]</a>
                </div>
            `;
        });

        this.unlockedFragmentsDisplay.innerHTML = archiveHtml;
        this.noFragmentsDisplay.innerHTML = "No Fragments recovered. Once a Fragment is recovered, it will appear here.";
    }
}

export function initArchive() {
    const archive = new Archive();

    archive.initDisplayElements();

    return archive;
}