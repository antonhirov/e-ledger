import { IAuthUser } from "./user.model";

export interface IAuthState {
    readonly user: IAuthUser | null;
    readonly error: string | null;
}
