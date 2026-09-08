"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PartnerUploader({ categoryId, addLogoAction }: { categoryId: string, addLogoAction: (catId: string, name: string, base64: string) => Promise<void> }) {
  const [isUploading, setIsUploading] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!name) {
      alert("Пожалуйста, введите название компании перед загрузкой логотипа.");
      e.target.value = "";
      return;
    }

    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64String = reader.result as string;
        await addLogoAction(categoryId, name, base64String);
        setName("");
        setIsUploading(false);
        router.refresh();
      };
      reader.onerror = () => {
        alert("Ошибка при чтении файла");
        setIsUploading(false);
      };
    } catch (error) {
      console.error(error);
      alert("Ошибка при загрузке файла");
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 border border-emerald-500/20 rounded-xl bg-emerald-950/20">
      <h4 className="text-sm font-bold text-emerald-300">Добавить логотип</h4>
      
      <input 
        type="text" 
        placeholder="Название компании (Alt-текст)" 
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full px-3 py-2 text-sm bg-black/40 border border-emerald-500/30 rounded-lg text-white focus:outline-none focus:border-emerald-400"
      />
      
      <div>
        <input 
          type="file" 
          id={`upload-${categoryId}`}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <label 
          htmlFor={`upload-${categoryId}`}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            isUploading || !name 
              ? "bg-emerald-900/50 text-emerald-500/50 cursor-not-allowed" 
              : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/40 cursor-pointer"
          }`}
        >
          <UploadCloud size={14} />
          {isUploading ? "Загрузка..." : "Выбрать файл и загрузить"}
        </label>
      </div>
    </div>
  );
}
