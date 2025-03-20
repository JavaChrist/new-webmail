"use client";
import React, { ReactElement } from "react"; // ✅ Import ReactElement pour typer l'icône
import Link from "next/link";
import { Calendar, Users, Mail, LogOut } from "lucide-react"; // ✅ Import des icônes
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login"); // ✅ Redirige vers `/login` après déconnexion
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-gray-100 p-6 shadow-lg flex flex-col">
      {/* ✅ Logo avec Favicon au lieu de l'icône d'enveloppe */}
      <div className="flex items-center space-x-3 text-2xl font-bold text-center mb-8">
        <img src="/favicon.ico" alt="WebMail Logo" className="w-8 h-8" />
        <span>WebMail</span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col space-y-4">
        <SidebarItem href="/calendar" icon={<Calendar size={20} />} text="Calendrier" />
        <SidebarItem href="/contacts" icon={<Users size={20} />} text="Contacts" />
        <SidebarItem href="/emails" icon={<Mail size={20} />} text="Emails" />
      </nav>

      {/* ✅ Bouton de déconnexion */}
      <button
        onClick={handleLogout}
        className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition mt-auto"
      >
        <LogOut size={20} /> <span className="text-lg">Déconnexion</span>
      </button>
    </div>
  );
}

// ✅ Correction du typage de `SidebarItem`
function SidebarItem({ href, icon, text }: { href: string; icon: ReactElement; text: string }) {
  return (
    <Link href={href} className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition">
      {icon}
      <span className="text-lg">{text}</span>
    </Link>
  );
}
