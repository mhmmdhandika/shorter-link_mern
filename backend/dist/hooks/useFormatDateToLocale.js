"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useFormatDateToLocale(date, locale) {
    return new Date(date).toLocaleDateString(locale, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}
exports.default = useFormatDateToLocale;
