import { Injectable } from "@angular/core";
import { createSelector } from "@ngrx/store";

import { OutcomeService } from "./outcome.service";
import { WorkspaceService } from "../../workspace.service";
import { environment } from "projects/web/src/environments/environment";
import * as _ from "lodash";

@Injectable()
export class OutcomeSelectors {
    constructor(
        private _workspaceService: WorkspaceService,
        private _outcomeService: OutcomeService,
    ) {}

    public years = createSelector(
        this._workspaceService.dataSelector,
        state => state.outcome.years,
    );

    public items = createSelector(
        this._workspaceService.dataSelector,
        this._workspaceService.adjustmentSelector,
        (state, adjustmentState) =>
            this._outcomeService.getOutcomes(
                <string[]>state.outcome.ids,
                adjustmentState.enumeration.categories,
                state.outcome.entities,
            ),
    );

    public previewItems = createSelector(
        this._workspaceService.dataSelector,
        this._workspaceService.adjustmentSelector,
        (state, adjustmentState) =>
            this._outcomeService.getOutcomes(
                this.getPreviewIds(<string[]>state.outcome.ids),
                adjustmentState.enumeration.categories,
                state.outcome.entities,
            ),
    );

    private getPreviewIds(ids: string[]): string[] {
        return _.takeRight(ids, environment.pagePreviewItemsCount);
    }
}
