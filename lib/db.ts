import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("MongoDB URL not found");
}

// global cache to avoid multiple connections in dev
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    console.log("Cashed db connected")
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL).then((m) => m.connection);
  }

  try {
    cached.conn = await cached.promise;
    console.log("DB connected")
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

export default dbConnect;
