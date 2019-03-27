import { get, set } from 'js-cookie';

interface Options {
  saveToCookie: boolean;
  cookieName: string;
  cookieExpirationInDays: number;
  promptText: string;
  turnOffInDevelopment: boolean;
}

const defaultOptions: Options = {
  saveToCookie: true,
  cookieName: 'simple-app-protection',
  cookieExpirationInDays: 7,
  promptText: 'Enter password',
  turnOffInDevelopment: true,
};

const promptPass = (passwords: string[], text: string) => {
  let psw = prompt(text);

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
export const protect = (
  password: string | string[],
  options: Partial<Options> = defaultOptions,
  callback?: (password: string) => void,
) => {
  const currentOptions = { ...defaultOptions, ...options };
  if (options.turnOffInDevelopment && process.env.NODE_ENV === 'development') {
    return;
  }

  let typedPassword;
  let cookie = get(currentOptions.cookieName);
  if (!cookie) {
    const passwords = !Array.isArray(password) ? [password] : password;
    typedPassword = promptPass(passwords, currentOptions.promptText);

    if (callback) {
      callback(typedPassword);
    }
  } else {
    if (callback) {
      callback(cookie);
    }
    return;
  }

  if (currentOptions.saveToCookie) {
    set(currentOptions.cookieName, typedPassword, {
      expires: currentOptions.cookieExpirationInDays,
    });
  }
};
