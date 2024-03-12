import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { TypedAction } from "@ngrx/store/src/models";
import { Store } from "@ngrx/store";
import { ObservableInput, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { IIncomeData } from "../model/income.model";
import { IOutcomeData } from "../model/outcome.model";
import { DataRequest } from "../model/request.model";
import { IDataResponse } from "../model/response.model";
import { SyncPeriod } from "../../adjustment/model/sync-period.model";
import { DataTimerService } from "../data-timer.service";
import { CommonService } from "./common.service";
import { HttpService } from "../../../shared/http.service";

import { CommonSelectors } from "./common.selectors";
import { AuthSelectors } from "../../../auth/store/auth.selectors";
import { EnumerationSelectors } from "../../adjustment/store/enumeration.selectors";
import { environment } from "projects/web/src/environments/environment";
import { undefinedAction } from "../../../shared/store/undefined.action";
import * as fromEnumerationActions from "../../adjustment/store/enumeration.actions";
import * as fromSettingActions from "../../adjustment/store/setting.actions";
import * as fromCommonActions from "./common.actions";
import * as fromIncomeActions from "./income.actions";
import * as fromOutcomeActions from "./outcome.actions";

@Injectable()
export class CommonEffects {
    constructor(
        private _selectors: CommonSelectors,
        private _authSelectors: AuthSelectors,
        private _enumerationSelectors: EnumerationSelectors,
        private _timerService: DataTimerService,
        private _commonService: CommonService,
        private _httpService: HttpService,
        private _http: HttpClient,
        private _actions$: Actions,
        private _store$: Store,
    ) {}

    saveData$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromCommonActions.saveData),
            concatLatestFrom(() => [
                this._store$.select(this._authSelectors.user),
                this._store$.select(this._selectors.entities),
                this._store$.select(this._enumerationSelectors.total),
            ]),
            switchMap(([, user, entities, enumerations]) => {
                if (user && user.idToken) {
                    return this._http
                        .put(
                            environment.getWebApiDataStorageUrl(user.localId),
                            new DataRequest(entities, enumerations),
                            this._httpService.getHttpParams(user.idToken),
                        )
                        .pipe(
                            map(() => fromCommonActions.setSaved()),
                            catchError(() => this.processError()),
                        );
                }
                return of(undefinedAction());
            }),
        );
    });

    loadWorkflowData$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromCommonActions.loadData),
            map(() => fromSettingActions.loadWorkflow()),
        );
    });

    loadData$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromCommonActions.loadData),
            concatLatestFrom(() => [
                this._store$.select(this._authSelectors.user),
            ]),
            switchMap(([, user]) => {
                if (user && user.idToken) {
                    return this._http
                        .get<IDataResponse>(
                            environment.getWebApiDataStorageUrl(user.localId),
                            this._httpService.getHttpParams(user.idToken),
                        )
                        .pipe(
                            switchMap(data => [
                                fromEnumerationActions.setEnums({
                                    payload:
                                        this._commonService.parseEnumerations(
                                            data.enumerations,
                                        ),
                                }),
                                fromCommonActions.setEntities({
                                    payload: this._commonService.parseEntities(
                                        data.entities,
                                    ),
                                }),
                            ]),
                            catchError(() => this.processError()),
                        );
                }
                return of(undefinedAction());
            }),
        );
    });

    syncData$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromCommonActions.syncData),
            concatLatestFrom(() => [
                this._store$.select(this._selectors.isUnsaved),
            ]),
            map(([, isUnsaved]) =>
                isUnsaved
                    ? fromCommonActions.saveData()
                    : fromCommonActions.loadData(),
            ),
        );
    });

    setSync$ = createEffect(
        () => {
            return this._actions$.pipe(
                ofType<{ payload: SyncPeriod } & TypedAction<string>>(
                    fromCommonActions.setSync,
                ),
                tap(action => this._timerService.setTimer(action.payload)),
            );
        },
        { dispatch: false },
    );

    setEntities$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<
                {
                    payload: {
                        incomes: IIncomeData[];
                        outcomes: IOutcomeData[];
                    };
                } & TypedAction<string>
            >(fromCommonActions.setEntities),
            switchMap(action => [
                fromIncomeActions.setIncomes({
                    payload: action.payload.incomes,
                    isInit: true,
                }),
                fromOutcomeActions.setOutcomes({
                    payload: action.payload.outcomes,
                    isInit: true,
                }),
            ]),
        );
    });

    private processError(): ObservableInput<TypedAction<string>> {
        return of(
            fromCommonActions.setError({
                payload: "A server error has occurred!",
            }),
        );
    }
}
