import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { catchError, switchMap } from "rxjs/operators";
import { ObservableInput, of } from "rxjs";

import { DialogMode } from "../model/dialog-mode.model";
import { UserRequest } from "../model/request.model";
import { ISetting } from "../model/setting.model";
import { ISettingResponse } from "../model/response.model";
import { IAuthRequest } from "../../../auth/model/request.model";
import { IAuthResponse } from "../../../auth/model/response.model";
import { AuthResponseService } from "../../../auth/auth-response.service";
import { AdjustmentResponseService } from "../adjustment-response.service";

import { AuthSelectors } from "../../../auth/store/auth.selectors";
import { environment } from "projects/web/src/environments/environment";
import { undefinedAction } from "../../../shared/store/undefined.action";
import * as fromUserActions from "../../../auth/store/auth.actions";
import * as fromActions from "./setting.actions";

@Injectable()
export class SettingUserEffects {
    constructor(
        private _selectors: AuthSelectors,
        private _authService: AuthResponseService,
        private _adjustmentService: AdjustmentResponseService,
        private _http: HttpClient,
        private _actions$: Actions,
        private _store$: Store,
    ) {}

    saveUser$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<{ payload: ISetting } & TypedAction<string>>(
                fromActions.save,
            ),
            concatLatestFrom(() => [this._store$.select(this._selectors.user)]),
            switchMap(([action, user]) => {
                if (user && user.idToken) {
                    const email = action.payload.email;
                    const password = action.payload.password;
                    if (email || password) {
                        return this._http
                            .post<ISettingResponse>(
                                environment.webApiUserUpdateUrl,
                                new UserRequest(
                                    user.idToken,
                                    email || undefined,
                                    password || undefined,
                                ),
                            )
                            .pipe(
                                switchMap(response => [
                                    this.processAuth(response),
                                    fromActions.addMode({
                                        payload: DialogMode.SavedUser,
                                    }),
                                ]),
                                catchError((response: unknown) =>
                                    this.processError(response),
                                ),
                            );
                    } else {
                        return of(
                            fromActions.addMode({
                                payload: DialogMode.SavedUser,
                            }),
                        );
                    }
                }
                return of(undefinedAction());
            }),
        );
    });

    loginUser$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<
                {
                    payload: {
                        request: IAuthRequest;
                        setting: ISetting;
                    };
                } & TypedAction<string>
            >(fromActions.loginUser),
            switchMap(action => {
                return this._http
                    .post<IAuthResponse>(
                        environment.webApiUserLoginUrl,
                        action.payload.request.copy(),
                    )
                    .pipe(
                        switchMap(response => [
                            this.processAuth(response),
                            fromActions.save({
                                payload: action.payload.setting.copy(),
                            }),
                        ]),
                        catchError((response: unknown) =>
                            this.processError(response),
                        ),
                    );
            }),
        );
    });

    private processAuth(
        response: IAuthResponse | ISettingResponse,
    ): TypedAction<string> {
        const user = this._authService.processAuthentication(response);
        return this._adjustmentService.isUserResponse(response)
            ? fromUserActions.loginEnd({ payload: { user: user, isRedirected: false } })
            : undefinedAction();
    }

    private processError(
        response: unknown,
    ): ObservableInput<TypedAction<string>> {
        if (response instanceof HttpErrorResponse) {
            const message = response?.error?.error?.message;
            return of(
                message && this._adjustmentService.isReAuthRequired(message)
                    ? fromActions.setMode({ payload: DialogMode.ReAuth })
                    : fromActions.setError({ payload: this._authService.processError(response) }),
            );
        }
        return of(undefinedAction());
    }
}
