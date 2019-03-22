import { get, set } from 'js-cookie';

interface Options {
  cookieName: string;
  cookieExpirationInDays: number;
  promptText: string;
}

const defaultOptions: Options = {
  cookieName: 'simple-app-protection',
  cookieExpirationInDays: 7,
  promptText: 'Enter password',
};

const promptPass = (password: string, text: string) => {
  let psw = prompt(text);

  while (psw !== password) {
    psw = prompt(text);
  }
};

export const protect = (
  password: string,
  saveToCookie = false,
  options = defaultOptions,
) => {
  if (!get(options.cookieName)) {
    promptPass(password, options.promptText);
  }

  if (saveToCookie) {
    set(options.cookieName, 'authorized', {
      expires: options.cookieExpirationInDays,
    });
  }
};
