export interface IAuthRequest {
    readonly email: string;
    readonly password: string;
    readonly returnSecureToken: boolean;

    copy(): IAuthRequest;
}

export class AuthRequest implements IAuthRequest {
    constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly returnSecureToken: boolean = true,
    ) {}

    public copy(): IAuthRequest {
        return new AuthRequest(
            this.email,
            this.password,
            this.returnSecureToken,
        );
    }
}
