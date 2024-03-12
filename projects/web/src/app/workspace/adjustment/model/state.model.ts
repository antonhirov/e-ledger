import { DialogMode } from "./dialog-mode.model";
import { SyncPeriod } from "./sync-period.model";
import { ISource } from "./income.model";
import { ICategory } from "./outcome.model";

export interface ISettingState {
    readonly mode: DialogMode;
    readonly syncPeriod: SyncPeriod;
    readonly error: string | null;
}

export interface IEnumerationState {
    readonly sources: ISource[];
    readonly categories: ICategory[];
}

export interface IAdjustmentState {
    readonly setting: ISettingState;
    readonly enumeration: IEnumerationState;
}
