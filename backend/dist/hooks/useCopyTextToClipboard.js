"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
        return navigator.clipboard.writeText(text);
    }
    return document.execCommand('copy', true, text);
}
exports.default = copyTextToClipboard;
