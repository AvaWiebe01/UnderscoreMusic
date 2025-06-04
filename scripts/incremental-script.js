const REFRESH_RATE = 60;
const AVERAGING_TIME = 1000;
const AVERAGING_SAMPLES = 10;
const DEFAULT_SUFFIXES = ["","Thousand","Million","Billion","Trillion","Quadrillion","Quintillion","Sextillion","Septillion","Octillion","Nonillion","Decillion"];
const ABBREVIATED_SUFFIXES = ["","K","M","B","T","Q","Qi","Sx","Sp","Oc","No","Dc"];

class Resource {
    amt;
    delta;
    deltaMult;
    btnVal;
    btnValMult;
    htmlName;
    displayableName;

    gain;
    lastAmt;

    constructor(amt, delta, btnVal, htmlName, displayableName) {
        this.amt = amt;
        this.delta = delta;
        this.deltaMult = 1;
        this.btnVal = btnVal;
        this.btnValMult = 1;
        this.htmlName = htmlName; // Must be exactly as it appears in HTML, ex. "arcbits"
        this.displayableName = displayableName;

        this.gain = new Array(AVERAGING_SAMPLES).fill(0);
        this.lastAmt = amt;

        // Initialize Displays
        this.displayAmt();
        this.displayAverageGain();
        this.displayFinalDelta();
        this.displayFinalBtnVal();
    }

    calculateGain() {
        for(let i = this.gain.length - 1; i > 0; i--) {this.gain[i] = this.gain[i-1];}
        this.gain[0] = this.amt - this.lastAmt;
        this.lastAmt = this.amt;
    }

    getAverageGain() {
        return this.gain.reduce((sum, curr) => sum + curr, 0) / this.gain.length;
    }

    displayAverageGain() {
        const gainDisplays = document.getElementsByClassName(this.htmlName + "_gain_display");
        for(let i = 0; i < gainDisplays.length; i++) {
            gainDisplays[i].innerHTML = getDisplayableNumber(this.getAverageGain()) + '/s';
        }
    }

    displayAmt() {
        const amtDisplays = document.getElementsByClassName(this.htmlName + "_display");
        for(let i = 0; i < amtDisplays.length; i++) {
            amtDisplays[i].innerHTML = getDisplayableNumber(this.amt);
        }
    }

    displayFinalDelta() {
        const deltaDisplays = document.getElementsByClassName(this.htmlName + "delta_display");
        for(let i = 0; i < deltaDisplays.length; i++) {
            deltaDisplays[i].innerHTML = getDisplayableNumber(this.getFinalDelta());
        }
    }

    displayFinalBtnVal () {
        const btnValDisplays = document.getElementsByClassName(this.htmlName + "_btnval_display");
        for(let i = 0; i < btnValDisplays.length; i++) {
            btnValDisplays[i].innerHTML = "+" + getDisplayableNumber(this.getFinalBtnValue());
        }
    }

    getDeltaMult() {
        return this.deltaMult;
    }

    modifyDeltaMult(mult) {
        this.deltaMult *= mult;
    }

    getFinalDelta() {
        return this.delta * this.getDeltaMult();
    }

    getBtnValMult() {
        return this.btnValMult;
    }

    modifyBtnValMult(mult) {
        this.btnValMult *= mult;
        this.displayFinalBtnVal();
    }

    getFinalBtnValue() {
        return this.btnVal * this.getBtnValMult();
    }

    modifyBtnValue(value) {
        this.btnVal += value;
        this.displayFinalBtnVal();
    }

    resourceTick(deltaTime) {
        this.modifyAmt(((deltaTime/1000)*this.delta) * this.getDeltaMult());
        this.displayAmt();
    }

    modifyAmt(value) {
        this.amt += value;
    }

    modifyDelta(value) {
        this.delta += value;
    }

    btnClicked() {
        this.modifyAmt(this.getFinalBtnValue());
    }
}

