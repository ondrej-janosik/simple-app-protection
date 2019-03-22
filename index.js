"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
/**
 * Protect app by prompting for password
 * @param password
 * @param options - options. Default values: { saveToCookie: true, cookieName: 'simple-app-protection', cookieExpirationInDays: 7, promptText: 'Enter password', turnOffInDevelopment: true}
 */
exports.protect = function (password, options) {
    if (options === void 0) { options = defaultOptions; }
    var currentOptions = __assign({}, defaultOptions, options);
    if (options.turnOffInDevelopment && process.env.NODE_ENV === 'development') {
        return;
    }
    if (!js_cookie_1.get(currentOptions.cookieName)) {
        promptPass(password, currentOptions.promptText);
    }
    if (currentOptions.saveToCookie) {
        js_cookie_1.set(currentOptions.cookieName, 'authorized', {
            expires: currentOptions.cookieExpirationInDays,
        });
    }
};
