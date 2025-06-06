import { Constants } from "./constants.js";

export class Utils {
    notationType;

    constructor() {
        this.notationType = 0; // 0 = default, 1 = abbreviated, 2 = engineering, 3 = exponential
    }

    static getDisplayableNumber(num) {
        let suffix = "";
        switch(this.notationType) {
            case 0:
                suffix = " " + this.CONSTS.DEFAULT_SUFFIXES[num >= 1000 ? Math.floor(Math.log10(num)/3) : 0];
                break;
            case 1:
                suffix = " " + this.CONSTS.ABBREVIATED_SUFFIXES[num >= 1000 ? Math.floor(Math.log10(num)/3) : 0];
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

    static updateNotation(newNotation) {
        this.notationType = newNotation
    }
}
