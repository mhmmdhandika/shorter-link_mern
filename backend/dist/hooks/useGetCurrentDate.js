"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useGetCurrentDate() {
    const day = new Date().getDate(), month = new Date().getMonth() + 1, year = new Date().getFullYear();
    const currentDate = `${year}-${month < 10 ? `0${month}` : month}-${day}`;
    return currentDate;
}
exports.default = useGetCurrentDate;
