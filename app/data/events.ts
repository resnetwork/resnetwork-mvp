export type ResEvent = {
  slug: string;
  title: string;
  date: string;
  location: string;
  category: string;
  summary: string;
  details: string[];
  contact?: string[];
  source?: string;
  image: string;
};

export const EVENTS: ResEvent[] = [
  {
    slug: "smart-water-smart-plastic",
    title: "Smart Water Zone & Циркулярная экономика",
    date: "20 августа 2026 · 16:00",
    location: "Hampton by Hilton Astana, пр. Мангилик Ел, 43а",
    category: "Вода и циркулярная экономика",
    summary: "Итоговая церемония награждения участников проектов рационального водопользования, Green Urban и GPI-Lab.",
    details: [
      "Торжественное вручение знаков отличия участникам проектов",
      "Практики эффективного управления водными ресурсами от компаний-участников",
      "Обмен опытом с региональными и международными экспертами",
      "Подведение итогов Smart Water Zone и инициатив водосбережения",
    ],
    contact: [
      "Подтвердить участие до 18 августа: info@gpi.kz",
      "WhatsApp: +7 702 101 02 51",
      "Для представителей других городов предусмотрено онлайн-участие.",
    ],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "caier-gri-summer-school",
    title: "CAIER GRI Summer School 2026",
    date: "20–26 августа 2026",
    location: "Алматы, пр. Достык 300/26",
    category: "ESG и отчётность",
    summary: "Международная очная образовательная программа по подготовке отчётности в области устойчивого развития в соответствии со Стандартами GRI от официального GRI Certified Training Partner.",
    details: [
      "Сертифицированный курс по Стандартам GRI",
      "Практические семинары по ESG-управлению",
      "Устойчивое финансирование и зелёные облигации",
      "Цели устойчивого развития ООН",
      "Определение существенных тем и взаимодействие с заинтересованными сторонами",
      "Подготовка качественной отчётности в области устойчивого развития",
    ],
    contact: [
      "По окончании выдаются сертификаты GRI международного образца",
      "Организатор: CAIER, официальный GRI Certified Training Partner",
      "Контакт: Ескалиева Раушан · esg@asianecology.kz · +7 777 043 93 92",
    ],
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "green-energy-week",
    title: "Central Asia Green Energy Week 2026",
    date: "7–8 сентября 2026",
    location: "Бишкек, Кыргызстан",
    category: "Энергетический переход",
    summary: "Региональная площадка по развитию солнечной, ветровой энергетики, накопителей энергии и зелёного водорода в Кыргызстане, Узбекистане и Казахстане.",
    details: [
      "Солнечная и ветровая генерация в Центральной Азии",
      "Промышленные накопители энергии и сети",
      "Зелёный водород и экспортный потенциал",
      "Инвестиционные возможности в регионе",
    ],
    source: "https://www.peakevents.org/green-energy-central-asia/",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "go-net-zero-energy-summit",
    title: "Go Net Zero Energy Summit — Central Asia & Caspian",
    date: "8 сентября 2026",
    location: "Астана, Казахстан",
    category: "Энергетический переход",
    summary: "Саммит для политиков, энергетических компаний, инвесторов и поставщиков технологий по переходу к низкоуглеродной энергетике.",
    details: [
      "Декарбонизация и энергоэффективность",
      "Водородные технологии и улавливание углерода",
      "Инвестиции в энергетический переход",
    ],
    source: "https://invest.gov.kz/calendar/sammit-go-net-zero-energy-tsentralnaya-aziya-i-kaspiy/",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "mining-metals-central-asia",
    title: "Mining and Metals Central Asia 2026",
    date: "16–18 сентября 2026",
    location: "Алматы, ВЦ «Атакент»",
    category: "Критические минералы",
    summary: "31-я Центральноазиатская международная выставка горной разведки и оборудования — свыше 500 компаний из более чем 20 стран.",
    details: [
      "Открытая и подземная добыча с низким углеродным следом",
      "Обогащение полезных ископаемых и редких земель",
      "Экологический мониторинг и стандарты безопасности",
      "Охрана окружающей среды и рекультивация",
    ],
    source: "https://mining-metals.kz/en/exhibition/about-the-exhibition",
    image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "un-sdg-forum",
    title: "Форум ООН по реализации Целей устойчивого развития",
    date: "16–17 сентября 2026",
    location: "UN Plaza, Алматы",
    category: "Устойчивое развитие",
    summary: "Десятый многосторонний форум Северной и Центральной Азии по реализации ЦУР и региональной кооперации.",
    details: [
      "Ответственное потребление и циркулярное производство",
      "Сохранение экосистем суши и ледников",
      "Партнёрства правительств и бизнеса для достижения ЦУР",
    ],
    source: "https://www.unescap.org/events/2026/tenth-north-and-central-asia-multi-stakeholder-forum-implementation-sustainable",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "caspian-sea-conference",
    title: "Caspian Sea Conference 2026",
    date: "Октябрь 2026 · дата уточняется",
    location: "Nazarbayev University, Астана",
    category: "Климатическая адаптация",
    summary: "Международная конференция о сохранении Каспийского моря, климатических рисках и региональном водном сотрудничестве.",
    details: [
      "Адаптация к изменению климата бассейна Каспия",
      "Защита биоразнообразия и экосистем",
      "Научно-политическое и отраслевое взаимодействие стран региона",
    ],
    source: "https://smg.nu.edu.kz/caspian_sea_conference",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format&fit=crop",
  },
];