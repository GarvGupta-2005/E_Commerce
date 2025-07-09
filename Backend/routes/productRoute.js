import express from 'express'

import { addProduct,listProducts,singleProduct,removeProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/adminAuth.js';

const productRouter = express.Router()


productRouter.post('/add',authAdmin,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);
productRouter.post('/remove',authAdmin,removeProduct);
productRouter.get('/list',listProducts);
productRouter.post('/single',singleProduct)


export default productRouter