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

/* ==== Post Placeholders ==== */

const posts = [
    new PostTemplate("2024-01-15", "This is bad", "Something something bad", true),
    new PostTemplate("2024-01-22", "This is ok", "Something something ok", false),
    new PostTemplate("2024-01-29", "This is good", "Something something good", false)
]

renderBlogPostList(posts)

/* ========================
    Object Constructors
   ======================== */

function PostTemplate(date, title, body, relapseBool) {

    this.date = new Date(date)
    this.title = title
    this.body = body
    this.relapse = relapseBool

    /*
    date: Date object
    title: Title
    body: General sharing in blog post
    relapse: whether or not the author relapsed recently
    */

}

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

/* ==== Blog Post Display ==== */

function renderBlogPostList(posts) {

    const idList = getIdsFromGatheringElsByClass("blog-reel")

    for (let id in idList) {

        let blogReelEl = document.getElementById(idList[id])
        
        for (let p in posts) {

            blogReelEl.appendChild(renderBlogPost(posts[p], idList[id]))

        }

    }

}

function getIdsFromGatheringElsByClass(className) {

    const elList = document.getElementsByClassName(className)

    let idList = []

    for (let el in elList) {

        if (elList[el].id) {

            idList.push(elList[el].id)

        }

    }

    return idList

}

function renderBlogPost(post, listId) {

    let newPost = document.createElement("li")
    newPost.setAttribute("class", "blog-post")

    const postDate = document.createElement("h4")
    const formattedDate = post.date.toLocaleString('en-UK', { timeZoneName: 'short'})
    postDate.textContent = formattedDate
    newPost.appendChild(postDate)

    const postTitle = document.createElement("h3")
    postTitle.textContent = post.title
    newPost.appendChild(postTitle)

    const postRelapseLabel = document.createElement("label")
    postRelapseLabel.setAttribute("for", `rel-${listId}-${post.date}`)
    postRelapseLabel.textContent = "Relapse since last post? "
    newPost.appendChild(postRelapseLabel)

    const postRelapse = document.createElement("input")
    postRelapse.checked = post.relapse
    postRelapse.setAttribute("type", "checkbox")
    postRelapse.setAttribute("name", `rel-${listId}-${post.date}`)
    postRelapse.setAttribute("id", `rel-${listId}-${post.date}`)
    postRelapse.disabled = true
    newPost.appendChild(postRelapse)

    const postBody = document.createElement("p")
    postBody.textContent = post.body
    newPost.appendChild(postBody)

    return newPost

}