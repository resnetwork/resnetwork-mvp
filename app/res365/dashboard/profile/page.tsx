"use client";

import { useState } from "react";
import { UploadCloud, Save, Building2, AlignLeft, Phone, User as UserIcon, Sparkles } from "lucide-react";

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  // В будущем тип аккаунта будет приходить из базы данных (выбирается при регистрации)
  const accountType: "COMPANY" | "INDIVIDUAL" | "STARTUP" = "STARTUP"; // Временно поставим STARTUP для проверки

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Имитация сохранения
    setTimeout(() => {
      setIsSaving(false);
      alert("Профиль успешно сохранен!");
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#f2ede2] tracking-tight">Мой профиль</h1>
        <p className="text-emerald-400/60 text-sm mt-2">
          Управляйте информацией о вашей компании, которая будет видна в закрытом клубе RES Network.
        </p>
      </div>

      <div className="bg-[#06241a]/40 border border-emerald-500/20 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
        <form onSubmit={handleSave} className="space-y-8">

          {/* Фото / Логотип */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-300 mb-4">
              {accountType === "COMPANY" ? (
                <><Building2 size={18} className="text-emerald-500" /> Логотип компании</>
              ) : accountType === "STARTUP" ? (
                <><Sparkles size={18} className="text-emerald-500" /> Логотип стартапа</>
              ) : (
                <><UserIcon size={18} className="text-emerald-500" /> Фото профиля</>
              )}
            </label>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-emerald-500/40 bg-emerald-950/30 flex items-center justify-center overflow-hidden shrink-0">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain p-2" />
                ) : (
                  <UploadCloud size={32} className="text-emerald-500/50" />
                )}
              </div>
              <div>
                <input 
                  type="file" 
                  id="logo-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
                <label 
                  htmlFor="logo-upload"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-emerald-100 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-400 transition-colors cursor-pointer"
                >
                  <UploadCloud size={16} />
                  {accountType === "INDIVIDUAL" ? "Загрузить фото" : "Загрузить логотип"}
                </label>
                <p className="text-xs text-emerald-400/50 mt-2">
                  Рекомендуемый размер: 400x400px. Форматы: JPG, PNG, SVG.
                </p>
              </div>
            </div>
          </div>

          {/* Описание */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-300 mb-4">
              <AlignLeft size={18} className="text-emerald-500" />
              {accountType === "COMPANY" ? "Описание компании" : accountType === "STARTUP" ? "Описание стартапа" : "Описание деятельности"}
            </label>
            <textarea
              rows={4}
              placeholder={accountType === "COMPANY" 
                ? "Расскажите о вашей компании, проектах и технологиях..." 
                : accountType === "STARTUP"
                ? "Расскажите о вашем инновационном продукте, планах развития и запросах..."
                : "Расскажите о вашей экспертизе, исследованиях или интересах..."}
              className="w-full p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-[#f2ede2] placeholder:text-emerald-500/40 focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(74,222,128,0.15)] transition-all resize-y"
            ></textarea>
          </div>

          {/* Контактные данные */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-300 mb-4">
              <Phone size={18} className="text-emerald-500" />
              Контактные данные
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Email для связи (например: hello@company.kz)"
                className="w-full px-4 py-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-[#f2ede2] placeholder:text-emerald-500/40 focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(74,222,128,0.15)] transition-all"
              />
              <input
                type="text"
                placeholder={accountType === "INDIVIDUAL" ? "Персональный сайт / Портфолио" : "Сайт"}
                className="w-full px-4 py-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-[#f2ede2] placeholder:text-emerald-500/40 focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(74,222,128,0.15)] transition-all"
              />
              <input
                type="text"
                placeholder="Телефон"
                className="w-full px-4 py-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-[#f2ede2] placeholder:text-emerald-500/40 focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(74,222,128,0.15)] transition-all md:col-span-2"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-emerald-500/20 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-[#06241a] bg-emerald-400 hover:bg-emerald-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <span>Сохранение...</span>
              ) : (
                <>
                  <Save size={16} />
                  <span>Сохранить профиль</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
