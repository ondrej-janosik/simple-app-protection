"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var js_cookie_1 = require("js-cookie");
var defaultOptions = {
    saveToCookie: true,
    cookieName: 'simple-app-protection',
    cookieExpirationInDays: 7,
    promptText: 'Enter password',
    turnOffInDevelopment: true,
};
var promptPass = function (password, text) {
    var psw = prompt(text);
    while (psw !== password) {
        psw = prompt(text);
    }
};
exports.protect = function (password, options) {
    if (options === void 0) { options = defaultOptions; }
    if (options.turnOffInDevelopment && process.env.NODE_ENV === 'development') {
        return;
    }
    if (!js_cookie_1.get(options.cookieName)) {
        promptPass(password, options.promptText);
    }
    if (options.saveToCookie) {
        js_cookie_1.set(options.cookieName, 'authorized', {
            expires: options.cookieExpirationInDays,
        });
    }
};
