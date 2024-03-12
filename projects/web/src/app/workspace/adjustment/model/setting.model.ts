import { SyncPeriod } from "./sync-period.model";

export interface ISetting {
    readonly email: string | null;
    readonly password: string | null;
    readonly syncPeriod: SyncPeriod;

    copy(): ISetting;
}

export class Setting implements ISetting {
    constructor(
        public readonly email: string | null,
        public readonly password: string | null,
        public readonly syncPeriod: SyncPeriod,
    ) {}

    public copy(): ISetting {
        return new Setting(this.email, this.password, this.syncPeriod);
    }
}
