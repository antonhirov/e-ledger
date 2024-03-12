import { Injectable } from "@angular/core";
import { createSelector } from "@ngrx/store";
import { WorkspaceService } from "../../workspace.service";

@Injectable()
export class SettingSelectors {
    constructor(private _workspaceService: WorkspaceService) {}

    public status = createSelector(
        this._workspaceService.adjustmentSelector,
        state => ({
            mode: state.setting.mode,
            error: state.setting.error,
        }),
    );

    public syncPeriod = createSelector(
        this._workspaceService.adjustmentSelector,
        state => state.setting.syncPeriod,
    );
}
