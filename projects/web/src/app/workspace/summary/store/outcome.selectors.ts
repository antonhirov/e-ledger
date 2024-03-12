import { Injectable } from "@angular/core";
import { createSelector } from "@ngrx/store";

import { DataService } from "./data.service";
import { WorkspaceService } from "../../workspace.service";
import { OutcomeService } from "../../data/store/outcome.service";
import { environment } from "projects/web/src/environments/environment";
import * as _ from "lodash";

@Injectable()
export class OutcomeSelectors {
    constructor(
        private _dataService: DataService,
        private _outcomeService: OutcomeService,
        private _workspaceService: WorkspaceService,
    ) {}

    public filter = createSelector(
        this._workspaceService.summarySelector,
        state => state.outcome.filter,
    );
    public itemsCount = createSelector(
        this._workspaceService.summarySelector,
        state => state.outcome.ids.length,
    );
    public page = createSelector(
        this._workspaceService.summarySelector,
        state => state.outcome.page,
    );
    public pagesCount = createSelector(
        this._workspaceService.summarySelector,
        state => _.ceil(state.outcome.ids.length / environment.pageItemsCount),
    );
    public pageItems = createSelector(
        this._workspaceService.summarySelector,
        this._workspaceService.dataSelector,
        this._workspaceService.adjustmentSelector,
        (state, dataState, adjustmentState) =>
            this._outcomeService.getOutcomes(
                this._dataService.getPageIds(
                    state.outcome.page,
                    state.outcome.ids,
                ),
                adjustmentState.enumeration.categories,
                dataState.outcome.entities,
            ),
    );
}
