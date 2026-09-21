const months = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

export function formatEventDateRange(startDate: Date, endDate?: Date | null): string {
  const startDay = startDate.getDate();
  const startMonth = months[startDate.getMonth()];
  
  if (!endDate) {
    return `${startDay} ${startMonth}`;
  }

  const endDay = endDate.getDate();
  const endMonth = months[endDate.getMonth()];

  // Если даты совпадают
  if (startDay === endDay && startMonth === endMonth) {
    return `${startDay} ${startMonth}`;
  }

  // Если месяц совпадает: "12-14 октября"
  if (startMonth === endMonth) {
    return `${startDay}-${endDay} ${startMonth}`;
  }

  // Если месяцы разные: "30 сентября - 2 октября"
  return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
}