class ArcBits extends Resource {
    constructor(amt, delta, btnVal, htmlName, displayableName) {
        super(amt, delta, btnVal, htmlName, displayableName);
    }
}

class Upgrade {
    title;
    description;
    cost;
    resource; // Must be a Resource object
    buyAction;

    constructor(title, description, flavorText, cost, resource, buyAction) {
        this.title = title;
        this.description = description;
        this.flavorText = flavorText;
        this.cost = cost;
        this.resource = resource;
        this.buyAction = buyAction;
        this.isBought= false;
    }

    canBuy() {
        if((this.cost <= this.resource.amt) && !this.isBought) {
            return true;
        }
        console.log(this.title + " cannot be purchased!");
    }

    buy() {
        if (!this.canBuy()) {
            console.log(this.title + " cannot be purchased!");
            return null;
        }

        this.resource.amt -= this.cost;
        this.buyAction();
        this.isBought = true;
        console.log(this.title + " bought!");
    }
}

class UnlockCondition {

}

// ==== Globals ====
let lastTime = performance.now(); // To calculate deltaTime
let extraTimer = 0;

// RESOURCES
//let arcBits; // Lowest displayable resource amount: 0.00001
let arcBits = new ArcBits(0, 0, 0, "arcbits", "ArcBits");

// GENERATE

// OPTIONS
let notationType = 0; // 0 = default, 1 = abbreviated, 2 = engineering, 3 = exponential

const ARCBIT_UPGRADES = new Map([ // key : title, description, flavorText, cost, resource, buyAction
    ["arcKeys1", new Upgrade("More ArcKeys", "<strong>Decrypting</strong> ArcBits yields <strong>1.1x</strong> more.", "", 0.001, arcBits, () => arcBits.modifyBtnValMult(1.1))],
    ["arcKeys2", new Upgrade("Improved ArcKeys", "<strong>Decrypting</strong> ArcBits yields an additional <strong>1.25x</strong> more.", "", 0.01, arcBits, () => arcBits.modifyBtnValMult(1.25))],
    ["arcKeys3", new Upgrade("Optimized ArcKeys", "<strong>Decrypting</strong> ArcBits yields an additional <strong>1.50x</strong> more.", "", 0.1, arcBits, () => arcBits.modifyBtnValMult(1.5))],
    ["clockSpeed1", new Upgrade("Clock Speed I", "<strong>Processes</strong> generate <strong>1.05x</strong> more ArcBits/s.", "", 0.05, arcBits, () => console.log("U BOUGHT IT"))],
    ["clockSpeed2", new Upgrade("Clock Speed II", "<strong>Processes</strong> generate an additional <strong>1.1x</strong> more ArcBits/s.", "", 0.5, arcBits, () => console.log("U BOUGHT IT"))],
    ["clockSpeed3", new Upgrade("Clock Speed III", "<strong>Processes</strong> generate an additional <strong>1.25x</strong> more ArcBits/s.", "", 5, arcBits, () => console.log("U BOUGHT IT"))],
    ["arcMult1", new Upgrade("ArcMult v1.0", "<strong>Decrypting</strong> ArcBits provides a temporary multiplier to <strong>process</strong> ArcBit generation.", "", 1, arcBits, () => console.log("U BOUGHT IT"))],
]); 

function getDisplayableNumber(num) {

    let suffix = "";
    switch(notationType) {
        case 0:
            suffix = " " + DEFAULT_SUFFIXES[num >= 1000 ? Math.floor(Math.log10(num)/3) : 0];
            break;
        case 1:
            suffix = " " + ABBREVIATED_SUFFIXES[num >= 1000 ? Math.floor(Math.log10(num)/3) : 0];
            break;
        case 2:
            suffix = num < 1000 ? "" : " x 10^" + Math.floor(Math.log10(num)/3)*3;
            break;
        case 3:
            suffix = num < 1000 ? "" : "e+" + Math.floor(Math.log10(num)/3)*3;
    }
    
    let decimalCount = Math.min(num > 0.000000000001 ? Math.max(-Math.log10(num) + 2.99999, 3) : 0, 5);

    if(num >= 1000) {
        return (num/(10**(Math.floor(Math.log10(num)/3)*3))).toFixed(decimalCount) + '<span class="suffix">' + suffix + '</span>';
    }
    else {
        return num.toFixed(decimalCount);
    }
}

