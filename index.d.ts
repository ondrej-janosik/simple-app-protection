interface Options {
    saveToCookie: boolean;
    cookieName: string;
    cookieExpirationInDays: number;
    promptText: string;
    turnOffInDevelopment: boolean;
}
export declare const protect: (password: string, options?: Options) => void;
export {};
