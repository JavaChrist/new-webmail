"use client";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "@/config/firebase";
import ContactList from "@/components/contacts/ContactList";
import ContactModal from "@/components/contacts/ContactModal";
import { Search } from "lucide-react";

interface Contact {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  entreprise?: string;
  adresse?: string;
  codePostal?: string;
  ville?: string;
  notes?: string;
  categorie: "private" | "professional" | "other";
  userId: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Charger les contacts depuis Firebase
  useEffect(() => {
    const loadContacts = async () => {
      if (!auth.currentUser) return;

      try {
        const contactsRef = collection(db, "contacts");
        const q = query(
          contactsRef,
          where("userId", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const loadedContacts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Contact[];

        setContacts(loadedContacts);
      } catch (error) {
        console.error("Erreur lors du chargement des contacts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContacts();
  }, []);

  // Filtrer les contacts en fonction du terme de recherche
  const filteredContacts = contacts.filter((contact) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      contact.nom.toLowerCase().includes(searchTermLower) ||
      contact.prenom.toLowerCase().includes(searchTermLower) ||
      contact.email.toLowerCase().includes(searchTermLower) ||
      contact.telephone.includes(searchTermLower) ||
      (contact.entreprise &&
        contact.entreprise.toLowerCase().includes(searchTermLower)) ||
      (contact.ville && contact.ville.toLowerCase().includes(searchTermLower))
    );
  });

  const handleSaveContact = async (contactData: Contact) => {
    try {
      // Mise à jour de l'état local
      setContacts((prevContacts) => {
        if (contactData.id) {
          // Mise à jour d'un contact existant
          return prevContacts.map((contact) =>
            contact.id === contactData.id ? contactData : contact
          );
        } else {
          // Ajout d'un nouveau contact
          return [...prevContacts, contactData];
        }
      });

      // Recharger les contacts depuis Firebase pour s'assurer d'avoir les données à jour
      if (auth.currentUser) {
        const contactsRef = collection(db, "contacts");
        const q = query(
          contactsRef,
          where("userId", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const loadedContacts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Contact[];
        setContacts(loadedContacts);
      }

      setIsModalOpen(false);
      setSelectedContact(undefined);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du contact:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* En-tête avec recherche et bouton d'ajout */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            <button
              onClick={() => {
                setSelectedContact(undefined);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Nouveau contact
            </button>
          </div>
        </div>

        {/* Liste des contacts */}
        {filteredContacts.length === 0 ? (
          <div className="text-center text-gray-400 mt-8">
            {searchTerm
              ? "Aucun contact ne correspond à votre recherche"
              : "Aucun contact pour le moment"}
          </div>
        ) : (
          <ContactList
            contacts={filteredContacts}
            onContactSelect={(contact) => {
              setSelectedContact(contact);
              setIsModalOpen(true);
            }}
          />
        )}
      </div>

      {/* Modal pour ajouter/modifier un contact */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedContact(undefined);
        }}
        onSave={handleSaveContact}
        selectedContact={selectedContact}
      />
    </div>
  );
}
