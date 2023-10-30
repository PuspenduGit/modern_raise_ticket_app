import mongoose from "mongoose";

const Connection = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    console.log("Connecting to database");
    await mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

export default Connection;
