import { InjectionToken, NgModule } from "@angular/core";
import { ActionReducerMap, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../../shared/shared.module";
import { WorkspaceSharedModule } from "../shared/workspace-shared.module";
import { WorkspaceListModule } from "../shared/list/workspace-list.module";

import { Feature } from "../../shared/store/app.model";
import { IncomeEffects } from "./store/income.effects";
import { OutcomeEffects } from "./store/outcome.effects";

import { SummaryComponent } from "./summary.component";
import { ContentComponent } from "./content/content.component";
import { PaginationComponent } from "./pagination/pagination.component";

import { SummaryService } from "./summary.service";
import { DataService } from "./store/data.service";
import { IncomeSelectors } from "./store/income.selectors";
import { OutcomeSelectors } from "./store/outcome.selectors";

import { ISummaryState } from "./model/state.model";
import { IncomeReducer } from "./store/income.reducer";
import { OutcomeReducer } from "./store/outcome.reducer";

const SUMMARY_REDUCER = new InjectionToken<ActionReducerMap<ISummaryState>>(
    "Summary reducer",
);

@NgModule({
    declarations: [SummaryComponent, ContentComponent, PaginationComponent],
    imports: [
        SharedModule,
        WorkspaceSharedModule,
        WorkspaceListModule,

        StoreModule.forFeature(Feature.Summary, SUMMARY_REDUCER),
        EffectsModule.forFeature([IncomeEffects, OutcomeEffects]),
    ],
    exports: [SummaryComponent],
    providers: [
        SummaryService,
        DataService,
        IncomeSelectors,
        OutcomeSelectors,
        IncomeReducer,
        OutcomeReducer,
        {
            provide: SUMMARY_REDUCER,
            deps: [IncomeReducer, OutcomeReducer],
            useFactory: (
                incomeReducer: IncomeReducer,
                outcomeReducer: OutcomeReducer,
            ): ActionReducerMap<ISummaryState> => ({
                income: incomeReducer.createReducer(),
                outcome: outcomeReducer.createReducer(),
            }),
        },
    ],
})
export class SummaryModule {}
