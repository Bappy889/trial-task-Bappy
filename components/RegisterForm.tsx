"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useRouter } from "next/router";

export default function RegisterForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    if (!email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        setError("Invalid email");
      }
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { data } = await resUserExists.json();

      console.log(data);

      if (data.length != 0) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.ok) {
        window.alert("Registration successfull!");

        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center min-h-screen bg-gradient-to-br from-purple-400 to-blue-500">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-purple-400 bg-gray-100">
        <h1 className="text-xl font-bold my-4">Register</h1>
        {/* //onSubmit={signup} */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
            Register
          </button>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Link href="/" className="text-gray-800">
            Already have an account?{" "}
            <span className="font-bold underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
