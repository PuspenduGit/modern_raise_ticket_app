import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { username, email, password } = await req.json();
  const existingUser = await User.findOne({ email });
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return NextResponse.json(
      { message: "Username already exists" },
      { status: 409 }
    );
  }
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ username, email, password: hashedPassword });
  try {
    await user.save();
    console.log("User Created");
    return NextResponse.json({ message: "User Created" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
