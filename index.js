/* ============
    Imports
   ============ */

import { posts as postContent } from "/posts.js"
import showdown from "https://esm.sh/showdown"

console.log(postContent)

/* ================
    DOM Elements
   ================ */

const tabMenuEl = document.getElementById("tab-menu")
const tabMenuHomeBtn = document.getElementById("tab-menu-home")

const heroPostEl = document.getElementById("hero-post")

const allSections = document.getElementsByClassName("section-content")

/* ================================
    Constants/Default Functions
   ================================ */

/* ==== Constants ==== */

const dateOptions = ['en-UK', { dateStyle: 'full' }]
const fullDateOptions = ['en-UK', { dateStyle: 'full', timeStyle: 'long'}]

/* ==== Post Placeholders ==== */

/* == Post Placeholder Display Limiter  == */

let postDisplayCount = 3

/* == Post Placeholder Data  == */

const sortedPosts = sortBlogPostListByDate(postContent, true)

/* ==== Default Functions ==== */

tabDefault(tabMenuHomeBtn.dataset.tab)

renderLatestSplashPost(sortedPosts)
renderBlogPostList(sortedPosts, postDisplayCount)

/* ========================
    Object Constructors
   ======================== */

// Object Constructors Here

/* ====================
    Event Listeners
   ==================== */

/* ==== General Page Functions ==== */

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

/* ==== Hero Post ==== */

heroPostEl.addEventListener("click", function(e) {

    const uuid = getUuidFromBlogPostEl(e.target)

    openBlogPost(uuid)

})

/* ==== Blog Roll ==== */

const blogDisplayBtnList = getIdsFromGatheringElsByClass("blog-display-btn")

for (let btn of blogDisplayBtnList) {

    const dispBtn = document.getElementById(btn)

    dispBtn.addEventListener("click", function() {

        postDisplayCount = increasePostDisplayLimit(postDisplayCount, 3, postContent.length)

        if (postDisplayCount >= postContent.length) {

            hideViewMorePostBtns()

        }

        clearBlogPostList()
        renderBlogPostList(postContent, postDisplayCount)

    })

}

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

/* == Opening Blog Post == */

function openBlogPost(uuid) {

    renderBlogPostPage(uuid)

    tabSwitch(document.getElementById("sect-post"))

}

function getUuidFromBlogPostEl(targetEl) {

    let uuid = ""

    if (targetEl.parentNode.nodeName === "LI" || targetEl.parentNode.id === "hero-post") {

        uuid = targetEl.parentNode.dataset.uuid

    } else {

        uuid = targetEl.dataset.uuid

    }

    return uuid

}

function renderBlogPostPage(postId) {

    const selectedPost = postContent.find(({ uuid }) => uuid === postId )

    const postContainerEl = document.getElementById("selected-post")

    postContainerEl.innerHTML = ""

    // Render selectedPost
    const postDate = document.createElement("h3") // Account for changes in heading size in new functions
    const formattedDate = selectedPost.date.toLocaleString(fullDateOptions[0], fullDateOptions[1])
    postDate.textContent = formattedDate
    postContainerEl.appendChild(postDate)

    const postTitle = document.createElement("h1") // Account for changes in heading size in new functions
    postTitle.textContent = selectedPost.title
    postContainerEl.appendChild(postTitle)

    const postImg = document.createElement("img")
    postImg.setAttribute("src", selectedPost.imgUrl)
    postContainerEl.appendChild(postImg)

    // Set Relapse Checkbox here (requires bespoke code)

    postContainerEl.innerHTML += bodyMdToHTML(selectedPost.body)

    // Render date with options from fullDateOptions const

}

/* == Blog Roll == */

function increasePostDisplayLimit(displayCount, incAmount, limit) {

    if (displayCount >= limit || (displayCount + incAmount) >= limit) {

        return limit

    } else {

        return displayCount + incAmount

    }

}

function sortBlogPostListByDate(blogs, asc) {

    let sortedList = []

    function dateCompare(a, b) {

        let compare

        if (asc) {

            compare = a.date - b.date

        } else {

            compare = b.date - a.date

        }

        return compare

    }

    sortedList = blogs.sort(dateCompare)

    return sortedList

}

function renderBlogPostList(posts, limit) {

    const idList = getIdsFromGatheringElsByClass("blog-reel")

    for (let id in idList) {

        let blogReelEl = document.getElementById(idList[id])
        
        
        for (let i = 0; i < limit; i++) {

            blogReelEl.appendChild(renderBlogPost(posts[i], idList[id]))

        }

    }

}

function clearBlogPostList() {

    const idList = getIdsFromGatheringElsByClass("blog-reel")

    for (let id in idList) {

        let blogReelEl = document.getElementById(idList[id])

        blogReelEl.innerHTML = ""

    }

}

function hideViewMorePostBtns() {

    for (let btn of blogDisplayBtnList) {

        const dispBtn = document.getElementById(btn)

        dispBtn.style.display = "none"

    } // Duplicate form field id in the same form - Get to the bottom of this

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
    newPost.setAttribute("data-uuid", post.uuid)

    const postImg = document.createElement("img")
    postImg.setAttribute("src", post.imgUrl)
    newPost.appendChild(postImg)

    const postDate = document.createElement("h4")
    const formattedDate = post.date.toLocaleString(dateOptions[0], dateOptions[1])
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

    newPost.addEventListener("click", function(e) {

        const uuid = getUuidFromBlogPostEl(e.target)

        openBlogPost(uuid)

    })

    return newPost

}

/* == Hero Post == */

function renderLatestSplashPost(postList) {

    const latestPost = postList.reduce(function(prev, current) {

        return (prev && prev.date > current.date) ? prev: current

    })

    heroPostEl.style.backgroundImage = `url(${latestPost.imgUrl})`
    heroPostEl.dataset.uuid = latestPost.uuid

    const postDate = document.createElement("h4")
    const formattedDate = latestPost.date.toLocaleString(dateOptions[0], dateOptions[1])
    postDate.textContent = formattedDate
    heroPostEl.appendChild(postDate)

    const postTitle = document.createElement("h3")
    postTitle.textContent = latestPost.title
    heroPostEl.appendChild(postTitle)

    const postBody = document.createElement("p")
    postBody.textContent = latestPost.body
    heroPostEl.appendChild(postBody)

}

/* == Post Elements == */

// Migrate identical functions across blog post constructors to this area

function bodyMdToHTML(markdown) {

    const converter = new showdown.Converter({noHeaderId: true})

    const splitMd = markdown.split(/\r?\n|\r|\n/g)

    let convMdToHTML = ""

    for (let line in splitMd) {

        convMdToHTML += converter.makeHtml(splitMd[line].trim())

    }

    console.log(convMdToHTML)

    return convMdToHTML

}

// Apply above to Hero and Post Lists, but only use the first paragraph