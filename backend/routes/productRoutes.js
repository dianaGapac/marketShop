import express from 'express'
import { getProducts,getProductsById, deleteProduct, createProduct, updateProduct,createProductReview } from'../controllers/productController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

 
const router = express.Router()

router.route('/').get(getProducts)
.post(protect, admin, createProduct)

router.route('/review').post(protect, createProductReview)

router.route('/:id').get(getProductsById)
.delete(protect,admin,deleteProduct)
.put(protect, admin, updateProduct)





export default router