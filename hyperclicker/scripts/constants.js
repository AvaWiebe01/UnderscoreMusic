import { Utils } from "./utils.js";
import { unlockResource } from "./resources.js";
import { unlockHyperMod } from "./hypermods.js";

export class Constants {

static REFRESH_RATE = 60;

static AVERAGING_TIME = 1000; // in milliseconds
static AVERAGING_SAMPLES = 10;

static AUTOSAVE_TICKS = 3600 // save every 3600 game ticks
static RESET_PROGRESS_CLICKS = 10;

static BONUS_COOLDOWN = 320; // bonus starts at 5:20 -> 2:40 -> 1:20 -> 0:40 cooldown

static DEFAULT_SUFFIXES = ["","Thousand","Million","Billion","Trillion","Quadrillion","Quintillion","Sextillion","Septillion","Octillion","Nonillion","Decillion","Undecillion","Duodecillion","Tredecillion","Quattuordecillion","Quindecillion","Sexdecillion","Septendecillion","Octodecillion","Novemdecillion","Vigintillion","Unvigintillion","Duovigintillion","Trevigintillion","Quattuorvigintillion","Quinvigintillion","Sexvigintillion","Septenvigintillion","Octovigintillion","Novemvigintillion","Trigintillion","Untrigintillion","Duotrigintillion"];
static ABBREVIATED_SUFFIXES = ["","K","M","B","T","Q","Qi","Sx","Sp","Oc","No","Dc","Udc","Ddc","Tdc","Qadc","Qidc","Sxdc","Spdc","Ocdc","Nmdc","Vg","Uvg","Dvg","Tvg","Qavg","Qivg","Sxvg","Spvg","Ocvg","Nmvg","Tg","Utg","Dtg"];
static DATA_SIZE_ABBREVIATED_SUFFIXES = ["b","Kb","Mb","Gb","Tb","Pb","Eb","Zb","Yb","Rb","Qb","Wb"];
static DATA_SIZE_SUFFIXES = ["Bits","Kilobits","Megabits","Gigabits","Terabits","Petabits","Exabits","Zettabits","Yottabits","Ronnabits","Quettabits","Wrennbits"];

static RESOURCE_INFO = [ // htmlName, amt, delta, btnVal, displayableName
    ["arcbits", 0, 0.00010, "ArcBits"],
    ["hyperkeys", 0.00, 0.00001, "HyperKeys"],
];

// htmlName, amt, delta, btnVal, displayableName, initMaxCores
static CORE_INFO = ["cores", 2, 1/80, 0, "Cores", 8];

// htmlName, amt, btnVal, displayableName, initSuccessRate
static NULLPOINTER_INFO = ["nullpointers", 0, 0, 1, "NullPointers", 0.01];

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
                ["hypermodHyperMult", "hypermodHyperCore"],
            ],
        ])
    ],

    [
        "hyperkey_upgrades_list",
        new Map([
            [
                "hyperkeys",
                ["keyBtn1", "modMax1"],
            ],
        ])
    ],

    [
        "nullpointer_upgrades_list",
        new Map([
            [
                "nullpointers",
                ["nullBtn1", "nullDelta1", "nullBoost1"],
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
                    
                        /* initial upgrade */ ["arcbitBtn1", "More ArcBits", "<strong>Decrypting</strong> ArcBits yields <strong>1.20x</strong> more.", "", 0.002, ["arcbitBtn2"], (resource) => {resource.modifyBtnValBaseMult(1.20);}],
                        ["arcbitBtn2", "Improved ArcBits", "<strong>Decrypting</strong> ArcBits yields an additional <strong>1.40x</strong> more.", "", 0.005, ["arcbitBtn3", "arcMult1"], (resource) => {resource.modifyBtnValBaseMult(1.40);}],
                        ["arcbitBtn3", "Optimized ArcBits", "<strong>Decrypting</strong> ArcBits yields an additional <strong>1.60x</strong> more.", "", 0.02, ["arcbitBtn4"], (resource) => {resource.modifyBtnValBaseMult(1.60);}],
                        ["arcbitBtn4", "Optimal ArcBits", "<strong>Decrypting</strong> ArcBits yields an additional <strong>1.80x</strong> more.", "", 0.1, ["arcbitBtn5"], (resource) => {resource.modifyBtnValBaseMult(1.80);}],
                        ["arcbitBtn5", "Hyper-Optimal ArcBits", "<strong>Decrypting</strong> ArcBits yields an additional <strong>2x</strong> more.", "", 0.85, ["arcbitBtn6"], (resource) => {resource.modifyBtnValBaseMult(2);}],
                        
                        ["arcbitBtn6", "Fast Decryptor", "<strong>Decrypting</strong> ArcBits yields an additional <strong>3x</strong> more.", "", 3.14, ["arcbitBtn7"], (resource) => {resource.modifyBtnValBaseMult(3);}],
                        ["arcbitBtn7", "Efficient Decryptor", "<strong>Decrypting</strong> ArcBits yields an additional <strong>4x</strong> more.", "", 101, ["arcbitBtn8"], (resource) => {resource.modifyBtnValBaseMult(4);}],
                        ["arcbitBtn8", "Threaded Decryptor", "<strong>Decrypting</strong> ArcBits yields an additional <strong>5x</strong> more.", "", 520, ["arcbitBtn9"], (resource) => {resource.modifyBtnValBaseMult(5);}],
                        ["arcbitBtn9", "Accelerated Decryptor", "<strong>Decrypting</strong> ArcBits yields an additional <strong>7.5x</strong> more.", "", 3_210, ["arcbitBtn10"], (resource) => {resource.modifyBtnValBaseMult(7.5);}],
                        ["arcbitBtn10", "Quantum Decryptor", "<strong>Decrypting</strong> ArcBits yields an additional <strong>10x</strong> more.", "", 48_500, [], (resource) => {resource.modifyBtnValBaseMult(10);}],

                    // ArcBit Processes

                        /* initial upgrade */ ["arcbitProc1", "Clock Speed I", "<strong>Processes</strong> generate <strong>1.05x</strong> more ArcBits/s.", "", 0.05, ["arcbitProc2", "coreGen1"], (resource) => {resource.modifyDeltaBaseMult(1.25);}],
                        ["arcbitProc2", "Clock Speed II", "<strong>Processes</strong> generate an additional <strong>1.1x</strong> more ArcBits/s.", "", 0.5, ["arcbitProc3"], (resource) => {resource.modifyDeltaBaseMult(1.25);}],
                        ["arcbitProc3", "Clock Speed III", "<strong>Processes</strong> generate an additional <strong>1.15x</strong> more ArcBits/s.", "", 5, ["arcbitProc4"], (resource) => {resource.modifyDeltaBaseMult(1.25);}],
                        ["arcbitProc4", "Clock Speed IV", "<strong>Processes</strong> generate an additional <strong>1.2x</strong> more ArcBits/s.", "", 50, ["arcbitProc5"], (resource) => {resource.modifyDeltaBaseMult(1.25);}],
                        ["arcbitProc5", "Clock Speed V", "<strong>Processes</strong> generate an additional <strong>1.25x</strong> more ArcBits/s.", "", 500, ["arcbitProc6"], (resource) => {resource.modifyDeltaBaseMult(1.25);}],
                        
                        ["arcbitProc6", "Overhead Reduction I", "<strong>Processes</strong> generate an additional <strong>1.3x</strong> more ArcBits/s.", "", 890, ["arcbitProc7"], (resource) => {resource.modifyDeltaBaseMult(1.3);}],
                        ["arcbitProc7", "Overhead Reduction II", "<strong>Processes</strong> generate an additional <strong>1.35x</strong> more ArcBits/s.", "", 3_800, ["arcbitProc8"], (resource) => {resource.modifyDeltaBaseMult(1.35);}],
                        ["arcbitProc8", "Overhead Reduction III", "<strong>Processes</strong> generate an additional <strong>1.4x</strong> more ArcBits/s.", "", 16_440, ["arcbitProc9"], (resource) => {resource.modifyDeltaBaseMult(1.4);}],
                        ["arcbitProc9", "Overhead Reduction IV", "<strong>Processes</strong> generate an additional <strong>1.45x</strong> more ArcBits/s.", "", 122_000, ["arcbitProc10"], (resource) => {resource.modifyDeltaBaseMult(1.45);}],
                        ["arcbitProc10", "Overhead Reduction V", "<strong>Processes</strong> generate an additional <strong>1.5x</strong> more ArcBits/s.", "", 4_100_000, [], (resource) => {resource.modifyDeltaBaseMult(1.5);}],

                    // Cores

                        ["coreGen1", "Stone CoreGen", "<strong>Cores</strong> generate <strong>1.25x</strong> faster.", "", 0.01, ["coreGen2"], (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(1.25);}],
                        ["coreGen2", "Iron CoreGen", "<strong>Cores</strong> generate another <strong>1.5x</strong> faster.", "", 0.2, ["coreGen3", "coreCap1"], (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(1.5);}],
                        ["coreGen3", "Emerald CoreGen", "<strong>Cores</strong> generate another <strong>1.75x</strong> faster.", "", 4, ["coreGen4"], (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(1.75);}],
                        ["coreGen4", "Diamond CoreGen", "<strong>Cores</strong> generate another <strong>2x</strong> faster.", "", 155, ["coreGen5"], (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(2);}],
                        ["coreGen5", "Archite CoreGen", "<strong>Cores</strong> generate another <strong>2.5x</strong> faster.", "", 2_250, [], (resource) => {resource.gameData.resources.get("cores").modifyDeltaBaseMult(2.5);}],
                        
                        ["coreCap1", "Minithreading", "Increase <strong>Cores</strong> capacity by <strong>4</strong>.", "", 35, ["coreCap2"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(4);}],
                        ["coreCap2", "Multithreading", "Increase <strong>Cores</strong> capacity by <strong>8</strong>.", "", 320, ["coreCap3", "ultraboost1"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(8);}],
                        ["coreCap3", "Megathreading", "Increase <strong>Cores</strong> capacity by <strong>12</strong>.", "", 5_000, ["coreCap4"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(12);}],
                        ["coreCap4", "Hyperthreading", "Increase <strong>Cores</strong> capacity by <strong>20</strong>.", "", 15_000, ["coreCap5", "proximityComputing"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(20);}],
                        
                        ["coreCap5", "MiniProcessing", "Increase <strong>Cores</strong> capacity by <strong>100</strong>.", "", 200_000, ["coreCap6"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(100);}],
                        ["coreCap6", "MultiProcessing", "Increase <strong>Cores</strong> capacity by <strong>200</strong>.", "", 1_500_000, ["coreCap7"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(200);}],
                        ["coreCap7", "MegaProcessing", "Increase <strong>Cores</strong> capacity by <strong>400</strong>.", "", 75_000_000, ["coreCap8"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(400);}],
                        ["coreCap8", "HyperProcessing", "Increase <strong>Cores</strong> capacity by <strong>800</strong>.", "", 1_000_000_000, ["coreCap9"], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(800);}],
                        ["coreCap9", "QuantumProcessing", "Increase <strong>Cores</strong> capacity by <strong>2000</strong>.", "", 64_000_000_000, [], (resource) => {resource.gameData.resources.get("cores").modifyMaxCores(2000);}],

                    // Bonus item

                        ["bonusCooldown1", "Malware Detection: Signature Analysis", "Antivirus detects viruses <strong>2x</strong> faster.", "", 6.4, ["bonusCooldown2"], (resource) => {Utils.gameData.bonusItem.cooldown = Math.floor(Utils.gameData.bonusItem.cooldown / 2);}],
                        ["bonusCooldown2", "Malware Detection: Dynamic Analysis", "Antivirus detects viruses another <strong>2x</strong> faster.", "", 2_545, ["bonusCooldown3"], (resource) => {Utils.gameData.bonusItem.cooldown = Math.floor(Utils.gameData.bonusItem.cooldown / 2);}],
                        ["bonusCooldown3", "Malware Detection: Entropy Analysis", "Antivirus detects every single virus.", "", 480_000, [], (resource) => {Utils.gameData.bonusItem.cooldown = Math.floor(Utils.gameData.bonusItem.cooldown / 2);}],
                        
                    
                    // Unlockable Multipliers

                        // ArcMult

                            ["arcMult1", "ArcMult v1.0", "<strong>Decrypting</strong> ArcBits provides multiplier to <strong>decryption</strong> ArcBit generation. Decays slowly over time.", "", 0.01, ["arcMult2", "arcMultOverclock1", "arcMultEfficiency1"], (resource) => {resource.addBtnValMultSource("arcMult"); Utils.gameData.multipliers.get("arcMult").unlock();}], 
                            ["arcMult2", "ArcMult v2.0", "<strong>Decrypting</strong> ArcBits also provides a multiplier to <strong>process</strong> ArcBit generation.", "", 0.45, [], (resource) => {resource.addDeltaMultSource("arcMult");}],

                            ["arcMultOverclock1", "ArcMult: Overclock I", "<strong>ArcMult</strong> gains <strong>2x</strong> more multiplier per click.", "", 0.2, ["arcMultOverclock2"], (resource) => {resource.gameData.multipliers.get("arcMult").increaseFactor *= 2;}],
                            ["arcMultOverclock2", "ArcMult: Overclock II", "<strong>ArcMult</strong> gains another <strong>2x</strong> more multiplier per click.", "", 128, ["arcMultOverclock3"], (resource) => {resource.gameData.multipliers.get("arcMult").increaseFactor *= 2;}],
                            ["arcMultOverclock3", "ArcMult: Maximum Overclock", "<strong>ArcMult</strong> gains another <strong>2x</strong> more multiplier per click.", "", 3_720, [], (resource) => {resource.gameData.multipliers.get("arcMult").increaseFactor *= 2;}],

                            ["arcMultEfficiency1", "ArcMult: Efficiency+", "<strong>ArcMult</strong> decays <strong>2x</strong> slower.", "", 0.78, ["arcMultEfficiency2"], (resource) => {resource.gameData.multipliers.get("arcMult").decayFactor *= 0.5;}],
                            ["arcMultEfficiency2", "ArcMult: Efficiency++", "<strong>ArcMult</strong> decays another <strong>2x</strong> slower.", "", 15.8, ["arcMultEfficiency3"], (resource) => {resource.gameData.multipliers.get("arcMult").decayFactor *= 0.5;}],
                            ["arcMultEfficiency3", "ArcMult: Efficiency+++", "<strong>ArcMult</strong> decays another <strong>2x</strong> slower.", "", 64_000, ["arcMultEfficiency4"], (resource) => {resource.gameData.multipliers.get("arcMult").decayFactor *= 0.5;}],
                            ["arcMultEfficiency4", "ArcMult: Maximum Efficiency", "<strong>ArcMult</strong> decays another <strong>2x</strong> slower.", "", 468_000, [], (resource) => {resource.gameData.multipliers.get("arcMult").decayFactor *= 0.5;}],

                        // Ultraboost

                            ["ultraboost1", "Ultraboost", "Each <strong>Core</strong> generated gives a permanent <strong>+0.1%</strong> multiplier to <strong>process</strong> ArcBit generation.", "", 6, ["ultraboost2"], (resource) => {resource.addDeltaMultSource("ultraboost");}],
                            ["ultraboost2", "Ultraboost: Dual Core", "<strong>Ultraboost</strong> now grants <strong>+0.2%</strong> per <strong>Core</strong> generated.", "", 14_000, ["ultraboost3"], (resource) => {resource.gameData.multipliers.get("ultraboost").perCoreMult = 0.002;}],
                            ["ultraboost3", "Ultraboost: Quad Core", "<strong>Ultraboost</strong> now grants <strong>+0.3%</strong> per <strong>Core</strong> generated.", "", 3_000_000, [], (resource) => {resource.gameData.multipliers.get("ultraboost").perCoreMult = 0.003;}],

                        // Proximity Computing

                            ["proximityComputing", "Proximity Computing", "Each unused <strong>Core</strong> increases <strong>process</strong> ArcBit generation by <strong>+5%</strong>", "", 0.09, ["proximityComputingYield1"], (resource) => {resource.addDeltaMultSource("proximityComputing");}],
                            ["proximityComputingYield1", "Proximity Computing: Yield+", "Increases the <strong>Proximity Computing</strong> boost per unused <strong>Core</strong> to <strong>+10%</strong>.", "", 9, ["proximityComputingYield2"], (resource) => {resource.gameData.multipliers.get("proximityComputing").perCoreMult = 0.1;}],
                            ["proximityComputingYield2", "Proximity Computing: Yield++", "Increases the <strong>Proximity Computing</strong> boost per unused <strong>Core</strong> to <strong>+15%</strong>.", "", 99.999, [], (resource) => {resource.gameData.multipliers.get("proximityComputing").perCoreMult = 0.15;}],
                    
                    // Unlockable Tabs
                    /* initial upgrade */ ["tab1", "Expansion: Archive", "Unlock an <strong class='rainbow'>Archive</strong> of fragmented data.", "", 0.32, ["tab2"], () => {Utils.unlockTab("archive_panel_tab");}],
                    ["tab2", "Expansion: HyperMods", "Unlock the <strong class='rainbow'>HyperMod</strong> interface.", "", 32_000, ["tab3"], () => {Utils.unlockTab("hypermods_panel_tab"); unlockResource("hyperkeys");}],
                    ["tab3", "Expansion: BEYOND", "Un<span class='obfuscated'>l</span>ock ref<span class='obfuscated'>e</span>rences t<span class='obfuscated'>o</span> <strong class='rainbow'>out-of-b<span class='obfuscated'>o</span>unds</strong> memory addres<span class='obfuscated'>s</span>es.<br>Discover two new HyperMods.", "", 32_000_000_000, [], () => {Utils.unlockTab("beyond_panel_tab"); unlockResource("nullpointers"); Utils.unlockUpgrade("hypermod_upgrades_list", "hyperkeys", "hypermodReroll"); Utils.unlockUpgrade("hypermod_upgrades_list", "hyperkeys", "hypermodStreak");}],

                    // Unlockable Systems (new UI elements in existing tabs)
                ]
            ],
        ])
    ],

    
    [
        "hypermod_upgrades_list",
        new Map([ // resourceName, upgradesList
            [
                "hyperkeys",
                [
                    /*initial upgrade*/["hypermodHyperMult", "HyperMult Architecture", "<strong>All</strong> resource buttons contribute to <strong>ArcMult</strong>.", "", 0.0005, ["hypermodMalwareDefense"], (resource) => {unlockHyperMod("hyperMultArch");}],
                    
                    /*initial upgrade*/["hypermodHyperCore", "HyperCore Architecture", "<strong>Core</strong> generation rate is multiplied by current <strong>HyperKey</strong> amount.", "", 0.00468, ["hypermodKeyMult"], (resource) => {unlockHyperMod("hyperCoreArch");}],

                    ["hypermodKeyMult", "KeyMult Architecture", "<strong>Decrypting</strong> ArcBits also provides a temporary multiplier to <strong>construction</strong> HyperKey generation.", "", 0.02, [], (resource) => {unlockHyperMod("keyMultArch");}],

                    ["hypermodMalwareDefense", "Malware Defense Architecture", "Removing a <strong>virus</strong> generates stronger effects. Detect more viruses.", "", 0.124, ["hypermodMultiProcess"], (resource) => {unlockHyperMod("malwareDefenseArch");}],

                    ["hypermodMultiProcess", "Multi-Process Architecture", "<strong>Process</strong> ArcBit generation is multiplied by the lowest <strong>number of instances</strong> of all programs [excluding 0].", "", 6.5, [], (resource) => {unlockHyperMod("multiProcessArch");}],

                    ["hypermodReroll", "Reroll+ Architecture", "Improve success rate of <strong>Locating</strong> NullPointers.", "", 450, [], (resource) => {unlockHyperMod("rerollArch");}],

                    ["hypermodStreak", "Streak+ Architecture", "Consecutive NullPointer <strong>Locations</strong> are more powerful.", "", 1_600, [], (resource) => {unlockHyperMod("streakArch");}],
                ]
            ],
        ])
    ],

    [
        "hyperkey_upgrades_list",
        new Map([ // resourceName, upgradesList
            [
                "hyperkeys",
                [
                    /*initial upgrade*/["keyBtn1", "Faster Encryption", "<strong>Constructing</strong> HyperKeys is <strong>twice</strong> as efficient.", "", 0.0005, ["keyBtn2"], (resource) => {resource.modifyBtnValBaseMult(2)}],
                    ["keyBtn2", "Stronger Encryption", "<strong>Constructing</strong> HyperKeys is <strong>thrice</strong> as efficient.", "", 0.001, ["keyBtn3"], (resource) => {resource.modifyBtnValBaseMult(3)}],
                    ["keyBtn3", "Asymmetric Encryption", "<strong>Constructing</strong> HyperKeys is <strong>4x</strong> as efficient.", "", 0.00525, ["keyBtn4"], (resource) => {resource.modifyBtnValBaseMult(4)}],
                    ["keyBtn4", "Hyper Encryption", "<strong>Constructing</strong> HyperKeys is <strong>5x</strong> as efficient.", "", 0.0285, ["keyBtn5"], (resource) => {resource.modifyBtnValBaseMult(5)}],
                    ["keyBtn5", "Quantum Encryption", "<strong>Constructing</strong> HyperKeys is <strong>32x</strong> as efficient.", "", 0.32, [], (resource) => {resource.modifyBtnValBaseMult(32)}],
                    
                    /*initial upgrade*/["modMax1", "HyperMod Slot 2", "A maximum of 2 <strong>HyperMods</strong> can be active concurrently.", "", 0.001, ["modMax2"], (resource) => {Utils.gameData.hypermods.modifyMaxEnabled(2)}],
                    ["modMax2", "HyperMod Slot 3", "A maximum of 3 <strong>HyperMods</strong> can be active concurrently.", "", 1, ["modMax3"], (resource) => {Utils.gameData.hypermods.modifyMaxEnabled(3)}],
                    ["modMax3", "HyperMod Slot 4", "A maximum of 4 <strong>HyperMods</strong> can be active concurrently.", "", 1_000, [], (resource) => {Utils.gameData.hypermods.modifyMaxEnabled(4)}],
                ]
            ],
        ])
    ],

    [
        "nullpointer_upgrades_list",
        new Map([ // resourceName, upgradesList
            [
                "nullpointers",
                [
                    /*initial upgrade*/["nullBtn1", "efficient_search_ver1", "<strong>nullpointer_location_rate=0.015;</strong>", "", 1, ["nullBtn2"], (resource) => {resource.modifySuccessRate(0.015)}],
                    ["nullBtn2", "efficient_search_ver2", "<strong>nullpointer_location_rate=0.0275;</strong>", "", 8, ["nullBtn3"], (resource) => {resource.modifySuccessRate(0.0275)}],
                    ["nullBtn3", "efficient_search_ver3", "<strong>nullpointer_location_rate=0.075;</strong>", "", 35, ["nullBtn4"], (resource) => {resource.modifySuccessRate(0.075)}],
                    ["nullBtn4", "efficient_search_ver4", "<strong>nullpointer_location_rate=0.1;</strong>", "", 300, ["nullBtn5"], (resource) => {resource.modifySuccessRate(0.1)}],
                    ["nullBtn5", "efficient_search_finalver", "<strong>nullpointer_location_rate=0.175; //need new algorithm</strong>", "", 750, ["nullBtn6"], (resource) => {resource.modifySuccessRate(0.175)}],
                    ["nullBtn6", "nullspace_collapse_protocol", "<strong>nullpointer_location_rate=0.25;</strong>", "", 1_250, ["nullBtn7"], (resource) => {resource.modifySuccessRate(0.25)}],
                    ["nullBtn7", "nullspace_collapse_protocol_v2", "<strong>nullpointer_location_rate=0.32;</strong>", "", 3_800, ["nullBtn8"], (resource) => {resource.modifySuccessRate(0.32)}],
                    ["nullBtn8", "nullspace_collapse_protocol_v2.1", "<strong>nullpointer_location_rate=0.4525;</strong>", "", 12_400, ["nullBtn9"], (resource) => {resource.modifySuccessRate(0.4525)}],
                    ["nullBtn9", "nullspace_collapse_protocol_v2.1.1", "<strong>nullpointer_location_rate=0.5;</strong>", "", 24_000, ["nullBtn10"], (resource) => {resource.modifySuccessRate(0.5)}],
                    ["nullBtn10", "nullspace_collapse_protocol_v5", "<strong>nullpointer_location_rate=0.5555; //seems like the limit</strong>", "", 55_555, [], (resource) => {resource.modifySuccessRate(0.5555)}],
                    
                    /*initial upgrade*/["nullDelta1", "memory_leak_capture", "<strong>passive_nullpointer_gain_active();</strong>", "", 3, ["nullDelta2"], (resource) => {resource.delta = 0.05}],
                    ["nullDelta2", "capture_rate+", "<strong>increase_passive_nullpointer_gain(+100%);</strong>", "", 10, ["nullDelta3"], (resource) => {resource.modifyDeltaMult(2)}],
                    ["nullDelta3", "capture_rate++", "<strong>multiply_passive_nullpointer_gain(+100%);</strong>", "", 24, ["nullDelta4"], (resource) => {resource.modifyDeltaMult(2)}],
                    ["nullDelta4", "capture_rate+++", "<strong>multiply_passive_nullpointer_gain(+100%);</strong>", "", 62, ["nullDelta5"], (resource) => {resource.modifyDeltaMult(2)}],
                    ["nullDelta5", "capture_rate++++", "<strong>multiply_passive_nullpointer_gain(+100%);</strong>", "", 105, ["nullDelta6"], (resource) => {resource.modifyDeltaMult(2)}],
                    ["nullDelta6", "auto_search+", "<strong>nullpointer_passive_capture_speed(+200%);</strong>", "", 225, ["nullDelta7"], (resource) => {resource.modifyDeltaMult(3)}],
                    ["nullDelta7", "auto_search++", "<strong>nullpointer_passive_capture_speed(+300%);</strong>", "", 500, ["nullDelta8"], (resource) => {resource.modifyDeltaMult(4)}],
                    ["nullDelta8", "auto_search+++", "<strong>nullpointer_passive_capture_speed(+400%);</strong>", "", 1_400, ["nullDelta9"], (resource) => {resource.modifyDeltaMult(5)}],
                    ["nullDelta9", "auto_search++++", "<strong>nullpointer_passive_capture_speed(+500%);</strong>", "", 7_200, ["nullDelta10"], (resource) => {resource.modifyDeltaMult(6)}],
                    ["nullDelta10", "optimal_capture", "<strong>nullpointer_passive_capture_speed(+999%);</strong>", "", 111_000, [], (resource) => {resource.modifyDeltaMult(9.99)}],

                    /*initial upgrade*/["nullBoost1", "arc_hack.exe", "<span class='rainbow'>arcbit_decryption_and_process_multiplier=100;</span>", "", 111, ["nullBoost2"], (resource) => {Utils.gameData.resources.get("arcbits").modifyBtnValBaseMult(100); Utils.gameData.resources.get("arcbits").modifyDeltaBaseMult(100);}],
                    ["nullBoost2", "hyperboost.exe", "<span class='rainbow'>resources.get('hyperkeys').setMultiplier(175);</span>", "", 22_222, ["nullBoost3"], (resource) => {Utils.gameData.resources.get("hyperkeys").modifyBtnValBaseMult(175); Utils.gameData.resources.get("hyperkeys").modifyDeltaBaseMult(175);}],
                    ["nullBoost3", "core_generator_overclock.exe", "<span class='rainbow'>gameData.params.CORE_GENERATION_SPEED*=25;</span>", "", 3_333_333, ["nullBoost4"], (resource) => {Utils.gameData.resources.get("cores").modifyDeltaBaseMult(25);}],
                    ["nullBoost4", "resourceGen_final_FINAL.exe", '<span class="rainbow">internalFiles("~/var/saveData.json").write("{ALL_RESOURCES_MULTIPLIER: 250}");</span>', "", 444_444_444, ["nullFinal"], (resource) => {Utils.gameData.resources.get("arcbits").modifyBtnValBaseMult(250); Utils.gameData.resources.get("arcbits").modifyDeltaBaseMult(250); Utils.gameData.resources.get("hyperkeys").modifyBtnValBaseMult(250); Utils.gameData.resources.get("hyperkeys").modifyDeltaBaseMult(250); Utils.gameData.resources.get("nullpointers").modifyBtnValBaseMult(250); Utils.gameData.resources.get("nullpointers").modifyDeltaBaseMult(250);}],
                    ["nullFinal", "<span class='obfuscated'>0000000000000000</span>", "<span class='rainbow'>MOV 0x000A998E, #1000;</span>", "", 99_999_000_000, [], (resource) => {Utils.gameData.resources.get("arcbits").modifyBtnValBaseMult(1000); Utils.gameData.resources.get("arcbits").modifyDeltaBaseMult(1000); Utils.gameData.resources.get("hyperkeys").modifyBtnValBaseMult(1000); Utils.gameData.resources.get("hyperkeys").modifyDeltaBaseMult(1000); Utils.gameData.resources.get("nullpointers").modifyBtnValBaseMult(1000); Utils.gameData.resources.get("nullpointers").modifyDeltaBaseMult(1000);}],
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
                    ["fragment1", "Fragment 0", "HyperI/O Voice Transmission #1A70032E", "", 1, ["fragment2", "fragment3", "fragment4"], (resource) => resource.gameData.archive.unlockFragment("fragment_0")],
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
        "hyperkey_upgrades_list",
        new Map([
            ["default", "[Upgrade]"],
            ["cannot_buy", "[Invalid Keys]"],
            ["purchased", "[Upgraded]"],
        ])
    ],

    [
        "nullpointer_upgrades_list",
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

static NUM_INITIAL_PROCESSES = 1;

static ALL_PROCESSES_INFO = new Map([
    [
        "arcbits",
        [ // key: title, description, flavorText, baseCost, coreReq, baseProduction
            ["linkCrawler", "Link Crawler", "Follows links in the Codex to gather surface data.", "", 0.01, 1, 0.002],
            ["hyperReader", "HyperReader++", "Reads hidden hypertext to parse deeper data.", "", 2, 3, 0.04],
            ["infiltrator", "1nfiltr4t0r", "Brute forces passwords to read hidden files.", "", 128, 8, 0.22],
            ["keyBreak", "KeyBreak v0.7-internaluse", "Uses advanced decryption to breach secure servers.", "", 24_000, 15, 4.2],
            ["uberhack", "[-UBERHACK-]", "Combines several attacks into a single devastating payload.", "", 306_500, 36, 34],
            ["bladeSys", "BladeSys by Crysen Software", "Strikes a blade through any cryptography issue with dominating precision.", "", 32_000_000, 128, 405],
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