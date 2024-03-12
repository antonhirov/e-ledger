export interface IAuthUser {
    readonly email: string;
    readonly localId: string;
    get idToken(): string | null;
    get expiresIn(): Date;

    copy(): IAuthUser;
}

export class AuthUser implements IAuthUser {
    public get idToken(): string | null {
        if (
            !this._idToken ||
            !this._expiresIn ||
            new Date() > this._expiresIn
        ) {
            return null;
        }
        return this._idToken;
    }

    public get expiresIn(): Date {
        return this._expiresIn;
    }

    constructor(
        public readonly email: string,
        public readonly localId: string,
        private readonly _idToken: string,
        private readonly _expiresIn: Date,
    ) {}

    public copy(): IAuthUser {
        return new AuthUser(
            this.email,
            this.localId,
            this._idToken,
            this._expiresIn,
        );
    }
}
