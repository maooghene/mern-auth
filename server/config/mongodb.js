import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import mongoose from "mongoose";

const connectDB = async () => {
  // 1. Setup the listener first (don't await it)
  mongoose.connection.on("connected", () => {
    console.log("✅ Database Connected Successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });

  try {
    // 2. Await the actual connection call
    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);
  } catch (error) {
    console.error("❌ Initial Connection Error:", error.message);
    process.exit(1); // Optional: Stop app if DB fails
  }
};

export default connectDB;
