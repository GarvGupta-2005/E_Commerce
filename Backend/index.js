import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import cloudinaryConnect from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

//App config
const app = express()
const PORT = process.env.PORT || 4000;
connectDB()
cloudinaryConnect()

//middlewares 
app.use(express.json())
app.use(cors())


//Api end points
app.get('/',(req,res)=>{
    res.send("Hello from Backend")
})

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


//Listening
app.listen(PORT,()=>{
    console.log("Server started on port :"+PORT)
})

//If any error occurs then remove the start and server script from package.json as they were manually added 