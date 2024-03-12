import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { TypedAction } from "@ngrx/store/src/models";

import { ObservableInput, of } from "rxjs";
import { switchMap, catchError, map, tap } from "rxjs/operators";

import { IAuthUser } from "../model/user.model";
import { IAuthRequest } from "../model/request.model";
import { IAuthResponse } from "../model/response.model";
import { AuthLoginService } from "../auth-login.service";
import { AuthResponseService } from "../auth-response.service";
import { environment } from "../../../environments/environment";
import { undefinedAction } from "../../shared/store/undefined.action";
import * as fromActions from "./auth.actions";

@Injectable()
export class AuthEffects {
    constructor(
        private _responseService: AuthResponseService,
        private _loginService: AuthLoginService,
        private _http: HttpClient,
        private _actions$: Actions,
    ) {}

    signupStart$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<
                {
                    payload: IAuthRequest;
                } & TypedAction<string>
            >(fromActions.signupStart),
            switchMap(action => {
                return this._http
                    .post<IAuthResponse>(
                        environment.webApiUserSignupUrl,
                        action.payload.copy(),
                    )
                    .pipe(
                        map(response => this.processAuth(response)),
                        catchError((response: unknown) =>
                            this.processError(response),
                        ),
                    );
            }),
        );
    });

    loginStart$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<
                {
                    payload: IAuthRequest;
                } & TypedAction<string>
            >(fromActions.loginStart),
            switchMap(action => {
                return this._http
                    .post<IAuthResponse>(
                        environment.webApiUserLoginUrl,
                        action.payload.copy(),
                    )
                    .pipe(
                        map(response => this.processAuth(response)),
                        catchError((response: unknown) =>
                            this.processError(response),
                        ),
                    );
            }),
        );
    });

    loginEnd$ = createEffect(
        () => {
            return this._actions$.pipe(
                ofType<
                    {
                        payload: {
                            user: IAuthUser;
                            isRedirected: boolean;
                        };
                    } & TypedAction<string>
                >(fromActions.loginEnd),
                tap(action =>
                    this._loginService.login(action.payload.isRedirected),
                ),
            );
        },
        { dispatch: false },
    );

    loginAuto$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(fromActions.loginAuto),
            map(() => this._loginService.autoLogin()),
        );
    });

    clear$ = createEffect(
        () => {
            return this._actions$.pipe(
                ofType(fromActions.clear),
                tap(() => this._loginService.clear()),
            );
        },
        { dispatch: false },
    );

    private processAuth(response: IAuthResponse): TypedAction<string> {
        const user = this._responseService.processAuthentication(response);
        return fromActions.loginEnd({
            payload: { user: user, isRedirected: true },
        });
    }

    private processError(
        response: unknown,
    ): ObservableInput<TypedAction<string>> {
        if (response instanceof HttpErrorResponse) {
            const message = this._responseService.processError(response);
            return of(fromActions.loginFail({ payload: message }));
        }
        return of(undefinedAction());
    }
}
