import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('✅ Using existing MongoDB connection');
    return;
  }

  try {
    const db = await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;

    if (isConnected) {
      console.log('✅ MongoDB fully connected');
    } else {
      console.log('⚠️ MongoDB connection not fully ready');
    }
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    throw error;
  }
};

export default connectDB;
