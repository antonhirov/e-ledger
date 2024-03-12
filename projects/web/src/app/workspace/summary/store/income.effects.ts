import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";

import { DataService } from "./data.service";
import { IncomeSelectors } from "./income.selectors";
import { IncomeSelectors as IncomeDataSelectors } from "../../data/store/income.selectors";
import { undefinedAction } from "../../../shared/store/undefined.action";
import * as fromActions from "./income.actions";

@Injectable()
export class IncomeEffects {
    constructor(
        private _selectors: IncomeSelectors,
        private _dataSelectors: IncomeDataSelectors,
        private _dataService: DataService,
        private _actions$: Actions,
        private _store$: Store,
    ) {}

    setIncomeFilter$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromActions.setFilter),
            map(() => fromActions.processOutput()),
        );
    });

    processOutput$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromActions.processOutput),
            concatLatestFrom(() => [
                this._store$.select(this._selectors.filter),
                this._store$.select(this._dataSelectors.items),
            ]),
            map(([, filter, items]) => this._dataService.getIds(filter, items)),
            switchMap(ids => [
                fromActions.setOutput({ payload: ids }),
                fromActions.processPage(),
            ]),
        );
    });

    processPage$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromActions.processPage),
            concatLatestFrom(() => [
                this._store$.select(this._selectors.page),
                this._store$.select(this._selectors.pagesCount),
            ]),
            map(([, activePage, pagesCount]) => {
                const page = this._dataService.checkActivePage(
                    activePage,
                    pagesCount,
                );
                return page
                    ? fromActions.selectPage({ payload: page.payload })
                    : undefinedAction();
            }),
        );
    });

    selectPage$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<{ payload: number } & TypedAction<string>>(
                fromActions.selectPage,
            ),
            concatLatestFrom(() =>
                this._store$.select(this._selectors.itemsCount),
            ),
            map(([action, outputItemsCount]) => {
                const page = this._dataService.selectActivePage(
                    action.payload,
                    outputItemsCount,
                );
                return page
                    ? fromActions.setPage({ payload: page.payload })
                    : undefinedAction();
            }),
        );
    });
}
