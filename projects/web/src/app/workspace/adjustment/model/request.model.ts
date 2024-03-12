import { SyncPeriod } from "./sync-period.model";

interface IUserRequest {
    readonly idToken: string;
    readonly email?: string;
    readonly password?: string;
    readonly returnSecureToken: boolean;
}

interface IWorkflowRequest {
    readonly syncPeriod: SyncPeriod;
}

export class UserRequest implements IUserRequest {
    constructor(
        public readonly idToken: string,
        public readonly email?: string,
        public readonly password?: string,
        public readonly returnSecureToken: boolean = true,
    ) {}
}

export class WorkflowRequest implements IWorkflowRequest {
    constructor(public readonly syncPeriod: SyncPeriod) {}
}
