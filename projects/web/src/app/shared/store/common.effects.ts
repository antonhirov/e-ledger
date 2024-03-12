import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap } from "rxjs/operators";

import { clear as clearDataCommon } from "../../workspace/data/store/common.actions";
import { clear as clearDataIncome } from "../../workspace/data/store/income.actions";
import { clear as clearDataOutcome } from "../../workspace/data/store/outcome.actions";
import { clear as clearChartIncome } from "../../workspace/chart/store/income.actions";
import { clear as clearChartOutcome } from "../../workspace/chart/store/outcome.actions";
import { clear as clearSummaryIncome } from "../../workspace/summary/store/income.actions";
import { clear as clearSummaryOutcome } from "../../workspace/summary/store/outcome.actions";
import { clear as clearAdjustmentSetting } from "../../workspace/adjustment/store/setting.actions";
import { clear as clearAdjustmentEnum } from "../../workspace/adjustment/store/enumeration.actions";

import { clear as clearAuth } from "../../auth/store/auth.actions";
import * as fromActions from "./common.actions";

@Injectable()
export class CommonEffects {
    constructor(private _actions$: Actions) {}

    reset$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromActions.clear),
            switchMap(() => [
                clearDataCommon(),
                clearDataIncome(),
                clearDataOutcome(),
                clearChartIncome(),
                clearChartOutcome(),
                clearSummaryIncome(),
                clearSummaryOutcome(),
                clearAdjustmentSetting(),
                clearAdjustmentEnum(),
                clearAuth(),
            ]),
        );
    });
}
