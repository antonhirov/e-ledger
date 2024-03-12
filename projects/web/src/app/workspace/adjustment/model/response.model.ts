import { SyncPeriod } from "./sync-period.model";

export interface ISettingResponse {
    readonly localId: string;
    readonly email: string;
    readonly passwordHash: string;
    readonly providerUserInfo: object;
    readonly idToken: string;
    readonly expiresIn: string;
    readonly refreshToken: string;
}

export interface IWorkflowResponse {
    readonly syncPeriod: SyncPeriod;
}
