const REFRESH_RATE = 50;
const DEFAULT_SUFFIXES = ["","Thousand","Million","Billion","Trillion","Quadrillion","Quintillion","Sextillion","Septillion","Octillion","Nonillion","Decillion"];
const ABBREVIATED_SUFFIXES = ["","K","M","B","T","Q","Qi","Sx","Sp","Oc","No","Dc"];

class Resource {
    constructor() {
        this.amt = 0;
        this.delta = 0;
        this.btnVal = 0;
    }
}


// RESOURCES
let resource1; // Lowest displayable resource amount: 0.00000001
let resource1Delta;
let resource1DecimalCount;
let resource1DeltaMultiplier = 1;

// GENERATE
let resource1ButtonValue;
let resource1ButtonValueMultiplier = 1;

// OPTIONS
let notationType = 0; // 0 = default, 1 = abbreviated, 2 = engineering, 3 = exponential

// debug
resource1 = 0;
resource1Delta = 1.01234;
resource1ButtonValue = 0;

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
    
    let decimalCount = Math.min(num > 0.000000000001 ? Math.max(-Math.log10(num) + 7, 3) : 3, 8);

    if(num >= 1000) {
        return (num/(10**(Math.floor(Math.log10(num)/3)*3))).toFixed(decimalCount) + '<span class="suffix">' + suffix + '</span>';
    }
    else {
        return num.toFixed(decimalCount);
    }
}

function updateResources() {

    // Update all resource counts
    resource1 = resource1 + ((resource1Delta/REFRESH_RATE) * resource1DeltaMultiplier);
    
    // Get all display elements
    const resource1Displays = document.getElementsByClassName("resource1_display");

    // Update html for all display elements
    for(let i = 0; i < resource1Displays.length; i++) {
        resource1Displays[i].innerHTML = getDisplayableNumber(resource1); // Only display contents of the two highest buckets
    }
}

function resource1ButtonClick() {

        resource1 = resource1 + (resource1ButtonValue * resource1ButtonValueMultiplier);
}

function updateResource1ButtonValue(newValue) {

    resource1ButtonValue = newValue;

    const resource1ButtonValueDisplays = document.getElementsByClassName("resource1_button_value_display");
    
    for(let i = 0; i < resource1ButtonValueDisplays.length; i++) {
        resource1ButtonValueDisplays[i].innerHTML = "+" + getDisplayableNumber(resource1ButtonValue);
    }
}

function updateResource1Delta() {

}

window.onload = function() {
    setInterval(updateResources, 1000/REFRESH_RATE);
    updateResource1ButtonValue(1.234);
    document.getElementsByClassName("resource1_display")[0].innerHTML = "Fallback Text";
}

// JQuery events
$(document).ready(function(){
    $(".notation_button").click(function(){
        notationType = parseInt($(this).attr("notation"));
	})

    $(".resource1_button").click(function(){
        resource1ButtonClick();
	})
});
