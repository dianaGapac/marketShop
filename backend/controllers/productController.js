import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import  Order from '../models/orderModel.js'



// @desc Fetch all products
// @route GET '/api/products'
// @access Public
const getProducts = asyncHandler (async( req,res) =>{
    const products = await Product.find({})
    res.json(products)
})

// @desc Get Product By ID
// @route GET '/api/products/:id'
// @access Public

const getProductsById = asyncHandler (async( req,res) =>{
    const product= await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        throw new Error('Product Not Found')
    }
}) 


// @desc Delete a product
// @route DELETE '/api/products/:id
// @access Private/Admin

const deleteProduct = asyncHandler (async( req,res) =>{
    const product= await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({message: 'Product Removed'})
    }else{
        throw new Error('Product Not Found')
    }
}) 

// @desc Create product
// @route POST '/api/products
// @access Private/Admin

const createProduct = asyncHandler (async( req,res) =>{
   const product= new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'

   })

   const createdProduct =  await product.save()
   res.status(201).json(createdProduct)
})


// @desc Update product
// @route PUT '/api/products/:id
// @access Private/Admin

const updateProduct = asyncHandler (async( req,res) =>{
    const {name, price, description, image, brand, category, countInStock}= req.body
    
    const product = await Product.findById(req.params.id)

    if(product){

        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand  
        product.category = category
        product.countInStock = countInStock
        
        const updatedProduct =  await product.save()
        res.json(updatedProduct)

    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
    
 })


 // @desc Create new Review
// @route POST '/api/products/:id/reviews
// @access Private

const createProductReview = asyncHandler (async( req,res) =>{
    const {productId,rating,review} = req.body

    const product= await Product.findById(productId) 

    if(product) {
       
        const newReview ={
            name: req.user.name,
            rating: Number(rating),
            comment:review,
         }

         product.review.push(newReview)
         
         product.numReviews = product.review.length
         product.rating = product.review.reduce((acc, item) => item.rating + acc, 0) / product.review.length
         await product.save()
         res.status(201).json({message: 'Review Added'}) 
         console.log('Review Added')
    } else{
        res.status(404)
        throw new Error('Product Not Found') }
        
    
/*
    if(product){
        const review ={
            name: req.user.name,
            rating: Number(rating),
            comment:review,
            user: req.user._id }

        product.reviews.push(review)
         
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(201).json({message: 'Review Added'}) 

    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }  */
    
 })

export{
    getProducts,
    getProductsById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
}