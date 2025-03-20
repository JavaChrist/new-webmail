import * as Lucide from "lucide-react";

export default function ContactsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-400 flex items-center space-x-3">
        <Lucide.Users size={32} /> <span>Contacts</span>
      </h1>
      <p className="mt-4 text-gray-300">Gérez tous vos contacts ici.</p>
    </div>
  );
}

