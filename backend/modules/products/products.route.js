import express from 'express';
import upload from '../../middlewares/multer.middleware.js';
import {
    createFullProduct,
    getProducts,
    getProductById
} from './products.controller.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', upload.array('images', 5), createFullProduct);

export default router;
