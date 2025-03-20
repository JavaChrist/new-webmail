"use client";
import { useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
  View,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fr } from "date-fns/locale";
import "../styles/calendar.css"; // ✅ Ajout du style personnalisé

// 📌 Localisation française
const locales = { fr };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// 📌 Traduction en français
const messages = {
  today: "Aujourd'hui",
  previous: "Précédent",
  next: "Suivant",
  month: "Mois",
  week: "Semaine",
  day: "Jour",
  agenda: "Agenda",
};

export default function MyCalendar() {
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      title: "Réunion équipe",
      start: new Date(2025, 2, 26, 10, 0),
      end: new Date(2025, 2, 26, 11, 0),
    },
  ]);

  const goToPrevious = () => {
    setDate((prev) => new Date(prev.setDate(prev.getDate() - 7)));
  };

  const goToNext = () => {
    setDate((prev) => new Date(prev.setDate(prev.getDate() + 7)));
  };

  const handleSelect = async ({ start, end }: { start: Date; end: Date }) => {
    try {
      const title = prompt("Nom du rendez-vous :");
      if (title) {
        setEvents([...events, { start, end, title }]);
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout de l'événement :", error);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="flex justify-between mb-4">
        <button onClick={goToPrevious} className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
          ⬅️ Précédent
        </button>
        <h2 className="text-xl font-bold">{format(date, "EEEE d MMMM yyyy", { locale: fr })}</h2>
        <button onClick={goToNext} className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
          Suivant ➡️
        </button>
      </div>

      <Calendar
        selectable
        onSelectSlot={handleSelect}
        localizer={localizer}
        date={date}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        view={view}
        messages={messages}
        onView={(newView) => setView(newView as View)}
        onNavigate={(newDate) => setDate(newDate)}
        style={{
          height: 600,
          backgroundColor: "white",
          color: "black",
          borderRadius: "8px",
          padding: "10px",
        }}
      />
    </div>
  );
}
