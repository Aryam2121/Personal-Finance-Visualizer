// app/lib/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
console.log("📦 db.ts loaded!");
// Ensure MONGODB_URI is defined
const MONGODB_URI = process.env.MONGODB_URI;
console.log('MONGODB_URI:', MONGODB_URI);
if (!MONGODB_URI) {
  throw new Error('MongoDB URI is not defined in the environment variables!');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = global as typeof global & { mongoose?: MongooseCache };
const cached: MongooseCache = globalWithMongoose.mongoose || { conn: null, promise: null };

// Function to connect to the database
export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
