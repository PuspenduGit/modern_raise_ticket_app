import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = req.nextUrl.pathname;
    const id = url.split("/")[3];
    const ticket = await Ticket.findOne({ _id: id });
    return NextResponse.json({ ticket }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const id = params.id;
    let data = await req.json();
    data = data.TicketForm;
    await Ticket.findByIdAndUpdate(id, {
      ...data,
    });
    return NextResponse.json({ message: "Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE({ params }) {
  try {
    const id = params.id;
    await Ticket.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Ticket Deleted Succesfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
