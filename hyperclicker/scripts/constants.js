import { Utils } from "./utils.js";
import { unlockResource } from "./resources.js";
import { unlockHyperMod } from "./hypermods.js";

export class Constants {

static REFRESH_RATE = 60;

static AVERAGING_TIME = 1000; // in milliseconds
static AVERAGING_SAMPLES = 10;

static AUTOSAVE_TICKS = 3600 // save every 3600 game ticks

static DEFAULT_SUFFIXES = ["","Thousand","Million","Billion","Trillion","Quadrillion","Quintillion","Sextillion","Septillion","Octillion","Nonillion","Decillion"];
static ABBREVIATED_SUFFIXES = ["","K","M","B","T","Q","Qi","Sx","Sp","Oc","No","Dc"];
static DATA_SIZE_ABBREVIATED_SUFFIXES = ["b","Kb","Mb","Gb","Tb","Pb","Eb","Zb","Yb","Rb","Qb","Wb"];
static DATA_SIZE_SUFFIXES = ["Bits","Kilobits","Megabits","Gigabits","Terabits","Petabits","Exabits","Zettabits","Yottabits","Ronnabits","Quettabits","Wrennbits"];

static RESOURCE_INFO = [ // htmlName, amt, delta, btnVal, displayableName
    ["arcbits", 111111111110, 0.00010, "ArcBits"],
    ["hyperkeys", 0, 0.00001, "HyperKeys"],
    ["nullpointers", 0, 0, "NullPointers"],
    //["arcbits", 1111110_000000_00000000_000000, 0.00010, "ArcBits"],
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
                ["arcbitBtn1", "arcbitProc1", "tab1"],
            ],
        ])
    ],

    [
        "hypermod_upgrades_list",
        new Map([
            [
                "hyperkeys",
                ["hypermod1", "hypermod2"],
            ],
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
                    
                        /* initial upgrade */ ["arcbitBtn1", "More ArcBits", "<strong>Decrypting</strong> ArcBits yields <strong>1.25x</strong> more.", "", 0.001, ["arcbitBtn2"], (resource) => {resource.modifyBtnValBaseMult(1.25);}],
                        ["arcbitBtn2", "Improved ArcBits", "<strong>Decrypting</strong> ArcBits yields an additional <strong>1.50x</strong> more.", "", 0.004, ["arcbitBtn3", "arcMult1"], (resource) => {resource.modifyBtnValBaseMult(1.5);}],
                        ["arcbitBtn3", "Optimized ArcBits", "<strong>Decrypting</strong> ArcBits yields an additional <strong>2x</strong> more.", "", 0.02, ["arcbitBtn4"], (resource) => {resource.modifyBtnValBaseMult(2);}],
                        ["arcbitBtn4", "Optimal ArcBits", "<strong>Decrypting</strong> ArcBits yields an additional <strong>3x</strong> more.", "", 0.1, ["arcbitBtn5"], (resource) => {resource.modifyBtnValBaseMult(3);}],
                        ["arcbitBtn5", "Hyper-Optimal ArcBits", "<strong>Decrypting</strong> ArcBits yields an additional <strong>5x</strong> more.", "", 2.42, ["arcbitBtn6"], (resource) => {resource.modifyBtnValBaseMult(5);}],
                        
                        ["arcbitBtn6", "Fast Decryptor", "<strong>Decrypting</strong> ArcBits yields an additional <strong>10x</strong> more.", "", 12, ["arcbitBtn7"], (resource) => {resource.modifyBtnValBaseMult(10);}],
                        ["arcbitBtn7", "Efficient Decryptor", "<strong>Decrypting</strong> ArcBits yields an additional <strong>20x</strong> more.", "", 101, ["arcbitBtn8"], (resource) => {resource.modifyBtnValBaseMult(20);}],
                        ["arcbitBtn8", "Threaded Decryptor", "<strong>Decrypting</strong> ArcBits yields an additional <strong>50x</strong> more.", "", 520, ["arcbitBtn9"], (resource) => {resource.modifyBtnValBaseMult(50);}],
                        ["arcbitBtn9", "Accelerated Decryptor", "<strong>Decrypting</strong> ArcBits yields an additional <strong>250x</strong> more.", "", 3210, ["arcbitBtn10"], (resource) => {resource.modifyBtnValBaseMult(250);}],
                        ["arcbitBtn10", "Quantum Decryptor", "<strong>Decrypting</strong> ArcBits yields an additional <strong>500x</strong> more.", "", 3210, [], (resource) => {resource.modifyBtnValBaseMult(500);}],

                    // ArcBit Processes

                        /* initial upgrade */ ["arcbitProc1", "Clock Speed I", "<strong>Processes</strong> generate <strong>1.2x</strong> more ArcBits/s.", "", 0.05, ["arcbitProc2", "coreGen1"], (resource) => {resource.modifyDeltaBaseMult(1.2);}],
                        ["arcbitProc2", "Clock Speed II", "<strong>Processes</strong> generate an additional <strong>1.6x</strong> more ArcBits/s.", "", 0.5, ["arcbitProc3"], (resource) => {resource.modifyDeltaBaseMult(1.6);}],
                        ["arcbitProc3", "Clock Speed III", "<strong>Processes</strong> generate an additional <strong>2.0x</strong> more ArcBits/s.", "", 5, ["arcbitProc4"], (resource) => {resource.modifyDeltaBaseMult(2);}],
                        ["arcbitProc4", "Clock Speed IV", "<strong>Processes</strong> generate an additional <strong>2.4x</strong> more ArcBits/s.", "", 5, ["arcbitProc5"], (resource) => {resource.modifyDeltaBaseMult(2.4);}],
                        ["arcbitProc5", "Clock Speed V", "<strong>Processes</strong> generate an additional <strong>2.8x</strong> more ArcBits/s.", "", 5, ["arcbitProc6"], (resource) => {resource.modifyDeltaBaseMult(2.8);}],
                        
                        ["arcbitProc6", "Overhead Reduction I", "<strong>Processes</strong> generate an additional <strong>3.2x</strong> more ArcBits/s.", "", 5, ["arcbitProc7"], (resource) => {resource.modifyDeltaBaseMult(3.2);}],
                        ["arcbitProc7", "Overhead Reduction II", "<strong>Processes</strong> generate an additional <strong>3.6x</strong> more ArcBits/s.", "", 5, ["arcbitProc8"], (resource) => {resource.modifyDeltaBaseMult(3.6);}],
                        ["arcbitProc8", "Overhead Reduction III", "<strong>Processes</strong> generate an additional <strong>4.0x</strong> more ArcBits/s.", "", 5, ["arcbitProc9"], (resource) => {resource.modifyDeltaBaseMult(4);}],
                        ["arcbitProc9", "Overhead Reduction IV", "<strong>Processes</strong> generate an additional <strong>10x</strong> more ArcBits/s.", "", 5, ["arcbitProc10"], (resource) => {resource.modifyDeltaBaseMult(10);}],
                        ["arcbitProc10", "Overhead Reduction V", "<strong>Processes</strong> generate an additional <strong>25x</strong> more ArcBits/s.", "", 5, [], (resource) => {resource.modifyDeltaBaseMult(25);}],

                    // Cores

                        ["coreGen1", "Stone CoreGen", "<strong>Cores</strong> generate <strong>1.5x</strong> faster.", "", 0.01, ["coreGen2"], (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(1.5);}],
                        ["coreGen2", "Iron CoreGen", "<strong>Cores</strong> generate another <strong>1.75x</strong> faster.", "", 0.2, ["coreGen3", "coreCap1"], (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(1.75);}],
                        ["coreGen3", "Emerald CoreGen", "<strong>Cores</strong> generate another <strong>2x</strong> faster.", "", 4, ["coreGen4"], (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(2);}],
                        ["coreGen4", "Diamond CoreGen", "<strong>Cores</strong> generate another <strong>3x</strong> faster.", "", 155, ["coreGen5"], (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(3);}],
                        ["coreGen5", "Archite CoreGen", "<strong>Cores</strong> generate another <strong>4x</strong> faster.", "", 2_250, [], (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(4);}],
                        
                        ["coreCap1", "Minithreading", "Increase <strong>Cores</strong> capacity by <strong>4</strong>.", "", 35, ["coreCap2"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(4);}],
                        ["coreCap2", "Multithreading", "Increase <strong>Cores</strong> capacity by <strong>8</strong>.", "", 320, ["coreCap3", "ultraboost1"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(8);}],
                        ["coreCap3", "Megathreading", "Increase <strong>Cores</strong> capacity by <strong>12</strong>.", "", 5_000, ["coreCap4"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(12);}],
                        ["coreCap4", "Hyperthreading", "Increase <strong>Cores</strong> capacity by <strong>20</strong>.", "", 15_000, ["coreCap5", "proximityComputing"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(20);}],
                        
                        ["coreCap5", "MiniProcessing", "Increase <strong>Cores</strong> capacity by <strong>100</strong>.", "", 200_000, ["coreCap6"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(100);}],
                        ["coreCap6", "MultiProcessing", "Increase <strong>Cores</strong> capacity by <strong>200</strong>.", "", 1_500_000, ["coreCap7"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(200);}],
                        ["coreCap7", "MegaProcessing", "Increase <strong>Cores</strong> capacity by <strong>400</strong>.", "", 75_000_000, ["coreCap8"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(400);}],
                        ["coreCap8", "HyperProcessing", "Increase <strong>Cores</strong> capacity by <strong>800</strong>.", "", 1_000_000_000, ["coreCap9"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(800);}],
                        ["coreCap9", "QuantumProcessing", "Increase <strong>Cores</strong> capacity by <strong>2000</strong>.", "", 64_000_000_000, [], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(2000);}],

                    // Unlockable Multipliers

                        // ArcMult

                            ["arcMult1", "ArcMult v1.0", "<strong>Decrypting</strong> ArcBits provides a temporary multiplier to <strong>decryption</strong> ArcBit generation.", "", 0.01, ["arcMult2", "arcMultOverclock1", "arcMultEfficiency1"], (resource) => {resource.addBtnValMultSource("arcMult");}],
                            ["arcMult2", "ArcMult v2.0", "<strong>Decrypting</strong> ArcBits also provides a temporary multiplier to <strong>process</strong> ArcBit generation.", "", 0.45, [], (resource) => {resource.addDeltaMultSource("arcMult");}],

                            ["arcMultOverclock1", "ArcMult: Overclock I", "<strong>ArcMult</strong> gains <strong>2x</strong> more multiplier per click.", "", 0.2, ["arcMultOverclock2"], (resource) => {resource.gameData.multipliers.get("arcMult").increaseFactor *= 2;}],
                            ["arcMultOverclock2", "ArcMult: Overclock II", "<strong>ArcMult</strong> gains another <strong>2x</strong> more multiplier per click.", "", 128, [], (resource) => {resource.gameData.multipliers.get("arcMult").increaseFactor *= 2;}],

                            ["arcMultEfficiency1", "ArcMult: Efficiency+", "<strong>ArcMult</strong> decays <strong>2x</strong> slower.", "", 20, ["arcMultEfficiency2"], (resource) => {resource.gameData.multipliers.get("arcMult").decayFactor *= 0.5;}],
                            ["arcMultEfficiency2", "ArcMult: Efficiency++", "<strong>ArcMult</strong> decays another <strong>2x</strong> slower.", "", 1_250, ["arcMultEfficiency3"], (resource) => {resource.gameData.multipliers.get("arcMult").decayFactor *= 0.5;}],
                            ["arcMultEfficiency3", "ArcMult: Efficiency+++", "<strong>ArcMult</strong> decays another <strong>2x</strong> slower.", "", 64_000, [], (resource) => {resource.gameData.multipliers.get("arcMult").decayFactor *= 0.5;}],

                        // Ultraboost

                            ["ultraboost1", "Ultraboost", "Each <strong>Core</strong> generated gives a permanent <strong>+1%</strong> multiplier to <strong>process</strong> ArcBit generation.", "", 6, ["ultraboost2"], (resource) => {resource.addDeltaMultSource("ultraboost");}],
                            ["ultraboost2", "Ultraboost: Dual Core", "<strong>Ultraboost</strong> now grants <strong>+2%</strong> per <strong>Core</strong> generated.", "", 14_000, ["ultraboost3"], (resource) => {resource.gameData.multipliers.get("ultraboost").perCoreMult = 0.02;}],
                            ["ultraboost3", "Ultraboost: Quad Core", "<strong>Ultraboost</strong> now grants <strong>+4%</strong> per <strong>Core</strong> generated.", "", 3_000_000, [], (resource) => {resource.gameData.multipliers.get("ultraboost").perCoreMult = 0.4;}],

                            ["proximityComputing", "Proximity Computing", "Each unused <strong>Core</strong> increases <strong>process</strong> ArcBit generation by <strong>+5%</strong>", "", 0.09, ["proximityComputingYield1"], (resource) => {resource.addDeltaMultSource("proximityComputing");}],
                            ["proximityComputingYield1", "Proximity Computing: Yield+", "Increases the <strong>Proximity Computing</strong> boost per unused <strong>Core</strong> to <strong>+10%</strong>.", "", 9, ["proximityComputingYield2"], (resource) => {resource.gameData.multipliers.get("proximityComputing").perCoreMult = 0.1;}],
                            ["proximityComputingYield2", "Proximity Computing: Yield++", "Increases the <strong>Proximity Computing</strong> boost per unused <strong>Core</strong> to <strong>+15%</strong>.", "", 99.999, [], (resource) => {resource.gameData.multipliers.get("proximityComputing").perCoreMult = 0.15;}],
                    
                    // Unlockable Tabs
                    /* initial upgrade */ ["tab1", "Expansion: Archive", "Unlock an <strong class='rainbow'>Archive</strong> of fragmented data.", "", 0.32, ["tab2"], () => {Utils.unlockTab("archive_panel_tab");}],
                    ["tab2", "Expansion: HyperMods", "Unlock the <strong class='rainbow'>HyperMod</strong> interface.", "", 32_000, ["tab3"], () => {Utils.unlockTab("hypermods_panel_tab"); unlockResource("hyperkeys");}],
                    ["tab3", "Expansion: BEYOND", "Un<span class='obfuscated'>l</span>ock ref<span class='obfuscated'>e</span>rences t<span class='obfuscated'>o</span> <strong class='rainbow'>out-of-b<span class='obfuscated'>o</span>unds</strong> memory addres<span class='obfuscated'>s</span>es.", "", 32_000_000_000, [], () => {Utils.unlockTab("beyond_panel_tab"); unlockResource("nullpointers");}],

                    // Unlockable Systems (new UI elements in existing tabs)
                ]
            ],

            /*
            [
                "hyperkeys",
                [

                ]
            ],
            */
        ])
    ],

    
    [
        "hypermod_upgrades_list",
        new Map([ // resourceName, upgradesList
            [
                "hyperkeys",
                [
                    /*initial upgrade*/["hypermod1", "HyperMult Architecture", "<strong>Constructing</strong> HyperKeys provides a lengthy temporary multiplier to <strong>decryption</strong> and <strong>process</strong> ArcBit generation.", "", 0.0005, ["hypermod2"], (resource) => {unlockHyperMod("hyperMultArch");}],
                    /*initial upgrade*/["hypermod2", "HyperCore Architecture", "<strong>Core</strong> generation rate is multiplied by your <strong>HyperKey</strong> amount.", "", 0.001, [], (resource) => {unlockHyperMod("hyperCoreArch");}],
                ]
            ],
        ])
    ],
    

    [
        "archive_unlocks_list",
        new Map([ // fragmentName, title, description, flavorText, cost, unlockFunction
            [
                "arcbits",
                [
                    ["fragment1", "Fragment 0", "HyperI/O Voice Transmission #1A70032E", "", 1.25, ["fragment2", "fragment3", "fragment4"], (resource) => resource.gameData.archive.unlockFragment("fragment_0")],
                    ["fragment2", "Fragment 0.5", "Codex Partition #2E830AB4", "", 45, [], (resource) => resource.gameData.archive.unlockFragment("fragment_0.5")],
                    ["fragment3", "Fragment 1", "HyperI/O Camera #3E9EFFF4 Audio Feed", "", 999, [], (resource) => resource.gameData.archive.unlockFragment("fragment_1")],
                    ["fragment4", "Fragment 2", "HyperI/O Voice Transmission #1A7F327E", "", 45_000, ["fragment5"], (resource) => resource.gameData.archive.unlockFragment("fragment_2")],
                    ["fragment5", "Fragment 3", "New Archon Camera #112D8A39 Audio Feed", "", 1_000_000_000, ["fragment6", "fragment7"], (resource) => resource.gameData.archive.unlockFragment("fragment_3")],
                    ["fragment6", "Fragment 3.5", "Codex Partition #448A120F", "", 1_000_000_000_000_000, [], (resource) => resource.gameData.archive.unlockFragment("fragment_3.5")],
                    ["fragment7", "Fragment 4", "HyperI/O Camera #34C1D859 Audio Feed", "", 1_000_000_000_000_000_000_000, ["fragment8"], (resource) => resource.gameData.archive.unlockFragment("fragment_4")],
                    ["fragment8", "Final Fragment", "The End.", "", 1_000_000_000_000_000_000_000_000_000, [], (resource) => resource.gameData.archive.unlockFragment("fragment_final")],
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

    [
        "hypermod_upgrades_list",
        new Map([
            ["default", "[Unlock]"],
            ["cannot_buy", "[Invalid Keys]"],
            ["purchased", "[Unlocked]"],
        ])
    ],

    [
        "beyond_upgrades_list",
        new Map([
            ["default", "[Reference]"],
            ["cannot_buy", "[<span class='obfuscated'>xxxxxxxx</span>]"],
            ["purchased", "[Referenced]"],
        ])
    ],

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
            ["keyBreak", "KeyBreak v0.7-internaluse", "Uses advanced decryption to breach secure servers.", "", 24_000, 15, 236],
            ["uberhack", "[-UBERHACK-]", "Combines several attacks into a single devastating payload.", "", 306_500, 36, 8421],
            ["bladeSys", "BladeSys by Crysen Software", "Strikes a blade through any cryptography issue with dominating precision.", "", 3_200_000, 80, 8],
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

static OBFUSCATION_CHARS = "0123456789ABCDEF%$#@";

    constructor() {
        console.log("Do not instantiate this class, or ELSE.");
    }
}