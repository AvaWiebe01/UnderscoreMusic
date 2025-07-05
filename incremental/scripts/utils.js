import { Constants } from "./constants.js";

export class Utils {
    static notationType = 0; // 0 = default, 1 = abbreviated, 2 = engineering, 3 = exponential, 4 = standard decimal
    static stickyResources = true;

    constructor() {
        this.notationType = 0; // 0 = default, 1 = abbreviated, 2 = engineering, 3 = exponential, 4 = standard decimal
    }

    static getDisplayableNumber(num, hasDecimals = true) {
        let suffix = "";
        switch(this.notationType) {
            case 0:
                suffix = " " + Constants.DEFAULT_SUFFIXES[num >= 1000 ? Math.floor(Math.log10(num)/3) : 0];
                break;
            case 1:
                suffix = " " + Constants.ABBREVIATED_SUFFIXES[num >= 1000 ? Math.floor(Math.log10(num)/3) : 0];
                break;
            case 2:
                suffix = num < 1000 ? "" : " x 10^" + Math.floor(Math.log10(num)/3)*3;
                break;
            case 3:
                suffix = num < 1000 ? "" : "e+" + Math.floor(Math.log10(num)/3)*3;
                break;
            case 4: // fuck it, don't shorten it at all
                return num.toFixed((num < 1000) ? 5 : 0);

        }
        
        let decimalCount = Math.min(num > 0.000000000001 ? Math.max(-Math.log10(num) + 2.99999, 3) : 0, 5);

        if(num >= 1000) {
            return (num/(10**(Math.floor(Math.log10(num)/3)*3))).toFixed(decimalCount) + '<span class="suffix">' + suffix + '</span>';
        }
        else {
            return num.toFixed(hasDecimals ? decimalCount : 0);
        }
    }

    static updateNotation(newNotation) {
        this.notationType = newNotation
    }

    static toggleStickyResources(target) {
        this.stickyResources = !this.stickyResources;
        if(this.stickyResources) { 
            document.getElementsByClassName("resource_panel")[0].style.position = "sticky";
            document.getElementsByClassName("resource_panel")[0].style.top = "1rem";
            target.innerHTML = "Disable";
        }
        else {
            document.getElementsByClassName("resource_panel")[0].style.position = "relative";
            document.getElementsByClassName("resource_panel")[0].style.top = "0";
            target.innerHTML = "Enable";
        }
    }
}
