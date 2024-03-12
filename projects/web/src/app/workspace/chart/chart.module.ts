import { InjectionToken, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActionReducerMap, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { NgChartsModule } from "ng2-charts";

import { Feature } from "../../shared/store/app.model";
import { IncomeEffects } from "./store/income.effects";
import { OutcomeEffects } from "./store/outcome.effects";
import { WorkspaceSharedModule } from "../shared/workspace-shared.module";

import { ChartComponent } from "./chart.component";
import { ContentComponent } from "./content/content.component";
import { ChartLineComponent } from "./type/chart-line.component";
import { ChartBarComponent } from "./type/chart-bar.component";
import { ChartPieComponent } from "./type/chart-pie.component";

import { ChartService } from "./chart.service";
import { DataService } from "./store/data.service";
import { IncomeService } from "./store/income.service";
import { OutcomeService } from "./store/outcome.service";
import { IncomeSelectors } from "./store/income.selectors";
import { OutcomeSelectors } from "./store/outcome.selectors";

import { IChartState } from "./model/state.model";
import { IncomeReducer } from "./store/income.reducer";
import { OutcomeReducer } from "./store/outcome.reducer";

const CHART_REDUCER = new InjectionToken<ActionReducerMap<IChartState>>(
    "Chart reducer",
);

@NgModule({
    declarations: [
        ChartComponent,
        ContentComponent,
        ChartLineComponent,
        ChartBarComponent,
        ChartPieComponent,
    ],
    imports: [
        CommonModule,
        NgChartsModule,
        WorkspaceSharedModule,
        StoreModule.forFeature(Feature.Chart, CHART_REDUCER),
        EffectsModule.forFeature([IncomeEffects, OutcomeEffects]),
    ],
    exports: [ChartComponent],
    providers: [
        ChartService,
        DataService,
        IncomeService,
        OutcomeService,
        IncomeSelectors,
        OutcomeSelectors,
        IncomeReducer,
        OutcomeReducer,
        {
            provide: CHART_REDUCER,
            deps: [IncomeReducer, OutcomeReducer],
            useFactory: (
                incomeReducer: IncomeReducer,
                outcomeReducer: OutcomeReducer,
            ): ActionReducerMap<IChartState> => ({
                income: incomeReducer.createReducer(),
                outcome: outcomeReducer.createReducer(),
            }),
        },
    ],
})
export class ChartModule {}
