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
static DATA_SIZE_ABBREVIATED_SUFFIXES = ["b","Kb","Mb","Gb","Tb","Pb","Eb","Zb","Yb","Rb","Qb","Wb"];
static DATA_SIZE_SUFFIXES = ["Bits","Kilobits","Megabits","Gigabits","Terabits","Petabits","Exabits","Zettabits","Yottabits","Ronnabits","Quettabits","Wrennbits"];

static RESOURCE_INFO = [ // htmlName, amt, delta, btnVal, displayableName
    ["arcbits", 1111110, 0.00010, "ArcBits"],
    //["hyperkeys", 0, 0, 0, "HyperKeys"],
];

// htmlName, amt, delta, btnVal, displayableName, initMaxCores
static CORE_INFO = ["cores", 2, 1/240, 0, "Cores", 8];

static ALL_UPGRADES_INFO = new Map([
    [
        "normal_upgrades_list",
        new Map([ // resourceName, upgradesList
            [
                "arcbits",
                [   // ["key", "title", "description", "flavor", cost, (resource) => {buyAction;}],

                    // ArcBit Decryption
                    
                        ["arcKeys1", "More ArcKeys", "<strong>Decrypting</strong> ArcBits yields <strong>1.1x</strong> more.", "", 0.001, (resource) => {resource.modifyBtnValBaseMult(1.1);}],
                        ["arcKeys2", "Improved ArcKeys", "<strong>Decrypting</strong> ArcBits yields an additional <strong>1.25x</strong> more.", "", 0.01, (resource) => {resource.modifyBtnValBaseMult(1.25);}],
                        ["arcKeys3", "Optimized ArcKeys", "<strong>Decrypting</strong> ArcBits yields an additional <strong>1.50x</strong> more.", "", 0.1, (resource) => {resource.modifyBtnValBaseMult(1.5);}],
                        ["arcKeys4", "Optimal ArcKeys", "<strong>Decrypting</strong> ArcBits yields an additional <strong>2x</strong> more.", "", 1, (resource) => {resource.modifyBtnValBaseMult(2);}],
                        ["arcKeys5", "Over-Optimal ArcKeys", "<strong>Decrypting</strong> ArcBits yields an additional <strong>3x</strong> more.", "", 10, (resource) => {resource.modifyBtnValBaseMult(3);}],

                    // ArcBit Processes

                        ["clockSpeed1", "Clock Speed I", "<strong>Processes</strong> generate <strong>1.2x</strong> more ArcBits/s.", "", 0.05, (resource) => {resource.modifyDeltaBaseMult(1.2);}],
                        ["clockSpeed2", "Clock Speed II", "<strong>Processes</strong> generate an additional <strong>1.6x</strong> more ArcBits/s.", "", 0.5, (resource) => {resource.modifyDeltaBaseMult(1.6);}],
                        ["clockSpeed3", "Clock Speed III", "<strong>Processes</strong> generate an additional <strong>2.0x</strong> more ArcBits/s.", "", 5, (resource) => {resource.modifyDeltaBaseMult(2);}],

                    // Cores

                        ["coreGen1", "Stone CoreGen", "<strong>Cores</strong> generate <strong>1.5x</strong> faster.", "", 0.001, (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(1.5);}],
                        ["coreGen2", "Iron CoreGen", "<strong>Cores</strong> generate another <strong>1.75x</strong> faster.", "", 0.001, (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(1.75);}],
                        ["coreGen3", "Emerald CoreGen", "<strong>Cores</strong> generate another <strong>2x</strong> faster.", "", 0.001, (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(2);}],
                        ["coreGen4", "Diamond CoreGen", "<strong>Cores</strong> generate another <strong>3x</strong> faster.", "", 0.001, (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(3);}],
                        ["coreGen5", "Archite CoreGen", "<strong>Cores</strong> generate another <strong>4x</strong> faster.", "", 0.001, (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(4);}],
                        
                        ["miniThreading", "Minithreading", "Increase <strong>Cores</strong> capacity by <strong>4</strong>.", "", 0.001, (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(4);}],
                        ["multiThreading", "Multithreading", "Increase <strong>Cores</strong> capacity by <strong>8</strong>.", "", 0.001, (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(8);}],
                        ["megaThreading", "Megathreading", "Increase <strong>Cores</strong> capacity by <strong>12</strong>.", "", 0.001, (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(12);}],
                        ["hyperThreading", "Hyperthreading", "Increase <strong>Cores</strong> capacity by <strong>20</strong>.", "", 0.001, (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(20);}],
                        
                        ["miniProcessing", "MiniProcessing", "Increase <strong>Cores</strong> capacity by <strong>100</strong>.", "", 0.001, (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(100);}],
                        ["multiProcessing", "MultiProcessing", "Increase <strong>Cores</strong> capacity by <strong>200</strong>.", "", 0.001, (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(200);}],
                        ["megaProcessing", "MegaProcessing", "Increase <strong>Cores</strong> capacity by <strong>400</strong>.", "", 0.001, (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(400);}],
                        ["hyperProcessing", "HyperProcessing", "Increase <strong>Cores</strong> capacity by <strong>800</strong>.", "", 0.001, (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(800);}],
                        ["quantumProcessing", "Quantum Processing", "Increase <strong>Cores</strong> capacity by <strong>2000</strong>.", "", 0.001, (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(2000);}],

                    // Unlockable Multipliers

                        // ArcMult

                            ["arcMult1", "ArcMult v1.0", "<strong>Decrypting</strong> ArcBits provides a temporary multiplier to <strong>decryption</strong> ArcBit generation.", "", 0.001, (resource) => {resource.addBtnValMultSource("arcMult");}],
                            ["arcMult2", "ArcMult v2.0", "<strong>Decrypting</strong> ArcBits also provides a temporary multiplier to <strong>process</strong> ArcBit generation.", "", 0.002, (resource) => {resource.addDeltaMultSource("arcMult");}],

                            ["arcMultOverclock1", "ArcMult: Overclock I", "<strong>ArcMult</strong> gains <strong>2x</strong> more multiplier per click.", "", 0.003, (resource) => {resource.gameData.multipliers.get("arcMult").increaseFactor *= 2;}],
                            ["arcMultOverclock2", "ArcMult: Overclock II", "<strong>ArcMult</strong> gains another <strong>2x</strong> more multiplier per click.", "", 0.003, (resource) => {resource.gameData.multipliers.get("arcMult").increaseFactor *= 2;}],

                            ["arcMultEfficiency1", "ArcMult: Efficiency+", "<strong>ArcMult</strong> decays <strong>2x</strong> slower.", "", 0.004, (resource) => {resource.gameData.multipliers.get("arcMult").decayFactor *= 0.5;}],
                            ["arcMultEfficiency2", "ArcMult: Efficiency++", "<strong>ArcMult</strong> decays another <strong>2x</strong> slower.", "", 0.004, (resource) => {resource.gameData.multipliers.get("arcMult").decayFactor *= 0.5;}],
                            ["arcMultEfficiency3", "ArcMult: Efficiency+++", "<strong>ArcMult</strong> decays another <strong>2x</strong> slower.", "", 0.004, (resource) => {resource.gameData.multipliers.get("arcMult").decayFactor *= 0.5;}],

                        // Ultraboost

                            ["ultraboost1", "Ultraboost", "Each new <strong>Core</strong> generated gives a permanent <strong>+1%</strong> multiplier to <strong>process</strong> ArcBit generation.", "", 0.001, (resource) => {resource.addDeltaMultSource("ultraboost");}],
                            ["ultraboost2", "Ultraboost: Dual Core", "<strong>Ultraboost</strong> now grants <strong>+2%</strong> per <strong>Core</strong> generated.", "", 0.001, (resource) => {resource.gameData.multipliers.get("ultraboost").perCoreMult = 0.02;}],
                            ["ultraboost3", "Ultraboost: Quad Core", "<strong>Ultraboost</strong> now grants <strong>+4%</strong> per <strong>Core</strong> generated.", "", 0.001, (resource) => {resource.gameData.multipliers.get("ultraboost").perCoreMult = 0.4;}],

                            ["proximityComputing", "Proximity Computing", "Each unused <strong>Core</strong> increases <strong>process</strong> ArcBit generation by <strong>+5%</strong>", "", 0.001, (resource) => {resource.addDeltaMultSource("proximityComputing");}],
                            ["proximityComputingYield1", "Proximity Computing: Yield+", "Increases the <strong>Proximity Computing</strong> boost per unused <strong>Core</strong> to <strong>+10%</strong>.", "", 0.001, (resource) => {resource.gameData.multipliers.get("proximityComputing").perCoreMult = 0.1;}],
                            ["proximityComputingYield2", "Proximity Computing: Yield++", "Increases the <strong>Proximity Computing</strong> boost per unused <strong>Core</strong> to <strong>+15%</strong>.", "", 0.001, (resource) => {resource.gameData.multipliers.get("proximityComputing").perCoreMult = 0.15;}],
                    
                    // Unlockable Tabs

                    // Unlockable Systems (new UI elements in existing tabs)
                ]
            ],

            /*
            [
                "resource2",
                [

                ]
            ],
            */
        ])
    ],

    /*
    [
        "hypermod_upgrades_list",
        new Map([ // resourceName, upgradesList
            [
                "arcbits",
                [
                    ["archive1", "Archive 01", "Hi!", "", 1_000, (resource) => console.log("Unlock Archive 01")],
                    ["archive2", "Archive 02", "", "", 1_000_000, (resource) => console.log("Unlock Archive 02")],
                    ["archive3", "Archive 03", "", "", 1_000_000_000, (resource) => console.log("Unlock Archive 03")],
                    ["archive4", "Archive 04", "", "", 1_000_000_000_000, (resource) => console.log("Unlock Archive 04")],
                ]
            ],

            
            [
                "resource2",
                [

                ]
            ],
            
        ])
    ],
    */

    [
        "archive_unlocks_list",
        new Map([ // resourceName, upgradesList
            [
                "arcbits",
                [
                    ["fragment1", "Fragment 01", "Hi!", "", 1_000, (resource) => resource.gameData.archive.unlockFragment("fragment_1")],
                    ["fragment2", "Fragment 02", "", "", 1_000_000, (resource) => resource.gameData.archive.unlockFragment("fragment_2")],
                    ["fragment3", "Fragment 03", "", "", 1_000_000_000, (resource) => resource.gameData.archive.unlockFragment("fragment_3")],
                    ["fragment4", "Fragment 04", "", "", 1_000_000_000_000, (resource) => resource.gameData.archive.unlockFragment("fragment_4")],
                    ["fragment5", "Fragment 05", "", "", 1_000_000_000_000_000, (resource) => resource.gameData.archive.unlockFragment("fragment_5")],
                    ["fragment6", "Fragment 06", "", "", 1_000_000_000_000_000_000, (resource) => resource.gameData.archive.unlockFragment("fragment_6")],
                ]
            ],

            /*
            [
                "resource2",
                [

                ]
            ],
            */
        ])
    ],
]);

