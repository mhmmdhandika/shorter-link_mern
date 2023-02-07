function useFormatDateToLocale(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
export default useFormatDateToLocale;
