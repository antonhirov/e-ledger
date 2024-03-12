import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";

import { OutcomeService } from "./outcome.service";
import { OutcomeSelectors } from "./outcome.selectors";
import { OutcomeSelectors as OutcomeDataSelectors } from "../../data/store/outcome.selectors";
import { undefinedAction } from "../../../shared/store/undefined.action";
import * as fromActions from "./outcome.actions";
import * as _ from "lodash";

@Injectable()
export class OutcomeEffects {
    constructor(
        private _selectors: OutcomeSelectors,
        private _dataSelectors: OutcomeDataSelectors,
        private _outcomeService: OutcomeService,
        private _actions$: Actions,
        private _store$: Store,
    ) {}

    setOutcomeYear$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromActions.setYear),
            switchMap(() => [
                fromActions.processPoints(),
                fromActions.processSections(),
            ]),
        );
    });

    processOutcomeYear$ = createEffect(() => {
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

    setOutcomePoints$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromActions.processPoints),
            concatLatestFrom(() => [
                this._store$.select(this._selectors.year),
                this._store$.select(this._dataSelectors.items),
            ]),
            map(
                ([, year, items]): Action =>
                    fromActions.setPoints({
                        payload: this._outcomeService.getPoints(year, items),
                    }),
            ),
        );
    });

    setOutcomeSections$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromActions.processSections),
            concatLatestFrom(() => [
                this._store$.select(this._selectors.year),
                this._store$.select(this._dataSelectors.items),
            ]),
            map(
                ([, year, items]): Action =>
                    fromActions.setSections({
                        payload: this._outcomeService.getSections(year, items),
                    }),
            ),
        );
    });
}
