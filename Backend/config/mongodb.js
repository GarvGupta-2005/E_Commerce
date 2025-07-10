import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('✅ Using existing MongoDB connection');
    return;
  }

  try {
    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected');
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    throw error;
  }
};

export default connectDB;
