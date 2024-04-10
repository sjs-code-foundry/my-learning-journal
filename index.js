/* ============
    Imports
   ============ */

// Import things here

/* ================
    DOM Elements
   ================ */

const tabMenuEl = document.getElementById("tab-menu")
const tabMenuHomeBtn = document.getElementById("tab-menu-home")
const tabMenuAboutBtn = document.getElementById("tab-menu-about")

const allSections = document.getElementsByClassName("section-content")

/* ================================
    Constants/Default Functions
   ================================ */

/* ==== Constants ==== */

// Constants here

/* ==== Default Functions ==== */

tabDefault(tabMenuHomeBtn.dataset.tab)

/* ====================
    Event Listeners
   ==================== */

document.addEventListener("click", function(e) {

    if (!e.target.closest(".header") || e.target.nodeName === "BUTTON") {

        document.getElementById("menu-btn").checked = false

    }

})

tabMenuEl.addEventListener("click", function(e) {

    if (e.target.nodeName === "BUTTON") {

        const targetEl = document.getElementById(e.target.dataset.tab)

        tabSwitch(targetEl)

    }

})

/* ============
    Functions
   ============ */

/* ==== Tab Display ==== */

function displayTab(tabEl) {

    tabEl.style.display = "block"

}

function hideTab(tabEl) {

    tabEl.style.display = "none"

}

function tabSwitch(targetTab) {

    for (let tab of allSections) {

        hideTab(tab)

    }

    displayTab(targetTab)

}

function tabDefault(targetTab) {

    const targetEl = document.getElementById(targetTab)

    displayTab(targetEl)

}