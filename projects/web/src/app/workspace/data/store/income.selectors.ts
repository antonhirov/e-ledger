import { Injectable } from "@angular/core";
import { createSelector } from "@ngrx/store";

import { IncomeService } from "./income.service";
import { WorkspaceService } from "../../workspace.service";
import { environment } from "projects/web/src/environments/environment";
import * as _ from "lodash";

@Injectable()
export class IncomeSelectors {
    constructor(
        private _workspaceService: WorkspaceService,
        private _incomeService: IncomeService,
    ) {}

    public years = createSelector(
        this._workspaceService.dataSelector,
        state => state.income.years,
    );

    public items = createSelector(
        this._workspaceService.dataSelector,
        this._workspaceService.adjustmentSelector,
        (state, adjustmentState) =>
            this._incomeService.getIncomes(
                <string[]>state.income.ids,
                adjustmentState.enumeration.sources,
                state.income.entities,
            ),
    );

    public previewItems = createSelector(
        this._workspaceService.dataSelector,
        this._workspaceService.adjustmentSelector,
        (state, adjustmentState) =>
            this._incomeService.getIncomes(
                this.getPreviewIds(<string[]>state.income.ids),
                adjustmentState.enumeration.sources,
                state.income.entities,
            ),
    );

    private getPreviewIds(ids: string[]): string[] {
        return _.takeRight(ids, environment.pagePreviewItemsCount);
    }
}
