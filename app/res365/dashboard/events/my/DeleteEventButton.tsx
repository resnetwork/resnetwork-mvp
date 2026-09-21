"use client";

import { useState } from "react";
import { deleteEvent } from "@/app/lib/actions";
import { Trash2 } from "lucide-react";

export function DeleteEventButton({ eventId, companyId }: { eventId: string, companyId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Вы уверены, что хотите удалить это событие? Все связанные билеты также будут удалены.")) {
      setIsDeleting(true);
      await deleteEvent(eventId, companyId);
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors disabled:opacity-50"
      title="Удалить событие"
    >
      <Trash2 size={18} />
    </button>
  );
}
