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
    I can't trust myself on my own computer.  It seems like every time I'm doing nothing at my desk I find myself acting out before I know what's going on.
    The problem is that I need my computer for my job, it's not like apps can be made on paper!  When I'm deep in my work I don't even think about acting out, and even when I do I can immerse myself back into the code and forget about it.  It's when I'm sitting idle that I'm most at risk.
    ## Dopamine and me
    I read somewhere online that when I relapse It's because my brain is craving a hormone called dopamine, and that the best way I can keep urges at bay is not to sit there and force the urges down, but to ride the urge and find healthier ways of getting my fix.  I've been looking to get into drawing, I've always wanted to be able to draw like the pros.
    ## What do I need to work on?
    - Get block software
    - Limit the amount of screen time
    - Find healthier ways of getting my dopamine fix (take up drawing!)
    `,
    `
    I'm getting back on track after my latest relapse, hopefully this will last a lot longer this time.  I'm implementing a meditation practice every morning and night to help me clear my mind and examine my thoughts without judgement.
    Drawing practice is so-so, I'm pleased with what I can accomplish so far but I'm quite far removed from recreating a Constable painting.
    ## Things are looking up!
    I think a bright future is ahead of me.  Maybe this time will be the time I finally break through!
    `,
    `
    My meditation habit is working wonders for my mental state!  For the first time I can silence the noise in my mind and just simply be.
    ## I'm going to be free!
    Oh, I'm definitely going to be free, just watch me!  90-day challenge here I come!
    `,
    `
    I don't know what happened.
    Here was me thinking that I had the world at my feet, but then at work today I had a sour interaction with a customer which left me angry by the time I got home.  Before I knew what was going on I had switched on my computer, bypassed my block software and, well, you know the rest.
    I don't think I can rely entirely on my block software to keep me sober, especially considering how technically skilled I am being involved with app development.  Perhaps if I found healthy interactions that could counteract my bad ones I would be better off.
    ## What do I need to do?
    - Get back on meditation
    - Consider taking up prayer
    - Find healthy ways of socializing
    `,
    `
    I'm getting back on my feet after my last failure.  It hasn't been easy getting into prayer in particular, having been raised as an atheist; it does seem a little silly to me to keep in touch with an almighty being in the sky.
    ## Prayer and Meditation
    ### Prayer
    Prayer is about accountability.  It isn't a telephone line to God to mail-order good fortune, it is a way of keeping in touch with an almighty being that knows when you're lying and therefore the practice forces one not to lie to oneself.
    ### Meditation
    Meditation is focused on the self.  You focus on one thing only, be it breath, sounds or bodily sensations, and then you can observe any thoughts that come up without judgement.  I find that some days I'm more serene than others, with some times feeling like I'm almost disembodied while at others my mind won't shut up!  With that said, the latter can be useful to discover hidden thoughts about myself I usually bury deep down.
    ## Turning to God
    Like I said, this feels very strange to me as a born-and-raised atheist, but I've noticed that when I do things that glorify God I find an inner strength that defies explanation; it's like I'm steered away from doom by some unseen loving hand.  I definitely need to investigate this further.
    `,
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