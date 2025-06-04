const REFRESH_RATE = 50;
const DEFAULT_SUFFIXES = ["","Thousand","Million","Billion","Trillion","Quadrillion","Quintillion","Sextillion","Septillion","Octillion","Nonillion","Decillion"];
const ABBREVIATED_SUFFIXES = ["","K","M","B","T","Q","Qi","Sx","Sp","Oc","No","Dc"];
const RESOURCE_LENGTH = 50;

// RESOURCES
let resource1 = []; resource1.length = RESOURCE_LENGTH; resource1.fill(0); // [0] = ^-6 to ^3; [1] = ^3 to ^6; [2] = ^6 to ^9; [3] = ^9 to ^12; [4] = ^12 to ^15; and so on
let resource1Delta = []; resource1Delta.length = RESOURCE_LENGTH; resource1Delta.fill(0);
let resource1DecimalCount;
let resource1DeltaMultiplier = 1;

// GENERATE
let resource1ButtonValue = []; resource1ButtonValue.length = RESOURCE_LENGTH; resource1ButtonValue.fill(0);
let resource1ButtonValueMultiplier = 1;

// OPTIONS
let notationType = 0; // 0 = default, 1 = abbreviated, 2 = engineering, 3 = exponential

// debug
resource1[0] = 0; resource1[1] = 0; resource1[2] = 0; resource1[3] = 0; resource1[4] = 0; resource1[5] = 0;
resource1Delta[0] = 0; resource1Delta[1] = 0; resource1Delta[2] = 0; resource1Delta[3] = 0; resource1Delta[4] = 0; resource1Delta[5] = 0;
resource1ButtonValue[0] = 1;

function updateResources() {
    let highestNonZeroBucket = 0;
    let resource1Suffix = "";
    let resource1DisplayNumber = 0;

    // Update all resource counts
    highestNonZeroBucket = 0;

    for (let i = 0; i < Math.min(resource1.length, resource1Delta.length); i++) {
        resource1[i] = resource1[i] + ((resource1Delta[i]/REFRESH_RATE) * resource1DeltaMultiplier);
        console.log(resource1.length + resource1Delta.length);
        if (Math.abs(resource1[i]) > 0.000000000001) {
            highestNonZeroBucket = i;
            console.log("Resource1: New highest non-zero bucket " + highestNonZeroBucket);
        }

        if(resource1[i] >= 1000) {
            resource1[i+1] = resource1[i+1] + resource1[i]/1000;
            resource1[i] = 0;
            console.log("Resource1 Overflow! " + resource1[i+1]);
        }
    }

    // Decide number of decimal places in display
    resource1DecimalCount = highestNonZeroBucket == 0 && resource1[0] > 0.000000000001 ? Math.max(-Math.log10(resource1[0]) + 4, 3) : 3; // Dynamic decimal place for bucket 0, otherwise no decimal places

    // Get all display elements
    const resource1Displays = document.getElementsByClassName("resource1_display");

    // Decide suffix for resource amounts
    switch(notationType) {
        case 0:
            suffix = " " + DEFAULT_SUFFIXES[highestNonZeroBucket];
            break;
        case 1:
            suffix = " " + ABBREVIATED_SUFFIXES[highestNonZeroBucket];
            break;
        case 2:
            suffix = highestNonZeroBucket == 0 ? "" : " x 10^" + highestNonZeroBucket*3;
            break;
        case 3:
            suffix = highestNonZeroBucket == 0 ? "" : "e+" + highestNonZeroBucket*3;
    }
    

    // Update html for all display elements
    for(let i = 0; i < resource1Displays.length; i++) {
        resource1DisplayNumber = highestNonZeroBucket == 0 ? resource1[highestNonZeroBucket] : resource1[highestNonZeroBucket] + resource1[highestNonZeroBucket-1]/1000;
        
        //resource1DisplayNumber = resource1[highestNonZeroBucket];
        resource1Displays[i].innerHTML = resource1DisplayNumber.toFixed(resource1DecimalCount) + "<strong>" + suffix + "<\strong>"; // Only display contents of the two highest buckets
    }
}

function resource1ButtonClick() {
    for (let i = 0; i < resource1ButtonValue.length; i++) {
        resource1[i] = resource1[i] + (resource1ButtonValue[i] * resource1ButtonValueMultiplier);
    }
}

function updateResource1ButtonValue(addValue, bucketNum) {

    for (let i = 0; i < resource1ButtonValue.length; i++) {

        resource1ButtonValue[bucket] += addValue;

        if(resource1[i] >= 1000) {
            resource1[i+1] = resource1[i+1] + resource1[i]/1000;
            resource1[i] = 0;
            console.log("Resource1ButtonValue Overflow! " + resource1[i+1]);
        }
    }
}

function updateResource1Delta() {

}

window.onload = function() {
    setInterval(updateResources, 1000/REFRESH_RATE);
    document.getElementsByClassName("resource1_display")[0].innerHTML = "Testing";
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
