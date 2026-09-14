"use client";

import { X } from "lucide-react";
import { useTransition } from "react";
import { deleteAccount } from "@/app/lib/actions";

export default function DeleteAccountButton({ 
  id, 
  title = "Удалить аккаунт", 
  confirmText = "Вы уверены, что хотите удалить этот аккаунт?" 
}: { 
  id: string; 
  title?: string;
  confirmText?: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm(confirmText)) {
      startTransition(async () => {
        const res = await deleteAccount(id);
        if (!res.success) {
          alert(res.error || "Ошибка удаления");
        }
      });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="p-1.5 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20 disabled:opacity-50" 
      title={title}
    >
      <X size={14} />
    </button>
  );
}
