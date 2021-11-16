import express from 'express';

import { getProducts, findProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getProducts);
router.post('/',auth, createProduct);
router.post('/search',auth, findProduct);
router.patch('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

export default router;