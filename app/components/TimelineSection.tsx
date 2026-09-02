"use client";

import { useState } from "react";
import FocusRevealHeading from "./FocusRevealHeading";
import { ArrowUpRight } from "lucide-react";

const TIMELINE_DATA = [
  {
    year: "2023",
    label: "ИНИЦИАТИВА",
    title: "Инициатива объявлена на Генассамблее ООН",
    content: (
      <p className="text-res-text-muted text-sm md:text-base leading-relaxed">
        Президент Республики Казахстан Касым-Жомарт Токаев объявил об инициативе проведения Регионального экологического саммита (RES 2026) в партнёрстве с Организацией Объединённых Наций — на 78-й сессии Генеральной Ассамблеи ООН в 2023 году.
      </p>
    )
  },
  {
    year: "2024",
    label: "МЕЖДУНАРОДНАЯ ПОДДЕРЖКА",
    title: "Мандат закреплён на уровне ООН и глав государств",
    content: (
      <div className="space-y-4 text-res-text-muted text-sm md:text-base leading-relaxed">
        <p>Инициатива получила широкую поддержку международных партнёров: ООН, ОЭСР, IRENA, МЭА и других организаций.</p>
        <p>Поддержка ООН закреплена в Резолюции Генеральной Ассамблеи ООН 78/147 от 19 декабря 2023 года — «Центральная Азия перед лицом экологических вызовов: укрепление регионального единства в интересах устойчивого развития и процветания».</p>
        <p>Подтверждено на уровне глав государств:</p>
        <ul className="list-disc pl-5 space-y-2 text-[#E0EAB8]/90">
          <li>Карабахская декларация Неформального саммита Организации тюркских государств — 6 июля 2024, Азербайджан</li>
          <li>Совместное заявление VI Консультативной встречи глав государств Центральной Азии — 9 августа 2024, Казахстан</li>
          <li>Бишкекская декларация XI Саммита Организации тюркских государств — 6 ноября 2024, Кыргызская Республика</li>
        </ul>
      </div>
    )
  },
  {
    year: "2025",
    label: "ПОДТВЕРЖДЕНИЕ",
    title: "Дата саммита подтверждена на 80-й сессии ГА ООН",
    content: (
      <div className="space-y-4 text-res-text-muted text-sm md:text-base leading-relaxed">
        <p>На 80-й сессии Генеральной Ассамблеи ООН в 2025 году Президент Касым-Жомарт Токаев подтвердил проведение Саммита в апреле 2026 года в Астане.</p>
        <p>Инициатива получила дополнительное признание:</p>
        <ul className="list-disc pl-5 space-y-2 text-[#E0EAB8]/90">
          <li>На Астанинском международном форуме</li>
          <li>На церемонии открытия Регионального центра ООН по Целям устойчивого развития для Центральной Азии и Афганистана — с участием Генерального секретаря ООН Антониу Гутерриша</li>
          <li>На Третьей конференции ООН по развивающимся странам, не имеющим выхода к морю (Туркменистан)</li>
        </ul>
      </div>
    )
  },
  {
    year: "2026",
    label: "ПРОРЫВ ЗЕЛЁНЫХ ИНВЕСТИЦИЙ",
    title: "RES 2026 — 22-24 апреля 2026 · Астана, МВЦ EXPO",
    defaultOpen: true,
    content: (
      <div className="space-y-5 text-res-text-muted text-sm md:text-base leading-relaxed">
        <p>22 апреля 2026 года в выставочном центре Astana EXPO Президент Казахстана Касым-Жомарт Токаев приветствовал лидеров стран региона — Президента Кыргызстана, Президента Узбекистана, Президента Таджикистана, Президента Туркменистана, Президента Армении, Президента Монголии и Президента Грузии, а также Премьер-министра Азербайджана.</p>
        <p>Организацию Объединённых Наций представляли заместитель Генерального секретаря ООН, исполнительный директор Программы ООН по окружающей среде (ЮНЕП) и исполнительный секретарь ЕЭК ООН.</p>
        <p className="font-bold text-white">Всего за один день было подписано 17 соглашений на сумму более 2,1 млрд долларов США. Саммит также принял историческую Центральноазиатскую декларацию об экологической солидарности.</p>
        
        <div className="bg-[#112318] border border-[#A1BB94]/20 p-5 rounded-xl space-y-4 mt-4">
          <div>
            <h4 className="font-bold text-[#AFE552] mb-2">Ветроэнергетика — более 1,3 млрд долларов США</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#E0EAB8]">
              <li>Karaganda Wind Power — ветроэлектростанция мощностью 500 МВт, инвестиции 645 млн $.</li>
              <li>Aktas Energy — ветроэнергетический проект мощностью 1 ГВт (JCM).</li>
              <li>China Shanghai Electric — строительство ветропарка мощностью 2 ГВт.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#AFE552] mb-2">Солнечная и гидроэнергетика</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#E0EAB8]">
              <li>VIGOR Holding — СЭС 70 МВт в Кызылординской области.</li>
              <li>Taraz Greenpower — каскад ГЭС мощностью 18 МВт.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#AFE552] mb-2">Переработка отходов в энергию — 560 млн долларов США</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#E0EAB8]">
              <li>East Hope (Астана, 50 МВт), Shaanxi Construction (Шымкент, 24 МВт), Junxin Environmental (Алматы, 60 МВт).</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#AFE552] mb-2">Декарбонизация и SAF</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#E0EAB8]">
              <li>Qarmet — переход на экологичное топливо (256,6 млн $).</li>
              <li>Qazaq Kalium — предприятие по производству калийных удобрений (650 млн $).</li>
              <li>КМГ, KFP и KBR — первый завод SAF в Казахстане.</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    year: "2026",
    label: "ЗАПУСК RES NETWORK",
    title: "От события — к постоянной экосистеме",
    content: (
      <p className="text-res-text-muted text-sm md:text-base leading-relaxed">
        RES Network (Regional Ecological Synergy Network) создан, чтобы продлить эффект Саммита за пределы трёх дней в году. Разовое мероприятие превращается в круглогодичную платформу: рабочие группы, отраслевые диалоги, деловые миссии, центр знаний и цифровая платформа партнёров.
      </p>
    )
  },
  {
    year: "2027",
    label: "RES+ EXPO 2027",
    title: "5–7 мая 2027 · Астана",
    content: (
      <div className="space-y-5">
        <p className="text-res-text-muted text-sm md:text-base leading-relaxed">
          Вторая итерация выставки Регионального экологического саммита. Встреча всей экосистемы: правительства, бизнес, инвесторы, банки развития, наука и инноваторы.
        </p>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm bg-white text-black hover:bg-[#E0EAB8] transition-colors shadow-lg">
          Забронировать участие <ArrowUpRight size={16} />
        </button>
      </div>
    )
  },
  {
    year: "2030",
    label: "ЦЕЛИ",
    title: "Что должно быть построено",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <div className="p-4 bg-[#112318] border border-[#A1BB94]/10 rounded-lg">
          <div className="text-xs text-[#A1BB94] uppercase tracking-wider mb-1">Возобновляемая энергетика</div>
          <div className="text-lg font-bold text-white">3,5 ГВт (ветер, солнце, гидро)</div>
        </div>
        <div className="p-4 bg-[#112318] border border-[#A1BB94]/10 rounded-lg">
          <div className="text-xs text-[#A1BB94] uppercase tracking-wider mb-1">Переработка отходов</div>
          <div className="text-lg font-bold text-white">134 МВт действующих мощностей</div>
        </div>
        <div className="p-4 bg-[#112318] border border-[#A1BB94]/10 rounded-lg">
          <div className="text-xs text-[#A1BB94] uppercase tracking-wider mb-1">Декарбонизация промышленности</div>
          <div className="text-lg font-bold text-white">Переход на газ и чистое топливо</div>
        </div>
        <div className="p-4 bg-[#112318] border border-[#A1BB94]/10 rounded-lg">
          <div className="text-xs text-[#A1BB94] uppercase tracking-wider mb-1">Производство калия</div>
          <div className="text-lg font-bold text-white">1,5 млн тонн/год со сниженными выбросами</div>
        </div>
      </div>
    )
  },
  {
    year: "2050",
    label: "ГОРИЗОНТ",
    title: "Углеродная нейтральность Центральной Азии",
    content: (
      <ul className="list-disc pl-5 space-y-2 text-[#E0EAB8]/90 text-sm md:text-base leading-relaxed">
        <li>Углеродная нейтральность в масштабе региона</li>
        <li>100% переход на чистые источники энергии</li>
        <li>Циркулярная экономика во всех промышленных секторах</li>
        <li>Региональная система климатического финансирования и трансфера зелёных технологий</li>
      </ul>
    )
  },
];

export default function TimelineSection() {
  const [openIndex, setOpenIndex] = useState<number>(3); // 2026 is index 3

  return (
    <section className="px-6 md:px-12 py-20 md:py-28 bg-[#080C0A]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <FocusRevealHeading
            tokens={[
              { text: "От инициативы в ООН", isAccent: false },
              { text: "до экосистемы", isAccent: true },
            ]}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4"
            align="left"
          />
          <p className="text-res-text-muted text-lg">
            RES Network вырос не из идеи, а из международного мандата.
          </p>
        </div>

        <div className="relative border-l-2 border-[#1a3324] ml-3 md:ml-6 space-y-12 pb-12">
          {TIMELINE_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="relative pl-8 md:pl-12 group">
                {/* Dot */}
                <div className={`absolute -left-[11px] top-1.5 h-5 w-5 rounded-full border-4 border-[#080C0A] transition-colors duration-300 ${isOpen ? 'bg-res-accent' : 'bg-[#2a4d38] group-hover:bg-[#A1BB94]'}`}></div>
                
                {/* Header (Clickable) */}
                <div 
                  className="cursor-pointer select-none"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-2xl md:text-3xl font-black font-mono transition-colors ${isOpen ? 'text-white' : 'text-res-text-muted group-hover:text-white'}`}>
                      {item.year}
                    </span>
                    <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border transition-colors ${isOpen ? 'border-[#A1BB94]/30 bg-[#A1BB94]/10 text-[#A1BB94]' : 'border-transparent text-res-text-muted/50'}`}>
                      {item.label}
                    </span>
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold mt-2 transition-colors ${isOpen ? 'text-[#E0EAB8]' : 'text-res-text-muted group-hover:text-white'}`}>
                    {item.title}
                  </h3>
                </div>

                {/* Content Body */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'}`}
                >
                  {item.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
