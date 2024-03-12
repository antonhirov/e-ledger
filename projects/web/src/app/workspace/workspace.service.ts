import { Injectable } from "@angular/core";
import { createFeatureSelector } from "@ngrx/store";

import { Feature } from "../shared/store/app.model";
import { IDataState } from "./data/model/state.model";
import { ISummaryState } from "./summary/model/state.model";
import { IChartState } from "./chart/model/state.model";
import { IAdjustmentState } from "./adjustment/model/state.model";

@Injectable()
export class WorkspaceService {
    public dataSelector = createFeatureSelector<IDataState>(Feature.Data);
    public summarySelector = createFeatureSelector<ISummaryState>(
        Feature.Summary,
    );
    public chartSelector = createFeatureSelector<IChartState>(Feature.Chart);
    public adjustmentSelector = createFeatureSelector<IAdjustmentState>(
        Feature.Adjustment,
    );
}
