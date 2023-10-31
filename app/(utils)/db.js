import mongoose from "mongoose";

const Connection = async () => {
  try {
    if (mongoose.connections[0].readyState) return;
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
