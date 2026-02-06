import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI as string;

    await mongoose.connect(uri);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Mongo connection error:", error);
    process.exit(1);
  }
};
