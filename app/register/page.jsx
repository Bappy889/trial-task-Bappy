import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Register() {
  const session = await getServerSession(authOptions);

  //GetServerSessionOptions
  console.log("session iss");
  console.log(session);
  if (session) redirect("/wallet");

  return <RegisterForm />;
}
