export class GameData {
    resources;
    upgrades;
    multipliers;
    processes;
    hypermods;
    archive;
    audio;
    bonusItem;

    deltaTime;

    lastTime;
    extraTimer;
    bonusTimer;
    autoSaveTimer;

    constructor() {
        this.deltaTime = 0;
        
        this.lastTime = performance.now(); // To calculate deltaTime
        this.extraTimer = 0;
        this.bonusTimer = 0;
        this.autoSaveTimer = 0;
    }

    addResources(resources) {
        this.resources = resources;
    }

    addUpgrades(upgrades) {
        this.upgrades = upgrades;
    }

    addMultipliers(multipliers) {
        this.multipliers = multipliers;
    }

    addProcesses(processes) {
        this.processes = processes;
    }

    addHyperMods(hypermods) {
        this.hypermods = hypermods;
    }

    addArchive(archive) {
        this.archive = archive;
    }

    addAudio(audio) {
        this.audio = audio;
    }

    addBonusItem(bonusItem) {
        this.bonusItem = bonusItem;
    }
}