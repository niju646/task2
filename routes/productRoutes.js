import express from 'express';
import { addProduct,getProducts,updateProduct,getProductsById,deleteProduct } from '../controllers/productControllers.js';

const router = express.Router();

router.post('/',addProduct);
router.get('/',getProducts);
router.get('/:id',getProductsById);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);


export default router;