function displayUpgrades() {
    let upgradesHtml = ""; 

    let upgradeList = document.getElementsByClassName("upgrade_list")[0];

    ARCBIT_UPGRADES.forEach((value, key) => {
        upgradesHtml += `
            <div class="upgrade" upgrade_key="${key}">
                <h3>${value.title}</h3>
                <p>${value.description}</p>
                <p class="cost"> ${value.isBought ? '[COST_DEDUCTED]' : getDisplayableNumber(value.cost)} ${value.isBought ? '' : value.resource.displayableName}</p>
                <button class="upgrade_button ${value.isBought ? 'bought' : ''}">${value.isBought ? '[Updated]' : '[Update]'}</button>
            </div>`
    });

    upgradeList.innerHTML = upgradesHtml;
}

function displayUpgrade(upgradeKey) {
    let value = ARCBIT_UPGRADES.get(upgradeKey);
    let upgradeHtml = `
            <h3>${value.title}</h3>
            <p>${value.description}</p>
            <p class="cost"> ${value.isBought ? '[COST_DEDUCTED]' : getDisplayableNumber(value.cost)} ${value.isBought ? '' : value.resource.displayableName}</p>
            <button class="upgrade_button ${value.isBought ? 'bought' : ''}">${value.isBought ? '[Updated]' : '[Update]'}</button>`;
    let upgrade = document.querySelector(`[upgrade_key="${upgradeKey}"]`);
    upgrade.innerHTML = upgradeHtml;
}

// ======== MAIN GAME LOOP ======== //
function gameTick(currentTime) {
    let deltaTime = currentTime - lastTime;

    if (deltaTime >= 1000/REFRESH_RATE) {

        // Perform all actions that must occur every tick
        arcBits.resourceTick(deltaTime);

        extraTimer += deltaTime;
        lastTime = currentTime;
    }

    
    if (extraTimer >= AVERAGING_TIME/AVERAGING_SAMPLES) {
        arcBits.calculateGain();
        arcBits.displayAverageGain();

        extraTimer -= AVERAGING_TIME/AVERAGING_SAMPLES; // Reset the counter but keep leftover time
    }


    requestAnimationFrame(gameTick);
}

// ======== START ======== //
window.onload = function() {

    // Initialize
    //arcBits = new ArcBits(0, 0, 0.00000001, "arcbits", "ArcBits");
    arcBits.modifyBtnValue(0.0001);
    displayUpgrades();
    arcBits.displayAmt();
    arcBits.displayAverageGain();
    arcBits.displayFinalBtnVal();

    // Start the game loop
    requestAnimationFrame(gameTick);
}

// JQuery events
$(document).ready(function(){
    $(".notation_button").click(function(){
        notationType = parseInt($(this).attr("notation"));
	})

    $(".arcbits_button").click(function(){
        arcBits.btnClicked();
	})

    $(".upgrade_button").click(function(){
        const parentDiv = this.closest("div");
        let upgradeKey = parentDiv.getAttribute("upgrade_key");
        let upgrade = ARCBIT_UPGRADES.get(upgradeKey);
        if(upgrade.canBuy()) {
            upgrade.buy();
            displayUpgrade(upgradeKey);
            // Remove upgrade from UI
            parentDiv.classList.add("fade-out");
            parentDiv.addEventListener("animationend", () => {
            parentDiv.classList.remove("fade-out"); 
            parentDiv.classList.add("hidden"); 
            });
            
        }
        else {

            
        }
    })
});
