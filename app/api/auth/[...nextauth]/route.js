import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { createClient } from "@/utils/supabase/server";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const supabase = createClient();

          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email);

          if (error) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            data[0].password
          );
          if (!passwordsMatch) {
            return null;
          }

          const user = data;

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      session.walletAddress = token.walletAddress;
      return session;
    },
  },
  // session: {
  //   strategy: "jwt",
  //   maxAge: 3000,
  // },
  // secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
