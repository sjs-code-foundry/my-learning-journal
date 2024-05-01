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

/* == Post Placeholder Display Limiter  == */

let postDisplayCount = 3

/* == Post Placeholder Data  == */

const postPlaceholderImgSrc = "img/blog-img/kelly-sikkema-N3o-leQyFsI-unsplash.jpg"

const posts = [
    new PostTemplate(postPlaceholderImgSrc, "2024-01-15 21:42:00", "This is bad", "Something something bad", true),
    new PostTemplate(postPlaceholderImgSrc, "2024-01-22 12:04:00", "This is ok", "Something something ok", false),
    new PostTemplate(postPlaceholderImgSrc, "2024-02-26 14:59:00", "This is good", "Something something good", false),
    new PostTemplate(postPlaceholderImgSrc, "2024-02-05 18:46:00", "Bollocks", "Something something I'm a failure", true),
    new PostTemplate(postPlaceholderImgSrc, "2024-02-12 19:32:00", "Getting better", "Something something things are looking up", false),
    new PostTemplate(postPlaceholderImgSrc, "2024-02-19 08:11:00", "Freedom!", "Something something a new life begins", false),
    new PostTemplate(postPlaceholderImgSrc, "2024-01-15 09:25:00", "I love freedom", "Something something new life is going well", false)
]

const sortedPosts = sortBlogPostListByDate(posts, true)

renderBlogPostList(sortedPosts, postDisplayCount)

/* ========================
    Object Constructors
   ======================== */

function PostTemplate(img, date, title, body, relapseBool) {

    this.imgUrl = img
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

const blogDisplayBtnList = getIdsFromGatheringElsByClass("blog-display-btn")

for (let btn of blogDisplayBtnList) {

    const dispBtn = document.getElementById(btn)

    dispBtn.addEventListener("click", function() {

        postDisplayCount = increasePostDisplayLimit(postDisplayCount, 3, posts.length)

        if (postDisplayCount >= posts.length) {

            hideViewMorePostBtns()

        }

        clearBlogPostList()
        renderBlogPostList(posts, postDisplayCount)

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

function renderLatestSplashPost(post, listId) {

    // Create splash image, date, title, first paragraph in that order

    // Append each child to newSplash

    // return newSplash

}

function renderBlogPost(post, listId) {

    let newPost = document.createElement("li")
    newPost.setAttribute("class", "blog-post")

    const postImg = document.createElement("img")
    postImg.setAttribute("src", post.imgUrl)
    newPost.appendChild(postImg)

    const postDate = document.createElement("h4")
    const formattedDate = post.date.toLocaleString('en-UK', { dateStyle: 'full', hour12: true})
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