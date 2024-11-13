import mongoose, { Schema } from "mongoose";

// Define the user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Uncomment the following line to delete the existing model if needed
// mongoose.deleteModel("User");

// Check if the model exists before defining it
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
