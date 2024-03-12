import { Injectable } from "@angular/core";

import { ISetting } from "../model/setting.model";
import { DialogMode } from "../model/dialog-mode.model";
import { SyncPeriod, SyncPeriodView } from "../model/sync-period.model";
import { SettingDialogService } from "./setting-dialog.service";

@Injectable()
export class SettingService {
    constructor(private _dialogService: SettingDialogService) {}

    public showDialog(
        status: { mode: DialogMode; error: string | null },
        setting: ISetting,
    ): void {
        switch (status.mode) {
            case DialogMode.Saved:
                this._dialogService.showSavedDialog();
                break;
            case DialogMode.ReAuth:
                this._dialogService.showReAuthDialog(setting);
                break;
            case DialogMode.Error:
                this._dialogService.showErrorDialog(status.error || "");
                break;
        }
    }

    public getPeriods(): SyncPeriodView[] {
        return [
            new SyncPeriodView(SyncPeriod.Never,          "never"),
            new SyncPeriodView(SyncPeriod.OneMinute,      "1 minute"),
            new SyncPeriodView(SyncPeriod.FiveMinutes,    "5 minutes"),
            new SyncPeriodView(SyncPeriod.TenMinutes,     "10 minutes"),
            new SyncPeriodView(SyncPeriod.FifteenMinutes, "15 minutes"),
        ];
    }
}
