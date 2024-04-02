"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// export default function LoginForm() {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string>("");

//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       console.log("logging in...");
//       const res = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//       });

//       if (res?.error) {
//         setError("Invalid Credentials");
//         return;
//       }

//       router.replace("wallet");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="grid place-items-center h-screen">
//       <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
//         <h1 className="text-xl font-bold my-4">Login</h1>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             type="text"
//             placeholder="Email"
//           />
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             placeholder="Password"
//           />
//           <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
//             Login
//           </button>
//           {error && (
//             <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
//               {error}
//             </div>
//           )}

//           <Link href="/register">
//             {/* <a className="text-sm mt-3 text-right"> */}
//             Don't have an account? <span className="underline">Register</span>
//             {/* </a> */}
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// }

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Logging in...");
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setLoading(false);
        setError("Invalid credentials");
        return;
      }
      setLoading(false);
      router.replace("wallet");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-400 to-blue-500">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <button className="bg-purple-600 text-white font-bold py-3 rounded-md hover:bg-purple-700 focus:outline-none focus:bg-purple-700 transition duration-300">
            {loading ? "Please wait..." : "Login"}
          </button>
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Link href="/register" className="text-gray-800 ">
            Don't have an account?{" "}
            <span className="font-bold underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
