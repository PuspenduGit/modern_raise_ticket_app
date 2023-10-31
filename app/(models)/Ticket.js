import mongoose, { Schema } from "mongoose";
import Connection from "../(utils)/db.js";

Connection();
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

export default Ticket;
