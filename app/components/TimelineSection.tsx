"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft } from "lucide-react";

const ERAS = [
  {
    id: 0,
    title: "Инициатива и международная поддержка",
    years: "2023–2024",
    dotColor: "#22c55e",
    description: "Формирование мандата. Инициатива, заявленная Казахстаном на 78-й сессии Генеральной Ассамблеи ООН, получила поддержку ведущих международных организаций и глав государств региона, закрепившись в официальной Резолюции ООН.",
    bgImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
    events: [
      {
        year: "2023",
        tag: "ГА ООН",
        title: "Инициатива объявлена на Генассамблее ООН",
        text: "Президент Республики Казахстан Касым-Жомарт Токаев на 78-й сессии Генеральной Ассамблеи ООН в 2023 году объявил об инициативе проведения Регионального экологического саммита (RES 2026) в партнёрстве с Организацией Объединённых Наций.",
        image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=600&auto=format&fit=crop"
      },
      {
        year: "19 декабря 2023",
        tag: "Мандат ООН",
        title: "Резолюция Генеральной Ассамблеи ООН 78/147",
        text: "Поддержка ООН официально закреплена в Резолюции ГА ООН 78/147 «Центральная Азия перед лицом экологических вызовов: укрепление регионального единства в интересах устойчивого развития и процветания». Проект поддержали ООН, ОЭСР, IRENA, МЭА и другие международные институты.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop"
      },
      {
        year: "2024",
        tag: "Главы государств",
        title: "Подтверждение на уровне глав государств",
        text: "Мандат закреплен международными декларациями:\n• Карабахская декларация Неформального саммита Организации тюркских государств (6 июля 2024, Азербайджан)\n• Совместное заявление VI Консультативной встречи глав государств Центральной Азии (9 августа 2024, Казахстан)\n• Бишкекская декларация XI Саммита Организации тюркских государств (6 ноября 2024, Кыргызстан).",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600&auto=format&fit=crop"
      }
    ],
    offsetClass: "md:translate-y-6 lg:translate-y-8",
    lineHeight: "h-24 md:h-28 lg:h-32",
  },
  {
    id: 1,
    title: "Подтверждение",
    years: "2025",
    dotColor: "#eab308",
    description: "На 80-й сессии Генеральной Ассамблеи ООН проведение Саммита в апреле 2026 года в Астане было окончательно подтверждено на высшем мировом уровне.",
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    events: [
      {
        year: "2025",
        tag: "80-я сессия ГА ООН",
        title: "Подтверждение даты саммита",
        text: "На 80-й сессии Генеральной Ассамблеи ООН Президент Касым-Жомарт Токаев подтвердил проведение Саммита в апреле 2026 года в Астане, обозначив ключевые цели экологического и технологического перехода региона.",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop"
      },
      {
        year: "2025",
        tag: "Генсек ООН",
        title: "Признание Генерального секретаря ООН",
        text: "Инициатива получила особое признание на церемонии открытия Регионального центра ООН по Целям устойчивого развития для Центральной Азии и Афганистана с личным участием Генерального секретаря ООН Антониу Гутерриша.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop"
      },
      {
        year: "2025",
        tag: "Мировые форумы",
        title: "Презентация на международных площадках",
        text: "Повестка предстоящего саммита представлена на Астанинском международном форуме (AIF), а также на Третьей конференции ООН по развивающимся странам, не имеющим выхода к морю (Туркменистан).",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop"
      }
    ],
    offsetClass: "md:-translate-y-8 lg:-translate-y-12",
    lineHeight: "h-36 md:h-44 lg:h-48",
  },
  {
    id: 2,
    title: "RES 2026 — прорыв инвестиций",
    years: "2026",
    dotColor: "#f97316",
    description: "22–24 апреля 2026 года в МВЦ EXPO (Астана) состоялся саммит с участием лидеров 8 государств и руководства ООН. Подписано 17 соглашений на $2,1 млрд и принята Центральноазиатская декларация об экологической солидарности.",
    bgImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop",
    events: [
      {
        year: "22 апреля 2026",
        tag: "8 стран + ООН",
        title: "Лидеры 8 государств и руководство ООН",
        text: "Президент Казахстана Касым-Жомарт Токаев приветствовал Президентов Кыргызстана (С. Жапаров), Узбекистана (Ш. Мирзиёев), Таджикистана (Э. Рахмон), Туркменистана (С. Бердымухамедов), Армении (В. Хачатурян), Монголии (У. Хурэлсух), Грузии (М. Кавелашвили) и Премьер-министра Азербайджана (А. Асадов). ООН представляли заместитель Генсека Ли Цзюньхуа, глава ЮНЕП Ингер Андерсен и исполнительный секретарь ЕЭК ООН Татьяна Молчан.",
        image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=600&auto=format&fit=crop"
      },
      {
        year: "Инвестиции",
        tag: "$1,3+ млрд",
        title: "Ветроэнергетика: мегапарки на 3,5 ГВт",
        text: "• Karaganda Wind Power — ветроэлектростанция мощностью 500 МВт ($645 млн)\n• Aktas Energy — ветроэнергетический проект мощностью 1 ГВт в рамках механизма JCM\n• China Shanghai Electric — строительство масштабного ветропарка мощностью 2 ГВт в Карагандинской области.",
        image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=600&auto=format&fit=crop"
      },
      {
        year: "Генерация",
        tag: "560 млн $",
        title: "Солнце, гидро и переработка отходов (Waste-to-Energy)",
        text: "• VIGOR Holding — СЭС 70 МВт в Кызылординской области (74,9 млн японских иен)\n• Taraz Greenpower — каскад ГЭС 18 МВт в Жамбылской области (10,5 млрд ₸)\n• Мусоросжигательные энергокомплексы: East Hope в Астане (50 МВт, $180 млн), Shaanxi в Шымкенте (24 МВт, $100 млн), Junxin в Алматы (60 МВт, $280 млн).",
        image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=600&auto=format&fit=crop"
      },
      {
        year: "Индустрия",
        tag: "906,6 млн $",
        title: "Декарбонизация, чистое авиатопливо (SAF) и климатические финансы",
        text: "• Qarmet — газификация и переход на экологичное топливо ($256,6 млн)\n• Qazaq Kalium — завод калийных удобрений на месторождении Сатимола ($650 млн)\n• КМГ, KFP и KBR — соглашение о создании первого в Казахстане завода экологичного авиатоплива SAF\n• Банк развития Казахстана (БРК) и Французское агентство развития (AFD) — кредитная линия на 150 млн евро.",
        image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=600&auto=format&fit=crop"
      }
    ],
    offsetClass: "md:translate-y-12 lg:translate-y-16",
    lineHeight: "h-20 md:h-24 lg:h-28",
  },
  {
    id: 3,
    title: "Запуск RES Network",
    years: "2026",
    dotColor: "#AFE552",
    isCurrent: true,
    description: "RES Network (Regional Ecological Synergy Network) создан, чтобы продлить эффект Саммита за пределы трёх дней в году. Разовое мероприятие превращается в постоянную круглогодичную экосистему сотрудничества.",
    bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    events: [
      {
        year: "2026",
        tag: "Инфраструктура",
        title: "От разового события — к постоянной экосистеме",
        text: "RES Network обеспечивает непрерывное межгосударственное и B2B-взаимодействие: постоянно действующие рабочие группы, межотраслевые диалоги, выездные деловые миссии, центр знаний и мониторинг инвестиционных инициатив.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop"
      },
      {
        year: "RES365",
        tag: "Цифровой кабинет",
        title: "RES Platform — закрытая цифровая среда",
        text: "Единый рабочий кабинет для правительств, министерств, девелоперов, инвесторов и поставщиков технологий: верифицированные профили участников, защищенная база контактов, умный B2B-мэтчинг и билетная система мероприятий.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
      },
      {
        year: "CleanTech",
        tag: "Трансфер технологий",
        title: "Региональный хаб зеленых технологий",
        text: "Платформа прямого трансфера и пилотирования инноваций в водосбережении, возобновляемой генерации, ESG-финансировании и декарбонизации промышленности для стран Центральной Азии.",
        image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=600&auto=format&fit=crop"
      }
    ],
    offsetClass: "md:-translate-y-6 lg:-translate-y-8",
    lineHeight: "h-32 md:h-40 lg:h-44",
  },
  {
    id: 4,
    title: "RES+ EXPO 2027",
    years: "2027–2050",
    dotColor: "#02B779",
    description: "Вторая итерация международной выставки и утвержденный стратегический горизонт Центральной Азии по достижению полной углеродной нейтральности к 2050 году.",
    bgImage: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop",
    events: [
      {
        year: "5–7 мая 2027",
        tag: "Астана, МВЦ EXPO",
        title: "RES+ EXPO 2027: Флагманская выставка",
        text: "Вторая итерация международной выставки и конгресса. Встреча всей экосистемы: правительства, международные инвесторы, институты развития, банки, наука и CleanTech-стартапы. Более 1000 участников, B2B-мэтчинг и новые обязывающие соглашения.",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop"
      },
      {
        year: "До 2030 года",
        tag: "Цели пятилетки",
        title: "Что должно быть построено к 2030 году",
        text: "• Возобновляемая энергетика: ввод 3,5 ГВт мощностей (ветер, солнце, гидро)\n• Переработка отходов: 134 МВт действующих энергомощностей\n• Декарбонизация тяжелой промышленности: системный переход на газ и чистое топливо\n• Производство калия: 1,5 млн тонн в год со сниженными выбросами.",
        image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=600&auto=format&fit=crop"
      },
      {
        year: "Горизонт 2050",
        tag: "Углеродная нейтральность",
        title: "Климатический нейтралитет региона",
        text: "• Полная углеродная нейтральность в масштабе Центральной Азии\n• 100% переход на чистые и безуглеродные источники энергии\n• Циркулярная экономика замкнутого цикла во всех секторах\n• Единая региональная система климатического финансирования и торговли квотами.",
        image: "https://images.unsplash.com/photo-1618037326074-cecb01463991?q=80&w=600&auto=format&fit=crop"
      }
    ],
    offsetClass: "md:translate-y-10 lg:translate-y-14",
    lineHeight: "h-20 md:h-24 lg:h-28",
  }
];

