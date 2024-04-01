import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req) {
  try {
    const supabase = createClient();
    const { email } = await req.json();
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    if (error) throw error;

    console.log("user: ", data);
    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
  }
}
