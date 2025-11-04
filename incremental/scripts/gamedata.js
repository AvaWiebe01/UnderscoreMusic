export class GameData {
    resources;
    upgrades;
    multipliers;
    processes;
    cores;
    archive;

    lastTime;
    extraTimer;

    constructor() {
        this.lastTime = performance.now(); // To calculate deltaTime
        this.extraTimer = 0;
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

    addArchive(archive) {
        this.archive = archive;
    }
}