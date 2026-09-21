"use client";

import { useState } from "react";

export default function CreateEventForm({ 
  userRole, 
  onSubmitAction 
}: { 
  userRole: string;
  onSubmitAction: (formData: FormData) => Promise<void>;
}) {
  const [format, setFormat] = useState("Оффлайн");

  return (
    <form action={onSubmitAction} className="bg-gradient-to-br from-[#0a1c15] to-[#04110a] p-8 rounded-3xl border border-emerald-900/50 shadow-2xl space-y-6">
      
      <div>
        <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Название события</label>
        <input 
          type="text" 
          name="title" 
          required 
          placeholder="Например: ESG Форум 2026" 
          className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Описание</label>
        <textarea 
          name="description" 
          rows={4}
          placeholder="Опишите, что будет на мероприятии..." 
          className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20 resize-none"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Дата начала</label>
          <input 
            type="datetime-local" 
            name="date" 
            required
            className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors [color-scheme:dark]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Дата конца</label>
          <input 
            type="datetime-local" 
            name="endDate" 
            className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors [color-scheme:dark]"
          />
        </div>
      </div>

      {/* Выбор формата */}
      <div>
        <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Формат проведения</label>
        <div className="flex flex-wrap gap-4">
          {["Оффлайн", "Онлайн", "Гибрид"].map((fmt) => (
            <label key={fmt} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="format" 
                value={fmt} 
                checked={format === fmt}
                onChange={() => setFormat(fmt)}
                className="w-4 h-4 accent-emerald-500 bg-black border-emerald-900"
              />
              <span className="text-sm font-bold text-white">{fmt}</span>
            </label>
          ))}
        </div>
      </div>

      {(format === "Оффлайн" || format === "Гибрид") && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Город</label>
              <input 
                type="text" 
                name="locationCity" 
                required
                placeholder="г. Астана" 
                className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Улица</label>
              <input 
                type="text" 
                name="locationStreet" 
                placeholder="пр. Мангилик Ел, 55" 
                className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Название места</label>
              <input 
                type="text" 
                name="locationVenue" 
                placeholder="Международный Выставочный Центр" 
                className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Ссылка на Google карты</label>
              <input 
                type="url" 
                name="twoGisUrl" 
                placeholder="https://maps.google.com/..." 
                className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20"
              />
            </div>
          </div>
        </>
      )}

      <div>
        <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Обложка <span className="text-emerald-500/50 normal-case tracking-normal">(до 10 МБ)</span></label>
        <input 
          type="file" 
          name="imageFile" 
          accept="image/*"
          className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-emerald-500 file:text-black hover:file:bg-emerald-400"
        />
      </div>

      {userRole === "SYSTEM_ADMIN" && (
        <div>
          <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Ссылка на первоисточник</label>
          <input 
            type="url" 
            name="sourceUrl" 
            placeholder="https://..." 
            className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20"
          />
        </div>
      )}

      {userRole === "SYSTEM_ADMIN" ? (
        <input type="hidden" name="isPublic" value="on" />
      ) : (
        <div className="flex items-center gap-3 p-4 bg-emerald-950/20 border border-emerald-900/30 rounded-xl">
          <input 
            type="checkbox" 
            name="isPublic" 
            id="isPublic"
            className="w-5 h-5 accent-emerald-500 bg-black border-emerald-900 rounded focus:ring-emerald-500 focus:ring-offset-black"
          />
          <div>
            <label htmlFor="isPublic" className="font-bold text-white cursor-pointer">Открытое событие</label>
            <p className="text-xs text-emerald-400/60 mt-0.5">Событие будет доступно всем резидентам платформы</p>
          </div>
        </div>
      )}

      <div className="pt-4 mt-8 border-t border-emerald-900/30">
        <button type="submit" className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 text-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          Опубликовать событие
        </button>
      </div>

    </form>
  );
}
