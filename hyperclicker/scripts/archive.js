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

        // 5% chance to add !-LMTLOG clue to archive page
        var showHiddenArchive1 = (Math.random() < 0.05);
        if (showHiddenArchive1) {
            document.querySelector(".hidden_archive_1").innerHTML="!-LMTLOG";
            document.querySelector(".hidden_archive_1").classList.remove('hidden');
        }

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
                    <a class="fragment_link" href="${fragmentInfo[2]}?sfxVol=${Constants.MAX_STORY_SFX_GAIN}&musicVol=${Constants.MAX_STORY_MUSIC_GAIN}" target="_blank">[View ${fragmentInfo[0]}]</a>
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