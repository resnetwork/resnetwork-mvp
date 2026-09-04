"use client";

import { useState } from "react";
import { Building2, Building, X } from "lucide-react";

export default function CommunityGrid({ companies }: { companies: any[] }) {
  const [selectedCompany, setSelectedCompany] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<"COMPANY" | "STARTUP" | "INDIVIDUAL">("COMPANY");

  const filteredCompanies = companies.filter(c => c.category === activeTab);

  return (
    <>
      <div className="flex overflow-x-auto gap-2 pb-6 mb-2 hide-scrollbar">
        <button 
          onClick={() => setActiveTab("COMPANY")}
          className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTab === 'COMPANY' ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-emerald-950/40 text-emerald-300/70 border border-emerald-500/20 hover:text-emerald-300 hover:bg-emerald-900/40'}`}
        >
          Компании
        </button>
        <button 
          onClick={() => setActiveTab("STARTUP")}
          className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTab === 'STARTUP' ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-emerald-950/40 text-emerald-300/70 border border-emerald-500/20 hover:text-emerald-300 hover:bg-emerald-900/40'}`}
        >
          Стартапы
        </button>
        <button 
          onClick={() => setActiveTab("INDIVIDUAL")}
          className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTab === 'INDIVIDUAL' ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-emerald-950/40 text-emerald-300/70 border border-emerald-500/20 hover:text-emerald-300 hover:bg-emerald-900/40'}`}
        >
          Физ. лица
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <div 
            key={company.id}
            onClick={() => setSelectedCompany(company)}
            className="flex flex-col bg-[#06241a]/60 border border-emerald-500/20 rounded-3xl p-6 hover:bg-[#06241a] hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-900/40 border border-emerald-500/30 flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                {company.logoUrl ? (
                  <img src={company.logoUrl} alt={company.name} className="w-full h-full object-cover" />
                ) : (
                  <Building2 size={24} className="text-emerald-500/60" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {company.name}
                </h3>
              </div>
            </div>
            
            <div className="flex-1">
              <p className="text-sm text-emerald-100/70 line-clamp-3 mb-4">
                {company.description || "Компания пока не добавила описание своей деятельности."}
              </p>
            </div>
            
            <div className="pt-4 border-t border-emerald-500/20 flex flex-wrap gap-2 mt-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/20 text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                <Building size={12} />
                {company.category === "COMPANY" ? "Компания" : company.category === "STARTUP" ? "Стартап" : "Физ. лицо"}
              </span>
            </div>
          </div>
        ))}

        {filteredCompanies.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <Building2 size={48} className="mx-auto text-emerald-500/20 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Каталог пока пуст</h3>
            <p className="text-emerald-400/50">Вскоре здесь появятся участники сообщества.</p>
          </div>
        )}
      </div>

      {/* Модальное окно (Попап) */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedCompany(null)} />
          <div className="relative bg-[#081712] border border-emerald-500/30 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-emerald-500/20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-900/40 border border-emerald-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                  {selectedCompany.logoUrl ? (
                    <img src={selectedCompany.logoUrl} alt={selectedCompany.name} className="w-full h-full object-cover" />
                  ) : (
                    <Building2 size={32} className="text-emerald-500/60" />
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{selectedCompany.name}</h2>
              </div>
              <button 
                onClick={() => setSelectedCompany(null)}
                className="p-2 text-emerald-400/60 hover:text-white hover:bg-emerald-500/20 rounded-full transition-colors self-start"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
              
              {/* Контактная информация */}
              <div className="flex flex-col gap-2 p-4 bg-emerald-950/20 rounded-2xl border border-emerald-500/10">
                <h4 className="text-emerald-400 font-bold mb-2 text-sm uppercase tracking-wider">Контакты</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-emerald-100/80">
                  <div>
                    <span className="block text-emerald-500/60 text-xs">Страна</span>
                    <span>{selectedCompany.country || "Не указана"}</span>
                  </div>
                  <div>
                    <span className="block text-emerald-500/60 text-xs">Адрес</span>
                    <span>{selectedCompany.address || "Не указан"}</span>
                  </div>
                  <div>
                    <span className="block text-emerald-500/60 text-xs">Телефон</span>
                    <span>{selectedCompany.phone || "Не указан"}</span>
                  </div>
                  <div>
                    <span className="block text-emerald-500/60 text-xs">Email</span>
                    <span>{selectedCompany.email || "Не указан"}</span>
                  </div>
                  {selectedCompany.website && (
                    <div className="sm:col-span-2">
                      <span className="block text-emerald-500/60 text-xs">Веб-сайт</span>
                      <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                        {selectedCompany.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Описание */}
              <div className="text-emerald-100/80 text-sm sm:text-base space-y-4">
                {(selectedCompany.description || "Компания пока не добавила описание своей деятельности.")
                  .split('\n')
                  .filter((p: string) => p.trim() !== '')
                  .map((p: string, i: number) => (
                    <p key={i} className="indent-6 leading-relaxed">{p}</p>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
