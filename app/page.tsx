import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

const App = async () => {
  const session = await getServerSession();
  console.log("sess is");
  console.log(session);
  // if (session) redirect("/wallet");
  if (session && session?.walletAddress) redirect("/dashboard");

  return (
    <main>
      <LoginForm />
    </main>
  );
};

export default App;
