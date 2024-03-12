interface ISyncPeriodView {
    readonly id: number;
    readonly name: string;
}

export enum SyncPeriod {
    Never          = 0,
    OneMinute      = 1,
    FiveMinutes    = 5,
    TenMinutes     = 10,
    FifteenMinutes = 15,
}

export class SyncPeriodView implements ISyncPeriodView {
    constructor(public readonly id: number, public readonly name: string) {}
}
