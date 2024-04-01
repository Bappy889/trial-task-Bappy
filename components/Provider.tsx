"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: ReactNode;
  session: any; // Assuming any type for session, replace it with the actual type if available
}

const Provider: React.FC<ProviderProps> = ({ children, session }) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default Provider;
