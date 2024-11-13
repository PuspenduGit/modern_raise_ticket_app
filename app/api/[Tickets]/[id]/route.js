import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";
import connectToDatabase from "@/app/(utils)/db";

// Ensure the database connection
await connectToDatabase();

export async function GET(request, { params }) {
  try {
    const { id } = params; // params is automatically provided for dynamic routes
    const ticket = await Ticket.findOne({ _id: id });
    if (!ticket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ ticket }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params; // params is automatically provided
    const data = await request.json();
    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { ...data.TicketForm },
      { new: true }
    );

    if (!updatedTicket) {
      return NextResponse.json(
        { message: "Ticket not found or update failed" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Updated successfully", ticket: updatedTicket },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params; // params is automatically provided
    const deletedTicket = await Ticket.findByIdAndDelete(id);

    if (!deletedTicket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Ticket Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
