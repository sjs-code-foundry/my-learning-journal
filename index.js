/* ============
    Imports
   ============ */

import { posts as postContent } from "/posts.js"
import showdown from "https://esm.sh/showdown"

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

    postContainerEl.appendChild(createPostDateEl("h3", selectedPost, fullDateOptions))

    postContainerEl.appendChild(createPostTitleEl("h1", selectedPost))

    postContainerEl.appendChild(createPostImgEl(selectedPost))

    // Set Relapse Checkbox here (requires bespoke code)

    postContainerEl.innerHTML += bodyMdToHTML(selectedPost.body)

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

    newPost.appendChild(createPostImgEl(post))

    newPost.appendChild(createPostDateEl("h4", post, dateOptions))

    newPost.appendChild(createPostTitleEl("h3", post))

    newPost.appendChild(createPostRelapseIndicatorEl(post, listId))

    newPost.innerHTML += firstParagraphOnlyFromMdToHTML(post.body)

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

    heroPostEl.appendChild(createPostDateEl("h4", latestPost, dateOptions))

    heroPostEl.appendChild(createPostTitleEl("h3", latestPost))

    heroPostEl.innerHTML += firstParagraphOnlyFromMdToHTML(latestPost.body)

}

/* == Post Elements == */

function createPostImgEl(post) {

    const postImg = document.createElement("img")

    postImg.setAttribute("src", post.imgUrl)

    return postImg

}

function createPostDateEl(elTag, post, dateOptArr) {

    const postDate = document.createElement(elTag)

    const formattedDate = post.date.toLocaleString(dateOptArr[0], dateOptArr[1])

    postDate.textContent = formattedDate

    return postDate

}

function createPostTitleEl(elTag, post) {

    const postTitle = document.createElement(elTag)

    postTitle.textContent = post.title

    return postTitle

}

function createPostRelapseIndicatorEl(post, listId) {
    
    const relapseDiv = document.createElement("div")
    relapseDiv.setAttribute("class", "relapse-counter")

    const relapseTextEl = document.createElement("p")
    relapseTextEl.textContent = "Sober since last post? "
    relapseDiv.appendChild(relapseTextEl)

    const relapseStatusEl = document.createElement("img")
    relapseStatusEl.setAttribute("class", "relapse-indicator")

    if (post.relapse) {

        relapseStatusEl.setAttribute("src", "/img/ui-img/relapse.png")

    } else {

        relapseStatusEl.setAttribute("src", "/img/ui-img/sober.png")

    }

    relapseDiv.appendChild(relapseStatusEl)

    return relapseDiv

}

function bodyMdToElList(markdown) {

    const converter = new showdown.Converter({noHeaderId: true})

    const splitMd = markdown.split(/\r?\n|\r|\n/g)

    let convHtmlElList = []

    for (let line in splitMd) {

        convHtmlElList.push(converter.makeHtml(splitMd[line].trim()))

    }

    return convHtmlElList

}

function bodyMdToHTML(markdown) {

    const elList = bodyMdToElList(markdown)

    let convMdToHTML = ""

    for (let el in elList) {

        convMdToHTML += elList[el]

    }

    return convMdToHTML

}

function firstParagraphOnlyFromMdToHTML(markdown) {

    const elList = bodyMdToElList(markdown)

    let paraList = []

    for (let el in elList) {

        if (elList[el].startsWith("<p>")) {

            paraList.push(elList[el])

        }

    }

    if (paraList.length === 0) {

        paraList.push("<p>[No paragraph text entered]</p>")

    }

    return paraList[0]

}