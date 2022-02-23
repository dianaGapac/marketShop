const products = [
    {
        name: 'Nike Air Huarache',
        image: '/images/air-huarache.jfif',
        description: "Built to fit your foot and designed for comfort, the Nike Air Huarache brings back the street-level favourite.Smooth leather on the upper mix with super-breathable, perfectly shined neoprene-like fabric for easy styling.The low-cut collar and bootie-like construction keep it sleek and comfy.The iconic heel clip and stripped away branding keep the '90s running look you love.",
        brand: 'Nike',
        category: 'Women',
        review:[{
            name: 'Tommy Shelby',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Shane Walsh',
            rating: 5,
            comment:'Good Quality Product.'
        },
        {
            name: 'Rick Grimes',
            rating: 5,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 5,
        numReviews: 3, 
        price: 6445,
        countInStock: 10,
        variations: [
            { size: 'US6',countInStock: 10},
            { size: 'US7',countInStock: 10},
            { size: 'US8',countInStock: 10},
            { size: 'US9',countInStock: 10},]
    },
    {
        name: 'Nike Jordan Air',
        image: '/images/jordan-air.jfif',
        description: "The Jordan Air NFH is an everyday sneaker with basketball in its DNA.Details like visible Air cushioning, stitched overlays and herringbone traction hook to the brand's performance pedigree.Lightweight materials and an easy fit make it comfortable.",
        brand: 'Nike',
        category: 'Women',
        review:[{
            name: 'Flow G',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Tony Stark',
            rating: 5,
            comment:'Good Quality Product.'
        },
        {
            name: 'Roronoa Zoro',
            rating: 5,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 5,
        numReviews: 3,
        price: 5895,
        countInStock: 10,
        variations: [
            { size: 'US6',countInStock: 10},
            { size: 'US7',countInStock: 10},
            { size: 'US8',countInStock: 10},
            { size: 'US9',countInStock: 10},]
    },
    {
        name: 'Nike Blazer Low',
        image: '/images/nikeblazer-low.jfif',
        description: "Praised by the streets for its classic simplicity and comfort, the Nike Blazer Low '77 returns with its low-profile, classic hoops style. Featuring crisp leather, a retro Swoosh design and super-soft, low-cut collar, it's a must-have wardrobe staple.",
        brand: 'Nike',
        category: 'Women',
        review:[{
            name: 'John Mark',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Daryl Dixon',
            rating: 5,
            comment:'Good Quality Product.'
        },
        {
            name: 'Rick Grimes',
            rating: 5,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 5,
        numReviews: 3,
        price: 4295,
        countInStock: 10,
        variations: [
            { size: 'US6',countInStock: 10},
            { size: 'US7',countInStock: 10},
            { size: 'US8',countInStock: 10},
            { size: 'US9',countInStock: 10},]
    },
    {
        name: 'Nike Blazer Low 77',
        image: '/images/nikeblazer-low-77.jfif',
        description: "Praised by the streets for its classic simplicity and comfort, the Nike Blazer Low '77 returns with its low-profile, classic hoops style. Featuring crisp leather, a retro Swoosh design and super-soft, low-cut collar, it's a must-have wardrobe staple.",
        brand: 'Nike',
        category: 'Women',
        review:[{
            name: 'J-Hope',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Min Yoongi',
            rating: 5,
            comment:'Good Quality Product.'
        },
        {
            name: 'Kim Namjoon',
            rating: 5,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 5,
        numReviews: 3,
        price: 5599,
        countInStock: 0,
        variations: [
            { size: 'US6',price: 200,countInStock: 10},
            { size: 'US7',price: 200,countInStock: 10},
            { size: 'US8',price: 250,countInStock: 10},
            { size: 'US9',price: 300,countInStock: 10},
            { size: 'US10',price: 200,countInStock: 10},]
    },
    {
        name: 'Nike Court Legacy',
        image: '/images/nikecourt-legacy.jfif',
        description: "Honouring a history rooted in tennis culture, the NikeCourt Legacy Mule reinvents a classic with an easy-on design and comfy foam insole.Made from durable canvas and featuring heritage stitching and retro Swoosh design, it lets you blend sport and fashion.",
        brand: 'Nike',
        category: 'Women',
        review:[{
            name: 'John Shelby',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Carl Grimes',
            rating: 4,
            comment:'Good Quality Product.'
        },
        {
            name: 'Rick Grimes',
            rating: 5,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 5,
        numReviews: 3,
        price: 2295,
        countInStock: 10,
        variations: [
            { size: 'US6',countInStock: 10},
            { size: 'US7',countInStock: 10},
            { size: 'US8',countInStock: 10},
            { size: 'US9',countInStock: 10},]
    },
    {
        name: 'Nike Waffle One',
        image: '/images/nikewaffle-one.jfif',
        description: 'High Quality Shoes in your Area.',
        brand: 'Nike',
        category: 'Women',
        review:[{
            name: 'Vinsmoke Sanji',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Doflamingo',
            rating: 4,
            comment:'Good Quality Product.'
        },
        {
            name: 'Charlotte Katakuri',
            rating: 4,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 4.5,
        numReviews: 3,
        price: 5500,
        countInStock: 10,
        variations: [
            { size: 'US6',countInStock: 10},
            { size: 'US7',countInStock: 10},
            { size: 'US8',countInStock: 10},
            { size: 'US9',countInStock: 10},]
    },
    {
        name: 'Nike Winflo 8',
        image: '/images/nike-winflo.jfif',
        description: "If running is a daily habit, you need support to match your speed. The Nike Winflo 8 brings back the cushioning you love and pairs it with details like a translucent upper and Flywire technology for a snug, stable fit for long road runs.",
        brand: 'Nike',
        category: 'Women',
        review:[{
            name: 'Mark Shelby',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Shane Walsh',
            rating: 4,
            comment:'Good Quality Product.'
        },
        {
            name: 'Rick Grimes',
            rating: 4,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 4.5,
        numReviews: 3,
        price: 5095,
        countInStock: 10,
        variations: [
            { size: 'US6',countInStock: 10},
            { size: 'US7',countInStock: 10},
            { size: 'US8',countInStock: 10},
            { size: 'US9',countInStock: 10},]
    },
    {
        name: 'Nike Air Zoom',
        image: '/images/nikeair-zoom.jfif',
        description: "Your workhorse with wings returns.The Nike Air Zoom Pegasus 38 has that extra bounce for long, short or everyday runs.It's cool and breathable with a wider fit at the toes and plenty of cushioned support that will make you feel like you're flying on the road.Bold colours nod to the world coming together to celebrate sport.",
        brand: 'Nike',
        category: 'Women',
        review:[{
            name: 'Mark Shelby',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Shane Walsh',
            rating: 4,
            comment:'Good Quality Product.'
        },
        {
            name: 'Rick Grimes',
            rating: 4,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 4.5,
        numReviews: 3,
        price: 5349,
        countInStock: 10,
        variations: [
            { size: 'US6',countInStock: 10},
            { size: 'US7',countInStock: 10},
            { size: 'US8',countInStock: 10},
            { size: 'US9',countInStock: 10},]
    },
    {
        name: 'Nike Men Air Jordan 1 Mid',
        image: '/images/air-jordan-1-mid.jfif',
        description: "Ground your style in Flight with the Air Jordan 1 Mid, the sneaker of endless possibilities.Fresh as ever, this special edition of the famous mid-top shoe delivers non-stop comfort for anyone who can't get enough of the heritage classic.",
        brand: 'Nike',
        category: 'Men',
        review:[{
            name: 'Mark Shelby',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Shane Walsh',
            rating: 4,
            comment:'Good Quality Product.'
        },
        {
            name: 'Rick Grimes',
            rating: 4,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 4.5,
        numReviews: 3,
        price: 6595,
        countInStock: 10,
        variations: [
            { size: 'US7',countInStock: 10},
            { size: 'US8',countInStock: 10},
            { size: 'US9',countInStock: 10},
            { size: 'US10',countInStock: 10},]
    },
    {
        name: 'Nike Men Airforce 1',
        image: '/images/air-force-1.jfif',
        description: "The radiance lives on in the Nike Air Force 1 '07 Premium, the b-ball icon that puts a fresh spin on what you know best. It has stitched overlays, bold colours and the perfect amount of hoops style to make heads turn.",
        brand: 'Nike',
        category: 'Men',
        review:[{
            name: 'Mark Shelby',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Shane Walsh',
            rating: 4,
            comment:'Good Quality Product.'
        },
        {
            name: 'Rick Grimes',
            rating: 4,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 4.5,
        numReviews: 3,
        price: 7095,
        countInStock: 10,
        variations: [
            { size: 'US7',countInStock: 10},
            { size: 'US8',countInStock: 10},
            { size: 'US9',countInStock: 10},
            { size: 'US10',countInStock: 10},]
    },

    {
        name: 'Nike Free Terra Vista',
        image: '/images/terra-vista.jfif',
        description: "From the streets to the trails to anywhere in between, the Nike Free Terra Vista makes everything common ground. Made from at least 20% recycled content by weight, this pair will be your go-to for all of your wild adventures. Its rugged upper features mesh, webbing and other durable textiles for an outdoorsy vibe.",
        brand: 'Nike',
        category: 'Men',
        review:[{
            name: 'Mark Shelby',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Shane Walsh',
            rating: 4,
            comment:'Good Quality Product.'
        },
        {
            name: 'Rick Grimes',
            rating: 4,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 4.5,
        numReviews: 3,
        price: 6595,
        countInStock: 10,
        variations: [
            { size: 'US7',countInStock: 10},
            { size: 'US8',countInStock: 10},
            { size: 'US9',countInStock: 10},
            { size: 'US10',countInStock: 10},]
    },
    {
        name: 'Nike Men Revolution 6',
        image: '/images/revolution-6.jfif',
        description: "Here's to new beginnings between you and the tarmac.Lace up the 100% recycled laces and set the pace at the start of your running journey with the plush feel of the Nike Revolution 6 Next Nature.We know comfort is key to a successful run, so we made sure your steps are cushioned and flexible for a soft ride.It's an evolution of a favourite, with a breathable design made from at least 20% recycled content by weight.",
        brand: 'Nike',
        category: 'Men',
        review:[{
            name: 'Mark Shelby',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Shane Walsh',
            rating: 4,
            comment:'Good Quality Product.'
        },
        {
            name: 'Rick Grimes',
            rating: 4,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 4.5,
        numReviews: 3,
        price: 2895,
        countInStock: 10,
        variations: [
            { size: 'US7',countInStock: 10},
            { size: 'US8',countInStock: 10},
            { size: 'US9',countInStock: 10},
            { size: 'US10',countInStock: 10},]
    },
    {
        name: 'Nike Men Legend',
        image: '/images/nike-legend.jfif',
        description: "The Nike Legend Essential 2 Premium is equipped with a flat, stable heel, flexibility under the toes and side-to-side support. With tons of grip, you're ready to lift, HIIT, conquer a class or get stronger at the machines.",
        brand: 'Nike',
        category: 'Men',
        review:[{
            name: 'Mark Shelby',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Shane Walsh',
            rating: 4,
            comment:'Good Quality Product.'
        },
        {
            name: 'Rick Grimes',
            rating: 4,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 4.5,
        numReviews: 3,
        price: 2895,
        countInStock: 10,
        variations: [
            { size: 'US7',countInStock: 10},
            { size: 'US8',countInStock: 10},
            { size: 'US9',countInStock: 10},
            { size: 'US10',countInStock: 10},]
    },
    {
        name: 'Nike Kids Air Force 1',
        image: '/images/kid-air-force-1.jfif',
        description: "There's a fun secret about the Nike Air Force 1 Crater: It's got sustainable materials from top to bottom.A see-through design provides a peek into the legend of these classic kicks.Plus, super-soft Crater foam is made kid-right and lets you give a little back with every step.These shoes contain at least 20% recycled content by weight.",
        brand: 'Nike',
        category: 'Kids',
        review:[{
            name: 'Mark Shelby',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Shane Walsh',
            rating: 4,
            comment:'Good Quality Product.'
        },
        {
            name: 'Rick Grimes',
            rating: 4,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 4.5,
        numReviews: 3,
        price: 4995,
        countInStock: 10,
        variations: [
            { size: 'US4Y',countInStock: 10},
            { size: 'US5Y',countInStock: 10},
            { size: 'US6Y',countInStock: 10},
            { size: 'US7Y',countInStock: 10},]
    },
    {
        name: 'Nike Kids Revolution 5',
        image: '/images/revolution-5.jfif',
        description: "Run and play in the Nike Revolution 5.Lightweight mesh stretches around your feet, and soft foam cushioning gives you revolutionary comfort.",
        brand: 'Nike',
        category: 'Kids',
        review:[{
            name: 'Mark Shelby',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Shane Walsh',
            rating: 4,
            comment:'Good Quality Product.'
        },
        {
            name: 'Rick Grimes',
            rating: 4,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 4.5,
        numReviews: 3,
        price: 2795,
        countInStock: 10,
        variations: [
            { size: 'US4Y',countInStock: 10},
            { size: 'US5Y',countInStock: 10},
            { size: 'US6Y',countInStock: 10},
            { size: 'US7Y',countInStock: 10},]
    },
    {
        name: 'Nike Kids Free RN 2021',
        image: '/images/free-rn-2021.jfif',
        description: "Lighten little ones' steps with the Nike Free RN 2021.Kiddos can play fast with these super-lightweight running-inspired kicks all day.With deep flex grooves, stretchy knit material and a secure strap, we bring the next evolution of the Free's barefoot-like feel to growing, active feet.",
        brand: 'Nike',
        category: 'Kids',
        rating: 5,
        numReviews: 9,
        price: 3345,
        countInStock: 10,
        variations: [
            { size: 'US4Y',countInStock: 10},
            { size: 'US5Y',countInStock: 10},
            { size: 'US6Y',countInStock: 10},
            { size: 'US7Y',countInStock: 10},]
    },
    {
        name: 'Nike Kids Revolution 6',
        image: '/images/kid-revolution-6.jfif',
        description: "We prioritise comfort, especially for our growing athletes. Made with 20% recycled content by weight, you can take these lightweight, breathable running shoes from all-day play to any-time wear and even athletics training. Lightweight, breathable and cushioned for growing feet, the race starts now.",
        brand: 'Nike',
        category: 'Kids',
        review:[{
            name: 'Mark Shelby',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Shane Walsh',
            rating: 4,
            comment:'Good Quality Product.'
        },
        {
            name: 'Rick Grimes',
            rating: 4,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 4.5,
        numReviews: 3,
        price: 2795,
        countInStock: 10,
        variations: [
            { size: 'US4Y',countInStock: 10},
            { size: 'US5Y',countInStock: 10},
            { size: 'US6Y',countInStock: 10},
            { size: 'US7Y',countInStock: 10},]
    },

    {
        name: 'Nike Kids Air Jordan 1 Mid',
        image: '/images/kid-air-jordan-1-mid.jfif',
        description: "Death and the journey to Mictlán is a challenging path, but being connected to your loved ones is forever. Reflect on the experience and celebrate the holiday in this throwback version of the Air Jordan 1 Mid SE. Deep pigments and glossy Jaguar-print overlays work together to represent the animal guides that help usher you into the afterlife.",
        brand: 'Nike',
        category: 'Kids',
        review:[{
            name: 'Mark Shelby',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Shane Walsh',
            rating: 4,
            comment:'Good Quality Product.'
        },
        {
            name: 'Rick Grimes',
            rating: 4,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 4.5,
        numReviews: 3,
        price: 2795,
        countInStock: 10,
        variations: [
            { size: 'US4Y',countInStock: 10},
            { size: 'US5Y',countInStock: 10},
            { size: 'US6Y',countInStock: 10},
            { size: 'US7Y',countInStock: 10},]
    },
    {
        name: 'Nike Kids Court Legacy',
        image: '/images/kid-court-legacy.jfif',
        description: "The NikeCourt Legacy serves up style rooted in tennis culture. They are durable and comfy with heritage stitching and a retro Swoosh. When you pull these on—it's game, set, match.",
        brand: 'Nike',
        category: 'Kids',
        review:[{
            name: 'Mark Shelby',
            rating: 5,
            comment:'Not Bad'
        },
        {
            name: 'Shane Walsh',
            rating: 4,
            comment:'Good Quality Product.'
        },
        {
            name: 'Rick Grimes',
            rating: 4,
            comment:'Excellent product but takes to much time to deliver'
        },
    ],
        rating: 4.5,
        numReviews: 3,
        price: 2295,
        countInStock: 10,
        variations: [
            { size: 'US4Y',countInStock: 10},
            { size: 'US5Y',countInStock: 10},
            { size: 'US6Y',countInStock: 10},
            { size: 'US7Y',countInStock: 10},]
    },
    
    


]
export default products