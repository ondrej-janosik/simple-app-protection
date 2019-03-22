interface Options {
    cookieName: string;
    cookieExpirationInDays: number;
    promptText: string;
}
export declare const protect: (password: string, saveToCookie?: boolean, options?: Options) => void;
export {};
