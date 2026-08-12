export type ResEvent = {
  slug: string;
  title: string;
  date: string;
  location: string;
  category: string;
  summary: string;
  details: string[];
  contact?: string;
  source?: string;
};

export const EVENTS: ResEvent[] = [
  { slug: "smart-water-smart-plastic", title: "Smart Water Zone & Smart Plastic Zone", date: "20 августа 2026 · 16:00", location: "Hampton by Hilton Astana, пр. Мангилик Ел, 43а", category: "Вода и циркулярная экономика", summary: "Итоговая церемония награждения участников проектов Coca-Cola в Казахстане, Green Urban и GPI-Lab.", details: ["Торжественное вручение знаков отличия участникам проектов", "Практики эффективного управления водными ресурсами от компаний-участников", "Обмен опытом с участниками и партнёрами проектов", "Подведение итогов Smart Water Zone и Smart Plastic Zone"], contact: "Подтвердить участие до 18 августа: info@gpi.kz · WhatsApp: +7 702 101 02 51. Для представителей других городов предусмотрено онлайн-участие." },
  { slug: "go-net-zero-energy-summit", title: "Go Net Zero Energy Summit — Central Asia & Caspian", date: "8 сентября 2026", location: "Астана, Казахстан", category: "Энергетический переход", summary: "Саммит для политиков, энергетических компаний, инвесторов и поставщиков технологий по переходу к низкоуглеродной энергетике.", details: ["Декарбонизация и энергоэффективность", "Водородные технологии", "Инвестиции в энергетический переход"], source: "https://invest.gov.kz/calendar/sammit-go-net-zero-energy-tsentralnaya-aziya-i-kaspiy/" },
  { slug: "un-sdg-forum", title: "Форум ООН по реализации Целей устойчивого развития", date: "16–17 сентября 2026", location: "UN Plaza, Алматы", category: "Устойчивое развитие", summary: "Десятый многосторонний форум Северной и Центральной Азии по реализации ЦУР.", details: ["Ответственное потребление и производство", "Сохранение экосистем суши", "Партнёрства для достижения ЦУР"], source: "https://www.unescap.org/events/2026/tenth-north-and-central-asia-multi-stakeholder-forum-implementation-sustainable" },
  { slug: "caspian-sea-conference", title: "Caspian Sea Conference", date: "Октябрь 2026 · дата уточняется организатором", location: "Nazarbayev University, Астана", category: "Климатическая адаптация", summary: "Конференция о состоянии Каспийского моря, загрязнении, климатических рисках и региональном сотрудничестве.", details: ["Адаптация к изменению климата", "Загрязнение и деградация экосистем", "Научно-политическое и отраслевое взаимодействие"], source: "https://smg.nu.edu.kz/caspian_sea_conference" },
];
