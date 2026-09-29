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
  const [isPublic, setIsPublic] = useState<boolean | null>(null);

  return (
    <div className="relative">
      {isPublic === null && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md rounded-3xl">
          <div className="bg-[#0a1c15] p-6 md:p-8 rounded-3xl border border-emerald-500/30 max-w-lg w-full shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col gap-6 animate-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-black text-white text-center uppercase tracking-wider">Выберите тип события</h2>
            
            <div className="flex flex-col gap-4">
              <button type="button" onClick={() => setIsPublic(true)} className="flex flex-col text-left p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black transition-all group cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <span className="font-bold text-lg text-emerald-400 group-hover:text-black mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:bg-black" />
                  Открытое событие
                </span>
                <span className="text-xs md:text-sm text-emerald-100/70 group-hover:text-black/80 leading-relaxed">
                  Будет опубликовано на главной странице (афише) платформы.
                </span>
              </button>

              <button type="button" onClick={() => setIsPublic(false)} className="flex flex-col text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/20 transition-all group cursor-pointer shadow-lg">
                <span className="font-bold text-lg text-white mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  Закрытое событие
                </span>
                <span className="text-xs md:text-sm text-white/50 group-hover:text-white/80 leading-relaxed">
                  Событие только для резидентов внутри платформы.
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <form action={onSubmitAction} className={`bg-gradient-to-br from-[#0a1c15] to-[#04110a] p-8 rounded-3xl border border-emerald-900/50 shadow-2xl space-y-6 ${isPublic === null ? 'pointer-events-none opacity-50 filter blur-sm' : ''}`}>
      
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
          <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Дата конца <span className="text-emerald-500/50 normal-case tracking-normal">(Опционально)</span></label>
          <input 
            type="datetime-local" 
            name="endDate" 
            className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors [color-scheme:dark]"
          />
          <p className="text-xs text-emerald-400/60 mt-2 font-mono leading-tight">
            * Если у вас круглогодичный ивент или длительная программа, выберите дату её завершения, чтобы она оставалась в афише.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Выбор типа (Событие или Программа) */}
        <div>
          <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Тип</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="eventType" 
                value="EVENT" 
                defaultChecked
                className="w-4 h-4 accent-emerald-500 bg-black border-emerald-900"
              />
              <span className="text-sm font-bold text-white">Событие</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="eventType" 
                value="PROGRAM" 
                className="w-4 h-4 accent-emerald-500 bg-black border-emerald-900"
              />
              <span className="text-sm font-bold text-white">Программа</span>
            </label>
          </div>
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
            {isPublic ? (
              <div>
                <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Ссылка на первоисточник</label>
                <input 
                  type="url" 
                  name="sourceUrl" 
                  placeholder="https://..." 
                  className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Ссылка на Google карты</label>
                <input 
                  type="url" 
                  name="twoGisUrl" 
                  placeholder="https://maps.google.com/..." 
                  className="w-full bg-black/40 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20"
                />
              </div>
            )}
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

      <input type="hidden" name="isPublic" value={isPublic ? "on" : "off"} />

      <div className="flex items-center gap-3 p-4 bg-emerald-950/20 border border-emerald-900/30 rounded-xl">
        <div className="w-5 h-5 flex items-center justify-center rounded bg-emerald-500/20 text-emerald-500 border border-emerald-900">
          {isPublic && (
            <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3">
              <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <div>
          <label className="font-bold text-white">Выбран тип: {isPublic ? "Открытое событие" : "Закрытое событие"}</label>
          <p className="text-xs text-emerald-400/60 mt-0.5">
            {isPublic 
              ? "Опубликуется на общей афише" 
              : "Доступно только резидентам"}
          </p>
        </div>
        <button 
          type="button"
          onClick={() => setIsPublic(null)}
          className="ml-auto px-3 py-1.5 rounded-lg bg-emerald-900/50 text-emerald-400 text-xs font-bold hover:bg-emerald-900 hover:text-white transition-colors"
        >
          Изменить
        </button>
      </div>

      <div className="pt-4 mt-8 border-t border-emerald-900/30">
        <button type="submit" className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 text-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          Опубликовать событие
        </button>
      </div>
    </form>
  </div>
  );
}
