import { Injectable } from "@angular/core";
import { createSelector } from "@ngrx/store";

import { SourceView } from "../model/income.model";
import { CategoryView } from "../model/outcome.model";
import { WorkspaceService } from "../../workspace.service";
import * as _ from "lodash";

@Injectable()
export class EnumerationSelectors {
    constructor(private _workspaceService: WorkspaceService) {}

    public sources = createSelector(
        this._workspaceService.adjustmentSelector,
        state => state.enumeration.sources,
    );

    public categories = createSelector(
        this._workspaceService.adjustmentSelector,
        state => state.enumeration.categories,
    );

    public total = createSelector(
        this.sources,
        this.categories,
        (sources, categories) => ({ sources: sources, categories: categories }),
    );

    public viewSources = createSelector(
        this._workspaceService.adjustmentSelector,
        this._workspaceService.dataSelector,
        (state, dataState) => {
            return _.map(
                state.enumeration.sources,
                item =>
                    new SourceView(
                        item.id,
                        item.name,
                        _.some(
                            dataState.income.entities,
                            entity => entity?.sourceId === item.id,
                        ),
                    ),
            );
        },
    );

    public viewCategories = createSelector(
        this._workspaceService.adjustmentSelector,
        this._workspaceService.dataSelector,
        (state, dataState) => {
            return _.map(
                state.enumeration.categories,
                item =>
                    new CategoryView(
                        item.id,
                        item.name,
                        _.some(
                            dataState.outcome.entities,
                            entity => entity?.categoryId === item.id,
                        ),
                    ),
            );
        },
    );
}
