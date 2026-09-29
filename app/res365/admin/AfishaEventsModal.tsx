"use client";

import { useState } from "react";
import { ListOrdered, X, Check, Save } from "lucide-react";
import { updateEventFeaturedOrderAction } from "@/app/actions/admin";

type Event = {
  id: string;
  title: string;
  featuredOrder: number | null;
  date: Date;
};

export default function AfishaEventsModal({ events }: { events: Event[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  // Slots 1 to 4
  const slots = [1, 2, 3, 4];

  // Get current event for a slot
  const getEventForSlot = (slot: number) => {
    return events.find(e => e.featuredOrder === slot);
  };

  const handleSelect = async (slot: number, eventId: string) => {
    setLoading(slot.toString());
    await updateEventFeaturedOrderAction(eventId, slot);
    setLoading(null);
  };

  const handleClear = async (slot: number, eventId: string) => {
    setLoading(slot.toString());
    await updateEventFeaturedOrderAction(eventId, null);
    setLoading(null);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-950/40 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-300 hover:bg-emerald-900/60 transition-colors"
      >
        <ListOrdered size={14} />
        События в афише
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#081712] border border-emerald-500/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-[#081712]/90 backdrop-blur-md p-6 border-b border-emerald-500/20 flex justify-between items-center z-10">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ListOrdered className="text-emerald-400" />
                  Порядок событий в Афише
                </h2>
                <p className="text-xs text-emerald-400/60 mt-1">
                  Выберите 4 события, которые будут отображаться на главной странице.
                </p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-emerald-500/10 text-emerald-500/60 hover:text-emerald-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {slots.map(slot => {
                const currentEvent = getEventForSlot(slot);
                return (
                  <div key={slot} className="p-4 rounded-xl border border-emerald-500/20 bg-black/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center border border-emerald-500/30">
                        {slot}
                      </div>
                      <h3 className="font-bold text-sm text-emerald-100 uppercase tracking-wider">
                        Слот {slot}
                      </h3>
                      {loading === slot.toString() && (
                        <span className="text-xs text-emerald-500 animate-pulse">Сохранение...</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <select 
                        value={currentEvent?.id || ""}
                        onChange={(e) => {
                          if (e.target.value) {
                            handleSelect(slot, e.target.value);
                          }
                        }}
                        disabled={loading === slot.toString()}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-emerald-500/30 text-white text-sm focus:border-emerald-400 outline-none appearance-none"
                      >
                        <option value="">-- Выберите событие --</option>
                        {events.filter(e => !e.featuredOrder || e.featuredOrder === slot).map(event => (
                          <option key={event.id} value={event.id}>
                            {event.title} ({new Date(event.date).toLocaleDateString()})
                          </option>
                        ))}
                      </select>
                      
                      {currentEvent && (
                        <button 
                          onClick={() => handleClear(slot, currentEvent.id)}
                          disabled={loading === slot.toString()}
                          className="px-4 py-2.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors"
                          title="Очистить слот"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="p-6 border-t border-emerald-500/20 bg-black/20 flex justify-end">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-emerald-900/50"
              >
                Готово
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
