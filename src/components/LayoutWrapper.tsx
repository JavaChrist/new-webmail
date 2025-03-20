"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/login"; // ✅ Cacher la sidebar sur la page login

  return (
    <div className="flex min-h-screen">
      {showSidebar && <Sidebar />} {/* ✅ Sidebar présente sauf sur /login */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
