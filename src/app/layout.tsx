"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css"; // ✅ Import du fichier de styles

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // ✅ Redirige vers /login si l'utilisateur n'est pas connecté
      if (!currentUser && pathname !== "/login") {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) return <p className="text-center text-white">Chargement...</p>;

  return (
    <html lang="fr">
      <head>
        <title>WebMail App</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="flex bg-gray-900 text-white">
        {user && <Sidebar />} {/* ✅ Afficher la sidebar seulement si connecté */}
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
