import mongoose, { Schema } from "mongoose";

// mongoose.connect(process.env.DB_HOST);
mongoose.Promise = global.Promise;

const TicketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    category: String,
    importance: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "low",
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    identity: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed", "pending"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);

// uncomment this when you made a mistake in the model and want to delete the model and run it once
// mongoose.deleteModel("Ticket");

export default Ticket;
