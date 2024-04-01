import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { createClient } from "@/utils/supabase/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    console.log("register called");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error("Invalid email");
    }
    const supabase = createClient();

    const hashedPassword = await bcrypt.hash(password, 10);
    const { error } = await supabase
      .from("users")
      .insert([{ email: email, password: hashedPassword }]);

    if (error) throw error;
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
