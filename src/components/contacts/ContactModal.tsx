import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "@/config/firebase";

// Définition des catégories et leurs couleurs
export const contactCategories = {
  private: { label: "Privé", color: "#22c55e" },
  professional: { label: "Professionnel", color: "#3b82f6" },
  other: { label: "Autre", color: "#8b5cf6" },
} as const;

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
  categorie: keyof typeof contactCategories;
  userId: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: Contact) => void;
  selectedContact?: Contact;
}

export default function ContactModal({
  isOpen,
  onClose,
  onSave,
  selectedContact,
}: ContactModalProps) {
  const initialFormData = {
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    entreprise: "",
    adresse: "",
    codePostal: "",
    ville: "",
    notes: "",
    categorie: "private" as const,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (selectedContact) {
      // Si on modifie un contact existant
      setFormData({
        nom: selectedContact.nom.toUpperCase(),
        prenom: selectedContact.prenom,
        email: selectedContact.email.toLowerCase(),
        telephone: selectedContact.telephone,
        entreprise: selectedContact.entreprise || "",
        adresse: selectedContact.adresse || "",
        codePostal: selectedContact.codePostal || "",
        ville: selectedContact.ville?.toUpperCase() || "",
        notes: selectedContact.notes || "",
        categorie: selectedContact.categorie,
      });
    } else {
      // Si on crée un nouveau contact
      setFormData(initialFormData);
    }
  }, [selectedContact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    try {
      // Préparation des données du contact
      const contactData = {
        ...formData,
        nom: formData.nom.toUpperCase(),
        email: formData.email.toLowerCase(),
        ville: formData.ville ? formData.ville.toUpperCase() : "",
        entreprise: formData.entreprise || "",
        adresse: formData.adresse || "",
        codePostal: formData.codePostal || "",
        notes: formData.notes || "",
        userId: auth.currentUser.uid,
      };

      let savedContact: Contact;

      if (selectedContact) {
        // Mise à jour d'un contact existant
        const contactRef = doc(db, "contacts", selectedContact.id);
        await updateDoc(contactRef, contactData);
        savedContact = {
          ...contactData,
          id: selectedContact.id,
        } as Contact;
      } else {
        // Création d'un nouveau contact
        const docRef = await addDoc(collection(db, "contacts"), contactData);
        savedContact = {
          ...contactData,
          id: docRef.id,
        } as Contact;
      }

      onSave(savedContact);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du contact:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Formatage automatique pendant la saisie
    if (name === "nom" || name === "ville") {
      formattedValue = value.toUpperCase();
    } else if (name === "email") {
      formattedValue = value.toLowerCase();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-white">
          {selectedContact ? "Modifier le contact" : "Nouveau contact"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Informations principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Prénom
              </label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nom
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 uppercase"
                required
              />
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 lowercase"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Entreprise */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Entreprise
            </label>
            <input
              type="text"
              name="entreprise"
              value={formData.entreprise}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white rounded px-3 py-2"
            />
          </div>

          {/* Adresse */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Adresse
            </label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white rounded px-3 py-2"
            />
          </div>

          {/* Code postal et Ville */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Code postal
              </label>
              <input
                type="text"
                name="codePostal"
                value={formData.codePostal}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded px-3 py-2"
                pattern="[0-9]{5}"
                title="Le code postal doit contenir 5 chiffres"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Ville
              </label>
              <input
                type="text"
                name="ville"
                value={formData.ville}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 uppercase"
              />
            </div>
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Catégorie
            </label>
            <div className="flex gap-2">
              {Object.entries(contactCategories).map(
                ([key, { label, color }]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        categorie: key as keyof typeof contactCategories,
                      }))
                    }
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      formData.categorie === key
                        ? "ring-2 ring-offset-2 ring-offset-gray-800"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white rounded px-3 py-2 min-h-[100px]"
            />
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
            >
              {selectedContact ? "Modifier" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
