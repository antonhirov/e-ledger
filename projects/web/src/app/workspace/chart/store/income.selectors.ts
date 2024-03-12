import { Injectable } from "@angular/core";
import { createSelector } from "@ngrx/store";
import { WorkspaceService } from "../../workspace.service";

@Injectable()
export class IncomeSelectors {
    constructor(private _workspaceService: WorkspaceService) {}

    public year = createSelector(
        this._workspaceService.chartSelector,
        state => state.income.year,
    );
    public points = createSelector(
        this._workspaceService.chartSelector,
        state => state.income.points,
    );
    public sections = createSelector(
        this._workspaceService.chartSelector,
        state => state.income.sections,
    );
}
