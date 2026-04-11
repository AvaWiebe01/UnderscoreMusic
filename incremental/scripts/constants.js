export class Constants {

static REFRESH_RATE = 60;

static AVERAGING_TIME = 1000; // in milliseconds
static AVERAGING_SAMPLES = 10;

static DEFAULT_SUFFIXES = ["","Thousand","Million","Billion","Trillion","Quadrillion","Quintillion","Sextillion","Septillion","Octillion","Nonillion","Decillion"];
static ABBREVIATED_SUFFIXES = ["","K","M","B","T","Q","Qi","Sx","Sp","Oc","No","Dc"];
static DATA_SIZE_ABBREVIATED_SUFFIXES = ["b","Kb","Mb","Gb","Tb","Pb","Eb","Zb","Yb","Rb","Qb","Wb"];
static DATA_SIZE_SUFFIXES = ["Bits","Kilobits","Megabits","Gigabits","Terabits","Petabits","Exabits","Zettabits","Yottabits","Ronnabits","Quettabits","Wrennbits"];

static RESOURCE_INFO = [ // htmlName, amt, delta, btnVal, displayableName
    ["arcbits", 1111110_000000_00000000_000000, 0.00010, "ArcBits"],
    //["hyperkeys", 0, 0, 0, "HyperKeys"],
];

// htmlName, amt, delta, btnVal, displayableName, initMaxCores
static CORE_INFO = ["cores", 2, 1/240, 0, "Cores", 8];

static INITIAL_UPGRADES = new Map([
    [
        "normal_upgrades_list",
        new Map([
            [   
                "arcbits",
                ["arcKeys1", "clockSpeed1"],
            ],

            /*
            [
                "resource2",
                []
            ],
            */
        ])
    ],

    [
        "archive_unlocks_list",
        new Map([
            [   
                "arcbits",
                ["fragment1"],
            ],
        ])
    ],
]);

static ALL_UPGRADES_INFO = new Map([
    [
        "normal_upgrades_list",
        new Map([ // resourceName, upgradesList
            [
                "arcbits",
                [   // ["key", "title", "description", "flavor", cost, [unlockUpgrades], (resource) => {buyAction;}],

                    // ArcBit Decryption
                    
                        /* initial upgrade */ ["arcKeys1", "More ArcKeys", "<strong>Decrypting</strong> ArcBits yields <strong>1.1x</strong> more.", "", 0.001, ["arcKeys2"], (resource) => {resource.modifyBtnValBaseMult(1.1);}],
                        ["arcKeys2", "Improved ArcKeys", "<strong>Decrypting</strong> ArcBits yields an additional <strong>1.25x</strong> more.", "", 0.01, ["arcKeys3", "arcMult1"], (resource) => {resource.modifyBtnValBaseMult(1.25);}],
                        ["arcKeys3", "Optimized ArcKeys", "<strong>Decrypting</strong> ArcBits yields an additional <strong>1.50x</strong> more.", "", 0.1, ["arcKeys4"], (resource) => {resource.modifyBtnValBaseMult(1.5);}],
                        ["arcKeys4", "Optimal ArcKeys", "<strong>Decrypting</strong> ArcBits yields an additional <strong>2x</strong> more.", "", 1, ["arcKeys5"], (resource) => {resource.modifyBtnValBaseMult(2);}],
                        ["arcKeys5", "Over-Optimal ArcKeys", "<strong>Decrypting</strong> ArcBits yields an additional <strong>3x</strong> more.", "", 10, [], (resource) => {resource.modifyBtnValBaseMult(3);}],

                    // ArcBit Processes

                        /* initial upgrade */ ["clockSpeed1", "Clock Speed I", "<strong>Processes</strong> generate <strong>1.2x</strong> more ArcBits/s.", "", 0.05, ["clockSpeed2", "coreGen1"], (resource) => {resource.modifyDeltaBaseMult(1.2);}],
                        ["clockSpeed2", "Clock Speed II", "<strong>Processes</strong> generate an additional <strong>1.6x</strong> more ArcBits/s.", "", 0.5, ["clockSpeed3"], (resource) => {resource.modifyDeltaBaseMult(1.6);}],
                        ["clockSpeed3", "Clock Speed III", "<strong>Processes</strong> generate an additional <strong>2.0x</strong> more ArcBits/s.", "", 5, [], (resource) => {resource.modifyDeltaBaseMult(2);}],

                    // Cores

                        ["coreGen1", "Stone CoreGen", "<strong>Cores</strong> generate <strong>1.5x</strong> faster.", "", 0.001, ["coreGen2"], (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(1.5);}],
                        ["coreGen2", "Iron CoreGen", "<strong>Cores</strong> generate another <strong>1.75x</strong> faster.", "", 0.001, ["coreGen3", "miniThreading"], (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(1.75);}],
                        ["coreGen3", "Emerald CoreGen", "<strong>Cores</strong> generate another <strong>2x</strong> faster.", "", 0.001, ["coreGen4"], (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(2);}],
                        ["coreGen4", "Diamond CoreGen", "<strong>Cores</strong> generate another <strong>3x</strong> faster.", "", 0.001, ["coreGen5"], (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(3);}],
                        ["coreGen5", "Archite CoreGen", "<strong>Cores</strong> generate another <strong>4x</strong> faster.", "", 0.001, [], (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(4);}],
                        
                        ["miniThreading", "Minithreading", "Increase <strong>Cores</strong> capacity by <strong>4</strong>.", "", 0.001, ["multiThreading"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(4);}],
                        ["multiThreading", "Multithreading", "Increase <strong>Cores</strong> capacity by <strong>8</strong>.", "", 0.001, ["megaThreading", "ultraboost1"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(8);}],
                        ["megaThreading", "Megathreading", "Increase <strong>Cores</strong> capacity by <strong>12</strong>.", "", 0.001, ["hyperThreading"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(12);}],
                        ["hyperThreading", "Hyperthreading", "Increase <strong>Cores</strong> capacity by <strong>20</strong>.", "", 0.001, ["miniProcessing", "proximityComputing"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(20);}],
                        
                        ["miniProcessing", "MiniProcessing", "Increase <strong>Cores</strong> capacity by <strong>100</strong>.", "", 0.001, ["multiProcessing"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(100);}],
                        ["multiProcessing", "MultiProcessing", "Increase <strong>Cores</strong> capacity by <strong>200</strong>.", "", 0.001, ["megaProcessing"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(200);}],
                        ["megaProcessing", "MegaProcessing", "Increase <strong>Cores</strong> capacity by <strong>400</strong>.", "", 0.001, ["hyperProcessing"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(400);}],
                        ["hyperProcessing", "HyperProcessing", "Increase <strong>Cores</strong> capacity by <strong>800</strong>.", "", 0.001, ["quantumProcessing"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(800);}],
                        ["quantumProcessing", "Quantum Processing", "Increase <strong>Cores</strong> capacity by <strong>2000</strong>.", "", 0.001, [], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(2000);}],

                    // Unlockable Multipliers

                        // ArcMult

                            ["arcMult1", "ArcMult v1.0", "<strong>Decrypting</strong> ArcBits provides a temporary multiplier to <strong>decryption</strong> ArcBit generation.", "", 0.001, ["arcMult2", "arcMultOverclock1", "arcMultEfficiency1"], (resource) => {resource.addBtnValMultSource("arcMult");}],
                            ["arcMult2", "ArcMult v2.0", "<strong>Decrypting</strong> ArcBits also provides a temporary multiplier to <strong>process</strong> ArcBit generation.", "", 0.002, [], (resource) => {resource.addDeltaMultSource("arcMult");}],

                            ["arcMultOverclock1", "ArcMult: Overclock I", "<strong>ArcMult</strong> gains <strong>2x</strong> more multiplier per click.", "", 0.003, ["arcMultOverclock2"], (resource) => {resource.gameData.multipliers.get("arcMult").increaseFactor *= 2;}],
                            ["arcMultOverclock2", "ArcMult: Overclock II", "<strong>ArcMult</strong> gains another <strong>2x</strong> more multiplier per click.", "", 0.003, [], (resource) => {resource.gameData.multipliers.get("arcMult").increaseFactor *= 2;}],

                            ["arcMultEfficiency1", "ArcMult: Efficiency+", "<strong>ArcMult</strong> decays <strong>2x</strong> slower.", "", 0.004, ["arcMultEfficiency2"], (resource) => {resource.gameData.multipliers.get("arcMult").decayFactor *= 0.5;}],
                            ["arcMultEfficiency2", "ArcMult: Efficiency++", "<strong>ArcMult</strong> decays another <strong>2x</strong> slower.", "", 0.004, ["arcMultEfficiency3"], (resource) => {resource.gameData.multipliers.get("arcMult").decayFactor *= 0.5;}],
                            ["arcMultEfficiency3", "ArcMult: Efficiency+++", "<strong>ArcMult</strong> decays another <strong>2x</strong> slower.", "", 0.004, [], (resource) => {resource.gameData.multipliers.get("arcMult").decayFactor *= 0.5;}],

                        // Ultraboost

                            ["ultraboost1", "Ultraboost", "Each new <strong>Core</strong> generated gives a permanent <strong>+1%</strong> multiplier to <strong>process</strong> ArcBit generation.", "", 0.001, ["ultraboost2"], (resource) => {resource.addDeltaMultSource("ultraboost");}],
                            ["ultraboost2", "Ultraboost: Dual Core", "<strong>Ultraboost</strong> now grants <strong>+2%</strong> per <strong>Core</strong> generated.", "", 0.001, ["ultraboost3"], (resource) => {resource.gameData.multipliers.get("ultraboost").perCoreMult = 0.02;}],
                            ["ultraboost3", "Ultraboost: Quad Core", "<strong>Ultraboost</strong> now grants <strong>+4%</strong> per <strong>Core</strong> generated.", "", 0.001, [], (resource) => {resource.gameData.multipliers.get("ultraboost").perCoreMult = 0.4;}],

                            ["proximityComputing", "Proximity Computing", "Each unused <strong>Core</strong> increases <strong>process</strong> ArcBit generation by <strong>+5%</strong>", "", 0.001, ["proximityComputingYield1"], (resource) => {resource.addDeltaMultSource("proximityComputing");}],
                            ["proximityComputingYield1", "Proximity Computing: Yield+", "Increases the <strong>Proximity Computing</strong> boost per unused <strong>Core</strong> to <strong>+10%</strong>.", "", 0.001, ["proximityComputingYield2"], (resource) => {resource.gameData.multipliers.get("proximityComputing").perCoreMult = 0.1;}],
                            ["proximityComputingYield2", "Proximity Computing: Yield++", "Increases the <strong>Proximity Computing</strong> boost per unused <strong>Core</strong> to <strong>+15%</strong>.", "", 0.001, [], (resource) => {resource.gameData.multipliers.get("proximityComputing").perCoreMult = 0.15;}],
                    
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
        new Map([ // fragmentName, title, description, flavorText, cost, unlockFunction
            [
                "arcbits",
                [
                    ["fragment1", "Fragment 0", "HyperI/O Voice Transmission #1A70032E", "", 1_000, ["fragment2", "fragment3", "fragment4"], (resource) => resource.gameData.archive.unlockFragment("fragment_0")],
                    ["fragment2", "Fragment 0.5", "Codex Partition #2E830AB4", "", 1_000_000, [], (resource) => resource.gameData.archive.unlockFragment("fragment_0.5")],
                    ["fragment3", "Fragment 1", "HyperI/O Camera #3E9EFFF4 Audio Feed", "", 1_000_000_000, [], (resource) => resource.gameData.archive.unlockFragment("fragment_1")],
                    ["fragment4", "Fragment 2", "HyperI/O Voice Transmission #1A7F327E", "", 1_000_000_000_000, ["fragment5"], (resource) => resource.gameData.archive.unlockFragment("fragment_2")],
                    ["fragment5", "Fragment 3", "New Archon Camera #112D8A39 Audio Feed", "", 1_000_000_000_000_000, ["fragment6", "fragment7"], (resource) => resource.gameData.archive.unlockFragment("fragment_3")],
                    ["fragment6", "Fragment 3.5", "Codex Partition #448A120F", "", 1_000_000_000_000_000_000, [], (resource) => resource.gameData.archive.unlockFragment("fragment_3.5")],
                    ["fragment7", "Fragment 4", "HyperI/O Camera #34C1D859 Audio Feed", "", 1_000_000_000_000_000_000_000, ["fragment8"], (resource) => resource.gameData.archive.unlockFragment("fragment_4")],
                    ["fragment8", "Final Fragment", "The End.", "", 1_000_000_000_000_000_000_000_000, [], (resource) => resource.gameData.archive.unlockFragment("fragment_final")],
                ]
            ],
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
        "fragment_0",
        ["Fragment 0", "HyperI/O Voice Transmission #1A70032E - Central District, 08:49 PM", "/archive/A-CNTRL0"]
    ],

    [  
        "fragment_0.5",
        ["Fragment 0.5", "Codex Partition #2E830AB4 - Onyx’s Logbook, Entry 1", "/archive/B-0NYX01"]
    ],

    [  
        "fragment_1",
        ["Fragment 1", "HyperI/O Camera #3E9EFFF4 Audio Feed - Hyper Beam HQ,  12:41 AM", "/archive/C-LEVEL0"]
    ],

    [  
        "fragment_2",
        ["Fragment 2", "HyperI/O Voice Transmission #1A7F327E - Hyper Beam HQ, 10:22 PM", "/archive/D-MSG010"]
    ],

    [  
        "fragment_3",
        ["Fragment 3", "New Archon Camera #112D8A39 Audio Feed - Lotus Apartment Complex, 12:37 AM", "/archive/E-KL32FA"]
    ],

    [  
        "fragment_3.5",
        ["Fragment 3.5", "Codex Partition #448A120F - Onyx’s Logbook, Entry 2", "/archive/F-020NYX"]
    ],

    [  
        "fragment_4",
        ["Fragment 4", "HyperI/O Camera #34C1D859 Audio Feed - Hyper Beam HQ Admin Office,  6:00 AM", "/archive/G-ADMIN1"]
    ],

    [  
        "fragment_final",
        ["Final Fragment", "HyperI/O Document #492133AE - Assault Phases [Restricted]", "/archive/Z-PHASES"]
    ],
]);

static OBFUSCATION_CHARS = "0123456789ABCDEF%!$#?@";
static OBFUSCATION_LENGTH = 16;

    constructor() {
        console.log("Do not instantiate this class, or ELSE.");
    }
}