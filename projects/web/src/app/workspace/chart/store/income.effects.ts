import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";

import { IncomeService } from "./income.service";
import { IncomeSelectors } from "./income.selectors";
import { IncomeSelectors as IncomeDataSelectors } from "../../data/store/income.selectors";
import { undefinedAction } from "../../../shared/store/undefined.action";
import * as fromActions from "./income.actions";
import * as _ from "lodash";

@Injectable()
export class IncomeEffects {
    constructor(
        private _selectors: IncomeSelectors,
        private _dataSelectors: IncomeDataSelectors,
        private _incomeService: IncomeService,
        private _actions$: Actions,
        private _store$: Store,
    ) {}

    setIncomeYear$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromActions.setYear),
            switchMap(() => [
                fromActions.processPoints(),
                fromActions.processSections(),
            ]),
        );
    });

    processIncomeYear$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromActions.processYear),
            concatLatestFrom(() => [
                this._store$.select(this._selectors.year),
                this._store$.select(this._dataSelectors.years),
            ]),
            map(([, year, years]) => {
                if (year) {
                    return fromActions.setYear({
                        payload: _.some(years, item => item === year)
                            ? year
                            : null,
                    });
                }
                return undefinedAction();
            }),
        );
    });

    processIncomePoints$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromActions.processPoints),
            concatLatestFrom(() => [
                this._store$.select(this._selectors.year),
                this._store$.select(this._dataSelectors.items),
            ]),
            map(([, year, items]) =>
                fromActions.setPoints({
                    payload: this._incomeService.getPoints(year, items),
                }),
            ),
        );
    });

    processIncomeSections$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromActions.processSections),
            concatLatestFrom(() => [
                this._store$.select(this._selectors.year),
                this._store$.select(this._dataSelectors.items),
            ]),
            map(([, year, items]) =>
                fromActions.setSections({
                    payload: this._incomeService.getSections(year, items),
                }),
            ),
        );
    });
}
