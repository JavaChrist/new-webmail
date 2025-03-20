"use client"; // ✅ Obligatoire pour `useEffect` et `useState`

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth"; // ✅ Ajout de `User`
import { auth } from "@/config/firebase";
import Link from "next/link";

export default function App() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login"); // 🔥 Redirection vers `/login` si non connecté
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Welcome to WebMail</h1>

      {/* ✅ Vérifier que `user` n'est pas null avant d'afficher `user.email` */}
      {user && <p className="mt-2 text-gray-700">Connecté en tant que : {user.email}</p>}

      <nav className="mt-6">
        <ul className="flex space-x-4">
          <li><Link href="/calendar" className="text-lg text-blue-500 hover:underline">Calendar</Link></li>
          <li><Link href="/contacts" className="text-lg text-blue-500 hover:underline">Contacts</Link></li>
          <li><Link href="/emails" className="text-lg text-blue-500 hover:underline">Emails</Link></li>
        </ul>
      </nav>
    </div>
  );
}

