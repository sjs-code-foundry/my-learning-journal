/* ============
    Imports
   ============ */

import { v4 as uuidv4 } from "https://esm.sh/uuid";

/* ============
    Constants
   ============ */

const postPlaceholderImgSrc = "img/blog-img/kelly-sikkema-N3o-leQyFsI-unsplash.jpg"

/* ========================
    Object Constructors
   ======================== */

function PostTemplate(img, date, title, body, relapseBool) {

    this.uuid = uuidv4()
    this.imgUrl = setImgOrPlaceholder(img)
    this.date = new Date(date)
    this.title = title
    this.body = body
    this.relapse = relapseBool

    /*
    uuid: unique identifier for selecting posts
    imgUrl: Image for blog post
    date: Date object
    title: Title
    body: General sharing in blog post
    relapse: whether or not the author relapsed recently
    */

}

// Store the body text as markdown to be translated into HTML elements in index.js using showdown

/* ============
    Functions
   ============ */

function setImgOrPlaceholder(source) {

    const image = new Image()
    image.src = source

    let fail = false

    image.onload = function() {

        console.log(image.src)

    }

    image.onerror = function(fail) {

        console.log(`Image src=${image.src} failed to load`)

        return fail = true // Does not pass through - FIX!!!

    }

    if (!fail) {

        return image.src

    } else {

        return postPlaceholderImgSrc

    }

    // fetch(source, { method: 'HEAD' })
    //     .then(res => {

    //         if (res.ok) {

    //             console.log(`Image src=${source} exists.`)

    //             return source

    //         } else {

    //             console.log(`Image not found.`)

    //         }

    //     }).catch(err => console.log('Error:', err))

}

/* ========================
    Individual Post Bodies
   ======================== */

/* ==== Markdown List ==== */

const blogContent = [
    `2024-01-15`,
    `2024-01-22`,
    `2024-01-29`,
    `2024-02-05`,
    `2024-02-12`,
    `2024-02-19`,
    `2024-02-26`]

/* ================
    Assembled Data
   ================ */

// Assemble the post data into objects for export

export const posts = [
    new PostTemplate("img/blog-img/caftos-NEFPdToQ57k-unsplash.jpg", "2024-01-15 21:42:00", "This is bad", blogContent[0], true),
    new PostTemplate("img/blog-img/", "2024-02-12 19:32:00", "Getting better", blogContent[4], false),
    new PostTemplate("img/blog-img/", "2024-01-29 14:59:00", "This is good", blogContent[2], false),
    new PostTemplate("img/blog-img/", "2024-02-26 09:25:00", "I love freedom", blogContent[6], false),
    new PostTemplate("img/blog-img/", "2024-02-05 18:46:00", "Bollocks", blogContent[3], true),
    new PostTemplate("img/blog-img/", "2024-02-19 08:11:00", "Freedom!", blogContent[5], false),
    new PostTemplate("img/blog-img/", "2024-01-22 12:04:00", "This is ok", blogContent[1], false)
]  // Deliberately out of order to test automated sorting functions