import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

import { DialogMode } from "../model/dialog-mode.model";
import { SyncPeriod } from "../model/sync-period.model";
import { ISetting } from "../model/setting.model";
import { IWorkflowResponse } from "../model/response.model";
import { WorkflowRequest } from "../model/request.model";
import { HttpService } from "../../../shared/http.service";

import { AuthSelectors } from "../../../auth/store/auth.selectors";
import { environment } from "projects/web/src/environments/environment";
import { undefinedAction } from "../../../shared/store/undefined.action";
import * as fromCommonActions from "../../data/store/common.actions";
import * as fromActions from "./setting.actions";

@Injectable()
export class SettingWorkflowEffects {
    private errorMessage = "A server error has occurred!";

    constructor(
        private _authSelectors: AuthSelectors,
        private _httpService: HttpService,
        private _http: HttpClient,
        private _actions$: Actions,
        private _store$: Store,
    ) {}

    saveWorkflow$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<{ payload: ISetting } & TypedAction<string>>(
                fromActions.save,
            ),
            concatLatestFrom(() => [
                this._store$.select(this._authSelectors.user),
            ]),
            switchMap(([action, user]) => {
                if (user && user.idToken) {
                    return this._http
                        .put<IWorkflowResponse>(
                            environment.getWebApiSettingStorageUrl(
                                user.localId,
                            ),
                            new WorkflowRequest(action.payload.syncPeriod),
                            this._httpService.getHttpParams(user.idToken),
                        )
                        .pipe(
                            switchMap(response => [
                                fromActions.setWorkflow({
                                    payload: response.syncPeriod,
                                }),
                                fromActions.addMode({
                                    payload: DialogMode.SavedWorkflow,
                                }),
                            ]),
                            catchError(() =>
                                of(
                                    fromActions.setError({
                                        payload: this.errorMessage,
                                    }),
                                ),
                            ),
                        );
                }
                return of(undefinedAction());
            }),
        );
    });

    loadWorkflow$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromActions.loadWorkflow),
            concatLatestFrom(() => [
                this._store$.select(this._authSelectors.user),
            ]),
            switchMap(([, user]) => {
                if (user && user.idToken) {
                    return this._http
                        .get<IWorkflowResponse>(
                            environment.getWebApiSettingStorageUrl(
                                user.localId,
                            ),
                            this._httpService.getHttpParams(user.idToken),
                        )
                        .pipe(
                            map(response =>
                                fromActions.setWorkflow({
                                    payload: response.syncPeriod,
                                }),
                            ),
                            catchError(() =>
                                of(
                                    fromCommonActions.setError({
                                        payload: this.errorMessage,
                                    }),
                                ),
                            ),
                        );
                }
                return of(undefinedAction());
            }),
        );
    });

    setWorkflow$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<{ payload: SyncPeriod } & TypedAction<string>>(
                fromActions.setWorkflow,
            ),
            map(action =>
                fromCommonActions.setSync({ payload: action.payload }),
            ),
        );
    });

    clear$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromActions.clear),
            map(() => fromCommonActions.setSync({ payload: SyncPeriod.Never })),
        );
    });
}
