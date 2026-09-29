const months = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

export function formatEventDateRange(startDate: Date, endDate?: Date | null, includeYear: boolean = false): string {
  const startDay = startDate.getDate();
  const startMonth = months[startDate.getMonth()];
  const startYear = startDate.getFullYear();
  
  if (!endDate) {
    return `${startDay} ${startMonth}${includeYear ? ` ${startYear}` : ''}`;
  }

  const endDay = endDate.getDate();
  const endMonth = months[endDate.getMonth()];
  const endYear = endDate.getFullYear();

  // Если даты совпадают
  if (startDay === endDay && startMonth === endMonth && startYear === endYear) {
    return `${startDay} ${startMonth}${includeYear ? ` ${startYear}` : ''}`;
  }

  // Если месяц и год совпадают: "12-14 октября"
  if (startMonth === endMonth && startYear === endYear) {
    return `${startDay}-${endDay} ${startMonth}${includeYear ? ` ${startYear}` : ''}`;
  }

  // Если годы разные (или месяцы разные)
  if (startYear !== endYear && includeYear) {
    return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
  }

  return `${startDay} ${startMonth} - ${endDay} ${endMonth}${includeYear ? ` ${endYear}` : ''}`;
}
