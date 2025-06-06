export class Constants {
/*REFRESH_RATE;
AVERAGING_TIME;
AVERAGING_SAMPLES;
DEFAULT_SUFFIXES;
ABBREVIATED_SUFFIXES;
RESOURCE_INFO;
ALL_UPGRADES_INFO;*/

static REFRESH_RATE = 60;

static AVERAGING_TIME = 1000; // in milliseconds
static AVERAGING_SAMPLES = 10;

static DEFAULT_SUFFIXES = ["","Thousand","Million","Billion","Trillion","Quadrillion","Quintillion","Sextillion","Septillion","Octillion","Nonillion","Decillion"];
static ABBREVIATED_SUFFIXES = ["","K","M","B","T","Q","Qi","Sx","Sp","Oc","No","Dc"];

// The next two constants must have the same amount of entries

static RESOURCE_INFO = [ // htmlName, amt, delta, btnVal, displayableName
    ["arcbits", 0, 1, 0.00010, "ArcBits"],
];

static ALL_UPGRADES_INFO = new Map([ // resourceName, upgradesList
    [
        "arcbits",
        [ // key : title, description, flavorText, cost, buyAction
            ["arcKeys1", "More ArcKeys", "<strong>Decrypting</strong> ArcBits yields <strong>1.1x</strong> more.", "", 0.001, (resource) => resource.modifyBtnValMult(1.1)],
            ["arcKeys2", "Improved ArcKeys", "<strong>Decrypting</strong> ArcBits yields an additional <strong>1.25x</strong> more.", "", 0.01, (resource) => resource.modifyBtnValMult(1.25)],
            ["arcKeys3", "Optimized ArcKeys", "<strong>Decrypting</strong> ArcBits yields an additional <strong>1.50x</strong> more.", "", 0.1, (resource) => resource.modifyBtnValMult(1.5)],
            ["clockSpeed1", "Clock Speed I", "<strong>Processes</strong> generate <strong>1.05x</strong> more ArcBits/s.", "", 0.05, (resource) => console.log("U BOUGHT IT")],
            ["clockSpeed2", "Clock Speed II", "<strong>Processes</strong> generate an additional <strong>1.1x</strong> more ArcBits/s.", "", 0.5, (resource) => console.log("U BOUGHT IT")],
            ["clockSpeed3", "Clock Speed III", "<strong>Processes</strong> generate an additional <strong>1.25x</strong> more ArcBits/s.", "", 5, (resource) => console.log("U BOUGHT IT")],
            ["arcMult1", "ArcMult v1.0", "<strong>Decrypting</strong> ArcBits provides a temporary multiplier to <strong>process</strong> ArcBit generation.", "", 1, (resource) => console.log("U BOUGHT IT")],
        ]
    ],
]);

    constructor() {
    }
}