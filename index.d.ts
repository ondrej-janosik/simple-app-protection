interface Options {
    saveToCookie: boolean;
    cookieName: string;
    cookieExpirationInDays: number;
    promptText: string;
    turnOffInDevelopment: boolean;
}
/**
 * Protect app by prompting for password
 * @param password - one or more valid passwords
 * @param options - options. Default values: { saveToCookie: true, cookieName: 'simple-app-protection', cookieExpirationInDays: 7, promptText: 'Enter password', turnOffInDevelopment: true}
 * @param callback - function. It will be fired after successful validation (after typing valid password or after cookies retrieval). Typed password will be passed to callback
 */
export declare const protect: (password: string | string[], options?: Partial<Options>, callback?: ((password: string) => void) | undefined) => void;
export {};
