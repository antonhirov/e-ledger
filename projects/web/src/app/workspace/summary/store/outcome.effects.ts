import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";

import { DataService } from "./data.service";
import { OutcomeSelectors } from "./outcome.selectors";
import { OutcomeSelectors as OutcomeDataSelectors } from "../../data/store/outcome.selectors";
import { undefinedAction } from "../../../shared/store/undefined.action";
import * as fromActions from "./outcome.actions";

@Injectable()
export class OutcomeEffects {
    constructor(
        private _selectors: OutcomeSelectors,
        private _dataSelectors: OutcomeDataSelectors,
        private _dataService: DataService,
        private _actions$: Actions,
        private _store$: Store,
    ) {}

    setOutcomeFilter$ = createEffect(() => {
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