static UPGRADE_BUTTON_CONTENT = new Map([
    [
        "normal_upgrades_list",
        new Map([
            ["default", "[Update]"],
            ["cannot_buy", "[Invalid]"],
            ["purchased", "[Updated]"],
        ])
    ],

    /*
    [
        "hypermod_upgrades_list",
        new Map([
            ["default", "[Apply HyperMod]"],
            ["cannot_buy", "[Invalid]"],
            ["purchased", "[HyperMod Successful]"],
        ])
    ],
    */

    [
        "archive_unlocks_list",
        new Map([
            ["default", "[Recover Fragment]"],
            ["cannot_buy", "[Unrecoverable]"],
            ["purchased", "[Fragment Recovered]"],
        ])
    ],
]);

static ALL_PROCESSES_INFO = new Map([
    [
        "arcbits",
        [ // key: title, description, flavorText, baseCost, coreReq, baseProduction
            ["linkCrawler", "Link Crawler", "Follows links in the Codex to gather surface data.", "", 0.01, 1, 0.002],
            ["hyperReader", "HyperReader++", "Reads hidden hypertext to parse deeper data.", "", 2, 3, 0.04],
            ["infiltrator", "1nfiltr4t0r", "Brute forces passwords to read hidden files.", "", 128, 8, 1],
            ["keyBreak", "KeyBreak v0.7-internaluse", "Uses advanced decryption to breach secure servers.", "", 24000, 15, 236],
            ["uberhack", "[-UBERHACK-]", "Combines several attacks into a single devastating payload.", "", 306500, 36, 8421],
            ["bladeSys", "BladeSys by Wrenn Software", "Strikes a blade through any cryptography issue with dominating precision.", "", 3200000, 80, 8],
        ]
    ],

    /*
    [
        "resource2",
        [

        ]
    ],
    */
]);

static FRAGMENTS_INFO = new Map([
    [   // key: title, description, link
        "fragment_1",
        ["Fragment 01", "A conversation where blah blah blah blah whatever blah helloooo helloo there my furry friend", "/archive/N0Y4X1"]
    ],

    [  
        "fragment_2",
        ["Fragment 02", "A conversation", "/archive/AVSCR2"]
    ],

    [  
        "fragment_3",
        ["Fragment 03", "A conversation", "/archive/KL32FA"]
    ],

    [  
        "fragment_4",
        ["Fragment 04", "A conversation", "/archive/FR21EQ"]
    ],

    [  
        "fragment_5",
        ["Fragment 05", "A conversation", "/archive/FR21EQ"]
    ],

    [  
        "fragment_6",
        ["Fragment 06", "A conversation", "/archive/FR21EQ"]
    ],
]);

static OBFUSCATION_CHARS = "0123456789ABCDEF%!$#?@";
static OBFUSCATION_LENGTH = 16;

    constructor() {
        console.log("Do not instantiate this class, or ELSE.");
    }
}