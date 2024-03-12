import { InjectionToken, NgModule } from "@angular/core";
import { ActionReducerMap, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../../shared/shared.module";
import { Feature } from "../../shared/store/app.model";
import { CommonEffects } from "./store/common.effects";
import { IncomeEffects } from "./store/income.effects";
import { OutcomeEffects } from "./store/outcome.effects";

import { CommonService } from "./store/common.service";
import { IncomeService } from "./store/income.service";
import { IncomeYearsService } from "./store/income-years.service";
import { OutcomeService } from "./store/outcome.service";
import { OutcomeYearsService } from "./store/outcome-years.service";
import { DataTimerService } from "./data-timer.service";
import { CommonSelectors } from "./store/common.selectors";
import { IncomeSelectors } from "./store/income.selectors";
import { OutcomeSelectors } from "./store/outcome.selectors";

import { IDataState } from "./model/state.model";
import { CommonReducer } from "./store/common.reducer";
import { IncomeReducer } from "./store/income.reducer";
import { OutcomeReducer } from "./store/outcome.reducer";

const DATA_REDUCER = new InjectionToken<ActionReducerMap<IDataState>>(
    "Data reducer",
);

@NgModule({
    imports: [
        SharedModule,
        StoreModule.forFeature(Feature.Data, DATA_REDUCER),
        EffectsModule.forFeature([
            CommonEffects,
            IncomeEffects,
            OutcomeEffects,
        ]),
    ],
    providers: [
        CommonService,
        IncomeService,
        IncomeYearsService,
        OutcomeService,
        OutcomeYearsService,
        DataTimerService,
        CommonSelectors,
        IncomeSelectors,
        OutcomeSelectors,
        CommonReducer,
        IncomeReducer,
        OutcomeReducer,
        {
            provide: DATA_REDUCER,
            deps: [CommonReducer, IncomeReducer, OutcomeReducer],
            useFactory: (
                commonReducer: CommonReducer,
                incomeReducer: IncomeReducer,
                outcomeReducer: OutcomeReducer,
            ): ActionReducerMap<IDataState> => ({
                common: commonReducer.createReducer(),
                income: incomeReducer.createReducer(),
                outcome: outcomeReducer.createReducer(),
            }),
        },
    ],
})
export class DataModule {}
