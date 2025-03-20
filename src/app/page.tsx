"use client"; // ✅ Obligatoire pour `useEffect` et `useState`

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/app");
  }, [router]);

  return null;
}