export default function TimelineSection() {
  const [activeEra, setActiveEra] = useState<number | null>(null);

  useEffect(() => {
    if (activeEra !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeEra]);

  const handleNext = () => {
    if (activeEra !== null) {
      setActiveEra((activeEra + 1) % ERAS.length);
    }
  };

  const handlePrev = () => {
    if (activeEra !== null) {
      setActiveEra((activeEra - 1 + ERAS.length) % ERAS.length);
    }
  };

  return (
    <section 
      id="history" 
      className="relative px-6 md:px-12 lg:px-16 pt-24 pb-36 md:pt-28 md:pb-48 overflow-hidden bg-gradient-to-b from-[#072418] via-[#051a11] to-[#020d08]"
    >
      {/* Мягкие глубокие зеленые блики в стиле RES Network */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-[#02B779]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-12 right-1/4 w-[500px] h-[300px] bg-[#AFE552]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* ХЕДЕР СЕКЦИИ */}
      <div className="max-w-7xl mx-auto relative z-20 mb-20 md:mb-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-end">
          
          <div className="md:col-span-7">
            <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-black text-white tracking-tight leading-[1.12]">
              От инициативы в ООН <br />
              <span className="text-[#AFE552]">до экосистемы</span>
            </h2>
          </div>

          <div className="md:col-span-5 pb-1">
            <p className="text-[#A1BB94] text-base md:text-lg lg:text-xl font-normal leading-relaxed">
              RES Network вырос не из идеи, а из международного мандата. Узнайте, как формировалась зелёная экономика региона и как развиваются ключевые вехи.
            </p>
          </div>

        </div>
      </div>

      {/* ОСНОВНОЙ БЛОК: ПЕРЕКРЫВАЮЩИЕСЯ СФЕРЫ */}
      <div className="max-w-[1600px] mx-auto relative z-20">
        
        {/* ДЕСКТОП: 5 перекрывающихся сфер */}
        <div className="hidden md:flex justify-center items-center -space-x-12 lg:-space-x-20 xl:-space-x-24 relative py-12">
          {ERAS.map((era, index) => (
            <div
              key={era.id}
              onClick={() => setActiveEra(era.id)}
              style={{ zIndex: 10 + index }}
              className={`relative flex flex-col items-center group cursor-pointer transition-transform duration-500 hover:scale-105 hover:z-50 ${era.offsetClass}`}
            >
              {/* Круглая фото-сфера */}
              <div 
                className={`
                  relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden 
                  border-2 border-white/20 group-hover:border-white/80 transition-all duration-500
                  shadow-[0_15px_40px_rgba(0,0,0,0.6)] group-hover:shadow-[0_20px_60px_rgba(175,229,82,0.3)]
                  ${era.isCurrent ? 'ring-4 ring-[#AFE552]/90 shadow-[0_0_50px_rgba(175,229,82,0.4)]' : ''}
                `}
              >
                <img
                  src={era.bgImage}
                  alt={era.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 group-hover:opacity-40 transition-opacity" />

                {/* Центральная стеклянная плашка */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-20 text-center pointer-events-none">
                  {era.isCurrent && (
                    <span className="mb-2 px-3 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest bg-[#AFE552] text-black shadow-md">
                      Текущий этап
                    </span>
                  )}
                  <div className="bg-[#04140d]/85 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 shadow-2xl max-w-[88%]">
                    <h3 className="text-white text-sm lg:text-base font-bold leading-tight">
                      {era.title}
                    </h3>
                    <span 
                      className="text-xs font-semibold tracking-wider block mt-1"
                      style={{ color: era.dotColor }}
                    >
                      {era.years}
                    </span>
                  </div>

                  <div 
                    className="w-2.5 h-2.5 rounded-full mt-2.5 shadow-[0_0_12px_currentColor]"
                    style={{ backgroundColor: era.dotColor, color: era.dotColor }}
                  />
                </div>
              </div>

              {/* Тонкая направляющая линия */}
              <div 
                className={`w-[1px] bg-gradient-to-b from-white/40 via-white/20 to-transparent mt-3 pointer-events-none ${era.lineHeight}`} 
              />
            </div>
          ))}
        </div>

        {/* МОБИЛЬНАЯ ВЕРСИЯ */}
        <div className="md:hidden flex flex-col items-center gap-10 relative z-20">
          {ERAS.map((era) => (
            <div
              key={era.id}
              onClick={() => setActiveEra(era.id)}
              className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-white/20 shadow-xl cursor-pointer group"
            >
              <img
                src={era.bgImage}
                alt={era.title}
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center">
                {era.isCurrent && (
                  <span className="mb-2 px-3 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-widest bg-[#AFE552] text-black">
                    Сейчас
                  </span>
                )}
                <div className="bg-[#04140d]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                  <h3 className="text-white text-sm font-bold leading-tight">
                    {era.title}
                  </h3>
                  <span className="text-xs font-bold block mt-1" style={{ color: era.dotColor }}>
                    {era.years}
                  </span>
                </div>
                <div 
                  className="w-2.5 h-2.5 rounded-full mt-2 shadow-[0_0_10px_currentColor]"
                  style={{ backgroundColor: era.dotColor, color: era.dotColor }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* НИЖНЯЯ ЗОЛОТИСТАЯ ДУГА И ВОЛНЫ */}
      <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 pointer-events-none overflow-hidden z-10">
        <svg 
          viewBox="0 0 1600 200" 
          preserveAspectRatio="none" 
          className="w-full h-full absolute bottom-4 left-0 opacity-80"
        >
          <path
            d="M -50 170 Q 400 90 800 130 T 1650 60"
            fill="none"
            stroke="url(#res-arc)"
            strokeWidth="2.5"
          />
          <defs>
            <linearGradient id="res-arc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#02B779" />
              <stop offset="35%" stopColor="#AFE552" />
              <stop offset="70%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#02B779" />
            </linearGradient>
          </defs>
        </svg>

        <svg 
          viewBox="0 0 1600 200" 
          preserveAspectRatio="none" 
          className="w-full h-full absolute bottom-0 left-0 opacity-70 fill-[#03120b]"
        >
          <path d="M 0 140 Q 450 70 900 120 T 1600 80 L 1600 200 L 0 200 Z" />
        </svg>
        <svg 
          viewBox="0 0 1600 200" 
          preserveAspectRatio="none" 
          className="w-full h-full absolute bottom-0 left-0 opacity-90 fill-[#010805]"
        >
          <path d="M 0 170 Q 500 110 1000 150 T 1600 120 L 1600 200 L 0 200 Z" />
        </svg>
      </div>

      {/* ПОЛНОЭКРАННАЯ ПРЕЗЕНТАЦИЯ С ПОДРОБНОЙ ИНФОРМАЦИЕЙ ИЗ ТЗ */}
      {activeEra !== null && (
        <div className="fixed inset-0 z-[100] bg-[#04140d]/95 backdrop-blur-2xl flex flex-col h-screen overflow-y-auto animate-in fade-in duration-300">
          
          {/* Фоновое легкое размытие */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20 blur-[90px]">
            <img 
              src={ERAS[activeEra].bgImage} 
              className="w-full h-full object-cover scale-110" 
              alt="ambient background" 
            />
          </div>

          {/* Кнопка закрытия (X) */}
          <button 
            onClick={() => setActiveEra(null)}
            className="fixed top-6 right-6 md:top-10 md:right-10 p-3.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors z-50 backdrop-blur-md"
            aria-label="Закрыть презентацию"
          >
            <X size={26} strokeWidth={1.8} />
          </button>

          {/* Основной контейнер презентации */}
          <div className="relative z-10 flex flex-col max-w-[1450px] mx-auto w-full px-6 md:px-12 lg:px-16 pt-12 md:pt-16 pb-16">
            
            {/* ВЕРХНЯЯ ЧАСТЬ: Заголовок, описание и стрелки */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end w-full mb-8 lg:mb-10 gap-6">
              
              <div className="flex-1 max-w-4xl">
                <div className="flex items-center gap-3 mb-2">
                  <span 
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: ERAS[activeEra].dotColor }}
                  />
                  <h4 className="text-lg md:text-xl font-semibold tracking-wide text-[#AFE552]">
                    {ERAS[activeEra].title}
                  </h4>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black text-white mb-4 tracking-tight leading-none">
                  {ERAS[activeEra].years}
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-white/85 leading-relaxed font-normal">
                  {ERAS[activeEra].description}
                </p>
              </div>

              {/* Правый блок: Стрелки навигации */}
              <div className="flex gap-3 pb-1 shrink-0">
                <button 
                  onClick={handlePrev}
                  className="w-13 h-13 md:w-14 md:h-14 rounded-xl border border-white/20 hover:bg-white/10 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
                  aria-label="Предыдущий период"
                >
                  <ArrowLeft size={24} strokeWidth={1.8} />
                </button>
                <button 
                  onClick={handleNext}
                  className="w-13 h-13 md:w-14 md:h-14 rounded-xl border border-white/20 hover:bg-white/10 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
                  aria-label="Следующий период"
                >
                  <ArrowRight size={24} strokeWidth={1.8} />
                </button>
              </div>
            </div>

            {/* СРЕДНЯЯ ЧАСТЬ: Линия таймлайна с точкой */}
            <div className="w-full my-4 md:my-6 relative flex-shrink-0">
              <div className="w-full h-[2px] bg-white/20 rounded-full" />
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-[#AFE552] shadow-[0_0_12px_#AFE552]"
                style={{ left: `${((activeEra + 0.5) / ERAS.length) * 100}%` }}
              />
            </div>

            {/* НИЖНЯЯ ЧАСТЬ: Карточки с полным текстом из ТЗ */}
            <div className="w-full pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                {ERAS[activeEra].events.map((event, idx) => (
                  <div 
                    key={idx} 
                    className="bg-[#082115]/80 border border-white/15 rounded-2xl overflow-hidden flex flex-col group hover:bg-[#0c2f1e]/95 transition-all duration-300 backdrop-blur-md shadow-xl"
                  >
                    {/* Картинка карточки */}
                    <div className="h-44 w-full overflow-hidden relative flex-shrink-0">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#04140d]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#AFE552] border border-white/10">
                        {event.tag}
                      </div>
                    </div>

                    {/* Текст карточки с полным описанием */}
                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
                        {event.year}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug">
                        {event.title}
                      </h3>
                      <div className="text-sm md:text-[0.95rem] text-white/80 leading-relaxed space-y-2 whitespace-pre-line flex-1">
                        {event.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
