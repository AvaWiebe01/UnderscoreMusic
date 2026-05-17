
// ======== CLASSES ======== //

class Entry {
    constructor(key, title, htmlContent, photo = null) {
        this.key = key;
        this.title = title;
        this.htmlContent = htmlContent;
        this.photo = photo;

        this.subEntriesMap = new Map();
    }
}

class Category {
    constructor(key, title, icon, description = "") {
        this.key = key;
        this.title = title;
        this.icon = icon;
        this.description = description;

        this.entriesMap = new Map();
    }
}

// ======== SETUP FUNCTIONS ======== //

function createEntry(entryObj, parentMap) {
    const entryKey = entryObj["entry-key"];
    console.log(`Creating entry: ${entryKey}`);

    const thisEntry = new Entry(
        entryKey,
        entryObj["entry-title"],
        entryObj["entry-html"],
        entryObj["entry-photo"] ?? null,
    );

    parentMap.set(entryKey, thisEntry);

    // recursively create sub-entries
    if(entryObj["sub-entries"]) {
        entryObj["sub-entries"].forEach((subEntryObj) => createEntry(subEntryObj, thisEntry.subEntriesMap));
    }
}

function createCategory(categoryObj, parentMap) {
    const categoryKey = categoryObj["category-key"];
    console.log(`Creating category: ${categoryKey}`);

    const thisCategory = new Category(
        categoryKey, 
        categoryObj["category-title"], 
        categoryObj["category-icon"],
        categoryObj["category-description"],
        categoryObj["category-description"],
    );

    parentMap.set(categoryKey, thisCategory);

    if(categoryObj["category-entries"]) {
        categoryObj["category-entries"].forEach((entryObj) => createEntry(entryObj, thisCategory.entriesMap));
    }
}

function getEntryHtml(entry) {
    var html = "";

    html += `
        <div class='entry collapsed' id='${entry.key}'>

            <button class='dropdownbutton' key='${entry.key}'>
                ${entry.title}
            </button>

            <img class='dropdownarrow' key='${entry.key}' src='/images/downarrow.png'>

            <div class='content-wrapper' key='${entry.key}'>
                <div class='entry-content'>

                    <div class='text'>
                        ${entry.htmlContent}
                    </div>

                    ${(entry.photo) ? `
                        <img src='${entry.photo}'>
                    ` : ``}

                </div>
    `;

    if(entry.subEntriesMap) {
        entry.subEntriesMap.forEach((subEntry, key) => {
            html += getEntryHtml(subEntry);
        }); 
    }

    html += `
            </div>
        </div>
    `;
    
    return html;
}

function getCategoryHtml(category) {
    var content = "";

    content += `
        <div class='category entry collapsed' id='${category.key}'>
            <div class="ui">
                <img class='category-icon' src='${category.icon}'>
                <button class='dropdownbutton' key='${category.key}'>    
                    ${category.title}
                </button>
            </div>

            <div class='description'>${category.description}</div>

            <div class='content-wrapper' key='${category.key}'>
    `;

    category.entriesMap.forEach((entry, key) => {
        content += getEntryHtml(entry);
    }); 

    content += `
            </div>
        </div>
    `;

    return content;
}

function getDecryptorHtml(decryptorMap) {
    var html = "";

    decryptorMap.forEach((category, key) => {
        html += getCategoryHtml(category);
    });

    return html;
}

// ======== EVENT FUNCTIONS ======== //

function toggleDropdown(targetDiv, animate = true) {
    
    var isCollapsed = targetDiv.classList.contains("collapsed");

    const contentWrapper = targetDiv.querySelector(".content-wrapper");
    const button = targetDiv.querySelector(":scope .dropdownbutton");
    const arrow = targetDiv.querySelector(":scope > .dropdownarrow") ?? null;

    button.classList.toggle("activated");
    
    const animationTime = (animate) ? 400 : 0;

    $(contentWrapper).slideToggle(animationTime, () => {
        targetDiv.classList.toggle("collapsed");
        var isCollapsed = targetDiv.classList.contains("collapsed");

        if(arrow) {
            arrow.src = (isCollapsed) ? "/images/codex-decryptor/downarrow.png" : "/images/codex-decryptor/uparrow.png";
        }
    });
}

// ======== MAIN ======== //
window.onload = function() {
    
    var categoriesObj = {};
    var decryptorMap = new Map();

    var definitionsMap = new Map();

    const decryptorElement = document.getElementById("decryptor");

    fetch('/codex-decryptor/content/entries.yaml')
    .then(response => response.text())
    .then(data => {
        decryptorObj = jsyaml.load(data);
        categoriesObj = decryptorObj["categories"];
        console.log("YAML loaded.");

        // create the data structure from JSON recursively
        categoriesObj.forEach((categoryObj) => createCategory(categoryObj, decryptorMap));

        // create the page HTML recursively
        decryptorElement.innerHTML = getDecryptorHtml(decryptorMap);


        // USER EVENTS //
        
        /* Fires when user clicks a dropdown button */
        $(".dropdownbutton").on('click', (event) => {
            const targetDiv = event.currentTarget.closest(`[id='${event.currentTarget.getAttribute("key")}']`);
            toggleDropdown(targetDiv);
        })


        /* Fires when user hovers a dropdown button */
        $(".dropdownbutton")
            
            .on("mouseenter",
            (event) => {
                const key = event.currentTarget.getAttribute("key");
                document.querySelector(`.dropdownarrow[key='${key}']`)?.animate({opacity:'1'}, { duration: 75, fill: "forwards" });
            })

            .on("mouseleave",
            (event) => {
                const key = event.currentTarget.getAttribute("key");        
                document.querySelector(`.dropdownarrow[key='${key}']`)?.animate({opacity:'0.5'}, { duration: 75, fill: "forwards" });
            })

        
        /* Fires when the user clicks an entry link */ 
        $(".entrylink").on('click', (event) => {
            const targetKey = event.currentTarget.getAttribute("target");
            const targetDiv = document.getElementById(targetKey) ?? null;
            
            var currTargetDiv = targetDiv;

            while(currTargetDiv) {
                if(currTargetDiv.classList.contains("collapsed")) {
                    toggleDropdown(currTargetDiv, false);
                }

                currTargetDiv = currTargetDiv.parentElement.closest(".entry") ?? null;
            }

            targetDiv?.scrollIntoView({behavior: "smooth"});
        })


        // Create the definitions data structure for tooltip
        fetch('/codex-decryptor/content/definitions.yaml')
        .then(response => response.text())
        .then(data => {
            definitionsObj = jsyaml.load(data);
            definitionsMap = new Map(Object.entries(definitionsObj));

            /* Fires when the user hovers a word with a tooltip */ 
            $(".define")

                .on("mouseenter",
                (event) => {
                    const tooltip = document.getElementById("tooltip");

                    const word = event.currentTarget.innerHTML.toLowerCase();
                    tooltip.innerHTML = definitionsMap.get(word);

                    tooltip.classList.remove("hidden");

                    tooltip.style.left = `${event.clientX}px`; 
                    tooltip.style.top = `${event.clientY}px`; 
                })

                .on("mouseleave",
                (event) => {
                    const tooltip = document.getElementById("tooltip");

                    tooltip.classList.add("hidden");
                })

                // remove the loading screen
                const loadingScreen = document.querySelector(".loading_screen");
                loadingScreen.classList.add("hidden");
        })
    })
    .catch(error => console.error('Error while loading: ', error));
}