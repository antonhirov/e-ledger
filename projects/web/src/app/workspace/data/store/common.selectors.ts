import { Injectable } from "@angular/core";
import { createSelector } from "@ngrx/store";
import { WorkspaceService } from "../../workspace.service";

@Injectable()
export class CommonSelectors {
    constructor(private _workspaceService: WorkspaceService) {}

    public isUnsaved = createSelector(
        this._workspaceService.dataSelector,
        state => state.common.isUnsaved,
    );

    public error = createSelector(
        this._workspaceService.dataSelector,
        state => state.common.error,
    );

    public entities = createSelector(
        this._workspaceService.dataSelector,
        state => ({
            incomes: state.income.entities,
            outcomes: state.outcome.entities,
        }),
    );
}
