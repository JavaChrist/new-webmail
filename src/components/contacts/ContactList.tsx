import { Mail, Phone, Building2, Edit, MapPin } from "lucide-react";
import { contactCategories } from "./ContactModal";

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

interface ContactListProps {
  contacts: Contact[];
  onContactSelect: (contact: Contact) => void;
}

// Couleur par défaut pour les catégories non définies
const defaultCategory = {
  label: "Autre",
  color: "#6b7280", // gray-500
};

export default function ContactList({
  contacts,
  onContactSelect,
}: ContactListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {contacts.map((contact) => {
        // Récupérer la catégorie ou utiliser la catégorie par défaut
        const category =
          contactCategories[contact.categorie] || defaultCategory;

        return (
          <div
            key={contact.id}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors relative overflow-hidden"
            style={{
              borderLeft: `6px solid ${category.color}`,
            }}
          >
            {/* Badge de catégorie */}
            <div
              className="absolute top-0 right-0 px-2 py-1 text-xs font-medium text-white rounded-bl"
              style={{
                backgroundColor: category.color,
              }}
            >
              {category.label}
            </div>

            {/* En-tête du contact */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                {contact.prenom} {contact.nom.toUpperCase()}
              </h3>
              {contact.entreprise && (
                <div className="flex items-center gap-2 text-gray-400 mt-1">
                  <Building2 size={16} />
                  <span>{contact.entreprise}</span>
                </div>
              )}
            </div>

            {/* Informations de contact */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail size={16} />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {contact.email.toLowerCase()}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone size={16} />
                <a
                  href={`tel:${contact.telephone}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {contact.telephone}
                </a>
              </div>
              {(contact.adresse || contact.codePostal || contact.ville) && (
                <div className="flex items-start gap-2 text-gray-300">
                  <MapPin size={16} className="flex-shrink-0 mt-1" />
                  <div className="flex flex-col">
                    {contact.adresse && <span>{contact.adresse}</span>}
                    {(contact.codePostal || contact.ville) && (
                      <span>
                        {contact.codePostal && `${contact.codePostal} `}
                        {contact.ville && contact.ville.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Notes (si présentes) */}
            {contact.notes && (
              <div className="mt-4 text-sm text-gray-400 border-t border-gray-700 pt-4 mb-8">
                {contact.notes}
              </div>
            )}

            {/* Bouton de modification en bas à droite */}
            <button
              onClick={() => onContactSelect(contact)}
              className="absolute bottom-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
              title="Modifier"
            >
              <Edit size={18} className="text-blue-400" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
