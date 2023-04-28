export const formatDate = (
  date: Date,
  locale = 'es',
  dateTimeOptions: Intl.DateTimeFormatOptions,
) => {
  const formatedDate = new Intl.DateTimeFormat(locale, dateTimeOptions).format(date);
  return formatedDate;
};
