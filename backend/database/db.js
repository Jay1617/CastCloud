import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "CastCloud",
    });

    console.log("MongoDB Connected...");
  } catch (error) {
    console.log("ERROR : ", error);
  }
};

export default connectDb;
