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
var promptPass = function (passwords, text) {
    var psw = prompt(text);
    while (!psw || !passwords.includes(psw)) {
        psw = prompt(text);
    }
    return psw;
};
/**
 * Protect app by prompting for password
 * @param password - one or more valid passwords
 * @param options - options. Default values: { saveToCookie: true, cookieName: 'simple-app-protection', cookieExpirationInDays: 7, promptText: 'Enter password', turnOffInDevelopment: true}
 * @param callback - function. It will be fired after successful validation (after typing valid password or after cookies retrieval). Typed password will be passed to callback
 */
exports.protect = function (password, options, callback) {
    if (options === void 0) { options = defaultOptions; }
    var currentOptions = __assign({}, defaultOptions, options);
    if (options.turnOffInDevelopment && process.env.NODE_ENV === 'development') {
        return;
    }
    var typedPassword;
    var cookie = js_cookie_1.get(currentOptions.cookieName);
    if (!cookie) {
        var passwords = !Array.isArray(password) ? [password] : password;
        typedPassword = promptPass(passwords, currentOptions.promptText);
        if (callback) {
            callback(typedPassword);
        }
    }
    else {
        if (callback) {
            callback(cookie);
        }
        return;
    }
    if (currentOptions.saveToCookie) {
        js_cookie_1.set(currentOptions.cookieName, typedPassword, {
            expires: currentOptions.cookieExpirationInDays,
        });
    }
};
