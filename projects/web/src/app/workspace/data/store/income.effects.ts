import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";

import { map, switchMap } from "rxjs/operators";
import { IIncomeData } from "../model/income.model";
import { IncomeYearsService } from "./income-years.service";

import { IncomeSelectors } from "./income.selectors";
import * as fromSummaryActions from "../../summary/store/income.actions";
import * as fromChartActions from "../../chart/store/income.actions";
import * as fromCommonActions from "./common.actions";
import * as fromActions from "./income.actions";

@Injectable()
export class IncomeEffects {
    constructor(
        private _selectors: IncomeSelectors,
        private _yearsService: IncomeYearsService,
        private _actions$: Actions,
        private _store$: Store,
    ) {}

    addIncome$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<{ payload: IIncomeData } & TypedAction<string>>(
                fromActions.addIncome,
            ),
            switchMap(action => [
                fromActions.processYears({ payload: [action.payload] }),
                fromSummaryActions.addIncome(action),
                fromCommonActions.setUnsaved(),
            ]),
        );
    });

    addIncomes$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<
                {
                    payload: IIncomeData[];
                    isInit: boolean;
                } & TypedAction<string>
            >(fromActions.addIncomes, fromActions.setIncomes),
            switchMap(action => [
                fromActions.processYears({ payload: action.payload }),
                fromSummaryActions.processOutput(),
                fromCommonActions.setStatus({
                    payload: !action.isInit,
                }),
            ]),
        );
    });

    deleteIncome$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<{ payload: string } & TypedAction<string>>(
                fromActions.deleteIncome,
            ),
            switchMap(action => [
                fromActions.processYears({ payload: [] }),
                fromSummaryActions.deleteIncome(action),
                fromSummaryActions.processPage(),
                fromCommonActions.setUnsaved(),
            ]),
        );
    });

    deleteIncomes$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromActions.deleteIncomes),
            map(() => fromCommonActions.setUnsaved()),
        );
    });

    processIncomeYears$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<{ payload: IIncomeData[] } & TypedAction<string>>(
                fromActions.processYears,
            ),
            concatLatestFrom(() => [
                this._store$.select(this._selectors.items),
                this._store$.select(this._selectors.years),
            ]),
            switchMap(([action, allItems, allYears]) => [
                fromActions.setYears({
                    payload: this._yearsService.getYears(
                        action.payload,
                        allItems,
                        allYears,
                    ),
                }),
                fromChartActions.processYear(),
            ]),
        );
    });
}
