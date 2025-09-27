import mongoose from 'mongoose';

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_NAME,
    });
    const db = mongoose.connection;
    db.on('error', (err) => {
      console.log(console, 'MongoDB connection error: ' + err);
    });
    db.once('connected', () => console.log('Connected to MongoDB'));
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;