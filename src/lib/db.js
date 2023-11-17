import mongoose from 'mongoose';

const dbConnect = () => {
  const URL = process.env.MONGO_URL;

  return mongoose.connect(URL);
};

export default dbConnect;
