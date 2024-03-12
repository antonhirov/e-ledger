export interface IAuthResponse {
    readonly localId: string;
    readonly idToken: string;
    readonly email: string;
    readonly expiresIn: string;
    readonly refreshToken: string;
    readonly registered?: boolean;
}
