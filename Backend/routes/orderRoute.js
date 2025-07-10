import express from 'express'

import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
  placeOrderMockPay,
  verifyMockPayment,
} from "../controllers/orderController.js";
import authAdmin from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

//Admin Features
orderRouter.post('/list',authAdmin,allOrders);
orderRouter.post('/status',authAdmin,updateStatus);

//Payment Features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post("/mockpay", authUser, placeOrderMockPay);
orderRouter.post("/mockverify", authUser, verifyMockPayment);


//User features
orderRouter.post('/userorders',authUser,userOrders);

export default orderRouter;

