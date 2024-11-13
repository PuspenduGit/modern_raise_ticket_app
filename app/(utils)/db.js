import mongoose from "mongoose";

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to database");
    return;
  }

  try {
    console.log("Connecting to database");
    const dbUri = process.env.DB_HOST;
    if (!dbUri) {
      throw new Error(
        "Database connection URL (DB_HOST) is not defined in environment variables."
      );
    }

    await mongoose.connect(dbUri);
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

export default connectToDatabase;
