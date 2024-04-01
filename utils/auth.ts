// utils/auth.js

import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useRequireAuth() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const session = await getSession();

      if (!session) {
        router.push("/login");
      }
    }

    checkAuth();
  }, [router]);

  return;
}
