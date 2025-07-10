import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import cloudinaryConnect from './config/cloudinary.js';

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CORS Setup for frontend ↔ backend communication
const allowedOrigins = [
  "http://localhost:4000",
  "https://e-commerce-frontend-eta-rouge.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "token"],
  credentials: true
}));

app.use(express.json());

// ✅ Health check
app.get('/', (req, res) => {
  res.send("Hello from Backend");
});

// ✅ Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// ✅ Start server only after DB connection succeeds
const startServer = async () => {
  try {
    await connectDB();
    cloudinaryConnect();

    app.listen(PORT, () => {
      console.log("🚀 Server started on port: " + PORT);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
  }
};

startServer();
