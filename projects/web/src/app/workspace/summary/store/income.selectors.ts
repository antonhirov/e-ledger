import { Injectable } from "@angular/core";
import { createSelector } from "@ngrx/store";

import { DataService } from "./data.service";
import { WorkspaceService } from "../../workspace.service";
import { IncomeService } from "../../data/store/income.service";
import { environment } from "projects/web/src/environments/environment";
import * as _ from "lodash";

@Injectable()
export class IncomeSelectors {
    constructor(
        private _dataService: DataService,
        private _incomeService: IncomeService,
        private _workspaceService: WorkspaceService,
    ) {}

    public filter = createSelector(
        this._workspaceService.summarySelector,
        state => state.income.filter,
    );
    public itemsCount = createSelector(
        this._workspaceService.summarySelector,
        state => state.income.ids.length,
    );
    public page = createSelector(
        this._workspaceService.summarySelector,
        state => state.income.page,
    );
    public pagesCount = createSelector(
        this._workspaceService.summarySelector,
        state => _.ceil(state.income.ids.length / environment.pageItemsCount),
    );
    public pageItems = createSelector(
        this._workspaceService.summarySelector,
        this._workspaceService.dataSelector,
        this._workspaceService.adjustmentSelector,
        (state, dataState, adjustmentState) =>
            this._incomeService.getIncomes(
                this._dataService.getPageIds(
                    state.income.page,
                    state.income.ids,
                ),
                adjustmentState.enumeration.sources,
                dataState.income.entities,
            ),
    );
}
