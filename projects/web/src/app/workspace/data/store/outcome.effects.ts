import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";

import { map, switchMap } from "rxjs/operators";
import { IOutcomeData } from "../model/outcome.model";
import { OutcomeYearsService } from "./outcome-years.service";

import { OutcomeSelectors } from "./outcome.selectors";
import * as fromSummaryActions from "../../summary/store/outcome.actions";
import * as fromChartActions from "../../chart/store/outcome.actions";
import * as fromCommonActions from "./common.actions";
import * as fromActions from "./outcome.actions";

@Injectable()
export class OutcomeEffects {
    constructor(
        private _selectors: OutcomeSelectors,
        private _yearsService: OutcomeYearsService,
        private _actions$: Actions,
        private _store$: Store,
    ) {}

    addOutcome$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<{ payload: IOutcomeData } & TypedAction<string>>(
                fromActions.addOutcome,
            ),
            switchMap(action => [
                fromActions.processYears({ payload: [action.payload] }),
                fromSummaryActions.addOutcome(action),
                fromCommonActions.setUnsaved(),
            ]),
        );
    });

    addOutcomes$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<
                {
                    payload: IOutcomeData[];
                    isInit: boolean;
                } & TypedAction<string>
            >(fromActions.addOutcomes, fromActions.setOutcomes),
            switchMap(action => [
                fromActions.processYears({ payload: action.payload }),
                fromSummaryActions.processOutput(),
                fromCommonActions.setStatus({
                    payload: !action.isInit,
                }),
            ]),
        );
    });

    deleteOutcome$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<{ payload: string } & TypedAction<string>>(
                fromActions.deleteOutcome,
            ),
            switchMap(action => [
                fromActions.processYears({ payload: [] }),
                fromSummaryActions.deleteOutcome(action),
                fromSummaryActions.processPage(),
                fromCommonActions.setUnsaved(),
            ]),
        );
    });

    deleteOutcomes$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromActions.deleteOutcomes),
            map(() => fromCommonActions.setUnsaved()),
        );
    });

    processOutcomeYears$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<{ payload: IOutcomeData[] } & TypedAction<string>>(
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
