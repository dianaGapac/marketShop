import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'



// @desc Fetch all products
// @route GET '/api/products'
// @access Public
const getProducts = asyncHandler (async( req,res) =>{
    const products = await Product.find({})
    res.json(products)
}) 

const getProductsById = asyncHandler (async( req,res) =>{
    const product= await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        throw new Error('Product Not Found')
    }
}) 

export{
    getProducts,
    getProductsById
}