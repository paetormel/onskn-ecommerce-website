import express from 'express'
import authRoutes from '../modules/auth/auth.route.js'
import productRoutes from '../modules/products/products.route.js'
import uploadRoutes from '../modules/uploads/upload.route.js'

 const router = express.Router();

 router.use('/auth', authRoutes)
 router.use('/products', productRoutes)
 router.use('/uploads', uploadRoutes)

  export default router