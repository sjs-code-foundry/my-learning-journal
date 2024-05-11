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

    let imgUrl = postPlaceholderImgSrc

    const tests = [".jpg",".png",".svg"]

    for (let t in tests) {

        const imgFormatStr = source.substr(source.length - tests[t].length)

        if (imgFormatStr === tests[t]) {

            imgUrl = source

        }

    }

    return imgUrl

}

/* ========================
    Individual Post Bodies
   ======================== */

/* ==== Markdown List ==== */

const blogContent = [
    `
    # Heading 1
    ## Heading 2
    ### Heading 3
    #### Heading 4
    ##### Heading 5
    ###### Heading 6
    Paragraph
    - [ ] Checkbox List
    `,
    `# hello, markdown!`,
    `2024-01-29`,
    `2024-02-05`,
    `2024-02-12`,
    `2024-02-19`,
    `# This is a primary heading
    This is a paragraph full of stuff and things.  This should be displayed minus the heading above.  If that's the case, we've succeeded!
    ## This is a secondary heading
    This is another paragraph full of wonders and excitement.  This should not be displayed in the hero or the blog roll.  This is for those intrepid souls that wish to read in detail.`]

/* ================
    Assembled Data
   ================ */

// Assemble the post data into objects for export

export const posts = [
    new PostTemplate("img/blog-img/caftos-NEFPdToQ57k-unsplash.jpg", "2024-01-15 21:42:00", "This is bad", blogContent[0], true),
    new PostTemplate("img/blog-img/jungwoo-hong-cYUMaCqMYvI-unsplash.jpg", "2024-02-12 19:32:00", "Getting better", blogContent[4], false),
    new PostTemplate("img/blog-img/j-williams-5lWfPoWH6EY-unsplash.jpg", "2024-01-29 14:59:00", "This is good", blogContent[2], false),
    new PostTemplate("img/blog-img/ian-dooley-hpTH5b6mo2s-unsplash.jpg", "2024-02-26 09:25:00", "I love freedom", blogContent[6], false),
    new PostTemplate("img/blog-img/conor-samuel-K5BFXOsFp7g-unsplash.jpg", "2024-02-05 18:46:00", "Bollocks", blogContent[3], true),
    new PostTemplate("img/blog-img/jason-hogan-YyFwUKzv5FM-unsplash.jpg", "2024-02-19 08:11:00", "Freedom!", blogContent[5], false),
    new PostTemplate("", "2024-01-22 12:04:00", "This is ok", blogContent[1], false)
]

// Posts deliberately out of order to test automated sorting functions
// Image for post on 2024-01-22 intentionally left blank to test placeholder image function