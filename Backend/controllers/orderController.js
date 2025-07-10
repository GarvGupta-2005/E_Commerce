import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//placing order using COD
const placeOrder = async (req,res)=>{
    try {
        const {userId,items,amount,address} = req.body;
        const orderData  = {
            userId,items,address,amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const newOrder =  new orderModel(orderData)
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData:{}});
        res.json({success:true,message:"Order Placed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


// Place Order with Mock Razorpay
const placeOrderMockPay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const mockOrderId = "mock_" + Math.random().toString(36).substring(2, 12);

    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: "Mock Razorpay",
      payment: false,
      date: Date.now(),
      status: "Payment Pending",
      razorpayOrderId: mockOrderId,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, orderId: newOrder._id });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Simulate verifying mock payment
const verifyMockPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    await orderModel.findByIdAndUpdate(orderId, {
      payment: true,
      status: "Order Placed",
    });

    res.json({ success: true, message: "Mock payment verified." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//all orders for admin data 
const allOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//user specific orders
const userOrders = async (req,res)=>{
    try {
    
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//Update status from Admin side
const updateStatus = async (req,res)=>{
    try {

        const {orderId,status} = req.body;
        await orderModel.findByIdAndUpdate(orderId,{status});

        res.json({success:true,message:'Status Updated'})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {placeOrder,allOrders,userOrders,updateStatus,verifyMockPayment,placeOrderMockPay}