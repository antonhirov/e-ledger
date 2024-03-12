import { Injectable } from "@angular/core";
import { createSelector } from "@ngrx/store";
import { WorkspaceService } from "../../workspace.service";

@Injectable()
export class OutcomeSelectors {
    constructor(private _workspaceService: WorkspaceService) {}

    public year = createSelector(
        this._workspaceService.chartSelector,
        state => state.outcome.year,
    );
    public points = createSelector(
        this._workspaceService.chartSelector,
        state => state.outcome.points,
    );
    public sections = createSelector(
        this._workspaceService.chartSelector,
        state => state.outcome.sections,
    );
}
