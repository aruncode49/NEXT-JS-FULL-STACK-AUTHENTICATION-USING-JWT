import mongoose from "mongoose";

const connection = {};

export const connectDB = async () => {
  try {
    if (connection.isConnected) {
      return;
    }

    const db = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );

    connection.isConnected = db.connections[0].readyState;

    db.connection.on("connected", () => {
      console.log("MONGODB CONNECTED SUCCESSFULLY");
    });
  } catch (error) {
    console.log(`Error inside database connection :: ${error}`);
    throw new Error(error.message);
  }
};
