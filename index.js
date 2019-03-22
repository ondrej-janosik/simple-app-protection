"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var js_cookie_1 = require("js-cookie");
var defaultOptions = {
    cookieName: 'simple-app-protection',
    cookieExpirationInDays: 7,
    promptText: 'Enter password',
};
var promptPass = function (password, text) {
    var psw = prompt(text);
    while (psw !== password) {
        psw = prompt(text);
    }
};
exports.protect = function (password, saveToCookie, options) {
    if (saveToCookie === void 0) { saveToCookie = false; }
    if (options === void 0) { options = defaultOptions; }
    if (!js_cookie_1.get(options.cookieName)) {
        promptPass(password, options.promptText);
    }
    if (saveToCookie) {
        js_cookie_1.set(options.cookieName, 'authorized', {
            expires: options.cookieExpirationInDays,
        });
    }
};
