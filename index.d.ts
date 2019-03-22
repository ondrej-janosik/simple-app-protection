interface Options {
    saveToCookie: boolean;
    cookieName: string;
    cookieExpirationInDays: number;
    promptText: string;
    turnOffInDevelopment: boolean;
}
/**
 * Protect app by prompting for password
 * @param password
 * @param options - options. Default values: { saveToCookie: true, cookieName: 'simple-app-protection', cookieExpirationInDays: 7, promptText: 'Enter password', turnOffInDevelopment: true}
 */
export declare const protect: (password: string, options?: Partial<Options>) => void;
export {};
