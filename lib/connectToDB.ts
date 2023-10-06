import mongoose from "mongoose";

let isConnected = false;

const mongoURL = process.env.MONGO_URL;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!mongoURL) {
    throw new Error("MongoURL not found");
  }

  if (isConnected) {
    console.log("Connection is already established to MongoDB");
  } else {
    await mongoose.connect(mongoURL);
    isConnected = true;
    console.log("Successfully connected to mongoDB");
  }

  try {
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to connect with mongoDB" + error.message);
  }
};

export default connectToDB;
