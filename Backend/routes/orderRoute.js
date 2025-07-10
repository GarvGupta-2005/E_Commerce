import express from 'express'

import { placeOrder,userOrders,allOrders,updateStatus } from '../controllers/orderController.js'

import authAdmin from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

//Admin Features
orderRouter.post('/list',authAdmin,allOrders);
orderRouter.post('/status',authAdmin,updateStatus);

//Payment Features
orderRouter.post('/place',authUser,placeOrder);
// orderRouter.post('/stripe',authUser,placeOrderStripe);
// orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

//User features
orderRouter.post('/userorders',authUser,userOrders);

export default orderRouter;

