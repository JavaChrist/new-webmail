import "@/styles/globals.css";
import { Metadata } from "next";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "WebMail App",
  description: "Application de messagerie moderne",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-900 text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
