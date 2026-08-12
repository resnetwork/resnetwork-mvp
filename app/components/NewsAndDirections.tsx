"use client";
import { useState } from "react";
import { X, Sun, CloudSun, Droplet, Leaf, Factory, Gem } from "lucide-react";

const NEWS_ALL = [
  { title: "Кентау признали зоной экологического бедствия", tag: "Климат и политика", date: "27 июля 2026", img: "https://images.unsplash.com/photo-1632103996718-4a47cf68b75e?w=900&q=80&auto=format&fit=crop", content: "Правительство официально признало город Кентау зоной экологического бедствия из-за многолетнего загрязнения от горнодобывающих предприятий. Власти анонсировали программу рекультивации земель и переселения жителей из наиболее пострадавших районов." },
  { title: "Экологическая ситуация в Жамбылской области", tag: "Климат и политика", date: "27 июля 2026", img: "https://images.unsplash.com/photo-1579227114496-27346f474519?w=900&q=80&auto=format&fit=crop", content: "Экологи фиксируют ухудшение качества воды в реках региона. Инициирована совместная проверка с участием местных властей и международных наблюдателей для оценки масштаба проблемы." },
  { title: "Казахстан и ЕС расширяют сотрудничество в зелёной энергетике", tag: "Партнёрство", date: "15 мая 2026", img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80&auto=format&fit=crop", content: "Подписан меморандум о расширении инвестиций в возобновляемую энергетику Казахстана. ЕС выделит финансирование на развитие солнечных и ветровых электростанций в рамках новой климатической стратегии." },
  { title: "Международные инвесторы изучают возможности в Центральной Азии", tag: "Инвестиции", date: "8 мая 2026", img: "https://images.unsplash.com/photo-1515548212260-ac87067b15ab?w=900&q=80&auto=format&fit=crop", content: "Делегация международных фондов посетила несколько проектов устойчивого развития региона, оценивая потенциал долгосрочных инвестиций в зелёную инфраструктуру и промышленность." },
  { title: "Новая программа поддержки водосбережения запущена в регионе", tag: "Водные ресурсы", date: "2 апреля 2026", img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=80&auto=format&fit=crop", content: "Региональные власти совместно с международными организациями запустили программу модернизации ирригационных систем, направленную на сокращение потерь воды в сельском хозяйстве." },
  { title: "Astana Hub объявил новый грант для зелёных стартапов", tag: "Инвестиции", date: "20 марта 2026", img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=900&q=80&auto=format&fit=crop", content: "Технопарк выделит финансирование проектам в сфере чистой энергетики и устойчивого сельского хозяйства. Приём заявок открыт до конца квартала." },
  { title: "Форум по критическим минералам пройдёт в Алматы", tag: "Климат и политика", date: "5 марта 2026", img: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=900&q=80&auto=format&fit=crop", content: "Мероприятие соберёт представителей добывающих компаний и регуляторов для обсуждения устойчивой добычи минералов, критически важных для зелёной энергетики." },
  { title: "Отчёт: инвестиции в ВИЭ Центральной Азии выросли на 18%", tag: "Партнёрство", date: "14 февраля 2026", img: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=900&q=80&auto=format&fit=crop", content: "Согласно новому отчёту международных наблюдателей, регион демонстрирует устойчивый рост вложений в солнечную и ветровую генерацию третий год подряд." },
];

const DIRECTIONS = [
  { title: "Возобновляемая энергетика", Icon: Sun, desc: "Проекты и инициативы в области солнечной, ветровой и гидроэнергетики в Центральной Азии." },
  { title: "Климат и политика", Icon: CloudSun, desc: "Государственная политика, международные соглашения и климатические стратегии региона." },
  { title: "Водные ресурсы", Icon: Droplet, desc: "Управление водными ресурсами, устойчивое водопользование и трансграничные проекты." },
  { title: "Зелёное финансирование", Icon: Leaf, desc: "Инвестиции, гранты и финансовые инструменты для устойчивых проектов." },
  { title: "Устойчивая промышленность", Icon: Factory, desc: "Модернизация промышленности с учётом экологических стандартов." },
  { title: "Критические минералы", Icon: Gem, desc: "Добыча и переработка минералов, важных для зелёной энергетики." },
];

const PAGE_SIZE = 4;

export default function NewsAndDirections() {
  const [selectedDirection, setSelectedDirection] = useState<number | null>(null);
  const [selectedNews, setSelectedNews] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(NEWS_ALL.length / PAGE_SIZE);
  const pageItems = NEWS_ALL.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const featuredIndex = page * PAGE_SIZE;
  const [featured, ...rest] = pageItems;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,.85fr)]">
      <div>
        <span className="inline-block text-sm font-bold tracking-wide mb-2" style={{ color: "#2E8656" }}>ЧТО НОВОГО</span>
        <h2 className="text-4xl font-bold mb-8" style={{ color: "#10241D" }}>Новости</h2>

        <div onClick={() => setSelectedNews(featuredIndex)} className="rounded-2xl overflow-hidden mb-6 cursor-pointer transition-all hover:-translate-y-1 bg-white" style={{ boxShadow: "0 10px 30px rgba(6,29,61,.12)" }}>
          <img src={featured.img} alt={featured.title} className="w-full h-80 object-cover" />
          <div className="p-8">
            <span className="text-xs font-bold" style={{ color: "#2E8656" }}>{featured.tag}</span>
            <h3 className="font-bold text-3xl mt-2" style={{ color: "#061D3D" }}>{featured.title}</h3>
            <p className="text-xs mt-3" style={{ color: "#8B978C" }}>{featured.date}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          {rest.map((news, i) => (
            <div key={news.title} onClick={() => setSelectedNews(featuredIndex + i + 1)} className="flex gap-5 items-center p-4 rounded-xl bg-white cursor-pointer transition-all hover:-translate-y-1" style={{ boxShadow: "0 4px 14px rgba(6,29,61,.06)" }}>
              <img src={news.img} alt={news.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
              <div>
                <span className="text-xs font-bold" style={{ color: "#2E8656" }}>{news.tag}</span>
                <h3 className="font-semibold text-sm mt-0.5" style={{ color: "#10241D" }}>{news.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i)} className="w-9 h-9 rounded-full text-sm font-bold transition-all" style={page === i ? { backgroundColor: "#2E8656", color: "#FFFFFF" } : { backgroundColor: "#FFFFFF", color: "#10241D", border: "1px solid #E4E7DD" }}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <span className="inline-block text-sm font-bold tracking-wide mb-2" style={{ color: "#2E8656" }}>СФЕРЫ ФОКУСА</span>
        <h2 className="text-4xl font-bold mb-8" style={{ color: "#10241D" }}>Направления</h2>
        <div className="grid gap-3">
          {DIRECTIONS.map((d, i) => (
            <button key={d.title} onClick={() => setSelectedDirection(i)} className="flex items-center gap-4 text-left p-5 rounded-2xl bg-white transition-all hover:-translate-y-1" style={{ boxShadow: "0 8px 24px rgba(6,29,61,.06)" }}>
              <div className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center" style={{ backgroundColor: "#E0EAB8" }}>
                <d.Icon size={20} color="#02493F" />
              </div>
              <div className="font-bold text-sm" style={{ color: "#10241D" }}>{d.title}</div>
            </button>
          ))}
        </div>
      </div>

      {selectedDirection !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: "rgba(0,20,15,0.6)" }} onClick={() => setSelectedDirection(null)}>
          <div className="max-w-md w-full rounded-2xl p-8 bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#E0EAB8" }}>
              {(() => { const Icon = DIRECTIONS[selectedDirection].Icon; return <Icon size={24} color="#02493F" />; })()}
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: "#10241D" }}>{DIRECTIONS[selectedDirection].title}</h3>
            <p className="text-sm mb-6" style={{ color: "#5B6B62" }}>{DIRECTIONS[selectedDirection].desc}</p>
            <button onClick={() => setSelectedDirection(null)} className="px-4 py-2 rounded-full text-sm text-white font-bold" style={{ backgroundColor: "#2E8656" }}>Закрыть</button>
          </div>
        </div>
      )}

      {selectedNews !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: "rgba(0,20,15,0.65)" }} onClick={() => setSelectedNews(null)}>
          <div className="relative max-w-5xl w-full rounded-3xl overflow-hidden bg-white" style={{ maxHeight: "90vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedNews(null)} className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white" style={{ boxShadow: "0 4px 14px rgba(16,36,29,0.2)" }}>
              <X size={18} color="#10241D" />
            </button>
            <img src={NEWS_ALL[selectedNews].img} alt={NEWS_ALL[selectedNews].title} className="w-full object-cover" style={{ height: "380px" }} />
            <div className="p-12">
              <span className="text-sm font-bold" style={{ color: "#2E8656" }}>{NEWS_ALL[selectedNews].tag}</span>
              <h3 className="text-4xl font-bold mt-3 mb-2 leading-tight" style={{ color: "#10241D" }}>{NEWS_ALL[selectedNews].title}</h3>
              <p className="text-sm mb-6" style={{ color: "#8B978C" }}>{NEWS_ALL[selectedNews].date}</p>
              <p className="text-lg leading-relaxed" style={{ color: "#4A5A52" }}>{NEWS_ALL[selectedNews].content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
