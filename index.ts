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

export const protect = (password: string, options = defaultOptions) => {
  if (options.turnOffInDevelopment && process.env.NODE_ENV === 'development') {
    return;
  }
  if (!get(options.cookieName)) {
    promptPass(password, options.promptText);
  }

  if (options.saveToCookie) {
    set(options.cookieName, 'authorized', {
      expires: options.cookieExpirationInDays,
    });
  }
};
