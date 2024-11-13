import { NextResponse } from "next/server";
import connectToDatabase from "@/app/(utils)/db";

await connectToDatabase();

import Ticket from "@/app/(models)/Ticket";

export async function POST(req) {
  try {
    const body = await req.json();
    const data = body.TicketForm;
    await Ticket.create(data);
    console.log("Ticket Created");
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tickets = await Ticket.find({});
    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
