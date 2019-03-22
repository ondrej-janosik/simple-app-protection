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

const promptPass = (password: string, text: string) => {
  let psw = prompt(text);

  while (psw !== password) {
    psw = prompt(text);
  }
};

/**
 * Protect app by prompting for password
 * @param password
 * @param options - options. Default values: { saveToCookie: true, cookieName: 'simple-app-protection', cookieExpirationInDays: 7, promptText: 'Enter password', turnOffInDevelopment: true}
 */
export const protect = (
  password: string,
  options: Partial<Options> = defaultOptions,
) => {
  const currentOptions = { ...defaultOptions, ...options };
  if (options.turnOffInDevelopment && process.env.NODE_ENV === 'development') {
    return;
  }
  if (!get(currentOptions.cookieName)) {
    promptPass(password, currentOptions.promptText);
  }

  if (options.saveToCookie) {
    set(currentOptions.cookieName, 'authorized', {
      expires: currentOptions.cookieExpirationInDays,
    });
  }
};
